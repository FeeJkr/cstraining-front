import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import './index.css';
import Container from "@material-ui/core/Container";
import Home from "./pages/Home";
import User from "./pages/User";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <div>
              <Navbar/>
          </div>

          <Container maxWidth="lg" style={{paddingTop: '20px'}}>
              <Switch>
                  <Route exact strict path={"/"}><Home/></Route>
                  <Route path={"/player/:username"}><User/></Route>
              </Switch>
          </Container>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
