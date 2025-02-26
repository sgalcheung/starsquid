import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import { VFile } from "vfile";
import Slugger from "github-slugger";

import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

export async function markdownToHtml(markdown: string): Promise<VFile> {
	const parser = unified()
		.use(remarkParse)
		.use(remarkRehype, {
			allowDangerousHtml: true,
			passThrough: [],
		})
		.use(rehypeHeadingIds)
		.use(rehypeStringify, { allowDangerousHtml: true });

	const vfile = new VFile({
		value: markdown,
		// path: `${Astro.url}.mdx`,
		// data: {
		//   astro: {
		//     frontmatter: frontmatter ?? {},
		//   },
		// },
	});

	let result = undefined;

	try {
		result = await parser.process(vfile);
	} catch (err) {
		// Ensure that the error message contains the input filename
		// to make it easier for the user to fix the issue
		// err = prefixError(err, `Failed to parse Markdown file "${vfile.path}"`);
		console.error(err);
		throw err;
	}

	return result;
}

export interface MarkdownHeading {
	depth: number;
	slug: string;
	text: string;
}

/**
 * Extracting TOC from Markdown
 * @param markdown Markdown Content
 * @returns List of Headings
 */
export function extractHeadings(markdown: string): MarkdownHeading[] {
	const tokens = marked.lexer(markdown); // Parsing Markdown into Tokens
	const slugger = new Slugger();
	const headings: MarkdownHeading[] = [];

	for (const token of tokens) {
		if (token.type === "heading" && typeof token.depth === "number") {
			const text = token.text;
			const slug = slugger.slug(text);
			headings.push({ depth: token.depth, slug, text });
		}
	}

	return headings;
}

export async function generateMarkdownWithToc(markdown: string) {
	const headings = extractHeadings(markdown);

	const options = {
		prefix: "",
	};

	marked.use(gfmHeadingId(options));

	const html = await marked.parse(markdown);

	return { html, headings };
}
