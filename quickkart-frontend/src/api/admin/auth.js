export const adminLogin = async (username, password) => {
  const response = await fetch('http://localhost:5000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const data = await response.json();
  if (!data.token) {
    throw new Error('Authentication failed');
  }

  return data.token;
};