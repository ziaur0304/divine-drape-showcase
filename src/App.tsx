import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LatestUpdates from "./pages/LatestUpdates";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import HealthCare from "./pages/HealthCare";
import CoachingComplaint from "./pages/CoachingComplaint";
import GovtMedical from "./pages/GovtMedical";
import ComingSoon from "./pages/ComingSoon";
import PrivateAdmissions from "./pages/PrivateAdmissions";
import AgricultureVeterinary from "./pages/AgricultureVeterinary";
import NursingParamedical from "./pages/NursingParamedical";
import SubmitMark from "./pages/SubmitMark";
import LiveRank from "./pages/LiveRank";
import Ziaur from "./pages/Ziaur";
import RankPredictor from "./pages/RankPredictor";
import CollegeProfiles from "./pages/CollegeProfiles";
import ClosingRanks from "./pages/ClosingRanks";
import RoundwiseAIR from "./pages/RoundwiseAIR";
import OmrScanner from "./pages/OmrScanner";
import DocumentsRequired from "./pages/DocumentsRequired";
import PremiumMembership from "./pages/PremiumMembership";
import PaymentSuccess from "./pages/PaymentSuccess";
import FloodRelief from "./pages/FloodRelief";
import Annexures from "./pages/Annexures";
import StateRankList from "./pages/StateRankList";
import ProofOfSchooling from "./pages/ProofOfSchooling";
import CategoryChange from "./pages/CategoryChange";
import ThreeGenerationCertificate from "./pages/ThreeGenerationCertificate";
import SpecialQuota from "./pages/SpecialQuota";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/education" element={<Landing />} />
      <Route path="/healthcare" element={<HealthCare />} />
      <Route path="/coaching-complaint" element={<CoachingComplaint />} />
      <Route path="/govt-medical" element={<GovtMedical />} />

      <Route path="/latest-updates" element={<LatestUpdates />} />
      <Route path="/nursing-paramedical" element={<NursingParamedical />} />
      <Route path="/agriculture-veterinary" element={<AgricultureVeterinary />} />
      <Route path="/private-admissions" element={<PrivateAdmissions />} />
      <Route path="/submit" element={<SubmitMark />} />
      <Route path="/live-rank" element={<LiveRank />} />
      <Route path="/check-rank" element={<RankPredictor />} />
      <Route path="/college-profiles" element={<CollegeProfiles />} />
      <Route path="/closing-ranks" element={<ClosingRanks />} />
      <Route path="/roundwise-air" element={<RoundwiseAIR />} />
      <Route path="/omr-scanner" element={<OmrScanner />} />
      <Route path="/documents-required" element={<DocumentsRequired />} />
      <Route path="/ziaur" element={<Ziaur />} />
      <Route path="/premium-membership" element={<PremiumMembership />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/flood-relief" element={<FloodRelief />} />
      <Route path="/annexures" element={<Annexures />} />
      <Route path="/state-rank-list" element={<StateRankList />} />
      <Route path="/proof-of-schooling" element={<ProofOfSchooling />} />
      <Route path="/category-change" element={<CategoryChange />} />
      <Route path="/three-generation-certificate" element={<ThreeGenerationCertificate />} />
      <Route path="/special-quota" element={<SpecialQuota />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
