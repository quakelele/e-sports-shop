import { ProductType } from '../../../Api/types'

export const getCartTotal = (data: ProductType[]) => {
   return data.reduce((sum, obj) => sum + obj.price * obj.quantity, 0)
}
