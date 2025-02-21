"use client";

import { Input } from "@/components/ui/input/Input";
import { Select, SelectValue } from "@/components/ui/select/Select";
import { SelectContent } from "@/components/ui/select/SelectContent";
import { SelectItem } from "@/components/ui/select/SelectItem";
import { SelectTrigger } from "@/components/ui/select/SelectTrigger";
import { EditRepetitionsTimeProps, roundExercisType } from "@/types";

import { Clock, Repeat } from "lucide-react";
import React from "react";

const EditRepetitionsTime = React.memo(
  ({
    repetitions,
    time,
    type,
    onTimeChange,
    onRepsChange,
    onUpdate,
  }: EditRepetitionsTimeProps) => {
    return (
      <div className="flex items-center space-x-2 mt-1">
        <Select value={type} onValueChange={onUpdate}>
          <SelectTrigger className="w-[122px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={roundExercisType.REPS}>
              <span className="flex items-center">
                <Repeat className="w-3 h-3 mr-1" />
                Repetición
              </span>
            </SelectItem>
            <SelectItem value={roundExercisType.TIME}>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Tiempo
              </span>
            </SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="w-[58px] h-8 text-xs bg-zinc-700 border-zinc-600    
            focus:ring-[0.5px] focus:ring-zinc-950 focus:outline-none focus-ring-offset-0 focus:ring-opacity-50"
          onChange={
            type === roundExercisType.REPS ? onRepsChange : onTimeChange
          }
          value={type === roundExercisType.REPS ? repetitions : time}
        />
      </div>
    );
  }
);

export default EditRepetitionsTime;
