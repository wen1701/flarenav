import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';
import posts from '../../data/posts.json';
import baseinfo from '../../data/baseinfo.json';
import webInfoData from '../../data/web_info.json';
import privacypolicy from '../../data/privacypolicy.json';

export const getAllWebInfo = async () => {
    const jsonDataObj = JSON.stringify(webInfoData);
    return JSON.parse(jsonDataObj);
}
export const getWebInfo = async (id: string) => {
    const jsonDataObj = JSON.stringify(webInfoData);
    const data = JSON.parse(jsonDataObj);
    
    // Flatten the structure and find the item with matching id
    return data.flatMap((group: { details: any[] }) => group.details).find((item: any) => item.id === id);
}

export const getBaseInfo = async () => {
    const jsonDataObj = JSON.stringify(baseinfo);
    return JSON.parse(jsonDataObj);
}
export const getAllPosts = async () => {
    const posts_json = JSON.stringify(posts);
    return JSON.parse(posts_json);
}

export const getPosts = async (slug:string) => {
    const posts_json = JSON.stringify(posts);
    const data = JSON.parse(posts_json);
    return data.find((item:any) => item.slug === slug);
}

export const getPrivacypolicy = async (locale:string) => {
    const jsonDataObj = JSON.stringify(privacypolicy);
    const data = JSON.parse(jsonDataObj);
    return data.find((item:any) => item.locale === locale);
}
