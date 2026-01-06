import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({label, className="", ...props}, ref) => {
        return(
            <div className = "flex items-center">
                <input
                type="checkbox"
                ref={ref}
                className = {`h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer accent-blue-600 ${className}`}
                {...props}
                />
                <label
                htmlFor = {props.id}
                className = "ml-2 block text-sm text-gray-900 cursor-pointer"
                >
                    {label}
                </label>
            </div>
        );
    }
);
Checkbox.displayName = "Checkbox";