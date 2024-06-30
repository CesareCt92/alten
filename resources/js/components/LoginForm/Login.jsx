import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./style.css";

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const API_BASE_URL = 'http://127.0.0.1:8000';
  const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

  const navigate = useNavigate()

  const onButtonClick = async () => {
    // Set initial error values to empty
    setUsernameError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === username) {
      setUsernameError('Please enter your email')
      return
    }



    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
    login(username, password);
  }
  const login = async (username, password) => {
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
            },
            body: JSON.stringify({ username, password, timezone }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const responseData = await response.json();

        localStorage.setItem('loginToken', responseData.token);
        localStorage.setItem('expiries', responseData.expires_at);
        localStorage.setItem('idUser', responseData.idUser);

        navigate('/beer-list');
    } catch (error) {
        console.error('Errore nella richiesta di login:', error);
        setUsernameError('Credenziali non trovate');
    }
};
  return (
    <div className={'row'}>
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Username"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Password"
          type='password'
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
    </div>
  )
}

export default Login
