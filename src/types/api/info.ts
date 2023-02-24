// 返回信息类型
export interface Info {
  code: number
  data: All
  message: any
  success: any
}
export interface All {
  [key: string]: any
}

// 信息列表类型
export type Infos = Info
export type Universal = All
