// api/news.js
const axios = require('axios');
const Parser = require('rss-parser');
const parser = new Parser();

module.exports = async (req, res) => {
  // הגדרת CORS כדי לאפשר לאפליקציה שלך לגשת לזה מכל מקום
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // טיפול בבקשות OPTIONS (נדרש ל-CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // משיכת ה-RSS
    const rssUrl = "https://podtail.com/podcast/חדשות-כאן/feed.xml";
    const response = await axios.get(rssUrl);
    const feed = await parser.parseString(response.data);
    
    // עיבוד הפריטים לפורמט שהאפליקציה שלך מצפה לו
    const items = feed.items.slice(0, 24).map((item, i) => ({
      id: item.guid || item.link,
      title: item.title,
      timeUtc: item.pubDate,
      audioUrl: item.enclosure?.url || item.link,
      isLive: i === 0
    }));
    
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching RSS:", err);
    res.status(500).json({ error: err.message });
  }
};
