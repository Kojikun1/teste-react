import React from 'react';
import Icon from '@mdi/react';
import { mdiStarOutline, mdiStar, mdiStarRemove } from '@mdi/js';

import './styles.css';

import { PostI, usePosts } from '../../contexts/PostsContext';

interface Props {
    item: PostI,
    isFavoriteList: boolean;
}

const ListItem: React.FC<Props> = ({ item, isFavoriteList }) => {

    const { favoritePost, isFavorite, removeFavorite } = usePosts();
    let path: string;
    let onClickFuncion: Function;
    if(isFavoriteList){
        path = mdiStarRemove;
        onClickFuncion = removeFavorite;
    }else {
        path = isFavorite(item.id) ? mdiStar : mdiStarOutline;
        onClickFuncion = favoritePost;
    }

    return (
    <div className="box"  >
        <h2>{item.title}</h2>
        <p>{item.body}</p>
        <div className="favButton" onClick={() => onClickFuncion(item.id)} >
            <Icon
                path={path}
                size={2}
            />
        </div>
   </div>
    )
}

export default ListItem;