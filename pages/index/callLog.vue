<template>
	<view class="content">
		<view>123</view>
		<!-- <block v-for="(item,index) in callLogList" :key="index">
			<view>{{item.clientName}}</view>
		</block> -->
		<view>456</view>
	</view>
</template>

<script>
	import API from "../../servier/dxb-ajax.js"
	export default {
		data() {
			return {
				callLogList:[]
			}
		},
		onLoad(){
			// this.getCalls(this.callLogList);
			API.getCalls().then(function(res){
				console.log("122")
				console.log(JSON.stringify(res));
				this.callLogList = res;
			});
		},
		methods: {
			async getCalls(callLogList){
				callLogList = await API.getCalls();
				// console.log(JSON.stringify(callLogList));
				return callLogList
			}
		}
	}
</script>

<style>

</style>
