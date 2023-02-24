// 文章类型

export interface Article {
  [key: string]: any
}
export interface ArticleList {
  Articles: Article[]
}
// 文章列表类型
export type ArticleList = ArticleList
export type Articles = Article[]
export type Article = Article
