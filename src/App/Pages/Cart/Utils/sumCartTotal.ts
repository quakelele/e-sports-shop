import { ProductType } from '../../../Api/types'

export const sumCartTotal = (data: ProductType[]) => {
   return data.reduce((sum, obj) => sum + Math.round(Number(obj.quantity)), 0)
}
