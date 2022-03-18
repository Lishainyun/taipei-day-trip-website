"use strict"

const url = 'http://44.199.90.64:3000/api';
const attractionPath = window.location.pathname;
let fetchPicsLength;
let picId = 0;

//載入圖片
function slider(){

    fetch(url + attractionPath, {
        method:'get'
    })
    .then(response => response.json())
    .then((res) => {

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

        let data = res['data'];
        let fetchName = data['name'];
        let fetchCat = data['category'];
        let fetchDes = data['description'];
        let fetchAddr = data['address'];
        let fetchTrans = data['transport'];
        let fetchMRT = data['mrt'];
        let fetchPics = data['images'];
        fetchPicsLength = Object.keys(fetchPics).length;

        let getNameId = document.getElementById('attractionName');
        let getCatId = document.getElementById('attractionCat');
        let getMrtId = document.getElementById('attractionMRT');
        let getDesId = document.getElementById('attractionDescription');
        let getAddrId = document.getElementById('attractionAddress');
        let getTransId = document.getElementById('attractionTrans');

        let NameText = document.createTextNode(fetchName);
        let catText = document.createTextNode(fetchCat);
        let mrtText = document.createTextNode(fetchMRT);
        let DesText = document.createTextNode(fetchDes);
        let AddrText = document.createTextNode(fetchAddr);
        let TransText = document.createTextNode(fetchTrans);

        getNameId.appendChild(NameText);
        getCatId.appendChild(catText);
        getMrtId.appendChild(mrtText);
        getDesId.appendChild(DesText);
        getAddrId.appendChild(AddrText);
        getTransId.appendChild(TransText);

        for(let i = 0; i < fetchPicsLength; i++){

            let fetchPics = data['images'][i];
            let getPicsAreaId = document.getElementById('picsArea');
            let getSlideDotsId =document.getElementById('slideDots');

            let renderPics = document.createElement('img');
            let dots = document.createElement('input')

            renderPics.setAttribute('id', "pic"+i)
            renderPics.setAttribute('style', "z-index:{zIndex};".format({zIndex:99-i}));
            renderPics.setAttribute('src', fetchPics)
            dots.setAttribute('id', "dot"+i)
            dots.setAttribute('type', "radio")
            dots.setAttribute('name', "slideDots")
            getSlideDotsId.appendChild(dots)
            getPicsAreaId.appendChild(renderPics)
        };
        document.getElementById("pic0").style.opacity = 1;
        document.getElementById("dot0").checked = true;

    })
};

slider();


