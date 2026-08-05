import NoticePage from "@/components/NoticePage";
import asset from "@/assets/Three_generation_link_certificate.pdf.asset.json";

export default function ThreeGenerationCertificate() {
  return (
    <NoticePage
      title="Three Generation Link Certificate"
      downloadLabel="Download Three Generation Link Certificate PDF"
      fileUrl={asset.url}
      fileName="Three_Generation_Link_Certificate.pdf"
    >
      <p className="font-bold text-slate-900">
        📢 Important Notice Regarding the Three-Generation Residence Certificate
      </p>
      <p>
        Candidates applying for inclusion of their names in the Assam State Merit List must produce
        a Three-Generation Residence Certificate in the prescribed format.
      </p>
      <p>
        This certificate must establish that the candidate's last three generations have been
        residing in Assam and must be issued by the competent authority in the prescribed format.
      </p>
      <p className="text-amber-700 font-medium">
        ⚠️ Candidates eligible for Assam State Merit List inclusion are advised to arrange this
        certificate as early as possible to avoid any last-minute issues.
      </p>
    </NoticePage>
  );
}
