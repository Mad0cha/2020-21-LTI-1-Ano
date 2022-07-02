// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

// ###############################################################################
//                                 CONSTANTES                                    #
// ###############################################################################

// representa a página das definições.
const DEFINICOES = "definicoes.html";

// representa a página da pokedex.
const POKEDEX = "pokedex.html";

// representa a página dos criadores.
const CRIADORES = "criadores.html";

// representa a página das instruções.
const INSTRUCOES = "instrucoes.html";

// representa a página do indice.
const INDEX = "index.html";

// representa a página do formulário.
const FORMULARIO = "formulario.html";

// representa a página da escolha dos treinadores.
const TREINADOR = "treinador.html";

// representa a página da escolha dos pokémons.
const POKEMONS = "pokemon.html";

// representa a página das dificuldades.
const DIFICULDADES = "dificuldades.html";

// representa a página do jogo.
const JOGO = "jogo.html";

// representa a página da batalha.
const BATALHA =  "batalha.html";

// representa a página das pontuações.
const PONTUACAO = "pontuacao.html";

// representa a página do pikachu.
const PIKA = "pikachu.html";

// representa a página do charmander.
const CHAR = "charmander.html";

// representa a página do bulbassaur.
const BULB = "bulbassaur.html";

// representa a página do squirtle.
const SQU = "squirtle.html";

// representa a página da eevee.
const EEV = "eevee.html";

// representa a página do charizard.
const CHRZ = "charizard.html";

// representa a página do lugia.
const LUG = "lugia.html";

// representa a página do ash.
const ASH = "ash.html";

// representa a página da misty.
const MISTY = "misty.html";


// // ###############################################################################
// //                                   BOTÕES                                      #
// // ###############################################################################


// botão para abrir a página das definições.
const BOTAO_DEFINICOES = "pagDef";

// botão para abrir a página da pokedex.
const BOTAO_POKEDEX = "pagPoke";

// botão para abrir a página dos criadores.
const BOTAO_CRIADORES = "pagCria";

// botão para abrir a página das instruções.
const BOTAO_INSTRUCOES = "pagIns";

// botão para abrir o indice. 
const BOTAO_INDEX = "pagHome";

// botão para abrir o menú de navegação.
const BOTAO_ABRE_MENU = "abreMenu";


// ###############################################################################
//                           CONTINUAR E MUDAR DE PÁGINA                         #
// ###############################################################################

/** Função que faz os botões tocarem o som e só depois redirecionarem para a página pretendida
 * @param {var} , variável com o som queremos que o botão toque
 * @param {var} , página para a qual se quer redirecionar
 */
function continua(som, pagina){
    play(som, "som");
    setTimeout( function(){window.location = pagina}, 450 );   
}


// ###############################################################################
//                                     SONS                                      #
// ###############################################################################

// SONS DOS POKÉMONS /////////////////////////////////////////////////////////////

let somPikachu = new Audio('sounds/pikachu.mp3');
let somBulbassaur = new Audio('sounds/bulbassaur.mp3');
let somSquirtle = new Audio('sounds/squirtle.mp3');
let somCharmander = new Audio('sounds/charmander.mp3');
let somEevee = new Audio('sounds/eevee.mp3');
let somLugia = new Audio('sounds/lugia.mp3');
let somCharizard = new Audio('sounds/charizard.mp3');

// SONS DOS BOTÕES ///////////////////////////////////////////////////////////////

let somBotao = new Audio('sounds/botao1.wav'); // Botões principais
let somBotao2 = new Audio('sounds/botao.wav'); // Botões secundários

// SONS DOS ATAQUES //////////////////////////////////////////////////////////////

let somAtaqueOponente = new Audio('sounds/ataqueOponente.mp3');
let somAtaqueJogador = new Audio('sounds/ataqueJogador.mp3');

// OUTROS ////////////////////////////////////////////////////////////////////////

let musicaObstaculo = new Audio('sounds/obstaculo.mp3'); 

// ###############################################################################
//                                    MÚSICA                                     #
// ###############################################################################

let musicaBatalha = new Audio('sounds/batalha.mp3'); // musica que toca durante a batalha
let musicaVitoria = new Audio('sounds/vitoria.mp3'); // musica que toca quando o utilizador vence
let musicaDerrota = new Audio('sounds/derrota.mp3'); // musica que toca quando o utilizador perde
let musicaFundo = new Audio('sounds/caminhada.mp3'); // musica de fundo
let musicaPokemon = new Audio('sounds/pokemon.mp3'); // musica que toca quando o utilizador encontra um pokémon

/**
 * Função que reproduz os sons pedidos
 * @param {string} som nome do som que se quer que toque
 */
 function play(som, tipo) {
  let audio = som;

  if (tipo =="musica"){
    audio.volume = parseFloat(localStorage.getItem("volumeMusica")); 
  }
  else{
    audio.volume = parseFloat(localStorage.getItem("volumeSom")); 
  }
 
  audio.play();
}

/**
 * Função que pausa os sons pedidos
 * @param {string} som nome do som que se quer que pare de tocar
 */
function pause(som) {
  let audio = som;
  audio.pause();
}


// ###############################################################################
//                              BARRA DE NAVEGAÇÃO                               #
// ###############################################################################

/**
 * Função que abre o menu de navegação
 */
function abrirMenuNavegacao() {

    let x = document.getElementById("nav_t");
    if (x.className === "nav_topo") {
        x.className += " responsivo";
    } else {
        x.className = "nav_topo";
    }

}

// ###############################################################################
//                               SETA DE RETROCEDER                              #
// ###############################################################################

/**
 * Função que retrocede quando se clica na seta 
 * @param {string} som nome do som que se quer que pare de tocar
 */
function retrocede() {

  play(somBotao2, "som");
  setTimeout( function(){window.history.back()}, 400 );  
}


// ###############################################################################
//                                   DEFINIÇÕES                                  #
// ###############################################################################

/**
 * Função que abre o menu das definições
 */
function abrir_definicoes() {
  document.getElementById("botao_definicoes").style.width = "100%";
}

/**
 * Função que fecha o menu das definições
 */
function fechar_definicoes() {
  document.getElementById("botao_definicoes").style.width = "0";
}


// ###############################################################################
//                                   OUTROS                                      #
// ###############################################################################

/** Função que escolhe aleatóriamente um elemento de uma lista
 *  @param {list} lista , lita com os elementos de onde se quer obter um aleatório  
 *  @returns {str} , string com o elemento escolhido da lista
*/
function aleatorio(lista){
  return lista[Math.floor(Math.random()*lista.length)];
}
