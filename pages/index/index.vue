<template>
	<view class="content">
		<view class="head">
			<input type="number" class="input-phone" v-model="phone" />
			<view class="call-number">Tips:本周累计呼出{{number}}次</view>
			<button class="call-button" @click="call">立即拨打</button>
		</view>
		<view class="neck">
			<block v-for="(item,index) in neck" :key="index">
				<view class="neck-item content" @click="item.url">
					<image class="neck-img" mode="widthFix" :src="item.img"></image>
					<view class="neck-name">{{item.name}}</view>
				</view> 
			</block>
		</view>
		<view class="notice">
			<view class="notice-title">最新公告</view>
			<view class="notice-content">电销助手V1.0版将上线试运营啦！</view>
			<view><uni-icons type="arrowright" size="15"></uni-icons></view>
		</view>
		<view class="region">
			<view class="region-title">通话专区</view>
			<view class="region-content">
				<view class="region-content-block block-left">
					<view class="block-title">批量导入客户</view>
					<view class="block-describe">导入所有客户信息</view>
				</view>
				<view class="region-content-block block-right">
					<view class="block-title">客户管理</view>
					<view class="block-describe">添加/修改客户资料</view>
				</view>
			</view>
		</view>
		<view class="region">
			<view class="region-title">最近联系人</view>
			<view class="region-tag">
				<view class="tag-list" v-for="(item,index) in tagList" :key="index" >
					<uni-tag :text="item.content" type="primary" :inverted="item.check" size="small" circle="true"></uni-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue";
	import uniTag from "@dcloudio/uni-ui/lib/uni-tag/uni-tag.vue";
	import android from "../../servier/android.js";
	const recorderManager = uni.getRecorderManager(); //录音管理对象
	const innerAudioContext = uni.createInnerAudioContext(); //录音播放上下文
	innerAudioContext.autoplay = true; //是否播放录音
	export default {
		data() {
			return {
				recorderManager: android.recorderManager(),
				innerAudioContext:android.innerAudioContext(),
				title: 'Hello',
				number: '',
				phone:'',
				neck:[{
					img:'/static/statis.png',
					name:'数据统计',
					url:this.getCallLog
				},{
					img:'/static/record.png',
					name:'通话记录',
					url:this.getContacts
				},{
					img:'/static/call.png',
					name:'快速拨号',
					url:this.playVoice
				}] ,
				tagList:[{
					content:"三天内",
					check:false
				},{
					content:"意向客户",
					check:true
				}],
				voicePath:''
			}
		},
		onLoad() {
			var userInfo = uni.getStorageSync("userInfo");
			if(userInfo){
				
			}else{
				uni.redirectTo({
					url:"../login/login"
				})
			}
			
		},
		methods: {
			//拨号
			call() {
				android.callPhone(this.phone); //拨号
				this.recorderManager.start(); //录音
				android.hangUp(); //监听用户挂断
				let self = this;
				this.recorderManager.onStop(function (res) {
					console.log('recorder stop' + JSON.stringify(res));
					self.voicePath = res.tempFilePath;
				});
			},
			//获取通话记录
			getCallLog(){
				var logLength = android.callLog();
				uni.showToast({
				    title: "logSize:" + logLength,
				    duration: 1000
				});
			},
			//获取通讯录
			getContacts(){
				var clientList = android.getContacts()
				console.log(JSON.stringify(clientList));
			},
			playVoice() {
				console.log('播放录音' + this.voicePath);
				if (this.voicePath) {
					this.innerAudioContext.src = this.voicePath;
					this.innerAudioContext.play();
				}
			},
			startRecord:function() {
			    recorderManager.start();
			    console.log('开始录音');
			},
			pauseRecord:function() {
			    recorderManager.pause();
			    console.log('暂停录音');
			},
			resumeRecord:function() {
			    console.log('继续录音');
			    recorderManager.resume();
			},
			endRecord:function() {
			    recorderManager.stop();
			    console.log('录音结束');
			}
		},
		components:{
			uniIcons,
			uniTag
		}
		
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
		font-size: 30rpx;
		.head{
			width: 100%;
			height: 300rpx;
			position: relative;
			background-image: linear-gradient(to bottom right, $dxb-theme-board-left, $dxb-theme-board-right);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: 10rpx;
			.input-phone{
				height: 20rpx;
				width: 60%;
				text-align: center;
				color: white;
				font-size: 60rpx;
				font-weight: 500;
				border-bottom: 2px solid white;
			}
			.call-number{
				font-size: $dxb-text-xs;
				color: white;
			}
			.call-button{
				position: absolute;
				bottom: -25px;
				height: 50px;
				background-color: white;
				color: $dxb-theme-color;
				box-shadow: 1px 1px 2px $dxb-theme-color;
				font-weight: bold;
				border-radius: 100px;
				width: 50%;
			}
		}
		.neck{
			width: 100%;
			margin-top: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.neck-item{
				width: 33%;
				.neck-img{
					width:30%;
				}
				.neck-name{
					font-size: $dxb-text-m;
				}
			}
		}
		.notice{
			width: 100%;
			display: flex;
			margin-top: 30rpx;
			align-items: center;
			justify-content: space-between;
			.notice-title{
				font-weight: 400;
				color: $dxb-theme-color;
				font-size: $dxb-text-m;
				border-bottom: 3px solid $dxb-theme-tint-color;
			}
			.notice-content{
				font-size: $dxb-text-s;
			}
		}
		.region{
			width: 100%;
			height: 200rpx;
			margin-top: 30rpx;
			.region-title{
				border-left: 3px solid $dxb-theme-color;
				padding-left: 20rpx;
				margin-bottom: 20rpx;
			}
			.region-content{
				width: inherit;
				height: 145rpx;
				display: flex;
				.region-content-block{
					width: 50%;
					height: inherit;
					border-radius: 10rpx;
					box-sizing:border-box;
					padding-top: 30rpx;
					padding-left: 20rpx;
					.block-title{
						font-weight: bold;
						font-size: $dxb-text-m;
						color: $dxb-theme-color;
						margin-bottom: 15rpx;
					}
					.block-describe{
						font-size: $dxb-text-s;
					}
				}
				.block-left{
					margin-right: 5px;
					background-color: $dxb-theme-thin-color;
				}
				.block-right{
					margin-left: 5px;
					background-color: $dxb-theme-tint-color;
				}
			}
			.region-tag{
				display: flex;
				font-size: $dxb-text-xs;
				.tag-list{
					margin: 3rpx;
				}
			}
		}
	}
</style>
