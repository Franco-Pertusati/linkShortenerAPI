const axios = require('axios');
const { saveUrl, getUrl, getUrlsByUserId } = require('../services/urlServices');

const toBase62 = (num) => {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  while (num > 0) {
    result = chars[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result.padStart(6, '0');
};

const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const { userId } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const shortCode = toBase62(Date.now());
  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${originalUrl}`;

  try {
    await saveUrl(shortCode, originalUrl, userId);
    res.json({
      originalUrl,
      shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}`,
      userId,
      faviconUrl,
    });
  } catch (error) {
    console.error('Error saving URL:', error);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
};

const redirectUrl = async (req, res) => {
  const { code } = req.params;
  try {
    const originalUrl = await getUrl(code);
    if (!originalUrl) {
      return res.status(404).json({ error: 'URL not found' });
    }
    res.redirect(originalUrl);
  } catch (error) {
    console.error('Error retrieving URL:', error);
    res.status(500).json({ error: 'Failed to retrieve URL' });
  }
};

const getUserUrls = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const userUrls = await getUrlsByUserId(userId);
    if (!userUrls.length) {
      return res.status(404).json({ error: 'No URLs found for this user' });
    }

    res.json({ userId, urls: userUrls });
  } catch (error) {
    console.error('Error retrieving user URLs:', error);
    res.status(500).json({ error: 'Failed to retrieve user URLs' });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
  getUserUrls,
};
