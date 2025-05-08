export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbypNstRxp0jUUagIjpTeIuX3NJ56_tox2qYly2PPRIUqvFM2NJ-SIfei595pFtar1xw/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error('Failed to submit order to Google Sheets');
    }

    res.status(200).json({ message: 'Order submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
