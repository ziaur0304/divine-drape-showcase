import NoticePage from "@/components/NoticePage";
import asset from "@/assets/category_change_form_2026.pdf.asset.json";

export default function CategoryChange() {
  return (
    <NoticePage
      title="Category Change"
      downloadLabel="Download Category Change Form PDF"
      fileUrl={asset.url}
      fileName="Category_Change_Form_2026.pdf"
    >
      <p>
        Those who want to change their category must fill this form and submit it to DME by hand
        along with the required supporting documents.
      </p>
      <p>
        Form must be submitted in person at the DME Office (2nd Floor, Room No. 5) on or before
        <strong> 11 August 2026</strong> during office hours.
      </p>
      <p className="font-medium">Applications sent by post or email will NOT be accepted.</p>
      <p>Candidates should collect an acknowledgement receipt after submission.</p>
      <div>
        <h2 className="font-bold text-slate-900 mb-2">Supporting Documents</h2>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>OBC/MOBC → Valid Non-Creamy Layer Certificate</li>
          <li>SC/ST(P)/ST(H) → Valid Caste Certificate</li>
          <li>EWS → Valid EWS Income &amp; Asset Certificate</li>
          <li>PwD → Disability Certificate issued by the competent medical authority</li>
        </ul>
      </div>
    </NoticePage>
  );
}
