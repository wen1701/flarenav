import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';

export const loadJsonData = async (paths:string[]) => {
    const filePath = path.join(process.cwd(), ...paths);
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const jsonDataObj = JSON.parse(jsonData);
    return jsonDataObj;
}

export const loadMarkdownData = async (paths:string[]) => {
    const filePath = path.join(process.cwd(), ...paths);
    const fileContents = await fs.readFile(filePath, 'utf-8');
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const mdHtmlText = await marked(matterResult.content);

    // Combine the data with the id and contentHtml
    return {
        mdHtmlText
        // ... any other fields you want to include
    };
}
