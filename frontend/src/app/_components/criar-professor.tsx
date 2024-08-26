"use client";

import React, { useState } from "react";
import {
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    useDisclosure,
    ModalContent,
} from "@nextui-org/react";
import {Plus} from "lucide-react";
import api from "../api";
import * as Toast from "@radix-ui/react-toast";

interface FormData {
    nome: string;
    curso: string;
}

export default function CriarProfessor() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [formData, setFormData] = useState<FormData>({
        nome: "",
        curso: "",
    });

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (
            !formData.nome ||
            !formData.curso
        ) {
            setToastMessage("Por favor, preencha todos os campos obrigatórios.");
            setOpenToast(true);
            return;
        }

        try {
            await api.post("/professor/", formData);
            setFormData({
                nome: "",
                curso: "",
            });
            setToastMessage("Professor criado com sucesso!");
            onClose();
        } catch (error) {
            setToastMessage("Erro ao criar o Professor.");
        } finally {
            setOpenToast(true);
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button isIconOnly color="primary" className="ml-2 mt-[-3px]"  onClick={onOpen}>
                    <Plus />
                </Button>
            </div>
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Criar Professor</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleFormSubmit}>
                            <Input
                                isRequired
                                name="nome"
                                label="Nome do Professor"
                                onChange={handleInputChange}
                            />
                            <Input
                                isRequired
                                className="mt-2"
                                name="curso"
                                label="Curso"
                                onChange={handleInputChange}
                            />
                            <div className="flex flex-col-reverse sm:flex-row mt-4 sm:space-x-2 mb-4">
                                <Button color="danger" variant="flat" onPress={onClose} className="w-full mt-2 sm:mt-0">
                                    Cancelar
                                </Button>
                                <Button color="primary" type="submit" className="w-full sm:mt-0">
                                    Criar Professor
                                </Button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Toast Component */}
            <Toast.Provider swipeDirection="right">
                <Toast.Root
                    open={openToast}
                    onOpenChange={setOpenToast}
                    className="bg-white border border-gray-300 shadow-lg rounded-md p-4"
                >
                    <Toast.Title >{toastMessage}</Toast.Title>
                </Toast.Root>
                <Toast.Viewport className="fixed bottom-0 right-0 p-6 flex flex-col gap-2 w-[360px] max-w-full m-0 list-none z-[2147483647] outline-none" />
            </Toast.Provider>
        </>
    );
}
