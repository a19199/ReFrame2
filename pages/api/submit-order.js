export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { name, email, frame, image } = req.body;

  try {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwmYs4IVe6mHF-Jw7SmXQfrSYoWkwLKfs5oYooUqLKkGQf7Bopdj9qFPTNlVInbK8Qa/exec';

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, frame, image }),
    });

    if (!response.ok) {
      throw new Error('Failed to send to Google Sheets');
    }

    res.status(200).json({ message: 'Order submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
