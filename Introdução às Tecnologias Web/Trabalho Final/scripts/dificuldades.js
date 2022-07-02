// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

// ###############################################################################
//                              CONSTANTES                                       #
// ###############################################################################

/** Botão fácil */
const BOTAO_FACIL = "btnFacil";

/** Botão médio */
const BOTAO_MEDIO = "btnMedio";

/** Botão dificil */
const BOTAO_DIFICIL = "btnDificil";

/** Seta para retroceder */
const SETA_RETROCEDER = "seta";


// ###############################################################################
//                            VARIÁVEIS GLOBAIS                                  #
// ###############################################################################

let botaoDif = null;

// ###############################################################################
//                                   FUNÇÕES                                     #
// ###############################################################################

window.addEventListener("load", criaEventListeners);

/** 
 * Função que regista a escolha da dificuldade, colocando-a no local storage.
 * Limpa no local storage a informação relativa a jogos anteriores
 * Muda ainda a página para a seguinte.
 * @param id , indica o id do botão 
 */
function escolheDificuldade(id){

  let somBotao = new Audio('sounds/botao1.wav'); // Botões principais

  registaDificuldade(document.getElementById(id).value);
  trataDificuldades(document.getElementById(id).value);

  resetaTemporizadores(); 
  localStorage.setItem("tabuleiroAtual", '[]');
  localStorage.setItem("listaOponentes", '[]');

  continua(somBotao, JOGO);

}

/** 
 * Função que cria os evetos para os botões da página
 */
function criaEventListeners() {
  
  document.getElementById(SETA_RETROCEDER).addEventListener("click", retrocede); 

  document.getElementById(BOTAO_FACIL).addEventListener("click", function(){
    escolheDificuldade(BOTAO_FACIL);
  }); 

  document.getElementById(BOTAO_MEDIO).addEventListener("click", function(){
    escolheDificuldade(BOTAO_MEDIO);
  }); 

  document.getElementById(BOTAO_DIFICIL).addEventListener("click", function(){
    escolheDificuldade(BOTAO_DIFICIL);
  }); 
}

/**
 * Função que regista que botão foi clicado associando o botão clicado a uma 
 * dificuldade
 * @param {string} botao_clicado Pokemon que foi escolhido
 * @returns {string} o pokémon escolhido pelo utilizador    
 */
function registaDificuldade(botao_clicado){

    botaoDif = botao_clicado;

    return botaoDif

}

/**
 * Função que regista no local storage que dificuldade foi escolhida 
 * pelo utilizador
 * @param {string} botao_clicado Dificuldade escolhida pelo utilizador
 */
function trataDificuldades(botao_clicado){

    let dados = registaDificuldade(botao_clicado);

    localStorage.setItem("dificuldade", dados);

}

/**
 * Função que reseta os temporizadores.
 */
function resetaTemporizadores(){

    localStorage.setItem("temporizadorTabuleiro", JSON.stringify([]));
    localStorage.setItem("temporizadorBatalha", JSON.stringify([]));
    
}