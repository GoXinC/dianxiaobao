var API_URL = "http://129.204.228.14:8081";
var userId = "";
var token = "";
var request = function(url,method,data){
	var _url = API_URL + url;
	return new Promise(function(resolve, reject){
		validation()
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
				resolve(res)
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}
// 获取身份验证信息
var validation = function(){
	userId = uni.getStorageSync("userId");
	token = uni.getStorageSync("token");
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
	}
	
}