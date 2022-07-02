// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

// ###############################################################################
//                              CONSTANTES                                       #
// ###############################################################################

// Identificador do alerta 1 
const ALERTA_3 = "alerta3";

// Identificador do alerta 2
const ALERTA_4 = "alerta4";

// Id da vida do oponente 
const VIDA_OPONENTE = "vidaAdversario";

// Id da vida do jogador 
const VIDA_JOGADOR = "vidaJogador";

//  Id da mensagem que aparece jogada a jogada 
const MENSAGEM = "mensagem";

//  Id do nome do Pokémon do Oponente 
const NOME_OPONENTE = "nomeOponente" ;

//  Id do nome do Pokémon do Jogador
const NOME_JOGADOR = "nomeJogador";

//  ID da imagem do Jogador 
const IMG_JOGADOR = "imgJogador";

//  ID da imagem do Oponente 
const IMG_OPONENTE = "imgOponente";

// Identificador do botão para redirecionar para o menu principal.
const MENU_PRINCIPAL = "menuPrincipal";

// Identificadores dos 4 ataques 
const ATAQUE_0 = "ataque_0";
const ATAQUE_1 = "ataque_1";
const ATAQUE_2 = "ataque_2";
const ATAQUE_3 = "ataque_3";

// Identificador do ataque do oponente
const BOTAO_ATAQUE_OPONENTE = "botao_ataque";

// Identificador do botão para continuar para o fim do jogo.
const BOTAO_FIM_JOGO = "btnContinuarFim";

// Identificador do botão para continuar para tabuleiro.
const BOTAO_CONTINUAR_JOGO = "btnContinuarJogo";

// Identificador do botão para abrir as definições.
const BOTAO_ABRE_DEF = "botao_abrir";

// Identificador do botão para fechar as definições.
const BOTAO_FECHA_DEF = "botao_fechar" ; 


// ###############################################################################
//                            VARIÁVEIS GLOBAIS                                  #
// ###############################################################################

// Variável que guarda um array bidimensional com informações relevantes sobre os pokémons 
let Pokemons = [
  ['Pikachu', 5, 9, ["Choque Eletrico", "Trovao", "Ataque Rápido", "Ataque Especial"], 
                      'https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif', 
                      'https://img.pokemondb.net/sprites/black-white/anim/back-normal/pikachu.gif'],
  
  ['Bulbassaur', 3, 9, ["Folha Magica", "Bomba Sementes", "Ataque Peso", "Ataque Especial"],
                          'https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif',
                          'https://img.pokemondb.net/sprites/black-white/anim/back-normal/bulbasaur.gif'],
  
  ['Charmander', 5, 8, ["Bola de fogo","Soco de chamas","Mega Murro","Ataque Especial"],
                          'https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif',
                          'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charmander.gif'],
  
  ['Squirtle', 4, 8, ["Jato de Água", "Onda Mortal", "Pirueta Rápida", "Ataque Especial"],
                      'https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif',
                      'https://img.pokemondb.net/sprites/black-white/anim/back-normal/squirtle.gif'],
  
  ['Eevee', 2, 6, ["Esquiva", "Mordida", "Charme", "Ataque Especial"],
                  'https://img.pokemondb.net/sprites/black-white/anim/normal/eevee.gif',
                  'https://img.pokemondb.net/sprites/black-white/anim/back-normal/eevee.gif'],
  
  ['Charizard', 4, 11, ["Pirueta de Fogo", "Jato Ardente", "Mordida Mortal", "Ataque Especial"],
                          'https://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif',
                          'https://img.pokemondb.net/sprites/black-white/anim/back-normal/charizard.gif'],
                          
  ['Lugia', 4, 10, ["Ataque Aéreo", "Onda Psiquica", "Voo Fatal", "Ataque Especial"],
                      'https://img.pokemondb.net/sprites/black-white/anim/normal/lugia.gif',
                      'https://img.pokemondb.net/sprites/black-white/anim/back-normal/lugia.gif']
  
  ];


// Variável que busca ao local storage o pokemon escolhido pelo jogador 
let pkmJogador = localStorage.getItem("pokemon") ;

//  Objeto do pokemon do jogador 
let pokemonJogador = obtemInfoPokemon(pkmJogador);

//  Variável que busca ao local storage o pokemon gerado para o oponente 
let pkmOponente = localStorage.getItem("adversario");

//  Objeto do pokemon do oponente 
let pokemonOponente = obtemInfoPokemon(pkmOponente);

// Vida jogador 
let hpJogador = pokemonJogador.vida;
// Força Jogador 
let forcaJogador = pokemonJogador.forca;

/** Vida oponente*/
let hpOponente = pokemonOponente.vida;
/** Força oponente*/
let forcaOponente = pokemonOponente.forca;

//  Elemento HTML para as mensagens 
let mensagem = null;

//  Variável que define quem joga 
let jogada = null; 

// Variável que indica qual o ataque do jogador 
let jogadaUtilizador = null;

// Variável que contém a jogada que foi gerada para o oponente 
let jogadaAdversario = null;

///// VARIÁVEIS PARA O TEMPORIZADOR //////////////////////////////////////////////

// variável que regista o tempo anterior que vem do localStorage
let tempoAnterior = null;

// array que guarda os tempos em que o utilizado esteve no tabuleiro
let tempTabuleiro = [];

// array que guarda os tempos em que o utilizado esteve na batalha
let tempBatalha = [];

// variável que conta serve de contador
let contador = 0;

// variavel que o resultado do contador
let resultado = null;


// ###############################################################################
//                            CONSTRUTOR DE OBJETOS                              #
// ###############################################################################

/**
 * Construtor de um objeto com as informações do pokemon
 * 
 * @param {string} nome Nome do Pokémon
 * @param {string} forca Força do Pokémon
 * @param {string} vida Vida do Pokémon
 * @param {string} ataques Ataques do Pokémon
 * @param {string} gifFrente Gif da frente do Pokémon
 * @param {string} gifTras Gif de trás do Pokémon
 */
function Pokemon(nome, forca, vida, ataques ,gifFrente, gifTras){

    this.nome = nome;
    this.forca = forca;
    this.vida = vida;
    this.ataques = ataques;
    this.gifFrente = gifFrente;
    this.gifTras = gifTras;
  
}


// ###############################################################################
//                                   FUNÇÕES                                     #
// ###############################################################################


window.addEventListener("load", principal);

/**
 * Função principal que é executada ao fim do carregamento da página 
 * e que define a vida inicial do jogador e do oponente consoante os pokémons
 * e executa quatro funções, uma para começar o jogo, outra para spawnar o pokémon 
 * do jogador, outra para spawnar o pokémon oponente, outra que coloca os ataques do
 * jogador consoante o pokémon escolhido pelo mesmo e por fim uma que poe os nomes dos
 * pokémons.
 */
function principal(){

  let vidaInicalJogador = document.getElementById(VIDA_JOGADOR);
  let vidaInicialOponente = document.getElementById(VIDA_OPONENTE);

  vidaInicalJogador.innerHTML = hpJogador ;
  vidaInicialOponente.innerHTML = hpOponente;

  criaEventListeners();
  comeca();
  geraPokemon();
  geraAtaques();
  geraNomes();

 resultado = setInterval(temporizadorTabuleiro , 1000);
 tempoAnterior = JSON.parse(localStorage.getItem("temporizadorBatalha")) || []; 
 localStorage.setItem("temporizadorBatalha", JSON.stringify([])); 

}

/**
 * Função que define os event listeners
 */
function criaEventListeners() {
  let musicaBatalha = new Audio('sounds/batalha.mp3');
  let somBotao2 = new Audio('sounds/botao.wav'); // Botões secundários
  let somAtaqueOponente = new Audio('sounds/ataqueOponente.mp3');
  
  document.getElementById(BOTAO_FECHA_DEF).addEventListener("click", function(){fechar_definicoes(); play(somBotao2, "som")});
  document.getElementById(BOTAO_ABRE_DEF).addEventListener("click", function(){abrir_definicoes(); play(somBotao2, "som")});

  document.getElementById(BOTAO_CONTINUAR_JOGO).addEventListener("click", function(){continua(somBotao2, JOGO)});
  document.getElementById(BOTAO_FIM_JOGO).addEventListener("click", function(){continua(somBotao2, PONTUACAO)});

  document.getElementById(MENU_PRINCIPAL).addEventListener("click", function(){continua(somBotao2, INDEX)});

  document.getElementById(ATAQUE_0).addEventListener("click", function(){carregaBotaoJogador(0)});
  document.getElementById(ATAQUE_1).addEventListener("click", function(){carregaBotaoJogador(1)});
  document.getElementById(ATAQUE_2).addEventListener("click", function(){carregaBotaoJogador(2)});
  document.getElementById(ATAQUE_3).addEventListener("click", function(){carregaBotaoJogador(3)});

  document.getElementById(BOTAO_ATAQUE_OPONENTE).addEventListener("click", function(){
    jogadaOponente(pokemonOponente.nome); 
    ataqueOponente(); 
    play(musicaBatalha, "musica");
    play(somAtaqueOponente);
  });

      
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

/**
 * Função que simula o lançamento de dois dados
 * @returns {number} O valor do lançamento de dois dados
 */
function lancaDados(){

    let dado1 = Math.floor(Math.random() * 6 + 1);
    let dado2 = Math.floor(Math.random() * 6 + 1);
    return dado1 + dado2 

}

/**
 * Retorna um objeto com as informações do Pokémon
 * @param {string} nomePokemon Nome do Pokémon
 * @returns {object} Objeto com a informação detalhada do Pokémon 
 */
function obtemInfoPokemon(nomePokemon){
    let pokemon = null;
  
    if (nomePokemon === "pikachu"){
      pokemon = new Pokemon(Pokemons[0][0],
                            Pokemons[0][1],
                            Pokemons[0][2],
                            Pokemons[0][3],
                            Pokemons[0][4],
                            Pokemons[0][5])
  
      return pokemon
    }
  
    if (nomePokemon === "bulbassaur"){
      pokemon = new Pokemon(Pokemons[1][0],
                            Pokemons[1][1],
                            Pokemons[1][2],
                            Pokemons[1][3],
                            Pokemons[1][4],
                            Pokemons[1][5])
  
      return pokemon
    }
  
    if (nomePokemon === "charmander"){
      pokemon = new Pokemon(Pokemons[2][0],
                            Pokemons[2][1],
                            Pokemons[2][2],
                            Pokemons[2][3],
                            Pokemons[2][4],
                            Pokemons[2][5])
  
      return pokemon
    }
  
    if (nomePokemon === "squirtle"){
      pokemon = new Pokemon(Pokemons[3][0],
                            Pokemons[3][1],
                            Pokemons[3][2],
                            Pokemons[3][3],
                            Pokemons[3][4],
                            Pokemons[3][5])
  
      return pokemon
    }
  
    if (nomePokemon === "eevee"){
      pokemon = new Pokemon(Pokemons[4][0],
                            Pokemons[4][1],
                            Pokemons[4][2],
                            Pokemons[4][3],
                            Pokemons[4][4],
                            Pokemons[4][5])
  
      return pokemon
    }
  
    if (nomePokemon === "charizard"){
      pokemon = new Pokemon(Pokemons[5][0],
                            Pokemons[5][1],
                            Pokemons[5][2],
                            Pokemons[5][3],
                            Pokemons[5][4],
                            Pokemons[5][5])
  
      return pokemon
    }
  
    if (nomePokemon === "lugia"){
      pokemon = new Pokemon(Pokemons[6][0],
                            Pokemons[6][1],
                            Pokemons[6][2],
                            Pokemons[6][3],
                            Pokemons[6][4],
                            Pokemons[6][5])
  
      return pokemon
    }
  
}
  
/**
 * Função que gera o Gif do Pokémons no HTML
 */
function geraPokemon(){
  
    let divImagemJogador = document.getElementById(IMG_JOGADOR);
    divImagemJogador.style.background = "url("+ pokemonJogador.gifTras +") no-repeat";
    divImagemJogador.style.backgroundSize = "100%";


    let divImagemOponente = document.getElementById(IMG_OPONENTE);
    divImagemOponente.style.background = "url("+ pokemonOponente.gifFrente +") no-repeat";
    divImagemOponente.style.backgroundSize = "100%";

}

/**
 * Função que regista o ataque do jogador e assume qual foi o ataque usado. Reproduz o som do botão também
 * @param {number} indice , indice do ataque dentro da lista de ataques disponíveis para o pokémon do jogador
 */
 function carregaBotaoJogador(indice){
  let somAtaqueJogador = new Audio('sounds/ataqueJogador.mp3');

  registaAtaque(pokemonJogador.ataques[indice]); 
  ataqueJogador(); 
  play(somAtaqueJogador,"som");
  
}

/**
 * Função que adiciona ao HTML o nome dos ataques do Pokémon do jogador
 */
function geraAtaques(){
    
    ataque_0.innerHTML = pokemonJogador.ataques[0];
    ataque_1.innerHTML = pokemonJogador.ataques[1];
    ataque_2.innerHTML = pokemonJogador.ataques[2];
    ataque_3.innerHTML = pokemonJogador.ataques[3];
  
}
  
/**
 * Função que adiciona ao HTML o nome dos Pokémons, tanto do jogador como do oponente
 */
function geraNomes(){
  
    let nomeJog = document.getElementById(NOME_JOGADOR);
    nomeJog.innerHTML = pokemonJogador.nome;
  
    let nomeOpo = document.getElementById(NOME_OPONENTE);
    nomeOpo.innerHTML = pokemonOponente.nome;
  
}

/**
 * Função que define quem vai começar a jogar, atualizando a mensagem com as instruções
 * @returns {bool} Se retornar true é o utilizador a jogar, caso contrário se retornar
 * false é o oponente que começa
 */
function comeca(){

    mensagem = document.getElementById(MENSAGEM);

    if (forcaJogador >= forcaOponente){
        jogada = true;
        mensagem.innerHTML = "É a sua vez de jogar";

    }
    else{
        jogada = false;
        mensagem.innerHTML = pokemonOponente.nome + ' começa a jogar, escolha "Continuar"';
    }

    return jogada

}

/**
 * Função que atualiza a vida do Jogador
 * @param {number} dano Valor inteiro que vai ser retirado ao HP do jogador
 */
function atualizaVidaJogador(dano){

    let vidaJogador = document.getElementById(VIDA_JOGADOR);
  
    if (dano >= forcaJogador){
      hpJogador = hpJogador - 1;
      mensagem.innerHTML = pokemonOponente.nome + " usou " + jogadaAdversario + "!";
    }
    else{
      hpJogador = hpJogador;
      if(pokemonOponente.nome == "Eevee"){
        mensagem.innerHTML = "O ataque da " + pokemonOponente.nome + " falhou!";
      }
      else{
        mensagem.innerHTML = "O ataque do " + pokemonOponente.nome + " falhou!";
      }
    }
  
    vidaJogador.innerHTML = hpJogador;
  
    if (hpJogador == 0){
      pause(musicaBatalha);
      play(musicaDerrota, "musica");
      document.getElementById(ALERTA_4).style.display = "block"; 
      paraTemporizador();
      localStorage.setItem("resultado", 1);
    }    
  
}

/**
 * Função que atualiza a vida do Oponente
 * @param {number} dano Valor inteiro que vai ser retirado ao HP do oponente
 */
function atualizaVidaOponente(dano){

    let vidaOponente = document.getElementById(VIDA_OPONENTE);
  
    if (dano >= forcaOponente){
      hpOponente = hpOponente - 1;
      mensagem.innerHTML = pokemonJogador.nome + " usou " + jogadaUtilizador + "!";
    }
    else{
      hpOponente = hpOponente;

      if(pokemonJogador.nome == "Eevee"){
        mensagem.innerHTML = "O ataque da " + pokemonJogador.nome + " falhou!";
      }

      else{
        mensagem.innerHTML = "O ataque do " + pokemonJogador.nome + " falhou!";
      }
    }
  
    vidaOponente.innerHTML = hpOponente;
  
    if (hpOponente == 0){
      pause(musicaBatalha);
      play(musicaVitoria,"musica");
      document.getElementById(ALERTA_3).style.display = "block"; 
      paraTemporizador();
    }
  
}

/**
 * Função que regista o ataque do utilizador para ser utilizada na mensagem
 * @param {string} ataque_dado 
 * @returns {string} O ataque que foi dado
 */
function registaAtaque(ataque_dado){
    jogadaUtilizador = ataque_dado;
    return jogadaUtilizador
}

/**
 * Função que simula o ataque do jogador 
 */
function ataqueJogador(){

    if (jogada == true){
      let valorAtaque = lancaDados();
      atualizaVidaOponente(valorAtaque);
    } 
  
    jogada = false;
   
} 

/**
 * Função que simula o ataque do oponente atualizando a mensagem
 */
function ataqueOponente(){

    if (jogada == false){
      let valorAtaque = lancaDados();
      atualizaVidaJogador(valorAtaque);
    }
  
    jogada = true;
  
}

/**
 * Função que gera um ataque para o pokémon oponente atualizando a variável "ataqueAdversario"
 * para aparecer na mensagem
 * @param {string} adversario Nome do Pokémon do oponente
 * @returns {string} O ataque gerado
 */
function jogadaOponente(adversario){

    if (adversario == "Pikachu"){
      let ataquesPika = pokemonOponente.ataques;
      jogadaAdversario = aleatorio(ataquesPika);
    }
  
    if (adversario == "Bulbassaur"){
      let ataquesBulba = pokemonOponente.ataques;
      jogadaAdversario = aleatorio(ataquesBulba);
    }
  
    if (adversario == "Charmander"){
      let ataquesChar = pokemonOponente.ataques;
      jogadaAdversario = aleatorio(ataquesChar);
    }
  
    if (adversario == "Squirtle"){
      let ataquesSquir = pokemonOponente.ataques;
      jogadaAdversario = aleatorio(ataquesSquir);
  
    }
  
    if (adversario == "Eevee"){
      let ataquesEev = pokemonOponente.ataques;
      jogadaAdversario = aleatorio(ataquesEev);
  
    }
  
    if (adversario == "Charizard"){
      let ataquesChari = pokemonOponente.ataques;
      jogadaAdversario = aleatorio(ataquesChari);
  
    }
  
  
    if (adversario == "Lugia"){
      let ataquesLug = pokemonOponente.ataques;
      jogadaAdversario = aleatorio(ataquesLug);
    }
  
    return jogadaAdversario
  
}
  
// ###############################################################################
//                                 TEMPORIZADOR                                  #
// ###############################################################################

/**
 * Função que simula um contador de segundos
 */
function temporizadorTabuleiro(){

    contador++

}

/**
 * Função que para o temporizador registando o valor acumulado na local Storage
 */
function paraTemporizador(){

    tempBatalha.unshift(contador);

    clearInterval(resultado);

    localStorage.setItem("temporizadorBatalha", JSON.stringify(tempBatalha.concat(tempoAnterior)));
}