import React from 'react';
import './AppLayout.scss';
import {Input, Menu} from 'antd';
import StoryList from './StoryList';
import SuggestionList from './SuggestionList';
import LogoImage from 'assets/logo.png';

function AppLayout({children}) {
    
    return (
        <div className='app'>
            <div className='header'>
                <div className="page-title"><img src={LogoImage} alt='logo' width='50%'/></div>
                <div className="search"><Input.Search /></div>
                <div className="topnav">
                    <Menu mode='horizontal'>
                        <Menu.Item>Memu1</Menu.Item>
                        <Menu.Item>Memu2</Menu.Item>
                        <Menu.Item>Memu3</Menu.Item>
                    </Menu>
                </div>
                </div>
            
            <div className="contents">{children}</div>
            <div className="sidebar">
                <StoryList style={{marginBottom:"1rem"}}/>
                <SuggestionList style={{marginBottom:"1rem"}}/>
            </div>
            <div className='footer'>
                &copy; 2020. HoJoon Lim.
            </div>
        </div>
    );
}

export default AppLayout;