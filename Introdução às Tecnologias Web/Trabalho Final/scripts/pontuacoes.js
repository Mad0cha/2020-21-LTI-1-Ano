// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

// ###############################################################################
//                              CONSTANTES                                       #
// ###############################################################################

/** Item de local storage que guarda os valores que estão na tabela. */
const VALORES_TABELA = "valoresTabela";

/** Identificador da tabela que contém as pontuações. */
const TABELA = "tabela";

// ###############################################################################
//                            VARIÁVEIS GLOBAIS                                  #
// ###############################################################################

// Array que recebe e guarda os dados do localStorage
let informacoes = [];

// ###############################################################################
//                            CONSTRUTOR DE OBJETOS                              #
// ###############################################################################

/**
 * Construtor de um objeto com as informações a inserir na tabela  
 * @param {string} nome Username do utilizador
 * @param {string} tempo Tempo que demorou a completar o jogo
 * @param {string} dificuldade Dificuldade que foi jogada
 */
function Pontuacao(nome, tempo, dificuldade){
    this.nome = nome;
    this.tempo = tempo;
    this.dificuldade = dificuldade;
}

// ###############################################################################
//                                   FUNÇÕES                                     #
// ###############################################################################

window.addEventListener("load", principal);


/**
 * Função principal que é executada ao fim do carregamento da página, esta cria as variáveis 
 * com o username, o tempo e a dificuldade. Chama também a função carregaTabela(), gravaDados()
 * e desenhaTabela()
 */
function principal(){

    let informacoesUsername = JSON.parse(localStorage.getItem("ItensHistorico")) || []; // Carrega do localStorage as informações do username (e-mail e username)
    let nome = informacoesUsername[informacoesUsername["length"] - 1]["username"]; 
    let tempoBatalha = JSON.parse(localStorage.getItem("temporizadorBatalha")) || [];
    let tempoTabuleiro = JSON.parse(localStorage.getItem("temporizadorTabuleiro")) || [];
    let tempo = tempoBatalha.concat(tempoTabuleiro);
    tempo = converteTempo(tempo);
    let dificuldade = localStorage.getItem("dificuldade"); 
    let resultado = localStorage.getItem("resultado");
    let derrota = "Derrota";
    let novosDados = null;
    informacoes = carregaTabela();  

    if (resultado == 0){
        novosDados = new Pontuacao(nome, tempo, dificuldade);
    }
    else{
        novosDados = new Pontuacao(nome, derrota, dificuldade);
    }

    informacoes.unshift(novosDados);

    if (informacoes.length <= 8){
        gravaDados();
        desenhaTabela();
    }
    else{
        informacoes.pop();
        gravaDados();
        desenhaTabela();
    }

}

/**
 * Função que carrega do localStorage a key = "valoresTabela"
 */
 function carregaTabela(){

    return JSON.parse(localStorage.getItem(VALORES_TABELA)) || []; 
}

/**
 * Função que desenha a tabela.
 */
function desenhaTabela(){

    let tabela = document.getElementById(TABELA);

    let linhaTabela = document.createElement("tr");
    linhaTabela.innerHTML = "<th>Username</th>" +
                            "<th>Tempo</th>" +
                            "<th>Dificuldade</th>" ;
    tabela.appendChild(linhaTabela);

    for (let linha of informacoes){
        linhaTabela = document.createElement("tr");
        linhaTabela.innerHTML = "<td>" + linha.nome + "</td>" +
                                "<td>" + linha.tempo + "</td>" +
                                "<td>" + linha.dificuldade + "</td>";
        tabela.appendChild(linhaTabela);
    }

}

/**
 * Função que guarda os dados na localStorage
 */
function gravaDados() {

    localStorage.setItem(VALORES_TABELA, JSON.stringify(informacoes)); 

}

/**
 * Função que converte os segundos em "xx:xx"
 * @param {array} listaDeValores lista de valores que vêm da local storage
 * @returns O valor em formato xx:xx
 */
function converteTempo(listaDeValores){

    let soma = listaDeValores.reduce((x,y) => x + y, 0);

    let minutos = Math.floor((soma % 3600) / 60);
    let segundos = Math.floor(soma % 60);

    let resultado = null;

    if (minutos < 10 && segundos < 10){
        return "0" + minutos + ":" + "0" + segundos
    }
    else if (minutos < 10){
        return "0" + minutos + ":" + segundos
    }
    else if (segundos < 10){
        return minutos + ":" + "0" + segundos
    }
    else{
        return minutos + ":" + segundos
    }

}