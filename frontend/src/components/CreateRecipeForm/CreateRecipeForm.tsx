import { useState } from 'react';

const CreateRecipeForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instruction, setInstruction] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const recipe = {
            title,
            description,
            ingredients: ingredients.split(',').map(i => i.trim()),
            instruction
        };
        console.log('New recipe:', recipe);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
                <label className="block mb-2">Назва рецепту:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Опис:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded"
                    rows={3}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Інгредієнти (через кому):</label>
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Інструкція приготування:</label>
                <textarea
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    className="w-full border p-2 rounded"
                    rows={5}
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-500 text-white p-2 rounded"
            >
                Створити рецепт
            </button>
        </form>
    );
};

export default CreateRecipeForm;