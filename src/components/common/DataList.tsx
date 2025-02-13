// src/components/DataList.tsx
"use client";

import SearchBar from "@/components/common/SearchBar";
import { useDataList } from "@/hooks/useDataList";
import { DataListProps } from "@/types";
import { SetStateAction } from "react";

export default function DataList({
  initialData,
  service,
  renderItem,
  placeholder = "Buscar...",
  modalTitle,
}: DataListProps) {
  const { data, filteredData, setBusqueda, createItem } = useDataList(
    initialData,
    service
  );

  return (
    <section className="flex flex-col items-center px-4 py-8 w-full">
      <SearchBar
        placeholder={placeholder}
        data={data}
        searchFuncion={(
          e: { target: { value: SetStateAction<string> } }
        ) => setBusqueda(e.target.value)}
        createFunction={createItem}
        modalTitle={modalTitle}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
        {filteredData.map((item, index) => (
          <div key={index} className="flex justify-center">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </section>
  );
}
