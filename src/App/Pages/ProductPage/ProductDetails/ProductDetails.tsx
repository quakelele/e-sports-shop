import { Rate, Image } from 'antd'
import { useState } from 'react'
import { BsFillHeartFill } from 'react-icons/bs'
import {
   useUpdateProductMutation,
   useGetCartQuery,
   useAddToFavoritesMutation,
   useGetFavoriteProductsQuery,
   useDeleteFavoriteProductMutation,
   useAddToCartMutation,
} from '../../../Api'
import s from './ProductDetails.module.scss'
import { ProductType } from 'App/Api/types'

type Props = {
   pageData?: ProductType
}

export const ProductDetails = ({ pageData }: Props) => {
   const { data: cartData = [] } = useGetCartQuery()
   const { data: favoritesData } = useGetFavoriteProductsQuery()
   const [quantityIncrement, setQuantityIncrement] = useState(1)
   const [updateProductQuantity] = useUpdateProductMutation()
   const [addToFavorites] = useAddToFavoritesMutation()
   const [favoritesHeartIcon, setFavoritesHeartIcon] = useState(false)
   const [deleteFromFavorites] = useDeleteFavoriteProductMutation()
   const [addToCart] = useAddToCartMutation()

   const isProductInFavorite = favoritesData?.some(
      item => item.id === pageData?.id
   )

   const decrementQuant = () => {
      if (quantityIncrement <= 1) {
         quantityIncrement
         return
      }
      setQuantityIncrement(quantityIncrement - 1)
   }

   const addToCartHandler = () => {
      if (pageData) {
         const isExistProductInCart = cartData.find(
            item => item.id === pageData.id
         )

         if (isExistProductInCart) {
            updateProductQuantity({
               ...pageData,
               quantity: quantityIncrement + isExistProductInCart.quantity,
            })
            setQuantityIncrement(1)
            return
         }
         addToCart(pageData) 
      }
   }

   const addToFavoritesHandler = () => {
      if (pageData) {
         isProductInFavorite
            ? deleteFromFavorites(pageData.id)
            : addToFavorites(pageData)
      }
      setFavoritesHeartIcon(!favoritesHeartIcon)
   }

   return (
      <div className={s.wrapperTop}>
         <div className={s.imgUrl}>
            <Image.PreviewGroup items={pageData?.imageUrl}>
               <Image src={pageData && pageData.imageUrl[0]} />
            </Image.PreviewGroup>
         </div>
         <div className={s.top}>
            <div className={s.topRight}>
               <h3>{pageData?.title}</h3>
               <BsFillHeartFill
                  className={
                     isProductInFavorite ? `${s.heart} ${s.active}` : s.heart
                  }
                  onClick={addToFavoritesHandler}
               />
            </div>
            <div className={s.price}>${pageData?.price}</div>
            <div className={s.description}>{pageData?.description}</div>
            <div className={s.rating}>
               <Rate value={pageData?.rating} /> {pageData?.rating}
            </div>
            <div className={s.quantity}>
               <span onClick={decrementQuant}>-</span>
               {quantityIncrement}
               <span
                  onClick={() => setQuantityIncrement(quantityIncrement + 1)}>
                  +
               </span>
            </div>
            <div className={s.btns}>
               <button>Order Now</button>
               <button onClick={addToCartHandler}>Add to Cart</button>
            </div>
         </div>
      </div>
   )
}
