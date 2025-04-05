import { cn } from "../../../lib/utils"


interface LoaderProps {
  show: boolean
  fullscreen?: boolean
}

export function Loader({ show, fullscreen = false }: LoaderProps) {
  if (!show) return null

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullscreen
          ? 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50'
          : 'relative'
      )}
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-300 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin-reverse"></div>
      </div>
    </div>
  )
}