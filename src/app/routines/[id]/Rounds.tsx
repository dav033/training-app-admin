"use client"

import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useRef } from "react";
import SortableRound from "./sortableRound";
import { RoundData } from "@/types";
import { RoundService } from "@/app/services/RoundService";

interface RoundsProps {
  rounds: RoundData[];
  setRounds: (rounds: RoundData[]) => void;
  deleteRound: (id: number) => void;
}

export default function Rounds(props: RoundsProps) {
  const { rounds, setRounds, deleteRound } = props;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const sortedRounds = [...rounds].sort(
    (a, b) => a.round.roundPosition - b.round.roundPosition
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const sortedRounds = [...rounds].sort(
        (a, b) => a.round.roundPosition - b.round.roundPosition
      );
      const oldIndex = sortedRounds.findIndex(
        (item) => item.round.id === active.id
      );
      const newIndex = sortedRounds.findIndex(
        (item) => item.round.id === over.id
      );
      const newSortedRounds = arrayMove(sortedRounds, oldIndex, newIndex);

      newSortedRounds.forEach((round, index) => {
        round.round.roundPosition = index + 1;
      });

      setRounds(newSortedRounds);
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(async () => {
      const currentRounds = rounds.map((round) => round.round);
      console.log("UWU", currentRounds);
      await RoundService.updateRoundList(currentRounds);
    }, 5000);
  };

  return (
    <div className="px my-8">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedRounds.map((r) => r.round.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedRounds.map((round, index) => (
            <SortableRound
              key={round.round.id}
              id={round.round.id}
              index={index}
              round={round}
              deleteRound={deleteRound}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
