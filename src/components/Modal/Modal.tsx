import { ModalBody, ModalContent, ModalHeader, Modal } from '@heroui/react';
import { useEffect, type ReactNode } from 'react';
import './modal.scss';
import { useAppDispatch } from '../../redux/hooks';
import { setIsOpenModal } from '../../features/users/UsersSlice';

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
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isOpen) {
            dispatch(setIsOpenModal(true));
        } else {
            dispatch(setIsOpenModal(false));
        }
    }, [dispatch, isOpen]);

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
