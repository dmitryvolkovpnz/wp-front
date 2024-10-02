import React, {useState} from 'react';
import axios from "axios";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://newscrypt.online/wp-json/jwt-auth/v1/token', {
                username: username,
                password: password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setError('');
            console.log('JWT: ',token);
            await getUserData(token);
            window.location.reload();
        } catch (err){
            console.log(err.response?.data);
            setError('Неверный логин или пароль');
        }
    };

    const getUserData = async (token) => {
        try {
            const response = await axios.get(`http://newscrypt.online/wp-json/wp/v2/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(response.data);
            localStorage.setItem('userName', response.data.name);
            console.log('user data: ',response.data);
        } catch (err) {
            console.log(err.response?.data);
            setError('Ошибка при запросе данных');
        }
    };
    return (
        <div>
            <h1>Авторизация</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
            {error && <p style={{ color: 'red'}}>{error}</p>}

            {userData && (
                <div>
                    <h2>Вы авторизованы</h2>
                </div>
            )}
        </div>
    );
}

export default Login;