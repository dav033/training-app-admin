import React, { memo } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { ExerciseModalItemProps } from "@/types";
import image from "../../../../public/ejercicios-basicos-de-gimnasio.webp";

function ExerciseModalItem({ exercise, onClick, isSelected }: ExerciseModalItemProps) {
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
        className="rounded-full w-[60px] h-[60px] object-cover"
      />
      <div className="ml-3 flex-grow">
        <h3 className="text-sm font-medium text-zinc-100">{exercise.name}</h3>
      </div>
      {isSelected && <Check className="h-5 w-5 text-blue-400" />}
    </div>
  );
}

export default memo(ExerciseModalItem);
