import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllArticles } from '../../service/article';
import { ArticleDto } from '../../types';
import ArticleComponent from '../Article/Article';
import axiosClient from '../../service/apiClient';

interface ArticleColumnProps {
  contentType: string;
}

function ArticleColumn({ contentType }: ArticleColumnProps) {
  const [articles, setArticles] = useState<ArticleDto[]>([]);

  useEffect(() => {
    axiosClient.get<ArticleDto[]>('/articles').then((res) => {
      console.log(res.data);
      setArticles(res.data);
    });
  }, []);

  return (
    <>
      {!articles ? (
        <></>
      ) : (
        articles.map((a, i) => {
          return <ArticleComponent article={a} key={i} />;
        })
      )}
    </>
  );
}

export default ArticleColumn;
