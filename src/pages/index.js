import Head from 'next/head';
import Link from 'next/link.js';
import Image from 'next/image';
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import styles from '../styles/Home.module.css';
import { getApolloClient } from '../../apollo-client.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSession } from 'next-auth/react';
import { gql } from '@apollo/client';
import Sentry from '@sentry/nextjs';


const SEARCH_TASK = gql`
query searchTask($query: String!, $first: Int!) {
  search(type: ISSUE, first: $first, query: $query) {
    edges {
      node {
        ... on Issue {
          id
          body
          title
          state
          number
          labels(first: 1) {
            edges {
              node {
                id
                name
                color
              }
            }
          }
        }
      }
    }
  }
}
`

const ISSUE_TOTAL_COUNT = gql`
query issueTotalCount($query: String!) {
  search(type: ISSUE, query: $query) {
    issueCount
  }
}
`
export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const client = getApolloClient();

  let [hasMore, setHasMore] = useState(true);
  let [data, setData] = useState([]);
  let [searchData, setSearchData] = useState({
    labels: "",
    body: "",
  });
  
  const labels = searchData.labels ? "label:" + searchData.labels : '';
  const query = "repo:Hsin1025/dcard_homework " + labels + " in:body " + searchData.body;

  const getMoreData = async () => {
    try{
      var searchResult = await client.query({
        query: SEARCH_TASK,
        variables: {
          query: query,
          first: data.length ? data.length + 10 : 10
        }
      });
    }catch(err){
      Sentry.captureException(err);
    };

    let issues_search_result = searchResult.data.search.edges.map(edge => edge.node)
    setData(issues_search_result);
  };

  const checkIfHasMore = async () => {
    try {
      var totalIssue = await client.query({
        query: ISSUE_TOTAL_COUNT,
        variables: {
          query: query
        }
      });
    } catch(err){
      Sentry.captureException(err);
    }

    const total_issue_count = totalIssue.data.search.issueCount;

    if(data.length >= total_issue_count){
      setHasMore(false);
    }else{
      setHasMore(true);
    }
    return hasMore;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Dcard Frontend | 迪卡前端</title>
        <meta 
          name="description" 
          content="Hello! This is a Dcard Frontend Intern Homework written by Hsin. It contain usage of React+Next+Tailwindcss, and package like NextAuth, Apollo, Sentry. Feel free to play around!" 
        />
        <meta 
          name="google-site-verification" 
          content="FaCrpvcmBcrOMLz5JixWjmyRCluQnjlKSWn6R6oaRjY" 
        />
        <link rel='Hoya Icon' href='/hoya.ico'></link>
      </Head>
      <main className={styles.main}>
        <div>
        {loading && <div>Loading...</div>}
        {
          session &&
          <>
            <SearchBar 
              searchData={searchData} 
              setSearchData={setSearchData} 
              setData={setData}
              hasMore={checkIfHasMore()}
            />
            <div>
              <InfiniteScroll
                dataLength={data.length}
                next={getMoreData}
                hasMore={hasMore}
                loader={<h3>Loading...</h3>}
                endMessage={<h4>Nothing more to show</h4>}
              >
              {data.map((item) => {
                return(
                  <Link key={item.id} href={`/tasks/${item.number}`}>
                    {item.labels.edges.map(edge => edge.node).map((label) => {
                      return (
                        <div key={label.id} className={styles.card}>
                          <p className='text-[#6E798C] dark:text-gray-200 text-xl'>label: {label.name}</p>
                          <p className='text-[#081F32] dark:text-white text-4xl font-serif'>{item.title}</p>
                          <p className='text-[#374A59] dark:text-gray-100 text-lg truncate...'>{item.body}</p>
                        </div>
                      )
                    })}
                  </Link>
                )
              })}
              </InfiniteScroll> 
            </div>
          </>
        }
        {
          !session &&
          <>
            <div className='h-screen grid place-content-center'>
              <p className='text-center text-2xl font-semibold'>
                Sign In To Continue <br />
              </p>
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
