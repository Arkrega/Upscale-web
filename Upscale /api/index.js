import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 7860;

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

app.use(express.static(__dirname, {
  index: false,
  dotfiles: "deny",
}));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

const _base = "https://imageupscaler.com";
const _ajax = `${_base}/wp-admin/admin-ajax.php`;

const _hdrs = (extra = {}) => ({
  "accept": "*/*",
  "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
  "cache-control": "no-cache",
  "pragma": "no-cache",
  "priority": "u=1, i",
  "sec-ch-ua": "\"Mises\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
  "sec-ch-ua-mobile": "?1",
  "sec-ch-ua-platform": "\"Android\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36",
  ...extra,
});

const _session = async () => {
  const res = await axios.get(`${_base}/upscale-image-4x/`, {
    headers: _hdrs({ referer: _base }),
  });
  const m = res.data.match(/name="process_nonce"\s+value="([^"]+)"/);
  if (!m) throw new Error("nonce not found");

  const pidMatch = res.data.match(/["\s]pid["']?\s*[:=]\s*["']?([0-9]{20,35})/);
  const pid = pidMatch ? pidMatch[1] : null;

  const cookies = res.headers["set-cookie"]?.map(c => c.split(";")[0]).join("; ") ?? "";
  return { nonce: m[1], cookies, pid };
};

const _pid = () => {
  const a = Date.now().toString();
  const b = Math.random().toString().slice(2).padEnd(20, "0");
  return (a + b).slice(0, 30);
};

const _b64 = (buffer, mimetype) => {
  return `data:${mimetype};base64,${buffer.toString("base64")}`;
};

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/upscale", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const scale = req.body.scale === "2" || req.body.scale === "2x" ? "2" : "4";
    const { nonce, cookies, pid: pagePid } = await _session();
    const pid = pagePid ?? _pid();

    const mediaData = JSON.stringify([{
      fileSrc: _b64(req.file.buffer, req.file.mimetype),
      fileName: req.file.originalname,
      fileId: `${Date.now()}_${req.file.originalname}`,
    }]);

    const parameters = JSON.stringify({
      "upscale-type": "standard",
      increase: scale,
      "save-format": "auto",
    });

    const body = new URLSearchParams({
      action: "processing_images_adv",
      nonce,
      pid,
      function: "upscale-image-4x",
      batch_number: "1",
      total_batches: "1",
      mediaData,
      parameters,
    });

    const { data } = await axios.post(_ajax, body.toString(), {
      headers: _hdrs({
        "content-type": "application/x-www-form-urlencoded",
        "referer": `${_base}/upscale-image-4x/`,
        ...(cookies ? { cookie: cookies } : {}),
      }),
      timeout: 120000,
    });

    if (!data.success || !data.data?.items?.length) {
      return res.status(500).json({ error: "Processing failed" });
    }

    const item = data.data.items[0];
    res.json({
      success: true,
      url: item.url,
      name: item.name,
      credits: data.data.remainingCredits,
    });

  } catch (error) {
    console.error("Upscale error:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend:  http://localhost:${PORT}/`);
  console.log(`Health:    http://localhost:${PORT}/health`);
  console.log(`Upscale:   POST http://localhost:${PORT}/api/upscale`);
});

export default app;