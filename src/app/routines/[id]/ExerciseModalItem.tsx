import { Exercice } from "@/types";
import { Check } from "lucide-react";
import { title } from "process";
import Image from "next/image";
import image from "../../../../public/ejercicios-basicos-de-gimnasio.webp";

interface ExerciseModalItemProps {
  exercise: Exercice;
  index: number;
  onClick: () => void;
  isSelected: boolean;
  // addExercise: (exercise: Exercice, index: number) => void;
}

export default function ExerciseModalItem(props: ExerciseModalItemProps) {
  const { exercise, index, onClick, isSelected } = props;

  // return <div onClick={() => addExercise(exercise, index)}>ejercicio</div>;

  return (
    <div
      className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
        isSelected ? "bg-blue-500/20" : "hover:bg-zinc-800"
      }`}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={exercise.name}
        width={60}
        height={60}
        className="rounded-[100%] w-[60px] h-[60px] object-cover"
      />
      <div className="ml-3 flex-grow">
        <h3 className="text-sm font-medium text-zinc-100">{exercise.name}</h3>
      </div>
      {isSelected && <Check className="h-5 w-5 text-blue-400" />}
    </div>
  );
}
