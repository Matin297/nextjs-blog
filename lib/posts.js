import fs from 'fs';
import path from 'path';
import remark from 'remark'
import html from 'remark-html'
import gm from 'gray-matter';


const postsDataBaseDir = path.join(process.cwd(), 'db', 'posts');

export function getSortedPostsData() {

    const postsFileNames = fs.readdirSync(postsDataBaseDir);

    const postsArr = postsFileNames.map(fileName => {

        // extract the id outta file name
        const id = fileName.replace(/\.md$/, '');

        // read file content
        const filePath = path.join(postsDataBaseDir, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // gray matter to get meta data outta file
        const metaDataObj = gm(fileContent);

        return {
            id,
            ...metaDataObj.data
        }

    });

    // sort posts based on the newest ones
    return postsArr.sort((a, b) => {
        if (a.date < b.date)
            return 1;
        return -1;
    });

}

export function getPostsFileNames() {

    const fileNames = fs.readdirSync(postsDataBaseDir);

    return fileNames.map(fileName => ({
        params: {
            id: fileName.replace(/\.md$/, '')
        }
    }))

}

export async function getPostDataById(id) {

    const filePath = path.join(postsDataBaseDir, `${id}.md`);

    const fileContent = fs.readFileSync(filePath, 'utf8');

    const fileMetaDataObj = gm(fileContent);

    const processedContent = await remark()
        .use(html)
        .process(fileMetaDataObj.content);

    const htmlContent = processedContent.toString();

    return {
        id,
        htmlContent,
        ...fileMetaDataObj.data
    }

}
