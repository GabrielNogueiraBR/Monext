/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
let teste = 1;

function atualizaController(teste) {
  $('.testeController').text(teste);
}

$('.button-left').on('click', (event) => {
  teste -= 1;
  atualizaController(teste);
});

$('.button-big-left').on('click', (event) => {
  teste -= 2;
  atualizaController(teste);
});

$('.button-right').on('click', (event) => {
  teste += 1;
  atualizaController(teste);
});

$('.button-big-right').on('click', (event) => {
  teste += 2;
  atualizaController(teste);
});

$('.button-home').on('click', (event) => {
  teste *= 0;
  atualizaController(teste);
});
