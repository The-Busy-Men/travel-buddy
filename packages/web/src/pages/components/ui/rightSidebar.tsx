import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './sheet'
import { Button } from './button'
import { ScrollArea } from './scrollArea'

interface MenuItem {
  id: string
  label: string
  icon?: React.ReactNode
}

interface RightSidebarProps {
  menuItems: MenuItem[]
  onMenuItemClick: (id: string) => void
}

export function RightSidebar({ menuItems, onMenuItemClick }: RightSidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0">
          <Menu className="h-5 w-5 text-slate-800" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-black bg-opacity-30 w-[25%]" aria-describedby='' >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
          <nav className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="justify-start"
                onClick={() => {
                  onMenuItemClick(item.id)
                  setOpen(false)
                }}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}