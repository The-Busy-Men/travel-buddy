import * as React from "react"
import { cn } from "../../../lib/utils"

const Navbar = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("flex items-center space-x-4 lg:space-x-6 rounded-xl", className)}
    style={{boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"}}
    {...props}
  />
))
Navbar.displayName = "Navbar"

const NavItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a
    ref={ref}
    className={cn(
      "text-md font-sans font-medium transition-colors text-tertiary hover:text-primary hover:cursor-pointer m-8",
      className
    )}
    {...props}
  />
))
NavItem.displayName = "NavItem"

export { Navbar, NavItem }