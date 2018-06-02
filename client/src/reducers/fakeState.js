export const fakeState = {
    articles: [
        {
            "id": 1,
            "title": "vue项目如何刷新当前页面",
            "content": `<p><strong>1.场景</strong></p>
            <p>在处理列表时，常常有删除一条数据或者新增数据之后需要重新刷新当前页面的需求。</p>
            <p><strong>2.遇到的问题</strong></p>
            <p>1. 用vue-router重新路由到当前页面，页面是不进行刷新的</p>
            <p>2.采用window.reload()，或者router.go(0)刷新时，整个浏览器进行了重新加载，闪烁，体验不好</p>
            <p><strong>3.解决方法</strong></p>
            <p>provide / inject&nbsp;组合</p>
            <p>作用：允许一个祖先组件向其所有子孙后代注入一个依赖，<strong>不论组件层次有多深</strong>，并在起上下游关系成立的时间里始终生效。</p>
            `,
            "selected": false
        },
        {
            "id": 2,
            "title": "cooke, session, token",
            "content": `<p><strong><span>发展史</span></strong></p>
            <p>1、很久很久以前，Web 基本上就是文档的浏览而已， 既然是浏览，作为服务器， 不需要记录谁在某一段时间里都浏览了什么文档，每次请求都是一个新的HTTP协议， 就是请求加响应， &nbsp;尤其是我不用记住是谁刚刚发了HTTP请求， &nbsp; 每个请求对我来说都是全新的。这段时间很嗨皮</p>
            <p>2、但是随着交互式Web应用的兴起，像在线购物网站，需要登录的网站等等，马上就面临一个问题，那就是要管理会话，必须记住哪些人登录系统， &nbsp;哪些人往自己的购物车中放商品， &nbsp;也就是说我必须把每个人区分开，这就是一个不小的挑战，因为HTTP请求是无状态的，所以想出的办法就是给大家发一个会话标识(session id), 说白了就是一个随机的字串，每个人收到的都不一样， &nbsp;每次大家向我发起HTTP请求的时候，把这个字符串给一并捎过来， 这样我就能区分开谁是谁了</p>
            <p>3、这样大家很嗨皮了，可是服务器就不嗨皮了，每个人只需要保存自己的session id，而服务器要保存所有人的session id ！ &nbsp;如果访问服务器多了， 就得由成千上万，甚至几十万个。</p>
            `,
            "selected": false
        },
        {
            "id": 3,
            "title": "纯前端实现图片背景透明化",
            "content": `<h4 id="前言">前言</h4>
            <p>不论是做一些2d的小游戏，或者制作小图标，或者抠图都需要用到这个功能，对图片的背景进行透明化，是我们经常需要用到的一个功能。</p>
            <p>通常情况下我们都会去下载PS或者美图秀秀这样的软件去制作。</p>
            <p>但是我真的不想仅仅为了做个透明图像就去下载这些软件，这些软件不仅体积大，要下载个半天，放在电脑上也占空间。</p>
            <p>最重要的是每次我做这个事情，都需要去临时百度一下制作透明图片的方法。</p>
            <p>这些软件固然强大，但是功能的众多或者需要一些基础知识，往往造成了一些门槛。</p>
            `,
            "selected": false
        },
        {
            "id": 4,
            "title": "HTML5基础知识总结(一)",
            "content": `<p>新增的标签和属性</p>
            <p>1、结构标签</p>
            <p>article section aside nav header footer hgroup figure address</p>
            <p>2、媒体标签</p>
            <p>video audio embed</p>
            <p>3、表单属性</p>
            <p>email url number range</p>`,
            "selected": false
        },
        {
            "id": 5,
            "title": "HTML5移动开发即学即用(双色)",
            "content": `<p>《HTML5移动Web开发实战》提供了应对这一挑战的解决方案。通过阅读本书，你将了解如何有效地利用最新的HTML5的那些针对移动网站的功能，横跨多个移动平台。全书共分10章，从移动Web、设备端配置和优化，变互、响应式设计、设备访问，调试、性能测试、富媒体等角度出发，包含了60多个实用的示倒，详细阐释如何构建快速、响应式的HTML5移动网站，适用于iOS、Android、WindowsPhone和BlackBerry等众多主流移动应用平台。&nbsp;</p>
            <p></p>
            <p>HTML5移动Web开发实战》作者是HTML5&nbsp;Boilerplate项目的成员，MobileBoilerplate(//h5bp.com/mobile)的主要开发人员。《HTML5移动Web开发实战》为那些致力于实现高性能、响应式、跨平台的HTML5移动网站的程序员量身打造，也适合对移动Web开发感兴趣的读者学习参考。</p>`,
            "selected": false
        }
    ]
}