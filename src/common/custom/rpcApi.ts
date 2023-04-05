/**
 * Created by wchrt at 2018/7/17
 * 客户端所有rpc的api统一写在这里
 */

import { rpc } from '../help/rpcHelper';


//test脚本
export const test:RpcV0.test = {
    testFunction:       async(params)=>{ return await rpc('test.testFunction',      params); },
    ab:                 async(params)=>{ return await rpc('test.ab',                params); }
};
export const message:RpcV0.message={
    getCurrentRoundInfo: async(params)=>{return await rpc('message.getCurrentRoundInfo',params);},
    getEthPrice: async(params)=>{return await rpc('message.getEthPrice',params);},
    getOneUsdtInfo: async(params)=>{return await rpc('message.getOneUsdtInfo',params);}
};