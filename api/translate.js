export default async function handler(req, res) {
  const { text, target } = req.query;

  const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyDysSBNZVOeOGEEPvol6ewNbZO2KJS7leM`, {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      target: target,
      format: 'text',
      source: 'en'
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  
  if (data.error) {
    return res.status(500).json({ error: data.error.message });
  }

  res.status(200).json({ translation: data.data.translations[0].translatedText });
}
