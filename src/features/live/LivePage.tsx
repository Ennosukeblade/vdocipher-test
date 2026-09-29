import { useEffect, useState } from "react"
import axios from "axios"
type liveResponse = {
    liveStreams: [
        {
            streamId: string
            title: string
            chatMode: "on" | "off"
            createdAt: number
            status: string
        },
        {
            id: string
            status: string  // "Preparing" | "Ready to Start Broadcasting" | "Streaming Active" | "Disconnected" | "Closed"
            createdAt: number
            streamDuration: number
            title: string
            viewerCount: number
            viewerLastUpdate: number
            serverKey: string
            server: string
            chatMode: "on" | "off"
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