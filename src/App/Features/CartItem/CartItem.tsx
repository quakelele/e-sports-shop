import { ProductType } from '../../Api/types'
import { useDeleteProductMutation, useUpdateProductMutation } from '../../Api'
import {
   useGetFavoriteProductsQuery,
   useAddToFavoritesMutation,
   useDeleteFavoriteProductMutation,
} from '../../Api/FavoritesApi/FavoritesApi'
import { BsFillHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Image } from 'antd'
import deleteIcon from '@assets/Icon_X.png'
import iconPlus from '@assets/Icon_Plus.png'
import iconMinus from '@assets/Icon_Minus.png'
import s from './CartItem.module.scss'

export const CartItem = ({ product }: { product: ProductType }) => {
   const { data: favorites } = useGetFavoriteProductsQuery()
   const [deleteProduct] = useDeleteProductMutation()
   const [updateProductQuantity] = useUpdateProductMutation()
   const [addToFavorites] = useAddToFavoritesMutation()
   const [deleteFromFavorites] = useDeleteFavoriteProductMutation()

   const isProductInFavorites = favorites?.some(item => item.id === product.id)

   const handleAddToFavorites = () => {
      if (isProductInFavorites) {
         deleteFromFavorites(product.id)
         return
      }
      addToFavorites(product)
   }

   const deleteHandler = () => deleteProduct(product.id)

   const plusQuantityHandler = () =>
      updateProductQuantity({
         ...product,
         quantity: product.quantity + 1,
      })

   const minusQuantityHandler = () => {
      if (product.quantity <= 1) {
         product
         return
      }
      updateProductQuantity({ ...product, quantity: product.quantity - 1 })
   }

   return (
      <div className={s.productWrapper}>
         <div className={s.productTop}>
            <div className={s.productImage}>
               <Image.PreviewGroup items={product.imageUrl}>
                  <Image src={product.imageUrl[0]} />
               </Image.PreviewGroup>
            </div>

            <Link
               style={{
                  textDecoration: 'none',
                  color: 'black',
               }}
               to={`/${product.id}`}>
               <h2 className={s.productTitle}> {product.title}</h2>
            </Link>
         </div>
         <div className={s.productPrice}>
            ${product.price * product.quantity}
         </div>
         <div className={s.productQuantity}>
            <img onClick={minusQuantityHandler} src={iconMinus} alt="" />
            {product.quantity}
            <img onClick={plusQuantityHandler} src={iconPlus} alt="" />
         </div>
         <div className={s.productTotalPrice}>
            ${product.price * product.quantity}
         </div>
         <div className={s.productFavorites}>
            <img
               onClick={deleteHandler}
               width={20}
               height={20}
               src={deleteIcon}
               alt=""
            />

            <BsFillHeartFill
               onClick={() => handleAddToFavorites()}
               className={
                  isProductInFavorites
                     ? `${s.heartIcon} ${s.active}`
                     : s.heartIcon
               }
            />
         </div>
      </div>
   )
}
