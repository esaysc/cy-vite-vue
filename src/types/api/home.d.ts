// 分类数据单项类型
export interface Goods {
  desc: string
  id: string
  name: string
  picture: string
  price: string
  title: string
  alt: string
}
export type Rows<T extends any> = {
  items: T[]
  total: number
}

export interface User {
  code: number
  data: object
  message: any
  success: any
}

export interface Children {
  id: string
  name: string
  picture: string
  goods: Goods[]
}

export interface Category {
  id: string
  name: string
  picture: string
  children: Children[]
  goods: Goods[]
  user: User[]
}
export interface ContactResponse extends JSONResponse {
  data: Rows<User>
}

// 分类数据列表类型
export type User = User[]
export type CategoryList = User[]
export type Result = {
  code: number
  message: string
  result: T
}
