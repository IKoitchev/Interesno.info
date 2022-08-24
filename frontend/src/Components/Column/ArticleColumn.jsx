import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../util/BaseApi';
import Article from '../Article/Article';

function ArticleColumn({ contentType }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);
  useEffect(() => {
    console.log(articles);
  }, [articles]);

  function getArticles() {
    //maybe filter serverside?
    axios.get(BASE_URL + `/articles`).then((res) => {
      //console.log(res.data.articles);
      setArticles(res.data.articles);
    });
  }

  return (
    <>
      {!articles ? (
        <></>
      ) : (
        articles.map((a, i) => {
          return <Article article={a} key={i}></Article>;
          // return <div key={i}>{a.title}</div>;
        })
      )}
    </>
  );
}

export default ArticleColumn;
