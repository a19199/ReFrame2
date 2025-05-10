const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess(false);

  if (!image || !selectedFrame || !name || !email) {
    alert("Please complete all fields.");
    return;
  }

  setLoading(true);

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64Image = reader.result;

    try {
      const res = await fetch(
        'https://script.google.com/macros/s/AKfycbx34K5SexlzqrXuGxeN28DpxfLoH1GwA2dT0-7zzBYhiVScnwvHCL-zxVadXuU8yqGC/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            frame: selectedFrame.name,
            image: base64Image,
          }),
        }
      );

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Submission failed. Check Google Apps Script URL or permissions.');
      }
    } catch (err) {
      alert('Something went wrong: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  reader.readAsDataURL(image);
};
