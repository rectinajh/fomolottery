/**
 * 通用辅助工具
 */

import './ExString';
// import { BigNumber } from "bignumber.js";
import BigNumber from 'bignumber.js';

// import * as Web3 from "web3";
// import Web3 from "web3";

import * as Web3 from "web3";
// import Web3 from "web3";


type BigNumberType = ReturnType<typeof BigNumber>;




export const help = {

	//时间相关
	timeUnixMS: timeUnixMS,					//时间戳，单位：毫秒。示例：help.timeUnixMS();
	timeUnix: timeUnix,						//时间戳，单位：秒。可以和timeMan相互转换。示例：help.timeUnix(); 或者 help.timeUnix(help.timeMan());
	timeMan: timeMan,						//文本型时间戳，单位：秒。 可以和timeUnix相互转换。示例：help.timeMan(); 或者 help.timeMan(help.timeUnix());
	timeSToHMS: timeSToHMS,					//将时间戳转换为格式化时间
	waitForMS: waitForMS,    				//延迟毫秒

	// ascll转换字符串
	ascllTransform: ascllTransform,          //ascll转换

	//异步相关
	toPromise: toPromise,

	//数据类型扩展
	objExtend: objExtend,					//扩展object，示例：help.objExtend({a:1},{b:1},{c:1}); 结果：{a:1}将会变为{a:1,b:1,c:1}
	objClone: objClone,						//深度拷贝对象
	objCount: objCount,						//object的键值对数量【注意尽量不要在循环中使用，可以在遍历前先获取到】
	objValues: objValues, 					//object的值构成的数组
	objSort: objSort, 						//按照对象的的key对对象排序，返回排序后对象

	//数据类型校验方法
	isArray: isArray,						//判断是否是数组
	isObj: isObj,							//判断是否是对象
	isString: isString,						//判断是否是文本
	isNumber: isNumber,						//判断是否是数字
	isFunction: isFunction,					//判断是否是方法
	isBoolean: isBoolean,    				//判断是否是bool
	isChineseString: isChineseString, 		//判断是否是中文字符串
	isClass: isClass, 						//判断是否为某个class


	//字符串相关
	isStringNull: isStringNull, 	//字符串是否为null


	//业务逻辑相关
	getEtherStringForShow: getEtherStringForShow,	//获取用于展示的以太单位字符串
	getInjectedWeb3: getInjectedWeb3,				//获取浏览器中内置的web3
}

type helpTemp = typeof help;
//挂载到全局
global.help = help;
declare global {
	namespace NodeJS {
		interface Global {
			help: helpTemp;
		}
	}
	const help: helpTemp;
}




function timeUnixMS(timeMan?: string): number {
	if (undefined !== timeMan) {
		return new Date(timeMan).getTime();
	}
	return Date.now();
}

// unix时间戳，例：1442499067
// 调用方式：timeUnix()或者timeUnix(timeMan)
function timeUnix(timeMan?: string): number {
	if (undefined !== timeMan) {
		return Math.floor(new Date(timeMan).getTime() / 1000);
	}
	return Math.floor(Date.now() / 1000);
}

/**
 * 将时间戳转换为格式化时间
 * @param timeUnix 
 * @param style 
 */
function timeMan(timeUnix?: number, style?: string): string {
	style = style ? style : 'yyyy-MM-dd hh:mm:ss';
	if (timeUnix == undefined) {
		return formatDate(new Date(), style);
	} else {
		return formatDate(new Date(timeUnix * 1000), style);
	}
}

/**
 * 将秒转换为时:分:秒
 * @param s 
 */
function timeSToHMS(s: number) {
	var hourTime = '24';
	var minuteTime = '00';
	var secondTime = '00';
	if (Math.floor(s / 3600) < 10) {
		hourTime = '0' + Math.floor(s / 3600);
	} else {
		hourTime = Math.floor(s / 3600).toString();
	}
	if ((Math.floor(s / 60) % 60) < 10) {
		minuteTime = '0' + (Math.floor(s / 60) % 60).toString();
	} else {
		minuteTime = (Math.floor(s / 60) % 60).toString();
	}
	if ((s % 60) < 10) {
		secondTime = '0' + (s % 60).toString();
	} else {
		secondTime = (s % 60).toString();
	}
	return hourTime + ":" + minuteTime + ":" + secondTime;
	// return `${Math.floor(s / 3600)}:${Math.floor(s / 60) % 60}:${s % 60}`;
}

// 将ascll转换成字符串
function ascllTransform(ascllString: string){
	let strName = '';
	for (let i = 2; i < ascllString.length; i += 2) {
		const asciiCode = parseInt(ascllString[i] + ascllString[i + 1], 16);
		if (0 == asciiCode) {
			break;
		}
		strName += String.fromCharCode(asciiCode);
	}
	return strName;

}


//等待x毫秒后执行回调
function waitForMS(timeMS: number, callback?) {
	return new Promise((resolve, reject) => {
		if (timeMS <= 0) {
			return resolve();
		}
		//设置定时器
		return setTimeout(() => {
			return resolve();
		}, timeMS);
	});
}

/**
 * 格式化日期
 * @param date {Date}
 * @param style {string} 'yyyy-MM-dd hh:mm:ss';
 * @returns {*}
 */
function formatDate(date: Date, style: string): string {
	let y = date.getFullYear();
	let M = "0" + (date.getMonth() + 1);
	M = M.substring(M.length - 2);
	let d = "0" + date.getDate();
	d = d.substring(d.length - 2);
	let h = "0" + date.getHours();
	h = h.substring(h.length - 2);
	let m = "0" + date.getMinutes();
	m = m.substring(m.length - 2);
	let s = "0" + date.getSeconds();
	s = s.substring(s.length - 2);
	return style.replace("yyyy", y.toString())
		.replace('MM', M.toString())
		.replace('dd', d.toString())
		.replace('hh', h.toString())
		.replace('mm', m.toString())
		.replace('ss', s.toString());
}

/**
 * 将方法用promise进行包装，用于await或yield
 * @param process 需要包装的方法，用法：await toPromise<number>((callback)=>{ return callback(null,123) });
 */
function toPromise<TErr, TRst>(process: (callback: PromiseCallback<TErr, TRst>) => any): Promise<TRst> {
	//回调调用标志，防止callback多次调用
	let isCalled = false;
	return new Promise<TRst>((resolve, reject) => {
		return process((err, rst) => {
			if (isCalled) { return console.error(null, "toPromise的callback被多次调用"); }
			isCalled = true;
			//调用promise的reject或resolve来结束掉promise
			if (null != err) {
				return reject(err);
			}
			return resolve(rst);
		});
	});
}



function objExtend<TType>(target: TType, ...objs: object[]): TType {
	if (target == null) {
		return target;
	}
	for (let i = 0; i < objs.length; i++) {
		const source = objs[i];
		for (let key in source) {
			target[key] = source[key];
		}
	}
	return target;
}

//深度拷贝对象
function objClone<TType>(obj: TType): TType {
	if (!obj || 'object' != typeof obj) {
		return obj;
	}
	const newObj: any = Object.prototype.toString.call(obj) == '[object Array]' ? [] : {};

	for (const key in obj) {
		const value = obj[key];
		if (value && 'object' == typeof value) {
			//递归clone
			newObj[key] = objClone(value);
		} else {
			newObj[key] = value;
		}
	}
	return newObj;
}

function objCount(dic: object): number {

	if (dic == null) {
		console.error(null, "传入参数为null！");
		return 0;
	}

	if (!isObj(dic)) {
		console.error(null, "传入参数不是object类型！参数：" + dic);
		return 0;
	}
	//1万个元素,耗时3~4ms
	//var count = 0;
	//for(var key in dic){
	//	count++;
	//}
	//return count;

	//1万个元素，耗时1ms内
	return Object.getOwnPropertyNames(dic).length;
}

function objValues(dic): any[] {
	var values = [];
	for (var key in dic) {
		var value = dic[key];
		values.push(value);
	}
	return values;
}

/**
 * 对象排序，按照对象的key排序，不会改变对象自身,返回排序后的对象
 * @param obj 
 * @param compareFn 
 */
function objSort(obj: Dic<any>, compareFn?: (key1, key2) => number): Dic<any> {
	const keys = Object.keys(obj);
	keys.sort(compareFn);
	const newObj: Dic<any> = {};
	for (let i = 0; i < keys.length; i++) {
		newObj[keys[i]] = obj[keys[i]];
	}
	return newObj;
}

function isArray(obj): boolean {
	if (obj == null) {
		return false;
	}
	return obj.constructor === Array;
}

function isObj(obj): boolean {
	if (obj == null) {
		return false;
	}
	return obj.constructor === Object;
}

function isString(obj): boolean {
	if (obj == null) {
		return false;
	}
	return obj.constructor === String;
}

function isNumber(obj): boolean {
	if (obj == null) {
		return false;
	}
	return typeof (obj) == "number";
}

function isFunction(obj): boolean {
	if (obj == null) {
		return false;
	}
	return typeof (obj) == 'function';
}

function isBoolean(obj): boolean {
	if (null == obj) {
		return false;
	}
	return typeof (obj) == "boolean";
}

const regForChineseString = [
	/[\u3220-\uFA29]+/g,
	/[\u4E00-\u9FFF]+/g
];
function isChineseString(str: string): boolean {
	for (let i = 0; i < regForChineseString.length; i++)
		if (regForChineseString[i].test(str)) {
			return true;
		}
	return false;
}

function isClass(obj: object, className: string): boolean {
	if (!obj) {
		return false;
	}
	return className == obj.constructor.name;
}


function isStringNull(str: string): boolean {
	if (null == str) {
		return true;
	}
	if ('string' == typeof str && str.replace(' ', '').length <= 0) {
		return true;
	}
	return false;
}

function getEtherStringForShow(etherWei: string | BigNumberType, maxLength: number = 6) {
	const bigEtherWei =BigNumber(etherWei.toString());
	if (bigEtherWei.comparedTo(BigNumber('1' + '0'.repeat(18))) <= 0) {
		return bigEtherWei.div(BigNumber('1' + '0'.repeat(18))).toFixed(maxLength) + ' ether';
	}

	const integerLength = bigEtherWei.div(BigNumber('1' + '0'.repeat(18))).toFixed(0).length;
	return bigEtherWei.div(BigNumber('1' + '0'.repeat(18))).toFixed(Math.max(2, maxLength - integerLength + 1)) + ' ether';

}

function getInjectedWeb3(): Web3 {
	let injectedWeb3: Web3 = null;
  
	// 使用 window.ethereum 替代旧的 web3 对象
	if (window.ethereum) {
	  injectedWeb3 = new Web3(window.ethereum);
	}
  
	return injectedWeb3;
  }


// function getInjectedWeb3(): Web3 {
// 	let injectedWeb3: Web3 = null;
// 	try {
// 		//捕获浏览器全局的web3实例
// 		injectedWeb3 = eval('web3');
// 	} catch (ex) { };

// 	return injectedWeb3;
// }