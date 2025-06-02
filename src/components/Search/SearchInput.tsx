import { Input } from '@heroui/react';

interface SearchByNameUserProps {
    onSearch: (value: string) => void;
}
function SearchByNameUser({ onSearch }: SearchByNameUserProps) {
    return (
        <Input
            className="max-w-xs"
            label="Search"
            type="search"
            maxLength={100}
            onValueChange={onSearch}
            size="sm"
        />
    );
}

export default SearchByNameUser;
