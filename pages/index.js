
import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ReFrame 2</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {image && <img src={image} alt="Uploaded" style={{ marginTop: 20, maxWidth: '100%' }} />}
    </div>
  );
}
