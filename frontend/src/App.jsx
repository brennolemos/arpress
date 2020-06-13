import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Article from "./components/Article";
import UserArticlesList from "./components/UserArticlesList";
import ArticleForm from "./components/ArticleForm";
import ArticlesList from "./components/ArticlesList";
import CategoryForm from "./components/CategoryForm";
import CategoriesList from "./components/CategoriesList";
import EditForm from "./components/EditForm";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080")
      .then((res) => res.json())
      .then((response) => {
        setArticles(response.articles);
        setCategories(response.categories);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header logged={false} categories={categories} />
        <div className="container">
          <Switch>
            <Route path="/" exact>
              <Home articles={articles} />
            </Route>
            <Route path="/:slug" exact component={Article} />
            <Route path="/category/:slug" exact component={UserArticlesList} />
            <Route path="/admin/articles/new" component={ArticleForm} />
            <Route path="/admin/articles" exact component={ArticlesList} />
            <Route path="/admin/categories" exact component={CategoriesList} />
            <Route path="/admin/categories/new" component={CategoryForm} />
            <Route path="/admin/categories/edit/:id" component={EditForm} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
