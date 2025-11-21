# 📘 Social Media Content Analyzer

A browser-based tool that extracts text from PDF files and images and provides simple engagement suggestions for social media content. Everything runs on the client side—no backend and no data storage.

---

## ✨ Overview

The application lets users upload PDFs or scanned images, extracts the text using PDF parsing or OCR, and then analyzes the content to highlight ways to improve engagement.  
It is designed to be clean, minimal, and easy to review.

Features include:

- Uploading PDFs and images  
- Text extraction using pdfjs-dist and Tesseract.js  
- Loading indicators  
- Error handling  
- Basic content analysis  
- Simple, easy-to-use interface  

---

## 🔧 Features

### 📄 File Upload
- Drag-and-drop and file picker support  
- Accepts: PDF, JPG, PNG  

### 🔍 Text Extraction
- PDF parsing using `pdfjs-dist`  
- OCR for images using `Tesseract.js`  
- All processing done inside the browser  

### 📝 Engagement Suggestions
- Word and character count  
- Hashtag detection  
- Link detection  
- Question detection  
- Content length feedback  
- Suggestions to improve discoverability and engagement  

### 🎨 UI/UX
- Clean layout  
- Minimal design  
- Helpful loading states  
- Clear error messages  

---

##  Project Structure
src/
├── App.jsx
├── main.jsx
├── components/
│   ├── FileUpload.jsx
│   ├── TextResult.jsx
│   ├── EngagementSuggestions.jsx
│   ├── Loader.jsx
│   └── ErrorAlert.jsx
├── utils/
│   └── textAnalysis.js
└── styles/
    └── app.css



---

## 🚀 Getting Started

### Install dependencies
```bash
npm install
npm run dev






