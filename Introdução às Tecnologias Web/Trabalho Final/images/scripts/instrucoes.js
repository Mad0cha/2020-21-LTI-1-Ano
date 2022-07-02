"use strict";

window.addEventListener("load", principal);

function principal(){ criaEventListeners(); }

function criaEventListeners(){
    
    let somBotao2 = new Audio('sounds/botao.wav'); // Botões secundários
   
    document.getElementById(BOTAO_DEFINICOES).addEventListener("click", function(){continua(somBotao2, DEFINICOES)});  
    document.getElementById(BOTAO_POKEDEX).addEventListener("click", function(){continua(somBotao2, POKEDEX)});
    document.getElementById(BOTAO_CRIADORES).addEventListener("click", function(){continua(somBotao2, CRIADORES)});
    document.getElementById(BOTAO_INSTRUCOES).addEventListener("click", function(){continua(somBotao2, INSTRUCOES)});
    document.getElementById(BOTAO_INDEX).addEventListener("click", function(){continua(somBotao2, INDEX)});
    document.getElementById(BOTAO_ABRE_MENU).addEventListener("click", function(){abrirMenuNavegacao(); play(somBotao2, "som")});
}

