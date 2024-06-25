import s from "./Header.module.scss"
import logo from "@assets/button.png"
import user from "@assets/icons_User_Line.png"
import basket from "@assets/shopping-cart.png"
import { Link } from "react-router-dom"
import { useGetCartQuery, useGetFavoriteProductsQuery } from "../../Api"
import { sumCartTotal } from "../../Pages/Cart/Utils/sumCartTotal"
import { GiHamburgerMenu } from "react-icons/gi"
import { GrFavorite } from "react-icons/gr"
import { IoMdClose } from "react-icons/io"
import { useState } from "react"

export const Header = () => {
  const [active, setActive] = useState(false);

  const { data: cartData = [] } = useGetCartQuery();
  const { data: favoritesData = [] } = useGetFavoriteProductsQuery();
  return (
    <div className={s.wrapper}>
      <div className={s.wrapper__left}>
        <div className={s.logoBlock}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <span className={s.logoBlock__divider}></span>
        </div>

        <ul
          onClick={() => setActive(!active)}
          className={active ? `${s.navigation} ${s.active}` : s.navigation}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="favorites">Favorites</Link>
          </li>
          <li>
            <Link to="gallery">Gallery</Link>
          </li>

          <li>
            <Link to="contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className={s.wrapper__right}>
        <Link to="cart">
          <div>
            <img src={basket} alt="basket" />
            {cartData.length > 0 && (
              <span className={s.circleForBasket}>
                {sumCartTotal(cartData)}
              </span>
            )}
          </div>
        </Link>

        <Link to="auth">
          <img src={user} alt="user" />
        </Link>

        <Link to="favorites">
          <div>
            <GrFavorite className={s.favoriteButton} />
            {favoritesData.length > 0 && (
              <span className={s.circleForFavorite}>
                {favoritesData.length}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Под вопросом эта фича */}
      <div onClick={() => setActive(!active)}>
        {active ? (
          <IoMdClose className={s.mobileBtn} />
        ) : (
          <GiHamburgerMenu className={s.mobileBtn} />
        )}
      </div>
    </div>
  )
}
