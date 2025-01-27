
import PostList from './components/PostList';
import axios from 'axios';

import { useState, useEffect } from 'react';


const App = () => {

  const baseApiUrl = "http://localhost:3000";
  const [posts, setPosts] = useState([])

  const fetchPost = () => {
    axios.get(`${baseApiUrl}/posts`)
      .then(res => {
        console.log(res.data)
        setPosts(res.data)
      })

      .catch(error => {
        console.error('Errore dureante il caricamento dei post:', error)
      })
  }

  useEffect(() => {
    fetchPost()
  }, [])


  const handlerRemovePost = (id) => {
    console.log(id);
  }



  return (
    <div div className="card my-3 p-4" >
      <h3>Elenco Articoli</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Immagine</th>
            <th scope="col">Titolo</th>
            <th scope="col">Contenuto</th>
            <th scope="col">Tags</th>
            <th scope="col">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <PostList key={post.id} post={post} onDelete={() => handlerRemovePost(post.id)} />
          ))}

        </tbody>
      </table>
    </div >

  )
}

export default App