import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css'
import { gql } from '@apollo/client';
import { getApolloClient } from '../../../apollo-client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import Image from 'next/image';
import Header from '../../components/Header';
import { useSession } from 'next-auth/react';

interface Task {
  task: any, 
  label: any,
}

const DELETE_TASK = gql`
  mutation MyMutation($issueId: ID!, $id: ID!) {
    updateIssue(input: {id: $id, state: CLOSED}) {
      clientMutationId
    }
    deleteIssue(input: {issueId: $issueId}) {
      clientMutationId
    }
  }
`

const TASK_SLUG = gql`
query TaskSlug($number: Int!) {
  user(login: "Hsin1025") {
    repository(name: "dcard_homework") {
      issue(number: $number) {
        body
        state
        title
        number
        id
        labels(first: 1) {
          nodes {
            name
          }
        }
      }
    }
  }
}
`

export default function Task() {
  let client, modal, taskResult, labelResult, router, taskSlug;

  const { data: session } = useSession();

  let [isOpen, setIsOpen] = useState(false);
  let [hasError, setHasError] = useState(false);
  let [singleTask, setSingleTask] = useState<Task>({
    task: [],
    label: ''
  });

  modal = 'update';
  client = getApolloClient();

  router = useRouter();

  ({taskSlug} = router.query)

  const reRoute = () => {
    setTimeout(() => {
      router.push('/');
    }, 900)
  };

  useEffect(() => {
    getTaskSlug();
  });

  const getTaskSlug = async () => {
    try{
      var taskData = await client.query({
        query: TASK_SLUG,
        variables: {
          number: parseInt(taskSlug)
        }
      });
      setHasError(false)
    }catch(err) {
      setHasError(true)
      console.error(err)
      return 
    }

    taskResult = taskData.data.user.repository.issue;
    labelResult = taskData.data.user.repository.issue.labels.nodes[0];

    setSingleTask({
      task: taskResult,
      label: labelResult
    });
  }

  return(
    <div>
      <Head>
        <title>Dcard Intern Homework | Detail</title>
        <meta name="description" content='You can see each detail issue here 每一個issue的詳細資訊 create by Hsin'/>
        <link rel='Hoya Icon' href='/hoya.ico'></link>
      </Head>
      <Header />
      <main className='w-screen h-screen grid dark:bg-black'>
        {
          session && !hasError &&
          <>
            <div className='border-gray-500 rounded-md border place-self-center pb-5'>
              <div className='bg-[#24292F] px-52 h-10 rounded-t-md flex self-center'>
                <Image 
                  src='/github_white.svg' 
                  alt='Github Logo' 
                  width={35} 
                  height={35} 
                  className='w-auto'
                />
              </div>
              <div className='flex justify-start space-x-3 px-3 pt-3'>
                <h1 className='font-semibold text-3xl'>#{singleTask.task.title}</h1>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                >
                  {singleTask.label.name}
                </button>
              </div>
              <div className='max-w-[70vh] px-3'>{singleTask.task.body}</div>
              <div className='flex justify-end space-x-3 px-3'>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    client
                      .mutate({
                        mutation: DELETE_TASK,
                        variables: {
                          issueId: singleTask.task.id,
                          id: singleTask.task.id
                        }
                      });
                    reRoute();
                  }}
                  className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                >
                  Delete
                </button>
                <button onClick={() => setIsOpen(true)} className={styles.btn}>
                  Update
                </button>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} singleTask={singleTask} modal={modal}/>
              </div>
            </div>
          </>
        }
        {
          hasError && session &&
          <>
            <div className='grid place-content-center'>
              <p className='text-2xl'>404 Task No Found</p><br />
              <Link className='text-xl text-center' href='/'>Go Back 🔙</Link>
            </div>
          </>
        }
        {
          !session &&
          <>
            <div className='h-screen grid place-content-center'>
              <p className='text-center text-2xl font-semibold'>
                Sign In To Continue<br />
              </p>
            </div>
          </>
        }
      </main>
    </div>

  )
}