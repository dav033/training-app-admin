import { RoutineInformationProps } from "@/types";
import { MdOutlineEdit } from "react-icons/md";

export default function RoutineInformation(props: RoutineInformationProps) {
  const { name, description, handleIsEditing } = props;
  return (
    <div className="">
      <div className="flex flex-row items-center align-middle mb-6">
        {" "}
        <h1 className="text-5xl">{name}</h1>
        <button
          className="bg-gray-800 p-2 rounded ml-[50%]"
          onClick={handleIsEditing}
        >
          <MdOutlineEdit className="w-5 h-5" />
        </button>
      </div>
      <div>
        <h2 className="text-xl text-gray-400 mb-3">Descripcion</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
