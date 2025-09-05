let encryptedData = '';
let quotes = [];

fetch('quotes.enc')
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
    quotes = JSON.parse(decryptedText);
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

  const matchedQuotes = quotes.filter(q =>
    (q.text && q.text.toLowerCase().includes(query)) ||
    (q.author && q.author.toLowerCase().includes(query))
  );

  if (matchedQuotes.length === 0) {
    resultsDiv.textContent = 'No matches found.';
    return;
  }

  matchedQuotes.forEach(q => {
    const block = document.createElement('div');
    block.className = 'quote-block';
    block.innerHTML = `<blockquote>“${q.text}”</blockquote><div class="quote-author">— ${q.author}</div>`;
    resultsDiv.appendChild(block);
  });
});