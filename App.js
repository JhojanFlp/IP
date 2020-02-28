import React, { useState, useEffect } from 'react';
import Browser from './components/Browser.js';
import ListPictures from './components/ListPictures.js';
import Page from './components/Page.js';

function App() {

  const [ wordSearch, setWordSearch ] = useState('');
  const [ pictures, setPictures ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(1);

  const searchAPI = async () => {
    if(wordSearch === '') return;
    const imgPerPage = 30;
    const key = '14409333-6ff8faa53e5011f8c5951f959';
    const url = `https://pixabay.com/api/?key=${key}&q=${wordSearch}&per_page=${imgPerPage}&page=${page}`;
    const answer = await fetch(url);
    const result = await answer.json();
    setPictures(result.hits);

    const calculatePages = Math.ceil(result.totalHits / imgPerPage);
    setTotalPages(calculatePages);

    //Automatic Scroll
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.scrollIntoView({ behavior : 'auto' , block : 'start' });
  }

  useEffect(() => {
    searchAPI();
  }, [wordSearch, page]);

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Browser 
          setWordSearch={setWordSearch}
        />
      </div>
      <div className="row justify-content-center">
        <ListPictures
          pictures={pictures}
        />
        { (pictures.length === 0) ? null : (
          <Page 
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}

export default App;
