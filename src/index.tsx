import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import MainMenu from "./Routes/main-menu/MainMenu";
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { UnknownPage as NotFound } from "./Routes/404/404";
import { Settings } from "./Routes/Settings/Settings";
import { Drive } from "./Routes/Drive/Drive";

ReactDOM.render(
  <React.StrictMode>
    <>
      <BrowserRouter>
        <Switch>

          <Route path="/" exact>
            <MainMenu />
          </Route>

          <Route path="/reglage" exact>
            <Settings />
          </Route>

          <Route path="/drive" exact>
            <Drive />
          </Route>

          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

document.onloadedmetadata = () =>
{
  switch (document.location.pathname) {
    case "/":
      document.title = "Menu principale";
      break;
    case "/drive":
      document.title = "Manette";
      break;
    case "/reglage":
      document.title = "Réglage";
      break;
    default:
      document.title = "404 - Page inconnue";
      break;
  }
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
