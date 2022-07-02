"use strict";

// ###############################################################################
//                                 CONSTANTES                                    #
// ###############################################################################

// botão para começar. 
const BOTAO_COMECAR = "comecar";


// ###############################################################################
//                                  FUNÇÕES                                      #
// ###############################################################################

window.addEventListener("load", principal);



function principal(){
    

    // criaEventListeners();
    localStorage.setItem("volumeMusica", 1)
    localStorage.setItem("volumeSom", 1)

    document.getElementById(BOTAO_COMECAR).addEventListener("click", function(){continua(somBotao, FORMULARIO)});
}
  
// function criaEventListeners(){

//     let somBotao = new Audio('sounds/botao1.wav'); // Botões principais
//     let somBotao2 = new Audio('sounds/botao.wav'); // Botões secundários
   
//     document.getElementById(BOTAO_DEFINICOES).addEventListener("click", function(){continua(somBotao2, DEFINICOES)});  
//     document.getElementById(BOTAO_POKEDEX).addEventListener("click", function(){continua(somBotao2, POKEDEX)});
//     document.getElementById(BOTAO_CRIADORES).addEventListener("click", function(){continua(somBotao2, CRIADORES)});
//     document.getElementById(BOTAO_INSTRUCOES).addEventListener("click", function(){continua(somBotao2, INSTRUCOES)});
//     document.getElementById(BOTAO_INDEX).addEventListener("click", function(){continua(somBotao2, INDEX)});
//     document.getElementById(BOTAO_ABRE_MENU).addEventListener("click", function(){abrirMenuNavegacao(); play(somBotao2, "som")});

//     document.getElementById(BOTAO_COMECAR).addEventListener("click", function(){continua(somBotao, FORMULARIO)});
// }


