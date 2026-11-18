import json
import sys
import unittest
from datetime import date
from html.parser import HTMLParser
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from validate_docs_site import scan_pages, validate_internal_links

DOCS_SITE = Path(__file__).resolve().parents[2]


class BlogParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.articles = []
        self.current = None
        self.main_navigation = []
        self.in_navigation = False

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "nav" and values.get("aria-label") == "Main":
            self.in_navigation = True
        if tag == "a" and self.in_navigation:
            self.main_navigation.append(values.get("href"))
        if tag == "article":
            self.current = {
                "label": values.get("aria-labelledby"),
                "ids": [], "links": [], "dates": [], "text": [], "dynamic": [],
            }
            self.articles.append(self.current)
        if self.current is None:
            return
        if "id" in values:
            self.current["ids"].append(values["id"])
        if tag == "a":
            self.current["links"].append(values)
        if tag == "time":
            self.current["dates"].append(values.get("datetime"))
        if tag in ("script", "astro-island", "img"):
            self.current["dynamic"].append(tag)

    def handle_endtag(self, tag):
        if tag == "article":
            self.current = None
        if tag == "nav":
            self.in_navigation = False

    def handle_data(self, data):
        if self.current is not None:
            self.current["text"].append(data)


class BlogsOutputTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # CI and the documented validation command build before testing rendered output.
        cls.root = DOCS_SITE / "dist/docs"
        cls.blog_page = cls.root / "blogs/index.html"
        cls.catalog = json.loads((DOCS_SITE / "src/data/blogs.json").read_text())
        cls.parser = BlogParser()
        cls.parser.feed(cls.blog_page.read_text())

    def test_static_articles_have_complete_attribution_in_newest_first_order(self):
        expected = sorted(self.catalog, key=lambda entry: entry["publishedAt"], reverse=True)
        self.assertEqual(len(self.parser.articles), len(expected))
        for actual, entry in zip(self.parser.articles, expected):
            with self.subTest(article=entry["id"]):
                text = " ".join("".join(actual["text"]).split())
                published = date.fromisoformat(entry["publishedAt"])
                self.assertIn(entry["title"], text)
                self.assertIn(entry["summary"], text)
                self.assertIn(entry["author"], text)
                self.assertIn("Microsoft Tech Community", text)
                self.assertIn(f"{published:%B} {published.day}, {published.year}", text)
                self.assertEqual(actual["dates"], [entry["publishedAt"]])
                self.assertIn(actual["label"], actual["ids"])
                self.assertEqual(actual["links"][0]["href"], entry["url"])
                self.assertEqual(actual["dynamic"], [])
                self.assertTrue(all(link.get("target") != "_blank" for link in actual["links"]))

    def test_related_documentation_is_rendered_and_resolves_in_built_output(self):
        actual_links = {
            link["href"] for article in self.parser.articles for link in article["links"]
        }
        for entry in self.catalog:
            for link in entry.get("relatedDocs", []):
                self.assertIn(link["href"], actual_links)
        errors = validate_internal_links(self.root, scan_pages(self.root))
        self.assertEqual(errors, [])

    def test_homepage_and_explicit_sidebar_entry_link_to_blogs_before_release_notes(self):
        navigation = self.parser.main_navigation
        self.assertEqual(navigation.count("/docs/blogs/"), 1)
        self.assertLess(
            navigation.index("/docs/blogs/"),
            navigation.index("/docs/release-notes/changelog/"),
        )
        homepage = (self.root / "index.html").read_text()
        self.assertIn('href="/docs/blogs/"', homepage)

    def test_broader_board_link_remains_available(self):
        html = self.blog_page.read_text()
        self.assertIn(
            'href="https://techcommunity.microsoft.com/t5/azure-integration-services-blog/bg-p/IntegrationsonAzureBlog"',
            html,
        )


if __name__ == "__main__":
    unittest.main()
