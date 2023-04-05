

//rpc接口返回值的结构
declare type RpcFuncReturn<TType> = Promise<{
    error?: {
        code?:number;
        message:string;
    };
    result?:TType;
}>;

//rpc命名空间
declare namespace RpcV0 {
    //test脚本
    interface test  { 
        testFunction: (params:{
            a:number;
        })=>RpcFuncReturn<{
            b:string;
        }>;

        //a+b 方法
        ab: (params:{
            a:number;
            b:number;
        })=>RpcFuncReturn<{
            c:number;
        }>; 
        // getCurrentRoundInfo:(params:{  
        // })=>RpcFuncReturn<{
        //     info:any;
        // }>;
    }
    interface message{
        
        getCurrentRoundInfo:(params:{  
        })=>RpcFuncReturn<{
            info:CurrentRoundInfoClass;
        }>;
        getEthPrice:(params:{
            num:number;
        })=>RpcFuncReturn<{
           onePrice:string,
           price:string,
           realPrice:string
        }>;

        getOneUsdtInfo:(params:{
          
        })=>RpcFuncReturn<{
           price:string
        }>;
    }
}




//fomo3d 当前回合数据
declare interface CurrentRoundInfoClass {
    ico: string; 
    roundId: string; 
    keys : string;
    end :string;
    start : string; 
    pot : string; 
    leadTeamId : string;
    leadPlayerAddress : string;
    leadPlayerName : string; 
    whalesEth : string; 
    bearsEth : string;
    sneksEth : string;
    bullsEth : string;
    airdrop : string;
    airdropPercent:string;
    airdropEth:string;
    totalKeys:string;
    totalEth:string;
    distributedEth:string;
    timeYear:string;
    timeS:string;

    //回合数据2
    maxEthName: string;  	// max eth of round player name
	maxEth: string;		// max eth of round
	maxAffName: string;  	// max invite of round player name
	maxAffNum: string; 	// max invite of round
	last1BuyerName: string;  // last 1 name of buyer
	last2BuyerName: string;  // last 2 name of buyer
	last3BuyerName: string;  // last 3 name of buyer
}