const loginBtn = document.querySelector("#loginBtn");

const signupBtn = document.querySelector("#signupBtn");

const logo = document.querySelector('#logo');

logo.addEventListener('click', async function() {
    const response = await fetch('/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        location.href = '/';
    };
});

loginBtn.addEventListener('click', async function() {
    const response = await fetch('/login', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    });
    if (response.ok) {
        location.href = '/login';
    };
});

signupBtn.addEventListener('click', async function() {
    const response = await fetch("/signup", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        location.href = "/signup";
    };
});
