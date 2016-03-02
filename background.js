
var hasInject=false;

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    if(request.message=="btStart_click")
    {
      stopTimer();
      chrome.tabs.insertCSS(null,{file:"page.css"});
      chrome.tabs.executeScript(null,{file:"jquery-1.12.1.min.js"});
      chrome.tabs.executeScript(null,{file:"page.js"});
      hasInject=true;
    }
    
    if(request.message=="PageChangedEvent")
    {
      playNotification();
    }
    
    if(request.message=="btStop_click")
    {
      stopTimer();
    }
      
 });
 
 function stopTimer(){
   if(hasInject) //如果之前未注入gs.js，会报错
        chrome.tabs.executeScript(null,{code:"stopTimer();"}); 
 }
 
 this.audio=null;
 function playNotification(){
    if(this.audio==null){
      this.audio=new Audio('attention.mp3');
      this.audio.loop=true;
      this.audio.play();
    }
    
    var options={ 
          lang: "utf-8",
          icon: "eye.png",
          body: "您监控的网页内容发生了改变！"
      };
    var n = new Notification("网页监控助手提醒！", options); 
    n.onclose=function(d){
      if(window.audio!=null)
      {
        window.audio.pause();
        window.audio=null;
      }
    };
 }