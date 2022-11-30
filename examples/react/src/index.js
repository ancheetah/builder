import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import { builder, BuilderComponent } from '@builder.io/react';
import Test from './Container.jsx';
import './index.css';

builder.init('d6ace353ab30467a800672fad8b593a1')

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
          <Link className="link" to="/test">
            Test
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
          <Route path="/test" exact component={TestPage} />
          <Route render={({ location }) => <CatchallPage key={location.key} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

class CatchallPage extends React.Component {
  state = { notFound: false };

  render() {
    return !this.state.notFound ? (
      <BuilderComponent
        model="page"
        contentLoaded={content => {
          if (!content) {
            this.setState({ notFound: true });
          }
        }}
      >
        <div className="loading">Loading...</div>
      </BuilderComponent>
    ) : (
      <NotFound /> // Your 404 content
    );
  }
}

const TestPage = () => {
  return (
    <div>
      <h1>I am the test page!</h1>
      <Test/>
    </div>
  )
};
const Home = () => <h1>I am the homepage!</h1>;
const About = () => <h1>I am the about page!</h1>;
const NotFound = () => <h1>No page found for this URL, did you publish it?</h1>;

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
