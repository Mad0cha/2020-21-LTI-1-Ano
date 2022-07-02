// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

// ###############################################################################
//                              CONSTANTES                                       #
// ###############################################################################

// Identificador do botão para abrir as definições.
const BOTAO_ABRE_DEF = "botao_abrir";

// Identificador do botão para fechar as definições.
const BOTAO_FECHA_DEF = "botao_fechar" ; 

// Identificador do botão para continuar para batalha.
const BOTAO_CONTINUAR_BATALHA = "btnContinuarBatalha";

// Identificador do botão para continuar para o fim do jogo.
const BOTAO_FIM_JOGO = "btnContinuarFim";

// Identificador do botão para redirecionar para o menu principal.
const MENU_PRINCIPAL = "menuPrincipal";

// Identificador do alerta 1 
const ALERTA_1 = "alerta1";

// Identificador do alerta 2
const ALERTA_2 = "alerta2";

// ###############################################################################
//                            VARIÁVEIS GLOBAIS                                  #
// ###############################################################################

// DADOS PARA O JOGO VINDOS DO LOCAL STORAGE /////////////////////////////////////

// Pokémon escolhido pelo jogador
let pkmJogador = localStorage.getItem("pokemon");

// Treinador escolhido pelo jogador
let persJogador = localStorage.getItem("treinador");

// Dificuldade do jogo
let dificuldade = localStorage.getItem("dificuldade");

///// VARIÁVEIS PARA O TEMPORIZADOR //////////////////////////////////////////////

// variável que regista o tempo anterior que vem do localStorage
let tempoAnterior = null;

// array que guarda os tempos em que o utilizado esteve no tabuleiro
let tempTabuleiro = [];

// variável que conta serve de contador
let contador = 0;

// variavel que o resultado do contador
let resultado = null;

///// VARIÁVEIS PARA O TABULEIRO ////////////////////////////////////////////////

// Representa o tabuleiro
let tabuleiro = null;

// Representa uma linha do tabuleiro
let linha = null;

// Representa uma coluna do tabuleiro
let coluna = null;

// Representa uma célula do tabuleiro
let celula = null;

// Palavra que se quer escrever numa celula do tabuleiro
let palavra = null;

// Define a posição do jogador 
let posicaoJogador = {
    posicaoLinha: null,
    posicaoColuna: null
}

// Variáveis correspondentes ao evento "tecla pressionada"
let direitaPressionada = false;  // Seta direita
let esquerdaPressionada = false; // Seta Esquerda
let cimaPressionada = false;     // Seta Cima
let baixoPressionada = false;    // Seta Baixo

// Indica a existência de um obstáculo
let obstaculo = false;

//  Opções de pokemon a aparecer para a batalha 
let listaOponentes = null;

// Indica se o jogar está em movimento ou não 
let andar = false;

// Indica qual a última tecla pressionada pelo utilizador
let ultimaPressionada = null;

// indica quanto tempo de jogo passou
let tempoJogo = null; 

// ###############################################################################
//                             INICIALIZAÇÃO DO JOGO                             #
// ###############################################################################

window.addEventListener("load", iniciaJogo);

/** 
 * Função que chama as funções necessárias para inicializar
 */
function iniciaJogo(){

    criaEventListeners();

    verificaJogoIniciado();

    resultado = setInterval(temporizadorTabuleiro , 1000);
    tempoAnterior = JSON.parse(localStorage.getItem("temporizadorTabuleiro")) || []; 
    localStorage.setItem("temporizadorTabuleiro", JSON.stringify([])); 
}

/**
 * Funçaõ que define os event listeners
 */
function criaEventListeners() {

    let somBotao2 = new Audio('sounds/botao.wav'); // Botões secundários
    
    document.getElementById(BOTAO_FECHA_DEF).addEventListener("click", function(){fechar_definicoes(); play(somBotao2, "som")});
    document.getElementById(BOTAO_ABRE_DEF).addEventListener("click", function(){abrir_definicoes(); play(somBotao2, "som")});
  
    document.getElementById(BOTAO_CONTINUAR_BATALHA).addEventListener("click", function(){continua(somBotao2, BATALHA)});
    document.getElementById(BOTAO_FIM_JOGO).addEventListener("click", function(){continua(somBotao2, PONTUACAO)});

    document.getElementById(MENU_PRINCIPAL).addEventListener("click", function(){continua(somBotao2, INDEX)});

    
    let volumeMusica = null;
    let volumeSom = null;

    $(".escolheVolumeMusica").on("input", ".volume", function(ajustaVolume){  
        volumeMusica = $(ajustaVolume.currentTarget).val(); 
        localStorage.setItem("volumeMusica", volumeMusica/100); 
    });

    $(".escolheVolumeSom").on("input", ".volume", function(ajustaVolume){  
        volumeSom = $(ajustaVolume.currentTarget).val(); 
        localStorage.setItem("volumeSom", volumeSom/100); 
    });
  
  }


/** Função que verifica se o jogo já foi iniciado ou se está a ser iniciado pela 
 *  primeira vez e desenha um tabuleiro através da chamada da função desenhaTabuleiro()
 */
function verificaJogoIniciado(){

    let tabuleiroJogoAtual = localStorage.getItem("tabuleiroAtual");

    if(tabuleiroJogoAtual == "[]"){
        defineDificuldade(dificuldade);    
    }
    else{
        tabuleiro = JSON.parse(tabuleiroJogoAtual);
    }
    desenhaTabuleiro();

}

/** Função que escolhe o tabuleiro a ser desenhado consoante a dificuldade selecionada para 
 *  o jogo.
 *  @param {string} dificuldade - Dificuldade do jogo.
 */
function defineDificuldade(dificuldade){

    let listaOponentesFacil = ["pikachu", "squirtle", "eevee"];
    let listaOponentesMedio = ["pikachu", "bulbassaur", "charmander", "squirtle"];
    let listaOponentesDificil = ["pikachu","charmander", "charizard", "lugia"];
    
    if(dificuldade == "Facil"){
        let listaTabuleiros = 
        [
            [
                ["arvore_1", "arvore_2"  , "arvore_1", "arvore_1"  , "casa"    , "arvore_3", "arvore_1"  , "arvore_1", "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "pokemon" , "vazio"   , "vazio"     , "vazio"   , "arvore_3"],
                ["arvore_2", "vazio"     , "poca"    , "vazio"     , "vazio"   , "vazio"   , "vazio"     ,"vazio"    , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     ,"vazio"    , "arvore_2"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "arbustos"  ,"vazio"    , "arvore_3"],
                ["arvore_1", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     ,"vazio"    , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     ,"vazio"    , "arvore_1"],
                ["arvore_1", "vazio"     , "jogador" , "vazio"     , "vazio"   , "vazio"   , "vazio"     ,"vazio"    , "arvore_2"],
                ["arvore_2", "arvore_1"  , "arvore_3", "arvore_3"  , "arvore_1", "arvore_1", "arvore_1"  ,"arvore_1" , "arvore_3"],
            ],
            
            [
                ["arvore_1", "arvore_1"  , "arvore_3", "arvore_2"  , "casa"    , "arvore_1", "arvore_2"  , "arvore_1", "arvore_3"],
                ["arvore_2", "vazio"     , "vazio"   , "vazio"     , "pokemon" , "vazio"   , "arbustos_2", "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_3"],
                ["arvore_1", "vazio"     , "lagoce"  , "lagocd"    , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "lagobe"  , "lagobd"    , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_2", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "pedra"     , "vazio"   , "arvore_2"],
                ["arvore_1", "vazio"     , "jogador" , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_2", "arvore_1"  , "arvore_2", "arvore_3"  , "arvore_1", "arvore_1", "arvore_1"  , "arvore_1", "arvore_3"],
            ],
            
            [
                ["arvore_2", "arvore_1"  , "arvore_3", "arvore_3"  , "casa"    , "arvore_1", "arvore_1"  , "arvore_1", "arvore_2"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "pokemon" , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_3"],
                ["arvore_1", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "pedra"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_2", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_3", "arbustos_2", "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_2", "vazio"     , "jogador" , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_1", "arvore_2"  , "arvore_2", "arvore_3"  , "arvore_3", "arvore_1", "arvore_3"  , "arvore_1", "arvore_2"],
            ],
        ];

        tabuleiro = listaTabuleiros[Math.floor(Math.random()*listaTabuleiros.length)];
        listaOponentes = localStorage.setItem("listaOponentes", JSON.stringify(listaOponentesFacil));
    }
    else if(dificuldade == "Medio"){
        let listaTabuleiros = 
        [
            [
                ["arvore_1", "arvore_2"  , "arvore_1", "casa_2"    , "arvore_1", "arvore_3", "arvore_1"  , "arvore_1", "arvore_1"],
                ["arvore_3", "lagoce"    , "lagocd"  , "pokemon"   , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_3"],
                ["arvore_2", "lagobe"    , "lagobd"  , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "arbustos", "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "pokemon" , "arvore_2"  , "vazio"   , "arvore_3"],
                ["arvore_1", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_1", "vazio"     , "jogador" , "vazio"     , "pedra"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_2", "arvore_1"  , "arvore_3", "arvore_3"  , "arvore_1", "arvore_1", "arvore_1"  , "arvore_1", "arvore_3"],
            ],
            
            [
                ["arvore_1", "arvore_1"  , "arvore_3", "casa_2"    , "arvore_2", "arvore_1", "arvore_2"  , "arvore_1", "arvore_3"],
                ["arvore_2", "vazio"     , "vazio"   , "pokemon"   , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_3", "pedra"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_3"],
                ["arvore_1", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "poca"      , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_2", "vazio"     , "vazio"   , "arbustos_2", "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "pokemon" , "arvore_3", "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_1", "vazio"     , "jogador" , "vazio"     , "vazio"   , "vazio"   , "vazio"     ,"vazio"    , "arvore_2"],
                ["arvore_2", "arvore_1"  , "arvore_2", "arvore_3"  , "arvore_1", "arvore_1", "arvore_1"  , "arvore_1", "arvore_3"],
            ],
            
            
            [
                ["arvore_2", "arvore_1"  , "arvore_3", "casa_2"    , "arvore_1", "arvore_1", "arvore_1"  , "arvore_1", "arvore_2"],
                ["arvore_3", "vazio"     , "vazio"   , "pokemon"   , "vazio"   , "lagoce"  , "lagocd"    , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "lagobe"  , "lagobd"    , "vazio"   , "arvore_3"],
                ["arvore_1", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_2", "vazio"     , "vazio"   , "pedra"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "arbustos", "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "pokemon" , "vazio"   , "arvore_1"  , "vazio"   , "arvore_1"],
                ["arvore_2", "vazio"     , "jogador" , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_1", "arvore_2"  , "arvore_2", "arvore_3"  , "arvore_3", "arvore_1", "arvore_3"  , "arvore_1", "arvore_2"],
            ],
        ];

        tabuleiro = listaTabuleiros[Math.floor(Math.random()*listaTabuleiros.length)];
        listaOponentes = localStorage.setItem("listaOponentes", JSON.stringify(listaOponentesMedio));
    }
    else if(dificuldade == "Dificil"){
        let listaTabuleiros = 
        [
            [
                ["arvore_1", "arvore_2"  , "arvore_1", "casa_3"    , "arvore_1", "arvore_3", "arvore_1"  , "arvore_1", "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "pokemon"   , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_3"],
                ["arvore_2", "vazio"     , "vazio"   , "pedra"     , "vazio"   , "vazio"   , "vazio"     ,"vazio"    , "arvore_1"],
                ["arvore_3", "vazio"     , "arbustos", "vazio"     , "lagoce"  , "lagocd"  , "vazio"     ,"vazio"    , "arvore_2"],
                ["arvore_3", "vazio"     , "vazio"   , "pokemon"   , "lagobe"  , "lagobd"  , "arbustos_2","pokemon"  , "arvore_3"],
                ["arvore_1", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     ,"vazio"    , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "arvore_1"  ,"vazio"    , "arvore_1"],
                ["arvore_1", "poca"      , "jogador" , "vazio"     , "pedra"   , "vazio"   , "vazio"     ,"vazio"    , "arvore_2"],
                ["arvore_2", "arvore_1"  , "arvore_3", "arvore_3"  , "arvore_1", "arvore_1", "arvore_1"  ,"arvore_1" , "arvore_3"],
            ],
            
            [
                ["arvore_1", "arvore_1"  , "arvore_3", "casa_3"    , "arvore_2", "arvore_1", "arvore_2"  , "arvore_1", "arvore_3"],
                ["arvore_2", "vazio"     , "vazio"   , "pokemon"   , "vazio"   , "vazio"   , "arbustos_2", "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "arvore_3", "vazio"     , "vazio"   , "arvore_3"],
                ["arvore_1", "vazio"     , "pedra"   , "vazio"     , "vazio"   , "vazio"   , "arvore_1"  , "pokemon" , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "arbustos"  , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_2", "lagoce"    , "lagocd"  , "vazio"     , "vazio"   , "pokemon" , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_3", "lagobe"    , "lagobd"  , "vazio"     , "vazio"   , "vazio"   , "pedra"     , "vazio"   , "arvore_2"],
                ["arvore_1", "vazio"     , "jogador" , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_2", "arvore_1"  , "arvore_2", "arvore_3"  , "arvore_1", "arvore_1", "arvore_1"  , "arvore_1", "arvore_3"],
            ],
            
            
            [
                ["arvore_2", "arvore_1"  , "arvore_3", "casa_3"    , "arvore_1", "arvore_1", "arvore_1"  , "arvore_1", "arvore_2"],
                ["arvore_3", "vazio"     , "vazio"   , "pokemon"   , "vazio"   , "vazio"   , "arbustos_2", "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "pokemon" , "vazio"     , "vazio"   , "arvore_3"],
                ["arvore_1", "vazio"     , "arbustos", "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_2", "poca"      , "vazio"   , "vazio"     , "pokemon" , "lagoce"  , "lagocd"    , "vazio"   , "arvore_1"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "lagobe"  , "lagobd"    , "vazio"   , "arvore_2"],
                ["arvore_3", "vazio"     , "vazio"   , "vazio"     , "vazio"   , "vazio"   , "vazio"     , "vazio"   , "arvore_1"],
                ["arvore_2", "vazio"     , "jogador" , "vazio"     , "vazio"   , "pedra"   , "vazio"     , "vazio"   , "arvore_2"],
                ["arvore_1", "arvore_2"  , "arvore_2", "arvore_3"  , "arvore_3", "arvore_1", "arvore_3"  , "arvore_1", "arvore_2"],
            ],
        ];

        tabuleiro = listaTabuleiros[Math.floor(Math.random()*listaTabuleiros.length)];
        listaOponentes = localStorage.setItem("listaOponentes", JSON.stringify(listaOponentesDificil)); 
    }
}

/** 
 * Função que desenha no documento HTML o tabuleiro criado em "tabuleiro" 
 */
function desenhaTabuleiro() {
    for (linha = 0; linha < tabuleiro.length; linha++) {
        for (coluna = 0; coluna < tabuleiro[linha].length; coluna++) {

            celula = document.getElementById("" + linha + coluna);

            if(tabuleiro[linha][coluna] == "jogador"){
                // Vê qual o personagem do jogador
                if (persJogador == "ash"){
                    celula.style.background = "url('images/ash_cima.png') no-repeat";
                }
                else{
                    celula.style.background = "url('images/misty_cima.png') no-repeat";
                }
                // Atualiza a posição do jogador no tabuleiro
                posicaoJogador.posicaoLinha = linha
                posicaoJogador.posicaoColuna = coluna
            }
            else if(tabuleiro[linha][coluna] == "vazio"){ celula.style.background = "url('images/vazio_final.png') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "arvore_1"){ celula.style.background = "url('images/arvore_1.png') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "arvore_2"){ celula.style.background = "url('images/arvore_2.png') no-repeat";}
            else if(tabuleiro[linha][coluna] == "arvore_3"){ celula.style.background = "url('images/arvore_3.png') no-repeat";}
            else if(tabuleiro[linha][coluna] == "pedra"){ celula.style.background = "url('images/pedra.png') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "poca"){ celula.style.background = "url('images/poca.gif') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "lagoce"){ celula.style.background = "url('images/lagoce.gif') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "lagocd"){ celula.style.background = "url('images/lagocd.gif') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "lagobe"){ celula.style.background = "url('images/lagobe.gif') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "lagobd"){ celula.style.background = "url('images/lagobd.gif') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "arbustos"){ celula.style.background = "url('images/arbustos.png') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "arbustos_2"){ celula.style.background = "url('images/arbustos_2.png') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "casa"){ celula.style.background = "url('images/casa.png') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "casa_2"){ celula.style.background = "url('images/casa_2.png') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "casa_3"){ celula.style.background = "url('images/casa_3.png') no-repeat"; }
            else if(tabuleiro[linha][coluna] == "pokemon"){ celula.style.background = "url('images/vazio_final.png') no-repeat"; }

        celula.style.backgroundSize = "auto 100%";
        }
    }
}

// ###############################################################################
//                               FUNÇÕES AUXILIARES                              #
// ###############################################################################

/** Função que apaga o que estiver escrito numa célula do tabuleiro
 * @param {number} l, indica a linha da celula que vai ser apagada do tabuleiro
 * @param {number} c, indica a coluna da celula que vai ser apagada do tabuleiro 
 */
function limpaCelula(l, c){
    tabuleiro[l][c] = "vazio";
}

/** Função que escreve numa célula do tabuleiro
 * @param {number} l, indica a linha da celula que vai ser apagada do tabuleiro
 * @param {number} c, indica a coluna da celula que vai ser apagada do tabuleiro
 * @param {string} palavra - nova palavra a ser escrita na célula 
 */
function escreveCelula(l, c, palavra){
    tabuleiro[l][c] = palavra;
}

/** Função que deteta coisas no tabuleiro (obstáculos, Pokémons, fim do jogo) */
function detetaNoTabuleiro(){

    detetaObstaculo(posicaoJogador.posicaoLinha,posicaoJogador.posicaoColuna);
    terminaJogo(posicaoJogador.posicaoLinha,posicaoJogador.posicaoColuna);
    encontraPokemon(posicaoJogador.posicaoLinha,posicaoJogador.posicaoColuna);

}

/** Função que faz o personagem andar no tabuleiro */
function mexePersonagem() {
    if(direitaPressionada) {
        posicaoJogador.posicaoColuna += 1; 
        detetaNoTabuleiro();
        posicaoJogador.posicaoColuna -= 1; 

        if (obstaculo){
            obstaculo = false;
        }
        else{
            limpaCelula(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna);
            posicaoJogador.posicaoColuna += 1;
        }

        if (persJogador == "ash"){
            trocarImagem(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, "url('images/ash_direita.gif') no-repeat");
        }
        else{
            trocarImagem(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, "url('images/misty_direita.gif') no-repeat");
        }
        escreveCelula(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, 'jogador_direita');
    }

    else if(esquerdaPressionada) {
        posicaoJogador.posicaoColuna -= 1; 
        detetaNoTabuleiro();
        posicaoJogador.posicaoColuna += 1;

        if (obstaculo){
            obstaculo = false;
        }
        else{
            limpaCelula(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna);
            posicaoJogador.posicaoColuna -= 1;
        }

        if (persJogador == "ash"){
            trocarImagem(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, "url('images/ash_esquerda.gif') no-repeat");
        }
        else{
            trocarImagem(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, "url('images/misty_esquerda.gif') no-repeat");
        }
        escreveCelula(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, 'jogador_esquerda');
    }

    else if(baixoPressionada) {
        posicaoJogador.posicaoLinha += 1; 
        detetaNoTabuleiro();
        posicaoJogador.posicaoLinha -= 1; 
        
        if (obstaculo){
            obstaculo = false;
        }
        else{
            limpaCelula(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna);
            posicaoJogador.posicaoLinha += 1;
        }

        if (persJogador == "ash"){
            trocarImagem(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, "url('images/ash_baixo.gif') no-repeat");
        }
        else{
            trocarImagem(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, "url('images/misty_baixo.gif') no-repeat");
        }
        escreveCelula(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, 'jogador_baixo'); 
    }

    else if(cimaPressionada) {
        posicaoJogador.posicaoLinha -= 1; 
        detetaNoTabuleiro();
        posicaoJogador.posicaoLinha += 1; 

        if (obstaculo){
            obstaculo = false;
        }
        else{
            limpaCelula(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna);
            posicaoJogador.posicaoLinha -= 1;
        }  

        if (persJogador == "ash"){
            trocarImagem(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, "url('images/ash_cima.gif') no-repeat");
        }
        else{
            trocarImagem(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, "url('images/misty_cima.gif') no-repeat");
        }
        escreveCelula(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, 'jogador_cima');
    } 
    desenhaTabuleiro();  
}

/** Função que atualiza a imagem para corresponder ao movimento do utilizador
 * @param {number} l, indica a linha da celula que vai ser apagada do tabuleiro
 * @param {number} c, indica a coluna da celula que vai ser apagada do tabuleiro 
 * @param {string} imagem, indicação da imagem para a qual se quer trocar 
 */
function trocarImagem(l, c, imagem){
    celula = document.getElementById("" + l + c);
    celula.style.background = imagem ;
    celula.style.backgroundSize = "auto 100%";
}

/** Função que faz com que a imagem demore um pouco a trocar
 * @param imagem , imagem para a qual se quer trocar 
 */

 function esperaParaTrocar(imagem){
    setTimeout(function() { trocarImagem(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, imagem); }, 300);
}

/**  Função que verifica a existência de obstáculos no tabuleiro. Atribui true às células que não podem ser pisadas 
 * @param {number} l, indica a linha da celula que vai ser apagada do tabuleiro
 * @param {number} c, indica a coluna da celula que vai ser apagada do tabuleiro 
 */
 function detetaObstaculo(l, c){

    if(tabuleiro[l][c] == "arvore_1" || tabuleiro[l][c] == "arvore_2" || tabuleiro[l][c] == "arvore_3" || tabuleiro[l][c] == "pedra" 
       || tabuleiro[l][c] == "arbustos" || tabuleiro[l][c] == "arbustos_2" || tabuleiro[l][c] == "poca"  || tabuleiro[l][c] == "lagoce" 
       || tabuleiro[l][c] == "lagocd" || tabuleiro[l][c] == "lagobe" || tabuleiro[l][c] == "lagobd" || tabuleiro[l][c] == "casa" ){
        
        obstaculo = true;
        play(musicaObstaculo, "som");
    }
}

/** Função que redireciona para a batalha quando encontra um pokemon 
 * @param {number} l, indica a linha da celula que vai ser apagada do tabuleiro
 * @param {number} c, indica a coluna da celula que vai ser apagada do tabuleiro 
 */

 function encontraPokemon(l,c){
    if (tabuleiro[l][c] == 'pokemon'){
        pause(musicaFundo);
        play(musicaPokemon, "musica");

        document.getElementById(ALERTA_1).style.display = "block";

        localStorage.setItem("adversario", escolhePokemonOponente(JSON.parse(localStorage.getItem("listaOponentes"))));

        limpaCelula(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna);
        escreveCelula(posicaoJogador.posicaoLinha, posicaoJogador.posicaoColuna, 'jogador');

        for (linha = 0; linha < tabuleiro.length; linha++) {
            for (coluna = 0; coluna < tabuleiro[linha].length; coluna++) {

                if(tabuleiro[linha][coluna] == "jogador_cima" || tabuleiro[linha][coluna] == "jogador_baixo" 
                   || tabuleiro[linha][coluna] == "jogador_esquerda" || tabuleiro[linha][coluna] == "jogador_direita"){
                   
                    tabuleiro[linha][coluna] = "vazio";
                }
            }
        }

        localStorage.setItem("tabuleiroAtual", JSON.stringify(tabuleiro));
        paraTemporizador();
    }
}

/** Função que escolhe um Pokémon aleatório para ser enfrentado pelo jogador
 * @param {Array} listaOponentes, lista de possíveis oponentes dado o nivel de dificuldade escolhido 
 * @returns {String} String com o nome do oponente encontrado 
 */
function escolhePokemonOponente(listaOponentes){
    let oponenteAleatorio = aleatorio(listaOponentes);

    if(oponenteAleatorio == pkmJogador){
        oponenteAleatorio = aleatorio(listaOponentes);
    }
    return oponenteAleatorio
}


// ###############################################################################
//                         REAÇÃO A EVENTOS DO UTILIZADOR                        #
// ###############################################################################

// Eventos que esperam pelo pressionar e pelo soltar das teclas 
document.addEventListener('keydown', teclaPressionada);
document.addEventListener('keyup', teclaSolta);

/** Função que verifica qual a tecla que foi pressionada pelo utilizador
 * @param event , evento do teclado
 */ 

function teclaPressionada(event) {

    andar = true;
    play(musicaFundo, "musica");

    // Seta direita
    if(event.keyCode == 39) {
        direitaPressionada = true;
        ultimaPressionada = "direita";
    }
    // Seta Esquerda
    else if(event.keyCode == 37) {
        esquerdaPressionada = true;
        ultimaPressionada = "esquerda";
    }
    // Seta Baixo
    else if(event.keyCode == 40) {
        baixoPressionada = true;
        ultimaPressionada = "baixo";
    }
    // Seta Cima
    else if(event.keyCode == 38) {
        cimaPressionada = true;
        ultimaPressionada = "cima"; 
    }
    
    mexePersonagem();
    
}

/** 
 * Função que atualiza o estado das teclas
 */
function teclaSolta() {
    direitaPressionada = false;
    esquerdaPressionada = false;
    cimaPressionada = false;
    baixoPressionada = false;

    andar = false;

    if(andar == false && ultimaPressionada == "direita"){
        if (persJogador == "ash"){
            esperaParaTrocar("url('images/parado_dir_ash.png') no-repeat");
        }
        else{
            esperaParaTrocar("url('images/parado_dir_misty.png') no-repeat");
        } 
    }
    else if (andar == false && ultimaPressionada == "esquerda"){
        if (persJogador == "ash"){
            esperaParaTrocar("url('images/parado_esq_ash.png') no-repeat");
        }
        else{
            esperaParaTrocar("url('images/parado_esq_misty.png') no-repeat");
        }
    }
    else if (andar == false && ultimaPressionada == "baixo"){
        if (persJogador == "ash"){
            esperaParaTrocar("url('images/parado_baixo_ash.png') no-repeat");
        }
        else{
            esperaParaTrocar("url('images/parado_baixo_misty.png') no-repeat");
        }
    }
    else if (andar == false && ultimaPressionada == "cima"){
        if (persJogador == "ash"){
            esperaParaTrocar("url('images/parado_cima_ash.png') no-repeat");
        }
        else{
            esperaParaTrocar( "url('images/parado_cima_misty.png') no-repeat");
        }
    }
}

// ###############################################################################
//                                 TERMINA JOGO                                  #
// ###############################################################################

/** Função que termina o jogo e redireciona para as pontuações 
 * @param {number} l, indica a linha da celula que vai ser apagada do tabuleiro
 * @param {number} c, indica a coluna da celula que vai ser apagada do tabuleiro */

 function terminaJogo(l,c){
    if (tabuleiro[l][c] == 'casa' || tabuleiro[l][c] == 'casa_2'|| tabuleiro[l][c] == 'casa_3'){
        pause(musicaFundo,"musica");
        play(musicaVitoria,"musica");
        document.getElementById("alerta2").style.display = "block"; 
        paraTemporizador();
        localStorage.setItem("resultado", "0");
    }
}

// ###############################################################################
//                                 TEMPORIZADOR                                  #
// ###############################################################################

/**
 * Função que simula um contador de segundos
 */
function temporizadorTabuleiro(){

    contador++;

}

/**
 * Função que para o temporizador registando o valor acumulado na local Storage
 */
function paraTemporizador(){

    tempTabuleiro.unshift(contador);

    clearInterval(resultado);

    localStorage.setItem("temporizadorTabuleiro", JSON.stringify(tempTabuleiro.concat(tempoAnterior)));
}


