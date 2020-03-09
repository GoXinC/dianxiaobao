export const formatTime = function(date) {
	  const year = date.getFullYear()
	  const month = date.getMonth() + 1
	  const day = date.getDate()
	  const hour = date.getHours()
	  const minute = date.getMinutes()
	  const second = date.getSeconds()
	  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
	}

export default{
	startRecord:() => {
        console.log('开始录音');
        recorderManager.start();
    },
	pauseRecord:() => {
	    console.log('暂停录音');
	    recorderManager.pause();
	},
	resumeRecord:() => {
	    console.log('继续录音');
	    recorderManager.resume();
	},
	endRecord:() => {
        console.log('录音结束');
        recorderManager.stop();
    },
	
}