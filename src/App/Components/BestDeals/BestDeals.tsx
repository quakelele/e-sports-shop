import s from "./BestDeals.module.scss"
import down from "@assets/arrow-down.png"
import up from "@assets/arrow-up.png"
import discount from "@assets/discount-icon.png"

type Props = {
  setSortPrice: (arg: string) => void
  sortPrice: string
}

export const BestDeals = ({ sortPrice, setSortPrice }: Props) => (
  <div className={s.wrapper}>
    <img src={discount} alt="" />
    <span className={s.priceDirection}>
      {sortPrice === "asc" ? "to high" : "to low"}
    </span>
    <div className={s.arrows}>
      {sortPrice === "asc" ? (
        <button onClick={() => setSortPrice("desc")}>
          <img className={s.arrowDown} src={up} alt="" />
        </button>
      ) : (
        <button onClick={() => setSortPrice("asc")}>
          <img className={s.arrowUp} src={down} alt="" />
        </button>
      )}
    </div>
  </div>
)
