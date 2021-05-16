import React , { useContext, createContext, useState, useEffect,useRef } from 'react';

import api from '../services/api';

export interface PostI{
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
    removeFavorite: (id: number) => void;
}

const DataContext = createContext<DataI>({} as DataI);

const DataProvider:React.FC = ({ children }) => {
    const [posts,setPosts] = useState<PostI[]>([]);
    const [favorites,setFavorites] = useState<PostI[]>([]);

    const isFirstRun = useRef(true);

    function loadFavorites(){
       let data = localStorage.getItem('favorites');

       if(data){
        setFavorites(JSON.parse(data));
       }
    }
    function saveFavorites(){
        localStorage.setItem('favorites',JSON.stringify(favorites));
    }
    useEffect(()=> {
        LoadPosts();
        loadFavorites();
   },[]);

   useEffect(() => {
    if(isFirstRun.current){
        isFirstRun.current = false;
    }else{
        saveFavorites();
    }
},[favorites]);


    async function LoadPosts(){
         const response = await api.get('posts');

         const { data } = response;

         setPosts(data);
          
         //console.log(response.data);
    }
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
            if(favorites[i].id === id){
               value = true;
               break;
            }
        }
        return value;
    }
    function removeFavorite(id: number){

          setFavorites(prev => {
              return prev.filter(item => item.id !== id);
          });
    }

    return (
        <DataContext.Provider value={ { posts, favorites, favoritePost, isFavorite, removeFavorite } }>
              {children}
        </DataContext.Provider>
    )
}

function usePosts(){
    return useContext(DataContext);
}

export { usePosts }

export default DataProvider;