// UrlButton.tsx

import { Button } from "./Button";
import React, { FC } from "react";
import { IconContext } from "react-icons";
import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";

export interface IEmoji {
  emoji: string;
}

interface IURLButtonProps {
  emojiString?: string;
  timeOfDayString?: string;
}

const UrlButton: FC<IURLButtonProps> = ({ emojiString, timeOfDayString }) => (
  <div key={emojiString} className="pr-2 lg:flex-grow">
    <Button className={"relative overflow-hidden w-full my-1 lg:my-2 mx-2"}>
      <div className="relative text-3xl">{emojiString}</div>
      <div className="text-3xl font-bold text-[#1FB6FF] drop-shadow-[0_0_10px_#1FB6FF]">{timeOfDayString}</div>
    </Button>
  </div>
);

export default UrlButton;
