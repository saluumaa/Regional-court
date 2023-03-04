const addNew = document.querySelectorAll('.add');
const view = document.querySelectorAll('.view');
const sectionOne = document.querySelector('.input-form');
const sectionTwo = document.querySelector('.output-data');

addNew.forEach((item) => {
  item.addEventListener('click', () => {
    sectionOne.classList.remove('hide');
    sectionTwo.classList.remove('show');
  });
});

view.forEach((item) => {
  item.addEventListener('click', () => {
    sectionOne.classList.add('hide');
    sectionTwo.classList.add('show');
  });
});