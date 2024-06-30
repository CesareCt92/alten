import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./style.css";
import Swal from 'sweetalert2'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

  const navigate = useNavigate()

  const onButtonClick = async () => {
    setUsernameError('')
    setPasswordError('')

    if ('' === username) {
      setUsernameError('Inserisci il nome utente')
      return
    }

    if ('' === password) {
      setPasswordError('Inserisci la password')
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

        const responseData = await response.json();
        if (!response.ok) {
            Swal.fire({
                title: 'Errore!',
                text: responseData.message,
                icon: 'info',
                confirmButtonColor: '#1e6dcb',
                confirmButtonText: 'Ok'
              })
        }
        localStorage.setItem('loginToken', responseData.token);
        localStorage.setItem('expiries', responseData.expires_at);
        localStorage.setItem('idUser', responseData.idUser);
        navigate('/beer-list');
    } catch (error) {
        Swal.fire({
            title: 'Errore!',
            text: 'Si è verificato un errore',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#1e6dcb',
          })
    }
};


  return (
    <form>
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
    </form>
  )
}

export default Login
