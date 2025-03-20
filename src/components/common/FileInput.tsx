import { Dispatch, SetStateAction, useState } from "react";
import { FiUpload } from "react-icons/fi";

/**
 * El tipo de archivos que aceptará el componente:
 *  - 'image': solo imágenes
 *  - 'video': solo videos
 *  - 'both': ambos
 */
type AcceptType = "image" | "video" | "both";

interface FileInputProps {
  acceptType?: AcceptType;                  // Por defecto 'image'
  setFile: Dispatch<SetStateAction<File | null>>;
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
  previewUrl: string | null;
}

export default function FileInput(props: FileInputProps) {
  const {
    acceptType = "image", // valor por defecto
    setFile,
    setPreviewUrl,
    previewUrl,
  } = props;

  // Para saber si el archivo actual es imagen o video
  const [fileKind, setFileKind] = useState<"image" | "video" | null>(null);

  // Generar la cadena de 'accept' según la prop
  const acceptString = (() => {
    switch (acceptType) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "both":
        return "image/*,video/*";
      default:
        return "image/*"; // fallback
    }
  })();

  const handleFile = (file: File) => {
    // Revisar el tipo
    if (file.type.startsWith("image/")) {
      setFileKind("image");
    } else if (file.type.startsWith("video/")) {
      setFileKind("video");
    } else {
      setFileKind(null);
    }

    // Crear URL para la vista previa (URL.createObjectURL es más simple que FileReader para videos)
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFile(null);
      setPreviewUrl(null);
      setFileKind(null);
      return;
    }

    handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) {
      setFile(null);
      setPreviewUrl(null);
      setFileKind(null);
      return;
    }

    handleFile(file);
  };

  return (
    <div>
      <label
        htmlFor="fileUpload"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="
          relative 
          flex items-center justify-center 
          w-full h-32 
          border-2 border-dashed border-gray-300 rounded-lg 
          cursor-pointer 
          hover:border-blue-500 transition-colors
          overflow-hidden
        "
      >
        <input
          id="fileUpload"
          type="file"
          accept={acceptString}
          onChange={handleFileChange}
          className="hidden"
        />

        {previewUrl ? (
          fileKind === "image" ? (
            <img
              src={previewUrl}
              alt="Vista previa"
              className="h-full w-auto object-contain"
            />
          ) : fileKind === "video" ? (
            <video
              src={previewUrl}
              controls
              className="h-full w-auto object-contain"
            />
          ) : (
            // Si no es imagen ni video (caso raro), simplemente no mostramos preview
            <p className="text-sm text-gray-500">Archivo no soportado</p>
          )
        ) : (
          // Si no hay archivo cargado, mostramos el placeholder
          <>
            <FiUpload className="w-8 h-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Selecciona o arrastra un archivo
            </p>
          </>
        )}
      </label>
    </div>
  );
}
