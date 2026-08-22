import React from 'react'

const params = {
  type : "" ,
  text : "" ,
  label : "" ,
  Icon : <></> ,
  IconBack : <></> ,
  className : "" ,
  onClick:()=>{}
}
/**
 * Button Component ( Big ) for Using single in page must be enough.
 * @param {params} The Properties of Button Components
 * @returns The Button
 */
const BigButton = ({ type = "button" , text = 'No Text' , label = 'No Label' , IconBack = null, Icon = null , className = 'no-classes' , onClick= function(){} }) => {
  return (
    <button onClick={onClick} type={type} label={label} className={`cursor-pointer py-3 rounded-lg text-xl flex justify-center items-center gap-2 w-full font-semibold my-2 ${className.includes("text-") ? "" : "text-white"} ${className.includes("bg-") ? "" : "bg-black"} ${className}`} >
        {IconBack && <IconBack size={25} />}
        <span>{text}</span>
        {Icon && <Icon size={25} />}
    </button>
  )
}

export default BigButton