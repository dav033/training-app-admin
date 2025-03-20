"use client";

import { useState } from "react";
import { CreateContentDialogProps } from "@/types";
import { uploadFileAws } from "@/lib/awsUtils";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { DialogHeader } from "@/components/ui/dialog/DialogHeader";
import { DialogFooter } from "@/components/ui/dialog/DialogFooter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input/Input";
import { DialogTrigger } from "@/components/ui/dialog/DialogTrigger";
import { FiPlus } from "react-icons/fi";
import { DialogContent } from "@/components/ui/dialog/DialogContent";
import { DialogTitle } from "@/components/ui/dialog/DialogTitle";
import { RoundExerciseService } from "@/app/services/roundExerciseService";
import FileInput from "./FileInput";
import { dataItemType } from "@/types";

// Función para capturar un frame a 1 segundo del video
async function captureThumbnailFromVideo(videoFile: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(videoFile);
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("loadedmetadata", () => {
      if (video.duration < 1) {
        reject(new Error("El video es muy corto para capturar en el segundo 1."));
      } else {
        video.currentTime = 1;
      }
    });

    video.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return reject(new Error("No se pudo obtener el contexto 2D del canvas."));
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("No se pudo convertir el canvas a blob."));
          }
        },
        "image/jpeg",
        0.8
      );
    });

    video.addEventListener("error", (e) => {
      reject(e);
    });
  });
}

export default function CreateContentDialog(props: CreateContentDialogProps) {
  const {
    isOpen,
    onClose,
    title,
    onCreate,
    setOpen,
    children,
    onUpdate,
    round,
    type
  } = props;

  // Usamos contentFile para abarcar ambos casos (video o imagen)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que se haya ingresado el nombre y seleccionado el archivo
    if (!name.trim() || !contentFile) {
      alert("Por favor, ingresa un nombre y selecciona un archivo.");
      return;
    }

    try {
      let createdItem;

      if (type === dataItemType.ROUTINE) {
        // Para rutinas, se sube la imagen y se asigna siempre a thumbnailUrl
        const thumbnailUrl = await uploadFileAws(contentFile);
        createdItem = await onCreate({
          name,
          description,
          thumbnailUrl: thumbnailUrl ?? undefined,
        });
      } else {
        // Para ejercicios, se sube el video y se captura la miniatura
        const videoUrl = await uploadFileAws(contentFile);
        let thumbnailUrl: string | undefined = undefined;
        try {
          const thumbnailBlob = await captureThumbnailFromVideo(contentFile);
          const thumbnailFile = new File(
            [thumbnailBlob],
            "thumbnail.jpg",
            { type: "image/jpeg" }
          );
          thumbnailUrl = await uploadFileAws(thumbnailFile);
        } catch (thumbError) {
          console.error("Error al capturar la miniatura:", thumbError);
        }
        createdItem = await onCreate({
          name,
          description,
          videoUrl: videoUrl ?? undefined,
          thumbnailUrl: thumbnailUrl ?? undefined,
        });
      }

      if (onUpdate && round) {
        const roundExercise = await RoundExerciseService.createRoundExercise({
          exerciseId: createdItem.id,
          roundId: round.round.id,
          exercisePosition: round.roundExerciseData.length + 1,
        });
        onUpdate(roundExercise, createdItem);
      }

      // Limpiar campos
      setName("");
      setDescription("");
      setContentFile(null);
      setPreviewUrl(null);
      onClose();
    } catch (error) {
      console.error("Error al crear el item:", error);
    }
  };

  const isFormValid = name.trim() !== "" && contentFile !== null;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <FiPlus className="h-4 w-4" />
          </Button>
        )}
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

            {/* Se ajusta el tipo de archivo a cargar según el tipo */}
            <FileInput
              setFile={setContentFile}
              setPreviewUrl={setPreviewUrl}
              previewUrl={previewUrl}
              acceptType={type === dataItemType.ROUTINE ? "image" : "video"}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!isFormValid}>
              Crear
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
