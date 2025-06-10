import { Button } from '@heroui/react';
import { UserIcon } from './icons/UserIcon';

interface onOpenProps {
    onOpen: () => void;
}
export default function AddUser({ onOpen }: onOpenProps) {
    return (
        <div className="flex gap-4 items-center">
            <Button
                startContent={<UserIcon />}
                variant="flat"
                size="lg"
                onPress={onOpen}
            >
                Add user
            </Button>
        </div>
    );
}
