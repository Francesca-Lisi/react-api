const categories = [
  'Frontend',
  'Backend',
  'Fullstack',
  'DevOps',
  'Mobile'
]
const tags = [
  { id: 1, name: 'HTML' },
  { id: 2, name: 'CSS' },
  { id: 3, name: 'JavaScript' },
  { id: 4, name: 'React' }
]

//importo useState
import { useState } from 'react';

const App = () => {

  // Definisco l'oggetto vuoto che andrò a compilare con il form
  const initialformData = {
    title: '',
    urlImage: '',
    content: '',
    category: '',
    tags: [],
    published: false
  }

  //inserisco le costanti di stato:
  // const [initialForm, setInitialForm] = useState(initialformData);

  const [newArticle, setNewArticle] = useState(initialformData);
  const [articles, setArticles] = useState([]);


  //inserisco una funzione che mi permette di gestire i campi del form
  const handlerField = (e) => {

    let value = e.target.value;
    if (e.target.name === 'category') {
      value = categories[e.target.value]
    }
    if (e.target.type === 'checkbox') {
      value = e.target.checked
    }

    setNewArticle({
      ...newArticle,
      [e.target.name]: value
    })

  }

  //inserisco una funzione che mi permette di gestire l'array dei tags
  const handlerTags = (e) => {
    let { tags, ...others } = newArticle;
    // se il tag è già presente nell'array dei tag lo tolgo
    console.log(tags);

    if (tags.includes(e.target.value)) {
      tags = tags.filter(tag => tag !== e.target.value)
    } else {
      tags = [...tags, e.target.value]
    }

    //NON INVERTIRE!
    setNewArticle({
      ...others,
      tags
    })
  }

  //inserisco una funzione che mi permette di gestire il submit del form
  const handlerSubmit = (e) => {
    e.preventDefault();
    //creo un clone dell'array e aggiungo il nuovo elemento
    setArticles([
      { id: self.crypto.randomUUID(), ...newArticle },
      ...articles
    ])
  }

  //inserisco una funzione che mi permette di gestire il submit del form
  const handlerRemovePost = (id) => {
    console.log(id);
    setArticles(articles.filter(article => article.id !== id))
  }



  return (
    <div className='container my-3'>
      <div className="card p-4">
        <h3 className='mb-4'>Inserisci un nuovo articolo</h3>
        <form onSubmit={handlerSubmit}>
          <div className="row mb-3">
            <label htmlFor="title" className="col-sm-2 col-form-label fw-semibold">Titolo</label>
            <div className="col-sm-10">
              <input
                type="text"
                name='title'
                className="form-control"
                id="title"
                value={newArticle.title}
                onChange={handlerField}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="url" className="col-sm-2 col-form-label fw-semibold">URL immagine</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name='urlImage'
                id="url"
                value={newArticle.urlImage}
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
                value={newArticle.content}
                onChange={handlerField}
              ></textarea>
            </div>
          </div>
          <div className="row mb-4">
            <label htmlFor="content" className="col-sm-2 col-form-label fw-semibold">Categoria</label>
            <div className="col-sm-10">
              <select
                className="form-select"
                name="category"
                defaultValue="default"
                onChange={handlerField}
              >
                <option value='default'>Seleziona una categoria</option>
                {categories.map((category, index) => (
                  <option key={index} value={index}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2 pt-0 fw-semibold">Tags</legend>
            <div className="col-sm-10">
              {tags.map(tag => (
                <div key={`tag${tag.id}`} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`tag${tag.id}`}
                    value={tag.name}
                    onChange={handlerTags}
                  />
                  <label className="form-check-label" htmlFor={`tag${tag.id}`}>
                    {tag.name}
                  </label>
                </div>
              ))}


            </div>
          </fieldset>
          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2 pt-0 fw-semibold">Stato</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="published"
                  id="published"
                  checked={newArticle.published}
                  onChange={handlerField}
                />
                <label className="form-check-label" htmlFor="published">
                  Pubblicato
                </label>
              </div>
            </div>
          </fieldset>
          <div className="d-flex justify-content-center">
            <button type="submit" onSubmit={handlerSubmit} className="btn btn-outline-primary px-4">Invio</button>
          </div>
        </form>
      </div>

      <div className="card my-3 p-4">
        <h3>Elenco Articoli</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Immagine</th>
              <th scope="col">Titolo</th>
              <th scope="col">Contenuto</th>
              <th scope="col">Categoria</th>
              <th scope="col">Tags</th>
              <th scope="col">Stato</th>
              <th scope="col">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id}>
                <td>
                  <img src={article.urlImage} alt={article.title} width="100" />
                </td>
                <td>{article.title}</td>
                <td>{article.content}</td>
                <td>{article.category}</td>
                <td>{article.tags.join(', ')}</td>
                <td>{article.published ? 'Sì' : 'No'}</td>
                <td>
                  {/* <i
            className="fa-solid fa-pencil me-3"
          onClick={() => handlerSetEditTask(task.id)}
          ></i> */}
                  <i
                    className="fa-solid fa-trash-can trash"
                    onClick={() => handlerRemovePost(article.id)}
                  ></i>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App