/**
 * Created by wchrt on 2016/11/24.
 *
 * web服务器
 */

import * as http from 'http';
import * as https from 'https';
import * as request from 'request';
import {help} from './help';



/**
 * 请求返回的结构（所有请求都返回这个结构）
 */
export interface ResponseData{
    err:string; //错误
    rst:any;    //正常返回的值
}


//web客户端，静态类
export class WebClient {
    private constructor(){};

    public static async request(isHttps: boolean, content:string, options:request.Options) {

        //将content转换为buffer
        const contentBuf = new Buffer(content);

        //设置头部
        if(!options.headers){
            options.headers = {};
        }
        //设置请求体大小
        options.headers['Content-Length'] = contentBuf.byteLength;

        //发起请求，并在整个请求结束后返回字符串结果
        return await WebClient.httpRequest(isHttps,contentBuf,options);
    };

    /**
     * 异步http请求，遇到错误即返回
     * @param isHttps 
     * @param content 
     * @param postOptions 
     * @param callback 
     */
    private static async httpRequest(isHttps:boolean, content:Buffer, options:request.Options){
            // //根据协议类型设置对应的代理
            // if(options.agentOptions){
            //     if(isHttps){
            //         options.agentClass = HttpsAgent;
            //     }else{
            //         options.agentClass = HttpAgent;
            //     }
            // }
            const rst = await help.toPromise<string,string>(callback=>{
                //发起请求
                const req = request(options,(err,res,body)=>{
                    if(err){
                        return callback(`web res异常,err:${err.stack?err.stack:err}`);
                    }
                    return callback(null, body?body.toString():'');
                });
                // TODO: 无需重复处理
                // //处理请求错误事件
                // req.on('error',(err)=>{
                //     return callback(`web req异常,err:${err.stack}`);
                // });

                //发送请求体
                req.write(content);
                req.end();
            });

            return rst;
    }
}