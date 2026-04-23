import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: BlogPostId;
    title: string;
    thumbnailUrl?: string;
    source: BlogPostSource;
    mediumUrl: string;
    tags: Array<string>;
    publishedAt: Timestamp;
    summary: string;
}
export interface KaggleMedals {
    bronze: bigint;
    gold: bigint;
    silver: bigint;
}
export type Timestamp = bigint;
export interface KaggleNotebookInput {
    title: string;
    views?: bigint;
    votes?: bigint;
    tags: Array<string>;
    description: string;
    notebookUrl: string;
}
export interface BlogPostInput {
    title: string;
    thumbnailUrl?: string;
    source: BlogPostSource;
    mediumUrl: string;
    tags: Array<string>;
    publishedAt: Timestamp;
    summary: string;
}
export interface SocialLinks {
    linkedin: string;
    email: string;
    kaggle: string;
    github: string;
}
export interface KaggleStats {
    bio?: string;
    totalCompetitions: bigint;
    username: string;
    totalNotebooks: bigint;
    rank?: string;
    totalDatasets: bigint;
    profileUrl: string;
    medals: KaggleMedals;
}
export interface Profile {
    bio: string;
    title: string;
    socialLinks: SocialLinks;
    name: string;
}
export interface ProjectInput {
    title: string;
    githubLink: string;
    thumbnailUrl: string;
    tags: Array<string>;
    description: string;
    kaggleLink: string;
    videoUrl: string;
}
export type BlogPostId = bigint;
export type ProjectId = bigint;
export interface KaggleNotebook {
    id: KaggleNotebookId;
    title: string;
    views?: bigint;
    votes?: bigint;
    tags: Array<string>;
    description: string;
    notebookUrl: string;
}
export type KaggleNotebookId = bigint;
export interface Project {
    id: ProjectId;
    title: string;
    githubLink: string;
    thumbnailUrl: string;
    createdAt: Timestamp;
    tags: Array<string>;
    description: string;
    updatedAt: Timestamp;
    kaggleLink: string;
    videoUrl: string;
}
export enum BlogPostSource {
    rss = "rss",
    manual = "manual"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBlogPost(input: BlogPostInput): Promise<BlogPost>;
    addKaggleNotebook(input: KaggleNotebookInput): Promise<KaggleNotebook>;
    addProject(input: ProjectInput): Promise<Project>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteBlogPost(id: BlogPostId): Promise<boolean>;
    deleteKaggleNotebook(id: KaggleNotebookId): Promise<boolean>;
    deleteProject(id: ProjectId): Promise<boolean>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    getCallerUserRole(): Promise<UserRole>;
    getKaggleNotebooks(): Promise<Array<KaggleNotebook>>;
    getKaggleStats(): Promise<KaggleStats | null>;
    getProfile(): Promise<Profile | null>;
    getProject(id: ProjectId): Promise<Project | null>;
    getProjects(): Promise<Array<Project>>;
    getSkills(): Promise<Array<string>>;
    isCallerAdmin(): Promise<boolean>;
    setKaggleStats(stats: KaggleStats): Promise<void>;
    setProfile(profile: Profile): Promise<void>;
    setSkills(skills: Array<string>): Promise<void>;
    updateBlogPost(id: BlogPostId, input: BlogPostInput): Promise<boolean>;
    updateKaggleNotebook(id: KaggleNotebookId, input: KaggleNotebookInput): Promise<boolean>;
    updateProject(id: ProjectId, input: ProjectInput): Promise<boolean>;
}
