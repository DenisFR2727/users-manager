import { ModalBody, ModalContent, ModalHeader, Modal } from '@heroui/react';
import type { ReactNode } from 'react';
import './modal.scss';

interface UserFormProps {
    isOpen: boolean;
    onOpenChange: () => void;
    children?: ReactNode;
}

export default function ModalUser({
    isOpen,
    onOpenChange,
    children,
}: UserFormProps) {
    return (
        <>
            <Modal
                className="modal-user"
                isOpen={isOpen}
                placement="top"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                        <ModalBody>{children}</ModalBody>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}
