<template>
	<view>
		<view>{{userId}}</view>
		<view>{{token}}</view>
		<button @click="toLogin">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:'',
				token:''
			}
		},
		onLoad(){
			var userInfo = uni.getStorageSync("userInfo");
			this.userId = userInfo.userId;
			this.token = userInfo.token;
		},
		methods:{
			toLogin(){
				uni.navigateTo({
					url:"../login/login"
				})
			}
		}
	}
</script>

<style>
</style>
