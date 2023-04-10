/**
 * Created by wchrt at 2018/5/6
 * 竞猜eth接口
 */

import { help } from "../help/help";
import * as Web3 from "web3";
import { EthHelp, WalletAddress, ConstractAddress, TransactionHash, HexPayloadData } from "../help/ethHelp";
import { BigNumber } from "bignumber.js";
import { abiDefinitions } from './Fomo3d.abi';


export type MatchId = BigNumber;
export type OrderId = BigNumber;
export type PoolId = BigNumber;


/**
 * 链上的数据结构
 * 构造时传入web3获取的数组型返回值，自动转换为结构体
 * 注意：参数需按照数组顺序排列,且都需设置null值
 */
// class EthStruct {
// 	public parse(originArray: any[]) {
// 		//检查参数
// 		if (Object.keys(this).length != originArray.length) {
// 			throw new Error('构造数据结构失败，数组长度有误');
// 		}
// 		//将数组对位赋值到keyvalue
// 		let index = 0;
// 		for (const keyName in this) {
// 			this[keyName] = originArray[index++];
// 		}
// 		return this;
// 	}
// }

class EthStruct {
    public parse(originArray: any[]) {
        //检查参数
        if (Object.keys(this).length != originArray.length) {
            console.error("Expected keys:", Object.keys(this));
            console.error("Received array:", originArray);
            throw new Error('构造数据结构失败，数组长度有误');
        }
        //将数组对位赋值到keyvalue
        let index = 0;
        for (const keyName in this) {
            this[keyName] = originArray[index++];
        }
        return this;
    }
}

//当前回合数据
class CurrentRoundInfo extends EthStruct {
	ico: BigNumber = null;	// eth invested during ICO phase
	roundId: BigNumber = null;	// round id 
	keys: BigNumber = null;	// total keys for round 
	end: BigNumber = null;	// time round ends
	start: BigNumber = null;	// time round started
	pot: BigNumber = null;	// current pot 
	leadTeamId: BigNumber = null;	// current team ID & player ID in lead 
	leadPlayerAddress: WalletAddress = null;	// current player in leads address 
	leadPlayerName: string = null;	// current player in leads name
	whalesEth: BigNumber = null;	// whales eth in for round
	bearsEth: BigNumber = null;	// bears eth in for round
	sneksEth: BigNumber = null;	// sneks eth in for round
	bullsEth: BigNumber = null;	// bulls eth in for round
	airdrop: BigNumber = null;	// airdrop tracker # & airdrop pot
}

//当前回合数据2
class CurrentRoundInfo2 extends EthStruct {
	maxEthName: string = null;  	// max eth of round player name
	maxEth: BigNumber = null;		// max eth of round
	maxAffName: string = null;  	// max invite of round player name
	maxAffNum: BigNumber = null; 	// max invite of round
	last1BuyerName: string = null;  // last 1 name of buyer
	last2BuyerName: string = null;  // last 2 name of buyer
	last3BuyerName: string = null;  // last 3 name of buyer
}

class PlayerInfoByAddress extends EthStruct {
	pID: BigNumber = null; // player ID
	playerName: string = null; // player name
	keys: BigNumber = null; // keys owned(current round)
	winnings: BigNumber = null; // winnings vault
	general: BigNumber = null; // general vault
	affiliate: BigNumber = null; // affiliate vault
	eth: BigNumber = null; // player round eth
	papaName: string = null; // player's papa's name
}
/** 
//  设置默认的值
**/
const defaultId = 1;
const defaultName = 'god';
const defaultAddress = '0xbe862AD9AbFe6f22BCb087716c7D89a26051f74C';


/**
 * fomo3d接口类,单例
 */
export class Fomo3d extends EthHelp {


	//合约实例
	public constractInst: Web3.ContractInstance = null;

	//拥有者地址
	private ownerAddress: WalletAddress = null;

	//单例实例
	private static _inst: Fomo3d = null;
	public static get inst() {
		if (null == Fomo3d._inst) {
			throw new Error('EnjoyGameToken 未初始化，请调用init函数');
		}
		return Fomo3d._inst;
	}

    /**
     * 初始化, 异步函数
     * @param web3 注入的web3实例 
     * @param rpcUrl eth rpc节点 和实例二选一
     */
	public static async init(web3: Web3, rpcUrl: string, constractAddress: ConstractAddress, ownerAddress: WalletAddress) {
		if (null != Fomo3d._inst) {
			console.warn('EnjoyGameToken重复初始化');
			return;
		}
		//创建类实例
		Fomo3d._inst = new Fomo3d(web3, rpcUrl);

		//获取合约实例
		Fomo3d._inst.constractInst = await Fomo3d._inst.getContractInstance(abiDefinitions, constractAddress);

		// console.log("this.web3:", this.web3);
		// console.log("this.web3.eth:", this.web3.eth);

		const ethHelpInstance = new EthHelp(web3, rpcUrl);

		const contractInstance = new ethHelpInstance.web3.eth.Contract(abiDefinitions, constractAddress);
		

		if (null == Fomo3d._inst.constractInst) {
			throw new Error(`合约初始化失败! 未获取到合约实例`);
		}

		//设置拥有者
		Fomo3d._inst.ownerAddress = ownerAddress;
	}


	//-------------------------------只读接口 start--------------------------------------

	/**
	 * 获取当前的回合数据
	 */
	public async getCurrentRoundInfo() {
		return await help.toPromise<any, CurrentRoundInfo>((callback) => {
			return this.constractInst.getCurrentRoundInfo((err, rst) => {
				if (err) { return callback(err); }
				return callback(null, new CurrentRoundInfo().parse(rst));
			});
		});
	}

	/**
	 * 获取当前的回合数据
	 */
	// public async getCurrentRoundInfo2() {
	// 	return await help.toPromise<any, CurrentRoundInfo2>((callback) => {
	// 		return this.constractInst.getCurrentRoundInfo2((err, rst) => {
	// 			if (err) { return callback(err); }
	// 			return callback(null, new CurrentRoundInfo2().parse(rst));
	// 		});
	// 	});
	// }

	public async getCurrentRoundInfo2() {
		console.log("Calling getCurrentRoundInfo2 on contract instance:", this.constractInst);
		return new Promise<CurrentRoundInfo2>(async (resolve, reject) => {
			try {
				const result = await this.constractInst.methods.getCurrentRoundInfo2().call();
				resolve(new CurrentRoundInfo2().parse(result));
			} catch (err) {
				reject(err);
			}
		});
	}
	
	
	

	/**
	 * 获取当前购买钥匙的价格
	 */
	// public async getBuyPrice() {
	// 	return await help.toPromise<any, BigNumber>((callback) => {
	// 		return this.constractInst.getBuyPrice(callback);
	// 	});
	// }

	// public async getBuyPrice() {
	// 	return await new Promise<BigNumber>((resolve, reject) => {
	// 		this.constractInst.methods.getBuyPrice().call()
	// 			.then(result => {
	// 				resolve(new BigNumber(result));
	// 			})
	// 			.catch(error => {
	// 				reject(error);
	// 			});
	// 	});
	// }

	public async getBuyPrice() {
		return await new Promise<BigNumber>((resolve, reject) => {
			this.constractInst.methods.getBuyPrice().call()
				.then(result => {
					resolve(new BigNumber(result.toString()));
				})
				.catch(error => {
					reject(error);
				});
		});
	}
	
	

    /**
     * 查询用户id
     * @param address 
     */
	public async pIDxAddr_(address: WalletAddress) {
		return await help.toPromise<any, BigNumber>((callback) => {
			return this.constractInst.pIDxAddr_(address, callback);
		});
	}


	/**
	 * 获取用户信息
	 */
	public async getPlayerInfoByAddress(address: WalletAddress) {
		return await help.toPromise<any, PlayerInfoByAddress>((callback) => {
			return this.constractInst.getPlayerInfoByAddress(address, (err, rst) => {
				if (err) { return callback(err); }
				return callback(null, new PlayerInfoByAddress().parse(rst));
			});
		});
	}

	/**
     * 获取剩余时间
	 * 返回秒
     */
	public async getTimeLeft() {
		return await help.toPromise<any, BigNumber>((callback) => {
			return this.constractInst.getTimeLeft(callback);
		});
	}



	//-------------------------------只读接口 end--------------------------------------



	//-------------------------------交易接口 start--------------------------------------

    /**
     * 发送token
     * @param from 
     * @param to 
     * @param amountWei 
     */
	public async buyXid(from: WalletAddress, etherWei: BigNumber, _affCode: BigNumber = new BigNumber(defaultId), _team: BigNumber = new BigNumber(0)) {
		const txData: Web3.TxData = {
			from: from,
			gas: 100 * 10000,
			value: etherWei
		};
		try {
			//预估手续费
			const gas = await help.toPromise<any, number>((callback) => {
				return this.constractInst.buyXid.estimateGas(_affCode.toString(), _team.toString(), txData, callback);
			});
			txData.gas = gas + 10000;
			console.log(`estimateGas:${gas}`);
		} catch (ex) { }
		return await help.toPromise<any, TransactionHash>((callback) => {
			return this.constractInst.buyXid(_affCode.toString(), _team.toString(), txData, callback);
		});
	}

	/**
     * 发送token
     * @param from 
     * @param to 
     * @param amountWei 
     */
	public async buyXaddr(from: WalletAddress, etherWei: BigNumber, _affCode: WalletAddress = defaultAddress, _team: BigNumber = new BigNumber(0)) {
		const txData: Web3.TxData = {
			from: from,
			gas: 100 * 10000,
			value: etherWei
		};

		try {
			//预估手续费
			const gas = await help.toPromise<any, number>((callback) => {
				return this.constractInst.buyXaddr.estimateGas(_affCode, _team.toString(), txData, callback);
			});
			txData.gas = gas + 10000;
			console.log(`estimateGas:${gas}`);
		} catch (ex) { }

		return await help.toPromise<any, TransactionHash>((callback) => {
			return this.constractInst.buyXaddr(_affCode, _team.toString(), txData, callback);
		});
	}

	/**
     * 发送token
     * @param from 
     * @param to 
     * @param amountWei 
     */
	public async buyXname(from: WalletAddress, etherWei: BigNumber, _affCode: string = defaultName, _team: BigNumber = new BigNumber(0)) {
		const txData: Web3.TxData = {
			from: from,
			gas: 100 * 10000,
			value: etherWei
		};
		try {
			//预估手续费
			const gas = await help.toPromise<any, number>((callback) => {
				return this.constractInst.buyXname.estimateGas(_affCode, _team.toString(), txData, callback);
			});
			txData.gas = gas + 10000;
			console.log(`estimateGas:${gas}`);
		} catch (ex) { }
		return await help.toPromise<any, TransactionHash>((callback) => {
			return this.constractInst.buyXname(_affCode, _team.toString(), txData, callback);
		});
	}

	/**
		 * 发送token
		 * @param from 
		 * @param to 
		 * @param amountWei 
	 */
	public async reLoadXid(from: WalletAddress, etherWei: BigNumber, _affCode: BigNumber = new BigNumber(defaultId), _team: BigNumber = new BigNumber(0)) {
		const txData: Web3.TxData = {
			from: from,
			gas: 100 * 10000
		};
		try {
			//预估手续费
			const gas = await help.toPromise<any, number>((callback) => {
				return this.constractInst.reLoadXid.estimateGas(_affCode.toString(), _team.toString(), etherWei.toString(), callback);
			});
			txData.gas = gas + 10000;
			console.log(`estimateGas:${gas}`);
		} catch (ex) { }
		return await help.toPromise<any, TransactionHash>((callback) => {
			return this.constractInst.reLoadXid(_affCode.toString(), _team.toString(), etherWei.toString(), callback);
		});
	}
	/**
		 * 发送token
		 * @param from 
		 * @param to 
		 * @param amountWei 
	 */

	public async reLoadXaddr(from: WalletAddress, etherWei: BigNumber, _affCode: BigNumber, _team: BigNumber = new BigNumber(0)) {
		const txData: Web3.TxData = {
			from: from,
			gas: 100 * 10000
		};
		try {
			//预估手续费
			const gas = await help.toPromise<any, number>((callback) => {
				return this.constractInst.reLoadXaddr.estimateGas(_affCode.toString(), _team.toString(), etherWei.toString(), txData, callback);
			});
			txData.gas = gas + 10000;
			console.log(`estimateGas:${gas}`);
		} catch (ex) { }
		return await help.toPromise<any, TransactionHash>((callback) => {
			return this.constractInst.reLoadXaddr(_affCode.toString(), _team.toString(), etherWei.toString(), txData, callback);
		});
	}

	/**
		 * 发送token
		 * @param from 
		 * @param to 
		 * @param amountWei 
	 */
	public async reLoadXname(from: WalletAddress, etherWei: BigNumber, _affCode: string, _team: BigNumber = new BigNumber(0)) {
		const txData: Web3.TxData = {
			from: from,
			gas: 100 * 10000
		};
		try {
			//预估手续费
			const gas = await help.toPromise<any, number>((callback) => {
				return this.constractInst.reLoadXname.estimateGas(_affCode, _team.toString(), etherWei.toString(), txData, callback);
			});
			txData.gas = gas + 10000;
			console.log(`estimateGas:${gas}`);
		} catch (ex) { }
		return await help.toPromise<any, TransactionHash>((callback) => {console.log('name!!!', typeof _affCode);
			return this.constractInst.reLoadXname(_affCode, _team.toString(), etherWei.toString(), txData, callback);
		});
	}

	/**
		 * 发送token
		 * @param from 
		 * @param to 
		 * @param amountWei 
	 */
	public async withdraw(from: WalletAddress) {
		const txData: Web3.TxData = {
			from: from,
			gas: 100 * 10000,
		};
		try {
			//预估手续费
			const gas = await help.toPromise<any, number>((callback) => {
				return this.constractInst.withdraw.estimateGas(txData, callback);
			});
			txData.gas = gas + 10000;
			console.log(`estimateGas:${gas}`);
		} catch (ex) { }
		return await help.toPromise<any, TransactionHash>((callback) => {
			return this.constractInst.withdraw(txData, callback);
		});

	}

	public async registerNameXID(from: WalletAddress, _nameString: string, _affCode: BigNumber = new BigNumber(defaultId), _all: boolean = true) {
		const txData: Web3.TxData = {
			from: from,
			gas: 100 * 10000,
			value: this.web3.toWei(0.01, 'ether')
		};
		try {
			//预估手续费
			const gas = await help.toPromise<any, number>((callback) => {
				return this.constractInst.registerNameXID.estimateGas(_nameString, _affCode.toString(), _all, txData, callback);
			});
			txData.gas = gas + 10000;
			console.log(`estimateGas:${gas}`);
		} catch (ex) { }
		return await help.toPromise<any, TransactionHash>((callback) => {
			return this.constractInst.registerNameXID(_nameString, _affCode.toString(), _all, txData, callback);
		});
	}

	public async registerNameXaddr(from: WalletAddress, _nameString: string, _affCode: WalletAddress = defaultAddress, _all: boolean = true) {
		const txData: Web3.TxData = {
			from: from,
			gas: 100 * 10000,
			value: this.web3.toWei(0.01, 'ether')
		};
		try {
			//预估手续费
			const gas = await help.toPromise<any, number>((callback) => {
				return this.constractInst.registerNameXaddr.estimateGas(_nameString, _affCode, _all, txData, callback);
			});
			txData.gas = gas + 10000;
			console.log(`estimateGas:${gas}`);
		} catch (ex) { }
		return await help.toPromise<any, TransactionHash>((callback) => {
			return this.constractInst.registerNameXaddr(_nameString, _affCode, _all, txData, callback);
		});
	}

	public async registerNameXname(from: WalletAddress, _nameString: string, _affCode: string = defaultName, _all: boolean = true) {
		const txData: Web3.TxData = {
			from: from,
			gas: 100 * 10000,
			value: this.web3.toWei(0.01, 'ether')
		};
		try {
			//预估手续费
			const gas = await help.toPromise<any, number>((callback) => {
				return this.constractInst.registerNameXname.estimateGas(_nameString, _affCode, _all, txData, callback);
			});
			txData.gas = gas + 10000;
			console.log(`estimateGas:${gas}`);
		} catch (ex) { }
		return await help.toPromise<any, TransactionHash>((callback) => {
			return this.constractInst.registerNameXname(_nameString, _affCode, _all, txData, callback);
		});
	}




	//-------------------------------交易接口 end--------------------------------------
}














