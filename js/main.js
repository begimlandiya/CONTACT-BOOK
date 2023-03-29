let inpName = document.querySelector("#name")
let inpPhone = document.querySelector("#phone")
let inpImage = document.querySelector("#img")
let form = document.querySelector("form")
let ul = document.querySelector("ul")
checkKey();



// ! ----- create -----
// ? проверка инпутов на заполененность
form.addEventListener("submit",(event)=>{
event.preventDefault();
if(!inpName.value || !inpImage.value || !inpPhone.value){
    alert("Заполните поле!")
    return
}
    
let obj = {name: inpName.value, tel: inpPhone.value, img: inpImage.value};
// console.log(obj);
let data = JSON.parse(localStorage.getItem("info-data") || "[]");
data.push(obj);
localStorage.setItem("info-data", JSON.stringify(data))
inpName.value = "";
inpPhone.value = "";
inpImage.value = "";
    checkKey();
})

// ! ============================================================================

// !  ----------- Read ------------
function checkKey(){
  if(!localStorage.getItem("info-data")){
    // проверка на наличие ключа в localStorage
    localStorage.setItem("info-data", "[]")}
    let data = JSON.parse(localStorage.getItem("info-data"));

    ul.innerHTML = "";
    data.forEach((i, index) => {
        console.log(i);
    ul.innerHTML += `
    <li>
      ${i.name}
      <span id="tel">
      ${i.tel}</span>
      <img id="imgUl" src="${i.img}" alt="${i.name}"/>
      
      <button id="btnDel" onclick="deleteTask(${index})">delete</button>
      <button id="btnEd" onclick="editTask(${index})">Edit</button>
    </li> `;
  });
}
// !===========================================================================

// ! Edit- изменение 
// стягиваем из html следующие элементы
let modal = document.querySelector(".modal");
let inputName = document.querySelector("#inpName")
let inputContact = document.querySelector("#inpContact")
let inputImg = document.querySelector("#inpImg")
let btnSave = document.querySelector("#btnsave");
let btnClose = document.querySelector("#btnclose");

// функция Edit принимает индекс обьекта , который надо изменить,в виде аргумента
function editTask(index) {
  modal.style.display = "block";
  // стягиваем данные с localStorage для изменения определенног обьекта  
  let data = JSON.parse(localStorage.getItem("info-data"))
  // изменияем значения input, который будет содержать старое значение 
  inputName.value = data[index].name;
  inputName.setAttribute("id", index)

  inputContact.value = data[index].tel;
  inputContact.setAttribute("id", index)

  inputImg.value = data[index].img;
  inputImg.setAttribute("id", index)
}

// закрытие модального окна при нажатии на кнопку 
btnClose.addEventListener("click", ()=>{
  modal.style.display = "none"
})


// ? ========= ЗДЕСЬ НЕ РАБОТАЕТ !!!
//сохранения измененного обьекта 
btnSave.addEventListener("click", ()=>{
  let id = inputName.id;
  // let id = inputContact.id;
  // let id = inputImg.id;
  // стягиваем данные с localStorage
  let data = JSON.parse(localStorage.getItem("info-data"));
  // формирование обьекта, который мы хотим поместить вместо старого 
  let newObj = {
    name: inputName.value,
    tel: inputContact.value,
    img: inputImg.value,
  };
  // добавляем новый обьект через метод splice , который принимает индекс старого (удаляемого обьекта ), кол-во удоляемых обьектов и новый добавляемый обьект 
  data.splice(id,1, newObj);
  // кладем данные в localStorage
  localStorage.setItem("info-data",JSON.stringify(data));
  // закрываем модалку 
  modal.style.display = "none"
  // обновление списка
checkKey();
});
// ?======================
// !=============================================================================

// ! Delete - удаление 
function deleteTask(index) {
let data = JSON.parse(localStorage.getItem("info-data"));
 data.splice(index, 1);
  localStorage.setItem("info-data", JSON.stringify(data));
  checkKey();
}