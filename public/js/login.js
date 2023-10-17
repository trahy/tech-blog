const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);