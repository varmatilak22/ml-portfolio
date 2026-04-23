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
export interface ProjectInput {
    title: string;
    githubLink: string;
    thumbnailUrl: string;
    tags: Array<string>;
    description: string;
    kaggleLink: string;
    videoUrl: string;
}
export interface SocialLinks {
    linkedin: string;
    email: string;
    kaggle: string;
    github: string;
}
export type ProjectId = bigint;
export interface Profile {
    bio: string;
    title: string;
    socialLinks: SocialLinks;
    name: string;
}
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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProject(input: ProjectInput): Promise<Project>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProject(id: ProjectId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getProfile(): Promise<Profile | null>;
    getProject(id: ProjectId): Promise<Project | null>;
    getProjects(): Promise<Array<Project>>;
    getSkills(): Promise<Array<string>>;
    isCallerAdmin(): Promise<boolean>;
    setProfile(profile: Profile): Promise<void>;
    setSkills(skills: Array<string>): Promise<void>;
    updateProject(id: ProjectId, input: ProjectInput): Promise<boolean>;
}
