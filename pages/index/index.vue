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
			<view>></view>
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
		</view>
		<statistics msg="hello"></statistics>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	export default {
		data() {
			return {
				title: 'Hello',
				number: '',
				phone:'',
				neck:[{
					img:'/static/statis.png',
					name:'数据统计',
					url:this.startRecord
				},{
					img:'/static/record.png',
					name:'通话记录',
					url:this.endRecord
				},{
					img:'/static/call.png',
					name:'快速拨号',
					url:this.playVoice
				},]
			}
		},
		onLoad() {
			let self = this;
			recorderManager.onStop(function (res) {
			    console.log('recorder stop' + JSON.stringify(res));
			    self.voicePath = res.tempFilePath;
			});
		},
		methods: {
			call() {
                // 获取主Activity对象的实例  
                var main = plus.android.runtimeMainActivity();  
				// 导入Activity、Intent类
                var Intent = plus.android.importClass("android.content.Intent");  
                var Uri = plus.android.importClass("android.net.Uri");  
                // 创建Intent  
                var uri = Uri.parse("tel:"+this.phone); // 这里可修改电话号码  
                var call = new Intent("android.intent.action.CALL",uri);  
                // 调用startActivity方法拨打电话  
                main.startActivity( call );
				this.startRecord();
			},
			startRecord() {
				console.log('开始录音');
				recorderManager.start();
			},
			endRecord() {
				console.log('录音结束');
				recorderManager.stop();
			},
			playVoice() {
				console.log('播放录音');
				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			}
		},
		components:{
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
			background-image: linear-gradient(to bottom right, rgb(0, 223, 166), rgb(0, 211, 205));;
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
				font-size: 20rpx;
				color: white;
			}
			.call-button{
				position: absolute;
				bottom: -25px;
				height: 50px;
				background-color: white;
				color: rgb(0, 218, 183);
				box-shadow: 1px 1px 2px rgb(0, 218, 183);
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
					font-size: 30rpx;
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
				text-overline-color: #555555;
				text-underline-color: #007AFF;
				font-weight: 400;
				color: rgb(0, 218, 183);
				border-bottom: 3px solid rgb(169, 233, 229);
			}
			.notice-content{
				font-size: 25rpx;
			}
		}
		.region{
			width: 100%;
			height: 200rpx;
			margin-top: 30rpx;
			.region-title{
				border-left: 3px solid rgb(0, 218, 183);
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
						font-size: 30rpx;
						color: rgb(0, 214, 204);
						margin-bottom: 15rpx;
					}
					.block-describe{
						font-size: 25rpx;
					}
				}
				.block-left{
					margin-right: 5px;
					background-color: rgb(226, 241, 232);
				}
				.block-right{
					margin-left: 5px;
					background-color: rgb(208, 246, 247);
				}
			}
		}
	}
</style>
