"use client";

import { Input } from "@heroui/react";
import { JSX, SVGProps, useState } from "react";

export default function Search({onChangeAction}: {onChangeAction: (query: string) => void}) {
    const [query, setQuery] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        onChangeAction(event.target.value);
    };

    const handleClear = () => {
        setQuery("");
        onChangeAction("");
    }

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
    )
}

export const SearchIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};