"use client"

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Card,
  CardHeader,
  useDisclosure
} from "@nextui-org/react";
import { Edit, Trash, RefreshCw, Cpu, Microchip, Code2, Bot } from "lucide-react";
import api from "../api";
import EditarProfessor from "../_components/editar-professor";
import CriarProfessor from "../_components/criar-professor";

interface Professor {
  professorId: string;
  nome: string;
  curso: string;
}

export default function Professores() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchProfessores = async () => {
    const response = await api.get("/professor");
    setProfessores(response.data);
  }

  useEffect(() => {
    fetchProfessores();
  }, []);

  const handleEditClick = (professor: any) => {
    setSelectedProfessor(professor);
    onOpen();
  };

  const handleDeleteClick = async (id: string) => {
    await api.delete(`/professor/${id}`);
    fetchProfessores();
  };

  const handleRefreshClick = () => {
    fetchProfessores();
  };

  const columns = [
    { uid: "nome", name: "Nome" },
    { uid: "curso", name: "Curso" },
    { uid: "actions", name: "Ações" }
  ];

  const renderCell = (professor: any, columnKey: any) => {
    const cellValue = professor[columnKey];
    switch (columnKey) {
      case "nome":
        return <span>{professor.nome}</span>;
      case "curso":
        return <span>{professor.curso}</span>;
      case "actions":
        return (
            <div className="flex items-center gap-2">
              <Tooltip content="Editar Professor">
                <Button isIconOnly color="primary" variant="light" onClick={() => handleEditClick(professor)}>
                  <Edit size={17} />
                </Button>
              </Tooltip>
              <Tooltip content="Remover Professor">
                <Button isIconOnly color="primary" variant="light" onClick={() => handleDeleteClick(professor.professorId)}>
                  <Trash size={17} />
                </Button>
              </Tooltip>
            </div>
        );
      default:
        return cellValue;
    }
  };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
      <div className="space-y-4 mt-4 p-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Visão Geral de Todos os Professores</h1>
          <div className="flex space-x-1">
            <Button isIconOnly color="primary" className="ml-2 mt-[-3px]" onClick={handleRefreshClick}>
              <RefreshCw size={18} />
            </Button>
            <CriarProfessor />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-lg flex flex-col items-center justify-center p-4">
            <CardHeader className="flex flex-col items-center justify-center space-y-2">
              <Cpu color="#1d4ed8" />
              <h2 className="text-sm font-medium text-center">Ciência da Computação</h2>
            </CardHeader>
            <div className="text-2xl font-bold text-primary mt-[-5px]">{professores.filter(prof => prof.curso === "Ciência da Computação").length}</div>
          </Card>

          <Card className="rounded-lg flex flex-col items-center justify-center p-4">
            <CardHeader className="flex flex-col items-center justify-center space-y-2">
              <Microchip color="#1d4ed8" />
              <h2 className="text-sm font-medium text-center">Engenharia da Computação</h2>
            </CardHeader>
            <div className="text-2xl font-bold text-primary mt-[-5px]">{professores.filter(prof => prof.curso === "Engenharia da Computação").length}</div>
          </Card>

          <Card className="rounded-lg flex flex-col items-center justify-center p-4">
            <CardHeader className="flex flex-col items-center justify-center space-y-2">
              <Code2 color="#1d4ed8" />
              <h2 className="text-sm font-medium text-center">Análise e Desenvolvimento de Sistemas</h2>
            </CardHeader>
            <div className="text-2xl font-bold text-primary mt-[-5px]">{professores.filter(prof => prof.curso === "Análise e Desenvolvimento de Sistemas").length}</div>
          </Card>

          <Card className="rounded-lg flex flex-col items-center justify-center p-4">
            <CardHeader className="flex flex-col items-center justify-center space-y-2">
              <Bot color="#1d4ed8" />
              <h2 className="text-sm font-medium text-center">Engenharia de Controle e Automação</h2>
            </CardHeader>
            <div className="text-2xl font-bold text-primary mt-[-5px]">{professores.filter(prof => prof.curso === "Engenharia de Controle e Automação").length}</div>
          </Card>
        </div>

        <Table aria-label="Tabela de Professores">
          <TableHeader columns={columns}>
            {(column) => (
                <TableColumn key={column.uid}>
                  {column.name}
                </TableColumn>
            )}
          </TableHeader>
          <TableBody items={professores}>
            {(item) => (
                //@ts-ignore
                <TableRow key={item.professorId}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
            )}
          </TableBody>
        </Table>

        {selectedProfessor && (
            <EditarProfessor
                professor={selectedProfessor}
                isOpen={isOpen}
                onClose={() => {
                  setSelectedProfessor(null);
                  onClose();
                  fetchProfessores();
                }}
            />
        )}
      </div>
  );
}
