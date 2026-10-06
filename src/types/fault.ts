import { Category } from "@/data/categories";

export type Fault = {
    id: string;
    title: string;
    description: string;
    location: string;
    category: Category;
    createdAt: string;
    imageUri?: string;
};