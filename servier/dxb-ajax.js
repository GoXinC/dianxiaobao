// var API_URL = "http://129.204.228.14:8081";
var API_URL = "http://118.24.237.67:8081";
var userId = "";
var token = "";
var request = function(url,method,data){
	var _url = API_URL + url;
	return new Promise(function(resolve, reject){
		var userInfo = validation();
		var userId = userInfo.userId + '';
		var token = userInfo.token + '';
		uni.request({
			url:_url,
			method:method,
			header: {
			    'Content-Type': 'application/x-www-form-urlencoded',
				'userId': userId,
				'token': token
			},
			data:data,
			success: (res) => {
				resolve(res.data)
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}
var uploadFile = function(url,filePath,fileName,formData){
	var _url = API_URL + url;
	var userInfo = validation();
	var userId = userInfo.userId + '';
	var token = userInfo.token + '';
	uni.uploadFile({
		url:_url,
		method:'post',
		header:{
			'userId': userId,
			'token': token
		},
		dataType:'application/text',
		filePath:filePath,
		name:fileName,
		formData:formData,
		success:function(res){
			console.log(res);
		}
		
	})
}
var downloadFile = function(url){
	var _url = API_URL + url;
	var userInfo = validation();
	var userId = userInfo.userId + '';
	var token = userInfo.token + '';
	uni.downloadFile({
		url:_url,
		header:{
			'userId': userId,
			'token': token
		},
		success:function(res){
			console.log(JSON.stringify(res));
		}
	})
}
// 获取身份验证信息
var validation = function(){
	return uni.getStorageSync("userInfo");
}
export default {
	validation:validation,
	init:function(url){
		API_URL = url
	},
	request:request,
	login:function(data){
		var _url = API_URL + "/app/login";
		return new Promise(function(resolve, reject){
			uni.request({
				url:_url,
				method:"post",
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				data:data,
				success: (res) => {
					console.log(JSON.stringify(res))
					resolve(res.data)
				},
				fail: (error) => {
					console.log(JSON.stringify(error))
					reject(error)
				}
			})
		})
	},
	//上传通话记录和录音文件
	insertionCallLog(filePath,formData){
		uploadFile("/call/insertCall",filePath,"file",formData);
	},
	//获取客户信息
	getClient(){
		return request("/client/getUserClients","get",{userId: validation().userId});
	},
	//获取用户所有通话记录
	getCalls(){
		return request("/call/getCalls/" + validation().userId,"get",{})
	}
}