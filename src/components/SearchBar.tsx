// src/components/SearchBar.tsx
"use client";

import { useState } from "react";
import Search from "@/ui/input/Search";
import { SearchBarProps } from "@/types";
import CreateContentDialog from "./CreateContentDialog";

export default function SearchBar(props: SearchBarProps) {
  const { data, placeholder, searchFuncion, createFunction, modalTitle } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2 mb-6 aling-center w-full">
      <Search placeholder={placeholder} searchFunction={searchFuncion} />

      <CreateContentDialog
        isOpen={open}
        setOpen={setOpen}
        onClose={() => setOpen(false)}
        onCreate={createFunction}
        title={modalTitle}
      />
    </div>
  );
}
