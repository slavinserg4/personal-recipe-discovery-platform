interface RecipeCardProps {
    title: string;
    description: string;
    image?: string;
    author: string;
}

const RecipeCard = ({ title, description, image, author }: RecipeCardProps) => {
    return (
        <div className="border rounded-md p-4 shadow-sm">
            {image && (
                <img
                    src={image}
    alt={title}
    className="w-full h-48 object-cover rounded-md"
        />
)}
    <h3 className="text-xl font-bold mt-2">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <p className="text-sm text-gray-500 mt-2">Автор: {author}</p>
    </div>
);
};

export default RecipeCard;