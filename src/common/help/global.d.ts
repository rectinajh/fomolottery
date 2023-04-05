/**
 * Create by wchrt at 2018/4/27
 * 全局用类型定义
 */



/**
 * 全局通用回调函数结构
 */
declare type Callback = (err?:Error|string|any, rst?:any)=>any;
declare type CallbackRst<TRst> = (err?:Error|string|any, rst?:TRst)=>any;
declare type CallbackErrRst<TErr,TRst> = (err?:TErr, rst?:TRst)=>any;
declare type CallbackReturn<TErr,TRst,TReturn> = (err?:TErr, rst?:TRst)=>TReturn;
declare type CallbackErrStr = (err:string, rst?)=>any;
declare type GenFunc<T> = (..._args)=>IterableIterator<T>;
declare type AsyncFunc<TRst> = (..._args)=>Promise<TRst>;
//promise专用回调
declare type PromiseCallback<TErr,TRst> = (err?:TErr, rst?:TRst)=>any;
declare type PCB<TRst> = PromiseCallback<string,TRst>;

//常用类型
declare type ErrString = string;

//字典
declare interface StringDictionary<T> {
	[index:string]:T
}
declare interface NumberDictionary<T> {
	[index:number]:T
}
declare type StrDic<T> = StringDictionary<T>;
declare type NumDic<T> = NumberDictionary<T>;
declare type Dictionary<T> = StringDictionary<T>;
declare type Dic<T> = Dictionary<T>;