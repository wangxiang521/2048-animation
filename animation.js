/*封装$*/
window.$=HTMLElement.prototype.$=
  function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:
            elems.length==1?elems[0]:elems;
}
HTMLElement.prototype.css=
  function(prop,value){//this->elem
    if(value===undefined){
      var style=getComputedStyle(this)
      return style[prop];
    }else{
      this.style[prop]=value;
    }
}
function Task(div,tStep,lStep){
  this.div=div;
  this.tStep=tStep;
  this.lStep=lStep;
}
var animation={
  DURATION:1000,//总时间
  STEPS:200,//总步数
  interval:0,//时间间隔
  timer:null,//定时器序号
  moved:0,//已经移动的步数
  tasks:[],//保存所有要移动的任务对象
  init:function(){
    this.interval=
      this.DURATION/this.STEPS;
  },
  //向tasks中添加任务
  addTask:function(
    startr,startc,endr,endc){
    var div=$("#c"+startr+startc);
    var tDIST=(endr-startr)*
              (game.CSIZE+game.MARGIN);
    var tStep=tDIST/this.STEPS;
    var lDIST=(endc-startc)*
              (game.CSIZE+game.MARGIN);
    var lStep=lDIST/this.STEPS;
    this.tasks.push(
      new Task(div,tStep,lStep)  
    );
  },
  start:function(callback){//启动动画
    console.log("启动动画");
    //启动周期性定时器:
    this.timer=setInterval(
      this.moveStep.bind(this,callback),
      this.interval
    );
  },
  moveStep:function(callback){//移动一步
    //遍历当前对象的tasks数组中每个task
    for(var i=0;i<this.tasks.length;i++){
      var task=this.tasks[i];
      //将task的div的top增加一个tStep
      task.div.css("top",
        parseFloat(task.div.css("top"))+
        task.tStep+"px"
      );
      //将task的div的left增加一个lStep
      task.div.css("left",
        parseFloat(task.div.css("left"))+
        task.lStep+"px"
      );
    }//(遍历结束)
    this.moved++;
    if(this.moved==this.STEPS){
      clearInterval(this.timer);
      this.timer=null;
      this.moved=0;
      //遍历tasks数组中每个task
      for(var i=0;
          i<this.tasks.length;
          i++){
        var task=this.tasks[i];
        //清除task的div的top和left
        task.div.css("top","");
        task.div.css("left","");
      }
      this.tasks=[];
      callback();
    }
  }
}
animation.init();