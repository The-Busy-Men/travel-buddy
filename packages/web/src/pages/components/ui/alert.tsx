import React, { useEffect } from 'react'
import { XCircle, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useAlert } from '../../../api/providers/alertContext'

export function Alert() {
  const { alert, hideAlert } = useAlert()

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        hideAlert()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [alert, hideAlert])

  if (!alert) return null

  const icons = {
    success: <CheckCircle className="h-6 w-6" />,
    error: <XCircle className="h-6 w-6" />,
    warning: <AlertCircle className="h-6 w-6" />,
    info: <Info className="h-6 w-6" />,
  }

  const colors = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
  }

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex items-center justify-center">
      <div className={`p-4 rounded-md border ${colors[alert.type]} shadow-lg w-full max-w-2xl mx-4`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">{icons[alert.type]}</div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium">{alert.message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={hideAlert}
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Close</span>
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}