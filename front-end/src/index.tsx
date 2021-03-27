import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import MainMenu from "./Routes/main-menu/MainMenu";
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { UnknownPage as NotFound } from "./Routes/404/404";
import { Settings } from "./Routes/Settings/Settings";
import { Drive } from "./Routes/Drive/Drive";
import Legal from './Routes/Legal/legal';

// set the config if there's nothing set
if (!window.localStorage.getItem("max-engine-power"))
  window.localStorage.setItem("max-engine-power", "100");
if (!window.localStorage.getItem("turn-speed"))
  window.localStorage.setItem("turn-speed", "20");
if (!window.localStorage.getItem("accel-speed"))
  window.localStorage.setItem("accel-speed", "50");

// register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js", { type: "classic" });
}

import("./index.scss");

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

          <Route path="/legal" exact>
            <Legal />
          </Route>

          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
