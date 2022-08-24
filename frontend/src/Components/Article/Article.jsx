import React from 'react';
import './Article.css';
import Carousel from 'react-bootstrap/Carousel';
import { BASE_URL } from '../../util/BaseApi';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    src={`${BASE_URL}/images/${a}`}
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
