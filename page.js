//todo:判断是否已经添加过ymlInfo

if($('#ymlInfo').length==0)
{
  $('body').prepend("<div id='ymlInfo'>网页监听助手准备运行，正在读取配置数据</div>");
}
else{
  $('#ymlInfo').html("网页监听助手准备运行，正在读取配置数据");
}
  
var timer=null;

var timeInterval=600;//刷新的时间间隔
var second=0; //当前经历的秒数
var content="网页监听助手准备运行";
var source='';  //初始网页的内容
var timerCount=0; //目前的抓取次数
var isRunning=false;

chrome.storage.sync.get('timeInterval',function(data){
  timeInterval=data.timeInterval;
  startTimer();
});

function timeTick(){
  content="网页监听助手已运行"+second+"秒,共刷新"+timerCount+"次,每"+timeInterval+"秒刷新一次。";
  $('#ymlInfo').html(content);
  if(second%timeInterval==0)
  {
    $.get(location.href,function(data){
      data=data.replace(/<!--[\s\S]+?-->/g,'');

      if(source==''){
        source=data;
      }else if(source.localeCompare(data)!=0){
        chrome.extension.sendMessage({message:'PageChangedEvent',url:location.href});
        stopTimer();
        location.reload();
      }
      timerCount++;
    });
  }
  second++;
}
function startTimer(){
  isRunning=true;
  window.onbeforeunload = function(event){   
      return '当前正在监听网页，确认立即退出？'; 
  };
  timer=setInterval(timeTick,1000); //读取时间配置数据
  window.scrollTo(0,0);
}
function stopTimer(){
  clearInterval(timer);
  isRunning=false;
  window.onbeforeunload='';
}


