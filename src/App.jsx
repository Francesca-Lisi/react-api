
import PostList from './components/PostList';
import axios from 'axios';

import { useState, useEffect } from 'react';


const App = () => {
  const initialFormData = {
    id: '',
    title: '',
    content: '',
    image: '',
    tags: []
  }
  const baseApiUrl = "http://localhost:3000";
  const [posts, setPosts] = useState([])
  const [formData, setFormData] = useState(initialFormData)

  const handlerField = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

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

  const handlerAddPost = (e) => {
    e.preventDefault();

    const tagsArray = formData.tags
      .split(',')
      .map(item => item.trim());

    const newPost = {
      ...formData,
      tags: tagsArray
    }
    axios.post(`${baseApiUrl}/posts`, newPost)
      .then(res => {
        setPosts(res.data)
        setFormData(initialFormData)
      })
  }

  useEffect(() => {
  }, [])


  const handlerRemovePost = (id) => {
    console.log(id);
    axios.delete(`${baseApiUrl}/posts/${id}`)
      .then(res => {
        //elimino il post dall'aary locale
        //setPosts((prevPosts) => prevPosts.filter(post => post.id !== id))
        //oppure effetto una nuova uchiamata all'API allineato con il server
        fetchPost()
      })
      .catch(error => {
        console.error('Errore: ', error)
      })
  }



  return (
    <>
      <h1 className='text-center my-5'>Blog di cucina</h1>
      <div className="card p-4 m-3">
        <h3 className='mb-4'>Inserisci un nuovo articolo</h3>
        <form >
          <div className="row mb-3">
            <label htmlFor="title" className="col-sm-2 col-form-label fw-semibold">Titolo</label>
            <div className="col-sm-10">
              <input
                type="text"
                name='title'
                className="form-control"
                id="title"
                value={formData.title}
                onChange={handlerField}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="image" className="col-sm-2 col-form-label fw-semibold">URL immagine</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name='image'
                id="image"
                value={formData.image}
                onChange={handlerField}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="content" className="col-sm-2 col-form-label fw-semibold">Contenuto</label>
            <div className="col-sm-10">
              <textarea
                type="text"
                name='content'
                className="form-control"
                id="content"
                value={formData.content}
                onChange={handlerField}
              ></textarea>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="tags" className="col-sm-2 col-form-label fw-semibold">Tags</label>
            <div className="col-sm-10">
              <textarea
                type="text"
                name='tags'
                className="form-control"
                id="tags"
                value={formData.tags}
                onChange={handlerField}
              ></textarea>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" onClick={handlerAddPost} className="btn btn-outline-primary px-4">Invio</button>
          </div>
        </form>
      </div>





      <div div className="card m-3 p-4" >
        <h2 className='mb-4'>Elenco Articoli</h2>
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
    </>
  )
}

export default App