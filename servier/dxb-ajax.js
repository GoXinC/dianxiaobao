import default{
	var API_URL = ""
	var request = function(url,method,data){
		var _url = API_URL + url;
		return new Promise(resolve, reject){
			nui.request({
				url:_url,
				method:method,
				data:data,
				success: (res) => {
					resolve(res.data)
				},
				fail: (res) => {
					reject(res.data)
				}
			})
		}
	}
}