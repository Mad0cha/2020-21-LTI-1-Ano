# A função criarPontos(ns, seed) que dada uma lista de inteiros ns e uma semente 
# aleatória, gera len(ns) aglomerados, onde o aglomerado i possui ns[i] pontos. A 
# geração dos dados é aleatória mas baseada no valor da semente dada (ou seja, para
# o mesmo valor de semente são criados sempre os mesmos pontos).

#1
# Defina a função distancia que, dados dois pontos 2D, devolve a sua distância euclidiana.
# Considere que os pontos são representados por pares de valores float.

import math

def distancia(pt1, pt2):
     
     return math.sqrt((pt1[0]-pt2[0])**2+(pt1[1]-pt2[1])**2)
  
#2
# Vamos assumir que já tomámos a decisão de ter k centróides e temos, de momento, 
# uma lista de candidatos.

# Se nos derem um ponto pt dos dados originais, queremos saber qual o centróide mais
# perto de pt (de acordo com a distância Euclidiana).

# Para tal, defina a função sugerirCentroide(centros, pt) que recebe uma lista de 
# centróides e um ponto e devolve o índice da lista onde se encontra o centróide mais
# perto do ponto.

# Se dois ou mais centróides estiverem a igual distância, devolver o de menor índice.
def sugerirCentroide(centros, pt):
    
    listaDistancias = []
    for ponto in centros:
        listaDistancias.append(distancia(ponto, pt)) 
    return listaDistancias.index(min(listaDistancias))
  
#3
# Defina a função encontrarCentroMassa(pts) que dado uma lista de pontos 2D devolve um
# par com as coordenadas do centro de massa destes pontos.

# Considere todos os pontos com igual 'massa' quando realizar os cálculos.

def encontrarCentroMassa(pts):

   listaX =  []
   listaY = []
    
   for ponto in pts:
       x = ponto[0]
       y = ponto[1]
       listaX.append(x)
       listaY.append(y)
     
   centro = (sum(listaX) / len(pts), sum(listaY) / len(pts))
    
   return centro

#4
# Agora precisamos descrever um algoritmo para criar os aglomerados.
# Assuma que sabemos o número k de aglomerados e que nos dão a lista de pontos do problema.

# Defina a função aglomerar(k, pts, tol, maxIter) que recebe o número de aglomerados, 
# a lista de pontos, a tolerância máxima que define a convergência do algoritmo e o número
# máximo de iterações permitidas para o cálculo dos centróides.

# A função deve devolver uma lista de pares contendo os centróides

def aglomerar(k, pts, tol=0.001, maxIter=50):
    
    iteracao = 0
    centroides = [] 
    centroidesAnteriores = [] 
    sugestoes = []
    aglomerados = []
    
    for x in range(k):
        centroidesAnteriores.append(pts[x])
         
    while True:
       
        if iteracao == maxIter:
           return centroides
        
        else:
            for ponto in pts:
                sugestoes.append([ponto,centroidesAnteriores[sugerirCentroide(centroidesAnteriores, ponto)]]) 
                 
            aglomerados = []
            
            for centroide in centroidesAnteriores:
                aglomerados.append([]) 
           
            contador = 0
            
            while contador < len(aglomerados):
                for centroide in centroidesAnteriores:
                    for sugestao in sugestoes:
                        if sugestao[1] == centroide:
                            aglomerados[contador].append(sugestao[0])
                    contador+=1
            
            centroides = []
            for aglomerado in aglomerados:
                centroides.append(encontrarCentroMassa(aglomerado))
            
            distanciaTotal = 0
          
            for x in range(len(centroides)):
                distanciaTotal += distancia(centroides[x], centroidesAnteriores[x])

            if distanciaTotal > tol:
                centroidesAnteriores = centroides
                centroides = [] 
                
        iteracao += 1
        
#5
# Defina a função custear(centros, pts) que recebe uma lista de centróides e a lista com os 
# pontos originais, e devolve a soma dos quadrados das distâncias entre cada ponto e o 
# centróide mais próximo.

def custear(centros, pts):
    
    listaSomaDistancias = []
    for ponto in pts:
        listaSomaDistancias.append((distancia(ponto, centros[sugerirCentroide(centros, ponto)]))**2)
    
    return sum(listaSomaDistancias)
  
#6
# Defina a função sugerirK(pts, minK, maxK) que recebe a lista dos pontos iniciais, e dois 
# inteiros que definem o intervalo de procura do valor k.

# A função deve devolver o k que minimiza o custo definido no texto acima.

def sugerirK(pts, minK=2, maxK=10):
  """
  requires: minK >= 2
  requires: minK < maxK
  """
  
  custos = []
  for k in range(minK,maxK+1):
      custos.append([custear(aglomerar (k, pts), pts) * (k**1.5) ,k])
  return min(custos)[1]
