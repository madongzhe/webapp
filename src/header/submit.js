import axios from 'axios';
import configs from '../config';
/**
 * Created by mdz on 2017/8/15.
 */
import { SubmissionError } from 'redux-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function submit(values) {
    return sleep(100).then(() => {
    //  simulate server latency
        if (!values.LoginName) {
            throw new SubmissionError({
                LoginName: '用户名不能空！',
                _error: '登录失败,用户名不能空！'
            });
        } else if (!values.LoginPaw) {
            throw new SubmissionError({
                paw: '密码不能空！',
                _error: '登录失败,密码不能空！'
            });
        } else {
            return new Promise(function(resolve, reject){
                axios.post(configs.serverHttpPath + '/Login', {'data': values}).then(function(response) {
                    if (response.data.erron === 0){
                        sessionStorage.setItem('state', 'true');
                        sessionStorage.setItem('name', response.data.name);
                        sessionStorage.setItem('token', response.data.token);
                    } else {
                        throw new SubmissionError({
                            _error: response.data.message
                        });
                    }
                    console.log('response.data');
                    resolve();
                }).catch(function(error) {
                    reject(error);
                });
            });
        }
    });
}

export default submit;
