import { MdOutlineEdit } from "react-icons/md";

interface PublicRoutineProps {
  isPublic: boolean;
  handleTogglePublic: () => void;
}

export default function PublicRoutine(props: PublicRoutineProps) {
  const { isPublic, handleTogglePublic } = props;

  //si esta publicado entonces se muestra el boton de publicar y si no se muestra el boton de despublicar

  return (
    <div className="flex justify-end">
      <button
        onClick={handleTogglePublic}
        className={`${
          isPublic ? "bg-red-500" : "bg-green-500"
        } text-white p-2 rounded`}
      >
        {isPublic ? "Despublicar" : "Publicar"}
      </button>
    </div>
  );
}
