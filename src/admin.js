/**
 * Created by mdz on 2017/8/27.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './public/scss/admin.scss';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter,BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// 导入redux的相关模块
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import createBrowserHistory from 'history/createBrowserHistory';
//js模块
import Login from './admin/login';
import Admin_Index from './admin/index';

const history = createBrowserHistory();
const reducers = {
    form: formReducer
}
const reducer = combineReducers(reducers);
const store = createStore(reducer);

const BasicExample = () => (
    <Router history={history}>
        <div>

            <Route exact path="/admin" component={Login}/>
            <Route path="/admin/index" render={()=>{
                    if (sessionStorage.adminlogin=='true'){
                        return <Admin_Index/>
                    }else{
                        return <Redirect to="/admin"/>
                    }
                }}/>
        </div>
    </Router>
)

ReactDOM.render(
    <Provider store={store}>
        <BasicExample />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
