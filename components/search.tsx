"use client";

import { Input } from "@heroui/react";
import { useCallback, useState } from "react";
import { SearchIcon } from "../assets/SearchIcon";

export default function Search({ onChangeAction }: { onChangeAction: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      onChangeAction(event.target.value);
    }, [onChangeAction]);

  const handleClear = useCallback(() => {
    setQuery("");
    onChangeAction("");
  }, [onChangeAction]);

  return (
    <Input
      isClearable
      placeholder="Type to search..."
      radius="full"
      size="lg"
      value={query}
      variant="faded"
      onChange={handleChange}
      onClear={handleClear}
      startContent={
        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 pointer-events-none flex-shrink-0" />
      }
    />
  );
}