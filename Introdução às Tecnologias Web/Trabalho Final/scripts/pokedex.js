// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

// ###############################################################################
//                               CONSTANTES                                      #
// ###############################################################################

/** Botão para pikachu */
const BOTAO_PIKACHU = "pika";

/** Botão para bulbassaur */
const BOTAO_BULBASSAUR = "bulba";

/** Botão para charmander */
const BOTAO_CHARMANDER = "char";

/** Botão para squirtle */
const BOTAO_SQUIRTLE = "squir";

/** Botão para eevee */
const BOTAO_EEVEE = "eev";

/** Botão para charizard */
const BOTAO_CHARIZARD = "chrz";

/** Botão para lugia */
const BOTAO_LUGIA = "lug";

/** Botão para ash */
const BOTAO_ASH = "ash";

/** Botão para misty */
const BOTAO_MISTY = "misty";

// ###############################################################################
//                                   FUNÇÕES                                     #
// ###############################################################################

window.addEventListener("load", criaEventListeners);

/** Função que cria os eventos para os botões da página
 * */
function criaEventListeners() {
  
  document.getElementById(BOTAO_PIKACHU).addEventListener("click", function(){
    continua(somBotao2, PIKA);
  }); 

  document.getElementById(BOTAO_BULBASSAUR).addEventListener("click", function(){
    continua(somBotao2, BULB);
  }); 

  document.getElementById(BOTAO_CHARMANDER).addEventListener("click", function(){
    continua(somBotao2, CHAR);
  }); 

  document.getElementById(BOTAO_SQUIRTLE).addEventListener("click", function(){
    continua(somBotao2, SQU);
  }); 

  document.getElementById(BOTAO_EEVEE).addEventListener("click", function(){
    continua(somBotao2, EEV);
  }); 

  document.getElementById(BOTAO_CHARIZARD).addEventListener("click", function(){
    continua(somBotao2, CHRZ);
  }); 

  document.getElementById(BOTAO_LUGIA).addEventListener("click", function(){
    continua(somBotao2, LUG);
  }); 

  document.getElementById(BOTAO_ASH).addEventListener("click", function(){
    continua(somBotao2, ASH);
  }); 

  document.getElementById(BOTAO_MISTY).addEventListener("click", function(){
    continua(somBotao2, MISTY);
  }); 
}



