import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from validate_docs_site import scan_pages, validate_build_output, validate_internal_links


class ValidateDocsSiteTests(unittest.TestCase):
    @staticmethod
    def _write_html(root: Path, relative_path: str, html: str) -> None:
        target = root / relative_path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(html, encoding="utf-8")

    def test_reports_missing_internal_route_target(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            self._write_html(
                root,
                "index.html",
                '<a href="/docs/guides/missing/">Missing page</a>',
            )

            pages = scan_pages(root)
            errors = validate_internal_links(root, pages)

            self.assertEqual(len(errors), 1)
            self.assertIn("missing target", errors[0])

    def test_reports_missing_internal_fragment_target(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            self._write_html(
                root,
                "index.html",
                '<a href="/docs/guides/templates/#missing-fragment">Templates</a>',
            )
            self._write_html(
                root,
                "guides/templates/index.html",
                '<h1 id="existing-fragment">Templates</h1>',
            )

            pages = scan_pages(root)
            errors = validate_internal_links(root, pages)

            self.assertEqual(len(errors), 1)
            self.assertIn("missing-fragment", errors[0])

    def test_accepts_encoded_fragment_target(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            self._write_html(
                root,
                "index.html",
                '<a href="/docs/guides/templates/#create%20workflow">Templates</a>',
            )
            self._write_html(
                root,
                "guides/templates/index.html",
                '<h1 id="create workflow">Templates</h1>',
            )

            pages = scan_pages(root)
            errors = validate_internal_links(root, pages)

            self.assertEqual(errors, [])

    def test_validates_fragments_on_dotted_directory_routes(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            self._write_html(
                root,
                "index.html",
                '<a href="/docs/releases/v1.0/#missing">Version</a>'
                '<a href="/docs/releases/v1.0#existing">Version without trailing slash</a>',
            )
            self._write_html(
                root,
                "releases/v1.0/index.html",
                '<h2 id="existing">Existing</h2>',
            )

            pages = scan_pages(root)
            errors = validate_internal_links(root, pages)

            self.assertEqual(len(errors), 1)
            self.assertIn("missing", errors[0])

    def test_reports_trailing_slash_fragment_when_only_non_slash_id_exists(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            self._write_html(
                root,
                "index.html",
                '<a href="/docs/guides/templates/#anchor/">Templates</a>',
            )
            self._write_html(
                root,
                "guides/templates/index.html",
                '<h1 id="anchor">Templates</h1>',
            )

            pages = scan_pages(root)
            errors = validate_internal_links(root, pages)

            self.assertEqual(len(errors), 1)
            self.assertIn("anchor/", errors[0])

    def test_accepts_trailing_slash_fragment_when_slash_id_exists(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            self._write_html(
                root,
                "index.html",
                '<a href="/docs/guides/templates/#anchor/">Templates</a>',
            )
            self._write_html(
                root,
                "guides/templates/index.html",
                '<h1 id="anchor/">Templates</h1>',
            )

            pages = scan_pages(root)
            errors = validate_internal_links(root, pages)

            self.assertEqual(errors, [])

    def test_validates_realistic_relative_link_from_nested_page(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            self._write_html(
                root,
                "features/workflows/index.html",
                '<a href="../../guides/templates/#section-a">Go to section</a>',
            )
            self._write_html(
                root,
                "guides/templates/index.html",
                '<h2 id="section-a">Section A</h2>',
            )
            self._write_html(root, "index.html", "<p>Root</p>")

            pages = scan_pages(root)
            errors = validate_internal_links(root, pages)

            self.assertEqual(errors, [])

    def test_fails_when_build_output_has_no_html_files(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            pages = scan_pages(root)
            errors = validate_build_output(root, pages)

            self.assertEqual(len(errors), 1)
            self.assertIn("No HTML files found", errors[0])

    def test_fails_when_root_index_is_missing(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            self._write_html(root, "guides/templates/index.html", "<h1>Templates</h1>")
            pages = scan_pages(root)
            errors = validate_build_output(root, pages)

            self.assertEqual(len(errors), 1)
            self.assertIn("Missing root index.html", errors[0])

    def test_ignores_external_links(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            root = Path(temp_dir)
            self._write_html(
                root,
                "index.html",
                '<a href="https://example.com/docs#frag">External</a>',
            )

            pages = scan_pages(root)
            errors = validate_internal_links(root, pages)

            self.assertEqual(errors, [])


if __name__ == "__main__":
    unittest.main()
