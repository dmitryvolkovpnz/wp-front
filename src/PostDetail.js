import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useParams, Link} from "react-router-dom";

function PostDetail() {
    const {id} = useParams();
    const [post, setPost] = useState({});
    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const response = await axios.get(`http://newscrypt.online/wp-json/wp/v2/posts/${id}`);
                setPost(response.data);
            } catch (error){
                console.log('Ошибка в получении поста: ', error);
            }
        };
        fetchPosts();

    }, [id]);

    if (!post) {
        return <p>Загрузка...</p>;
    }
    console.log('получаемый объект',post);
    return (
        <div>
            <Link to="/">Назад</Link>
            <h1>{post.id}</h1>
            <p>{post.title?.rendered}</p>
            <p>{post.content?.rendered}</p>
        </div>
    );
}

export default PostDetail;