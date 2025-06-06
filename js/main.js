var siteNameInput=document.getElementById("siteName");
var websiteURLInput=document.getElementById("websiteURL");
var tableContentData=document.getElementById("tableContent");

var add=document.getElementById("add");
var update=document.getElementById("update");

var searchInput=document.getElementById("search");
var boxInfo=document.getElementById("box-info");


if(localStorage.getItem('webs')){
    var webList =JSON.parse(localStorage.getItem('webs'));
    disdata(webList);
}else{
    webList=[];
}



function addBook(){
    
    if(validateForm(siteNameInput)&& validateForm(websiteURLInput)){
        var web={
                name:siteNameInput.value,
                url:websiteURLInput.value,
            }
            webList.push(web);
            localStorage.setItem('webs' ,JSON.stringify(webList));
            cleardata();
            disdata(webList);
            boxInfo.classList.add("d-none");

    }else{
        boxInfo.classList.remove("d-none");
    }

}


function cleardata(){
    siteNameInput.value='';
    websiteURLInput.value='';
}

function disdata(arr){

    var caroona=` `;
    for(var i =0 ; i<arr.length;i++){
        caroona+=`
        
                <tr class="my-5">
                    <th>${i + 1}</th>
                    <th>${arr[i].name}</th>
                    <th>
                        <a class="btnVisit" href="${arr[i].url}" target="_blank">
                            <i class="fa-solid fa-eye pe-2"></i> Visit
                        </a>
                    </th>
                    <th>
                        <a class="btnUpdate" onclick="updateform(${i})">
                            <i class="fa-solid fa-pen"></i> Update
                        </a>
                    </th>
                    <th><a onclick="deleteData(${i})" class="btnDelete"><i class="fa-solid fa-trash-can"></i> Delete</a></th>
                </tr>
        `
    }

    tableContentData.innerHTML=caroona;
}

function deleteData(deleteIndex){
    webList.splice(deleteIndex,1);
    localStorage.setItem('webs' ,JSON.stringify(webList));
    disdata(webList);
    

}

var currentUpdateIndex = null;
function updateform(updateIndex){


    siteNameInput.value=webList[updateIndex].name;
    websiteURLInput.value=webList[updateIndex].url;

    currentUpdateIndex=updateIndex;
    update.classList.remove('d-none');
    add.classList.add('d-none');

}




function getUpdate(){
    if(validateForm(siteNameInput)&&validateForm(websiteURLInput)){
        var updatedWeb = {
            name:siteNameInput.value,
            url:websiteURLInput.value,
    }
    webList[currentUpdateIndex] = updatedWeb;
    localStorage.setItem('webs', JSON.stringify(webList));

    cleardata();

    disdata(webList);
    update.classList.add('d-none');
    add.classList.remove('d-none');
    currentUpdateIndex = null;
    boxInfo.classList.add("d-none");

    }
    else{
        boxInfo.classList.remove("d-none");

    }
}




function search(){
    var searchResult=[];
    for (var i = 0; i < webList.length; i++) {
        if(webList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
            searchResult.push(webList[i])
        }
        
    }
    disdata(searchResult);    
    
}



function validateForm(element) {
    var regex = {
        siteName: /^[\u0600-\u06FF\w\s]{3,50}$/i,
        websiteURL: /^https:\/\/[\w\-\.]+\.[a-z]{2,}(\/[\w\-\.]*)*\/?$/i
    };

    var val = regex[element.id].test(element.value);

    if (val) {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        element.nextElementSibling.classList.add("d-none");
        return true;
    }
    else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.remove("d-none");

        return false;


    }

}

