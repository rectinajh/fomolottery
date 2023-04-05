/**
 * Created by wchrt on 2018/5/4
 * 字符串扩展
 */

declare global{
    /**
     * 字符串对象扩展方法
	 */
    interface String {
        format(...params): string;
		replaceOne(originStr,DestStr):string;
		replaceAll(regExp:string, target:string):string;
		toBool():boolean;
		contains(subStr):boolean;
		splitNoReturnEmpty(seq):Array<string>;
    }

    namespace NodeJS {
		/**
		 * global自身
		 */
        interface Global {
			tagString: (...params)=>string;
			genString: (...params)=>StringGenerator;

        }
    }
    const tagString: typeof global.tagString;
    const genString: typeof global.tagString;
}

//格式化，示例："我的名字叫{0},我{1}一个好人".format("小明","是");
String.prototype.format = function():string{
    let newStr = this;
    for(var i=0; i<arguments.length; i++){
        let arg = arguments[i];
        if(typeof arg == "object"){
            try {
                arg = JSON.stringify(arg);
            }catch(ex){
                console.error("string","此对象无法转换:"+arg==null?"null":arg.toString());
            }
        }
        if(arg){
            arg = arg.toString().replace('$','$$$$');
        }
        newStr = newStr.replace("{"+i+"}",arg==null?"null":arg);
    }
    return <string>newStr;
};

/**
 * 解析模板字符串，将模板字符串的参数全部Json化
 * 使用方法:tag+模板字符串
 * 例如： let str = tagString `string is :${obj}`;
 */
global.tagString = function(strs:string[],...values):string{
    let str = strs[0];
    //按顺序间隔进行拼接
    for(let i=1; i<strs.length; i++){
        //将对象转化为json
        try {
            if("object" == typeof values[i-1]) {
                values[i - 1] = JSON.stringify(values[i - 1]);
            }
        }catch(ex){
            console.error("string",`第${i}个参数转换json失败：${ex.stack?ex.stack:ex}`);
        }
        str += values[i-1] + strs[i];
    }
    return str;
}

/**
 * 解析模板字符串生成器,不会立即拼接字符串，第一次调用生成器的toString或valueOf方法才会生成字符串
 * 对于参数较多或包含object的情况，使用本方法能减少不必要的拼接开销
 * returns {StringGenerator}
 */
global.genString = function():StringGenerator{
    return new StringGenerator(arguments);
};
/**
 * 字符串生成器类
 * @constructor
 **/
export class StringGenerator{
    //生成的字符串
    private args:any[];
    private str:string;
    constructor(args){
        this.args = args;
    }
    //只会生成一次
    toString() {
        if (!this.str) {
            //进行拼接处理
            this.str = tagString(...this.args);
        }
        //返回拼接后的字符串
        return this.str;
    };
    //取值也调用toString
    valueOf() {
        if (!this.str) {
            //进行拼接处理
            this.str = tagString(...this.args);
        }
        //返回拼接后的字符串
        return this.str;
    };
}

//替换匹配到的第一个字符串，示例："abcabc".replaceOne("a","x")， 结果：xbcabc
String.prototype.replaceOne = function(originStr:string,DestStr:string):string{
    return this.replace(originStr, DestStr);
};

//替换匹配到的所有字符串，示例："abcabc".replaceOne("a","x")， 结果：xbcxbc
String.prototype.replaceAll = function(originStr:string,DestStr:string):string{
    return this.replace(new RegExp(originStr, "gm"), DestStr);
};

String.prototype.toBool = function():boolean{
    var str = this.trim();
    return str=="1" || str=="true";
};

//ES6已经实现了以下方法
//String.prototype.startsWith = function (prefix){
//    return this.slice(0, prefix.length) === prefix;
//};
//
//String.prototype.endsWith = function(suffix) {
//    return this.indexOf(suffix, this.length - suffix.length) !== -1;
//};
//
String.prototype.contains = function(substr:string):boolean{
    return this.indexOf(substr) > -1;
};


/**
 * 字符串分隔，空字符串直接返回[]
 * @param sep {string} 分隔符
 * @returns {Array}
 */
String.prototype.splitNoReturnEmpty = function(sep:string):string[]{
    if('' == this){
        return [];
    }
    return this.split(sep);
}