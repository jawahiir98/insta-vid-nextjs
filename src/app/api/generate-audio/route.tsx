import { storage } from "@/configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

// const textToSpeech = require('@google-cloud/text-to-speech');
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
const client = new TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY
});

export async function POST(req: Request) {
    try {
        const { text, id } = await req.json();

        // Create the reference where your data is store
        const storageRef = ref(storage, 'insta-vid/audio/' + id + '.mp3');

        const request = {
            input: { text: text },
            // Select the language and SSML voice gender (optional)
            voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
            // select the type of audio encoding
            audioConfig: { audioEncoding: 'MP3' }
        };

        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);

        // Create the buffer format for audio
        const audioBuffer = Buffer.from(response.audioContent, 'binary');

        // Upload the data where you initialize the reference, in the format of buffer
        await uploadBytes(storageRef, audioBuffer, { contentType: 'audio/mp3' });

        // Get the download URL of the uploaded file
        const downloadUrl = await getDownloadURL(storageRef);

        return NextResponse.json({ result: downloadUrl });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Error processing request.' }, { status: 500});
    }
}