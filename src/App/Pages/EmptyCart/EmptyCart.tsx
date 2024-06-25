import s from './EmptyCart.module.scss'
import emptyCart from '@assets/emptyCart.png'
import { HiMiniArrowSmallLeft } from 'react-icons/hi2'
import { BiWinkSmile } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
   return (
      <div className={s.wrapper}>
         <div className={s.text}>
            <h1> Your SelfShop Cart is empty.</h1>
            <h2>
               Check your Saved for later items below <br />
               or continue shopping.
            </h2>
         </div>
         <div className={s.imgs}>
            <Link to="/">
               <img src={emptyCart} alt="" />
            </Link>
            <Link to="/">
               <div className={s.goBack}>
                  <HiMiniArrowSmallLeft className={s.return} />
                  <h3>
                     Go back? <BiWinkSmile />
                  </h3>
               </div>
            </Link>
         </div>
      </div>
   )
}

export { EmptyCart }
