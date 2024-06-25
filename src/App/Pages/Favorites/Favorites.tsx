import { useGetFavoriteProductsQuery } from '../../Api'
import { FavoriteItem } from '../../Features/FavoriteItem/FavoriteItem'
import { Empty, Typography } from 'antd'
import { Link } from 'react-router-dom'
import s from './Favorites.module.scss'

const Favorites = () => {
   const { data: favorites = [] } = useGetFavoriteProductsQuery()

   return (
      <>
         {favorites.length ? (
            <div className={s.wrapper}>
               <div className={s.inner}>
                  {favorites.map(product => (
                     <FavoriteItem key={product.id} product={product} />
                  ))}
               </div>
            </div>
         ) : (
            <div className={s.empty}>
               <Empty
                  imageStyle={{
                     height: 200
                  }}
                  description={
                     <Typography.Text>
                        Go to main <Link to="/">page</Link>
                     </Typography.Text>
                  }></Empty>
            </div>
         )}
      </>
   )
}

export { Favorites }
