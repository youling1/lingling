// ie8以及其以下版本的浏览器的显示效果
if(navigator.userAgent.indexOf("MSIE 6.0")>0 || navigator.userAgent.indexOf("MSIE 7.0")>0 || navigator.userAgent.indexOf("MSIE 8.0")>0){
    $('.scratch').one('click',function(){
        // 存放图片并随机显示
        var oImg = ['img/luckBoby.png','img/thankyou.png'];
        // oText中包含所有中奖项
        var oText = ['平板电脑','小米手机','卡丁车','三只松鼠'];
        var math = Math.floor(Math.random() *oImg.length);
        var math1 = Math.floor(Math.random() *oText.length);
        $(this).css("background-image","url("+ oImg[math] +")");

        $('.inputNum').val(math);
        // 判断刮奖结果，并弹出相应的数据
        // 1代表没抽中，2代表中奖了
        if( $('.inputNum').val() == 1){
            setTimeout(function(){
                alert('谢谢参与')
            },1000)
        }else{
            setTimeout(function(){
                alert(oText[math1])
            },1000)
        }


    })
}else{ //ie9以上以及其他高级浏览器刮奖效果
    function Lottery(id, cover, coverType, width, height, drawPercentCallback) {
        this.conId = id;
        this.conNode = document.getElementById(this.conId);
        this.cover = cover;
        this.coverType = coverType;
        this.background = null;
        this.backCtx = null;
        this.mask = null;
        this.maskCtx = null;
        this.lottery = null;
        this.lotteryType = 'image';
        this.width = width || 157;
        this.height = height || 50;
        this.clientRect = null;
        this.drawPercentCallback = drawPercentCallback;
    }

    Lottery.prototype = {
        createElement: function (tagName, attributes) {
            var ele = document.createElement(tagName);
            for (var key in attributes) {
                ele.setAttribute(key, attributes[key]);
            }
            return ele;
        },
        getTransparentPercent: function(ctx, width, height) {
            var imgData = ctx.getImageData(0, 0, width, height),
                pixles = imgData.data,
                transPixs = [];
            for (var i = 0, j = pixles.length; i < j; i += 4) {
                var a = pixles[i + 3];
                if (a < 128) {
                    transPixs.push(i);
                }
            }
            return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
        },
        resizeCanvas: function (canvas, width, height) {
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').clearRect(0, 0, width, height);
        },
        drawPoint: function (x, y) {
            this.maskCtx.beginPath();
            var radgrad = this.maskCtx.createRadialGradient(x, y, 0, x, y, 30);
            radgrad.addColorStop(0, 'rgba(0,0,0,0.6)');
            radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            this.maskCtx.fillStyle = radgrad;
            this.maskCtx.arc(x, y, 30, 0, Math.PI * 2, true);
            this.maskCtx.fill();
            if (this.drawPercentCallback) {
                this.drawPercentCallback.call(null, this.getTransparentPercent(this.maskCtx, this.width, this.height));
            }
        },
        bindEvent: function () {
            var _this = this;
            var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
            var clickEvtName = device ? 'touchstart' : 'mousedown';
            var moveEvtName = device? 'touchmove': 'mousemove';
            if (!device) {
                var isMouseDown = false;
               $('#lotteryContainer').one('mouseup',function(e){
                   isMouseDown = false;
                   // 判断刮奖结果，并弹出相应的数据
                   // 1代表没抽中，2代表中奖了
                   if($('#drawPercent').text()!== '0.00%') {
                       if ($('.inputNum').val() == 1) {
                           setTimeout(function () {
                               alert('谢谢参与');
                           }, 1000)
                       } else if ($('.inputNum').val() == 0) {
                           var oText = ['平板电脑', '小米手机', '卡丁车', '三只松鼠'];
                           var math = Math.floor(Math.random() * oText.length);
                           setTimeout(function () {
                               alert(oText[math])
                           }, 1000)
                       }
                   }
               });
            } else {
                document.addEventListener("touchmove", function(e) {
                    if (isMouseDown) {
                        e.preventDefault();
                    }
                }, false);
                document.addEventListener('touchend', function(e) {
                    isMouseDown = false;
                }, false);
            }
            this.mask.addEventListener(clickEvtName, function (e) {
                isMouseDown = true;
                var docEle = document.documentElement;
                if (!_this.clientRect) {
                    _this.clientRect = {
                        left: 0,
                        top:0
                    };
                }
                var x = (device ? e.touches[0].clientX : e.clientX) - _this.clientRect.left + docEle.scrollLeft - docEle.clientLeft;
                var y = (device ? e.touches[0].clientY : e.clientY) - _this.clientRect.top + docEle.scrollTop - docEle.clientTop;
                _this.drawPoint(x, y);
            }, false);

            this.mask.addEventListener(moveEvtName, function (e) {
                if (!device && !isMouseDown) {
                    return false;
                }
                var docEle = document.documentElement;
                if (!_this.clientRect) {
                    _this.clientRect = {
                        left: 0,
                        top:0
                    };
                }
                var x = (device ? e.touches[0].clientX : e.clientX) - _this.clientRect.left + docEle.scrollLeft - docEle.clientLeft;
                var y = (device ? e.touches[0].clientY : e.clientY) - _this.clientRect.top + docEle.scrollTop - docEle.clientTop;
                _this.drawPoint(x, y);
            }, false);
        },
        drawLottery: function () {
            this.background = this.background || this.createElement('canvas', {
                    style: 'position:absolute;left:0;top:0;'
                });
            this.mask = this.mask || this.createElement('canvas', {
                    style: 'position:absolute;left:0;top:0;'
                });

            if (!this.conNode.innerHTML.replace(/[\w\W]| /g, '')) {
                this.conNode.appendChild(this.background);
                this.conNode.appendChild(this.mask);
                this.clientRect = this.conNode ? this.conNode.getBoundingClientRect() : null;
                this.bindEvent();
            }

            this.backCtx = this.backCtx || this.background.getContext('2d');
            this.maskCtx = this.maskCtx || this.mask.getContext('2d');

            if (this.lotteryType == 'image') {
                var image = new Image(),
                    _this = this;
                image.onload = function () {
                    _this.width = this.width;
                    _this.height = this.height;
                    _this.resizeCanvas(_this.background, this.width, this.height);
                    _this.backCtx.drawImage(this, 0, 0);
                    _this.drawMask();
                }
                image.src = this.lottery;
            } else if (this.lotteryType == 'text') {
                this.width = this.width;
                this.height = this.height;
                this.resizeCanvas(this.background, this.width, this.height);
                this.backCtx.save();
                this.backCtx.fillStyle = '#FFF';
                this.backCtx.fillRect(0, 0, this.width, this.height);
                this.backCtx.restore();
                this.backCtx.save();
                var fontSize = 30;
                this.backCtx.font = 'Bold ' + fontSize + 'px Arial';
                this.backCtx.textAlign = 'center';
                this.backCtx.fillStyle = '#F60';
                this.backCtx.fillText(this.lottery, this.width / 2, this.height / 2 + fontSize / 2);
                this.backCtx.restore();
                this.drawMask();
            }
        },
        drawMask: function() {
            this.resizeCanvas(this.mask, this.width, this.height);
            if (this.coverType == 'color') {
                this.maskCtx.fillStyle = this.cover;
                this.maskCtx.fillRect(0, 0, this.width, this.height);
                this.maskCtx.globalCompositeOperation = 'destination-out';
            } else if (this.coverType == 'image'){
                var image = new Image(),
                    _this = this;
                image.onload = function () {
                    _this.maskCtx.drawImage(this, 0, 0);
                    _this.maskCtx.globalCompositeOperation = 'destination-out';
                }
                image.src = this.cover;
            }
        },
        init: function (lottery, lotteryType) {
            this.lottery = lottery;
            this.lotteryType = lotteryType || 'image';
            this.drawLottery();
        }
    }

    window.onload = function () {
        var lottery = new Lottery('lotteryContainer', '#666', 'color', 300, 100, drawPercent);
        // 存放图片并随机显示
        var oImg = ['img/luckBoby.png','img/thankyou.png'];
        var math = Math.floor(Math.random() *oImg.length);
        lottery.init(oImg[math], 'image');
        $('.inputNum').val(math);



        var drawPercentNode = document.getElementById('drawPercent');

        function drawPercent(percent) {
            //drawPercentNode.innerHTML = percent + '%';
        }
    }


}