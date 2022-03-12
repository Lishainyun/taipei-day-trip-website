"use strict"

document.getElementById('footer').onscroll = () => {scroll()}

function scroll(){
    
    let footer = document.getElementById('footer');
    let footerRect = footer.getBoundingClientRect();
    let footerTop = footerRect.top;
    let footerBottom = footerRect.bottom;
    let footerHeight = footerRect.height;
    let url = 'http://44.199.90.64:3000/api/attractions?';
    let page = 0;
    let searchInput = ""

    if(document.getElementById('searchInput').value === null){
        searchInput = ""
    }else{
        searchInput = document.getElementById('searchInput').value
    }

    while( (footerBottom - footerTop) === footerHeight ) {

        fetch(url + 'page=' + page + '&keyword=' + searchInput, {
            method:'get'
        })
        .then(response => response.json())
        .then((res) => {

            if ( (!res['error']) && (res['nextPage'] !== null) ) {

                page = res['nextPage']

            } else {

                page = 0

            }
        })
    }
    
    while (page !== 0){

        fetch(url + 'page=' + page + '&keyword=' + searchInput, {
            method:'get'
        })
        .then(response => response.json())
        .then((response) => {
            let data = response['data']
            let dataLength = data.length

            for(let i = 0; i < dataLength; i++){
                let attractionsPic = data[i]['images'][0];
                let mrt = data[i]['mrt'];
                let category = data[i]['category'];
        
                let attractionsContainer = document.getElementById('attractionsContainer');
                let picDivTag = document.createElement('div');
                let picImgTag = document.createElement('img');
                let namePTag = document.createElement('p');
                let mrtPTag = document.createElement('p');
                let catPTag = document.createElement('p');
                        
                let nameTextnode = document.createTextNode(data[i]['name']);        
                let mrtTextnode = document.createTextNode(mrt);
                let catTextnode = document.createTextNode(category);
                
                picDivTag.setAttribute('style', 'width:100%;border:1px solid #E8E8E8;border-radius:5px;overflow:hidden');
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
        })
    }
}


