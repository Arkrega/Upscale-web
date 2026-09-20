import React, { useState, useRef, useEffect } from "react";

const INITIAL_SHOWCASES = [
  {
    id: 1,
    category: "anime",
    title: "Sakura Blossom Maiden",
    author: "@mikan_art",
    resBefore: "480 × 270 px",
    resAfter: "1920 × 1080 px",
    badgeAfter: "4x Bloom Sharp",
    badgeBefore: "Original (Blurry)",
    tagModel: "4x Anime Sharp",
    modelName: "Model: RealESRGAN-Anime6B",
    multiplier: "16x Pixel Multiplier",
    likes: 184,
    upscaledUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGUcLAGXann4HyeGMVySbQQzg19-Ofy1m7o4JVyX86gLHZ-4Acove4r8RNlsa1AYHExzzlC1fA9iqlGWtiXQnnbjL9wtoUW4nG3qFZDKzpB2fJYc_aiHpLptICNQqvemCRNI4fbQphGV9CD7ZILn8M_5ICEqgyi3AcmAHx_J1KN2fjsBdDmo6SCE2qrQi2ZVIVY875NXv2P6xvt3FIaVcb4ZJmkfwCZNprGsZSE2zF4Q1ZHSShlHE-",
    originalUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiKOux2yweVNMmUw-wzmocBnN1geRXdp-XAVMcfmGYJ-Jx9wgLt_oIInBu0fXIO95p_GfSywgcfGz1cwPtwQaKnGUYldyPiqZk29VUDRxzXhlgwSICk_H_YxLoaGErmegWVImRDc7SiNJTYB3aoyfAbiuvdQxdBig3oa6UWdKq56MAM4ltweWJ8xZFi0Pv46JFodgIIuF5tIW0Wj-xxsJDf8mT7HKZf0h7mzaJzsc0YYcmdjsQSmAz",
  },
  {
    id: 2,
    category: "pixel-art",
    title: "Cozy Fantasy Inn (16-Bit)",
    author: "@kenji_dev",
    resBefore: "128 × 128 px",
    resAfter: "1024 × 1024 px",
    badgeAfter: "8x Pixel Pure",
    badgeBefore: "Original (Blurry Stretch)",
    tagModel: "8x Pixel Crisp",
    modelName: "Model: OmniPixel Edge v2",
    multiplier: "Zero Color Smear",
    likes: 249,
    upscaledUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbqq1Ox39sCYsf_YfhoA7gEGswEV8NhKwLY7ZLL7Hp_CRavjahyAS_mCxTQ52ohwWq-EKWLm0BpCmcGkVONuM2kdlfSuq15nxc0kt3sIqE1-ghlPz9luwGJiiYOr3SsYx2-HKK1gB4nuhXpwvu6pWk-FjiJcsSfzE0-nyHTkGRj0y70TVIOlcTDVt1Sg0B7RynYIwPs5lBPLM_BYrTQGq-iUOtcdFm589L7OlXgsIrU6clSMhfQg6C",
    originalUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI5SMeBTqS_5ywd00oxv4zVTNFjeRoAMxkQvvfR8Y7gFau699fnHeWxPil-X8orQeGtWOYP_l-tpCbBBCW9txzVK-PKNiovsucMFG_vheDW_kVgFXu_wJUnlr0IQLNwP3C8hFumvKirP5ypCjOIqFc57nGVUdXiYdIXTk6Cxei20xeuMXXZPZWb3-0li1Sq0pPzOi0wBbbQDdjjy7K36dCscJ9bGT2PIW5KTgF-EreONG8P68cBEig",
  },
  {
    id: 3,
    category: "vintage",
    title: "Grandmother's 1942 Portrait",
    author: "@clara_archives",
    resBefore: "400 × 520 px",
    resAfter: "1600 × 2080 px",
    badgeAfter: "4x Vintage Face Restore",
    badgeBefore: "Original (Damaged Film)",
    tagModel: "4x Heritage Denoise",
    modelName: "Model: GFPGAN-v1.4",
    multiplier: "Eye & Skin Synthesis",
    likes: 312,
    upscaledUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwolARA4flQSZAMIIu6RP21QT06Iq8IXdbuS9jGbd5YiqzRONwQoctcvmCBdx_dzS60mrpMM1JjFERsiZbDqDXcd-APO5X1Pe428Zo6sYR6W29SjxwI7vWCydcS6rlAW4ZsRTqOv_yQmbj3982qL-qc12sBUvr_Lb-cV5RXZtHqkKekBe52r5Y-X1Qgupr3wchb_F0sWRToRpc-Tchn98yzIcA5uCWZYLFol8cJsH4Y4AdONtjcKS0",
    originalUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA94yWCJ08nEZ9h28a1JU7hSJ0m11K31z4ONs20vjt2NjnLGeE5Dms6GziKSDtfQG97wdB9AAabxd0wFocCTz2O-IMEM2O_027BvzZi2bWUb31DqeQDJgYS9buq3tb4leuG0ZN-RTI6AcLSCU8ZvhzHzmGIdbAFVE2YgS_HFhgPFwEgAOOpCtiwHew-UYn3Y3a4QuuHD24_zOOD2dEjLXE1_OGa6wOEnNl9Ki0JPkbCr3jEo-LCG2eL",
  },
  {
    id: 4,
    category: "nature",
    title: "Misty Fern Dewdrop Macro",
    author: "@mossy_lens",
    resBefore: "640 × 360 px",
    resAfter: "2560 × 1440 px",
    badgeAfter: "4x Macro Ultra",
    badgeBefore: "Original (Low-res JPEG)",
    tagModel: "4x Nature Texture",
    modelName: "Model: HAT-Sharpen-L",
    multiplier: "Fine Leaf Vein Recovery",
    likes: 156,
    upscaledUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_gBFNWcfzdSjudgWo1JbF84x_vKRPv1c5YezV-ZRc9vdgiVqpI-cwzdCPWxOM2nNkIDnozoLX1uvh4ZQdoFrXagNyfB-68yg9YeePXaywTpdCEtbZ3cc8GZT49vJgUauoaj9nqd3IUL_r1ZhTPM6We32jaSab8hqGo0O-9oYHkUSC8Ir22HaHRTDFbpoNQa2atJLrhjnFk50LzrztyxVdLImgf3nR7HR58JYZaWdie9N8ZSQWryGH",
    originalUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeUyFkk-glTEFOTOP8I8PJDNwPduDbRL4aqgB0XLaqGiz3TjgBronZhxsThxt2AFdUwez-1_KI3-gK_W8TZu7iLtvo61SvCfNTikFuTr6rV3GX10yblyla50RYdck9v-1mYfCoTg6v561sxHHqxlDmY9O_ISpbLVQbYOEyAw9RTxXbZYZGESavleOSiDuWJCFnUJ2dbEznyX_Qzyed0gc0TuN2OWzKGt0GYKdv-VhM688B3qZKRQML",
  },
  {
    id: 5,
    category: "pixel-art",
    title: "Neon Mage RPG Sprite",
    author: "@bitcraft",
    resBefore: "64 × 64 px",
    resAfter: "512 × 512 px",
    badgeAfter: "8x Grid Lock",
    badgeBefore: "Original (Tiny Icon)",
    tagModel: "8x Sprite Scale",
    modelName: "Model: NearestPreserve AI",
    multiplier: "Perfect Dithering",
    likes: 420,
    upscaledUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRPNZmJJoNS5NZ0mtEhjdZgJkRDHiVJVNd442g-_jl3bEOLF6v3GAy8xE93PwNUFl4rO6yOqpeTWNFmbandT9UfzyP527MIGjifoosW3ZwQEOLgZz96HgkNGTsA2zjjfxmrj4RIlq_BV1CEi1L71_0p4uKzfBZXQPmnned0vsLHt33vIw6HPxX7U8qVwv8NnJmfHinScQjg4o8hLwHQXg5v8O5nfxWa6ZuO1KO_gIWIx7FldhDfJKV",
    originalUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxpVp96eBXrhg-MqdD1uIVDCDSH2vI94hvCZT81YKw0Pkkyp6i1tKWMODV_jbkqzBkAITkWVMPaWnYCcCCn2MMfvOxQu1lAFVOozWVsAGZEUGKG6Pr17Zw2FtAsoSdpLfjYK6dRZN7zSZrVAeHVspAMB1TbUYYa-wDR_3kzclzh1eu-CnN9xAT40JDooUuTkYXMhVL4-j3EDhZlx4lEAE0Y4W34QXg2cnQmxzaKIE4s9kxVzdFTfqE",
  },
  {
    id: 6,
    category: "vintage",
    title: "1912 Venetian Dusk Postcard",
    author: "@nostalgia_club",
    resBefore: "500 × 330 px",
    resAfter: "2000 × 1320 px",
    badgeAfter: "4x Fine Art Brush",
    badgeBefore: "Original (Halftone Print)",
    tagModel: "4x Canvas Brush",
    modelName: "Model: ScannedArt-ESRGAN",
    multiplier: "Impasto Preservation",
    likes: 198,
    upscaledUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoKL3C55ZvGGzZ2U8cT8MJCg1yFkHwcZIyW9JqgluLeGcTbnBSJjJ14gR2Gu0Mmgz1RhQl_-m52ss8w5NHjlsc4LWm7bDyJ1u9jG3BaWW0JySw4vy8qE1pyV-Qejtc5NlORVmJj7_HEG3mA-2g5aLJCoGX181XrzYL3KX747an3h0KhtLeY1LwPEhgXissqmiuDL6DT8Pq9Ok87dIndF1C6EKCz6DUOoQMM3kdMFhlsbyGMYxWr_Up",
    originalUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBonrjZoLhyT2lTmHziKip-le5-KvUNUe6AOBHY-lFkPdiniIoLEpTaDYIUJ4Nr4v4_4zEgikbVJYH-lV_rY_Bib_B5Z46OcHzWHj219hnBIxQCWiq7v3rBZEvRIAUFBw5yV_sDzJFjogzoxF28NR4WSWmm3ggDXhq7--pcN8V0xMHJPsNVg0a5wdUfTuhFMKiybNRyoBe9kou5xKnI-npKH-_PUv15xQ6a1V7buN_jHxmUjPoJFxLF",
  },
];

function SplitComparisonCard({ item }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    setSliderPos((offsetX / rect.width) * 100);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) updatePosition(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (isDragging) updatePosition(e.touches[0].clientX);
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

  const toggleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
      setLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <article className="gallery-card group flex flex-col bg-surface-container-lowest rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="comparison-container relative w-full h-[360px] sm:h-[400px] overflow-hidden select-none bg-surface-container-high cursor-ew-resize"
      >
        <img
          src={item.upscaledUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 z-10 px-space-sm py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm shadow-sm">
          {item.badgeAfter}
        </div>

        <div
          className="comparison-before-wrapper absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={item.originalUrl}
            alt={`${item.title} original`}
            style={{ width: containerWidth ? `${containerWidth}px` : "100%", maxWidth: "none" }}
            className="comparison-before-img absolute top-0 left-0 h-full object-cover"
          />
          <div className="absolute top-4 left-4 z-10 px-space-sm py-1 rounded-full bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface font-label-sm text-label-sm">
            {item.badgeBefore}
          </div>
        </div>

        <div
          className="comparison-handle absolute top-0 bottom-0 w-0.5 bg-surface-container-lowest shadow-xl pointer-events-none flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg font-headline-sm scale-100 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
          </div>
        </div>
      </div>

      <div className="p-space-lg flex flex-col gap-space-sm bg-surface-container-lowest">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="px-space-sm py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
              {item.tagModel}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">{item.modelName}</span>
          </div>
          <span className="font-body-sm text-body-sm text-tertiary flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            {item.multiplier}
          </span>
        </div>
        <div className="flex items-center justify-between pt-space-xs">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{item.title}</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Submitted by {item.author} • {item.resBefore} ➔ {item.resAfter}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleLike}
            className={`px-space-md py-space-xs rounded-full font-label-md text-label-md flex items-center gap-1 transition-all ${
              liked
                ? "bg-rose-100 text-rose-600 shadow-sm"
                : "bg-surface-container-low hover:bg-surface-container text-on-surface"
            }`}
          >
            <span className={`material-symbols-outlined text-[18px] ${liked ? "fill-current text-rose-600" : ""}`}>
              favorite
            </span>
            <span>{likeCount}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [items, setItems] = useState(INITIAL_SHOWCASES);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [scale, setScale] = useState("4");
  const [title, setTitle] = useState("");
  const [artistHandle, setArtistHandle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [selectedTip, setSelectedTip] = useState(5);
  const [tipSuccess, setTipSuccess] = useState(false);

  const modalFileInputRef = useRef(null);

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  const handleFileSelection = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Pilih format gambar yang valid.");
      return;
    }
    setUploadFile(file);
    setUploadPreview(URL.createObjectURL(file));
    setUploadError(null);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError("Unggah berkas gambar terlebih dahulu.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("image", uploadFile);
    formData.append("scale", scale);

    try {
      const response = await fetch("/api/upscale", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Gagal memproses gambar melalui server backend.");
      }

      const newItem = {
        id: Date.now(),
        category: "anime",
        title: title.trim() || uploadFile.name,
        author: artistHandle.trim() || "@creator",
        resBefore: "Original Upload",
        resAfter: `${scale}x Upscaled HD`,
        badgeAfter: `${scale}x Bloom Sharp`,
        badgeBefore: "Original Input",
        tagModel: `${scale}x AI Engine`,
        modelName: "Model: Edge AI Engine",
        multiplier: `${scale}x Enhanced Output`,
        likes: 1,
        upscaledUrl: data.url,
        originalUrl: uploadPreview,
      };

      setItems((prev) => [newItem, ...prev]);
      setIsModalOpen(false);
      setUploadFile(null);
      setUploadPreview(null);
      setTitle("");
      setArtistHandle("");
    } catch (err) {
      setUploadError(err.message || "Terjadi kesalahan saat memproses gambar.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendCoffee = () => {
    setTipSuccess(true);
    setTimeout(() => {
      setTipSuccess(false);
    }, 2500);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1200px] mx-auto px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-space-sm">
              <img
                alt="PixelBloom Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGoDgA2f_3KNhrlEzOVccMym3ATdO5JvQpOt3Lv8_Z-BEcZt3MS9RJDht4rPg501A-D8e8InqBKVUOXH-GtO5WmsZhDE9du2Lq55VGtQ7e4jOWnSBCBavWsC537YvU8Tqw25T7srU5sh1lXd-okK_L3OvCLtfRRngF7LJC_Fb27fEryMH2AJTa26DakGbKh_YqzItIApZmJWr_DfkcTTGjtwVL9Tod3ehNIN4LNRvDdtKxwl1yu5Qu"
              />
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface font-extrabold">
                PixelBloom
              </span>
            </div>
            <span className="hidden lg:inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
              Hobby project ✨ Free forever
            </span>
          </div>

          <nav className="hidden md:flex items-center bg-surface-container-low p-1.5 rounded-full shadow-[0_1px_3px_0_rgba(31,41,55,0.04)]">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-space-md py-space-xs rounded-full text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface transition-all"
            >
              Upscaler
            </button>
            <a
              href="#gallery-grid"
              className="px-space-md py-space-xs transition-all bg-primary-fixed text-on-primary-fixed font-label-md text-label-md rounded-full shadow-[0_2px_8px_rgba(31,41,55,0.08)] font-bold"
            >
              Before &amp; After Gallery
            </a>
            <a
              href="#how-it-works"
              className="px-space-md py-space-xs rounded-full text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface transition-all"
            >
              How It Works
            </a>
            <a
              href="#tip-jar"
              className="px-space-md py-space-xs rounded-full text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high hover:text-on-surface transition-all"
            >
              Creator Note / Buy Me a Coffee
            </a>
          </nav>

          <div className="flex items-center gap-space-sm">
            <div className="hidden sm:flex items-center gap-space-xs bg-surface-container-lowest px-space-sm py-1 rounded-full shadow-[0_1px_3px_0_rgba(31,41,55,0.04)]">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Crafted by Alex</span>
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBym9uL7LgnB_0Jr5_Yb0xwjN2cR-7oQvltMUYpH6jyBQzGACUPsnUHTF40odAyACC5xOP9zGs8mWw_8-r_tXZW1E9t8JlrcAx4Z4X74xTmbI8mTA2VzpmLrHFDlA-SzexNTLBX5ojlMi0-v_2mHE7FTEiJK6HLCbgcgvnMUZiLj3E1t6SdMIEdgYmfLQsVz6mRoUd8JYGvg5NGRdOjDamlznnvJdtPLK9a-nu-pvOU5fINmkqNUjq9"
              />
            </div>
            <div className="sm:hidden">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBym9uL7LgnB_0Jr5_Yb0xwjN2cR-7oQvltMUYpH6jyBQzGACUPsnUHTF40odAyACC5xOP9zGs8mWw_8-r_tXZW1E9t8JlrcAx4Z4X74xTmbI8mTA2VzpmLrHFDlA-SzexNTLBX5ojlMi0-v_2mHE7FTEiJK6HLCbgcgvnMUZiLj3E1t6SdMIEdgYmfLQsVz6mRoUd8JYGvg5NGRdOjDamlznnvJdtPLK9a-nu-pvOU5fINmkqNUjq9"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-160px)]">
        <div className="flex flex-col w-full">
          <section className="relative w-full overflow-hidden bg-surface-container-low pb-space-2xl pt-space-xl">
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-fixed-dim/30 blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 h-64 w-64 rounded-full bg-secondary-fixed/40 blur-2xl pointer-events-none" />
            <div className="max-w-[1200px] mx-auto px-margin relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
                <div className="flex flex-col gap-space-xs max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-surface-container-highest w-fit text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">auto_fix_high</span>
                    <span>Real-time split slider comparisons</span>
                  </div>
                  <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight">
                    Crisp clarity, <span className="text-primary underline decoration-secondary-container decoration-wavy decoration-2">pixel by pixel</span>.
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant pt-space-xs">
                    Explore community uploads restored with free neural models. Drag the split handles on any card to inspect fine line art, clean dithering, and vintage portrait fidelity.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-lg shadow-sm">
                  <div className="flex items-center gap-space-sm px-space-xs">
                    <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-headline-sm">
                      <span className="material-symbols-outlined text-[20px]">palette</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface">Made something cool?</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Share your favorite upscale</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="px-space-md py-space-sm rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all flex items-center justify-center gap-1 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[18px]">upload</span>
                    <span>Share Upscale</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-space-xl overflow-x-auto pb-2 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={`filter-btn px-space-md py-space-xs rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap ${
                    filter === "all"
                      ? "bg-on-surface text-surface-container-lowest"
                      : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  All Enhancements
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("pixel-art")}
                  className={`filter-btn px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    filter === "pixel-art"
                      ? "bg-on-surface text-surface-container-lowest"
                      : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">grid_4x4</span>
                  Pixel Art &amp; Sprites
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("anime")}
                  className={`filter-btn px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    filter === "anime"
                      ? "bg-on-surface text-surface-container-lowest"
                      : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">draw</span>
                  Anime &amp; Illustrations
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("vintage")}
                  className={`filter-btn px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    filter === "vintage"
                      ? "bg-on-surface text-surface-container-lowest"
                      : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">history_edu</span>
                  Vintage Photos
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("nature")}
                  className={`filter-btn px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    filter === "nature"
                      ? "bg-on-surface text-surface-container-lowest"
                      : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">landscape</span>
                  Nature &amp; Wallpapers
                </button>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="max-w-[1200px] mx-auto px-margin py-space-2xl w-full">
            <div className="flex items-center justify-between mb-space-lg">
              <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse" />
                <span>Showing {filteredItems.length} showcase transformation{filteredItems.length === 1 ? "" : "s"}</span>
              </div>
              <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[16px]">swipe</span>
                <span>Drag center handle horizontally</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl" id="gallery-grid">
              {filteredItems.map((item) => (
                <SplitComparisonCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          <section className="max-w-[1200px] mx-auto px-margin pb-space-2xl w-full">
            <div className="bg-gradient-to-r from-primary-fixed to-secondary-fixed/50 p-space-xl rounded-lg flex flex-col md:flex-row items-center justify-between gap-space-lg shadow-sm">
              <div className="flex flex-col gap-space-xs max-w-xl text-center md:text-left">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-fixed font-bold">
                  Community Showcase Pool
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-primary-fixed font-bold">
                  Got an unbelievable upscale result?
                </h2>
                <p className="font-body-md text-body-md text-on-primary-fixed-variant">
                  Drop your before-and-after in our open showcase! We celebrate weird, beautiful, and hyper-detailed transformations made with PixelBloom.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-space-sm">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-space-lg py-space-md rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                  <span>Submit Before &amp; After</span>
                </button>
              </div>
            </div>
          </section>

          <section id="tip-jar" className="max-w-[1200px] mx-auto px-margin pb-space-xl w-full">
            <div className="bg-surface-container-lowest p-space-xl rounded-lg shadow-sm flex flex-col lg:flex-row gap-space-xl items-center justify-between">
              <div className="flex items-start gap-space-md max-w-xl">
                <div className="relative shrink-0">
                  <img
                    alt="Alex - PixelBloom Creator"
                    className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBym9uL7LgnB_0Jr5_Yb0xwjN2cR-7oQvltMUYpH6jyBQzGACUPsnUHTF40odAyACC5xOP9zGs8mWw_8-r_tXZW1E9t8JlrcAx4Z4X74xTmbI8mTA2VzpmLrHFDlA-SzexNTLBX5ojlMi0-v_2mHE7FTEiJK6HLCbgcgvnMUZiLj3E1t6SdMIEdgYmfLQsVz6mRoUd8JYGvg5NGRdOjDamlznnvJdtPLK9a-nu-pvOU5fINmkqNUjq9"
                  />
                  <span className="absolute -bottom-1 -right-1 text-base">☕</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      A friendly note from Alex
                    </h4>
                    <span className="font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full">
                      Indie Craft
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    PixelBloom runs on a mix of WebGPU client pipelines and hobbyist GPU nodes so artists and game devs don't have to deal with paywalls or subscription traps. If it saved you some rework time, consider buying a warm tea!
                  </p>
                  <div className="flex items-center gap-space-sm pt-space-xs text-on-surface-variant font-label-sm text-label-sm">
                    <span>Powered by open weights:</span>
                    <span className="underline hover:text-primary cursor-pointer">RealESRGAN</span> •
                    <span className="underline hover:text-primary cursor-pointer">OmniPixel</span> •
                    <span className="underline hover:text-primary cursor-pointer">GFPGAN</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-auto bg-surface-container-low p-space-md rounded-lg flex flex-col sm:flex-row items-center gap-space-md shrink-0">
                <div className="flex flex-col text-center sm:text-left">
                  <span className="font-label-md text-label-md text-on-surface font-bold">Fuel the GPU Cluster</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Keeps upscalers free for all</span>
                </div>
                <div className="flex items-center gap-1.5 bg-surface-container-lowest p-1 rounded-full shadow-inner">
                  {[3, 5, 10].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedTip(amt)}
                      className={`tip-btn px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                        selectedTip === amt
                          ? "bg-secondary-container text-on-secondary-container shadow-sm"
                          : "text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleSendCoffee}
                  className={`w-full sm:w-auto px-space-md py-space-sm rounded-full font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                    tipSuccess
                      ? "bg-tertiary-fixed text-on-tertiary-fixed"
                      : "bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container hover:text-on-secondary-container"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {tipSuccess ? "favorite" : "local_cafe"}
                  </span>
                  <span>{tipSuccess ? "Thanks so much!" : "Send Matcha"}</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low py-space-xl mt-space-2xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1200px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-lg text-center md:text-left">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-center md:justify-start gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">PixelBloom</span>
              <span className="font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full">
                v1.0 open craft
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Handmade with care for indie artists, illustrators, and cozy pixel curators. No paywalls, no tracking cookies, just friendly pixels.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-space-md">
            <a
              className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-full bg-surface-container-lowest font-label-md text-label-md text-on-surface shadow-[0_1px_3px_0_rgba(31,41,55,0.04)] hover:bg-surface-container-high hover:text-on-surface transition-all"
              href="https://github.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              GitHub Repository
            </a>
            <a
              className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md shadow-[0_2px_8px_rgba(31,41,55,0.08)] hover:bg-secondary-container hover:text-on-secondary-container transition-all"
              href="#tip-jar"
            >
              <span className="material-symbols-outlined text-[18px]">local_cafe</span>
              Support the Project
            </a>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-margin pt-space-lg mt-space-lg text-center font-body-sm text-body-sm text-on-surface-variant flex flex-col sm:flex-row items-center justify-between gap-space-sm">
          <span>© 2026 PixelBloom by Rega Digital Alliance. An indie labor of love.</span>
          <span className="inline-flex items-center gap-1">
            Built with <span className="material-symbols-outlined text-[16px] text-error">favorite</span> for everyday creators
          </span>
        </div>
      </footer>

      {isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-on-surface/40 backdrop-blur-sm transition-opacity duration-200"
        >
          <div className="bg-surface-container-lowest rounded-lg p-space-xl max-w-lg w-full mx-margin shadow-2xl transition-transform duration-200">
            <div className="flex items-center justify-between pb-space-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Share Your Transformation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant pb-space-md">
              Unggah gambar untuk di-upscale secara langsung menggunakan engine AI Vercel backend dan tampilkan perbandingannya.
            </p>

            {uploadError && (
              <div className="mb-4 p-3 rounded-lg bg-error-container text-on-error-container text-xs font-semibold">
                {uploadError}
              </div>
            )}

            <form onSubmit={handleModalSubmit} className="flex flex-col gap-space-md">
              <div
                onClick={() => modalFileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) handleFileSelection(e.dataTransfer.files[0]);
                }}
                className="border-2 border-dashed border-outline-variant hover:border-primary rounded-lg p-space-lg flex flex-col items-center justify-center text-center gap-2 cursor-pointer bg-surface-container-low/50 hover:bg-surface-container-low transition-all"
              >
                <input
                  type="file"
                  ref={modalFileInputRef}
                  onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
                  accept="image/*"
                  className="hidden"
                />
                {uploadPreview ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={uploadPreview}
                      alt="Upload Preview"
                      className="max-h-40 rounded-lg object-contain shadow-sm"
                    />
                    <span className="font-label-sm text-label-sm text-primary font-bold mt-2">
                      {uploadFile?.name} (Klik untuk mengganti)
                    </span>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[36px] text-primary">cloud_upload</span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Drag &amp; drop file gambar atau telusuri
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      PNG, JPG, WebP hingga 25MB
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-bold">Skala Perbesaran</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setScale("2")}
                    className={`py-2 px-3 rounded-full text-xs font-bold transition-all ${
                      scale === "2"
                        ? "bg-primary text-on-primary shadow-sm"
                        : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    2x Fast Scale
                  </button>
                  <button
                    type="button"
                    onClick={() => setScale("4")}
                    className={`py-2 px-3 rounded-full text-xs font-bold transition-all ${
                      scale === "4"
                        ? "bg-primary text-on-primary shadow-sm"
                        : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    4x Ultra HD
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-bold">
                  Transformation Title &amp; Model
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 1996 SNES Sprite 4x Upscale"
                  className="w-full px-space-md py-space-sm rounded-full bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary border border-surface-container-high"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-bold">Your Artist Handle</label>
                <input
                  type="text"
                  value={artistHandle}
                  onChange={(e) => setArtistHandle(e.target.value)}
                  placeholder="@yourname on X/Bluesky"
                  className="w-full px-space-md py-space-sm rounded-full bg-surface-container-low text-on-surface font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary border border-surface-container-high"
                />
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-sm">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setIsModalOpen(false)}
                  className="px-space-md py-space-sm rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !uploadFile}
                  className={`px-space-lg py-space-sm rounded-full text-on-primary font-label-md text-label-md shadow-md transition-all flex items-center gap-2 ${
                    isUploading || !uploadFile
                      ? "bg-primary/50 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-container active:scale-95"
                  }`}
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing AI...</span>
                    </>
                  ) : (
                    <span>Submit for Showcase ✨</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
