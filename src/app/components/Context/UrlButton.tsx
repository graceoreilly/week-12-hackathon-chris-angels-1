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
  emojiString: string;
}

const UrlButton: FC<IURLButtonProps> = ({ emojiString }) => (
  <div key={emojiString} className="pr-2 lg:flex-grow">
    <Button className={"relative overflow-hidden w-full my-1 lg:my-2 mx-2 bg-white"}>
      <div className="relative text-3xl">{emojiString}</div>
    </Button>
  </div>
);

export default UrlButton;
