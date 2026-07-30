import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

// Client-side DOCX export using the `docx` library. PDF export is handled
// by the browser's native print dialog (window.print with print.css rules
// in index.css), so no server round-trip is needed for either format.
export async function exportDocx(draft) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: draft.name || "Your name", heading: HeadingLevel.HEADING_1 }),
          new Paragraph({ text: `${draft.email || ""}  ${draft.phone || ""}` }),
          new Paragraph({ text: draft.summary || "" }),
          new Paragraph({ text: "Experience", heading: HeadingLevel.HEADING_2 }),
          ...draft.experience.flatMap((e) => [
            new Paragraph({
              children: [new TextRun({ text: `${e.role} — ${e.company} (${e.dates})`, bold: true })],
            }),
            ...(e.bullets || []).map((b) => new Paragraph({ text: `• ${b}` })),
          ]),
          new Paragraph({ text: "Skills", heading: HeadingLevel.HEADING_2 }),
          new Paragraph({ text: (draft.skills || []).join(", ") }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${(draft.name || "resume").replace(/\s+/g, "_")}.docx`);
}
