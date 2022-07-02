"use strict";

window.addEventListener("load", principal);

function principal(){ criaEventListeners(); }

function criaEventListeners(){

    let somBotao2 = new Audio('sounds/botao.wav'); // Botões secundários
   
    document.getElementById("pagDef").addEventListener("click", ()=> continua(somBotao2, definicoes));  
    document.getElementById("pagPoke").addEventListener("click", function(){continua(somBotao2, pokedex)});
    document.getElementById("pagCria").addEventListener("click", function(){continua(somBotao2, criadores)});
    document.getElementById("pagIns").addEventListener("click", function(){continua(somBotao2, instrucoes)});
    document.getElementById("pagHome").addEventListener("click", function(){continua(somBotao2, index)});
    document.getElementById("abreMenu").addEventListener("click", function(){abrirMenuNavegacao(); play(somBotao2, "som")});
}

// Falta meter bonito e isso e mudar os nomes mas está done