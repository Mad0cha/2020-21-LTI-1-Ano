// ITW-2020/2021_Grupo:12_Lilia Colisnyc-56949_Madalena Rodrigues-55853_Rómulo Nogueira-56935_PL24

"use strict";

window.addEventListener("load", criaEventListeners);

/**
 * Função que retrocede quando se clica na seta 
 * @param {string} som nome do som que se quer que pare de tocar
 */
function criaEventListeners() {
   
  document.getElementById("somChrz").addEventListener("click", function(){play(somCharizard)}); 
  document.getElementById("somBulb").addEventListener("click", function(){play(somBulbassaur)}); 
  document.getElementById("somChar").addEventListener("click", function(){play(somCharmander)}); 
  document.getElementById("somEev").addEventListener("click", function(){play(somEevee)}); 
  document.getElementById("somLug").addEventListener("click", function(){play(somLugia)}); 
  document.getElementById("somPika").addEventListener("click", function(){play(somPikachu)});
  document.getElementById("somSqu").addEventListener("click", function(){play(somSquirtle)});  
}

