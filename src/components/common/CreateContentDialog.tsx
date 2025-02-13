// src/components/CreateContentDialog.tsx
"use client";

import { useState } from "react";
import { CreateContentDialogProps } from "@/types";

import { Dialog } from "@/components/ui/dialog/Dialog";
import { DialogHeader } from "@/components/ui/dialog/DialogHeader";
import { DialogFooter } from "@/components/ui/dialog/DialogFooter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input/Input";
import { DialogTrigger } from "@/components/ui/dialog/DialogTrigger";
import { FiPlus } from "react-icons/fi";
import { DialogContent } from "@/components/ui/dialog/DialogContent";
import { DialogTitle } from "@/components/ui/dialog/DialogTitle";

export default function CreateContentDialog(props: CreateContentDialogProps) {
  const { isOpen, onClose, title, onCreate, setOpen } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Se envía la request de creación con name y description.
      const createdItem = await onCreate({ name, description });
      console.log("Objeto creado:", createdItem);
      setName("");         // Limpiar el campo name
      setDescription("");  // Limpiar el campo description
      onClose();           // Cerrar el diálogo
    } catch (error) {
      console.error("Error al crear el item:", error);
      // Aquí se puede mostrar un mensaje de error al usuario.
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FiPlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreate}>
          <div className="space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
            />
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Crear</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
