import { getCollection, render } from 'astro:content';
import { renderEntry } from 'astro/content/runtime';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function getPostStaticPaths(collection: 'posts' | 'postsEn') {
  const introAsideRegex = /^\s*(<aside>[\s\S]*?<\/aside>)([\s\S]*)$/;
  const introMarkerRegex = /(?:\*\*(?:关于这篇文章|About this piece)\*\*|#{1,6}\s+(?:关于这篇文章|About this piece)(?:\r?\n|$)|<h[1-6][^>]*>\s*(?:关于这篇文章|About this piece)\s*<\/h[1-6]>)/;
  const markdownRenderer = await createMarkdownProcessor();

  function getPostFileURL(post) {
    return post.filePath ? pathToFileURL(resolve(post.filePath)) : undefined;
  }

  function extractIntroAside(body) {
    if (!body) return null;
    const match = body.match(introAsideRegex);
    if (!match) return null;
    const [, introMarkdown, remainderMarkdown] = match;
    if (!introMarkerRegex.test(introMarkdown)) return null;
    return { introMarkdown, remainderMarkdown: remainderMarkdown.replace(/^\s+/, '') };
  }

  async function renderMarkdownSegment(post, markdown, idSuffix) {
    const rendered = await markdownRenderer.render(markdown, {
      fileURL: getPostFileURL(post),
      frontmatter: post.data,
    });
    return renderEntry({
      id: `${post.id}${idSuffix}`,
      collection: post.collection,
      data: post.data,
      filePath: post.filePath,
      rendered: {
        html: rendered.code,
        metadata: {
          headings: rendered.metadata.headings,
          frontmatter: rendered.metadata.frontmatter,
          imagePaths: [...rendered.metadata.localImagePaths, ...rendered.metadata.remoteImagePaths],
        },
      },
    });
  }

  async function getPostProps(post) {
    const introAside = extractIntroAside(post.body);
    if (introAside) {
      const [introRendered, bodyRendered] = await Promise.all([
        renderMarkdownSegment(post, introAside.introMarkdown, '#intro'),
        renderMarkdownSegment(post, introAside.remainderMarkdown, '#body'),
      ]);
      return {
        post,
        Content: bodyRendered.Content,
        headings: bodyRendered.headings,
        IntroContent: introRendered.Content,
      };
    }
    const { Content, headings } = await render(post);
    return { post, Content, headings, IntroContent: null };
  }

  const posts = await getCollection(collection);
  return Promise.all(posts.map(async (post) => ({
    params: { slug: post.id },
    props: await getPostProps(post),
  })));
}
