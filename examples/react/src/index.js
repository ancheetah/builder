import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { BuilderComponent, builder, Builder } from "@builder.io/react";
import "./index.css";

builder.init("c455715576fb431197c98220f902367e");

function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="logo">MY SITE</div>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/about">
            About
          </Link>
          <Link className="link" to="/page-1">
            Page 1
          </Link>
          <Link className="link" to="/page-2">
            Page 2
          </Link>
          <Link className="link" to="/404">
            404
          </Link>
        </div>
      </header>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route
            render={({ location }) => {
              console.log('location: ', location);
              return (
                <CatchallPage 
                  key={location.key} 
                  url={location.pathname}
                />
              )
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export const CatchallPage = ({ pageModel = "page", url = "home" }) => {
  const [pageJSON, setPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const isEditingOrPreviewing = Builder.isEditing || Builder.isPreviewing;

  useEffect(() => {
    async function fetchPage() {
      setLoading(true);
      const tags = ['cms', '123abc'];
      builder
        .get(pageModel, 
          { 
            url: "page-2",//"/" + url, 
            options: { noTargeting: true },
            query: {
              data: {
                tags: {
                  $in: tags,
                }
              }
            }
          }
        )
        .promise()
        .then(setPage);

      setLoading(false);
    }
    if (!isEditingOrPreviewing) {
      fetchPage();
    }
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }
  if (!pageJSON && !isEditingOrPreviewing) {
    return <NotFound />;
  }
  return <BuilderComponent model={pageModel} content={pageJSON} />;
};

const Heading = (props) => <h1>{props.title}</h1>;

Builder.registerComponent(Heading, {
  name: "Heading",
  inputs: [
    {
      name: "title",
      type: "text"
    }
  ]
});

const Home = () => <h1>I am the homepage!</h1>;
const About = () => <h1>I am the about page!</h1>;
const NotFound = () => <h1>No page found for this URL, did you publish it?</h1>;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
