const axios = require('axios');
const { saveUrl, getUrl } = require('../services/urlServices');

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

  try {
    await saveUrl(shortCode, originalUrl, userId);

    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${originalUrl}`;

    res.json({
      originalUrl,
      shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}`,
      favicon: faviconUrl,
      userId,
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
  const { userId } = req.params; // Asegúrate de enviar el userId como parte de la URL

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Consulta la colección "urls" filtrando por userId
    const urlsSnapshot = await db.collection('urls').where('userId', '==', userId).get();

    if (urlsSnapshot.empty) {
      return res.status(404).json({ error: 'No URLs found for this user' });
    }

    // Construimos un array con los datos de cada documento
    const urls = urlsSnapshot.docs.map(doc => ({
      id: doc.id, // ID del documento
      ...doc.data(), // Datos del documento
    }));

    res.json({ userId, urls });
  } catch (error) {
    console.error('Error retrieving user URLs:', error);
    res.status(500).json({ error: 'Failed to retrieve user URLs' });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
  getUserUrls
};
