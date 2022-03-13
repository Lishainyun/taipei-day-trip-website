"use strict"

let url = 'http://44.199.90.64:3000/api/attractions?';
let nextPage = 0;
let searchInput;

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

        while (checkNextPage !== null) {
            nextPage = checkNextPage
        }

        for(let i = 0; i < dataLength; i++){
            let attractionsPic = data[i]['images'][0];
            let mrt = data[i]['mrt'];
            let category = data[i]['category'];

            let nameTextnode = document.createTextNode(data[i]['name']);        
            let mrtTextnode = document.createTextNode(mrt);
            let catTextnode = document.createTextNode(category);

            let attractionsContainer = document.getElementById('attractionsContainer');
            let picDivTag = document.createElement('div');
            let picImgTag = document.createElement('img');
            let namePTag = document.createElement('p');
            let mrtPTag = document.createElement('p');
            let catPTag = document.createElement('p');
        
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

        }
    })
};

onload();

function searchClick(){

    document.getElementById('attractionsContainer').innerHTML="";
    document.getElementById('errorMessage').innerHTML="";
    document.getElementById('errorMessage').style.margin = "0"
    
    let page = 0;

    if(document.getElementById('searchInput').value === null){
        searchInput = ""
    }else{
        searchInput = document.getElementById('searchInput').value
    }

    fetch(url + 'page=' + page + '&keyword=' + searchInput, {
        method:'get'
    })
    .then(response => response.json())
    .then((respinse) => {
        
        if(respinse['message'] === "無此頁面"){

            // 回傳錯誤訊息
            let errorMessageDiv = document.getElementById('errorMessage');
            let messageTextnode = document.createTextNode("查無景點")    
            errorMessageDiv.appendChild(messageTextnode)
            document.getElementById('errorMessage').style.margin = "40px"
            // footer 置底
            let footer = document.getElementById('footer')
            footer.style.position = "absolute";

        } else if(respinse['message'] === "伺服器內部錯誤，請依照規格書指示"){
            // footer 置底
            let footer = document.getElementById('footer');
            footer.style.position = "relative";
            onload()
        } else{
                
            let data = respinse['data']
            let dataLength = data.length
            let checkNextPage = res['nextPage'];

            while (checkNextPage !== null) {
                nextPage = checkNextPage
            }
            
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
        }
    })
}

// function scroll(){

//     if (nextPage !== null && searchInput === ""){
//         fetch(url + 'page=' + nextPage, {
//             method:'get'
//         })
//         .then(response => response.json())
//         .then((respond) => {
//             let data = respond['data']
//             let dataLength = data.length
//             let checkNextPage = respond['nextPage']

//             while (checkNextPage !== null){
//                 nextPage = checkNextPage
//             }
    
//             for(let i = 0; i < dataLength; i++){
    
//                 let attractionsPic = data[i]['images'][0];
//                 let mrt = data[i]['mrt'];
//                 let category = data[i]['category'];
        
//                 let attractionsContainer = document.getElementById('attractionsContainer');
//                 let picDivTag = document.createElement('div');
//                 let picImgTag = document.createElement('img');
//                 let namePTag = document.createElement('p');
//                 let mrtPTag = document.createElement('p');
//                 let catPTag = document.createElement('p');
                        
//                 let nameTextnode = document.createTextNode(data[i]['name']);        
//                 let mrtTextnode = document.createTextNode(mrt);
//                 let catTextnode = document.createTextNode(category);
                
//                 picDivTag.setAttribute('style', 'width:100%;border:1px solid #E8E8E8;border-radius:5px;overflow:hidden');
//                 picImgTag.setAttribute('src',attractionsPic)
//                 picImgTag.setAttribute('title', nameTextnode);
//                 picImgTag.setAttribute('style','width:100%;aspect-ratio:16/9');
//                 namePTag.setAttribute('style','color:#757575;font-weight:700;font-size:16px;line-height:13.3px;padding:10px 7px 10px 10px;margin:0;overflow:hidden;');
//                 mrtPTag.setAttribute('style','color:#757575;font-weight:400;font-size:16px;line-height:40px;width:50%;height:40px;margin:0;display:inline-block;padding-left:10px');
//                 catPTag.setAttribute('style','display:inline-block;color:#757575;font-weight:400;font-size:16px;line-height:40px;width:50%;height:40px;margin:0;text-align:right;float:right;padding-right:10px');
                    
//                 attractionsContainer.appendChild(picDivTag);
//                 picDivTag.appendChild(picImgTag);
//                 picDivTag.appendChild(namePTag);
//                 namePTag.appendChild(nameTextnode);
//                 picDivTag.appendChild(mrtPTag);
//                 mrtPTag.appendChild(mrtTextnode);
//                 picDivTag.appendChild(catPTag);
//                 catPTag.appendChild(catTextnode);
//             }
//         });
//     }else if(nextPage !== null && searchInput !== ""){
//         fetch(url + 'page=' + nextPage + '&keyword=' + searchInput, {
//             method:'get'
//         })
//         .then(response => response.json())
//         .then((responses) => {
//             let data = responses['data']
//             let dataLength = data.length
//             let checkNextPage = responses['nextPage']

//             while (checkNextPage !== null){
//                 nextPage = checkNextPage
//             }

//             for(let i = 0; i < dataLength; i++){
        
//                 let attractionsPic = data[i]['images'][0];
//                 let mrt = data[i]['mrt'];
//                 let category = data[i]['category'];
        
//                 let attractionsContainer = document.getElementById('attractionsContainer');
//                 let picDivTag = document.createElement('div');
//                 let picImgTag = document.createElement('img');
//                 let namePTag = document.createElement('p');
//                 let mrtPTag = document.createElement('p');
//                 let catPTag = document.createElement('p');
                        
//                 let nameTextnode = document.createTextNode(data[i]['name']);        
//                 let mrtTextnode = document.createTextNode(mrt);
//                 let catTextnode = document.createTextNode(category);
                
//                 picDivTag.setAttribute('style', 'width:100%;border:1px solid #E8E8E8;border-radius:5px;overflow:hidden');
//                 picImgTag.setAttribute('src',attractionsPic)
//                 picImgTag.setAttribute('title', nameTextnode);
//                 picImgTag.setAttribute('style','width:100%;aspect-ratio:16/9');
//                 namePTag.setAttribute('style','color:#757575;font-weight:700;font-size:16px;line-height:13.3px;padding:10px 7px 10px 10px;margin:0;overflow:hidden;');
//                 mrtPTag.setAttribute('style','color:#757575;font-weight:400;font-size:16px;line-height:40px;width:50%;height:40px;margin:0;display:inline-block;padding-left:10px');
//                 catPTag.setAttribute('style','display:inline-block;color:#757575;font-weight:400;font-size:16px;line-height:40px;width:50%;height:40px;margin:0;text-align:right;float:right;padding-right:10px');
                    
//                 attractionsContainer.appendChild(picDivTag);
//                 picDivTag.appendChild(picImgTag);
//                 picDivTag.appendChild(namePTag);
//                 namePTag.appendChild(nameTextnode);
//                 picDivTag.appendChild(mrtPTag);
//                 mrtPTag.appendChild(mrtTextnode);
//                 picDivTag.appendChild(catPTag);
//                 catPTag.appendChild(catTextnode);
//             }  
//         });
//     }
// };

// function scrollToBot(){
//     if ((window.innerHeight + Math.round(window.scrollY)) === document.body.offsetHeight){
//         scroll();
//     };
// }

// const debounce = function(func, delay){
//     let timer;
//     return function(){     
//         const context = this; 
//         const args = arguments;
//         clearTimeout(timer); 
//         timer = setTimeout(()=> {
//         func.apply(context, args)
//         },delay);
//     }
// }

// window.addEventListener('scroll', debounce(scrollToBot,5000))





