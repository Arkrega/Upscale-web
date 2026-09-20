import React, { useState, useRef } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [scale, setScale] = useState("4");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Silakan pilih file gambar yang valid.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    if (!droppedFile.type.startsWith("image/")) {
      setError("Silakan pilih file gambar yang valid.");
      return;
    }

    setFile(droppedFile);
    setPreview(URL.createObjectURL(droppedFile));
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Pilih gambar terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("scale", scale);

    try {
      const response = await fetch("/api/upscale", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Gagal memproses gambar.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8">
        
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200 bg-clip-text text-transparent">
            AI Image Upscaler
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Tingkatkan resolusi dan ketajaman gambar secara instan hingga 4x
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-rose-200 font-bold ml-4"
            >
              ✕
            </button>
          </div>
        )}

        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[220px] ${
                preview 
                  ? "border-indigo-500/50 bg-indigo-500/5" 
                  : "border-slate-700 hover:border-indigo-400/60 bg-slate-800/40 hover:bg-slate-800/80"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {preview ? (
                <div className="relative group max-w-xs">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 rounded-lg shadow-md object-contain mx-auto"
                  />
                  <div className="mt-3 text-xs text-slate-400">
                    {file?.name} ({(file?.size / (1024 * 1024)).toFixed(2)} MB)
                  </div>
                  <span className="text-xs text-indigo-400 underline block mt-1">
                    Klik untuk mengganti gambar
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl font-bold">
                    ↑
                  </div>
                  <div className="text-sm font-medium text-slate-300">
                    Tarik file ke sini atau <span className="text-indigo-400 underline">pilih file</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    PNG, JPG, JPEG hingga 25MB
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-800">
              <span className="text-sm font-medium text-slate-300">Skala Perbesaran:</span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setScale("2")}
                  className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                    scale === "2"
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  2x Perbesaran
                </button>
                <button
                  type="button"
                  onClick={() => setScale("4")}
                  className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
                    scale === "4"
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  4x Perbesaran
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm tracking-wide transition-all shadow-lg ${
                loading || !file
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25 active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Memproses Upscale...</span>
                </div>
              ) : (
                "Tingkatkan Gambar Sekarang"
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-2 flex flex-col items-center">
              <img
                src={result.url}
                alt={result.name}
                className="max-h-96 rounded-lg object-contain w-full"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Nama: <strong className="text-slate-200">{result.name}</strong></span>
              <span>Sisa Kuota: <strong className="text-indigo-400">{result.credits ?? "N/A"}</strong></span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={result.url}
                target="_blank"
                rel="noreferrer"
                download
                className="flex-1 py-3 px-4 rounded-xl text-center font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all"
              >
                Unduh Gambar
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700"
              >
                Proses Gambar Baru
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}