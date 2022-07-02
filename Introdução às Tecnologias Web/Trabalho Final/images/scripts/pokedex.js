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
//                            VARIÁVEIS GLOBAIS                                  #
// ###############################################################################




// ###############################################################################
//                                   FUNÇÕES                                     #
// ###############################################################################

window.addEventListener("load", criaEventListeners);

function criaEventListeners() {
  
  // let somBotao2 = new Audio('sounds/botao.wav'); // Botões secundários
   
  // document.getElementById("pagDef").addEventListener("click", ()=> continua(somBotao2, definicoes));  
  // document.getElementById("pagPoke").addEventListener("click", function(){continua(somBotao2, pokedex)});
  // document.getElementById("pagCria").addEventListener("click", function(){continua(somBotao2, criadores)});
  // document.getElementById("pagIns").addEventListener("click", function(){continua(somBotao2, instrucoes)});
  // document.getElementById("pagHome").addEventListener("click", function(){continua(somBotao2, index)});
  // document.getElementById("abreMenu").addEventListener("click", function(){abrirMenuNavegacao(); play(somBotao2, "som")});


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



