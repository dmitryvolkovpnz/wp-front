import React, { useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const NewPost = ({token}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             await axios.post("http://newscrypt.online/wp-json/wp/v2/posts", {
                title: title,
                content: content,
                status: "publish"
            },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
             }
            );
            setSuccess("Запись ушспешно добавлена!");
            setError(null);
        } catch (err){
            console.log(err);
            setError('Ошибка при добавлении');
            setSuccess(null);
        }
    };
    return (
        <div>
            <Link to='/'>Назад</Link>
            <h2>Добавить новую запись</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Заголовок</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label>Контент</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
            <button type="submit">Добавить запись</button>
            </form>
        </div>
    );
};

export default NewPost;