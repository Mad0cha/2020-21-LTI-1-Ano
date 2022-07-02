// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

window.addEventListener("load", principal);


/** Função que chama a função que cria os eventos para o botão de ajuste do volume
 * */
function principal(){ criaEventListeners(); }

/** Função que cria os eventos para o botão de ajuste do volume
 * */
function criaEventListeners(){

    let volumeSom = null;

    $(".escolheVolumeSom").on("input", ".volume", function(ajustaVolume){  

        volumeSom = $(ajustaVolume.currentTarget).val(); 
        localStorage.setItem("volumeSom", volumeSom/100); 
        
    });
}


