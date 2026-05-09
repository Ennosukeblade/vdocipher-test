import { useEffect, useState } from "react";
import axios from "axios";

type OTPResponse = {
  otp: string;
  playbackInfo: string;
};

function App() {
  const [data, setData] = useState<OTPResponse | null>(null);

  useEffect(() => {
    axios
      // .get("http://localhost:3001/otp")
      .get("/vdocipher-api/otp")
      .then((res) => {
        setData(res.data);
      })
      .catch(console.error);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const iframeSrc = `https://player.vdocipher.com/v2/?otp=${data.otp}&playbackInfo=${data.playbackInfo}`;

  return (
    <div
      style={{
        padding: 40,
      }}
    >
      <h1>VdoCipher Test</h1>

      <iframe
        src={iframeSrc}
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