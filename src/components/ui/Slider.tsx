import React from "react";


interface SliderProps {
    label : string;
    value: number;
    onChange: (value : number)=> void;
    min?: number;
    max?: number;
    disabled? : boolean;
}


export const Slider: React.FC<SliderProps> = ({
    label,
    value,
    onChange,
    min = 0,
    max = 100,
    disabled = false,

}) => {
    return( 
        <div className = "space-y-2">
            <div className = "flex items-center justify-between">
                <label className = "text-sm font-medium text-gray-900">{label}</label>
                <span className = "text-sm font-bold text-blue-600">
                    {value}%
                </span>
            </div>
            <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number (e.target.value))}
            disabled={disabled}
            className = "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    );

};