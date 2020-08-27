import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login/Login';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './stores/reducers/reducers';
import Users from './Components/Users/Users';
import CreateUser from './Components/Users/CreateUser';

function App() {
  const store = createStore(reducers, applyMiddleware(thunk));

  return (
    <div className="App">
      <Provider store={store}>
      <header className="App-header">
        <BrowserRouter>
          <switch>
              <Route path="/" exact component={Login} strict/>
              <Route path="/users" exact  component={Users} strict/>
              <Route path="/createUser" exact component={CreateUser} strict/>
          </switch>
        </BrowserRouter>
      </header>
      </Provider>
    </div>
  );
}

export default App;
