import { storage } from "@/configs/FirebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        const startPrediction = await fetch("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: {
                Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                version: "5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
                input: {
                    prompt: prompt,
                    width: 1024,
                    height: 1280,
                    num_outputs: 1
                }
            })
        });

        if (!startPrediction.ok) {
            throw new Error(`Error: ${startPrediction.statusText}`);
        }

        const prediction = await startPrediction.json();

        // Polling until prediction is complete
        let result;
        while (true) {
            const checkPrediction = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
                headers: {
                    Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
                    "Content-Type": "application/json"
                }
            });

            const checkResult = await checkPrediction.json();

            if (checkResult.status === "succeeded") {
                result = checkResult.output[0];  // Image URL should be here
                break;
            } else if (checkResult.status === "failed") {
                throw new Error("Prediction failed");
            }

            // Wait briefly before polling again
            await new Promise(res => setTimeout(res, 2000));
        }

        console.log("Prediction result (backend):", result);

        // Storing image in firebase

        const base64Image = "data:image/png;base64," + await convertImage(result);

        const fileName = 'insta-vid/images/' + Date.now() + ".png";
        const storageRef = ref(storage, fileName);

        await uploadString(storageRef, base64Image, 'data_url');

        const downloadUrl = await getDownloadURL(storageRef);
        console.log(downloadUrl);

        return NextResponse.json({ downloadUrl });

    } catch (error) {
        console.error("Error in Replicate API call:", error);
        return NextResponse.json({ error: error.message });
    }
}

const convertImage = async(imageUrl) => {
    try {
        const resp = await axios.get(imageUrl, {responseType: 'arraybuffer'});
        const base64Image = Buffer.from(resp.data).toString('base64');
        return base64Image;
    } catch (error) {
        console.log("Error:", error);
    }
}