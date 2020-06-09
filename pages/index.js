import Head from 'next/head';
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/Layout';
import { getSortedPostsData } from '../lib/posts'


export default function Home({ posts }) {

  return (
    <Layout home>

      <Head>
        <title> {siteTitle} </title>
      </Head>

      <section className={utilStyles.headingMd}>

        <p>Hi, my name is asma. I'm a software developer and a reader!</p>

        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>

      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>

        <h2 className={utilStyles.headingLg}>Blog</h2>

        <ul className={utilStyles.list}>
          {
            posts.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>

                <Link href="/posts/[id]" as={`/posts/${id}`} >
                  <a>
                    {title}
                  </a>
                </Link>

                <div className={utilStyles.lightText}>
                  {date}
                </div>

              </li>
            ))
          }
        </ul>
      </section>

    </Layout>
  )
}

export async function getStaticProps() {

  const posts = getSortedPostsData();

  return {
    props: {
      posts
    }
  }
}
