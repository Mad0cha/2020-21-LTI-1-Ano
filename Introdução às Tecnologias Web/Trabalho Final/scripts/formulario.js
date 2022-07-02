"use strict";

// ###############################################################################
//                              CONSTANTES                                       #
// ###############################################################################

/** Identificador do formulário do utilizador. */
const FORMULARIO_UTILIZADOR = "frmUtilizador";

/** Campo do formulário com o username */
const USERNAME = "username";

/** Campo do formulário com o email */
const EMAIL = "email";

/** Botão para continuar */
const BOTAO_CONTINUAR = "botaoCont";

/** Seta para retroceder */
const SETA_RETROCEDER = "seta";

/** Item de local storage que guarda o histório */
const ITEM_HISTORICO = "ItensHistorico";

/** Identificador do parágrafo que contém mensagem em caso de erro */
const ERRO = "erro";

// ###############################################################################
//                            VARIÁVEIS GLOBAIS                                  #
// ###############################################################################

let formulario = null;

let historico = [];

// ###############################################################################
//                            CONSTRUTOR DE OBJETOS                              #
// ###############################################################################

/**
 * Construtor com as informações do utilizador
 * @param {string} email E-mail do utilizador
 * @param {string} username Username do utilizador
 */
function Utilizador(email, username){

    this.email = email;
    this.username = username;

}

// ###############################################################################
//                                   FUNÇÕES                                     #
// ###############################################################################

window.addEventListener("load", principal);

/**
 * Função principal que é executada ao fim do carregamento da página, esta 
 * define o valor da variável formulário que contém um array com as informações do 
 * formulário (email e username). Esta função carrega também o histórico do local 
 * storage gravando-o. Tem também uma função que define Event Handlers, nomeadamente para 
 * a função trataFormUtilizador
 */
function principal(){

    formulario = document.forms[FORMULARIO_UTILIZADOR];

    carregaHistorico();
    gravaHistorico();

    defineEventHandlersParaElementosHTML();
}

/**
 * Função que define o Event Handler quando se clica no botão para continuar
 */
function defineEventHandlersParaElementosHTML() {

    document.getElementById(SETA_RETROCEDER).addEventListener("click", retrocede); 
    document.getElementById(BOTAO_CONTINUAR).addEventListener("click", trataFormUtilizador); 

}

/**
 * Função que verifica a validade do formulário inserido pelo utilizador armazenando
 * numa variavel "dados" e caso seja válido, cria um objeto contendo o e-mail e o username
 * gravando esse mesmo objeto na local storage.
 */
function trataFormUtilizador(){

    let validade_form = formulario.reportValidity();

    let dados = null;

    if (validade_form == true){
        
        let validade = true;

        dados = new Utilizador(formulario.elements[EMAIL].value,
                               formulario.elements[USERNAME].value);

        gravaNoHistorico(dados);

        formulario.reset(); //Limpa todos os campos do Form

        mudaPagina(validade);

    }
    else{
        $("#" + ERRO).show("slow");
    }   
}

/**
 * Função que grava na chave "ITEM_HISTORICO" o valor da variável historico transformada numa
 * string JSON.
 */
function gravaHistorico() {

    localStorage.setItem(ITEM_HISTORICO, JSON.stringify(historico)); 

}

/**
 * Função que carrega o histórico
 */
function carregaHistorico(){

    historico = JSON.parse(localStorage.getItem(ITEM_HISTORICO)) || []; 

}

/**
 * Função que grava no fim do array (historico) os dados atualizando-o e chama a função 
 * gravaHistorico para que a local storage também seja atualizada.
 * @param {string} dados Dados inseridos pelo utilizador 
 */
function gravaNoHistorico(dados) {

    historico.push(dados);
    gravaHistorico();
}

/**
 * Função que verifica a validade dos dados inseridos e muda a página se esta for verdadeira 
 * @param {boolean} validade validade dos dados inseridos
 */
function mudaPagina(validade){
    let somBotao = new Audio('sounds/botao1.wav'); // Botões principais

    if (validade == true){
        continua(somBotao, POKEMONS);
    }
}