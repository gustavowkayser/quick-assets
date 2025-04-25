"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSearchParams, useRouter } from "next/navigation"


interface ComboboxProps {
    options: { value: string; label: string }[]
    selectLabel: string
    notFoundLabel: string
    searchPlaceholder: string
}

export function ComboboxDemo({ options, selectLabel, notFoundLabel, searchPlaceholder }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [formData, setFormData] = React.useState('')

  const searchParams = useSearchParams()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!formData) return
    console.log("Form submitted with data:", formData)
  }

  const handleChange = (currentValue: string) => {
    const params = new URLSearchParams(window.location.search)
    setFormData(currentValue)
    console.log("Form data changed:", currentValue)
    params.set("wallet", currentValue)
    router.push(`?${createQueryString("wallet", currentValue)}`)
  }

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  return (
    <form >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? options.find((option) => option.value === value)?.label
                : selectLabel}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder={searchPlaceholder} className="h-9" />
              <CommandList>
                <CommandEmpty>{notFoundLabel}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                        handleChange(currentValue)
                      }}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
    </form>
  )
}
