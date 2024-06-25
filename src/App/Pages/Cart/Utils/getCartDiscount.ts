import { ProductType } from '../../../Api/types'

export const cartDiscount = (data: ProductType[]) => {
   return data.reduce(
      (sum: number, obj) =>
         sum + Math.round(((Number(obj.price) * obj.quantity) / 100) * 10),
      0
   )
}
export const cartTotalPrice = (data: ProductType[]) => {
   return data.reduce((sum, obj) => sum + obj.price * obj.quantity, 0)
}
