import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Button } from "./button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface ComboboxProps {
  options: { label: string; value: string }[]
  placeholder?: string
  emptyMessage?: string
  searchPlaceholder?: string
  withSearch?: boolean
  onSelect: (value: string) => void
}

export function Combobox({
  options = [],
  placeholder = "Select an option",
  emptyMessage = "No options found.",
  searchPlaceholder = "Search options...",
  withSearch = false,
  onSelect,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleOpenChange = (isOpen: boolean) => {
    console.log("Popover open state:", isOpen); // Debugging to check state change
    setOpen(isOpen);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options?.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          {withSearch && (
            <CommandInput placeholder={searchPlaceholder} />
          )}
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {options.length > 0 ? (
              options.map((option) => {
                if (!option.value) {
                  console.error("Invalid option value:", option); // Log invalid entries
                }
                // if (!option.value || !option.label) return null; // Skip invalid options
                return (
                  <CommandItem
                    key={option.value || Math.random()}
                    onSelect={() => {
                      setValue(option.value);
                      onSelect(option.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                );
              })
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">{emptyMessage}</div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}