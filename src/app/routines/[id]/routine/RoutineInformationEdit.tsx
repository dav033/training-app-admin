import { memo, useCallback } from "react";
import { RoutineInformationEditProps } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input/Input";
import { Textarea } from "@/components/ui/input/TextArea";
import { RoutineService } from "@/app/services/routineService";

function RoutineInformationEdit({
  handleIsEditing,
  name,
  description,
  id,
  handleInformationChange,
}: RoutineInformationEditProps) {
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newName = formData.get("name") as string;
      const newDescription = formData.get("description") as string;

      try {
        await RoutineService.updateRoutine(id, {
          name: newName,
          description: newDescription,
        });
        handleInformationChange(newName, newDescription);
        handleIsEditing();
      } catch (error) {
        console.error("Error actualizando rutina:", error);
      }
    },
    [id, handleIsEditing, handleInformationChange]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Nombre"
        defaultValue={name}
        className="mb-6 bg-gray-800 border-none text-[1.1rem] h-12"
        name="name"
      />
      <Textarea
        placeholder="Descripción"
        defaultValue={description}
        className="mb-6 bg-gray-800 border-none text-[1.1rem]"
        name="description"
      />
      <Button className="bg-red-400" type="submit">
        Guardar
      </Button>
    </form>
  );
}

export default memo(RoutineInformationEdit);
