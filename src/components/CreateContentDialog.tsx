"use client";

import { useState } from "react";

import { CreateContentDialogProps } from "@/types";

import { Dialog } from "@/ui/dialog/Dialog";
import { DialogHeader } from "@/ui/dialog/DialogHeader";
import { DialogFooter } from "@/ui/dialog/DialogFooter";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/input/Input";
import { DialogTrigger } from "@/ui/dialog/DialogTrigger";
import { FiPlus } from "react-icons/fi";
import { DialogContent } from "@/ui/dialog/DialogContent";
import { DialogTitle } from "@/ui/dialog/DialogTitle";
export default function CreateContentDialog(
  props: CreateContentDialogProps<any>
) {
  const { isOpen, onClose, title, onCreate, setOpen } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    onCreate({ name, description });
    onClose();
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
