import { ProductType } from "../../../Api/types"

//утилиты нужные только для карт положить к карт. глобальные утилиты только для многих компонентов
const sumFavoritesTotal = (data:ProductType[]) => {
    return data.reduce((sum, obj) => sum + Math.round(Number(obj.quantity)), 0)
}

export { sumFavoritesTotal }