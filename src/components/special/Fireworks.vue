<script setup lang="ts">
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
const canvas = ref();
  //获取窗口可视区域宽高 要减去6大小的滚动条
  let w = document.documentElement.clientWidth ;
  let h = document.documentElement.clientHeight - 6 - 63;
  console.log("h:",h);
  
onMounted(() => {
  const ctx = canvas.value.getContext('2d'); 
  //更新canvas的宽高 清除画布时使用
  ctx.width = w;
  ctx.height = h;
  
//产生随机数
function r(num:number) {
    return Math.random() * num;
  }
  //TODO step1 : 创建小球类
  /**
   * @param {*} x 起始x坐标
   * @param {*} y 起始y坐标
   * @param {*} r 小球半径
   * @param {*} color 小球颜色
   */
    class Ball {
    _r:number
    _x:number
    _y:number
    _color:string
    constructor(x:number, y:number) {
      this._r = 30;
      this._x = x;
      this._y = y;
      //this.color = "#" + parseInt(Math.random() * 0xffffff).toString(16);
      var r = Math.round(getRandom(100, 111))
      var g = Math.round(getRandom(100, 111))
      var b = Math.round(getRandom(100, 111))
		  var color = 'rgb(' + r + ',' + g + ',' + b + ')'
      this._color = color;

    }
    //定义小球显示方法
    show = () => {
      //半径越来越小
      if (this._r > 0) {
          this._r -= 0.5;
      }
      drawCircle(this._x, this._y, this._r, this._color);//画小球
    }
  }
    
    //小球数组
    let ballArr:any = [];

    // window.onmousemove = function (e) {
    //     var ball = new Ball(e.x, e.y-59);
    //     //把小球放入数组
    //     ballArr.push(ball);
    //     ball.show();
    // };
    window.onclick = function (e) {
        var ball = new Ball(e.x, e.y-59);
        //把小球放入数组
        ballArr.push(ball);
        ball.show();
        var color = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
        var fire = new FireObj(e.x, e.y-59, color, getRandom(-5, 5), getRandom(0, 3))
        fireArr.push(fire);
        fireArr.splice(1,1);
    };

    var fadeAway = setInterval(function () {
        //清楚画布
        ctx.clearRect(0, 0, w, h);
        
        for (var i = 0; i < ballArr.length; i++) {
            var ball = ballArr[i];
            if (ball.r <= 0) {
                ballArr.splice(i, 1);
            } else {
                ball.show();
            }
            // if (i == ballArr.length - 1 && ball.r == 0) {
            //     console.log(i);
            //     console.log(ballArr.length);
            //     clearInterval(fadeAway);
            // }
        }

    }, 10)

    /**
     * 画直线
     * @param {*} x1 
     * @param {*} y1 
     * @param {*} x2 
     * @param {*} y2 
     * @param {*} color 
     * @param {*} width 
     */
    function drawLine(x1:number, y1:number, x2:number, y2:number, color:string, width:number) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }
    /**
     * 画文字
     * @param {*} text 
     * @param {*} x 
     * @param {*} y 
     */
    function drawText(text:string, x:number, y:number, color:string) {
        ctx.font = '20px 微软雅黑';
        ctx.textAlign = 'top';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    }
    /**
     * 画圆
     * @param {*} x 
     * @param {*} y 
     * @param {*} r 
     * @param {*} color 
     */
    function drawCircle(x:number, y:number, r:number, color:string) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = color || '#000';
        ctx.fill();
    }

  // 新版烟花
	var animation;
	var fireArr:any = [];
	var fragments:any = [];

  class FireObj{
    private fragArr:any
    private initialX:number
    private initialY:number
    private x:number
    private y:number
    private vx:number
    private vy:number
    private radius:number
    private color:string
    private angel:number
    private offsetValueX:number
    private offsetValueY:number
    private disappear:boolean
    private boomJudge:boolean
		constructor(x:number, y:number, color:string, offsetValueX:number, offsetValueY:number) {
      this.fragArr = [];
      this.initialX = x;
      this.initialY = y
      this.x = x;
      this.y = y;
      this.vx = 2;
      this.vy = 2;
      this.radius = 4;
      this.color = color;
      this.angel = 180;
      this.offsetValueX = offsetValueX;
      this.offsetValueY = offsetValueY;
      this.disappear = false;
      this.boomJudge = true;
    }
    draw = () => {
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true),
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
    move = () => {
			this.x += this.vx + this.offsetValueX;
			this.y -= this.vy + this.offsetValueY;
		}
		//烟花爆炸，产生碎片
    boom = () => {
			var scope = Math.round(getRandom(10, 40));
			//var scope = 1;
			for (var i=0; i<scope; i++) {
				var angel = getRandom(0, 2*Math.PI);
				var range = Math.round(getRandom(50, 300));
				var targetX = this.x + range*Math.cos(angel);
				var targetY = this.y + range*Math.sin(angel);
				var r = Math.round(getRandom(120, 255));
				var g = Math.round(getRandom(120, 255));
				var b = Math.round(getRandom(120, 255));
				var color = 'rgb(' + r + ',' + g + ',' + b + ')';
				var frag = new Frag(this.x, this.y, color, targetX, targetY);
				this.fragArr.push(frag);
			}
		}
	}
  class Frag{
    private x:number
    private y:number
    private ty:number
    private tx:number
    private color:string
    private disappear:boolean
    private fragDisappear:boolean
    constructor(x:number, y:number, color:string, tx:number, ty:number) {
      this.x = x
      this.y = y
      this.ty = ty
      this.tx = tx
      this.color = color
      this.disappear = false
      this.fragDisappear = false
      
    }
    draw = () => {
			ctx.save()
			ctx.beginPath()
			ctx.fillStyle = this.color
			ctx.fillRect(this.x, this.y, 2, 2)
			ctx.restore()
		}
		move = ()=>{
			this.ty = this.ty + 0.5
			var dx = this.tx - this.x, dy = this.ty - this.y
			this.x = Math.abs(dx) < 0.1 ? this.tx : (this.x + dx * 0.01)
			this.y = Math.abs(dy) < 0.1 ? this.ty : (this.y + dy * 0.01)
			if (dx == 0 || dy == 0 || this.y >= 700 || this.x <= 100 || this.x >= 1700) {
				this.fragDisappear = true
			}
		}
  }
  function animate () {
		ctx.fillStyle = 'rgba(0,0,0,0.05)' //产生拖尾效果
		ctx.fillRect(0, 0, ctx.width, ctx.height)
		if (fireArr.length) {
			fireArr.forEach(function (item:any, index:number) {
				var marginWidthLeft = getRandom(0, ctx.width / 6)
				var marginWidthRight = getRandom(1000, ctx.width)
				var marginHeight = getRandom(0, 300)
				if (item.x >= marginWidthRight || item.x <= marginWidthLeft || item.y <= marginHeight) {
					item.disappear = true
				}
				if (!item.disappear) {
					item.draw()
					item.move()
				} else {
					var removeFire = fireArr.splice(index, 1)
					fragments.push(removeFire)
					if (fragments.length) {
						fragments.forEach(function (item:any, index:number) {
							if (item[0].boomJudge) {
								item[0].boom()
								item[0].boomJudge = false
							}
						})
					}
					fireArr.push(createRandomFire(FireObj))
				}
			})
		}
		if (fragments.length) {
			fragments.forEach(function (item1:any, index1:any) {
				item1[0].fragArr.forEach(function (item2:any, index2:any) {
					if (item2.fragDisappear) {
						fragments.splice(index1, 1)
					}
					item2.draw()
					item2.move()
				})
			})
		}
		animation = window.requestAnimationFrame(animate)
	}
  function getRandom (a:number, b:number):number {
		return Math.random() * (b - a) + a
	}
  function createRandomFire (func:any) {
		var r = Math.round(getRandom(100, 255))
		var g = Math.round(getRandom(150, 255))
		var b = Math.round(getRandom(0, 255))
		var color = 'rgb(' + r + ',' + g + ',' + b + ')'
		var fire = new func(960 + getRandom(-300, 300), 800, color, getRandom(-5, 5), getRandom(0, 3))
		return fire
	}
//animate();
	////初始化烟花数：5
	for (var i=0; i<5; i++) {
		fireArr.push(createRandomFire(FireObj));
	}
	if (fireArr.length) {
		animate();
	}
  
    

		 
            




})

</script>

<template>
  <div class="container">
    <canvas ref='canvas' :width="w" :height="h" style="border: 0px grey solid"></canvas>

  </div>
</template>

<style scoped>

</style>
