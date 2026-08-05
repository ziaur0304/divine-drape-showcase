import NoticePage from "@/components/NoticePage";
import asset from "@/assets/Proof_of_Schooling.pdf.asset.json";

export default function ProofOfSchooling() {
  return (
    <NoticePage
      title="Proof of Schooling"
      downloadLabel="Download Proof of Schooling PDF"
      fileUrl={asset.url}
      fileName="Proof_of_Schooling.pdf"
    >
      <p>
        📢 Candidates applying for Assam MBBS/BDS State Counselling 2026 must submit the Proof of
        Schooling Certificate in the prescribed format.
      </p>
      <p>
        The certificate must be duly filled and signed by the Head of the Institution
        (Principal/Headmaster) along with the official school seal.
      </p>
      <p className="text-amber-700 font-medium">
        ⚠️ Ensure that all details are correct before submission, as incorrect or incomplete
        information may lead to issues during document verification.
      </p>
    </NoticePage>
  );
}
