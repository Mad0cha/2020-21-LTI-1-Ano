// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

// ###############################################################################
//                                 CONSTANTES                                    #
// ###############################################################################

// botão para começar. 
const BOTAO_COMECAR = "comecar";

// ###############################################################################
//                                  FUNÇÕES                                      #
// ###############################################################################

window.addEventListener("load", principal);

/** 
 * Função que coloca no local storage as informações necessárias para controlo do volume
 * e cria o evento para o botão do índice 
 */
function principal(){

    localStorage.setItem("volumeMusica", 1);
    localStorage.setItem("volumeSom", 1);

    document.getElementById(BOTAO_COMECAR).addEventListener("click", function(){continua(somBotao, FORMULARIO)});
}
  
