<script>
  let username = '';
  let password = '';

  async function register() {
    const response = await fetch('http://localhost:3010/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    if (response.ok) {
      alert('Registration successful');
      window.location.href = '/login';
    } else {
      alert('Registration failed');
    }
  }
</script>

<style>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  input {
    width: calc(100% - 22px);
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
</style>

<h1>register</h1>

<div class="container">
  <h1>Register</h1>
  <input type="text" placeholder="email" bind:value={email} />
  <input type="password" placeholder="Password" bind:value={password} />
  <button on:click={register}>Register</button>
</div>