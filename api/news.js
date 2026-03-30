// api/news.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // ניסיון משיכה פשוט ללא ספריות חיצוניות
    const response = await fetch("https://www.kan.org.il/Podcast/rss.aspx?feedid=1020", {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    
    const data = await response.text();
    
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
