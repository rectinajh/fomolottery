/**
 * Created by wchrt at 2018/7/14
 * jsonrpc工具
 */

import { post } from './httpHelp';


declare interface RpcBase {
    jsonrpc: '2.0';
    id: string;
}

declare interface RpcRequest<TParams> extends RpcBase{
    method: string,
    params:Dic<TParams>;
}


declare interface RpcResponse extends RpcBase{
     result?:any;
     error?:{
         code: number;
         message: string;
     }
}

export async function rpc<TResult=any>(method:string, params:Dic<any>):Promise<{
    error?: {
        code:number;
        message:string;
    };
    result?:TResult;
}>{
    //TODO:生成rpcid
    const rpcId = "1";
    const rpcRes = await post<RpcRequest<any>, RpcResponse>(
        'http://103.56.53.60:92/rpc/v0'
        //'http://192.168.0.10:92/rpc/v0' 
    ,{
        jsonrpc: "2.0",
        id: "1",
        method: method,
        params: params
    });

    console.log(`rpc res: ${JSON.stringify(rpcRes)}`);


    //检查应答id是否一致
    //TODO: 目前都是单请求单返回,理论上不存在不一致
    if(rpcId != rpcRes.id){
        throw new Error(`invaild rpcid:${rpcRes.id}, origin:${rpcId}`);
    }

    //请求正常,返回error和result的组合
    return {
        error: rpcRes.error,
        result: rpcRes.result
    };
}

