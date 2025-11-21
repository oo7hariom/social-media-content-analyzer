import React, { useState } from "react";
import FileUpload from "./components/FileUpload.jsx";
import TextResult from "./components/TextResult.jsx";
import EngagementSuggestions from "./components/EngagementSuggestions.jsx";
import Loader from "./components/Loader.jsx";
import ErrorAlert from "./components/ErrorAlert.jsx";

import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker?url";


import Tesseract from "tesseract.js";

GlobalWorkerOptions.workerSrc = pdfWorker;

const App = () => {
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFile = async (file) => {
    setErrorMsg("");
    setExtractedText("");

    if (!file) {
      setErrorMsg("No file selected.");
      return;
    }

    const isPdf = file.type === "application/pdf";
    const isImage = file.type.startsWith("image/");

    if (!isPdf && !isImage) {
      setErrorMsg("Unsupported file type. Please upload a PDF or an image.");
      return;
    }

    try {
      setLoading(true);

      if (isPdf) {
        const text = await extractTextFromPdf(file);
        if (!text.trim()) {
          setErrorMsg("No readable text found in the PDF.");
        }
        setExtractedText(text);
      } else if (isImage) {
        const text = await extractTextFromImage(file);
        if (!text.trim()) {
          setErrorMsg("No readable text found in the image.");
        }
        setExtractedText(text);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  const extractTextFromPdf = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const typedArray = new Uint8Array(reader.result);
          const loadingTask = getDocument({ data: typedArray });
          const pdf = await loadingTask.promise;

          let fullText = "";

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item) => item.str)
              .join(" ");
            fullText += `\n\n--- Page ${pageNum} ---\n\n${pageText}`;
          }

          resolve(fullText.trim());
        } catch (e) {
          reject(e);
        }
      };

      reader.onerror = (e) => reject(e);
      reader.readAsArrayBuffer(file);
    });
  };

  const extractTextFromImage = async (file) => {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(file, "eng")
        .then(({ data }) => {
          resolve(data.text || "");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Social Media Content Analyzer</h1>
        <p className="subtitle">
          Upload a PDF or image with your social media content. We&apos;ll
          extract the text and suggest improvements.
        </p>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>1. Upload Document</h2>
          <p className="section-note">
            Supported formats: <strong>PDF</strong>, <strong>JPG</strong>,{" "}
            <strong>PNG</strong>.
          </p>

          <FileUpload onFileSelected={handleFile} />

          {loading && (
            <div className="spacing-top">
              <Loader label="Extracting text, please wait..." />
            </div>
          )}

          {errorMsg && (
            <div className="spacing-top">
              <ErrorAlert message={errorMsg} />
            </div>
          )}
        </section>

        <section className="card">
          <h2>2. Extracted Text</h2>
          <TextResult text={extractedText} />
        </section>

        <section className="card">
          <h2>3. Engagement Suggestions</h2>
          <EngagementSuggestions text={extractedText} />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Built for technical assessment — React-only, client-side PDF &amp; OCR
          processing.
        </p>
      </footer>
    </div>
  );
};

export default App;
