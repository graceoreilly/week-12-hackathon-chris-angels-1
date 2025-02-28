import React from "react";

interface ButtonProps {
  className?: string; // add CSS classes to the button element.
  value?: string; // Add value prop to store weather/activity type
  onClick?: (value: string) => void; // Add onClick handler for context values
  children?: React.ReactNode;
  [key: string]: any; // an index signature for any other props
}

export function Button({
  className = "",
  value = "",
  onClick,
  children,
  ...props
}: ButtonProps) {
  // declare a handle click function that passes the value to the parent component which will perform either a 'value-based interaction' or a 'event-based interaction'
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If onClick handler exists AND value is provided, call with value string stored in value prop
    if (onClick && value) {
      onClick(value);
    } else if (props.onClick) {
      //if either onClick doesn't exist OR value doesn't exist.
      // Otherwise call the original onClick if it exists
      props.onClick(e);
    }
  };

  return (
    <button
      className={
        "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-[#F5BAB1] font-semibold text-zinc-100 hover:bg-zinc-400 active:bg-zinc-800 active:text-zinc-100/70 " +
        className
      }
      onClick={handleClick} //add the onClick to be able to be sent as a prop to parent & viceversa
      {...props} //uses the spread operator to pass through any additional props that weren't explicitly destructured. This allows for flexibility in how the button can be customized by the parent component.
    >
      {
        children /*renders whatever content was passed between the opening and closing tags of this button component.*/
      }
    </button>
  );
}
