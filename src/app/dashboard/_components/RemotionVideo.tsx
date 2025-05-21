import React, { useEffect } from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

export const RemotionVideo = ({ videoScript, audioFileUrl, captions, imageList, setDurationInFrame }) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    const getDurationFrame = () => {
        setDurationInFrame(captions[captions?.length - 1]?.end / 1000 * fps);
        return captions[captions?.length - 1]?.end / 1000 * fps;
    };

    const getCurrentCaptions = () => {
        const currentTime = (frame / 60) * 1000; // Convert 30fps frame number to milliseconds
        const currentCaption = captions.find((word) => currentTime >= word.start && currentTime <= word.end);
        return currentCaption ? currentCaption?.text : '';
    };

    return (
        <AbsoluteFill style={{
            backgroundColor: 'black'
        }}>
            {imageList?.map((image, index) =>
            {
                const startTime = (index * getDurationFrame()) / imageList?.length;
                const duration = getDurationFrame();
                const scale = (index) => interpolate(
                    frame,
                    [startTime, startTime + duration/2, startTime + duration], // Zoom in Zoom out logic
                    index % 2 == 0 ? [1,1.8,1]: [1.8,1,1.8],
                    {extrapolateLeft:'clamp', extrapolateRight:'clamp'}
                )
                return(
                    <>
                        <Sequence key={index} from={startTime} durationInFrames={getDurationFrame()}>
                            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover', transform:`scale(${scale(index)})` }} />

                                <AbsoluteFill style={{ color: 'white', justifyContent: 'center', top: undefined, bottom: 50, height: 150, textAlign: 'center', width: '100%' }}>
                                    <h2 className='text-2xl'>{getCurrentCaptions()}</h2>
                                </AbsoluteFill>
                            </AbsoluteFill>
                        </Sequence>
                    </>
                )})}
            {audioFileUrl && <Audio src={audioFileUrl} />}
        </AbsoluteFill>
    );
};

