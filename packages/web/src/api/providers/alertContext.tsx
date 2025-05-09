import React, { createContext, useState, useContext, useEffect } from 'react'

type AlertType = 'success' | 'error' | 'info' | 'warning'

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void
  hideAlert: () => void
  alert: { message: string; type: AlertType } | null
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: AlertType } | null>(null)

  useEffect(() => {
    const storedAlert = localStorage.getItem('alert')
    if (storedAlert) {
      setAlert(JSON.parse(storedAlert))
    }
  }, [])

  const showAlert = (message: string, type: AlertType) => {
    const newAlert = { message, type }
    setAlert(newAlert)
    localStorage.setItem('alert', JSON.stringify(newAlert))
  }

  const hideAlert = () => {
    setAlert(null)
    localStorage.removeItem('alert')
  }

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}