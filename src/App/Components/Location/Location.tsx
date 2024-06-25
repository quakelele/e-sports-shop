import s from './Location.module.scss'
import down from '@assets/arrow-down.png'
import up from '@assets/arrow-up.png'
import location from '@assets/location-icon.png'

export const Location = () => (
   <div className={s.locationWrapper}>
      <img src={location} alt="" />
      <p>San Francisco, California</p>
      <div className={s.arrows}>
         <img src={up} alt="" />
         <img src={down} alt="" />
      </div>
   </div>
)
