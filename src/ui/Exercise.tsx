import { ExerciseItemProps } from "@/types";
import Image from "next/image";
import ImagePlaceHoler from "../../public/ejercicios-basicos-de-gimnasio.webp";

export default function Exercise({ name }: ExerciseItemProps) {
  return (
    <div className="flex flex-col items-center bg-gray-800 shadow-lg rounded-lg cursor-pointer w-64 hover:bg-gray-700 transition-colors duration-200 overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={ImagePlaceHoler.src}
          alt={`Imagen del ejercicio: ${name}`}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <div className="p-4 w-full">
        <h2 className="text-xl font-semibold text-white text-center truncate">
          {name}
        </h2>
      </div>
    </div>
  );
}
