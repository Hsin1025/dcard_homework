import Head from 'next/head'
import Header from '../components/Header.js'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'

import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

export default function Home({ repository_issues }) {

  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextjs | Next-Auth</title>
        <link rel='icon' href='/favicon.ico'></link>
      </Head>
      <Header />
      <main className={styles.main}>
        <div>
        {loading && <div className={styles.title}>Loading...</div>}
        {
          session &&
          <>
          <div>
            {repository_issues.map(item => {
              return(
                <div className={styles.card}>
                  {item.title}
                </div>
              )
            })}
          </div>
          </>
        }
        {
          !session &&
          <>
          <div className='h-screen grid place-content-center'>
            <p className='text-center text-2xl font-semibold'>Sign In To Continue</p>
            <img src='/github_cat.svg'/>
          </div>
          </>
        }
        </div>
      </main>
            
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {

  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql'
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
      }
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
    {
      user(login: "Hsin1025") {
        repository(name: "dcard_homework") {
          issues(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
            edges {
              node {
                state
                title
                body
              }
            }
          }
        }
      }
    }
    `
  });
  
  const { user } = data;
  const repository_issues = user.repository.issues.edges.map(edge => edge.node)
  
  console.log('repository_issue', repository_issues)

  return {
    props: {
      repository_issues
    }
  }
}
