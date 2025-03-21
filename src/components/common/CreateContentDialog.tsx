"use client";

import { useState } from "react";
import { CreateContentDialogProps, roundExercisType, dataItemType } from "@/types";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { DialogHeader } from "@/components/ui/dialog/DialogHeader";
import { DialogFooter } from "@/components/ui/dialog/DialogFooter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input/Input";
import { DialogTrigger } from "@/components/ui/dialog/DialogTrigger";
import { FiPlus } from "react-icons/fi";
import { DialogContent } from "@/components/ui/dialog/DialogContent";
import { DialogTitle } from "@/components/ui/dialog/DialogTitle";
import FileInput from "./FileInput";
import { uploadFileAws } from "@/lib/awsUtils";

// Función para capturar un frame a 1 segundo del video (se utiliza solo para ejercicios)
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
    type,
  } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !contentFile) {
      alert("Por favor, ingresa un nombre y selecciona un archivo.");
      return;
    }

    try {
      if (type === dataItemType.ROUTINE) {
        // Para rutinas, subimos la imagen y llamamos a onCreate.
        const thumbnailUrl = await uploadFileAws(contentFile);
        const createdItem = await onCreate({
          name,
          description,
          thumbnailUrl: thumbnailUrl ?? undefined,
        });
        console.log("Rutina creada (vía API):", createdItem);
        // Si se requiere agregar un RoundExercise al estado (por ejemplo, para vincular una imagen a una ronda),
        // se puede utilizar el callback onUpdate, aunque en la mayoría de los casos la rutina se crea sin round_exercises.
        if (onUpdate && round) {
          const roundExercise = {
            id: Date.now(), // Valor temporal, pero se puede ajustar según se necesite
            roundId: round.round.id,
            exerciseId: createdItem.id,
            exercisePosition: round.roundExerciseData.length + 1,
            repetitions: "12", // Valor por defecto
            roundExerciseType: roundExercisType.REPS, // Valor por defecto
            time: 60, // Valor por defecto
            temp: true,
          };
          console.log("Agregando roundExercise para rutina:", roundExercise);
          onUpdate(roundExercise, createdItem);
        }
      } else {
        // Para ejercicios, se ejecuta la lógica original.
        const videoUrl = await uploadFileAws(contentFile);
        let thumbnailUrl: string | undefined = undefined;
        try {
          const thumbnailBlob = await captureThumbnailFromVideo(contentFile);
          const thumbnailFile = new File([thumbnailBlob], "thumbnail.jpg", { type: "image/jpeg" });
          thumbnailUrl = await uploadFileAws(thumbnailFile);
        } catch (thumbError) {
          console.error("Error al capturar la miniatura:", thumbError);
        }
        const createdItem = await onCreate({
          name,
          description,
          videoUrl: videoUrl ?? undefined,
          thumbnailUrl: thumbnailUrl ?? undefined,
        });
        console.log("Ejercicio creado (vía API):", createdItem);
        if (onUpdate && round) {
          const roundExercise = {
            id: Date.now(), // Valor temporal
            roundId: round.round.id,
            exerciseId: createdItem.id,
            exercisePosition: round.roundExerciseData.length + 1,
            repetitions: "12", // Valor por defecto
            roundExerciseType: roundExercisType.REPS, // Valor por defecto
            time: 60, // Valor por defecto
            temp: true,
          };
          console.log("Agregando roundExercise para ejercicio:", roundExercise);
          onUpdate(roundExercise, createdItem);
        }
      }

      // Limpiar campos y cerrar el dialog.
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
          <Button variant="outline" size="icon" className="bg-blue-600 hover:bg-blue-700 text-white">
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
