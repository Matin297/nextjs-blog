import Head from 'next/head'
import Layout from '../../components/Layout'
import { getPostsFileNames, getPostDataById } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'


export default function Post({ postData }) {

    return (
        <Layout>

            <Head>
                <title> {postData.title} </title>
            </Head>

            <article>

                <h1 className={utilStyles.headingXl}> {postData.title} </h1>

                <div className={utilStyles.lightText}> {postData.date} </div>

                <div dangerouslySetInnerHTML={{ __html: postData.htmlContent }} ></div>

            </article>

        </Layout>
    )
}

export async function getStaticPaths() {

    const paths = getPostsFileNames();

    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps({ params }) {

    const postData = await getPostDataById(params.id);

    return {
        props: {
            postData
        }
    };

}
