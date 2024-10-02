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
        };

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
        };
        fetchPosts();
        getUser();

        const timeoutId = window.setInterval(()=>{
            fetchPosts();
        }, 5000);
        return () => {
            window.clearInterval(timeoutId);
        };
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
            <h1 className="mt-4">Список постов</h1>
            <p>Количество постов: {posts.length}</p>
            <Link to='/newpost'>Добавить пост</Link>
            {userPost ? <div className="columns mt-4">
                {posts.map(post => (
                    <div className="column" key={post.id}>
                        <div className="card">
                            <div className="card-content">
                                <div className="content">
                                    {post.title.rendered}
                                </div>
                                <p className="subtitle">{post.author}</p>
                            </div>
                            <footer className="card-footer">
                                    <Link className="card-footer-item" to={`/post/${post.id}`}>
                                        Подробнее
                                    </Link>
                                <button className="card-footer-item" onClick={() => handleDelete(post.id)}>Удалить
                                </button>
                            </footer>
                        </div>
                    </div>
                ))}
            </div> : <div> загрузка постов... </div>}
        </div>
    );
};

export default PostList;