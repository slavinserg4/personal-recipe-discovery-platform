export interface IRecipe {
    id: string;
    title: string;
    description: string;
    ingredients: string[];
    instruction: string;
    author: string;
    rating?: number;
    image?: string;
}

