import React, { useEffect, useState } from "react";
import { emojis } from "./emojis";
import EmojiButton from "./EmojiButton";
import { Card, ICard } from "./Card";
import { clearIndex, crawlDocument } from "./utils";

import { weather } from "./Weather";
import { activities } from "./Activities";
import { Button } from "./Button";

interface ContextProps {
  className: string;
  selected: string[] | null;
  onSelectionChange?: (type: string, value: string) => void;
}

type EmojiObject = {
  emojiString: string;
  value: string;
};

export const Context: React.FC<ContextProps> = ({
  className,
  selected,
  onSelectionChange,
}) => {
  const [entries, setEntries] = useState(emojis);
  const [cards, setCards] = useState<ICard[]>([]);
  const [activeEmotion, setActiveEmotion] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const [splittingMethod, setSplittingMethod] = useState("markdown");
  const [chunkSize, setChunkSize] = useState(256);
  const [overlap, setOverlap] = useState(1);

  // Scroll to selected card
  useEffect(() => {
    const element = selected && document.getElementById(selected[0]);
    element?.scrollIntoView({ behavior: "smooth" });
  }, [selected]);

  //Update emotion on emoji change
  function handleEmotionClick(value: string) {
    setActiveEmotion((prev) => (prev === value ? null : value));
  }

  // Handler for weather selection
  const handleWeatherClick = (weatherType: string) => {
    setSelectedWeather(weatherType);
    if (onSelectionChange) {
      onSelectionChange("weather", weatherType);
    }
  };

  // Handler for activity selection
  const handleActivityClick = (activityType: string) => {
    setSelectedActivity(activityType);
    if (onSelectionChange) {
      onSelectionChange("activity", activityType);
    }
  };

  const DropdownLabel: React.FC<
    React.PropsWithChildren<{ htmlFor: string }>
  > = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="text-white p-2 font-bold">
      {children}
    </label>
  );

  // Render emoji buttons (if still needed)
  const buttons = entries.map(
    (
      emoji: {
        value: string;
        emojiString: string;
      },
      key: number
    ) => (
      <div key={key}>
        <EmojiButton
          emojiString={emoji.emojiString}
          handleClick={handleEmotionClick}
          value={emoji.value}
          isActive={activeEmotion === emoji.value}
        />
      </div>
    )
  );

  return (
    <div className={className}>
      {buttons}

      {/* Weather Section */}
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 py-2 animate-pulse rounded-lg text-center shadow-lg mb-6">
        What's the weather outside?
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-2 w-full">
        {weather.map((weatherItem, key: number) => {
          // Get the weather type and emoji from the current item
          const weatherType = Object.keys(weatherItem)[0];
          const emojiWeather =
            weatherItem[weatherType as keyof typeof weatherItem];

          return (
            <Button
              key={key}
              className={`px-5 py-3 ${
                selectedWeather === weatherType ? "ring-2 ring-blue-500" : ""
              }`}
              value={weatherType}
              onClick={handleWeatherClick}
            >
              <span className="text-3xl md:text-4xl">{emojiWeather}</span>
            </Button>
          );
        })}
      </div>

      {/* Activity Section */}
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 py-2 animate-pulse rounded-lg text-center shadow-lg mb-6">
        What are you doing?
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-2 w-full">
        {activities.map((activityItem, key: number) => {
          const activityType = Object.keys(activityItem)[0];
          const emojiActivity =
            activityItem[activityType as keyof typeof activityItem];

          return (
            <Button
              key={key}
              className={`px-5 py-3 ${
                selectedActivity === activityType ? "ring-2 ring-blue-500" : ""
              }`}
              value={activityType}
              onClick={handleActivityClick}
            >
              <span className="text-3xl md:text-4xl">{emojiActivity}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

/** Begining of old code **/

// import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
// import { emojis } from "./emojis";
// import UrlButton from "./UrlButton";
// // import { Card, ICard } from "./Card";
// // import { clearIndex, crawlDocument } from "./utils";
// import { weather } from "./Weather";
// import { activities } from "./Activities";
// import { Button } from "./Button";

// interface ContextProps {
//   className: string;
//   selected: string[] | null;
//   onSelectionChange?: (type: string, value: string) => void; // Add callback for selection changes
// }

// // NEW: Generic type for context items (weather, activities)
// type ContextItem = {
//   [key: string]: string;
// };

// // OLD: Contex items ( emoji, weather, activites )
// type EmojiObject = {
//   emojiString: string;
// };

// type WeatherObject =
//   | { sunny: string }
//   | { rainy: string }
//   | { snowy: string }
//   | { cloudy: string }
//   | { thunder: string }
//   | { stormy: string };

// type ActivitiesObject =
// | { working: string }
// | { exercising: string }
// | { running: string }
// | { commuting: string }
// | { socializing: string }
// | { cooking: string }
// | { reading: string }
// | { shopping: string }
// |  { gaming: string }
// | { sleeping: string }
// |  { cleaning: string };

// export const Context: React.FC<ContextProps> = ({
//   className,
//   selected,
//   onSelectionChange
// }) => {
//   const [entries, setEntries] = useState(emojis);
//   // const [weatherState, setWeatherState] = useState(weather);
//   // const [activityState, setActivityState] = useState(activities)
//   // const [cards, setCards] = useState<ICard[]>([]);
//   const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
//   const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

//   // handle weather selection
//   const handleWeatherClick = (weatherType: string) => {
//     setSelectedWeather(weatherType);
//     if (onSelectionChange) {
//       onSelectionChange('weather', weatherType);
//     }
//   }

//     // Handle activity selection
//     const handleActivityClick = (activityType: string) => {
//       setSelectedActivity(activityType);
//       if (onSelectionChange) {
//         onSelectionChange('activity', activityType);
//       }
//     };

//   const buttons = entries.map((emoji: EmojiObject, key: number) => (
//     <div className="" key={key}>
//       <UrlButton emojiString={emoji.emojiString} />
//     </div>
//   ));

//   const weatherButtons = (
//     <div className="flex flex-wrap justify-center items-center gap-2 w-full">
//       {selected.map((weatherItem, key: number) => {
//         // Get the weather type and emoji from the current item
//         const weatherType = Object.keys(weatherItem)[0];
//         const emojiWeather = weatherItem[weatherType as keyof WeatherObject];

//         return (
//           <Button
//             key={key}
//             className={`px-5 py-3 ${selectedWeather === weatherType ? 'ring-2 ring-blue-500' : ''}`}
//             value={weatherType}
//             onClick={handleWeatherClick}
//           >
//             <span className="text-3xl md:text-4xl">{emojiWeather}</span>
//           </Button>
//         );
//       })}
//     </div>
//   );

//   // create activities buttons
// const activityButtons = (
//   <div className="flex flex-wrap justify-center items-center gap-2 w-full">
//     {activityState.map((activityItem, key: number) => {
//       const activityType = Object.keys(activityItem)[0];
//       const emojiActivity = activityItem[activityType as keyof ActivitiesObject];

//       return (
//         <Button
//           key={key}
//           className={`px-5 py-3 ${selectedActivity === activityType ? 'ring-2 ring-blue-500' : '' }`}
//           value={activityType}
//           onClick={handleActivityClick}
//         >

//           <span className="text-3xl md:text-4xl">{emojiActivity}</span>
//         </Button>
//       );
//     })}
//   </div>
// );

//   // Don't forget to add the return statement at the end of your component
//   return (
//     <div className={className}>
//       {buttons}
//       <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 py-2 animate-pulse rounded-lg text-center shadow-lg mb-6">What's the weather outside?</h2>
//       {weatherButtons}
//       <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 py-2 animate-pulse rounded-lg text-center shadow-lg mb-6">What are you doing?</h2>
//       {activityButtons}
//       {/* Any other JSX elements you want to render */}
//     </div>
//   );

// };

/* End of old code */

// const [splittingMethod, setSplittingMethod] = useState("markdown");
// const [chunkSize, setChunkSize] = useState(256);
// const [overlap, setOverlap] = useState(1);

// // Scroll to selected card
// useEffect(() => {
//   const element = selected && document.getElementById(selected[0]);
//   element?.scrollIntoView({ behavior: "smooth" });
// }, [selected]);

// const DropdownLabel: React.FC<
//   React.PropsWithChildren<{ htmlFor: string }>
// > = ({ htmlFor, children }) => (
//   <label htmlFor={htmlFor} className="text-white p-2 font-bold">
//     {children}
//   </label>
// );

// return (
//   <div
//     className={`flex flex-col border-2 overflow-y-auto rounded-lg border-gray-500 w-full ${className}`}
//   >
//     <div className="flex flex-col items-start sticky top-0 w-full">
//       <div className="flex flex-col items-start lg:flex-row w-full lg:flex-wrap p-2">
//         {buttons}
//       </div>
//       <div className="flex-grow w-full px-4">
//         <Button
//           className="w-full my-2 uppercase active:scale-[98%] transition-transform duration-100"
//           style={{
//             backgroundColor: "#4f6574",
//             color: "white",
//           }}
//           onClick={() => clearIndex(setEntries, setCards)}
//         >
//           Clear Index
//         </Button>
//       </div>
//       <div className="flex p-2"></div>
//       <div className="text-left w-full flex flex-col rounded-b-lg bg-gray-600 p-3 subpixel-antialiased">
//         <DropdownLabel htmlFor="splittingMethod">
//           Splitting Method:
//         </DropdownLabel>
//         <div className="relative w-full">
//           <select
//             id="splittingMethod"
//             value={splittingMethod}
//             className="p-2 bg-gray-700 rounded text-white w-full appearance-none hover:cursor-pointer"
//             onChange={(e) => setSplittingMethod(e.target.value)}
//           >
//             <option value="recursive">Recursive Text Splitting</option>
//             <option value="markdown">Markdown Splitting</option>
//           </select>
//         </div>
//         {splittingMethod === "recursive" && (
//           <div className="my-4 flex flex-col">
//             <div className="flex flex-col w-full">
//               <DropdownLabel htmlFor="chunkSize">
//                 Chunk Size: {chunkSize}
//               </DropdownLabel>
//               <input
//                 className="p-2 bg-gray-700"
//                 type="range"
//                 id="chunkSize"
//                 min={1}
//                 max={2048}
//                 onChange={(e) => setChunkSize(parseInt(e.target.value))}
//               />
//             </div>
//             <div className="flex flex-col w-full">
//               <DropdownLabel htmlFor="overlap">
//                 Overlap: {overlap}
//               </DropdownLabel>
//               <input
//                 className="p-2 bg-gray-700"
//                 type="range"
//                 id="overlap"
//                 min={1}
//                 max={200}
//                 onChange={(e) => setOverlap(parseInt(e.target.value))}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//     <div className="flex flex-wrap w-full">
//       {cards &&
//         cards.map((card, key) => (
//           <Card key={key} card={card} selected={selected} />
//         ))}
//     </div>
//   </div>
// );
