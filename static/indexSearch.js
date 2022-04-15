"use strict"

function search(){

    document.getElementById('attractionsContainer').innerHTML="";
    document.getElementById('errorMessage').innerHTML="";
    document.getElementById('errorMessage').style.margin = "0"
    
    let page = 0;
    let loader = document.createElement('div');

    attractionsContainer.appendChild(loader)
    loader.setAttribute('id', 'loader')            
    loader.setAttribute('display', 'block')


    if(document.getElementById('searchInput').value === null){
        searchInput = ""
    }else{
        searchInput = document.getElementById('searchInput').value
    }

    fetch(url + 'page=' + page + '&keyword=' + searchInput, {
        method:'get'
    })
    .then(response => response.json())
    .then((response) => {
        
        if(response['message'] === "無此頁面"){

            // 回傳錯誤訊息
            let errorMessageDiv = document.getElementById('errorMessage');
            let messageTextnode = document.createTextNode("查無景點")
            errorMessageDiv.setAttribute('style', 'margin:40px')      
            errorMessageDiv.appendChild(messageTextnode)
            // footer 置底
            let footer = document.getElementById('footer')
            footer.style.position = "absolute";
            // loader
            let loader = document.getElementById('loader')
            attractionsContainer.removeChild(loader)

        } else if(response['message'] === "伺服器內部錯誤，請依照規格書指示"){
            // footer 置底
            let footer = document.getElementById('footer');
            footer.style.position = "relative";
            onload()
        } else{
                
            let data = response['data']
            let dataLength = data.length
            let checkNextPage = response['nextPage'];

            if (checkNextPage !== "") {
                nextPage = checkNextPage
            }
            
            for(let i = 0; i < dataLength; i++){

                if (!String.prototype.format) {
                    String.prototype.format = function(dict) {
                      return this.replace(/{(\w+)}/g, function(match, key) {
                        return typeof dict[key] !== 'undefined'
                          ? dict[key]
                          : match
                        ;
                      });
                    };
                }

                let attractionsPic = data[i]['images'][0];
                let mrt = data[i]['mrt'];
                let category = data[i]['category'];
                let attractionId = data[i]['id'];

                let picDivTag = document.createElement('div');
                let picImgTag = document.createElement('img');
                let namePTag = document.createElement('p');
                let mrtPTag = document.createElement('p');
                let catPTag = document.createElement('p');
                
                let nameTextnode = document.createTextNode(data[i]['name']);        
                let mrtTextnode = document.createTextNode(mrt);
                let catTextnode = document.createTextNode(category);
        
                picDivTag.setAttribute('style', 'width:100%;border:1px solid #E8E8E8;border-radius:5px;overflow:hidden;cursor:pointer');
                picDivTag.setAttribute('class', 'result');
                picDivTag.setAttribute('onclick', 'location.href="/attraction/{attractionId}"'.format({attractionId:attractionId}))
                picImgTag.setAttribute('src',attractionsPic)
                picImgTag.setAttribute('title', nameTextnode);
                picImgTag.setAttribute('style','width:100%;aspect-ratio:16/9');
                namePTag.setAttribute('style','color:#757575;font-weight:700;font-size:16px;line-height:13.3px;padding:10px 7px 10px 10px;margin:0;overflow:hidden;');
                mrtPTag.setAttribute('style','color:#757575;font-weight:400;font-size:16px;line-height:40px;width:50%;height:40px;margin:0;display:inline-block;padding-left:10px');
                catPTag.setAttribute('style','display:inline-block;color:#757575;font-weight:400;font-size:16px;line-height:40px;width:50%;height:40px;margin:0;text-align:right;float:right;padding-right:10px');
            
                attractionsContainer.appendChild(picDivTag);
                picDivTag.appendChild(picImgTag);
                picDivTag.appendChild(namePTag);
                namePTag.appendChild(nameTextnode);
                picDivTag.appendChild(mrtPTag);
                mrtPTag.appendChild(mrtTextnode);
                picDivTag.appendChild(catPTag);
                catPTag.appendChild(catTextnode);
                footer.style.position = "relative";
            }
            // loader
            let loader = document.getElementById('loader')
            attractionsContainer.removeChild(loader)
            
            for (let i = 0; i < attractionsContainer.children.length; i++){
                if (attractionsContainer.children[i].tagName == "DIV"){
                    attractionsContainer.children[i].style.display = 'block'
                }
            }
        }
    })
}

selectElement.addEventListener('change', debounce(search,1000))

document.getElementById('searchBtnIcon').addEventListener("click", debounce(search,1000))