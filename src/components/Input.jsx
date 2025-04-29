import React, { useId } from 'react'

// Use forwardRef to allow parent components to access the internal <input> element : 

// wrapping Input component in forwardRef so that a parent component can access the <input> directly 
// — for things like focusing, clearing, etc.

const Input = React.forwardRef(
    function Input({
        label,
        type = "text",
        className = "",
        ...prop
    }, ref) {
        const id = useId() // this Generates a unique ID for label-input linking
        return (
            <div className='w-full '>
                {label && <label
                    className='inline-block mb-1 pl-1'
                    htmlFor={id}
                    >
                    {label}
                    </label>
                }
                <input
                type={type}
                className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-green-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...prop}
                id={id}
                />
            </div>
        )
    }
)

export default Input