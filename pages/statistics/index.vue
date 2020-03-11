<template>
	<view>
		<button @click="go">统计</button>
		<view class="line">
			<line-chart canvasId="index_line_2" :dataAs="lineData2" />
			<view style="text-align: center;line-height: 40px;">折线LineChart Number</view>
		</view>
	</view>
</template>

<script>
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	export default {
		name: 'Index',
		components: {
			LineChart
		},
		data() {
			return {
				lineData2: {
					//数字的图--折线图数据
					categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
					series: [
						{ name: '总通话数', data: [35, 8, 25, 37, 4, 20] },
						{ name: '已接通', data: [70, 40, 65, 100, 44, 68] },
						{ name: '未接通', data: [100, 80, 95, 150, 112, 132] }
					]
				}
			}
		},
		methods: {
			go(){
				uni.navigateTo({
					url:"statistics"
				})
			}
		}
	}
</script>

<style scoped>

</style>
