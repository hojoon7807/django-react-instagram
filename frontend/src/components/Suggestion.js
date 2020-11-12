import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import './Suggestion.scss';

export default function Suggestion({suggestionUser}) {
    const {username, name, avatar_url} = suggestionUser
    return (
        <div className='suggestion'>
            <div class Name="avatar">
                <Avatar 
                size="small"
                icon={
                    <img src={'http://localhost:8000'+avatar_url} alt={`${username}'s avatar`}/>
                }/>
                
            </div>
            <div className="username">
                {username} {name}
            </div>
            <div className="action">
                <Button size='small'>Follow</Button>
            </div>
            
        </div>
    )
}