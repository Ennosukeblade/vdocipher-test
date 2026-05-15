import { Routes, Route } from "react-router-dom"
import VideoPage from "./features/video/VideoPage"
import LivePage from "./features/live/LivePage"

const App = () => {
  return (
    <Routes>
      <Route path="/vdocipher/" element={<VideoPage />} />
      <Route path="/vdocipher/live" element={<LivePage />} />
    </Routes>
  )
}

export default App
