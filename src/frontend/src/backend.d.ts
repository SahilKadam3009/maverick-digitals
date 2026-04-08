import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type ServiceType = string;
export type ArticleId = bigint;
export interface ContactSubmission {
    id: bigint;
    serviceType: ServiceType;
    name: string;
    submittedAt: Timestamp;
    email: string;
    message: string;
}
export interface BlogArticle {
    id: ArticleId;
    title: string;
    body: string;
    tags: Array<string>;
    publishedAt: Timestamp;
    author: string;
    featuredImageUrl: string;
    excerpt: string;
    category: string;
}
export interface backendInterface {
    addBlogArticle(title: string, excerpt: string, body: string, category: string, tags: Array<string>, publishedAt: Timestamp, author: string, featuredImageUrl: string): Promise<ArticleId>;
    getBlogArticleById(id: ArticleId): Promise<BlogArticle | null>;
    getBlogArticles(): Promise<Array<BlogArticle>>;
    getContacts(): Promise<Array<ContactSubmission>>;
    searchBlogArticles(searchQuery: string, category: string | null, tag: string | null): Promise<Array<BlogArticle>>;
    submitContact(name: string, email: string, serviceType: ServiceType, message: string): Promise<bigint>;
}
