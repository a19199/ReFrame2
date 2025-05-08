// 1. Create a new file: pages/api/submit-order.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { name, email, frame, image } = req.body;

  if (!name || !email || !frame || !image) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const response = await fetch(
      'https://script.google.com/a/macros/re-framephoto.com/s/AKfycbyuBDM7y0vrRFI5l_JlRNyQYpjELcIMrvIR5CA0u1liVoRUX99ms7xSht57cEnqaMWC9A/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, frame, image }),
      }
    );

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('Submit Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
