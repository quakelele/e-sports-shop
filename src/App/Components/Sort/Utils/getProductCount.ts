import { ProductType } from "../../../Api/types"

export const getProductCount = (arr: ProductType[], name: string) =>
  arr.reduce((count, item) => (item.category === name ? count + 1 : count), 0)
