import style from './InputPrice.module.scss'

export const InputPrice = () => {
    return (
        <div className={style.wrapper}>
            <h3>PRICE</h3>
            <div className={style.inputFlex}>
                <input placeholder='40$' type="text" />
                <span></span>
                <input placeholder='100$' type="text" />
            </div>
        </div>
    )
}
