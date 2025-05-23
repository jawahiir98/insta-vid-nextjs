import {Thumbnail} from "@remotion/player";
import {RemotionVideo} from "@/app/dashboard/_components/RemotionVideo";
import {PlayerDialog} from "@/app/dashboard/_components/PlayerDialog";
import {useState} from "react";

export const VideoList = ({videoList}) => {
    const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
    const [videoId, setVideoId] = useState();
    return (
        <div className='mt-10  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {videoList.map((video, index) => (
                <div
                    key={video.id}
                    onClick={() => {
                        setOpenPlayerDialog(!!Date.now());
                        setVideoId(video?.id);
                    }}
                    className='cursor-pointer hover:scale-105 transition-all'
                >
                    <Thumbnail
                        key={index}
                        component={RemotionVideo}
                        compositionWidth={300}
                        compositionHeight={400}
                        frameToDisplay={30}
                        durationInFrames={120}
                        fps={30}
                        style={{ borderRadius: 15 }}
                        inputProps={{
                            ...video,
                            setDurationInFrame: ()=>{}
                        }}
                    />
                </div>
            ))}
            <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
        </div>
    );
}