import React from 'react';
import { CiWarning } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { MovingBorder } from '../ui/dashedBorder';

// Wrapper component for the warning or preview page
interface WarningWrapperProps {
  children: React.ReactNode;    // Page content
  message: string;              // Warning message
  className?: string;
  state?: string;               // State of the Warning

}

const WarningWrapper: React.FC<WarningWrapperProps> = ({
  children,
  message,
  className,
  state = 'warning',            // Options: warning, error
}) => {
  const getValues = (color: string) => {
    switch (color) {
      case 'error': 
        return {color: "#ff3333", background: "bg-red-400", text: "Error", Icon: MdErrorOutline};
      case 'warning':
        return {color: "#c2410c", background: "bg-orange-300", text: "Warning", Icon: CiWarning};
      default: 
        return {color: '#aaa', background: "bg-gray-300", text: "No text", Icon: CiWarning}
    }
  }

  const values = getValues(state)
  return (
    <>
      <MovingBorder color={values.color}>
        <div className={`relative p-4 m-2 dashed-border ${className}`}>
          {/* Warning message with icon */}
          <div className={`flex items-center mb-4 p-2 rounded-md bg-opacity-20 ${values.background} w-auto`} style={{color: values.color}}>
            <values.Icon className={`h-6 w-6 mr-2`} />
            <span>{values.text}: {message}</span>
          </div>

          {/* Page content */}
          <div className="content warning-content">
            {children}
          </div>
        </div>
      </MovingBorder>
    </>
  );
};

export default WarningWrapper;
