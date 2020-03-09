const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;

export default {
	//拨号并录音
	callPhone:function(phone) {
		// 获取主Activity对象的实例  
		const main = plus.android.runtimeMainActivity();  
		// 导入Activity、Intent类
	    var Intent = plus.android.importClass("android.content.Intent");  
	    var Uri = plus.android.importClass("android.net.Uri");  
	    // 创建Intent  
	    var uri = Uri.parse("tel:"+phone); // 这里可修改电话号码  
	    var call = new Intent("android.intent.action.CALL",uri);  
	    // 调用startActivity方法拨打电话  
	    main.startActivity( call );
		this.startRecord();
	},
	//获取通话记录
	callLog:function(){
		// plus.android.requestPermissions(['android.permission.READ_CALL_LOG', 'android.permission.WRITE_CALL_LOG', 'android.permission.CALL_PHONE']
		// 获取主Activity对象的实例 
		const main = plus.android.runtimeMainActivity();  
		var CallLog = plus.android.importClass("android.provider.CallLog");
        var ContentResolver = plus.android.importClass("android.content.ContentResolver");  
        var resolver = main.getContentResolver();  
        plus.android.importClass(resolver);  
        var String = plus.android.importClass("java.lang.String");
		var cursor = resolver.query(CallLog.Calls.CONTENT_URI, null, null, null, CallLog.Calls.DEFAULT_SORT_ORDER);  
		var talist = [];
		console.log(plus.android.invoke(cursor,"getColumnCount"))
		var client = talist[0]
		// return client;
		// while(plus.android.invoke(cursor,"moveToNext")){
		// 	let name = plus.android.invoke(cursor, "getString", plus.android.invoke(cursor, "getColumnIndex", CallLog.Calls.CACHED_NAME));
		// 	let phone = plus.android.invoke(cursor, "getString", plus.android.invoke(cursor, "getColumnIndex", CallLog.Calls.NUMBER));
		// 	let duration = plus.android.invoke(cursor, "getString", plus.android.invoke(cursor, "getColumnIndex", CallLog.Calls.DURATION));
		// 	let date = plus.android.invoke(cursor, "getString", plus.android.invoke(cursor, "getColumnIndex", CallLog.Calls.DATE));
		// 	let type = plus.android.invoke(cursor, "getString", plus.android.invoke(cursor, "getColumnIndex", CallLog.Calls.TYPE));
		// 	talist.push({
		// 		name:name,
		// 		phone:phone,
		// 		duration:duration,
		// 		date:date,
		// 		type:tpye
		// 	})
		// 	console.log("111")
		// 	console.log("Call Log:" + name + ",phone:" + phone + "时长:" + duration + "时间:" + date + ",类型:" + type);
		// }
		return plus.android.invoke(cursor,"getColumnCount")
	},
	// 获取通讯录
	getContacts:function(){
		return new Promise(function(resolve, reject){
			plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function (addressbook) {
				addressbook.find(["displayName","phoneNumbers"],function(contacts){
					resolve(contacts)
				}, function (err) {
					reject(err)
				},{multiple:true});
			},function(e){
				reject(e)
				console.log("Get address book failed: " + e.message);
			});
		})
	},
	startRecord:function() {
	    console.log('开始录音');
	    recorderManager.start();
	},
	pauseRecord:function() {
	    console.log('暂停录音');
	    recorderManager.pause();
	},
	resumeRecord:function() {
	    console.log('继续录音');
	    recorderManager.resume();
	},
	endRecord:function() {
	    console.log('录音结束');
	    recorderManager.stop();
	},
}