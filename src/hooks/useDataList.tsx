import { useState, useMemo } from "react";
import axios from "axios";
import { axiosDuplicateErrorHandler } from "@/lib/utils";

export function useDataList<T>(initialData: T[], service: any) {
  const [busqueda, setBusqueda] = useState("");
  const [data, setData] = useState<T[]>(initialData);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [busqueda, data]);

  const createItem = async (newItem: T) => {
    try {
      const response = await service.create(newItem);
      setData([...data, response]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        axiosDuplicateErrorHandler(error.response.status, "elemento");
      } else {
        console.error(error);
      }
    }
  };

  return {
    data,
    filteredData,
    setBusqueda,
    createItem,
  };
}
