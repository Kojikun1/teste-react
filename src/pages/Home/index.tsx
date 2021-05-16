import React from 'react';
import Icon from '@mdi/react';
import { mdiStarOutline, mdiStar } from '@mdi/js';

import loadingIMG from '../../assets/loadingIMG.gif';

import './styles.css';

import { usePosts } from '../../contexts/PostsContext';

export default function Home(){

    const { posts, favorites, favoritePost, isFavorite } = usePosts();
    return (
        <div className="main">
           <div className="container">
           <div className="postsContainer">
            <h2>Posts</h2>
            {
            posts.length === 0 ? 
            <img src={loadingIMG} alt="" /> :
            posts.map(item => {
                const isFav = isFavorite(item.id);
                return (
                    <ul key={item.id}>
                        <li>
                           <div className="box"  >
                                <h2>{item.title}</h2>
                                <p>{item.body}</p>
                                <div className="favButton" onClick={() => favoritePost(item.id)} >
                                    <Icon
                                        path={isFav ? mdiStar : mdiStarOutline}
                                        size={2}
                                    />
                                </div>
                           </div>
                        </li>
                    </ul>
                )
            })}
            </div>
            <div className="postsContainer">
            <h2>Favorites</h2>
            {favorites.map(item => {
                return (
                    <ul key={item.id}>
                        <li className="box">
                           <h2>{item.title}</h2>
                           <p>{item.body}</p>
                        </li>
                    </ul>
                )
            })}
            </div>
           </div>
        </div>
    )
}