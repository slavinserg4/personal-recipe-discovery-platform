interface SearchBarProps {
    onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Пошук рецептів..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full border p-2 rounded"
            />
        </div>
    );
};

export default SearchBar;