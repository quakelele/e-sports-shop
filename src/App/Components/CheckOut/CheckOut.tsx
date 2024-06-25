import s from './CheckOut.module.scss'
import { Switch } from 'antd'
import Arrow from '@assets/ArrowCart.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCartTotal } from '../../Pages/Cart/Utils/getCartTotal'
import {
   cartDiscount,
   cartTotalPrice,
} from '../../Pages/Cart/Utils/getCartDiscount'
import { ProductType } from '../../Api/types'

export const CheckOut = ({ cartData }: { cartData: ProductType[] }) => {
   const [discountPromocode, setDiscountPromocode] = useState(false)
   const onChange = (value: boolean) => {
      setDiscountPromocode(value)
   }
   const totalDiscount = discountPromocode
      ? getCartTotal(cartData) - cartDiscount(cartData)
      : cartTotalPrice(cartData)

   return (
      <div className={s.wrapper}>
         <div className={s.wrapperTop}>
            <h3>Promocode</h3>
            <span className={s.switch}>
               HAPPY <Switch onChange={onChange} />
            </span>
            <h3
               className={
                  discountPromocode ? `${s.congrats} ${s.active} ` : s.congrats
               }>
               Congrats! You have 10% discount
            </h3>
            <h3
               className={
                  discountPromocode ? `${s.discount} ${s.active}` : s.discount
               }>
               Discount: ${cartDiscount(cartData)}
            </h3>
         </div>
         <div className={s.wrapperBottom}>
            <Link to="/">
               <div className={s.left}>
                  <img src={Arrow} alt="" />
                  <h3>Back to shopping</h3>
               </div>
            </Link>
            <div className={s.right}>
               <h3>Total Price:</h3>
               <h4>${totalDiscount}</h4>
               <button>Check out</button>
            </div>
         </div>
      </div>
   )
}
