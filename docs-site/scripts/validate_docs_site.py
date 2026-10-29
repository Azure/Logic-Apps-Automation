#!/usr/bin/env python3
"""Validate built docs internal links and fragment targets."""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

DOCS_BASE = "/docs"


@dataclass
class HtmlPage:
    ids: set[str]
    links: list[str]


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        node_id = values.get("id")
        if node_id:
            self.ids.add(node_id)
        if tag == "a":
            href = values.get("href")
            if href:
                self.links.append(href)


def _resolve_internal_target(
    *,
    href: str,
    root: Path,
    current_file: Path,
) -> tuple[Path | None, str | None]:
    root = root.resolve()
    current_relative = current_file.relative_to(root).as_posix()
    base = f"https://docs.example{DOCS_BASE}/{current_relative}"
    parsed = urlsplit(urljoin(base, href))
    if parsed.netloc not in ("", "docs.example"):
        return None, None

    path = unquote(parsed.path)
    if not path.startswith(f"{DOCS_BASE}/") and path != DOCS_BASE:
        return None, None

    relative_path = path.removeprefix(DOCS_BASE).lstrip("/")
    if not relative_path:
        target = root / "index.html"
    else:
        candidate = root / relative_path
        if path.endswith("/") or candidate.is_dir() or not candidate.suffix:
            target = candidate / "index.html"
        else:
            target = candidate
    target = target.resolve()

    try:
        target.relative_to(root)
    except ValueError as error:
        raise ValueError(f"Resolved path outside docs root for '{href}'") from error

    return target, unquote(parsed.fragment) or None


def scan_pages(root: Path) -> dict[Path, HtmlPage]:
    pages: dict[Path, HtmlPage] = {}
    for file_path in sorted(root.rglob("*.html")):
        parser = LinkParser()
        parser.feed(file_path.read_text(encoding="utf-8"))
        pages[file_path.resolve()] = HtmlPage(ids=parser.ids, links=parser.links)
    return pages


def validate_build_output(root: Path, pages: dict[Path, HtmlPage]) -> list[str]:
    errors: list[str] = []
    if not pages:
        errors.append(f"No HTML files found under build output: {root}")
        return errors

    root_index = (root / "index.html").resolve()
    if root_index not in pages:
        errors.append(f"Missing root index.html under build output: {root}")
    return errors


def validate_internal_links(root: Path, pages: dict[Path, HtmlPage]) -> list[str]:
    errors: list[str] = []
    root = root.resolve()
    for file_path, page in pages.items():
        current = file_path.relative_to(root).as_posix()
        for href in page.links:
            target, fragment = _resolve_internal_target(
                href=href,
                root=root,
                current_file=file_path,
            )
            if target is None:
                continue
            if not target.exists():
                errors.append(f"{current}: missing target for link '{href}'")
                continue
            if fragment and target in pages and fragment not in pages[target].ids:
                errors.append(f"{current}: missing fragment '{fragment}' for link '{href}'")
    return errors


def main() -> int:
    script_dir = Path(__file__).resolve().parent
    docs_root = script_dir.parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--root",
        default=str(docs_root / "dist" / "docs"),
        help="Path to built docs output (default: docs-site/dist/docs)",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.exists():
        raise SystemExit(f"Build output not found: {root}")

    pages = scan_pages(root)
    errors = validate_build_output(root, pages)
    errors.extend(validate_internal_links(root, pages))
    total_links = sum(len(page.links) for page in pages.values())

    print(
        f"Validated {len(pages)} HTML pages and {total_links} links under '{DOCS_BASE}'."
    )
    if errors:
        for error in errors:
            print(error)
        return 1
    print("Validation passed: internal links and fragments are consistent.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
