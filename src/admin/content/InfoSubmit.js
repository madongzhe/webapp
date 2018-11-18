/**
 * Created by mdz on 2017/8/20.
 */
import { SubmissionError } from 'redux-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function InfoSubmit(values) {
    return sleep(1000).then(() => {
        // simulate server latency
        if(!values.title){
            throw new SubmissionError({
                title: '用户名不能空！',
                _error: '登录失败,用户名不能空！'
            });
        } else if(!values.introduce) {
            throw new SubmissionError({
                introduce: '密码不能空！',
                _error: '登录失败,密码不能空！'
            });
        } else {
            //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        }
    });
}

export default InfoSubmit