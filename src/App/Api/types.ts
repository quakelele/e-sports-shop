export type CommentTypes = {
  author: string;
  text: string;
  timestamp: string;
  likes: number;
  id: number;
};

export type UsersType = {
  username: string;
  password: string;
  nickname: string;
};

export type ProductType = {
  title: string;
  id: number;
  imageUrl: string[];
  category: string;
  rating: number;
  description: string;
  quantity: number;
  price: number;
  types?: number[];
  comments?: CommentTypes[];
  weight?: number;
};


export type SearchPrice = {
  from: number;
  to: number;
};

export type UpdateFilters = {
  searchPrice?: number[];
  category?: string[]
 

};

export type GetProductsRequest = {
  updateFilters?: UpdateFilters;
  inputValue: string;
  pagination?: number;
  sortPrice?: string
};

