"use strict"

const selectElement = document.querySelector('#searchInput');
let url = 'http://44.199.90.64:3000/api/attractions?';
let nextPage = "";
let searchInput = "";
let footer = document.getElementById("footer")


const debounce = function(func, delay){
    let timer;
    return function(){     
        const context = this; 
        const args = arguments;

        clearTimeout(timer); 

        timer = setTimeout(()=> {
        func.apply(context, args)
        },delay);
    }
}

function onload(){

    let page = 0;

    fetch(url + 'page=' + page, {
        method:'get'
    })
    .then(response => response.json())
    .then((res) => {

        let data = res['data'];
        let dataLength = data.length;
        let checkNextPage = res['nextPage'];

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
            let attractionsName = data[i]['name']
            let mrt = data[i]['mrt'];
            let category = data[i]['category'];
            let attractionId = data[i]['id'];

            let nameTextnode = document.createTextNode(attractionsName);        
            let mrtTextnode = document.createTextNode(mrt);
            let catTextnode = document.createTextNode(category);

            let attractionsContainer = document.getElementById('attractionsContainer');
            let picDivTag = document.createElement('div');
            let picImgTag = document.createElement('img');
            let namePTag = document.createElement('p');
            let mrtPTag = document.createElement('p');
            let catPTag = document.createElement('p');
        
            picDivTag.setAttribute('style', 'width:100%;border:1px solid #E8E8E8;border-radius:5px;overflow:hidden;cursor:pointer;');
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

        }

        footer.style.display = "block";

    })
};

onload();