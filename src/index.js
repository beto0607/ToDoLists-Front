import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './scss/_main.scss';
import App from './App';
import Authentication from './containers/Authentication';
import Dashboard from './containers/Dashboard';
import NotFound from './containers/NotFound';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'


const api_url = "http://localhost:3001/";
const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/auth"
                    render={(routeProps) => (<Authentication {...routeProps} base_url={api_url} />)} />
                <Route path="/dashboard"
                    render={(routeProps) => (<Dashboard {...routeProps} base_url={api_url} />)} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
