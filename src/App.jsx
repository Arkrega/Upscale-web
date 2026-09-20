import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [scale, setScale] = useState("4");
  const [model, setModel] = useState("anime");
  const [denoise, setDenoise] = useState(35);
  const [sharpness, setSharpness] = useState(70);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const fileInputRef = useRef(null);

  const [selectedTip, setSelectedTip] = useState("$5");

  const sampleDemoBefore = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&auto=format&fit=crop&q=40";
  const sampleDemoAfter = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1600&auto=format&fit=crop&q=95";

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      setError("Silakan pilih file gambar yang valid (PNG, JPG, WEBP).");
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpscale = async () => {
    if (!file) {
      setError("Silakan pilih atau jatuhkan gambar terlebih dahulu.");
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
        throw new Error(data.error || "Gagal memproses gambar melalui server.");
      }

      setResult(data);
      const comparisonElem = document.getElementById("comparison-section");
      if (comparisonElem) {
        comparisonElem.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat memproses gambar.");
    } finally {
      setLoading(false);
    }
  };

  const updateSliderPos = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    setSliderPos((offsetX / rect.width) * 100);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateSliderPos(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    updateSliderPos(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) updateSliderPos(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (isDragging) updateSliderPos(e.touches[0].clientX);
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  const handleCopy = async () => {
    const targetUrl = result?.url || sampleDemoAfter;
    try {
      await navigator.clipboard.writeText(targetUrl);
      alert("Tautan gambar berhasil disalin ke clipboard!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-surface font-sans text-on-surface antialiased min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1200px] mx-auto px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-sm cursor-pointer" onClick={handleReset}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white font-black text-lg shadow-md shadow-primary/25">
                🌸
              </div>
              <span className="text-xl tracking-tight text-on-surface font-extrabold">PixelBloom</span>
            </div>
            <span className="hidden lg:inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high text-primary text-xs font-bold">
              Rega Digital Alliance • Free & Open
            </span>
          </div>

          <nav className="hidden md:flex items-center bg-surface-container-low p-1.5 rounded-full shadow-[0_1px_3px_0_rgba(31,41,55,0.04)]">
            <a href="#tool-workspace" className="px-space-md py-space-xs transition-all bg-primary-fixed text-on-primary-fixed text-sm font-semibold rounded-full shadow-[0_2px_8px_rgba(31,41,55,0.08)]">
              Upscaler
            </a>
            <a href="#comparison-section" className="px-space-md py-space-xs rounded-full text-on-surface-variant text-sm font-semibold hover:bg-surface-container-high hover:text-on-surface transition-all">
              Before & After
            </a>
            <a href="#features" className="px-space-md py-space-xs rounded-full text-on-surface-variant text-sm font-semibold hover:bg-surface-container-high hover:text-on-surface transition-all">
              How It Works
            </a>
            <a href="#tip-jar" className="px-space-md py-space-xs rounded-full text-on-surface-variant text-sm font-semibold hover:bg-surface-container-high hover:text-on-surface transition-all">
              Buy Me a Coffee
            </a>
          </nav>

          <div className="flex items-center gap-space-sm">
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-[0_1px_3px_0_rgba(31,41,55,0.04)] border border-surface-container-high">
              <span className="text-xs font-semibold text-on-surface-variant">Active Edge Node</span>
              <div className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full pt-28 bg-surface min-h-[calc(100vh-160px)]">
        <div className="flex flex-col w-full">
          {/* Ambient Glow Orbs */}
          <div className="relative w-full max-w-[1200px] mx-auto px-margin overflow-hidden pointer-events-none">
            <div className="absolute -top-16 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute top-48 right-10 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl" />
            <div className="absolute top-[600px] left-[-50px] w-72 h-72 bg-tertiary-fixed-dim/20 rounded-full blur-3xl" />
          </div>

          {/* Hero Section */}
          <section className="w-full max-w-[1200px] mx-auto px-margin pt-space-lg pb-space-xl relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high shadow-sm mb-space-md">
                <span className="text-primary text-sm">✨</span>
                <span className="text-xs text-primary font-bold tracking-wide">Personal Weekend Project • 100% Free & Open</span>
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                <span className="text-xs text-on-surface-variant font-medium">v1.2 live</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-tight mb-space-sm">
                Make your blurry images <span className="bg-gradient-to-r from-primary via-primary-container to-secondary-container bg-clip-text text-transparent">crisp & gorgeous</span> in seconds.
              </h1>

              <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mb-space-lg">
                Trained on cozy anime art, vintage polaroids, and pixel assets. Hosted with high-speed automated upscaling. No logins, no forced watermarks, and never a paywall.
              </p>

              {/* Stat Badges */}
              <div className="flex flex-wrap items-center justify-center gap-space-sm">
                <div className="flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-lowest shadow-sm text-on-surface border border-surface-container-high text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-primary">memory</span>
                  <span>Real-ESRGAN + AnimeSharp</span>
                </div>
                <div className="flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-lowest shadow-sm text-on-surface border border-surface-container-high text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">bolt</span>
                  <span>Edge Serverless Pipeline</span>
                </div>
                <div className="flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-lowest shadow-sm text-on-surface border border-surface-container-high text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-secondary">cloud_done</span>
                  <span>Up to 25MB file size</span>
                </div>
                <div className="flex items-center gap-1.5 px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-sm text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                  <span>Unlimited Community Craft</span>
                </div>
              </div>
            </div>
          </section>

          {/* Core Interactive Tool Card */}
          <section id="tool-workspace" className="w-full max-w-[1200px] mx-auto px-margin mb-space-2xl relative z-10">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-rose-600">error</span>
                  <span>{error}</span>
                </div>
                <button onClick={() => setError(null)} className="text-rose-600 hover:text-rose-900 font-bold ml-4">
                  ✕
                </button>
              </div>
            )}

            <div className="bg-surface-container-lowest rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl border border-surface-container-high/60 flex flex-col lg:flex-row gap-8 items-stretch">
              
              {/* Left Column: Upload Workspace */}
              <div className="w-full lg:w-7/12 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim" />
                    <span className="text-sm font-bold text-on-surface">Input Canvas</span>
                  </div>
                  <span className="text-xs text-on-surface-variant font-medium">Supports PNG, JPG, WEBP, GIF</span>
                </div>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative group cursor-pointer flex-1 min-h-[320px] rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-inner border-2 border-dashed ${
                    preview
                      ? "border-primary/40 bg-surface-container-low"
                      : "border-slate-300 bg-surface-container-low hover:bg-surface-container-high/60 hover:border-primary/50"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                    accept="image/*"
                    className="hidden"
                  />

                  {preview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={preview}
                        alt="Input Preview"
                        className="max-h-56 rounded-xl shadow-md object-contain border border-surface-container-high"
                      />
                      <div className="mt-3 text-xs font-semibold text-on-surface">
                        {file?.name} ({(file?.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                      <span className="text-xs text-primary font-bold underline mt-1">
                        Klik atau seret file lain untuk mengganti gambar
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-[38px] text-primary">add_photo_alternate</span>
                      </div>
                      <h3 className="text-lg font-bold text-on-surface mb-1">
                        Drop your image here
                      </h3>
                      <p className="text-xs text-on-surface-variant max-w-sm mb-4">
                        Drag and release or browse from your device. No size compressions.
                      </p>
                      <button
                        type="button"
                        className="px-6 py-2.5 rounded-full bg-primary text-on-primary text-sm font-semibold shadow-md hover:bg-primary-container active:scale-95 transition-all flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">folder_open</span>
                        Select Image
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-4 pt-2">
                  <span className="text-xs text-on-surface-variant block mb-2 font-bold uppercase tracking-wider">
                    Info File:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs text-on-surface-variant">
                    <span className="px-3 py-1 rounded-full bg-surface-container-high">
                      Format: {file ? file.type.split("/")[1]?.toUpperCase() : "Auto Detect"}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-container-high">
                      Batas Max: 25 MB
                    </span>
                    {result && (
                      <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                        Kuota Sesi: {result.credits ?? "Ready"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Processing Controls */}
              <div className="w-full lg:w-5/12 flex flex-col justify-between bg-surface-container-low p-6 rounded-2xl shadow-sm border border-surface-container-high/70">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between pb-1 border-b border-surface-container-high">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-primary">tune</span>
                      <h2 className="text-lg font-bold text-on-surface">Bloom Recipe</h2>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-tertiary text-xs font-bold border border-surface-container-high">
                      AI Engine Active
                    </span>
                  </div>

                  {/* 1. Scale Presets */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Upscale Target</label>
                      <span className="text-xs text-primary font-bold">
                        {scale === "2" ? "2x (Fast Upscale)" : "4x (Ultra HD Resolution)"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 bg-surface-container-high p-1.5 rounded-full shadow-inner">
                      <button
                        type="button"
                        onClick={() => setScale("2")}
                        className={`py-2 px-3 rounded-full text-center text-xs font-bold transition-all ${
                          scale === "2"
                            ? "bg-surface-container-lowest text-primary shadow-md"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        2x <span className="text-[10px] block font-normal opacity-80">Quick Sharp</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setScale("4")}
                        className={`py-2 px-3 rounded-full text-center text-xs font-bold transition-all ${
                          scale === "4"
                            ? "bg-surface-container-lowest text-primary shadow-md"
                            : "text-on-surface-variant hover:text-on-surface"
                        }`}
                      >
                        4x <span className="text-[10px] block font-normal opacity-80">Sweet Spot HD</span>
                      </button>
                    </div>
                  </div>

                  {/* 2. Model Specialization */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Model Specialization</label>
                    <div className="flex flex-col gap-2">
                      <label
                        onClick={() => setModel("anime")}
                        className={`flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm cursor-pointer border transition-colors ${
                          model === "anime" ? "border-primary" : "border-surface-container-high hover:bg-surface-container-high/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary text-[20px]">palette</span>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-on-surface">Digital Art & Anime</span>
                            <span className="text-[11px] text-on-surface-variant">Smooth lines & cel-shading recovery</span>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="ai-model"
                          checked={model === "anime"}
                          onChange={() => setModel("anime")}
                          className="accent-primary w-4 h-4 cursor-pointer"
                        />
                      </label>

                      <label
                        onClick={() => setModel("photo")}
                        className={`flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm cursor-pointer border transition-colors ${
                          model === "photo" ? "border-primary" : "border-surface-container-high hover:bg-surface-container-high/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-secondary text-[20px]">photo_camera</span>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-on-surface">Photos & Portraits</span>
                            <span className="text-[11px] text-on-surface-variant">Natural skin tones & textures</span>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="ai-model"
                          checked={model === "photo"}
                          onChange={() => setModel("photo")}
                          className="accent-primary w-4 h-4 cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>

                  {/* 3. Tactile Sliders */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-on-surface">Denoise</span>
                        <span className="text-xs text-primary font-bold">{denoise}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={denoise}
                        onChange={(e) => setDenoise(e.target.value)}
                        className="w-full accent-primary bg-surface-container-highest rounded-lg h-2 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-on-surface">Edge Clarity</span>
                        <span className="text-xs text-primary font-bold">{sharpness}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sharpness}
                        onChange={(e) => setSharpness(e.target.value)}
                        className="w-full accent-primary bg-surface-container-highest rounded-lg h-2 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Action Button with Status */}
                <div className="mt-6 pt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleUpscale}
                    disabled={loading || !file}
                    className={`w-full py-3.5 px-6 rounded-full text-on-primary text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                      loading || !file
                        ? "bg-slate-400 cursor-not-allowed opacity-80"
                        : "bg-gradient-to-r from-primary via-primary-container to-secondary-container hover:shadow-xl active:scale-[0.985]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Blooming Pixels... ✨</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                        <span>Bloom & Upscale ✨</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-on-surface-variant text-xs">
                    <span className="material-symbols-outlined text-[15px] text-tertiary">timer</span>
                    <span>Estimated render: <strong className="text-on-surface">~2-5 seconds</strong></span>
                    <span>• No queue</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Interactive Before/After Split Comparison Showcase */}
          <section id="comparison-section" className="w-full max-w-[1200px] mx-auto px-margin mb-space-2xl relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold mb-2">
                  <span className="material-symbols-outlined text-[14px]">high_quality</span>
                  Interactive Live Canvas
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
                  Before & After Inspection
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Geser garis pemisah secara horizontal untuk melihat rekonstruksi detail tekstur dan ketajaman piksel.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                  Salin Tautan
                </button>
                <a
                  href={result ? result.url : sampleDemoAfter}
                  target="_blank"
                  rel="noreferrer"
                  download={result ? result.name : "upscaled.png"}
                  className="px-5 py-2 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim text-xs font-bold transition-all flex items-center gap-2 shadow-md"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Download HD PNG
                </a>
              </div>
            </div>

            {/* Split Comparison Frame */}
            <div className="relative bg-surface-container-lowest rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border border-surface-container-high overflow-hidden select-none">
              <div
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                className="relative w-full h-[400px] md:h-[560px] rounded-xl overflow-hidden bg-surface-container-low cursor-ew-resize"
              >
                {/* Layer 1: The Upscaled (Background) */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={result ? result.url : sampleDemoAfter}
                    alt="Upscaled Output"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    <span className="text-xs font-extrabold text-on-surface">
                      {result ? `PixelBloom ${scale}x Result` : "Sample 4x HD (1600 × 1600px)"}
                    </span>
                  </div>
                </div>

                {/* Layer 2: Original Low-Res (Clipped Foreground) */}
                <div
                  className="absolute inset-0 top-0 left-0 h-full overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div className="w-[1200px] max-w-none h-full relative">
                    <img
                      src={preview || sampleDemoBefore}
                      alt="Original Input"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-xs font-extrabold text-on-surface">
                      {preview ? "Original Input" : "Sample Low-Res (400 × 400px)"}
                    </span>
                  </div>
                </div>

                {/* Draggable Divider Handle */}
                <div
                  className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-1 h-full bg-surface-container-lowest shadow-lg" />
                  <div className="absolute w-10 h-10 rounded-full bg-surface-container-lowest shadow-xl flex items-center justify-center text-primary border-2 border-primary/20 pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">drag_indicator</span>
                  </div>
                </div>
              </div>

              {/* Info Bar Below Canvas */}
              <div className="mt-4 px-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant text-xs font-medium">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-on-surface">Input:</span>
                    <span>{file ? file.name : "400 × 400px JPEG"}</span>
                  </div>
                  <span className="text-outline-variant">➔</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-primary">Output:</span>
                    <span className="text-on-surface font-semibold">
                      {result ? result.name : "High-Clarity Lossless PNG"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-tertiary font-bold">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    {result ? "Berhasil Diproses" : "Interactive Demo Ready"}
                  </span>
                  <span className="text-outline-variant">•</span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-primary hover:underline font-bold"
                  >
                    Reset Gambar
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Highlight */}
          <section id="features" className="w-full max-w-[1200px] mx-auto px-margin mb-space-2xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-surface-container-high/60 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined text-[24px]">key_off</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">Zero account required</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    No emails, no subscriptions, and zero credits countdown. Just open this tab anytime you are making pixel art, printing stickers, or retouching pictures.
                  </p>
                </div>
                <div className="mt-4 pt-2 text-primary text-xs font-bold flex items-center gap-1">
                  Open web standard <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-surface-container-high/60 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-4">
                    <span className="material-symbols-outlined text-[24px]">verified_user</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">Privacy first & auto-purge</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Your images are processed in a temporary memory buffer and purged completely after processing. Your creations are never stored or used for retraining.
                  </p>
                </div>
                <div className="mt-4 pt-2 text-tertiary text-xs font-bold flex items-center gap-1">
                  Ephemeral storage by default <span className="material-symbols-outlined text-[16px]">lock</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-surface-container-high/60 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary mb-4">
                    <span className="material-symbols-outlined text-[24px]">code_blocks</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">Integrated Edge Backend</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Powered by high performance upscaler engines and serverless Vercel function endpoints for seamless and reliable scaling.
                  </p>
                </div>
                <div className="mt-4 pt-2 text-secondary text-xs font-bold flex items-center gap-1">
                  View architecture specs <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </div>
              </div>
            </div>
          </section>

          {/* Tip Jar / Coffee Section */}
          <section id="tip-jar" className="w-full max-w-[1200px] mx-auto px-margin mb-space-2xl relative z-10">
            <div className="bg-surface-container-low rounded-3xl p-6 md:p-10 shadow-lg border border-surface-container-high flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 max-w-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-[24px]">local_cafe</span>
                  <span className="text-xs text-secondary font-bold uppercase tracking-wider">A cozy note from Alex</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight mb-3">
                  Why I built PixelBloom on my spare weekends
                </h2>
                <p className="text-sm text-on-surface-variant mb-2 leading-relaxed">
                  PixelBloom is designed for indie developers, digital illustrators, and creators who need fast, uncompromised upscaling without expensive monthly subscriptions.
                </p>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  If this saved you time today, consider tossing a warm beverage into the server tip jar to keep this tool fast, ad-free, and accessible for everyone!
                </p>
              </div>

              {/* Interactive Tip Jar Card */}
              <div className="w-full lg:w-96 bg-surface-container-lowest rounded-2xl p-6 shadow-md border border-surface-container-high/60 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-on-surface">Server Tip Jar</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                    GPU Fund: 88%
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-on-surface-variant mb-1.5 font-medium">
                    <span>Monthly cloud bill: $42 / $48</span>
                    <span>Almost covered!</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-secondary-container to-secondary rounded-full w-[88%]" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  {["$3 ☕", "$5 🍵", "$10 🍰", "Custom"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedTip(item)}
                      className={`flex-1 py-2 rounded-full text-xs font-bold transition-all text-center ${
                        selectedTip === item
                          ? "bg-secondary-fixed text-on-secondary-fixed shadow-sm"
                          : "bg-surface-container-high hover:bg-secondary-fixed/50 text-on-surface"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Terima kasih atas dukungannya (${selectedTip})!`)}
                  className="w-full py-3 px-4 rounded-full bg-secondary text-on-secondary hover:bg-on-secondary-container text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                  Send a Warm Coffee ({selectedTip})
                </button>
                <span className="text-center text-[11px] text-on-surface-variant">
                  Processed via secure Stripe • zero recurring fees
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low py-10 mt-12 border-t border-surface-container-high">
        <div className="max-w-[1200px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-lg font-bold text-on-surface">PixelBloom</span>
              <span className="text-xs bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full font-bold">
                Rega Digital Alliance
              </span>
            </div>
            <p className="text-xs text-on-surface-variant max-w-sm">
              Handmade with care for indie artists, illustrators, and cozy pixel curators. No paywalls, no tracking cookies.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-lowest text-xs font-bold text-on-surface shadow-sm hover:bg-surface-container-high transition-all border border-surface-container-high"
            >
              <span className="material-symbols-outlined text-[16px]">code</span>
              GitHub Repository
            </a>
            <a
              href="#tip-jar"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold shadow-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">local_cafe</span>
              Support Project
            </a>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-margin pt-6 mt-6 border-t border-surface-container-high/60 text-center text-xs text-on-surface-variant flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 PixelBloom by Rega Digital Alliance.</span>
          <span className="inline-flex items-center gap-1">
            Built with <span className="material-symbols-outlined text-[14px] text-rose-500">favorite</span> for creators everywhere
          </span>
        </div>
      </footer>
    </div>
  );
}
