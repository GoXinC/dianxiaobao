
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/address/index","pages/statistics/index","pages/my/index","pages/login/login"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#00d5c9","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#2c2c2c","selectedColor":"#00dab7","borderStyle":"black","backgroundColor":"#ffffff","height":"50px","fontSize":"10px","iconWidth":"24px","spacing":"3px","list":[{"pagePath":"pages/index/index","iconPath":"static/index.png","selectedIconPath":"static/index0.png","text":"首页"},{"pagePath":"pages/address/index","iconPath":"static/search.png","selectedIconPath":"static/search0.png","text":"通讯录"},{"pagePath":"pages/statistics/index","iconPath":"static/statistics.png","selectedIconPath":"static/statistics0.png","text":"统计"},{"pagePath":"pages/my/index","iconPath":"static/my.png","selectedIconPath":"static/my0.png","text":"我的"}]},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"dianxiaobao","compilerVersion":"2.6.1","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"电销助手"}},{"path":"/pages/address/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"通讯录"}},{"path":"/pages/statistics/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"统计"}},{"path":"/pages/my/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/login/login","meta":{},"window":{"titleNView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes}}}});
