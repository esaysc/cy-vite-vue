// 用户信息类型

export interface UserInfo {
  [key: string]: any
}
export interface UserInfoList {
  UserInfos: UserInfo[]
}
// 文章列表类型
export type UserInfoList = UserInfoList
export type UserInfos = UserInfo[]
export type UserInfo = UserInfo
