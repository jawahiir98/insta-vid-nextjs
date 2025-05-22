import {chatSession} from "@/configs/AiModel";
import {NextResponse} from "next/server";


export async function POST(req: Request){
    try{
        const {prompt} = await req.json();
        console.log(prompt, 'The prompt')
        const result = await chatSession.sendMessage(prompt);
        console.log(result.response.text());
        return NextResponse.json({'result': JSON.parse(result.response.text())});
    }catch(e){
        return NextResponse.json({'error': 'Something went wrong',e});
    }
}