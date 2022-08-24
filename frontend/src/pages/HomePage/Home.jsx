import React from 'react';
import NavBar from '../../Components/Navbar/NavBar';
import Header from '../../Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import ArticleColumn from '../../Components/Column/ArticleColumn';
import TemperatureColumn from '../../Components/Column/TemperatureColumn';

function HomePage() {
  return (
    <>
      <Header />
      <NavBar />

      <div className="page-container">
        <div className="column">
          <TemperatureColumn>3</TemperatureColumn>
        </div>
        <div className="column">
          <ArticleColumn contentType="newArticles" />
        </div>
        <div className="column">
          <ArticleColumn contentType="randomArticles" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
