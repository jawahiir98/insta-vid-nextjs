import {NextResponse} from "next/server";
import fs from 'fs'
import util from 'util'
import textToSpeech from '@google-cloud/text-to-speech';

// Creates a client
const client = new textToSpeech.TextToSpeechClient({apiKey: process.env.GOOGLE_API_KEY});

export async function POST(req: Request) {
    const {text, id} = await req.json();
    const request = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' }
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');

    return NextResponse.json({Result: 'success'})
}