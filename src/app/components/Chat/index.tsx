import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";
import Messages from "./Messages";
import { Message } from "ai/react";

// Define an interface for context information
export interface ContextInfo {
  weather?: string;
  activity?: string;
}

// Update the interface to include contextSelections
interface ChatProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (
    e: FormEvent<HTMLFormElement>,
    contextInfo?: ContextInfo
  ) => Promise<void>;
  messages: Message[];
  contextSelections?: ContextInfo;
}

const Chat: React.FC<ChatProps> = ({
  input,
  handleInputChange: parentHandleInputChange,
  handleMessageSubmit,
  messages,
  contextSelections,
}) => {
  // Track if we've already added the context message to the input
  const [hasContextMessage, setHasContextMessage] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleMessageSubmit(e, contextSelections);
  };

  // Generate the context message text exactly as it will appear
  const getContextMessage = () => {
    let contextMessage = "";

    if (contextSelections?.weather) {
      contextMessage += `Weather: ${contextSelections.weather} `;
    }

    if (contextSelections?.activity) {
      contextMessage += `Activity: ${contextSelections.activity}`;
    }

    return contextMessage.trim();
  };

  // Wrap the parent's handleInputChange to track when input is cleared
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    parentHandleInputChange(e);

    // If they've cleared the input, reset the flag so context can be re-added
    if (e.target.value === "") {
      setHasContextMessage(false);
    }
  };

  // When context selections change, update the input if we haven't already
  useEffect(() => {
    const contextMessage = getContextMessage();
    if (contextMessage && !hasContextMessage && input === "") {
      // Create a synthetic event to pass to the parent handler
      const syntheticEvent = {
        target: { value: contextMessage },
      } as ChangeEvent<HTMLInputElement>;

      parentHandleInputChange(syntheticEvent);
      setHasContextMessage(true);
    }
  }, [contextSelections, hasContextMessage, input, parentHandleInputChange]);

  return (
    <div id="chat" className="flex flex-col w-full lg:w-3/5 mr-4 mx-5 lg:mx-0">
      <Messages messages={messages} />
      <>
        <form
          onSubmit={handleSubmit}
          className="mt-5 mb-5 relative bg-[#4FACAD] rounded-lg flex flex-col"
        >
          <div className="relative">
            <input
              type="text"
              className="input-glow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline pl-3 pr-10 bg-[#F5BAB1] border-gray-600 transition-shadow duration-200"
              value={input}
              onChange={handleInputChange}
              placeholder={
                contextSelections &&
                (contextSelections.weather || contextSelections.activity)
                  ? "Press Enter..."
                  : "Send a message..."
              }
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-black">
              Press ⮐ to send
            </span>
          </div>
        </form>
      </>
    </div>
  );
};

export default Chat;
