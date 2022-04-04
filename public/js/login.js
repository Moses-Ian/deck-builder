async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

	
    if (response.ok) {
      // window.location.href;
      // document.location.replace('/');
			setTimeout(() => document.location.reload(), 10);
    } else {
			console.log(response);
      alert(response.statusText);
    }
  }
}

document.querySelector('#login-button').addEventListener('click', loginFormHandler);

