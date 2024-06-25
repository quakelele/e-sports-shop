import s from './FavoriteItem.module.scss'
import { ProductType } from '../../Api/types'
import { Image } from 'antd'
import { Link } from 'react-router-dom'
import { useDeleteFavoriteProductMutation } from '../../Api'
import {
   useAddToCartMutation,
   useDeleteProductMutation,
   useGetCartQuery,
} from '../../Api/CartApi/CartApi'
type Props = {
   product: ProductType
}

export const FavoriteItem = ({ product }: Props) => {
   const [addToCart] = useAddToCartMutation()
   const { data: cart } = useGetCartQuery()
   const [deleteFromFavorites] = useDeleteFavoriteProductMutation()
   const [deleteProduct] = useDeleteProductMutation()

   const isProductInCart = cart?.some(item => item.id === product.id)

   const handleAddToCart = () => {
      if (isProductInCart) {
         deleteProduct(product.id)
         return
      }
      addToCart(product)
   }

   return (
      <div className={s.itemWrapper}>
         <div className={s.itemInner}>
            <Image.PreviewGroup items={product.imageUrl}>
               <Image src={product.imageUrl[0]} />
            </Image.PreviewGroup>

            <div className={s.itemTop}>
               <Link
                  style={{
                     textDecoration: 'none',
                     color: 'black',
                  }}
                  to={`/${product.id}`}>
                  <h3>{product.title}</h3>
               </Link>

               <p>{product.description}</p>
               <div className={s.itemBottom}>
                  <h4>{product.price} $</h4>
                  <button
                     className={s.addedFav}
                     onClick={() => deleteFromFavorites(product.id)}>
                     Remove
                  </button>
                  <button
                     className={isProductInCart ? s.added : s.addBtn}
                     onClick={handleAddToCart}>
                     Add to cart
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}
