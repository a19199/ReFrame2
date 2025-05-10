export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbx34K5SexlzqrXuGxeN28DpxfLoH1GwA2dT0-7zzBYhiVScnwvHCL-zxVadXuU8yqGC/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        throw new Error('Failed to submit to Google Script');
      }

      res.status(200).json({ message: 'Success' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
