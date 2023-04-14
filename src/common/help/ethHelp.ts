/**
 * Created by wchrt at 2018/5/3
 * eth工具代码
 */
import './help';
//import * as Web3 from 'web3';

import Web3 = require('web3');
import {BigNumber} from 'bignumber.js';
import { ENETRESET } from 'constants';
// import * as SolidityFunction from "web3/lib/web3/function";
// import Transaction = require('ethereumjs-tx');
import { Transaction } from 'ethereumjs-tx';
import * as ethUtil from 'ethereumjs-util';

//钱包地址
export type WalletAddress = string; 
//合约地址
export type ConstractAddress = string; 
//交易地址
export type TransactionHash = string;
//hexPayloadData
export type HexPayloadData = string;

type BigNumberType = ReturnType<typeof BigNumber>;



export class EthHelp{
    private _web3:Web3;
    public get web3():Web3 {
        return this._web3;
    }

    /**
     * 构造函数
     * @param injectedWeb3 注入的web3实例，直接绑定
     * @param rpcUrl 要访问的以太坊节点url,如要通过url进行连接，这里不传
     */
    constructor(injectedWeb3:Web3,rpcUrl?:string){

       
        if(null != injectedWeb3){
            this._web3 = injectedWeb3;
        }else{
            this._web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
        }
    }
    
	// /**
	//  * 获取合约实例
	//  * @param constractName 合约名称，合约代码类名
	//  * @param constractAddress 
	//  */
	// public async getContractInstance(constractName:string, constractAddress:ConstractAddress){
	// 	//根据合约名称读取对应位置的abi.json
	// 	const abiJson = await help.fsReadFile(`${__dirname}/../sol/${constractName}.abi.json`);
	// 	const abi = JSON.parse(abiJson);
	// 	//获取到合约实例, TODO: at是个同步方法！！！！！！
    //     const constractInst:Web3.ContractInstance = this.web3.eth.contract(abi).at(constractAddress);
	// 	return constractInst;
    // }

    /**
	 * 获取合约实例
	 * @param abiDefinition abi数组
	 * @param constractAddress 合约地址
	 */
	// public async getContractInstance(abiDefinitions:Web3.AbiDefinition[], constractAddress:ConstractAddress){
	// 	//根据合约名称读取对应位置的abi.json
	// 	//获取到合约实例, TODO: at是个同步方法！！！！！！
    //     const constractInst:Web3.ContractInstance = this.web3.eth.contract(abiDefinitions).at(constractAddress);
	// 	return constractInst;
    // }

    //   public async getContractInstance(abiDefinitions: Web3.AbiDefinition[], contractAddress: ConstractAddress) {
    //     // 根据合约名称读取对应位置的abi.json
    //     // 获取到合约实例
    //     const contractInstance: Web3.ContractInstance = this.web3.eth.contract(abiDefinitions, contractAddress);
    //     return contractInstance;
    //   }

      public async getContractInstance(abiDefinitions: Web3.AbiDefinition[], contractAddress: ConstractAddress) {
        // 根据合约名称读取对应位置的abi.json
        // 获取到合约实例
        // const contractInstance: Web3.ContractInstance = new this.web3.eth.Contract(abiDefinitions, { address: contractAddress });
        const contractInstance = this.web3.eth.Contract(abiDefinitions);

        return contractInstance;
      }
      
      
      
    
    //------------------------只读接口 start----------------------
    
    /**
     * 获取默认账号
     * TODO:异步读取默认账号
     */
    public async getDefauleAccount(){
        return await help.toPromise<Error,WalletAddress>((callback)=>{
            return callback(null,this.web3.eth.defaultAccount);
        });
    }



    /**
     * 获取以太币余额
     * @param address 
     */
    public async getEtherWei(address:WalletAddress|ConstractAddress){
        return await help.toPromise<Error,BigNumberType>((callback)=>{
            return this.web3.eth.getBalance(address,callback);
        });
    }
    
    //------------------------只读接口 end----------------------

    //------------------------交易接口 start----------------------
    /**
     * 发送交易
     * @param from 
     * @param to 
     * @param value 
     */
    public async sendTransaction(from:WalletAddress, to:WalletAddress|ConstractAddress, value?:BigNumberType, data?:string, gas?:BigNumberType, gasPrice?:BigNumberType, nonce?:number){
        const txData:Web3.TxData = {
            from: from,
            to: to,
            value: value,
            data: data,
            gas: gas,
            gasPrice: gasPrice,
            nonce: nonce
        };
        return await help.toPromise<Error,TransactionHash>((callback)=>{
            return this.web3.eth.sendTransaction(txData,callback);
        });
    }

    /**
     * 通过私钥发送交易
     */
    public async sendTransactionByKey(privateKey:string, from:WalletAddress, to:WalletAddress|ConstractAddress, value?:BigNumberType, data?:string, gasLimit?:BigNumberType, gasPrice?:BigNumberType, nonce?:number){
        const txParams = {
            from: from,
            to: to,
            value: this.web3.toHex(value),
            data: data,
            gasLimit: this.web3.toHex(gasLimit),
            gasPrice: this.web3.toHex(gasPrice),
            nonce: this.web3.toHex(nonce)
        };
        //console.log('txParams',JSON.stringify(txParams));
        const tx = new Transaction(txParams);
        tx.sign(new Buffer(privateKey, 'hex'));
        //console.log('serializeTxParams', ethUtil.bufferToHex(tx.serialize()));
        return await help.toPromise<Error,TransactionHash>((callback)=>{
            return this.web3.eth.sendRawTransaction(ethUtil.bufferToHex(tx.serialize()), callback);
        });
    }
    
    //------------------------交易接口 end----------------------
}