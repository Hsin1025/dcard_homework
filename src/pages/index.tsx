import Head from 'next/head';
import Link from 'next/link.js';
import Header from '../components/Header.js';
import Modal from '../components/Modal.js';
import ClientOnly from '../components/ClientOnly.js';
import SearchBar from '../components/SearchBar.js';
import React from 'react';

import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useSession } from 'next-auth/react';

import { gql } from '@apollo/client';
import { getApolloClient } from '../../apollo-client.js';

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

interface Search {
  labels: string;
  body: string;
}

interface Item {
  id: string;
  number: number;
  labels: any;
  title: string;
  body: string;
  state: string;
}

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const client = getApolloClient();

  let modal = 'create';
  let [isOpen, setIsOpen] = useState<boolean>(false);

  let[data, setData] = useState<[]>([]);

  const [searchData, setSearchData] = useState<Search>({
    labels: "",
    body: "",
  });

  const [hasMore, setHasMore] = useState<boolean>(true);

  const getMoreData = async () => {
    const labels = searchData.labels ? "label:" + searchData.labels : '';
    const query = "repo:Hsin1025/dcard_homework " + labels + " in:body " + searchData.body
    const searchResult = await client.query({
      query: SEARCH_TASK,
      variables: {
        query: query,
        first: data.length ? data.length + 10 : 10
      }
    });
    const repository_issues_search_result = searchResult.data.search.edges.map(edge => edge.node)
    
    console.log('data length', data.length)
    setData(repository_issues_search_result);
  };

  const checkIfHasMore = async () => {
    const labels = searchData.labels ? "label:" + searchData.labels : '';
    const query = "repo:Hsin1025/dcard_homework " + labels + " in:body " + searchData.body
    const totalIssue = await client.query({
      query: ISSUE_TOTAL_COUNT,
      variables: {
        query: query
      }
    });
    
    const total_issue_count = totalIssue.data.search.issueCount;
    console.log('total', total_issue_count);
   
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
        <title>Nextjs | Next-Auth</title>
        <link rel='icon' href='/favicon.ico'></link>
      </Head>
      <Header />
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
            <div className='flex justify-end'>
              <button 
                onClick={() => setIsOpen(true)} 
                className='mt-3 p-2 bg-slate-200 rounded-md dark:bg-transparent dark:border' type='button'
              >
                create issue
              </button>
            </div>
            <ClientOnly>
              <Modal isOpen={isOpen} setIsOpen={setIsOpen} modal={modal}/>
            </ClientOnly>
            
          <div>
           <InfiniteScroll
             dataLength={data.length}
             next={getMoreData}
             hasMore={hasMore}
             loader={<h3>Loading...</h3>}
             endMessage={<h4>Nothing more to show</h4>}
           >
            {data.map((item: Item) => {
              return(
                <Link key={item.id} href={`/tasks/${item.number}`}>
                    {item.labels.edges.map(edge => edge.node).map(label => {
                      return (
                        <>
                          <div key={label.id} className={styles.card}>
                            <p className='text-[#6E798C] dark:text-gray-200 text-xl'>label: {label.name}</p>
                            <p className='text-[#081F32] dark:text-white text-4xl font-serif'>{item.title}</p>
                            <p className='text-[#374A59] dark:text-gray-100 text-lg truncate...'>{item.body}</p>
                          </div>
                        </>
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
              #pray for Turkey 
            </p>
            {/* <img src='/github_cat.svg'/> */}
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
