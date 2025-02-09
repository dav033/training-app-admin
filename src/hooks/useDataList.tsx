// src/hooks/useDataList.tsx
import { useState, useMemo } from "react";
import axios from "axios";
import { axiosDuplicateErrorHandler } from "@/lib/utils";
import { DataItem, CreateDataItem } from "@/types";

interface DataService {
  create: (newItem: CreateDataItem) => Promise<DataItem>;
}

export function useDataList(
  initialData: DataItem[],
  service: DataService
) {
  const [busqueda, setBusqueda] = useState("");
  const [data, setData] = useState<DataItem[]>(initialData);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [busqueda, data]);

  const createItem = async (newItem: CreateDataItem): Promise<DataItem> => {
    try {
      const response = await service.create(newItem);
      setData([...data, response]);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        axiosDuplicateErrorHandler(error.response.status, "elemento");
      } else {
        console.error(error);
      }
      throw error;
    }
  };

  return {
    data,
    filteredData,
    setBusqueda,
    createItem,
  };
}
