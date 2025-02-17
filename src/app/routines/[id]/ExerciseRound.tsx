import { Exercice, RoundExerciseData } from "@/types";
import { useRef, useState } from "react";
import Image from "next/image";
import image from "../../../../public/ejercicios-basicos-de-gimnasio.webp";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/Button";
import { Check, Edit2, X } from "lucide-react";
import { RoundExerciseService } from "@/app/services/roundExerciseService";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface ExerciseRoundProps {
  roundExerciseData: RoundExerciseData;
  removeRoundExercise: (roundExerciseId: number) => void;
  updateExerciseRoundRepetitions: (
    roundExerciseId: number,
    reps: number
  ) => void;
}

export default function ExerciseRound(props: ExerciseRoundProps) {
  const id = props.roundExerciseData.roundExercise.id;
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const setRefs = (element: HTMLDivElement | null) => {
    nodeRef.current = element;
    setNodeRef(element);
  };
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const { roundExerciseData, updateExerciseRoundRepetitions } = props;

  const { repetitions } = roundExerciseData.roundExercise;
  const name = roundExerciseData.exercise.name;

  const [isEditing, setIsEditing] = useState(false);
  const [editedReps, setEditedReps] = useState(repetitions?.toString() || "");

  const deleteRoundExercise = async () => {
    await RoundExerciseService.deleteRoundExercise(
      roundExerciseData.roundExercise.id
    );

    props.removeRoundExercise(roundExerciseData.roundExercise.id);
  };

  const handleSave = async () => {
    const updatedReps = Number.parseInt(editedReps);
    if (!isNaN(updatedReps) && updatedReps > 0) {
      await RoundExerciseService.updateRoundExercise({
        ...roundExerciseData.roundExercise,
        repetitions: updatedReps,
      });

      updateExerciseRoundRepetitions(
        roundExerciseData.roundExercise.id,
        updatedReps
      );

      setIsEditing(false);
    }
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedReps(repetitions?.toString() || "");
  };

  return (
    <div
      className="bg-zinc-800 border-zinc-700 hover:bg-zinc-750 transition-colors mb-2 rounded "
      ref={setRefs}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="p-2 flex items-center space-x-3">
        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
          <Image src={image.src} alt={name} layout="fill" objectFit="cover" />
        </div>
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-zinc-100">{name}</h3>
          {isEditing ? (
            <div className="flex items-center mt-1 w-24 bg-blue-">
              <Input
                type="number"
                value={editedReps}
                onChange={(e) => setEditedReps(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave();
                  }
                }}
                className="w-16 h-7 text-xs bg-zinc-700 border-zinc-600 mr-2"
                placeholder="Reps"
              />
              <Button
                size="sm"
                className="h-7 px-1 bg-red-"
                onClick={handleSave}
              >
                <Check className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <p className="text-xs text-zinc-400 flex items-center">
              {repetitions} reps
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 ml-1 text-zinc-400 hover:text-zinc-300"
                onClick={handleEdit}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:text-red-300 hover:bg-red-400/10"
          onClick={deleteRoundExercise}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
