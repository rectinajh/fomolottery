
$(function () {
    // jQuery('#loading').modal({ backdrop: 'static', keyboard: false }) // 显示 Please check you Metamask...

    setTimeout(function () { $('.tutorialArrow').fadeOut(); }, 5000); // 问号前，小箭头消失


    var nowDate = new Date();
    //18年8月2号10点
    var gameStartTime = 1533175200;
    var startgametimetype = nowDate.getTime() - gameStartTime*1000;

    if (startgametimetype < 0) {
        localStorage.setItem("seenWarning", true);
    }
    if (!localStorage.getItem("seenWarning")){
        jQuery("#phishingWarning").modal({
            backdrop: false,
            keyboard: false
        });
        localStorage.setItem("seenWarning", false);
    } else{
        var seenWarning = localStorage.getItem("seenWarning");
        if (seenWarning === true || seenWarning === 'true'){
            jQuery("#phishingWarning").modal({
                backdrop: false,
                keyboard: false
            });
            localStorage.setItem("seenWarning", false);
        } else {
            localStorage.setItem("seenWarning", false);
        }
    }
    

   




    // Vanity modal
    jQuery(".vanity").click(function () {
        jQuery('#vanity').modal()
    })
    jQuery(".closemodal").click(function () {
        jQuery('#vanity').modal('hide')
    })

    /*popover*/
    $(".qbtn").on("click", function () {
        $(this).popover("show");
    })
    // 头部消息跑马灯
    var buyButtonMessageAnon = [
        `We're not sure who's in the lead, but it's not you. Buy a key and fix that.`,
        `It's bad business if that timer hits 0, buy a key already!`,
        `you dropped your last key, time to buy a new one!`,
        `If you buy another key you'll have a bigger number of keys to look at`,
        `If you buy another key you'll have an even number of keys`,
        `If you buy another key you'll have an odd number of keys`,
        `You're not going to let someone without a name win, are you?`,
        `You're really going to let a no-name take this from you?`,
        `Look at them, thinking they can win this anonymously, stop them`,
        `Buy 1 key to make everyone stare at the screen for 30 more seconds in anticipation`,
        `Look at how many people are playing, multiply that by 30 seconds and waste that much time by buying another key`,
        `Buy 1 key to waste an amount of electricity that could power a home for a week`,
        `Buy 1 key to help global warming get us a bit faster`,
        `Buy the key to her heart right here, right now`,
        `Every time you buy a key you make someone else REALLY frustrated, good job, keep it up!`,
        `Do your part, DDOS ethereum with this one simple purchase of a key`,
        `Are you really gonna stop now? Buy a key.`,
        `You're committed, you might as well buy another one`,
        `you know what would be nice right about now? You winning.`,
        `Force your way to the top once again`,
        `Fight them for your rightful throne of ethereum, take the lead with a single key`,
        `Getting out of wage slavery is within your grasp, just beat them, you can do it`,
        `we're all gonna make it, just keep them from winning and buy another key!`,
        `You're going to share when you win right? Put yourself in the lead and find out`,
        `Your seconds of fame is just the cherry on top`,
        `Make everyone angry at you, buy a key`,
        `Make everyone hate your name, buy a key`,
        `Insider info says this is probably the last key anyone will buy`,
        `TA Analysis says your key amount is looking bullish`,
        `This is your key, there are many like it, but this one is yours`,
        `This round has already taken too long, if you buy a key you'll just make everyone angier. Do it.`,
        `Buy a key and show off your funny name to everyone else, what could you lose?`,
        `If you buy one you could be independently, financially independently soon!`,
        `Grow your eth stack with this one simple click`,
        `Buy the key to her heart already`,
        `Might be the keys to your lambo, find out?`,
        `We promise if you buy this key you'll get one key`,
        `Damn that "someone" guy keeps buying keys all the time can we just stop them already?`,
        `Are we sure this is going to end? Buy a key and encourage the madness`,
        `One small click for you, one giant leap for your wallet balance`,
        `A new life is just one key away`,
        `If you win you'll get loads o e-moni`,
        `what if parrallel universe you clicked this button and won?`,
        `They can't even afford a vanity name and you're going to let them win?`,
        `She's waiting, buy her`,
        `She's right there, just a key away`,
        `Got keys?`,
        `This is the second to last key, click twice to be sure`,
        `"Hey kid, buy a key win me and we can have fun together" -the eth pot`,
        `FLASH SALE, NEXT KEY ISN'T NOT CAN'T BE 99% OFF`,
        `A key a day lets you afford to see the doctor when apples don't work`,
        `1 key = 1 prayer`,
        `1 key = 1 like`,
        `You have an incoming call, you can only accept. Do you?`,
        `You can only know the way, if you have keybola`,
        `Proceeds from every key go towards feeding whoever else bought a key`,
        `This key opens a lambo`,
        `This is the key to winning, literally`,
        `This is the major key to success`,
        `This key might even open the door... to your mansion`,
        `This key might B Major`,
        `This key says "DO NOT COPY" on it, break the rules`,
        `This key opens things you shouldn't be allowed to open, take it`,
        `This key is a key, you know you want it`,
        `If you can't resist, they can't resist`,
        `If they can't resist, you can't resist buying another`,
        `Betcha can't just buy one`,
        `Some will be spent on entertainment, some on cheap wine, and the rest foolishly wasted`,
        `Be a thorn in everybody's side`,
        `There are no secrets (except the button)`,
        `Don't press this, let it end already!`,
        `Keep clicking, and we'll keep pissing everybody off for you`,
        `This round is slowwww, might as well buy another key`,
        `You know you want it`,
        `You know you don't want to buy another, you can stop`,
        `You can stop now, just let them take it`,
        `You should just let them keep it`,
        `They aren't very nice are they, not letting you win`,
        `Are you winning yet?`,
        `Are we there yet? No? Make the trip longer`,
        `Follow the eth they're spending, track down how big a wallet they have, wait.`,
        `Press the button`,
        `You should click this, it glows, it buys you keys, it makes you exit scam everyone you know and love`,
        `Exit scam your friends, take a key, take the lead`,
        `Take it`,
        `Its yours, one click, do it`,
        `It's yours isn't it? Take it`,
        `You should probably buy P3D too`,
        `This is technically just an ethereum faucet at this point`,
        `Press this button to recieve ethereum later`,
        `Authorized use only, (do not press)`,
        `Don't press me, Dave...`,
        `Come on do it. Do you want to live forever?`,
        `Man someone's gonna be really rich at the end of this`,
        `Faster than sound = Sonic Boom, Faster than Light = Light boom. Cherenkov radiation, look it up.`,
        `This could be a way out`,
        `The time has come for you to face destiny`,
        `The time has come and so will you`,
        `The time has come.`,
        `Press me to chase your dreams`,
        `Follow your dreams`,
        `I had dreams once, now you could too`,
        `If you break it you buy it`,
        `Like a pinata full of ether`,
        `If you think this is great, you should check out P3D`,
        `P3D can earn you permanent dividends off a bit of Fomo3D's volume, check it out!`,
        `Press on, you never know unless you've tried`,
        `Don't give up, it's yours if you take it`,
        `The real winners here are probably the ethereum miners`,
        `You better be playing nice with the nice people in the discord`,
        `The real lesson here is greed > friendship`,
        `PUT CLICKER HERE, PRESS BUTTON`,
        `Buying this one key raises the sea level by approximately 2-5 picometres, depending on if china mines it or not`,
        `Buying this key is a gross misuse of how awesome the ETH EVM is`,
        `Vitalik probably hates this game, it's okay he's adorable`,
        `Buy this key to give Team JUST enough funds to send mister skeleton(vitalik) a sweater`,
        `If they fork ETH to stop this game you're gonna be so mad`,
        `This button brings all the ETH to the yard.`,
        `We made the buttons on the screen look so good you'll want to lick them`,
        `click it or miss it`,
        `someone's getting rich, might as well be you`,
        `Come on buy a key, all the cool kids are doing it`,
        `You might as well hold one, just to say you were here`,
        `The longer this goes on, the higher the pot gets, and the longer it goes on, neat`,
        `The higher this pot goes, the higher it goes`,
        `You again?`,
        `Key this guy's Lambo`,
        `People are logical, reasonable and altruistic. Scam them anyway.`,
        `Keys are Safu`,
        `He bought, call the locksmith`,
        `Buy a key, be the korea fud`,
        `Buy a part of these million dollar memes`,
        `What could possibly go wrong?`,
        `What's the worst that could happen?`,
        `*Record Scratch*, Freeze Frame. You may be wondering how you got into this situation`,
        `Turn it up to 11`,
        `Tell them to get off your lawn`,
        `Get Jiggy wit it`,
        `Press this to delay victory for everyone`,
        `Each key is 30 seconds of fear and fud`,
        `It's not like you have anything better to torment them with`,
        `One key to rule them all`,
        `Press this for a quick levelup`,
        `Press this for the new patch notes: Hint you're at the top.`,
        `If you press this you're here forever`,
        `Don't forget, you're here forever`,
        `Like bitconnect, but honest`,
        `Make purple your favorite color`,
        `By not buying a key, you are chosing not to win`,
        `Money don't grow on trees, good thing this isn't a tree`,
        `15 minutes could lose you 15% in dividends`,
        `Unlike the lottery, you actually have a chance to win this`,
        `What will your family think if you don't win this?`,
        `Go ahead, don't press it`,
        `Go ahead, press it`,
        `Go ahead, wait for the timer to get lower`,
        `ahhhhhhhhhhh you're not in the lead!!!!!`,
        `AHHH THATS NOT YOUR NAME AT THE TOP, FIX IT FIX IT FIX IT!!`,
        `They probably have a different political opinion than you, stop them`,
        `Hey, you gotta spend money to make money, right?`,
        `Like an arcade game, that won't stop eating your quarters`,
        `Pressing this button is punishable in Ethereum Court`,
        `Why isnt that your name up there?`,
        `Why aren't you in the lead?`,
        `Why aren't you at the top?`,
        `Should you be worried that's not your name?`,
        `Press me please`,
        `Don't press me please`,
        `Don't not press me please`,
        `Think of the children!`,
        `<Insert Quarter to Obtain High Score>`,
        `<Insert Quarter to buy more lives>`,
        `You have fallen in combat, buy a key, try again`,
        `Implying you won't fomo in later`,
        `Time is money, literally`,
        `Money = Eth, Eth = Keys, Keys = Time, Time = Money`,
        `To push, or not to push. That is the question`,
        `Start your new addition today`,
        `Fud the pot for 30 seconds`,
        `Quick before china gets in`,
        `只要A过去就可以了!`,
        `神圣的F2链接着我们`,
        `梭哈，了解一下？`,
        `Pots not hot - Big Shaq`,
        `Wake up, Neo...`,
        `Still cheaper than the actual lottery`,
        `Push me And then just touch me Till I can get my Satisfaction`,
        `Hit it or quit it`,
        `Hit it and quit it`,
    ]

    var therandoeNum = parseInt((Math.random() * 30000 + 20000).toString());
    var theheader = buyButtonMessageAnon[Math.floor(buyButtonMessageAnon.length * Math.random()) - 1];
    setInterval(function () {
        theheader = buyButtonMessageAnon[Math.floor(buyButtonMessageAnon.length * Math.random()) - 1];
        jQuery("#showHeaderText").html(theheader);
        therandoeNum = parseInt((Math.random() * 30000 + 20000).toString());
    }, therandoeNum);

    // 头部显示的总额 titleglowVal
    // jQuery("#titleglowVal").html('2313113');
    // button的class的值
    var clipboard = new ClipboardJS('.btn');
    clipboard.on('success', function (e) {
        console.log(e);
        alertify.alert('success Copy')
        // alert(e)
    });

    clipboard.on('error', function (e) {
        console.log(e);
        // alert(e)
    });
    var clipboard2 = new ClipboardJS('.urlplayername');
    clipboard2.on('success', function (e) {
        console.log(e);
        alertify.alert('success Copy')
        // alert(e)
    });

    // 语言转换


    // 点击切换中英文

    let language_mode = 'en';
    if (window.localStorage.getItem('language') == null) {

        var languageSelect = (navigator.language || navigator.browserLanguage).toLowerCase();
        if (languageSelect.indexOf('en') > -1) {
            language_mode = 'en';
            localStorage.setItem('language', language_mode);
            jQuery(".tutorialswitch").prop("checked", true);
            loadProperties('en');
            $("#nameInput").attr('placeholder', 'type here');
            $('.chineseShow').hide();
            $('.englishShow').show();
        } else {
            language_mode = 'zh';
            localStorage.setItem('language', language_mode);
            jQuery(".tutorialswitch").prop("checked", false);
            loadProperties('zh');
            $("#nameInput").attr('placeholder', '请输入');
            $('.chineseShow').show();
            $('.englishShow').hide();
        }


    } else {
        language_mode = localStorage.getItem('language');
        if (language_mode === 'en') {
            loadProperties('en');
            $('.chineseShow').hide();
            $('.englishShow').show();
            $("#nameInput").attr('placeholder', 'type here');
            jQuery(".tutorialswitch").prop("checked", true);

        } else {
            loadProperties('zh');
            $('.chineseShow').show();
            $('.englishShow').hide();
            $("#nameInput").attr('placeholder', '请输入');
            jQuery(".tutorialswitch").prop("checked", false);
        }
    }

    $('.tutorialswitch').click(function () {
        changeLanguage();
    })
    function changeLanguage() {
        language_mode = localStorage.getItem('language');
        if (language_mode === 'en') {
            language_mode = 'zh';
            loadProperties('zh');
            $('.chineseShow').show();
            $('.englishShow').hide();
            $("#nameInput").attr('placeholder', '请输入');
            jQuery(".tutorialswitch").prop("checked", false);

        } else {
            language_mode = 'en';
            loadProperties('en');
            $('.chineseShow').hide();
            $('.englishShow').show();
            $("#nameInput").attr('placeholder', 'type here');
            jQuery(".tutorialswitch").prop("checked", true);

        }
        localStorage.setItem('language', language_mode);

    }
    // 中文提示的问号标题内容
    qbtnMainDatas = {
        Purchase: {
            title: '购买钥匙(key)',
            content: `key是一种分红权益, 当您购买了key, 您将和其他持有者共同分享后来者产生的红利. 
每当您购买一个key, 将会有40%的金额为持有者进行分红, 35%奖励给邀请您的朋友, 以及朋友的朋友, 20%流入奖池, 剩下5%为社区支持提供帮助. 
最大倒计时每天减半, 如果游戏回合结束, 您是最后三位购入key的玩家(订单金额需大于0.01eth), 那么您将共同分得奖池中55%的金额! 另外40%将由在当前回合中投入最多eth和邀请玩家最多的账号共同分享! 剩下5%将流入下一回合的奖池中~.
是不是比官方版本良心? 而且合约完全去中心化, 没有任何漏洞, 也没有留任何后门, 欢迎随时查看合约.`
        },
        Vault: {
            title: '收益信息',
            content: '这里显示您通过游戏获取的收益, 并可以在这里将收益体现到eth钱包. 已提现的收益将不再展示.'
        },
        Vanity: {
            title: '邀请好友',
            content: `以下三种邀请链接任选一种即可,您的好友通过链接下单将会和您绑定,您能收取好友总投入额度的20%, 好友邀请的好友10%, 已经更多的关系中获利, 实时返现到您的余额(邀请自己无效). 
一定叮嘱好友第一次必须通过您的邀请链接付款, 付款成功后立即和您绑定关系, 好友以后的付款也会分红到您额钱包. 
如果好友通和您是邀请关系, 您的好友购买了100eth, 您将赚取35eth的返利~`
        },
        Round: {
            title: '回合',
            content: `每一回合都有一个倒计时, 倒计时结束, 回合即结束. 每当有一个key卖出, 那么回合倒计时加30秒, 上限24小时. 上限每日减半.`
        },
        Recent: {
            title: '当前的实时数据',
            content: `本回合的实时排行榜, 本回合投入最多eth的玩家, 本回合邀请好友最多的玩家, 已经本回合最后购买的3名玩家, 都能在游戏结束时获取丰厚的奖励. 
注:回合开始前, 邀请的好友数量会算在第一回合.`
        },
        Stats: {
            title: '当前回合状态',
            content: '这个面板显示当前回合的一些统计数据, 时间那里有些夸张, 是把所有key的售卖延长的时间加起来'
        },
    }
    languageText(qbtnMainDatas)
    function languageText() {
        $('.qbtnPurchase').attr('data-content', qbtnMainDatas.Purchase.content);
        $(".qbtnPurchase").attr("data-original-title", qbtnMainDatas.Purchase.title);

        $('.qbtnVault').attr('data-content', qbtnMainDatas.Vault.content);
        $(".qbtnVault").attr("data-original-title", qbtnMainDatas.Vault.title);

        $('.qbtnVanity').attr('data-content', qbtnMainDatas.Vanity.content);
        $(".qbtnVanity").attr("data-original-title", qbtnMainDatas.Vanity.title);

        $('.qbtnRound').attr('data-content', qbtnMainDatas.Round.content);
        $(".qbtnRound").attr("data-original-title", qbtnMainDatas.Round.title);

        $('.qbtnRecent').attr('data-content', qbtnMainDatas.Recent.content);
        $(".qbtnRecent").attr("data-original-title", qbtnMainDatas.Recent.title);

        $('.qbtnStats').attr('data-content', qbtnMainDatas.Stats.content);
        $(".qbtnStats").attr("data-original-title", qbtnMainDatas.Stats.title);
    }



    function loadProperties(languageType) {
        jQuery.i18n.properties({
            name: 'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
            path: '../static/js/i18n/',   //注意这里路径是你属性文件的所在文件夹
            mode: 'map',
            language: languageType,     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
            callback: function () {
                $("[data-locale]").each(function () {
                    $(this).html($.i18n.prop($(this).data("locale")));

                });
            }
        });
    }



});

