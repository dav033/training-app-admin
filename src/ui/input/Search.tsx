import { SearchProps } from "@/types";
import { Input } from "@/ui/input/Input";
import { CiSearch } from "react-icons/ci";

export default function Search(props: SearchProps) {
  const { placeholder, searchFunction } = props;
  return (
    <div className="relative flex-1">
      <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-8 bg-gray-800 text-white placeholder-gray-400 border-gray-700 w-full"
        onChange={searchFunction}
      />
    </div>
  );
}
