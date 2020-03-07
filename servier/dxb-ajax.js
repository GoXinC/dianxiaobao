var API_URL = "";
var userId = "";
var token = "";
var request = function(url,method,data){
	var _url = API_URL + url;
	return new Promise(resolve, reject){
		validation();
		nui.request({
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
	}
}
var validation = function(){
	userId = uni.getStorageSync("userId");
	token = uni.getStorageSync("token");
}
export default {
	validation:validation
	init:function(url){
		API_URL = url
	},
	request:request,
	
	
}