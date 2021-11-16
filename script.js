const addTaskForm = document.querySelector('#addTaskForm');
const listDOM = document.querySelector('#list');
const removeButton = document.querySelector('#remove-button');
let itemsArray = localStorage.getItem('todoArr') ? JSON.parse(localStorage.getItem('todoArr')) : [];
const alerDom = document.querySelector('#alert');

(function () {
    setList(itemsArray);

})();

addTaskForm.addEventListener('submit', function addNewElement(event) {
    event.preventDefault();
    const input = document.querySelector('#task'); 
    if(!input.value || (!input.value.trim())) {
        showToast('orange', 'Listeye boş item ekleyemezsiniz!'); 
        return
    }
    itemsArray.push(input.value);
    localStorage.setItem('todoArr', JSON.stringify(itemsArray));
    showToast('green', 'Listeye item eklendi'); 
    listDOM.innerHTML ="";
    setList(itemsArray);
    input.value = "";
    

});

 

function setList(arr){    
    arr.forEach((task, index) => {
        const liDOM = document.createElement('li');
        liDOM.id = 'list-item'
        if(index % 2 === 0){
            liDOM.style.backgroundColor = '#EDEAE0	'
        } else {
            liDOM.style.backgroundColor = '#FF9966'
        }
        liDOM.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        liDOM.innerHTML = `${task} 
            <span aria-hidden="true" class="close" id="${index}" role="button">&times;</span>`
        listDOM.appendChild(liDOM)  
    });
} 
   

listDOM.addEventListener('click', deleteListItem); 


function deleteListItem(e){ 
    const userChoice = document.getElementById(e.target.id);
    if(userChoice.classList[0] !== 'close') return
    const deleteID = e.target.id;
    itemsArray.splice(deleteID, 1);
    showToast('red', 'Listedeki item silindi.') 
    localStorage.setItem('todoArr', JSON.stringify(itemsArray));
    listDOM.innerHTML ="";
    setList(itemsArray);
}

removeButton.onclick= async () => {
    
    localStorage.clear();
      while (listDOM.firstChild) {
          listDOM.removeChild(listDOM   .firstChild); 
      }
    showToast('red', 'Tüm itemler silindi');  
}
 

function showToast(bgColor, text, textColor = "white") {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerText = text;
    x.style.backgroundColor = bgColor;
    x.style.color = textColor;
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
}