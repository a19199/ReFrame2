// /pages/api/submit-order.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body;

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyuBDM7y0vrRFI5l_JlRNyQYpjELcIMrvIR5CA0u1liVoRUX99ms7xSht57cEnqaMWC9A/exec',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit order');
    }

    return res.status(200).json({ success: true, message: 'Order submitted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
