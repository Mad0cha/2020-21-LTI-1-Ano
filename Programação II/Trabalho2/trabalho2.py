
# BIG O ##########################################################################################################################################################

#A1------------------------------------------------------
def f1(n, v):  #-------------------- Resposta = O(n^2 + 6) -> O(n^2) 
    b = n * n  #-------------------- 1 operação  -> O(1) - São multiplicados dois valores inteiros, a multiplicação vale O(1)
    s = 0 #------------------------- 1 operação  -> O(1) - A atribuição de um valor vale O(1)
    while b > 1: #------------------ n operações -> O(n^2 - n) -> O(n^2) - É subtraído o valor n, x vezes enquanto b > 1    PODE SER N^2-2!!!!!!!!!!!!!!!!!!!!!!!!!
        s += v[n] #----------------- 1 operação  -> O(1) - A soma vale O(1)
        s += b #-------------------- 1 operação  -> O(1) - A soma vale O(1)
        b -= 2 #-------------------- 1 operação  -> O(1) - A subtração vale O(1)
    return s #---------------------- 1 operação  -> O(1) - Retornar um valor vale O(1)
 
#A2------------------------------------------------------
def f2_(d,l): #--------------------- Resposta = O(n)
    r = [] #------------------------ 1 operação  -> O(1) - Pois é criada uma lista (É o mesmo que atribuir um valor) -     Ex: resultado = [] #--------------------------- O(1)
    for x in l: #------------------- n operações -> O(n) - Pois vai ver cada elemento da lista de tamanho n 
        if x not in d: #------------ 1 operações -> O(1) - Pois um dicionário usa hashtables e neste caso é só ver lá (custa 1)     Tb pode ser O(n), pois vai ter de ver se x está no dicionário (tem de o percorrer), confirmar!!!!!
            r.append(x) #----------- 1 operação  -> O(1) - Pois está a ser adicionado um valor a uma lista
    return r #---------------------- 1 operação  -> O(1) - Pois está a ser retornada uma lista

##################################################################################################################################################################
 
#B------------------------------------------------------

lista_dupla = [[2, 4, 4, 6], [7, 11, 12, 13],[13, 13, 13, 13], [15, 19, 42, 100]]

def busca_dicotomica(l, e): # l - lista , e - elemento O(log n)

    """Procura um elemento numa lista

    Pre:
        A lista está ordenada
    Args:
        l (list): A lista
        e (any): O elemento
    Returns:
        bool: True se o elemento está na lista; False caso contrário
    """

    def busca(primeiro, ultimo):
        if primeiro > ultimo: 
            return False
        meio = (primeiro + ultimo) // 2
        if l[meio] == e:
            return True
        if l[meio] < e:
            return busca(meio + 1, ultimo)
        return busca(primeiro, meio - 1)
    return busca(0, len(l) - 1)

    
def busca_lista_dupla(lista,elemento): # Resposta: # O(n) + O(log n) +   =  O(n + log n)  =  O(n) Ou é vezes?

    """Função que procura um elemento numa lista de listas ordenada 

    Pre:
        A lista está ordenada
    Args:
        lista (list): A lista
        elemento (any): O elemento que queremos procurar
    Returns:
        bool: True se o elemento está na lista; False caso contrário
    """

    for sublista in lista: #--------------------------------- O(n) - Percorrer a lista elemento a elemento vale O(n)
        primeiro = sublista[0] #----------------------------- O(1) - Atribuir um valor vale O(1)
        ultimo = sublista[-1] #------------------------------ O(1) - Atribuir um valor vale O(1)
        
        if primeiro <= elemento <= ultimo: #----------------- O(1) - Verificar se um elemento se encontra entre outros 2 vale O(1)
            return busca_dicotomica(sublista, elemento) #---- O(log(n)) - Retornar um resultado vale O(1), no entanto nesta linha é feita a pesquisa utilizando a funcção auxiliar cuja complexidade é O(log n) 
    return False  #------------------------------------------ O(1) - Retornar um resultado vale O(1)
           
# Testes    
print(busca_lista_dupla(lista_dupla,4))
print(busca_lista_dupla(lista_dupla,5))
print(busca_lista_dupla(lista_dupla,14))
print(busca_lista_dupla(lista_dupla,42))
