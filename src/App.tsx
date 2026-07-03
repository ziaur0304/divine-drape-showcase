import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SubmitMark from "./pages/SubmitMark";
import LiveRank from "./pages/LiveRank";
import Ziaur from "./pages/Ziaur";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/submit" element={<SubmitMark />} />
      <Route path="/live-rank" element={<LiveRank />} />
      <Route path="/ziaur" element={<Ziaur />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
