

import { Fomo3d } from "./common/custom/Fomo3d";
import * as Web3 from "web3";
import { help } from "./common/help/help";
import { BigNumber } from 'bignumber.js';
import * as $ from 'jquery';
import { test, message } from "./common/custom/rpcApi";
import * as alertify from 'alertify.js';
import { WalletAddress } from "./common/help/ethHelp";


// 初始化eth

(async function initEth() {
    //显示加载框
    jQuery('#loadingAll').modal({ backdrop: 'static', keyboard: false })

    console.log("正在初始化eth接口!!!");

    // const xxx = await test.testFunction({a:213});
    // console.log(xxx);
    // return;

    //TODO: 加入到后台或配置中
    // const constractAddress = '0x7cb949a14ea25000535437b6860ef7f4336564cb';
    // const web3RpcUrl = "http://218.89.234.46:9999";

    //线上版本
    const constractAddress = '0xddc49dfefc8db2805aa792d04a97e4eb601ffcaa';
    const web3RpcUrl = "https://mainnet.infura.io/v3/6cf7fcc4c68f401b992c73f61c81ce0a";

    // //菜鸡测试版本
    // const constractAddress = '0x089b779f92b578f7060a65c49dac1e354c12acbe';
    // const web3RpcUrl = "https://rinkeby.infura.io";

    if (null == help.getInjectedWeb3()) {
        console.log("没有检测到web3，通过rpcUrl方式创建!!!");
        //初始化接口
        await Fomo3d.init(null, web3RpcUrl, constractAddress, null);
    } else {
        console.log("检查到InjectedWeb3, 直接使用");
        //初始化接口
        // const ethHelpInstance = new EthHelp(injectedWeb3, rpcUrl);
        // console.log(ethHelpInstance.web3); // 访问 web3 属性

        await Fomo3d.init(help.getInjectedWeb3(), null, constractAddress, null);
    }




    //test
    // const testRst = await Fomo3d.inst.pIDxAddr_('0xCfca907B901b322Ff3073732f5F69f1daEcB5DC0');
    // console.log('测试pIDxAddr_:',testRst.toString());

    // const testRst2 = await Fomo3d.inst.getCurrentRoundInfo();
    // console.log('测试pIDxAddr_:',JSON.stringify(testRst2));
    // console.log(typeof testRst2.leadPlayerName);

    // ==========================================================================

    const web3Set = help.getInjectedWeb3(); //是否安装插件
    let ethVal: any;
    try {
        ethVal = await message.getEthPrice({ num: 1 });  // 获取后台数据

    } catch (err) {
        ethVal = { result: await getEthPriceByFront(1) };  // 获取后台数据
    }

    $('.tixQuotationVal').data('realPrice', new BigNumber(ethVal.result.onePrice));
    $('.tixQuotationVal').data('onerealPrice', new BigNumber(ethVal.result.onePrice)); // 单价
    $('.tixQuotationVal').html(new BigNumber(ethVal.result.onePrice).div(new BigNumber('1' + '0'.repeat(18))).toFixed(8).toString());

    // 放到后面统一请求
    // let getmessageData:any;
    // try {
    //      getmessageData = await message.getCurrentRoundInfo(null);
    // } catch (error) {
    //     console.info("请求客户端","测试");
    //     getmessageData ={result:{info:await getCurrentRoundInfoByFront()}};
    // }

    let dayTime = new Date();
    //18年8月2号10点
    const gameStartTime = 1533175200;
    let startTime = gameStartTime - Math.floor(dayTime.getTime()/1000); // 距游戏开始剩余时间
    //let masterstrTime = parseInt(getmessageData.result.info.end) - parseInt((dayTime.getTime() / 1000).toString()); // 总的剩余时间
    let masterstrTime = 0;

    if (startTime > 0) {
        $('.headtimer').hide();
        $('.startgametimeleafttitle').show();
        $('#leaveStartGameTimeBox').show();
    } else {
        $('.headtimer').show();
        $('.startgametimeleafttitle').hide();
        $('#leaveStartGameTimeBox').hide();
    }



    const hashrul = window.location.hash;
    const hashVal = decodeURI(hashrul.replace("#", "").replace(/(^\s*)|(\s*$)/g, ""));

    const badAdivce = hashVal;
    var badAdivceType = 'none';
    if (hashrul) {
        $('.inviteCode').html(badAdivce);
        const hashType = await Fomo3d.inst.web3.isAddress(hashVal);
        if (hashType === false) {
            var reg = /^[0-9]+.?[0-9]*$/;
            if (!reg.test(hashVal)) {
                badAdivceType = 'name';
            } else {
                badAdivceType = 'id';
            }

        } else {
            badAdivceType = 'address';
        }

        // window.localStorage.setItem('badAdivce', hashVal);
        // const hashType = await Fomo3d.inst.web3.isAddress(hashVal);
        // if (hashType === false) {
        //     var reg = /^[0-9]+.?[0-9]*$/;
        //     if (!reg.test(hashVal)) {
        //         window.localStorage.setItem('badAdivceType', 'name');
        //     } else {
        //         window.localStorage.setItem('badAdivceType', 'id');
        //     }

        // } else {
        //     window.localStorage.setItem('badAdivceType', 'address');
        // }
        //history.replaceState(null, null, ' ');
    } else {
        //history.replaceState(null, null, ' ');
        // window.localStorage.setItem('badAdivceType', 'none');
        // window.localStorage.setItem('badAdivce', '');
        badAdivceType = 'none';
        var languageType = localStorage.getItem('language');
        if (languageType === 'zh') {
            $('.inviteCode').html('--');
        } else {
            $('.inviteCode').html('--');
        }

    }

    // ==========================================================================

    // 初始化数据
    if (typeof (Storage) !== "undefined") {
        console.log('支持 localStorage/sessionStorage 的代码');
        // const hashrul = window.location.hash;
        // const hashVal = hashrul.replace("#", "").replace(/(^\s*)|(\s*$)/g, "");
        // if (hashrul) {
        //     window.localStorage.setItem('badAdivce', hashVal);
        //     const hashType = await Fomo3d.inst.web3.isAddress(hashVal);
        //     if (hashType === false) {
        //         var reg = /^[0-9]+.?[0-9]*$/;
        //         if (!reg.test(hashVal)) {
        //             window.localStorage.setItem('badAdivceType', 'name');
        //         } else {
        //             window.localStorage.setItem('badAdivceType', 'id');
        //         }

        //     } else {
        //         window.localStorage.setItem('badAdivceType', 'address');
        //     }
        //     //history.replaceState(null, null, ' ');
        // } else {
        //     //history.replaceState(null, null, ' ');
        //     window.localStorage.setItem('badAdivceType', 'none');
        //     window.localStorage.setItem('badAdivce', '');
        // }

    } else {
        console.log('抱歉！不支持 Web Storage ..');
    }
    //每2秒检测一次账号变动
    let curAddress: WalletAddress = null;
    if (web3Set) {
        curAddress = await Fomo3d.inst.getDefauleAccount();
    }
    setInterval(async () => {
        let newAddress = null;
        if (web3Set) {
            newAddress = await Fomo3d.inst.getDefauleAccount();
        }
        if (curAddress != newAddress) {
            //todo:
            window.location.reload(true);
        }
    }, 2000);

    initAll();
    async function initAll() {
        getBackstageData();
        const getBackstageDataInterval = setInterval(async () => {
            getBackstageData(); //后台数据初始化
        }, 20 * 1000);


        // 奖池总的剩余时间流逝
        const mastertimeByGo = setInterval(async () => {
            if (masterstrTime >= 1) {
                masterstrTime = masterstrTime - 1;
                let strTime = help.timeSToHMS(masterstrTime);
                $('.refreshtimer').text(strTime);
            } else {
                console.log(masterstrTime);
                $('.refreshtimer').text('00:00:00');
            }
        }, 1000);

        // 游戏距离开始时间
        const startTimeGo = setInterval(async () => {
            if (startTime >= 1) {
                $('#leaveStartGameTimeBox').show();
                $('.headtimer').hide();
                startTime = startTime - 1;
                let strTimeStart = help.timeSToHMS(startTime);
                $('#leaveStartGameTime').text(strTimeStart);
                $('.startgametimeleafttitle').show();
                $('.startgametimeleaft').html(strTimeStart);
            } else {
                $('#leaveStartGameTime').text('00:00:00');
                $('.startgametimeleaft').html('00:00:00');
                $('#leaveStartGameTimeBox').hide();
                $('.headtimer').show();
                $('.startgametimeleafttitle').hide();
                clearInterval(startTimeGo);
                //刷新数据
                getBackstageData();
            }
        }, 1000);




        if (web3Set) { //  判断是否安装插件
            // const address = '0xCfca907B901b322Ff3073732f5F69f1daEcB5DC0'; //测试数据
            if (curAddress) {   // 判断是不是有address
                InitPlayData(curAddress); // 初始化用户数据 
                const setPlayerData = setInterval(async function () {
                    InitPlayData(curAddress);
                }, 50 * 1000);
            } else {
                console.log('没有获得用户地址');
                $('.hasuseraddress').hide();
                $('.nouseraddress').show();
            }


        } else {
            console.log('没有安装插件');
            $('.hasuseraddress').hide();
            $('.nouseraddress').show();
        }

        // 隐藏页面, 加个延时, 防止关不掉...
        setTimeout(() => {
            jQuery('#loadingAll').modal('hide');
        }, 1000);
    }


    // 后台返回数据
    async function getBackstageData() {
     
            // 获取USDT换算率
            let oneUSDTTransfrom: any;
            try {
                oneUSDTTransfrom = await message.getOneUsdtInfo(null);
            } catch (error) {
                oneUSDTTransfrom = { result: await getOneUsdtInfoByFront(null) };
            }

            // 获取后台值数据
            let roundInfo: CurrentRoundInfoClass = null;
            try {
                const messageData = await message.getCurrentRoundInfo(null);
                if(messageData.error){
                    throw new Error(JSON.stringify(messageData.error.code));
                }
                roundInfo = messageData.result.info;
            } catch (error) {
                roundInfo = await getCurrentRoundInfoByFront();
            }
        console.log(roundInfo);
           


            const pot = new BigNumber(roundInfo.pot);
            const totalInvested = new BigNumber(roundInfo.totalEth);
            const distributed = new BigNumber(roundInfo.distributedEth);
            const round = roundInfo.roundId;

            const potUsdt = parseFloat(pot.mul(oneUSDTTransfrom.result.price).toFixed(5)).toLocaleString();
            const totalInvestedUsdt = parseFloat(totalInvested.mul(oneUSDTTransfrom.result.price).toFixed(2)).toLocaleString();
            const distributedUsdt = parseFloat(distributed.mul(oneUSDTTransfrom.result.price).toFixed(2)).toLocaleString();


            const totalKeysnum = parseFloat(roundInfo.totalKeys).toLocaleString();
            const totalInvestednum = parseFloat(roundInfo.totalEth).toLocaleString();
            const distributednum = parseFloat(roundInfo.distributedEth).toLocaleString();
            const timePurchasednum = parseFloat(roundInfo.timeYear).toLocaleString();
            const timePurchasednumS = parseFloat(roundInfo.timeS).toLocaleString();

            // 存入本地存储
            localStorage.setItem('oneUSDTTransfrom', oneUSDTTransfrom.result.price);
            let ethVal: any;
            try {
                ethVal = await message.getEthPrice({ num: 1 });  // 获取后台数据
            } catch (error) {
                ethVal = { result: await getEthPriceByFront(1) };
            }

            $('.tixQuotationVal').data('onerealPrice', new BigNumber(ethVal.result.onePrice)); // 单价
            if ($('#tixToBuy').val()) {
                var iVal = parseInt(String($("#tixToBuy").val()).replace(" ", "").replace("keys", "").replace("key", "").replace("Keys", "").replace("Key", ""));
            } else {
                var iVal = 1;
            }
            getQuote(iVal);

            //重新计算剩余时间 
            dayTime = new Date();
            masterstrTime = parseInt(roundInfo.end) - parseInt((dayTime.getTime() / 1000).toString()); // 总的剩余时间


            $(".titleglowVal").html(pot.toFixed(2).toString()); // 总彩池奖金
            $('.potUsdtVal').html(potUsdt.toString()); // 总彩池奖金 USDT
            // $(".airdropcounter").html(messageData.result.info.airdropPercent + '(' + messageData.result.info.airdropEth + ')'); // 头部百分占比

            $('.totalKeys').html(totalKeysnum); // 总的key的数量
            $('.totalInvestedVal').html(totalInvestednum);
            $('.totalInvestedUsdtVal').html(totalInvestedUsdt);
            $('.distributedVal').html(distributednum);
            $('.distributedUsdtVal').html(distributedUsdt);

            $('.timePurchasedVal').html(timePurchasednum);
            $('.timePurchasedValS').html(timePurchasednumS);
            $('.roundVal').html(round);

        try {
            const maxEthName = help.ascllTransform(roundInfo.maxEthName);
            const maxAffName = help.ascllTransform(roundInfo.maxAffName);
            const last1BuyerName = help.ascllTransform(roundInfo.last1BuyerName);
            const last2BuyerName = help.ascllTransform(roundInfo.last2BuyerName);
            const last3BuyerName = help.ascllTransform(roundInfo.last3BuyerName);
            const maxEth = Fomo3d.inst.web3.fromWei(new BigNumber(roundInfo.maxEth), 'ether').toString();
            const maxAffNum = roundInfo.maxAffNum;
            $('.maxEthName').html(maxEthName);
            $('.maxAffName').html(maxAffName);
            $('.last1BuyerName').html(last1BuyerName);
            $('.last2BuyerName').html(last2BuyerName);
            $('.last3BuyerName').html(last3BuyerName);
            $('.maxEth').html(maxEth);
            $('.maxAffNum').html(maxAffNum);

        } catch (error) {
            console.log(error);
        }

    }

    // 用户信息数据
    async function InitPlayData(addressVal) {
        try {
            const getPlayInforst = await Fomo3d.inst.getPlayerInfoByAddress(addressVal);
            const userKeys = Fomo3d.inst.web3.fromWei(getPlayInforst.keys, 'ether');
            const userEarings = Fomo3d.inst.web3.fromWei(getPlayInforst.general, 'ether');
            const userBadAdvice = Fomo3d.inst.web3.fromWei(getPlayInforst.affiliate, 'ether');
            const userWings = Fomo3d.inst.web3.fromWei(getPlayInforst.winnings, 'ether'); //中奖获取
            const totalGainsNum = parseFloat(userBadAdvice.toFixed(4)) + parseFloat(userEarings.toFixed(4)) + parseFloat(userWings.toFixed(4)) ;
            const userwindowUrlHost = 'http://' + window.location.host;
            const urlheaderString = userwindowUrlHost + '#';
            const invitationUserName = help.ascllTransform(getPlayInforst.papaName);
            if (invitationUserName) {
                $('.inviteCode').html(invitationUserName);
                history.replaceState(null, null, ' ');
            }



            const urlplayerName = urlheaderString + help.ascllTransform(getPlayInforst.playerName);
            const urlplayerid = urlheaderString + getPlayInforst.pID.toString();
            const urlpalyerlink = urlheaderString + addressVal;


            let oneUSDTTransfromVal = localStorage.getItem('oneUSDTTransfrom');
            if (oneUSDTTransfromVal === null) {
                oneUSDTTransfromVal = '0.0000';
            }

            const userEaringsUsdtVal = parseFloat(userEarings.mul(oneUSDTTransfromVal).toFixed(4)).toLocaleString();
            const totalGainsUsdtNum = parseFloat(userEarings.mul(oneUSDTTransfromVal).toFixed(4)).toLocaleString();


            // 更新用户数据
            $('.userKeysNum').text(userKeys.toFixed(1).toString());
            $('.keycount').text(userKeys.toFixed(4).toString());

            $('.userBadAdvice').text(userBadAdvice.toFixed(4).toString());

            $('.totalGainsVal').text(totalGainsNum.toFixed(4).toString()); // Total Gains的值
            $('.totalGainsUsdtVal').text(totalGainsUsdtNum.toString());

            $('.userEarings').text(userEarings.toFixed(4).toString());
            $('.userEaringsTotal').text(totalGainsNum.toFixed(4).toString());
            $('.userEaringsUsdtVal').text(totalGainsUsdtNum.toString());

            $('#ceolink').text(urlpalyerlink);
            $('#ceolinkid').text(urlplayerid);

            if (help.ascllTransform(getPlayInforst.playerName)) {
                // 设置了名称
                $('#ceolinkvanity').text(urlplayerName);
                $('.urlplayername').text(urlplayerName);
                $('.urlplayernamebuyceo.buyceo').hide();
                $('.urlplayername').show();

                $('.hasuseraddress').show();
                $('.nouseraddress').hide();
            } else {
                // 没设置名称的
                $('.urlplayernamebuyceo.buyceo').show();
                $('.urlplayername').hide();


                $('.hasuseraddress').hide();
                $('.nouseraddress').show();
            }

        } catch (err) {
            console.log(err);

        }

    }

    // key数量输入框输入变化
    $("#tixToBuy").bind('input', function () {
        console.log($('#tixToBuy').val());
        let num = parseFloat($('#tixToBuy').val().toString());
        getQuote(num);


    });
    // 点击加key
    $('.increment').click(function () {
        let id = this.id;
        var increment: number;
        if (id === 'addOne') {
            increment = 1;
        } else if (id === 'addTwo') {
            increment = 2;
        } else if (id === 'addFive') {
            increment = 5;
        } else if (id === 'addTen') {
            increment = 10;
        } else if (id === 'addHundred') {
            increment = 100;
        }
        if ($('#tixToBuy').val()) {
            var iVal = parseInt(String($("#tixToBuy").val()).replace(" ", "").replace("keys", "").replace("key", "").replace("Keys", "").replace("Key", ""));
        } else {
            var iVal = 1;
        }
        let nVal = iVal + increment;
        $("#tixToBuy").val(nVal.toString());
        getQuote(nVal);
    })

    // 获取输入框rth变动

    async function getQuote(num: number) {
        // console.log(num);
        let priceVal = null;
        var realPriceVal: BigNumber;
        if (num) {
            priceVal = (new BigNumber(parseFloat(ethVal.result.onePrice))).mul(num).div(new BigNumber('1' + '0'.repeat(18)));
            realPriceVal = new BigNumber(ethVal.result.realPrice).mul(num);
            $('.tixQuotationVal').data('realPrice', new BigNumber(ethVal.result.realPrice).mul(num).toFixed(8));
        } else {
            priceVal = 0.0000;
            $('.tixQuotationVal').data('realPrice', new BigNumber(ethVal.result.onePrice));
        }
        if (num > 1000) {
            $('.tixQuotationVal').html(priceVal.toFixed(8).toString());
            let ethVal: any;
            try {
                ethVal = await message.getEthPrice({ num: num });
            } catch (error) {
                ethVal = { result: await getEthPriceByFront(num) };
            }

            $('.tixQuotationVal').html(new BigNumber(ethVal.result.price).div(new BigNumber('1' + '0'.repeat(18))).toString());

        } else {
            $('.tixQuotationVal').html(priceVal.toFixed(8).toString());
        }

    }




    //  点击 send ETH

    $("#tixBuy").click(function () {
        const getEth = new BigNumber(String($(".tixQuotationVal").eq(0).data('realPrice')));
        console.log(getEth.toString());
        buyKeys(getEth, 'tixBuy');
    })

    // 点击 Use Vault
    $("#tixReinvest").click(function () {
        const getEth = new BigNumber(String($(".tixQuotationVal").eq(0).data('realPrice')));
        buyKeys(new BigNumber(getEth), 'tixReinvest');
    });
    // 点击消息条
    $(".buyOneTicket").click(function () {
        const onegetEthVal = new BigNumber(String($(".tixQuotationVal").eq(0).data('onerealPrice')));
        buyKeys(new BigNumber(onegetEthVal), 'buyOneTicket');
    });
    // // 点击链接名字
    $('.buyceo').click(function () {
        setbuyceo();
    });

    // 点击退款
    $('#withdrawEarnings').click(function () {
        withdrawEarnings();
    });

    // 点击设置名字
    $('#namePurchase').click(function () {
        setNamePurchase();
    });

    async function setbuyceo() {
        var setbuyceoaddress = await Fomo3d.inst.getDefauleAccount();
        if (web3Set) {
            if (setbuyceoaddress) {
                jQuery('#vanity').modal();
            } else {
                var languageType = localStorage.getItem('language');
                if (languageType === 'zh') {
                    alertify.alert("You are not in the correct network. Please navigate to <a style='color: #1e10f8;text-decoration: underline;' href='https://testnet.teamjust.io'>the testnet portal</a> and follow the instructions.")
                } else {
                    alertify.alert("You are not in the correct network. Please navigate to <a style='color: #1e10f8;text-decoration: underline;' href='https://testnet.teamjust.io'>the testnet portal</a> and follow the instructions.")
                }
            }
        } else {

            var languageType = localStorage.getItem('language');
            if (languageType === 'zh') {
                alertify.alert("没有检查到metamask，请查看教程");
            } else {
                alertify.alert("You are not signed into metamask.");
            }

        }

    }

    async function setNamePurchase() {
        const setnameaddress = await Fomo3d.inst.getDefauleAccount();
        if (setnameaddress) {
            let txHash = null;
            try {
                let name = jQuery("#nameInput").val().toString();
                jQuery('#loading').modal({ backdrop: 'static', keyboard: false });
                const badAdivceTypeValnum = badAdivceType;
                // const badAdivceTypeValnum = window.localStorage.getItem('badAdivceType');
                // const badAdivceValnum = window.localStorage.getItem('badAdivce');

                if (badAdivceTypeValnum === 'none') {
                    txHash = await Fomo3d.inst.registerNameXID(setnameaddress, name);
                } else if (badAdivceTypeValnum === 'id') {
                    txHash = await Fomo3d.inst.registerNameXID(setnameaddress, name, new BigNumber(badAdivce));
                } else if (badAdivceTypeValnum === 'address') {
                    txHash = await Fomo3d.inst.registerNameXaddr(setnameaddress, name, badAdivce);
                } else if (badAdivceTypeValnum === 'name') {
                    txHash = await Fomo3d.inst.registerNameXname(setnameaddress, name, badAdivce);
                }


                jQuery('#loading').modal('hide');
                jQuery('#vanity').modal('hide');

                var languageType = localStorage.getItem('language');
                if (languageType === 'zh') {
                    alertify.log("正在记录你的名字");
                } else {
                    alertify.log(`Our artists are permanently writing your name to the blockchain right now!`);
                }
            }
            catch (e) {
                console.log(e);
                var languageType = localStorage.getItem('language');
                if (languageType === 'zh') {
                    alertify.log("购买失败，交易已取消");
                } else {
                    alertify.log(`Vanity purchase has been cancelled.`);
                }

                jQuery('#loading').modal('hide');
                jQuery('#vanity').modal('hide');
            }

        } else {
            var languageType = localStorage.getItem('language');
            if (languageType === 'zh') {
                alertify.alert("没有检查到metamask，请查看教程");
            } else {
                alertify.alert("You are not signed into metamask.");
            }

            return;
        }
    }


    async function withdrawEarnings() {
        let txHash = null;
        const myAddress = await Fomo3d.inst.getDefauleAccount();
        if (myAddress) {
            jQuery('#loading').modal({ backdrop: 'static', keyboard: false });
            try {
                txHash = await Fomo3d.inst.withdraw(myAddress);
            } catch (ex) {
                console.log('trans error', ex);
                jQuery('#loading').modal('hide');
                jQuery('#vanity').modal('hide');
            }
            jQuery('#loading').modal('hide');
            jQuery('#vanity').modal('hide');
        } else {
            var languageType = localStorage.getItem('language');
            if (languageType === 'zh') {
                alertify.alert("没有检查到metamask，请查看教程");
            } else {
                alertify.alert("You are not signed into metamask.");
            }

        }


    }



    async function buyKeys(etherWei: BigNumber, clickType: string) {

        const myAddress = await Fomo3d.inst.getDefauleAccount();
        let txHash = null;
        if (myAddress) {
            jQuery('#loading').modal({ backdrop: 'static', keyboard: false })
            // const badAdivceTypeVal = window.localStorage.getItem('badAdivceType');
            const badAdivceTypeVal = badAdivceType;

            // const badAdivceVal = window.localStorage.getItem('badAdivce');
            try {
                if (badAdivceTypeVal === 'none') {
                    if (clickType === 'tixBuy') {
                        txHash = await Fomo3d.inst.buyXid(myAddress, etherWei);
                    } else if (clickType === 'tixReinvest') {
                        txHash = await Fomo3d.inst.reLoadXid(myAddress, etherWei);
                    } else if (clickType === 'buyOneTicket') {
                        txHash = await Fomo3d.inst.buyXid(myAddress, etherWei);
                    } else if (clickType === 'buyOneTicket') {
                        txHash = await Fomo3d.inst.buyXid(myAddress, etherWei);
                    }

                } else if (badAdivceTypeVal === 'id') {
                    if (clickType === 'tixBuy') {
                        txHash = await Fomo3d.inst.buyXid(myAddress, etherWei, new BigNumber(badAdivce));
                    } else if (clickType === 'tixReinvest') {
                        txHash = await Fomo3d.inst.reLoadXid(myAddress, etherWei, new BigNumber(badAdivce));
                    } else if (clickType === 'buyOneTicket') {
                        txHash = await Fomo3d.inst.buyXid(myAddress, etherWei, new BigNumber(badAdivce));
                    } else if (clickType === 'buyOneTicket') {
                        txHash = await Fomo3d.inst.buyXid(myAddress, etherWei, new BigNumber(badAdivce));
                    }

                } else if (badAdivceTypeVal === 'address') {
                    if (clickType === 'tixBuy') {
                        txHash = await Fomo3d.inst.buyXaddr(myAddress, etherWei, badAdivce);
                    } else if (clickType === 'tixReinvest') {
                        txHash = await Fomo3d.inst.reLoadXaddr(myAddress, etherWei, new BigNumber(badAdivce));
                    } else if (clickType === 'buyOneTicket') {
                        txHash = await Fomo3d.inst.buyXaddr(myAddress, etherWei, badAdivce);
                    } else if (clickType === 'buyOneTicket') {
                        txHash = await Fomo3d.inst.buyXaddr(myAddress, etherWei, badAdivce);
                    }

                } else if (badAdivceTypeVal === 'name') {
                    if (clickType === 'tixBuy') {
                        txHash = await Fomo3d.inst.buyXname(myAddress, etherWei, badAdivce);
                    } else if (clickType === 'tixReinvest') {
                        txHash = await Fomo3d.inst.reLoadXname(myAddress, etherWei, badAdivce);
                    } else if (clickType === 'buyOneTicket') {
                        txHash = await Fomo3d.inst.buyXname(myAddress, etherWei, badAdivce);
                    } else if (clickType === 'buyOneTicket') {
                        txHash = await Fomo3d.inst.buyXname(myAddress, etherWei, badAdivce);
                    }

                } else {
                    console.log('no badAdivceTypeVal');
                }


            } catch (ex) {
                console.log('trans error', ex);
                jQuery('#loading').modal('hide');
                jQuery('#vanity').modal('hide');
            }
            console.log('txHash', txHash);
            jQuery('#loading').modal('hide');
            jQuery('#vanity').modal('hide');

        } else {
            var languageType = localStorage.getItem('language');
            if (languageType === 'zh') {
                alertify.alert("没有检查到metamask，请查看教程");
            } else {
                alertify.alert("You are not signed into metamask.");
            }

        }



    }

    async function getCurrentRoundInfoByFront() {
        const info: CurrentRoundInfoClass = <any>{};
        try {
            //并发请求
            const task1 = Fomo3d.inst.getCurrentRoundInfo();
            const task2 = Fomo3d.inst.getCurrentRoundInfo2();

            console.log('Task 1:', task1);
        console.log('Task 2:', task2);


            const c = await task1;

            console.log('Task 1 result:', c);
            //bigerNum 转String 存入CurrentRoundInfoClass对象中
            info.ico = c.ico + "";
            info.roundId = c.roundId + "";
            info.keys = (c.keys).toString(10);
            info.end = c.end + "";
            info.start = c.start + "";
            info.leadTeamId = c.leadTeamId + "";
            info.leadPlayerAddress = c.leadPlayerAddress;
            info.leadPlayerName = c.leadPlayerName;
            info.whalesEth = (c.whalesEth).toString(10);
            info.bearsEth = (c.bearsEth).toString(10);
            info.sneksEth = (c.sneksEth).toString(10);
            info.bullsEth = (c.bullsEth).toString(10);
            info.airdrop = (c.airdrop).toString(10);
            //页面上端数据处理
            info.pot = c.pot.div(new BigNumber('1' + '0'.repeat(18))).toFixed(4).toString();
            info.airdropPercent = "0." + (info.airdrop).substring(20) + "%";
            info.airdropEth = c.airdrop.div(new BigNumber('1' + '0'.repeat(21))).toFixed(2).toString() + "ETH";
            info.totalKeys = c.keys.div(new BigNumber('1' + '0'.repeat(18))).toFixed(0).toString();
            //ETH 总共数量计算
            info.totalEth = (c.whalesEth.add(c.bearsEth).add(c.sneksEth).add(c.bullsEth)).div(new BigNumber('1' + '0'.repeat(18))).toFixed(3).toString();
            //Distributed Rewards 计算  
            info.distributedEth = (c.whalesEth.add(c.bearsEth).add(c.sneksEth).add(c.bullsEth).sub(c.pot)).div(new BigNumber('1' + '0'.repeat(18))).toFixed(3).toString();
            //Time Purchased 计算 365*3600*24 =3153600  315600/30=1051200
            info.timeS = c.keys.mul(30).div(new BigNumber('1' + '0'.repeat(19))).toFixed(0).toString();
            info.timeYear = c.keys.div(1051200).div(new BigNumber('1' + '0'.repeat(18))).toFixed(2).toString();

            const roundInfo2 = await task2;
            console.log('Task 2 result:', roundInfo2);
            info.maxEthName = roundInfo2.maxEthName;
            info.maxEth = roundInfo2.maxEth.toString();
            info.maxAffName = roundInfo2.maxAffName;
            info.maxAffNum = roundInfo2.maxAffNum.toString();
            info.last1BuyerName = roundInfo2.last1BuyerName;
            info.last2BuyerName = roundInfo2.last2BuyerName;
            info.last3BuyerName = roundInfo2.last3BuyerName;
        } catch (error) {
            // throw new Error('Could not get any response');
            throw new Error(`Could not get any response: ${error.message}`);
        }
        return info;
    }
    async function getEthPriceByFront(num: number) {

        let priceInfo = new PriceInfo();
        try {
            let pricess = await Fomo3d.inst.getBuyPrice();
            //计算
            priceInfo.onePrice = pricess.toString();
            priceInfo.price = pricess.times(num).toString();
            priceInfo.realPrice = pricess.toString(10);
        } catch (error) {
            // throw new Error('Could not get any response');
            console.error('Error in getEthPriceByFront:', error);
            throw error;
        }
        return priceInfo;

    }
    async function getOneUsdtInfoByFront(num: number) {
        let price;
        try {
            price = "480"
        } catch (error) {
            throw new Error('Could not get any response');
        }
        return {
            price: price
        };
    }


})();

class PriceInfo {
    onePrice: string;
    price: string;
    realPrice: string
}