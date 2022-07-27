__author__ = "Madalena Rodrigues"

# função carregarVocabulario que dado um nome de ficheiro com um vocabulário, carrega o conteúdo
# do ficheiro e devolve-o no formato lista, com os elementos ordenados lexicograficamente, e sem 
# repetições.

def carregarVocabulario(filename):
  
  dic = set()
  
  for line in open(filename, 'r', encoding='utf8'):
    dic.add(line.rstrip().lower())
  return sorted(dic)

dic = carregarVocabulario('vocabulario.txt')

# 1
# Defina a função gerarPalavras que recebe uma string com texto, e devolve uma lista com as várias
# palavras contidas na string, pela ordem que aparecem.

# Aqui terá de filtrar vários elementos textuais, nomeadamente, parêntesis ()[], dígitos 0...9, 
# pontuações .,:;?!, espaços e o símbolo de nova linha \n. Não deve devolver palavras vazias nem
# palavras só com números. Para auxiliar consulte a documentação da função split do módulo re.

import re

def gerarPalavras(texto):
    lista = re.split(r'[`\-=~!@#$%^&*()_+\[\]{};\'\\:"|<,./<>?\s01234567890]', texto)

    final = []
    for palavra in lista:
        if palavra != "":
            final.append(palavra)

    return final
  
# 2
# Vamos agora definir uma função de dissemelhança entre palavras.
# Defina a função mmLetras(palavra1, palavra2) que devolve a subtração entre o tamanho da maior
# palavra dada e o número de letras iguais nas mesmas posições entre as duas palavras.

def mmLetras(palavra1, palavra2):
  maiorPalavra = palavra1
  menorPalavra = palavra2
  if len(palavra2) > len(palavra1):
      maiorPalavra = palavra2
      menorPalavra = palavra1

  contador1 = 0
  iguais = []

  while contador1 < len(menorPalavra):
      if palavra1[contador1] == palavra2[contador1]:
          iguais += palavra1[contador1]
          contador1 += 1
      else:
          contador1 += 1

  return len(maiorPalavra) - len(iguais)
  
  # 3
  # Vamos agora definir outra função de dissemelhança entre palavras.
  # Defina a função edicoes(palavra1, palavra2) que devolve o número mínimo de operações de 
  # edição necessárias para transformar uma palavra na outra.
  
  def edicoes(palavra1,palavra2):
    
    linhas = (len(palavra1) + 1)
    colunas = (len(palavra2) + 1)
    matriz = [[0 for x in range(colunas)] for y in range(linhas)]
            
    for x in range(linhas):
        matriz[x][0] = x
    
    for y in range(colunas):
        matriz[0][y] = y
    
    for x in range(1, linhas):
        for y in range(1, colunas):
            if palavra1[x-1] == palavra2[y-1]:
                matriz[x][y] = matriz[x-1][y-1]
            else:
                trocaLetra = 1 + matriz[x-1][y-1]
                poeLetra = 1 + matriz[x][y-1]
                tiraLetra = 1 + matriz[x-1][y]
                matriz[x][y] = min(poeLetra, tiraLetra, trocaLetra)
    
    return matriz[len(palavra1)][len(palavra2)]
  
#4
# Defina a função sugerir que recebe um vocabulário, uma palavra, uma função de distância 
# e um inteiro positivo n de sugestões e devolve uma lista de n palavras do vocabulário mais 
# próximas da palavra dada, de acordo com a função de distância.

#Como referido, o primeiro critério para entrar na lista final é a distância. No caso de ter
# de escolher uma palavra entre duas ou mais palavras com a mesma distância, deve-se escolher 
# aquela que tem menor ordem lexicográfica (ou seja, preferir aquela que aparece primeiro no 
# vocabulário).
  
# A lista final de sugestões deve aparecer ordenada lexicograficamente. Podem usar a função 
# sorted que recebe uma lista de elementos (no nosso caso, strings) e devolve uma lista
# ordenada dos seus elementos.
  
def sugerir(dic, palavra, distancia, maxSugestoes=5):

  resultado = []

  for palavraDic in dic:

      resultado.append([palavraDic, distancia(palavra, palavraDic)])

  resultado = sorted(resultado, key= lambda x:(x[1], x[0]) )[0:maxSugestoes]
  return sorted([palavra[0] for palavra in resultado])
    
#5
# Defina a função corretor que recebe um vocabulário, um texto, uma função de distância e um 
# inteiro positivo n de sugestões e imprime um relatório com as correções sugeridas.
# Só devem apresentar sugestões de correção para as palavras que não pertencem ao vocabulário 
# (por exemplo, "de" não leva sugestões de correção).

def corretor(dic, texto, distancia, maxSugestoes=5): 
    
    listaTexto = (gerarPalavras(texto))
    for palavraTexto in listaTexto:
        if palavraTexto not in dic:
            print('{0} --> {1}'.format(palavraTexto,sugerir(dic, palavraTexto, distancia,maxSugestoes)))
