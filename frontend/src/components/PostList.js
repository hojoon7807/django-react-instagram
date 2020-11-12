import React, { useEffect, useState } from 'react';
import Post from './Post';
import Axios from 'axios';
import { Alert } from 'antd';
import { useAppContext } from 'Store';

const apiUrl = 'http://localhost:8000/api/posts/'

function PostList() {
    const [postList, setPostList] = useState([]);
    const { store: { jwtToken } } = useAppContext();

    useEffect(() => {
        const headers = { Authorization: `JWT ${jwtToken}` };
        Axios.get(apiUrl, { headers })
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
            {postList.length === 0 &&
                <Alert type='warning' message='포스팅이 없습니다 업데이트 해주세요 :-(' />}
            {postList.map(post =>
                <Post post={post} key={post.id} />
            )}
        </div>
    )
}


export default PostList;