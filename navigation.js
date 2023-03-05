const addNew = document.querySelectorAll('.add');
const view = document.querySelectorAll('.view');
const sectionOne = document.querySelector('.input-form');
const sectionTwo = document.querySelector('.output-data');

view.forEach((item) => {
  item.addEventListener('click', () => {
    sectionOne.classList.remove('show');
    sectionTwo.classList.remove('hide');
  });
});

addNew.forEach((item) => {
  item.addEventListener('click', () => {
    sectionOne.classList.add('show');
    sectionTwo.classList.add('hide');
  });
});