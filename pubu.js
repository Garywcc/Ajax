//创建ajax对象
function createXHR(){
	if(typeof XMLHttpRequest!="undefiend"){
		return new XMLHttpRequest();
	}else if(typeof acticeXObject!="undefiend"){
		var verson=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
		i,len;
		for(i=0;i<verson.length;i++){
			try{
				return new ActiveXObject(verson[i]);
			}catch(e){
				//跳过
			}
		}
	}else{
		throw new Error("not available");
	}
}
function parame(date){
	var arr=[];
	for(var i in date){
		arr.push(encodeURIComponent(i)+"="+encodeURIComponent(date[i]));
	}
	return arr.join("&")
}

//ajax方法
var ajax=function(obj){
	
	var xhr=createXHR();
	obj.url+="?rand="+Math.random();
	obj.date=parame(obj.date);
	if(obj.method==="get") obj.url+=obj.url.indexOf("?")==-1 ? "?"+obj.date  :  "&"+obj.date;
	if(obj.async===true){
		xhr.onreadystatechange=function(){

			if(xhr.readyState==4){
				if(xhr.status==200){
				obj.callback(xhr.responseText);
				}else{
				alert("not available"+xhr.status);
				}
			}
		
		}
	}
	xhr.open(obj.method,obj.url,obj.async);
	if(obj.method==="post"){
		xhr.setRequestHeader("Contont-type","application/x-www-form-urlencode");
		xhr.send(obj.date)
	}else{
		xhr.send(null);
	}
	if(obj.async===false){
		if(xhr.readyState==4){
			if(xhr.status==200){
			obj.callback(xhr.responseText);
			}else{
			alert("not available"+xhr.status);
			}
		}
	}

}
//获取一个元素到页面的绝对位置
function getTop(obj){
	var iTop=0;
	while(obj){
		iTop+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return iTop;
}

window.onload=function(){
	var  ul1=document.getElementById("ul1");
	var list=document.getElementsByTagName("li");
	var lilen=list.length;
	var flag=true;
	getli();
	function getli(){
		ajax({
	            		method:"get",
			url:"1.json",
			async:false,
			callback:callbackFunction
           		 });
	}
	
	function callbackFunction(date){
		
		//var newd=eval(date);
		var newd=JSON.parse(date)

		for (var i=0,len=newd.length;i<len;i++){
			//获取最短的列index
			var _index=getShortindex();

			//创建相关元素
			var iDiv=document.createElement("div");

			var iImg=document.createElement("img");
			iImg.src="img\/"+newd[i].a;
			iDiv.appendChild(iImg);
			var iP=document.createElement("p");
			iP.innerHTML="hdfkjsdhfksjdhfksdhfksjhdfsdkjhfkla";
			iDiv.appendChild(iP);
			list[_index].appendChild(iDiv);


		}
		
		flag=true;
	}
	//获取最短的列index
		function getShortindex(){
			var index=0;
			var iHeight=list[0].offsetHeight;
			for(var i=1;i<lilen;i++){
				if(list[i].offsetHeight<iHeight){
					index=i;
					iHeighe=list[i].offsetHeight;
				}
			}
			return index;
		}
	window.onscroll=function(){
		var _index=getShortindex();
		var iLi=list[_index];
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		if(getTop(iLi)+iLi.offsetHeight<document.documentElement.clientHeight+scrollTop){
			if(flag){
				flag=false;
				getli();
			}
			
		}
	}
		
}