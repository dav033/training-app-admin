import { EntityItemProps } from "@/types";
import Image from "next/image";
import ImagePlaceHoler from "../../../public/ejercicios-basicos-de-gimnasio.webp";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EntityItem(props: EntityItemProps) {
  const { id, name } = props;

  console.log(props)

  const router = useRouter();

  const pathname = usePathname();

  return (
    <div
      className="flex flex-col items-center bg-gray-800 shadow-lg rounded-lg cursor-pointer w-64 hover:bg-gray-700 transition-colors duration-200 overflow-hidden"
      onClick={() => router.push(pathname + "/" + id)}
    >
      <div className="relative w-full h-48">
        <Image
          src={props.thumbnailUrl}
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
