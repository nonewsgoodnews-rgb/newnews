// api/news.js
const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // ה-API הפנימי של כאן שמחזיר את המהדורות האחרונות
    const response = await axios.get("https://www.kan.org.il/api/v1/podcast/1020", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      }
    });
    
    // עיבוד הנתונים
    const items = response.data.items.slice(0, 24).map((item, i) => ({
      id: item.id,
      title: item.title,
      timeUtc: item.publishDate,
      audioUrl: item.audioUrl,
      isLive: i === 0
    }));
    
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
