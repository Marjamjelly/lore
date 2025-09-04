let encryptedData = '';
let sentences = [];

fetch('sentences.enc')
  .then(res => res.json())
  .then(data => {
    encryptedData = data.data;
  });

document.getElementById('unlock-btn').onclick = function() {
  const password = document.getElementById('password').value;
  const unlockMsg = document.getElementById('unlock-msg');
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) {
      unlockMsg.textContent = 'Incorrect password.';
      return;
    }
    sentences = JSON.parse(decryptedText);
    document.getElementById('unlock').style.display = 'none';
    document.getElementById('search-section').style.display = '';
    unlockMsg.textContent = '';
  } catch (e) {
    unlockMsg.textContent = 'Error decrypting data.';
  }
};

document.getElementById('search').addEventListener('input', function() {
  const query = this.value.trim().toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (query.length === 0) return;

  const matched = sentences.filter(sentence =>
    sentence.toLowerCase().includes(query)
  );

  if (matched.length === 0) {
    resultsDiv.textContent = 'No matches found.';
  } else {
    resultsDiv.innerHTML = matched.map(s => `<p>${s}</p>`).join('');
  }
});
