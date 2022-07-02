// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

// ###############################################################################
//                              CONSTANTES                                       #
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

/** Botão de informação do pikachu */
const MAIS_PIKACHU = "maisInfoP";

/** Botão de informação do bulbassaur */
const MAIS_BULBASSAUR = "maisInfoB";

/** Botão de informação do charmander */
const MAIS_CHARMANDER = "maisInfoC";

/** Botão de informação do squirtle */
const MAIS_SQUIRTLE = "maisInfoS";

/** Botão de informação da eevee */
const MAIS_EEVEE = "maisInfoE";

/** Seta para retroceder */
const SETA_RETROCEDER = "seta";

/** Imagem do pikachu*/
const IMG_PIKACHU = "pikaImg";

/** Imagem do bulbassaur */
const IMG_BULBASSAUR = "bulbaImg";

/** Imagem do charmander */
const IMG_CHARMANDER = "charImg";

/** Imagem do squirtle */
const IMG_SQUIRTLE = "squirImg";

/** Imagem da eevee */
const IMG_EEVEE = "eevImg";


// ###############################################################################
//                            VARIÁVEIS GLOBAIS                                  #
// ###############################################################################

let botaoPokemon = null;

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
 * Função que regista a escolha do pokémon, colocando-a no local storage.
 * Muda ainda a página para a seguinte.
 * @param id , indica o id do botão 
 */
function escolhePokemon(id){
  let somBotao = new Audio('sounds/botao1.wav'); // Botões principais

  registaPokemon(document.getElementById(id).value); 
  trataPokemons(document.getElementById(id).value); 
  continua(somBotao, TREINADOR);
}

function criaEventListeners() {
  let somBotao2 = new Audio('sounds/botao.wav'); // Botões secundários
  
  document.getElementById(SETA_RETROCEDER).addEventListener("click", retrocede); 
  document.getElementById(BOTAO_PIKACHU).addEventListener("click", function(){ escolhePokemon(BOTAO_PIKACHU); }); 
  document.getElementById(BOTAO_BULBASSAUR).addEventListener("click", function(){ escolhePokemon(BOTAO_BULBASSAUR); }); 
  document.getElementById(BOTAO_CHARMANDER).addEventListener("click", function(){ escolhePokemon(BOTAO_CHARMANDER); }); 
  document.getElementById(BOTAO_SQUIRTLE).addEventListener("click", function(){ escolhePokemon(BOTAO_SQUIRTLE); }); 
  document.getElementById(BOTAO_EEVEE).addEventListener("click", function(){ escolhePokemon(BOTAO_EEVEE); }); 

  document.getElementById(IMG_PIKACHU).addEventListener("click", function(){ escolhePokemon(BOTAO_PIKACHU); }); 
  document.getElementById(IMG_BULBASSAUR).addEventListener("click", function(){ escolhePokemon(BOTAO_BULBASSAUR); }); 
  document.getElementById(IMG_CHARMANDER).addEventListener("click", function(){ escolhePokemon(BOTAO_CHARMANDER); }); 
  document.getElementById(IMG_SQUIRTLE).addEventListener("click", function(){ escolhePokemon(BOTAO_SQUIRTLE); }); 
  document.getElementById(IMG_EEVEE).addEventListener("click", function(){ escolhePokemon(BOTAO_EEVEE); }); 

  document.getElementById(MAIS_PIKACHU).addEventListener("click", function(){continua(somBotao2, PIKA);}); 
  document.getElementById(MAIS_BULBASSAUR).addEventListener("click", function(){continua(somBotao2, BULB);}); 
  document.getElementById(MAIS_CHARMANDER).addEventListener("click", function(){continua(somBotao2, CHAR);}); 
  document.getElementById(MAIS_SQUIRTLE).addEventListener("click", function(){continua(somBotao2, SQU);}); 
  document.getElementById(MAIS_EEVEE).addEventListener("click", function(){continua(somBotao2, EEV);}); 

}

/**
 * Função que regista que botão foi clicado associando o botão clicado a um pokemon
 * @param {string} pokemon_escolhido Pokemon que foi escolhido
 * @returns {string} o pokémon escolhido pelo utilizador    
 */
function registaPokemon(pokemon_escolhido){

    botaoPokemon = pokemon_escolhido;
    
    return botaoPokemon
}

/**
 * Função que regista no local storage que Pokémon foi escolhido pelo utilizador
 * @param {string} pokemon_escolhido Pokemon escolhido pelo utilizador
 */
function trataPokemons(pokemon_escolhido){

    let dados = registaPokemon(pokemon_escolhido);

    localStorage.setItem("pokemon", dados);

}



