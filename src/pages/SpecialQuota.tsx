import NoticePage from "@/components/NoticePage";
import asset from "@/assets/For_of_special_Qouta.pdf.asset.json";

export default function SpecialQuota() {
  return (
    <NoticePage
      title="Special Quota"
      downloadLabel="Download Special Quota Claim Application Form PDF"
      fileUrl={asset.url}
      fileName="Special_Quota_Claim_Application_Form.pdf"
    >
      <p>
        Candidates applying under Special Quota for Assam MBBS Admission 2026 must fill up the
        Special Quota Claim Application Form and submit it along with the required supporting
        documents.
      </p>
      <div>
        <h2 className="font-bold text-slate-900 mb-2">Applicable Categories</h2>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Freedom Fighter Quota</li>
          <li>Martyr of Assam Movement Quota</li>
          <li>Extremist Violence Quota</li>
          <li>Ex-Serviceman / Serving Defence Personnel Quota</li>
          <li>Sports Quota</li>
          <li>Orphan Quota</li>
        </ul>
      </div>
      <p className="text-amber-700 font-medium">
        ⚠️ Important: Candidates claiming any of the above quotas must submit photocopies of all
        relevant supporting documents as per the MBBS/BDS Admission Rules (amended up to 2026).
      </p>
    </NoticePage>
  );
}
