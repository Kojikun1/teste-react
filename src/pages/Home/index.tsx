import React from 'react';

import loadingIMG from '../../assets/loadingIMG.gif';

import './styles.css';

import { usePosts } from '../../contexts/PostsContext';
import ListItem from '../../components/ListItem';

export default function Home(){

    const { posts, favorites } = usePosts();
    return (
        <div className="main">
           <div className="container">
           <div className="postsContainer">
            <h2>Posts</h2>
            {
            posts.length === 0 ? 
            <img src={loadingIMG} alt="" /> :
            posts.map(item => {
                return (
                    <ul key={item.id}>
                        <li>
                           <ListItem  item={item}  isFavoriteList={false}/>
                        </li>
                    </ul>
                )
            })}
            </div>
            <div className="postsContainer">
            <h2>Favorites</h2>
            {
            favorites.length === 0 ?
            <p>No Favorites</p> :
            favorites.map(item => {
                return (
                    <ul key={item.id}>
                        <li>
                            <ListItem  item={item}  isFavoriteList={true}/>
                        </li>
                    </ul>
                )
            })}
            </div>
           </div>
        </div>
    )
}