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