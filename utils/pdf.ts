import * as pdfjs from "pdfjs-dist";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const extractTextFromPdf = async (fileUrl: string): Promise<string> => {
    const pdfFile = await pdfjs.getDocument(fileUrl).promise;
    let fullText = "";
    for (let i = 1; i <= pdfFile.numPages; i++) {
        const page = await pdfFile.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((item: any) => item?.str || "")
            .join("");
        fullText += pageText;
    }

    return fullText;
};

