const userMenuBtn = document.querySelector('#user-menu-button');
const dropDownMenu = document.querySelector('#dropdown-menu');

userMenuBtn.addEventListener('click', function(){
  if(dropDownMenu.classList.contains('hidden')){
    dropDownMenu.classList.remove('hidden')
    dropDownMenu.classList.add('block');

  }else{
    dropDownMenu.classList.remove('block')
    dropDownMenu.classList.add('hidden');
  }
})

