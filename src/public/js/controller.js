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

$('.button-right').on('click', (event) => {
  teste += 1;
  atualizaController(teste);
});
