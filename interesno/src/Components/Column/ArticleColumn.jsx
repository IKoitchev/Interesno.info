import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../util/BaseApi';
import Article from '../Article/Article';

function ArticleColumn(props) {
  const [articles, setArticles] = useState([
    'art1',
    'art2',
    'art3',
    'art4',
    'art5',
  ]);

  // useEffect(() => {
  //   getArticles();
  // }, []);

  function getArticles() {
    //maybe filter serverside?
    axios
      .get(BASE_URL + `/articles/${props.contentType}`)
      .then((res) => setArticles(res.data));
  }

  return (
    <>
      {articles.map((a, i) => {
        return <Article article={a} key={i}></Article>;
      })}
    </>
  );
}

export default ArticleColumn;
