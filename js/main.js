window.onload = function(){
    Array.prototype.slice.call(document.getElementsByClassName("folder")).forEach(function(node){
        node.addEventListener('click',getArticle());
    });
}
function getArticle(){
    var oldIndex = 1;
    var limit  = 10;
    var cache = {};
    return function(event){
        var cases = getRealIndex(oldIndex,event.target.innerHTML,limit);
        if(cases == 0) return;
        if(cases != 0){
            if(cases == oldIndex)
                return ;
            oldIndex = cases;
        }
        if(cache[oldIndex]){
            //cache中读取信息
            return ;
        }
        var xmlhttp = singltonXHR(xhrCallback());
        url = escape("main/articles?index="+oldIndex);
        xmlhttp.open("GET",url,false);
        xmlhttp.send();
    }
}
function getRealIndex(oldIndex,currentIndex,limit){
    var charCode = currentIndex.charCodeAt(0);
    if(charCode == "171"){
        if(oldIndex == 1)
            return 0;
        return +oldIndex - 1;
    }
    else if(charCode == "187"){
        if(oldIndex == limit){
            return 0;
        }
        return +oldIndex + 1;
    }
    else if(charCode == "46"){
        return 0;
    }
    else{
        return  currentIndex;
    }
}
function singltonXHR(callback){
    var xmlhttp = "";

    return xmlhttp||createXHR(callback);
    function createXHR(callback) {
        var xml;
        if (window.XMLHttpRequest)
            xml = new XMLHttpRequest();
        else
            xml = new ActiveXObject("Microsoft.XMLHTTP");
        xml.onreadystatechange = callback;
        return xml;
    }

}
function xhrCallback(){
    if(this.readyState == 4 && this.status == 200){
        var data = this.requestXML;
    }
}

function parseArticle(article){
    var title = article.title;
    var summary = article.summary;
    var author = article.author;
    var releaseTime  = article.releaseTime;
    var visits = article.visits;
    var thumbnail = article.thumbnail;
}

function removeAndInsertLater(node){
    var parent = node.parentNode;
    var sibling = node.nextSibling;
    parent.removeChild(node);

    return function(){
        if(sibling){
            parent.insertBefore(node,sibling);
        }
        else
            parent.appendChild(node);
    }
}
function updateArticleData(node){
    let temp = removeAndInsertLater(node);
    //xianzai dom kuai le 
}