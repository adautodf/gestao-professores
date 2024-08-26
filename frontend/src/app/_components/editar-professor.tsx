import React, { useEffect, useState } from "react";
import {
    Button,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalContent
} from "@nextui-org/react";
import api from "../api";

interface FormData {
    professorId?: string;
    nome: string;
    curso: string;
}

interface EditarProfessorProps {
    professor: FormData | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditarProfessor({ professor, isOpen, onClose }: EditarProfessorProps) {
    const [formData, setFormData] = useState<FormData>({
        professorId: professor?.professorId,
        nome: professor?.nome || "",
        curso: professor?.curso || "",
    });

    useEffect(() => {
        if (professor) {
            setFormData({
                professorId: professor.professorId,
                nome: professor.nome,
                curso: professor.curso,
            });
        }
    }, [professor]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (formData.professorId) {
                const response = await api.put(`/professor/${formData.professorId}/`, formData);
                console.log("Resposta da API:", response);
            } else {
                console.error("Erro: ID do professor não definido.");
            }
            onClose();
        } catch (error) {
            console.error("Erro ao Salvar o Professor:", error);
        }
    };

    return (
        <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col">
                    Editar Professor
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleFormSubmit}>
                        <Input
                            isRequired
                            name="nome"
                            label="Nome do Professor"
                            onChange={handleInputChange}
                            value={formData.nome}
                        />
                        <Input
                            className="mt-2"
                            name="curso"
                            label="Curso"
                            onChange={handleInputChange}
                            value={formData.curso}
                        />
                        <div className="flex flex-col-reverse sm:flex-row mt-4 sm:space-x-2 mb-4">
                            <Button color="danger" variant="flat" onPress={onClose} className="w-full mt-2 sm:mt-0">
                                Cancelar
                            </Button>
                            <Button color="primary" type="submit" className="w-full sm:mt-0">
                                Salvar Alterações
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
