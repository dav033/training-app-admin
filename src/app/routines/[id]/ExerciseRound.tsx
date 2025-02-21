import { RoundExerciseData, roundExercisType } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import image from "../../../../public/ejercicios-basicos-de-gimnasio.webp";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { RoundExerciseService } from "@/app/services/roundExerciseService";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import EditRepetitionsTime from "./EditRepetitionsTime";

interface ExerciseRoundProps {
  roundExerciseData: RoundExerciseData;
  removeRoundExercise: (roundExerciseId: number) => void;
}

export default function ExerciseRound({
  roundExerciseData,
  removeRoundExercise,
}: ExerciseRoundProps) {
  const {
    roundExercise: { id, repetitions, roundExerciseType, time },
    exercise: { name },
  } = roundExerciseData;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [currentType, setCurrentType] = useState<roundExercisType>(roundExerciseType);
  const [currentReps, setCurrentReps] = useState<string>(repetitions);
  const [currentTime, setCurrentTime] = useState<number>(time);

  const onUpdate = useCallback((value: roundExercisType) => {
    setCurrentType(value);
  }, []);

  const onRepsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentReps(e.target.value);
  }, []);

  const onTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  }, []);

  const updateRoundExercise = useCallback(async () => {
    await RoundExerciseService.updateRoundExercise({
      ...roundExerciseData.roundExercise,
      repetitions: currentReps,
      time: currentTime,
      roundExerciseType: currentType,
    });
  }, [roundExerciseData.roundExercise, currentReps, currentTime, currentType]);

  useEffect(() => {
    const timeout = setTimeout(updateRoundExercise, 500);
    return () => clearTimeout(timeout);
  }, [updateRoundExercise]);

  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      transition,
    }),
    [transform, transition]
  );

  const deleteRoundExercise = useCallback(async () => {
    await RoundExerciseService.deleteRoundExercise(id);
    removeRoundExercise(id);
  }, [id, removeRoundExercise]);

  return (
    <div
      className="bg-zinc-800 border-zinc-700 hover:bg-zinc-750 transition-colors mb-2 rounded"
      ref={setNodeRef}
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
          <EditRepetitionsTime
            repetitions={currentReps}
            time={currentTime}
            type={currentType}
            onTimeChange={onTimeChange}
            onRepsChange={onRepsChange}
            onUpdate={onUpdate}
          />
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
