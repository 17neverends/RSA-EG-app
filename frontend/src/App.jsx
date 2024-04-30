import { VideoBackground } from "./components/Background/Background"
import { BrowserRouter } from 'react-router-dom';
import { RenderRoutes } from "./structure/RenderNavigation";

function App() {

  return (
    <BrowserRouter>
      <VideoBackground/>
      <RenderRoutes/>
    </BrowserRouter>

  )
}

export default App
