const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess(false);

  if (!image || !frame || !name || !email) {
    alert("모든 항목을 입력해주세요.");
    return;
  }

  setLoading(true);

  try {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;

      const res = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          frame,
          image: base64Image,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('제출 실패: 서버 오류');
      }
      setLoading(false);
    };

    reader.onerror = () => {
      alert('이미지를 불러오지 못했습니다.');
      setLoading(false);
    };

    reader.readAsDataURL(image);
  } catch (err) {
    alert('알 수 없는 오류가 발생했습니다.');
    setLoading(false);
  }
};
