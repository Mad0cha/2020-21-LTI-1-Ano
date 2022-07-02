// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

// ###############################################################################
//                              CONSTANTES                                       #
// ###############################################################################

/** Botão para ash */
const BOTAO_ASH = "ash";

/** Botão para misty */
const BOTAO_MISTY = "misty";

/** Seta para retroceder */
const SETA_RETROCEDER = "seta";

/** Botão de informação do ash */
const MAIS_ASH = "maisInfoA";

/** Botão de informação da misty */
const MAIS_MISTY = "maisInfoM";

/** Imagem do ash */
const IMG_ASH = "ashImg";

/** Imagem do ash */
const IMG_MISTY = "mistyImg";


// ###############################################################################
//                            VARIÁVEIS GLOBAIS                                  #
// ###############################################################################

let botaoTreinador = null;

// ###############################################################################
//                                   FUNÇÕES                                     #
// ###############################################################################

window.addEventListener("load", principal);

/** 
 * Função que chama a função que cria os evetos para os botões da página
 */
function principal(){
  criaEventListeners();  
}

/** 
 * Função que regista a escolha do treinador, colocando-a no local storage.
 * Muda ainda a página para a seguinte.
 * @param id , indica o id do botão 
 */
function escolheTreinador(id){
  let somBotao = new Audio('sounds/botao1.wav'); // Botões principais

  registaTreinador(document.getElementById(id).value); 
  trataTreinador(document.getElementById(id).value); 
  continua(somBotao, DIFICULDADES);
}

/** 
 * Função que cria os evetos para os botões da página
 */
function criaEventListeners() {
  let somBotao2 = new Audio('sounds/botao.wav'); // Botões secundários

  document.getElementById(SETA_RETROCEDER).addEventListener("click", retrocede); 

  document.getElementById(BOTAO_ASH).addEventListener("click", function(){ escolheTreinador(BOTAO_ASH) }); 
  document.getElementById(BOTAO_MISTY).addEventListener("click", function(){ escolheTreinador(BOTAO_MISTY) });
  
  document.getElementById(IMG_ASH).addEventListener("click", function(){ escolheTreinador(BOTAO_ASH) }); 
  document.getElementById(IMG_MISTY).addEventListener("click", function(){ escolheTreinador(BOTAO_MISTY) }); 


  document.getElementById(MAIS_ASH).addEventListener("click", function(){continua(somBotao2, ASH);}); 
  document.getElementById(MAIS_MISTY).addEventListener("click", function(){continua(somBotao2, MISTY);}); 

}

/**
 * Função que regista que botão foi clicado associando o botão clicado a um treinador
 * @param {string} treinador_escolhido Treinador que foi escolhido
 * @returns {string} o Treinador escolhido pelo utilizador    
 */
function registaTreinador(treinador_escolhido){
  
    botaoTreinador = treinador_escolhido;

    return botaoTreinador
}

/**
 * Função que regista no local storage que Treinador foi escolhido pelo utilizador
 * @param {string} treinador_escolhido Treinador escolhido pelo utilizador
 */
function trataTreinador(treinador_escolhido){

    let dados = registaTreinador(treinador_escolhido);

    localStorage.setItem("treinador", dados);

}


