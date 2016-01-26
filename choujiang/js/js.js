//中奖名单显示开始
$(function(){
	var num=0;
	var timer=null;

	function autoplay(){
		num++;
		if(num==$('.zjmd ul li').length-6){
			num=0;
		}
		$('.zjmd ul').animate({'top':-num*31},600);
	}
	timer=setInterval(autoplay, 3000);
	$('.zjmd ul li').mouseover(function() {
		clearInterval(timer);
	});
	$('.zjmd ul li').mouseout(function() {
		timer=setInterval(autoplay, 3000);
	});
})
//账号前两位和后四位显示其余的用*代替
$(function(){
	var accounts = ['zttgyhj0611','zttgyhj0612','zttgyhj0613','zttgyhj0614','zttgyhj0615','zttgyhj0616','zttgyhj0617','zttgyhj0618','zttgyhj0611','zttgyhj0612','zttgyhj0613','zttgyhj0614','zttgyhj0615','zttgyhj0616','zttgyhj0617','zttgyhj0618'];
	var lipin = ['9999G分 ','99G分','ip6手机','VIP体验卡','鼠标','周边福利','5点券','9999G分 ','99G分','ip6手机','VIP体验卡','鼠标','周边福利','5点券','9999G分 ','99G分']
	var result = '';
	for(var i = 0;i<accounts.length;i++){
		var span=accounts[i];
		str=span.substring(0,2)+"*****"+span.substring(span.length-4,span.length);
		result+='<li>恭喜账号 '+str+' 获得'+ lipin[i]+'</li>';
	}
	$('.zjmd ul').html(result);
})
//抽奖大转盘开始
$(function(){
	var timeOut = function(){  //超时函数
		$("#lotteryBtn").rotate({
			angle:0, 
			duration: 10000, 
			animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
			callback:function(){
				alert('网络超时')
			}
		}); 
	}; 
	var rotateFunc = function(awards,angle,text){ 
	 //awards:奖项，angle:奖项对应的角度
		$('#lotteryBtn').stopRotate();
		$("#lotteryBtn").rotate({
			angle:0, 
			duration: 5000, 
			animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
			callback:function(){
				alert(text)
			}
		}); 
	};
	
	$("#lotteryBtn").rotate({ 
	   bind: 
		 { 
			click: function(){
				var time = [0,1];
					time = time[Math.floor(Math.random()*time.length)];
				// if(time==0){
				// 	timeOut(); //网络超时
				// }

				if(time==1){
					var data = [1,2,3,4,5,6,7,8,9,10,0]; //返回的数组
						data = data[Math.floor(Math.random()*data.length)];
					if(data==1){
						rotateFunc(1,105,'恭喜您抽中的ip6手机')
					}
					if(data==2){
						rotateFunc(2,135,'恭喜您抽中的9999G分')
					}
					if(data==3){
						rotateFunc(3,165,'恭喜您抽中的99G分')
					}
					if(data==4){
						rotateFunc(4,195,'恭喜您抽中的金士顿32G U盘')
					}
					if(data==5){
						rotateFunc(5,225,'恭喜您抽中的4999点券')
					}
					if(data==6){
						rotateFunc(6,285,'恭喜您抽中的VIP体验卡')
					}
					if(data==7){
						rotateFunc(7,315,'恭喜您抽中的99G分')
					}
					if(data==8){
						rotateFunc(8,345,'恭喜您抽中的罗技M185鼠标')
					}
					if(data==9){
						rotateFunc(9,45,'恭喜您抽中的限量游戏周边福袋')
					}
					if(data==10){
						rotateFunc(10,75,'恭喜您抽中的5点券')
					}
					if(data==0){
						var angle = [255,15];
							angle = angle[Math.floor(Math.random()*angle.length)]
						rotateFunc(0,angle,'很遗憾，谢谢参与')
					}
				}
			}
		 } 
	   
	});
	
})