import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SubmitMark from "./pages/SubmitMark";
import LiveRank from "./pages/LiveRank";
import Ziaur from "./pages/Ziaur";
import RankPredictor from "./pages/RankPredictor";
import CollegeProfiles from "./pages/CollegeProfiles";
import ClosingRanks from "./pages/ClosingRanks";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/submit" element={<SubmitMark />} />
      <Route path="/live-rank" element={<LiveRank />} />
      <Route path="/check-rank" element={<RankPredictor />} />
      <Route path="/college-profiles" element={<CollegeProfiles />} />
      <Route path="/closing-ranks" element={<ClosingRanks />} />
      <Route path="/ziaur" element={<Ziaur />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
