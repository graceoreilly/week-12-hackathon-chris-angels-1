import { Message, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { getContext } from "@/utils/context"; 
import songData from "@/data/songData";
import { SongObject } from "@/data/songData";


export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log(messages)

    // Get the last message
    const lastMessage = messages[messages.length - 1];

    // Get the context from the last message
    const context = await getContext(lastMessage.content, "");

    // Prepare song data in a format that's easy for the LLM to process
    const simplifiedSongData = songData.map((song: SongObject) => ({
      artist: song.artist,
      songTitle: song.songTitle,
      mood: song.mood,
      timeOfDay: song.timeOfDay,
      weather: song.weather,
      season: song.season,
      activity: song.activity,
      energy: song.energy,
      occasions: song.occasions,
      emotionalImpact: song.emotionalImpact
    }));

    const prompt = [
      {
        role: 'system',
        content: `You are an AI music assistant that recommends songs based on user input.

        ### SONG RECOMMENDATION INSTRUCTIONS
        - Users will provide information about their mood, time of day, and what they're doing.
        - Your task is to select ONE most appropriate song from the available collection.
        - First, analyze the user's input to understand their current context and emotional needs.
        - Then, find songs that match multiple criteria from their input (mood, activity, time of day, etc.).
        - For your recommendation, provide the song title, artist, and a brief explanation of why this song fits their current situation.
        - Make your recommendation conversational and personalized, as if you're a thoughtful friend.
        - If you can't find a perfect match, recommend the closest option and explain your reasoning.

        ### AVAILABLE SONGS
        ${JSON.stringify(simplifiedSongData, null, 2)}

        ### CONTEXT FROM USER QUERY
        ${context}

        Remember to only recommend songs from this specific collection, and always explain why your suggestion fits their current situation.
        `,
      },
    ];

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await streamText({
      // @ts-ignore - Bypass type checking for conflicting AI SDK versions
      model: openai("gpt-4o-mini"),
      messages: [
        ...prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
    });
    // Convert the response into a friendly text-stream
    return response.toDataStreamResponse();
  } catch (e) {
    throw e;
  }
}
