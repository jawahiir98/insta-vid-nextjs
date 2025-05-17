const {
    GoogleGenerativeAI
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Write a script to generate 30 seconds video on topic :Interesting history story along with AI image prompts in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling medieval marketplace, filled with people buying and selling goods. There are colorful stalls, carts, and a lively atmosphere. The sun shines brightly overhead.\",\n    \"contentText\": \"In the heart of 14th century Europe, a young woman named Joan of Arc was born into a humble peasant family. She was known for her devout faith and her strong sense of justice.  \"\n  },\n  {\n    \"imagePrompt\": \"Joan of Arc, a young woman dressed in simple peasant clothing, looking determined and filled with a sense of purpose. She stands in a field, surrounded by lush greenery.\",\n    \"contentText\": \"As a teenager, Joan began to have visions and hear voices that she believed were from God. These voices instructed her to save France from English rule.\"\n  },\n  {\n    \"imagePrompt\": \"Joan of Arc leading a small army of French soldiers,  confidently marching towards the battlefield, a white flag bearing a cross fluttering in the wind.\",\n    \"contentText\": \"With unwavering faith, Joan rallied the French troops and led them to victory in several important battles.\"\n  },\n  {\n    \"imagePrompt\": \"A dramatic scene of Joan of Arc being captured by the English army,  dressed in ornate armor, with Joan looking defiant yet resigned.\",\n    \"contentText\": \"However, Joan's success was short-lived. She was eventually captured by the English and accused of heresy.\"\n  },\n  {\n    \"imagePrompt\": \"A somber scene of Joan of Arc at her trial, surrounded by stern-faced judges and clergy. The courtroom is dimly lit, creating a sense of tension.\",\n    \"contentText\": \"Despite her strong faith and the evidence of her divine calling, she was found guilty and burned at the stake.\"\n  },\n  {\n    \"imagePrompt\": \"A portrait of Joan of Arc, dressed in white, with a halo above her head,  her eyes filled with unwavering faith and hope.\",\n    \"contentText\": \"Despite her tragic fate, Joan of Arc became a symbol of courage, faith, and French nationalism. She remains a beloved historical figure even today.\"\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON structure defines six scenes for a 30-second video about Joan of Arc. Each scene includes:\n\n* **imagePrompt:** A detailed description for generating a realistic image using an AI image generator. These prompts focus on creating visually engaging and historically accurate scenes.\n* **contentText:** A short narration for each scene, providing context and information about Joan of Arc's life and legacy.\n\n**Note:**\n\n* This script provides a basic framework. You can adjust the content and image prompts to fit your specific needs and desired video style.\n*  To use these image prompts, you can use AI image generators like DALL-E 2, Midjourney, or Stable Diffusion.\n\n**To create the video:**\n\n1. **Generate images:** Use the provided image prompts to generate images using your chosen AI tool.\n2. **Edit video:** Import the generated images into a video editing software. Add your narration, music, and other visual effects as needed.\n3. **Finalize:** Export your video in the desired format. \n" },
            ],
        },
    ],
});