
window.onload=function(){
 document.getElementById('btStart').onclick=function(){
    chrome.storage.sync.set({timeInterval:document.getElementById('timeInterval').value});
    chrome.extension.sendMessage({message:'btStart_click'});
  };
  
  document.getElementById('btStop').onclick=function(){
    chrome.extension.sendMessage({message:'btStop_click'});
  };
}