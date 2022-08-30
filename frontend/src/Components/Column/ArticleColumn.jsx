import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Article from '../Article/Article';
import { getAllArticles } from '../../service/article';

function ArticleColumn({ contentType }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles();
  }, []);

  function getArticles() {
    getAllArticles().then((res) => {
      setArticles(res.data.articles);
    });
  }

  return (
    <>
      {!articles ? (
        <></>
      ) : (
        articles.map((a, i) => {
          return <Article article={a} key={i} />;
        })
      )}
    </>
  );
}

export default ArticleColumn;
