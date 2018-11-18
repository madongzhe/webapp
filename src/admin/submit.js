/**
 * Created by mdz on 2017/8/15.
 */
import { SubmissionError } from 'redux-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function submit(values) {
    return sleep(1000).then(() => {
        // simulate server latency
        if(!values.inputName){
            throw new SubmissionError({
                inputName: '用户名不能空！',
                _error: '登录失败,用户名不能空！'
            });
        } else if(!values.paw) {
            throw new SubmissionError({
                paw: '密码不能空！',
                _error: '登录失败,密码不能空！'
            });
        } else if (!['john', 'paul', 'george', 'admin'].includes(values.inputName)) {
            throw new SubmissionError({
                inputName: '用户名不存在！',
                _error: '登录失败,用户名不存在'
            });
        } else if (values.paw !== '123456') {
            throw new SubmissionError({
                paw: '密码错误！',
                _error: '登录失败,密码错误'
            });
        } else {
            //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
            sessionStorage.setItem("adminlogin", true);
        }
    });
}

export default submit