const { saveUrl, getUrl } = require("../services/urlServices");
const toBase62 = (num) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  while (num > 0) {
    result = chars[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result.padStart(6, "0");
};

const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortCode = toBase62(Date.now());
  try {
    await saveUrl(shortCode, originalUrl);
    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}` });
  } catch (error) {
    console.error("Error saving URL:", error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
};

const redirectUrl = async (req, res) => {
  const { code } = req.params;
  try {
    const originalUrl = await getUrl(code);
    if (!originalUrl) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.redirect(originalUrl);
  } catch (error) {
    console.error("Error retrieving URL:", error);
    res.status(500).json({ error: "Failed to retrieve URL" });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
};
