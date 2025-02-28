import { Button } from "./Button";
import React, { FC } from "react";
import { useState } from "react";

interface EmojiButtonProps {
  emojiString: string;
  value: string;
  isActive: boolean;
  handleClick: (value: string) => void;
}

const EmojiButton = ({
  emojiString,
  value,
  isActive,
  handleClick,
}: EmojiButtonProps) => {
  function toggleButton(value: string) {
    handleClick(value);
  }

  return (
    <div key={emojiString} className="pr-2 lg:flex-grow">
      <Button
        className={`relative overflow-hidden w-full my-1 lg:my-2 mx-2 ${
          isActive ? "bg-blue-300" : "bg-[#F5BAB1]"
        }`}
        onClick={() => toggleButton(value)}
      >
        <div className="relative text-3xl">{emojiString}</div>
      </Button>
    </div>
  );
};

export default EmojiButton;
