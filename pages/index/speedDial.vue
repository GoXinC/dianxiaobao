<template>
	<view class="content">
		<block v-for="(item,index) in clientList" :key="index">
			<view>{{item}}</view>
		</block>
	</view>
</template>

<script>
	import API from "../../servier/dxb-ajax.js";
	export default {
		data() {
			return {
				clientList:[]
			}
		},
		onLoad(){
			this.getClientList();
		},
		methods: {
			async getClientList(){
				var clientList = await API.getClient();
				this.clientList = clientList
			}
		}
	}
</script>

<style>

</style>
