import { Filter } from 'lucide-react'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { Checkbox } from './checkbox'
import { Label } from './label'

interface FilterOption {
  id: string
  label: string
}

interface FilterButtonProps {
  options: FilterOption[]
  onFilterChange: (selectedFilters: string[]) => void
  defaultFilter?: string[]
  label?: string
}

export function FilterButton({ options, onFilterChange, defaultFilter = [], label = 'Filters' }: FilterButtonProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(defaultFilter)

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) => {
      const newFilters = prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
      onFilterChange(newFilters)
      return newFilters
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={null} className="h-10 px-4 py-2">
          <Filter className="mr-2 h-4 w-4 text-black" />
          <span className='text-black'>{label}</span>
          {selectedFilters.length > 0 && (
            <span className="ml-2 rounded-full bg-primary text-primary-foreground px-2 py-1 text-xs">
              {selectedFilters.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 bg-white text-black">
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={selectedFilters.includes(option.id)}
                onCheckedChange={() => handleFilterChange(option.id)}
              />
              <Label htmlFor={option.id} className='cursor-pointer'>{option.label}</Label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}