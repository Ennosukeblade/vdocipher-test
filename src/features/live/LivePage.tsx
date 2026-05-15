import { useEffect, useState } from "react"
import axios from "axios"
type liveResponse = {
    liveStreams: [
        {
            streamId: string
            title: string
            chatMode: string
            createdAt: number
            status: string
        },
        {
            id: string
            status: string  // "Preparing" | "Ready to Start Broadcasting" | "Streaming Active" | "Disconnected" | "Closed"
            createdAt: number
            streamDuration: 0,
            title: string
            viewerCount: number
            viewerLastUpdate: 1704396371848,
            serverKey: "__________",
            server: "rtmp://________:1935/livestream",
            chatMode: "off"   // "off" | "anonymous" | "authenticated"
        }
    ]
}
const LivePage = () => {
    const [data, setData] = useState<liveResponse | null>(null);
    useEffect(() => {
        axios.get("/vdocipher-api/live")
            .then((res) => setData(res.data))
            .catch(console.error);
    }, [])
    return (

        <div id="live-container">
            <div id="player">
                <iframe
                    src={`https://player.vdocipher.com/live-v2?liveId=${data?.liveStreams[0]?.streamId}`}
                    frameBorder="0"
                ></iframe>
            </div>
            <div id="chat">
                <iframe
                    src={`https://zenstream.chat?liveId=${data?.liveStreams[0]?.streamId}`}
                    frameBorder="0"
                ></iframe>
            </div>
        </div>
    )
}

export default LivePage