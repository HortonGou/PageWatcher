
window.onload=function(){
 document.getElementById('btStart').onclick=function(){
    chrome.storage.sync.set({timeInterval:document.getElementById('timeInterval').value});    
    var myemail=document.getElementById("emailAddress").value;
    fcheckMail=function(myemail){
      var reg=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
      var check=reg.test(myemail);
      return check;
    };
    if(fcheckMail!==true){
      alert('邮箱格式不正确！');
    }else{
      chrome.storage.sync.set({emailAddress:document.getElementById('emailAddress').value});
      chrome.extension.sendMessage({message:'btStart_click'});
    }
  };
  
  document.getElementById('btStop').onclick=function(){
    chrome.extension.sendMessage({message:'btStop_click'});
  };

}
