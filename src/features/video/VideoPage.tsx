// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// type OTPResponse = {
//   otp: string;
//   playbackInfo: string;
// };

// declare global {
//   interface Window {
//     VdoPlayer: any;
//   }
// }

// function App() {
//   const [data, setData] = useState<OTPResponse | null>(null);
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);

//   useEffect(() => {
//     axios
//       // .get("http://localhost:3001/otp")
//       .get("/vdocipher-api/otp")
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch(console.error);
//   }, []);

//   // Initialize player after OTP arrives
//   // const initializePlayer = () => {
//   //   // @ts-ignore
//   //   const player = new VdoPlayer({
//   //     otp: data?.otp,
//   //     playbackInfo: data?.playbackInfo,
//   //     container: document.querySelector("#vdocipher-player"),
//   //   });

//   //   player.addEventListener("ready", () => {
//   //     player.seek(30); // Seek to 30 seconds
//   //   });
//   // };

//   // useEffect(() => {
//   //   if (!data) return;
//   //   const script = document.createElement("script");

//   //   script.src = "https://player.vdocipher.com/v2/api.js";
//   //   script.async = true;

//   //   document.body.appendChild(script);

//   //   script.onload = () => {
//   //     initializePlayer();
//   //   };

//   //   return () => {
//   //     document.body.removeChild(script);
//   //   };
//   // }, []);

//   useEffect(() => {
//     if (!data) return;

//     const script = document.createElement("script");

//     script.src = "https://player.vdocipher.com/v2/api.js";
//     script.async = true;

//     document.body.appendChild(script);

//     script.onload = () => {
//       if (!iframeRef.current) return;

//       iframeRef.current.src = `https://player.vdocipher.com/v2/?otp=${data.otp}&playbackInfo=${data.playbackInfo}`;

//       const player =
//         window.VdoPlayer.getInstance(iframeRef.current);

//       player.video.addEventListener(
//         "loadedmetadata",
//         () => {
//           // Resume from saved progress
//           player.video.currentTime = 30;
//         }
//       );

//       // Example progress tracking
//       setInterval(() => {
//         console.log(
//           "Current Time:",
//           player.video.currentTime
//         );
//       }, 5000);
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [data]);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   // const iframeSrc = `https://player.vdocipher.com/v2/?otp=${data.otp}&playbackInfo=${data.playbackInfo}`;

//   return (
//     <div
//       style={{
//         padding: 40,
//       }}
//     >
//       <h1>VdoCipher Test</h1>

//       {/* <iframe
//         src={iframeSrc}
//         allowFullScreen
//         allow="encrypted-media"
//         style={{
//           width: "100%",
//           maxWidth: "900px",
//           aspectRatio: "16 / 9",
//           border: "none",
//         }}
//       /> */}
//       {/* <div id="vdocipher-player"
//         style={{
//           width: "100%",
//           maxWidth: "900px",
//           aspectRatio: "16 / 9",
//           border: "none",
//         }}
//       ></div> */}
//       <iframe
//         ref={iframeRef}
//         allowFullScreen
//         allow="encrypted-media"
//         style={{
//           width: "100%",
//           maxWidth: "900px",
//           aspectRatio: "16 / 9",
//           border: "none",
//         }}
//       />
//     </div>
//   );
// }

// export default App;

// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// type OTPResponse = {
//   otp: string;
//   playbackInfo: string;
// };

// declare global {
//   interface Window {
//     VdoPlayer: any;
//   }
// }

// function App() {
//   const [data, setData] = useState<OTPResponse | null>(null);

//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   // Fetch OTP
//   useEffect(() => {
//     axios
//       .get("/vdocipher-api/otp")
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch(console.error);
//   }, []);

//   // Load script once
//   useEffect(() => {
//     const script = document.createElement("script");

//     script.src = "https://player.vdocipher.com/v2/api.js";

//     script.async = true;

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Initialize player
//   useEffect(() => {
//     if (!data || !iframeRef.current || !window.VdoPlayer)
//       return;

//     const iframe = iframeRef.current;

//     iframe.src = `https://player.vdocipher.com/v2/?otp=${data.otp}&playbackInfo=${data.playbackInfo}`;

//     iframe.onload = () => {
//       const player =
//         window.VdoPlayer.getInstance(iframe.contentWindow);

//       player.video.addEventListener(
//         "loadedmetadata",
//         () => {
//           // Resume timestamp
//           player.video.currentTime = 30;
//         }
//       );

//       // Track progress
//       setInterval(() => {
//         console.log(player.video.currentTime);
//       }, 5000);
//     };
//   }, [data]);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>VdoCipher Test</h1>

//       <iframe
//         ref={iframeRef}
//         allowFullScreen
//         allow="encrypted-media"
//         style={{
//           width: "100%",
//           maxWidth: "900px",
//           aspectRatio: "16 / 9",
//           border: "none",
//         }}
//       />
//     </div>
//   );
// }

// export default App;

// import { useEffect, useRef, useState } from "react";
// import axios from "axios";

// type OTPResponse = {
//   otp: string;
//   playbackInfo: string;
// };

// // declare global {
// //   interface Window {
// //     onVdoCipherAPIReady: (vdoPlayer: any) => void;
// //   }
// // }

// declare const VdoPlayer: {
//   getInstance: (iframe: HTMLIFrameElement) => any;
// };

// function App() {
//   const [data, setData] = useState<OTPResponse | null>(null);

//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   // Example saved progress from DB
//   const savedProgress = 60; // seconds

//   // Load script once
//   useEffect(() => {
//     const script = document.createElement("script");

//     script.src = "https://player.vdocipher.com/v2/api.js";

//     script.async = true;

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Fetch OTP
//   useEffect(() => {
//     axios
//       .get("/vdocipher-api/otp")
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch(console.error);
//   }, []);

//   // Initialize API callbacks
//   useEffect(() => {
//     if (!data) return;

//     // window.onVdoCipherAPIReady = (player) => {
//     //   console.log("Player Ready");

//     //   // Seek to saved timestamp
//     //   player.seek(savedProgress);

//     //   // Optional autoplay
//     //   player.play();

//     //   // Track progress
//     //   setInterval(() => {
//     //     console.log(
//     //       "Current Time:",
//     //       player.api.getCurrentTime()
//     //     );
//     //   }, 5000);
//     // };
//     const iframe = document.querySelector('iframe');
//     const player = VdoPlayer.getInstance(iframe!);
//     player.video.addEventListener("loadedmetadata", () => {
//       player.video.currentTime = savedProgress;
//     });

//   }, [data]);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   const iframeSrc = `https://player.vdocipher.com/v2/?otp=${data.otp}&playbackInfo=${data.playbackInfo}`;

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>VdoCipher Resume Test</h1>

//       <iframe
//         ref={iframeRef}
//         src={iframeSrc}
//         allow="encrypted-media"

//         allowFullScreen
//         style={{
//           width: "100%",
//           maxWidth: "900px",
//           aspectRatio: "16 / 9",
//           border: "none",
//         }}
//       />
//     </div>
//   );
// }

// export default App;

import { useEffect, useRef, useState } from "react";
import axios from "axios";

// 1. Define types and global window interface
type OTPResponse = {
    otp: string;
    playbackInfo: string;
};

// declare global {
//   interface Window {
//     onVdoPlayerV2APIReady: () => void;
//     // VdoPlayer: {
//     //   getInstance: (iframe: HTMLIFrameElement) => any;
//     // };
//   }
// }
// declare global {
//   interface Window {
//     VdoPlayer: any;
//   }
// }

declare global {
    interface Window {
        onVdoPlayerV2APIReady: () => void;
        VdoPlayer: any; // Or your specific interface
    }
}

function VideoPage() {
    const [data, setData] = useState<OTPResponse | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    // const playerInstance = useRef<any>(null);

    const savedProgress = 60; // Example: 60 seconds from your database

    // 2. Fetch OTP and Playback Info
    useEffect(() => {
        axios
            .get("/vdocipher-api/otp")
            .then((res) => setData(res.data))
            .catch(console.error);
    }, []);

    // 3. Load Script and Initialize Player
    // useEffect(() => {
    //   if (!data) return;

    //   // This is the function VdoCipher calls once the script is ready
    //   window.onVdoPlayerV2APIReady = () => {
    //     // The script is "ready", but let's make sure the object is there
    //     // const VdoPlayer = (window as any).VdoPlayer;
    //     console.log("VdoPlayer", window.VdoPlayer);
    //     console.log("Iframe Ref", iframeRef.current);
    //     if (iframeRef.current) {
    //       // Create the instance once the script is ready and iframe exists
    //       const player = window.VdoPlayer.getInstance(iframeRef.current);
    //       console.log("VdoPlayer Instance", player);
    //       // playerInstance.current = player;
    //       // Listen for metadata to be loaded so we can seek to the saved time
    //       player.video.addEventListener("loadedmetadata", () => {
    //         console.log("Metadata loaded, seeking to:", savedProgress);
    //         player.video.currentTime = savedProgress;
    //       });

    //       // Example: Track progress every few seconds
    //       player.video.addEventListener("timeupdate", () => {
    //         // You can save this to your DB occasionally
    //         // console.log("Current Time:", player.video.currentTime);
    //       });
    //     }
    //   };

    //   const script = document.createElement("script");
    //   script.src = "https://player.vdocipher.com/v2/api.js";
    //   script.async = true;
    //   document.body.appendChild(script);

    //   return () => {
    //     document.body.removeChild(script);
    //     delete (window as any).onVdoPlayerV2APIReady;
    //   };
    // }, [data]); // Re-run when data is available to ensure iframe is in DOM

    useEffect(() => {
        if (!data) return;

        window.onVdoPlayerV2APIReady = () => {
            console.log("API Ready signal received...");

            // 1. Create a poller to wait for the object to actually exist
            const interval = setInterval(() => {
                if (window.VdoPlayer && iframeRef.current) {
                    clearInterval(interval); // Stop checking

                    console.log("VdoPlayer found, initializing instance...");

                    try {
                        const player = window.VdoPlayer.getInstance(iframeRef.current);

                        // 2. Use 'canplay' instead of 'loadedmetadata' for more reliable seeking
                        player.video.addEventListener("canplay", () => {
                            console.log("Seeking to:", savedProgress);
                            player.video.currentTime = savedProgress;
                        }, { once: true });

                        // Optional: Error handling
                        player.video.addEventListener("error", (e: any) => {
                            console.error("VdoPlayer Error:", e);
                        });

                    } catch (err) {
                        console.error("Failed to get VdoPlayer instance:", err);
                    }
                }
            }, 50); // Check every 50ms

            // Timeout after 5 seconds so it doesn't run forever if something fails
            setTimeout(() => clearInterval(interval), 5000);
        };

        // 3. Inject Script
        const script = document.createElement("script");
        script.src = "https://player.vdocipher.com/v2/api.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            delete (window as any).onVdoPlayerV2APIReady;
        };
    }, [data]);

    if (!data) return <div>Loading Player...</div>;

    const iframeSrc = `https://player.vdocipher.com/v2/?otp=${data.otp}&playbackInfo=${data.playbackInfo}`;

    return (
        <div style={{ padding: 40 }}>
            <iframe
                ref={iframeRef}
                src={iframeSrc}
                allow="encrypted-media"
                allowFullScreen
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    aspectRatio: "16 / 9",
                    border: "none",
                }}
            />
        </div>
    );
}

export default VideoPage;