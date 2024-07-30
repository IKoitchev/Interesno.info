import React from 'react';
import './Article.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { baseURL } from '../../service/baseApi';
import { ArticleDto } from '../../types';

interface ArticleProps {
  article: ArticleDto;
}

function Article({ article }: ArticleProps) {
  return (
    <>
      <div>{article.title}</div>

      {!article.pictures ? (
        <></>
      ) : (
        <Carousel interval={null}>
          {article.pictures?.map((name, i) => {
            return (
              <Carousel.Item key={i}>
                <div className="img-container">
                  <img
                    className="carousel-img"
                    src={`${baseURL}/images/${name}`}
                    alt="image not found"
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </>
  );
}

export default Article;
