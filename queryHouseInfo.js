const request = require('request');
const nodemailer = require('nodemailer');
const baseUrl = 'http://www.cdfangxie.com';
const cache = [];
let send = [];

const transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '392112714@qq.com',
        pass: 'uyleekbyhuljbgdb' //授权码,通过QQ获取

    }
});
var mailOptions = {
    from: '392112714@qq.com', // 发送者
    to: 'peng19956@126.com', // 接受者,可以同时发送多个,以逗号隔开
    subject: '最新房源信息', // 标题
    html: ''
};

module.exports = function(){
    request.get(baseUrl,(err,resp,body) =>{
        let result = body.match(/<div class="cont1_rukou">(.*?)<\/div>/);
        if(result && result.length){
            result = result[1];
        }
        result = result.match(/<a title(.*?)>(.*?)<\/a>/g);
        if(result){
            result.forEach(item =>{
                if(cache.indexOf(item) < 0){
                    cache.push(item);
                    send.push(item);
                }
            });
            if(send.length){
                const temp = send.map(item =>{
                    return  item.replace(/href="(.*?)"/,function(match,$0){
                        return `href="${baseUrl + $0}"`;
                    });
                });
                mailOptions.html = temp.join('<br/><br/>');
                transporter.sendMail(mailOptions,(err) => {
                    send = [];
                    if(err){
                        console.log(err);
                    }else{
                        console.log('send mail successfully');
                    }
                });
            }
        }
    });
}