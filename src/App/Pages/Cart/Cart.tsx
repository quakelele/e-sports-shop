import { CartItem } from '../../Features/CartItem/CartItem'
import { CheckOut } from '../../Components/CheckOut/CheckOut'
import './Cart.scss'
import { useGetCartQuery } from '../../Api'
import { sumCartTotal } from './Utils/sumCartTotal'
import { EmptyCart } from '../EmptyCart/EmptyCart'

export const Cart = () => {
   const { data: cartData = [] } = useGetCartQuery()

   return (
      <>
         {cartData.length ? (
            <div className="wrapper">
               <div className="cart">
                  <h2 className="cart__count">
                     Cart{' '}
                     {cartData.length > 0 && (
                        <span>{sumCartTotal(cartData)}</span>
                     )}{' '}
                  </h2>
                  <div className="cart__wrapper"></div>
                  {cartData.map(obj => (
                     <CartItem key={obj.id} product={obj} />
                  ))}
                  <CheckOut cartData={cartData} />
               </div>
            </div>
         ) : (
            <EmptyCart />
         )}
      </>
   )
}
