// document.addEventListener('DOMContentLoaded', () => {
//   const loginForm = document.getElementById('loginForm');
//   const signupForm = document.getElementById('signupForm');
//   const forgotForm = document.getElementById('forgotPasswordForm');

//   if (loginForm) {
//     loginForm.addEventListener('submit', (e) => {
//       e.preventDefault();
//       alert('Login logic goes here.');
//     });
//   }

//   if (signupForm) {
//     signupForm.addEventListener('submit', (e) => {
//       e.preventDefault();
//       alert('Signup logic goes here.');
//     });
//   }

//   if (forgotForm) {
//     forgotForm.addEventListener('submit', (e) => {
//       e.preventDefault();
//       alert('Password reset link sent (mock).');
//     });
//   }
// });
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const forgotForm = document.getElementById('forgotPasswordForm');

  const baseURL = 'http://localhost:5000/api/auth';

  // LOGIN
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[type="email"]').value.trim();
      const password = loginForm.querySelector('input[type="password"]').value;

      try {
        const res = await fetch(`${baseURL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
          alert(`Welcome ${data.fullName}!`);
          localStorage.setItem('token', data.token);
          window.location.href = 'dashboard.html'; // redirect after login
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        console.error(err);
        alert('Server error. Try again later.');
      }
    });
  }

  // SIGN UP
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = signupForm.querySelector('input[name="fullName"]').value.trim();
      const email = signupForm.querySelector('input[type="email"]').value.trim();
      const password = signupForm.querySelector('input[name="password"]').value;
      const confirmPassword = signupForm.querySelector('input[name="confirmPassword"]').value;

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const res = await fetch(`${baseURL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, password })
        });

        const data = await res.json();
        if (res.ok) {
          alert("Signup successful! Please login.");
          window.location.href = 'index.html';
        } else {
          alert(data.message || 'Signup failed');
        }
      } catch (err) {
        console.error(err);
        alert('Server error. Try again later.');
      }
    });
  }

  // FORGOT PASSWORD (Mock Only)
  if (forgotForm) {
    forgotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = forgotForm.querySelector('input[type="email"]').value.trim();

      // In production, you'd make a POST request to /api/auth/forgot-password
      alert(`Password reset link sent to ${email} (mock).`);
    });
  }
});
