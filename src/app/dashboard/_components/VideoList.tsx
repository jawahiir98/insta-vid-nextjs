import {Thumbnail} from "@remotion/player";
import {RemotionVideo} from "@/app/dashboard/_components/RemotionVideo";
import {PlayerDialog} from "@/app/dashboard/_components/PlayerDialog";
import {useState} from "react";

export const VideoList = ({videoList}) => {
    const [openPlayerDialog, setOpenPlayerDialog] = useState(null);
    const [videoId, setVideoId] = useState();

    return (
        <div className='mt-10 grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
            {videoList.map((video, index) => (
                <div
                    key={video.id}
                    onClick={() => {
                        setOpenPlayerDialog(Date.now());
                        setVideoId(video?.id);
                    }}
                    className='cursor-pointer w-fit hover:scale-105 transition-all'
                >
                    <Thumbnail
                        key={index}
                        component={RemotionVideo}
                        compositionWidth={300}
                        compositionHeight={400}
                        frameToDisplay={90}
                        durationInFrames={120}
                        fps={90}
                        style={{ borderRadius: 15 }}
                        inputProps={{
                            ...video,
                            setDurationInFrame: ()=>{}
                        }}

                    />
                </div>
            ))}
            <PlayerDialog  playVideo={openPlayerDialog} videoId={videoId} />
        </div>
    );
}