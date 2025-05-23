import React from 'react';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

export interface Props {
    audioFileUrl?: string;
    captions?: any[];
    imageList?: string[];
    setDurationInFrame?: (val: number) => void;
}
export const RemotionVideo: React.FC<Props> = ({
                                                   audioFileUrl = '',
                                                   captions = [],
                                                   imageList = [],
                                                   setDurationInFrame = () => {}
                                               }) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();

    const getDurationFrame = () => {
        const lastEnd = captions[captions.length - 1]?.end ?? 0;
        const duration = (lastEnd / 1000) * fps;
        setDurationInFrame(duration);
        return duration;
    };

    const getCurrentCaptions = () => {
        const currentTime = (frame / fps) * 1000;
        const currentCaption = captions.find((word: any) =>
            currentTime >= word.start && currentTime <= word.end
        );
        return currentCaption?.text ?? '';
    };

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            {imageList.map((image: string, index: number) => {
                const duration = getDurationFrame();
                const startTime = (index * duration) / imageList.length;

                const scale = interpolate(
                    frame,
                    [startTime, startTime + duration / 2, startTime + duration],
                    index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                    <Sequence key={index} from={startTime} durationInFrames={duration}>
                        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Img
                                src={image}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transform: `scale(${scale})`,
                                }}
                            />
                            <AbsoluteFill
                                style={{
                                    color: 'white',
                                    justifyContent: 'center',
                                    bottom: 50,
                                    height: 150,
                                    textAlign: 'center',
                                    width: '100%',
                                }}
                            >
                                <h2 className="text-2xl">{getCurrentCaptions()}</h2>
                            </AbsoluteFill>
                        </AbsoluteFill>
                    </Sequence>
                );
            })}
            {audioFileUrl && <Audio src={audioFileUrl} />}
        </AbsoluteFill>
    );
};

