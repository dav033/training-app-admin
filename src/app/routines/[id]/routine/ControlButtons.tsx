import React from "react";
import { Button } from "@/components/ui/Button";
import { BiPlus } from "react-icons/bi";

const ControlButtons = React.memo(({
  createRound,
  handleSave,
  canSave,
}: {
  createRound: () => void;
  handleSave: () => void;
  canSave: boolean;
}) => {
  return (
    <div className="flex gap-2 mt-4">
      <Button
        className="border-2 border-red-300 text-red-300"
        onClick={createRound}
      >
        <span>Agregar Ronda</span> <BiPlus />
      </Button>
      <Button
        onClick={handleSave}
        disabled={!canSave}
        className="bg-blue-500 text-white"
      >
        Guardar Cambios
      </Button>
    </div>
  );
});

export default ControlButtons;
