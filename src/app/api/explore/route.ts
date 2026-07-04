import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  getSimulatedDestination, 
  generateSimulatedStory 
} from "./simulatedData";

// Initialize Gemini if the API key is available
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { location, action, details } = body;

    if (!location) {
      return NextResponse.json(
        { error: "Location parameter is required." },
        { status: 400 }
      );
    }

    // 1. STORYTELLER ACTION
    if (action === "story") {
      const narrator = details?.narrator || "Local Guide";
      const attractionName = details?.attractionName || "Local Landmark";
      
      if (!genAI) {
        // Safe simulated fallback
        const story = generateSimulatedStory(location, narrator, attractionName);
        return NextResponse.json({ story, isSimulated: true });
      }

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
        const prompt = `
          You are a traditional storyteller from ${location}. 
          Tell an immersive, sensory, first-person cultural story about "${attractionName}" from the perspective of a ${narrator}. 
          
          Guidelines:
          - Use rich sensory details (sights, sounds, smells, textures).
          - Explain the cultural significance, history, or crafts associated with it.
          - Write in a warm, welcoming, oral storytelling tone.
          - Divide the narrative into 3 rich paragraphs.
          - Do not use markdown tags or headings. Just return the raw paragraphs separated by double newlines.
        `;

        const result = await model.generateContent(prompt);
        const story = result.response.text();
        return NextResponse.json({ story, isSimulated: false });
      } catch (aiError) {
        console.error("Gemini Story API Error, falling back:", aiError);
        const story = generateSimulatedStory(location, narrator, attractionName);
        return NextResponse.json({ story, isSimulated: true, error: "AI temporary unavailable. Using local engine." });
      }
    }

    // 2. EXPLORE CULTURAL DESTINATION ACTION
    if (!genAI) {
      // Safe simulated fallback
      const data = getSimulatedDestination(location);
      return NextResponse.json({ data, isSimulated: true });
    }

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-3.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
        }
      });

      const prompt = `
        You are a local cultural expert and heritage guide specializing in sustainable cultural tourism.
        Provide a detailed cultural guide for "${location}" in JSON format.
        
        The JSON must match this structure exactly:
        {
          "location": "Resolved Location Name (e.g. Kyoto, Japan)",
          "description": "A high-level 1-2 sentence description of what makes this destination unique culturally.",
          "attractions": [
            {
              "name": "Attraction Name",
              "description": "Sensory, respectful description focused on what makes it culturally interesting",
              "culturalSignificance": "Explain the heritage, meaning, or history of the spot",
              "type": "One of: Heritage, Culinary, Craft, Living Art"
            }
          ],
          "hiddenGems": [
            {
              "name": "Hidden Gem Name (lesser known cultural spot)",
              "description": "Fascinating details about this less visited cultural treasure",
              "culturalSignificance": "Explain why this gem is important to the community's living history",
              "locationDetails": "Vague directions or details on how to explore it sustainably",
              "respectEtiquette": "Specific guidelines on how visitors must behave to be respectful here"
            }
          ],
          "etiquette": [
            {
              "rule": "Etiquette Rule (e.g., Bow when greeting)",
              "explanation": "Clear explanation of why this is important and how to do it",
              "category": "One of: Respect, Dining, Greeting, Clothing"
            }
          ],
          "phrases": [
            {
              "original": "Phrase in local alphabet/script",
              "phonetic": "How to pronounce it",
              "translation": "English translation",
              "culturalContext": "When to say it and how it is received"
            }
          ],
          "events": [
            {
              "name": "Seasonal event or local workshop",
              "description": "Description of the event, workshop (e.g., pottery), or festival",
              "season": "Month or Season it occurs (e.g. July, Spring)",
              "type": "One of: Festival, Workshop, Ritual"
            }
          ],
          "connections": [
            {
              "id": "A unique slug, e.g. location-weaver",
              "name": "Artisan or guide name (generate a realistic local name)",
              "role": "Their craft or specialty (e.g. Master Woodcarver, Zapotec Historian)",
              "avatar": "A single emoji representing their craft (e.g. 🎨, 🧵, 🍲)",
              "bio": "A warm bio describing their dedication to heritage preservation and welcoming tourists",
              "experienceType": "What experience they offer (e.g. Hand-on woodcarving session)",
              "price": "Realistic cost (e.g. $40/person)"
            }
          ]
        }

        Provide 4 to 6 attractions, 2 hidden gems, 3-4 etiquette rules, 2-3 local phrases, 2 events/workshops, and 2-3 connections.
        Keep the content respectful, engaging, and deeply informative.
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const data = JSON.parse(text);

      return NextResponse.json({ data, isSimulated: false });
    } catch (aiError) {
      console.error("Gemini Explore API Error, falling back:", aiError);
      const data = getSimulatedDestination(location);
      return NextResponse.json({ data, isSimulated: true, error: "AI query failed. Using local fallback engine." });
    }

  } catch (err: any) {
    console.error("Internal Route Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err?.message || err },
      { status: 500 }
    );
  }
}
