import { SubmissionError } from 'redux-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function Upfile(values) {
    return sleep(100).then(() => {
    //  simulate server latency
        if (!values.inputName) {
            throw new SubmissionError({
                inputName: '文件名',
                _error: '登录失败,用户名不能空！'
            });
        } else if (!values.paw) {
            throw new SubmissionError({
                paw: '密码不能空！',
                _error: '登录失败,密码不能空！'
            });
        } else {
            sessionStorage.setItem('userslogin', true);
        }
    });
}

export default Upfile;
