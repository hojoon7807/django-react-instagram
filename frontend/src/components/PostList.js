import React, { useEffect, useState } from 'react';
import Post from './Post';
import Axios from 'axios';
import { useAppContext } from 'Store';

const apiUrl = 'http://localhost:8000/api/posts/'

function PostList() {
    const [postList, setPostList] = useState([]);
    const { store } = useAppContext();
    console.log('store : ', store);
    useEffect(() => {
        Axios.get(apiUrl)
            .then(response => {
                const { data } = response;
                console.log(response);
                setPostList(data);
            })
            .catch(error => {
                console.log(error.response);
            })
        console.log('mounted');
    }, []); //mount시에만 한번 호출

    return (
        <div>
            {postList.map(post =>
                <Post post={post} key={post.id} />
            )}
        </div>
    )
}


export default PostList;