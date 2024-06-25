import s from './Layout.module.scss'
import { Header } from '../App/Widgets/Header/Header'
import { Home } from '../App/Pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import { Cart } from '../App/Pages/Cart/Cart'
import { ProductPage } from '../App/Pages/ProductPage/ProductPage'
import { Auth } from '../App/Pages/Auth/Auth'
import { Registration } from '../App/Pages/Registration/Registration'
import { Favorites } from '../App/Pages/Favorites/Favorites'
import { Gallery } from '../App/Pages/Gallery/Gallery'
import { Contact } from '../App/Pages/Contact/Contact'

export const Layout = () => (
   <div className={s.Layout}>
      <Header />
      <Routes>
         <Route path="auth" element={<Auth />} />
         <Route path="auth/registration" element={<Registration />} />
         <Route path="cart" element={<Cart />} />
         <Route path="/" element={<Home />} />
         <Route path="/:id" element={<ProductPage />} />
         <Route path="favorites" element={<Favorites />} />
         <Route path="gallery" element={<Gallery />} />
         <Route path="contact" element={<Contact />} />
      </Routes>
   </div>
)
