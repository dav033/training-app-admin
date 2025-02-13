"use client";

import { GoTrash } from "react-icons/go";
import { roundItemProps } from "@/types";
import { Button } from "@/components/ui/Button";

export default function Round({
  roundData,
  deleteRound,
  ...rest
}: roundItemProps) {
  return (
    <div
      className="w-full items-center flex  align-middle p-4 border border-dashed rounded border-gray-400 mb-2"
      {...rest}
    >
      <div className="w-full">
        <Button className="border-2 border-blue-300 text-blue-300">
          <span>Agregar Ejercicio</span>
        </Button>
      </div>
      <button
        onClick={() => {
          deleteRound(roundData.round.id);
        }}
        className="bg-red-700 p-2 rounded"
      >
        <GoTrash className="text-2xl " />
      </button>
    </div>
  );
}
