import React from 'react';
import './Article.css';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { baseURL } from '../../service/baseApi';

function Article({ article }) {
  return (
    <>
      <div>{article.title}</div>

      {!article.pictures ? (
        <></>
      ) : (
        <Carousel interval={null}>
          {article.pictures.map((a, i) => {
            return (
              <Carousel.Item key={i}>
                <div className="img-container">
                  <img
                    className="carousel-img"
                    src={`${baseURL}/images/${a}`}
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
