import { useEffect, useRef, useState } from "react";
import axios from "axios";

type OTPResponse = {
  otp: string;
  playbackInfo: string;
};

declare global {
  interface Window {
    VdoPlayer: any;
  }
}

function App() {
  const [data, setData] = useState<OTPResponse | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    axios
      // .get("http://localhost:3001/otp")
      .get("/vdocipher-api/otp")
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  // Initialize player after OTP arrives
  // const initializePlayer = () => {
  //   // @ts-ignore
  //   const player = new VdoPlayer({
  //     otp: data?.otp,
  //     playbackInfo: data?.playbackInfo,
  //     container: document.querySelector("#vdocipher-player"),
  //   });

  //   player.addEventListener("ready", () => {
  //     player.seek(30); // Seek to 30 seconds
  //   });
  // };

  // useEffect(() => {
  //   if (!data) return;
  //   const script = document.createElement("script");

  //   script.src = "https://player.vdocipher.com/v2/api.js";
  //   script.async = true;

  //   document.body.appendChild(script);

  //   script.onload = () => {
  //     initializePlayer();
  //   };

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  useEffect(() => {
    if (!data) return;

    const script = document.createElement("script");

    script.src = "https://player.vdocipher.com/v2/api.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      if (!iframeRef.current) return;

      iframeRef.current.src = `https://player.vdocipher.com/v2/?otp=${data.otp}&playbackInfo=${data.playbackInfo}`;

      const player =
        window.VdoPlayer.getInstance(iframeRef.current);

      player.video.addEventListener(
        "loadedmetadata",
        () => {
          // Resume from saved progress
          player.video.currentTime = 30;
        }
      );

      // Example progress tracking
      setInterval(() => {
        console.log(
          "Current Time:",
          player.video.currentTime
        );
      }, 5000);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  // const iframeSrc = `https://player.vdocipher.com/v2/?otp=${data.otp}&playbackInfo=${data.playbackInfo}`;

  return (
    <div
      style={{
        padding: 40,
      }}
    >
      <h1>VdoCipher Test</h1>

      {/* <iframe
        src={iframeSrc}
        allowFullScreen
        allow="encrypted-media"
        style={{
          width: "100%",
          maxWidth: "900px",
          aspectRatio: "16 / 9",
          border: "none",
        }}
      /> */}
      {/* <div id="vdocipher-player"
        style={{
          width: "100%",
          maxWidth: "900px",
          aspectRatio: "16 / 9",
          border: "none",
        }}
      ></div> */}
      <iframe
        ref={iframeRef}
        allowFullScreen
        allow="encrypted-media"
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

export default App;