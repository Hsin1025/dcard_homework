import { Dialog } from "@headlessui/react";
import { useState, Fragment } from 'react';
import { gql } from '@apollo/client';
import { Transition } from "@headlessui/react";
import { getApolloClient } from "../../apollo-client";
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css';

const CREAT_TASK = gql`
  mutation CreatTask($title: String!, $body: String!) {
    createIssue(input: {title: $title, body: $body, repositoryId: "R_kgDOI3Dqgw", labelIds: "LA_kwDOI3Dqg88AAAABMQPK7Q"}) {
      clientMutationId
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $body: String!, $title: String!, $labelIds: [ID!]) {
    updateIssue(input: {id: $id, body: $body, title: $title, labelIds: $labelIds}) {
      clientMutationId
    }
  }
`;

export default function Modal({ isOpen, setIsOpen, singleTask, modal }) {
  const client = getApolloClient();

  const router = useRouter();

  const reload = () => {
    setTimeout(() => {
      router.reload()
    }, 1000)
  };

  const title = modal === 'update' ? 'Update Task' : 'Create Task';
  const titleValue = modal === 'update' ? singleTask.task.title : '';
  const bodyValue = modal === 'update' ? singleTask.task.body : '';

  const [formData, setFormData] = useState({
    title: modal === 'update' ? singleTask.task.title : '',
    body: modal === 'update' ? singleTask.task.body : '',
    labelIds:'',
  });

  function validation (){
    const title = document.querySelector('#title').value
    const body = document.querySelector('#body').value

    if(!title){
      document.getElementById("titleValidation").innerHTML = "Please write something.";
      document.getElementById("title").className=`${styles.titleError}`
      return false;
    }
    if(title) {
      document.getElementById("titleValidation").innerHTML = "";
      document.getElementById('title').className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    }

    if(body.length < 30){
      document.getElementById("bodyValidation").innerHTML = "Description must be at least 30 digits long.";
      document.getElementById('body').className=`${styles.bodyError}`
      return false;
    }

    else {
      client.
        mutate({
          mutation: modal === 'update' ? UPDATE_TASK : CREAT_TASK,
          variables: {
            title: formData.title,
            body: formData.body,
            id: modal === 'update' ? singleTask.task.id : '',
            labelIds: formData.labelIds
          }
        })
      setIsOpen(false);
      reload();
    };
  };

return(
  <>
   <Transition appear show={isOpen} as={Fragment}>
    <Dialog as='div' open={isOpen} onClose={() => setIsOpen(false)}>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterform='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className='fixed inset-0 bg-black bg-opacity-30' />
      </Transition.Child>

      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterform='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation();
                }}
              >
              {/* <div> */}
              <div className='flex justify-between'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  {title}
                </Dialog.Title>
                { 
                  modal === 'update' &&
                  <>
                    <select 
                      value={formData.labelIds}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          labelIds: e.target.value
                        })
                      }}
                      className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                    >
                      <option value={singleTask.label.id}>{singleTask.label.name}</option>
                      <option value='LA_kwDOI3Dqg88AAAABMQPK7Q'>Open</option>
                      <option value='LA_kwDOI3Dqg88AAAABMQPOkQ'>In Progress</option>
                      <option value='LA_kwDOI3Dqg88AAAABMQPSCA'>Done</option>
                    </select>
                  </>
                } 
                </div>
                <div>
                  <label htmlFor='title' className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                  <input 
                    value={formData.title} 
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        title: e.target.value
                      });
                    }}
                    placeholder={titleValue}
                    id='title' 
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light' 
                  />
                  <p id='titleValidation' className='text-red-600 text-sm '></p>
                  <label htmlFor='body' className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                  <textarea
                    value={formData.body} 
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        body: e.target.value
                      });
                    }}
                    placeholder={bodyValue}
                    id='body' 
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
                  />
                  <p id='bodyValidation' className='text-red-600 text-sm'></p>
                </div>
                <div className='mt-4 flex justify-between'>
                  <button
                    onClick={() => setIsOpen(false)}
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className={styles.btn}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
   </Transition>
  </>
)
}