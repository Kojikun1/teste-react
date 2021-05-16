import React , { useContext, createContext, useState, useEffect } from 'react';

import api from '../services/api';

interface PostI{
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface DataI{
    posts: PostI[];
    favorites: PostI[];
    favoritePost: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

const DataContext = createContext<DataI>({} as DataI);

const DataProvider:React.FC = ({ children }) => {
    const [posts,setPosts] = useState<PostI[]>([]);
    const [favorites,setFavorites] = useState<PostI[]>([]);

    async function LoadPosts(){
         const response = await api.get('posts');

         const { data } = response;

         setPosts(data);
          
         console.log(response.data);
    }

    useEffect(()=> {
         LoadPosts();
    },[]);

    function favoritePost(id: number){
          const item = posts.find(item => item.id === id);

         if(item){
            if(!isFavorite(item.id)){
                setFavorites(prev => [...prev,item]);
            }
         }
    }
    function isFavorite(id: number){
        let value = false;
        for(let i = 0; i < favorites.length; i++){
            if(posts[i].id === id){
               value = true;
               break;
            }
        }
        return value;
    }

    return (
        <DataContext.Provider value={ { posts, favorites, favoritePost, isFavorite } }>
              {children}
        </DataContext.Provider>
    )
}

function usePosts(){
    return useContext(DataContext);
}

export { usePosts }

export default DataProvider;