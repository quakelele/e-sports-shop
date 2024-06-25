import {
  useAddToCartMutation,
  useDeleteProductMutation,
  useGetCartQuery,
  useGetFavoriteProductsQuery,
  useAddToFavoritesMutation,
  useDeleteFavoriteProductMutation,
} from "../../Api"
import { ProductType } from "../../Api/types"
import { Link } from "react-router-dom"
import s from "./Product.module.scss"

export const Product = ({ product }: { product: ProductType }) => {
  const { data: cartData } = useGetCartQuery()
  const { data: favoritesData } = useGetFavoriteProductsQuery()

  const [deleteProduct] = useDeleteProductMutation()
  const [addToCart] = useAddToCartMutation()
  const [addToFavorites] = useAddToFavoritesMutation()
  const [deleteFromFavorites] = useDeleteFavoriteProductMutation()

  const isProductInCart = cartData?.some(item => item.id == product.id)

  const isProductInFavorites = favoritesData?.some(
    item => item.id === product.id
  )

  const handleAddToCart = () => {
    if (isProductInCart) {
      deleteProduct(product.id)
      return
    }
    addToCart(product)
  }

  const handleAddToFavorites = () =>
    isProductInFavorites
      ? deleteFromFavorites(product.id)
      : addToFavorites(product)

  return (
    <div className={s.card}>
      <div
        className={
          isProductInCart
            ? s.cardActive
            : isProductInFavorites
            ? s.cardActiveFavorite
            : s.cardTopFavoriteDrop
        }>
        <Link
          style={{
            textDecoration: "none",
            color: "black",
          }}
          to={`/${product.id}`}>
          <h3>{product.title}</h3>
        </Link>
      </div>
      <Link to={`/${product.id}`}>
        <img src={product.imageUrl[0]} alt="" />
      </Link>

      <div className={s.content}>
        <div className={s.row}>
          <div className={s.details}>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
              }}
              to={`/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>
          </div>
          <h3 className={s.price}>
            {product.price} <span>$</span>
          </h3>
        </div>
        <div className={s.buttons}>
          <button
            onClick={handleAddToFavorites}
            className={isProductInFavorites ? s.addedFav : s.favBtn}>
            add to favorites
          </button>
          <button
            className={isProductInCart ? s.added : s.addBtn}
            onClick={handleAddToCart}>
            add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
