const handleFormDate = (date) => {
  return new Date(date).toLocaleString('en-UK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};

export default handleFormDate;
