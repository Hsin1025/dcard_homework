import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { gql } from '@apollo/client';
import Modal from "./Modal";

import { getApolloClient } from "../../apollo-client";

const SEARCH_TASK = gql`
query search($query: String!) {
  search(type: ISSUE, first: 10, query: $query) {
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

export default function SearchBar({searchData, setSearchData, setData}) {
  const router = useRouter();
  const client = getApolloClient();

  let [isOpen, setIsOpen] = useState(false);
  const modal = 'create';

  const getSearchData = async () => {
    const labels = searchData.labels ? "label:" + searchData.labels : '';
    const query = "repo:Hsin1025/dcard_homework " + labels + " in:body " + searchData.body

    console.log('query', query)
    try{
      var searchResult = await client.query({
        query: SEARCH_TASK,
        variables: {
          query: query
        }
      });
    }catch(err) {
      console.error(err)
    };
    const issues_search_result = searchResult.data.search.edges.map(edge => edge.node);
    setData(issues_search_result);
  };

  useEffect(() => {
    getSearchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
  <form 
    onSubmit={(e) => {
      e.preventDefault();
      getSearchData();
      router.push(`/?search=${searchData}`)
    }}
  >
    <div className="flex">
      <select 
        id="dropdown-button"
        value={searchData.labels}
        onChange={(e) => {
          setSearchData({
            ...searchData,
            labels: e.target.value,
          });
        }} 
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" 
      >
        <option value=''>State Filter</option>
        <option value="Open">Open</option>
        <option value="InProgress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <div className="relative w-full">
        <input 
          type="search" 
          id="search-dropdown"
          value={searchData.body}
          onChange={(e) => {
            setSearchData({
              ...searchData,
              body: e.target.value
            })
          }} 
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
          placeholder="Search By Description. Ex:dcard, simply..." 
        />
        <button 
          type="submit" 
          className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </div>
      <div className='flex justify-end'>
        <button 
          onClick={() => setIsOpen(true)} 
            className="flex-shrink-0 bg-slate-200 rounded-md px-1 ml-1" 
            type='button'
          >
            create
        </button>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} modal={modal}/>
    </div>
  </form>
  )
}