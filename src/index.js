import React from 'react';
import ReactDOM from 'react-dom';
import './public/scss/index.scss';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//   导入redux的相关模块
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import createBrowserHistory from 'history/createBrowserHistory';

//  js模块
import asyncComponent from './AsyncComponent';
const HeaderIndex = asyncComponent(() => import('./header/header_index'));
const ContentIndex = asyncComponent(() => import('./content/index'));
const Pages = asyncComponent(() => import('./content/page'));
const userIndex = asyncComponent(() => import('./users/index'));
const Register = asyncComponent(() => import('./content/register'));

const history = createBrowserHistory();
const reducers = {
    form: formReducer
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);
const Index = () => (
            <div>
                <HeaderIndex/>
                <div className="container pb-4 bg-white">
                    <Route exact path="/" component={ContentIndex}/>
                    <Route path="/page/:id" component={ContentIndex} />
                    <Route path="/p/:id" component={Pages} />
                    <Route path="/Register" component={Register}/>
                </div>
                <div className="border-top bg-secondary text-white p-2 text-center">@2017</div>
            </div>
        );
const BasicExample = () => (
    <Router history={history}>
        <div>
            <Route exact path="/" component={Index}/>
            <Route exact path="/page/*" component={Index}/>
            <Route exact path="/p/*" component={Index}/>
            <Route path="/users" component={userIndex}/>
            <Route path="/Register" component={Index}/>
        </div>
    </Router>
);
ReactDOM.render(
    <Provider store={store}>
        <BasicExample />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
