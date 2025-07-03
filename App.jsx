import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function App() {
  const [quote, setQuote] = useState("");
  const [theme, setTheme] = useState("motivational");
  const imageRef = useRef(null);

  const handleDownload = async () => {
    if (!quote.trim()) return alert("Please enter a quote.");
    const canvas = await html2canvas(imageRef.current);
    const link = document.createElement("a");
    link.download = "quote-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4">
      <h1 className="text-xl font-bold mb-4">📜 Quote to Image Generator</h1>
      <div className="w-full max-w-sm bg-white p-4 rounded-2xl shadow-md">
        <label className="block mb-2 font-semibold">Enter your quote:</label>
        <textarea
          rows={3}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="e.g., Patience is the key to peace."
        />
        <label className="block mt-4 font-semibold">Choose theme:</label>
        <select
          className="w-full p-2 border rounded-md"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="motivational">🌟 Motivational</option>
          <option value="islamic">🕌 Islamic</option>
        </select>
        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md hover:bg-blue-700"
        >
          📥 Download Image
        </button>
      </div>

      <div
        ref={imageRef}
        className={
          `mt-6 w-full max-w-sm h-64 flex items-center justify-center rounded-xl p-4 text-center text-white text-lg font-semibold leading-relaxed shadow-inner ` +
          (theme === "islamic"
            ? "bg-green-700"
            : "bg-gradient-to-br from-purple-600 to-pink-600")
        }
      >
        {quote || "Your quote will appear here..."}
      </div>
    </div>
  );
}