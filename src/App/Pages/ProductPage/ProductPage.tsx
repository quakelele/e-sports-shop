import s from './ProductPage.module.scss'
import { useParams } from 'react-router-dom'
import {
   useGetProductByIdQuery,
   useAddCommentToProductMutation,
} from '../../Api'
import { useState } from 'react'
import { Tabs } from 'antd'
import { Comment } from '../../Pages/ProductPage/Comment/Comment'
import { ProductDetails } from './ProductDetails/ProductDetails'

export const ProductPage = () => {

   const { id } = useParams()
   const [inputValue, setInputValue] = useState('')
   const { data: pageData } = useGetProductByIdQuery(id)
   
   const [addComment] = useAddCommentToProductMutation()

   const addCommentHandler = () => {
      const newComment = {
         author: 'Имя пользователя',
         text: inputValue,
         timestamp: new Date().toISOString(),
         likes: 0,
         id: Math.random(),
      }
      addComment({
         ...pageData,
         comments: pageData?.comments
            ? [...pageData.comments, newComment]
            : [newComment],
      })
      setInputValue('')
   }

   return (
      <>
         <div className={s.wrapper}>
            <ProductDetails pageData={pageData} />
            <div className={s.wrapperBottom}>
               <Tabs
                  defaultActiveKey="1"
                  items={[
                     {
                        key: '1',
                        label: 'Description',
                        children: (
                           <div className={s.descriptionData}>
                              {pageData?.description}
                           </div>
                        ),
                     },
                     {
                        key: '2',
                        label: 'Comments',
                        children: (
                           <div>
                              <input
                                 className={s.inputField}
                                 value={inputValue}
                                 onChange={e => setInputValue(e.target.value)}
                                 placeholder="Share your thoughts!"
                              />
                              <button
                                 className={s.inputButton}
                                 onClick={() => addCommentHandler()}>
                                 Post it!
                              </button>
                              {pageData?.comments?.map(comment => (
                                 <Comment
                                    key={comment.id}
                                    comment={comment}
                                    pageData={pageData}
                                 />
                              ))}
                              <div className={s.comment}>
                                 <h3>
                                    {pageData?.comments?.length
                                       ? pageData?.comments.length + ' comments'
                                       : ''}
                                 </h3>
                              </div>
                           </div>
                        ),
                     },
                  ]}
               />
            </div>
         </div>
      </>
   )
}
