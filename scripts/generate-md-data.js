// scripts/generate-md-data.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
// 定义 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDirectory = path.join(__dirname, '../data/posts');
const files = fs.readdirSync(contentDirectory);

const posts = files.map((fileName) => {
  const filePath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf-8');

  // 使用 gray-matter 解析 frontmatter
  const { content, data } = matter(fileContents);
  const mdHtmlText = marked(content);
  return {
    slug: fileName.replace(/\.md$/, ''), // 去掉文件扩展名作为 slug

    frontMatter: data,
    mdHtmlText,
  };
});

const privacypolicy_directory = path.join(__dirname, '../data/privacypolicy');
const privacypolicy_files = fs.readdirSync(privacypolicy_directory);
const privacypolicy = privacypolicy_files.map((fileName) => {
  const filePath = path.join(privacypolicy_directory, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf-8');
    // 使用 gray-matter 解析 frontmatter
    const { content, data } = matter(fileContents);
    const mdHtmlText = marked(content);
    return {
      locale: fileName.replace(/\.md$/, ''), // 去掉文件扩展名作为 slug
      frontMatter: data,
      mdHtmlText,
    };
});
// 生成 JSON 数据文件
fs.writeFileSync(
  path.join(__dirname, '../data/posts.json'),
  JSON.stringify(posts)
);

fs.writeFileSync(
  path.join(__dirname, '../data/privacypolicy.json'),
  JSON.stringify(privacypolicy)
);
