import { RoutineInformationEditProps } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input/Input";
import { Textarea } from "@/components/ui/input/TextArea";
import { RoutineService } from "@/app/services/routineService";

export default function RoutineInformationEdit(
  props: RoutineInformationEditProps
) {
  const { handleIsEditing, name, description, id, handleInformationChange } =
    props;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;


    try {
      const response = await RoutineService.updateRoutine(id, {
        name,
        description,
      });
      handleInformationChange(name, description);
      handleIsEditing();
    } catch (error) {
      console.error("Error actualizando rutina:", error);
    }
  };

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
