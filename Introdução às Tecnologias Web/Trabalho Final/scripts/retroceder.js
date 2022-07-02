
window.addEventListener("load", criaEventListeners);

/**
 * Função que retrocede quando se clica na seta 
 * @param {string} som nome do som que se quer que pare de tocar
 */
function criaEventListeners() {
   
  document.getElementById("seta").addEventListener("click", retrocede); 

}

