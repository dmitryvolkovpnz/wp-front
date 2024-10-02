import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


function PostList() {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://newscrypt.online/wp-json/wp/v2/posts`);
                setPosts(response.data);
            } catch (error) {
                console.log('Ошибки в выгрузке', error);
            }
        }; fetchPosts();

        const getUser = async () =>{
            try{
                const response = await axios.get(`http://newscrypt.online/wp-json/wp/v2/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCurrentUser(response.data);
            } catch (error) {
                console.log(error);
            }
        }; getUser();
    }, []);

    const deletePost = async (id) => {
        try{
           const responce = await axios.delete(`http://newscrypt.online/wp-json/wp/v2/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
           return responce.data;
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id))
        } catch (err){
            console.log(err);
        }
    };

    const userPost = posts.filter((post) => currentUser && post.author === currentUser.id);

    return (
        <div>
            <h1>Список постов</h1>
            <Link to='/newpost'>Добавить пост</Link>
            {userPost ? <ul>
                {userPost.map(post => (
                    <li key={post.id}>
                        <h2>{post.title.rendered}</h2>
                        <span>{post.author}</span> <br/>
                        <Link to={`/post/${post.id}`}>
                            <button>Подробнее</button>
                        </Link>
                        <button onClick={() => handleDelete(post.id)}>Удалить</button>
                    </li>
                ))}
            </ul> : <div> загрузка постов... </div>}
        </div>
    );
};

export default PostList;