cidades = {'Lisboa': (38.7452, -9.1604), 
           'Vila Nova de Gaia': (41.1333, -8.6167),
           'Porto': (41.1495, -8.6108),
           'Braga': (41.5333, -8.4167),
           'Matosinhos': (41.2077, -8.6674),
           'Amadora': (38.75, -9.2333),
           'Almada': (38.6803, -9.1583),
           'Oeiras': (38.697, -9.3017),
           'Gondomar': (41.15, -8.5333),
           'Guimarães': (41.445, -8.2908),
           'Odivelas': (38.8, -9.1833),
           'Coimbra': (40.2111, -8.4291),
           'Vila Franca de Xira': (38.95, -8.9833),
           'Maia': (41.2333, -8.6167),
           'Leiria': (39.7431, -8.8069),
           'Setúbal': (38.5243, -8.8926),
           'Viseu': (40.6667, -7.9167),
           'Valongo': (41.1833, -8.5),
           'Viana do Castelo': (41.7, -8.8333),
           'Paredes': (41.2, -8.3333),
           'Vila do Conde': (41.35, -8.75),
           'Torres Vedras': (39.0833, -9.2667),
           'Barreiro': (38.6609, -9.0733),
           'Aveiro': (40.6389, -8.6553),
           'Queluz': (38.7566, -9.2545),
           'Mafra': (38.9333, -9.3333),
           'Penafiel': (41.2, -8.2833),
           'Loulé': (37.144, -8.0235)}

#__author__ = "Madalena Rodrigues, 55853"

# Função auxiliar //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import math

from numpy.core.fromnumeric import alltrue

def distancia(origem,destino):
    """
    Função que calcula a distância entre duas coordenadas, tendo por base a sua latitude e longitude.

    Pre:
        Os tuplos origem e destino têm de ser tuplos de inteiros
    Args:
        origem (tuple): Tuplo de coordenadas (números inteiros)
        destino (tuplo): Tuplo de coordenadas (números inteiros)

    Returns:
        (float): Distância entre as coordenadas de origem e as de destino, dada em quilómetros
    """
    return math.sqrt( (((origem[0]-destino[0]) * 111.1949) ** 2) + (((origem[1]-destino[1]) * 85.1102) ** 2) ) 

# print(distancia((38.7452, -9.1604),(41.1495, -8.6108))) # Libboa -> Porto

# 1. /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

# Caracterísiticas:
# Nº de elementos da lista (Nº el) --------------> (2, >2) -> Especificar que a lista tem de ter pelo menos dois valores
# Elementos repetidos (Repetidos) ---------------> (True ou False)
# Número de elementos repetidos (Nº repetidos) --> (0, 1, >1)

# ------------------------------------------------------------------------------------------------------- # 
#           Caracterísiticas         |                            Testes                                  #
# --------+-----------+--------------+-------------------------------------------------------+----------- #
#  Nº el  | Repetidos | Nº repetidos |                         input                         | resultado  #
# --------+-----------+--------------+-------------------------------------------------------+----------- #
#    2    |     F     |      0       | ['Lisboa','Porto']                                    |  271.407   #
#    2    |     F     |      1       |          -                                            |     -      #  -> Se não tem repetidos não pode ter um nº de repetidos (nem 1, nem >1)
#    2    |     F     |      >1      |          -                                            |     -      #
#    2    |     T     |      0       |          -                                            |     -      #  -> Se tem repetido o nº de repetidos não pode ser zero
#    2    |     T     |      1       | ['Lisboa','Lisboa']                                   |    0.0     #
#    2    |     T     |      >1      |          -                                            |     -      #  -> Se só tem 2 elementos não pode ter mais que um repetido
#    >2   |     F     |      0       | ['Lisboa', 'Setúbal', 'Porto']                        |  326.401   #  
#    >2   |     F     |      1       |          -                                            |     -      #  -> Se não tem repetidos não pode ter um nº de repetidos (nem 1, nem >1)
#    >2   |     F     |      >1      |          -                                            |     -      #
#    >2   |     T     |      0       |          -                                            |     -      #  -> Se tem repetido o nº de repetidos não pode ser zero
#    >2   |     T     |      1       | ['Lisboa', 'Setúbal', 'Lisboa']                       |   67.018   #
#    >2   |     T     |      >1      | ['Lisboa', 'Setúbal', 'Coimbra', 'Setúbal', 'Lisboa'] |   450.352  #
# ------------------------------------------------------------------------------------------------------- #     

from operator import itemgetter

def distancia_itinerario(itinerario):
    """
    Função que calcula a distância total de um itinerario (em km). Soma as distâncias entre duas cidades consecutivas

    Pre:
        O itinerário tem pelo menos duas cidades e estas têm de existir no dicionário 'cidades'
    Args:
        itinerario (list): Lista com várias cidades ordenadas de forma otimizada para minimizar a distância total do percurso
    Returns:
        (float): Distância total do itinerário fornecido na lista 'itinerario'
    
    >>> round(distancia_itinerario(['Lisboa', 'Setúbal', 'Coimbra', 'Aveiro', 'Viseu', 'Porto']), 3)
    419.256
    >>> round(distancia_itinerario(['Lisboa','Porto']), 3)
    271.407
    >>> round(distancia_itinerario(['Lisboa','Lisboa']), 3)
    0.0
    >>> round(distancia_itinerario(['Lisboa', 'Setúbal', 'Porto']), 3)
    326.401
    >>> round(distancia_itinerario(['Lisboa', 'Setúbal', 'Lisboa']), 3)
    67.018
    >>> round(distancia_itinerario(['Lisboa', 'Setúbal', 'Coimbra', 'Setúbal', 'Lisboa']), 3)
    450.352
    """
    coordenadas = itemgetter(*itinerario)(cidades) 
    origens_destinos = zip(coordenadas, coordenadas[1:]) 
    lista_distancia = map(lambda tuplo: distancia(tuplo[0], tuplo[1]), origens_destinos) 

    return sum(lista_distancia)

# round(distancia_itinerario(['Lisboa', 'Setúbal', 'Coimbra', 'Aveiro', 'Viseu', 'Porto']), 3)

# 2. /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

# Caracterísiticas:
# Nº de elementos da lista (Nº el) ---------------------> (2, >2)
# Elementos repetidos (Repetidos) ----------------------> (True ou False)
# Adiciona um existente (Existente) --------------------> (True ou False)
# A cidade é mais distante que o destino (+ distante) --> (True ou False)

# ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- # 
#               Caracterísiticas                    |                                                                   Testes                                                                    #
# --------+-----------+-----------------------------+----------------------------------------------------------------------+--------------------------------------------------------------------- #
#  Nº el  | Repetidos |  + distante  |  Existente   |                                input                                 |                             resultado                                #
# --------+-----------+--------------+--------------+----------------------------------------------------------------------+--------------------------------------------------------------------- #
#    2    |     F     |      F       |      F       |  ['Lisboa', 'Porto'] , 'Setúbal'                                     | ['Lisboa', 'Setúbal', 'Porto']                                       #
#    2    |     F     |      F       |      T       |  ['Lisboa', 'Porto'] , 'Lisboa'                                      | ['Lisboa', 'Lisboa', 'Porto']                                        #
#    2    |     F     |      T       |      F       |  ['Lisboa', 'Amadora'] , 'Porto'                                     | ['Lisboa', 'Porto', 'Amadora']                                       #
#    2    |     F     |      T       |      T       |  -                                                                   | -                                                                    # -> Não pode existir já na lista e ser mais longe que o destino neste caso
#    2    |     T     |      F       |      F       |  ['Coimbra', 'Coimbra'] , 'Setúbal'                                  | ['Coimbra', 'Setúbal', 'Coimbra']                                    #
#    2    |     T     |      F       |      T       |  ['Guimarães', 'Guimarães'] , 'Guimarães'                            | ['Guimarães', 'Guimarães', 'Guimarães']                              #
#    2    |     T     |      T       |      F       |  ['Leiria', 'Leiria'] , 'Porto'                                      | ['Leiria', 'Porto', 'Leiria']                                        # -> Não pode existir já na lista e ser mais longe que o destino neste caso Ex: ['Leiria','Leiria'] , 'Leiria'  
#    2    |     T     |      T       |      T       |  -                                                                   | -                                                                    #
#    >2   |     F     |      F       |      F       |  ['Lisboa', 'Setúbal', 'Coimbra', 'Porto'], 'Viseu'                  | ['Lisboa', 'Setúbal', 'Coimbra', 'Viseu', 'Porto']                   #     
#    >2   |     F     |      F       |      T       |  ['Gondomar', 'Braga', 'Leiria', 'Setúbal', 'Queluz'],'Braga'        | ['Gondomar', 'Braga', 'Braga', 'Leiria', 'Setúbal', 'Queluz']        #
#    >2   |     F     |      T       |      F       |  ['Gondomar', 'Braga', 'Leiria', 'Setúbal'], 'Loulé'                 | ['Gondomar', 'Braga', 'Leiria', 'Loulé', 'Setúbal']                  #
#    >2   |     F     |      T       |      T       |  ['Lisboa', 'Amadora', 'Oeiras', 'Porto', 'Coimbra'], 'Porto')       | ['Lisboa', 'Amadora', 'Oeiras', 'Porto', 'Porto', 'Coimbra']         #                                                
#    >2   |     T     |      F       |      F       |  ['Braga', 'Braga', 'Leiria'], 'Maia'                                | ['Braga', 'Braga', 'Maia', 'Leiria']                                 # 
#    >2   |     T     |      F       |      T       |  ['Braga', 'Lisboa', 'Lisboa', 'Leiria'], 'Braga'                    | ['Braga', 'Braga', 'Lisboa', 'Lisboa', 'Leiria']                     #
#    >2   |     T     |      T       |      F       |  ['Lisboa', 'Setúbal', 'Coimbra', 'Lisboa'], 'Viseu'                 | ['Lisboa', 'Setúbal', 'Viseu', 'Coimbra', 'Lisboa']                  #
#    >2   |     T     |      T       |      T       |  ['Guimarães', 'Loulé', 'Coimbra', 'Valongo','Guimarães'], 'Coimbra' | ['Guimarães', 'Loulé', 'Coimbra', 'Coimbra', 'Valongo', 'Guimarães'] #
# ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- # 

def adicionar_cidade(itinerario, cidade):
    """
    Função que adiciona uma cidade a um itinerário já existente, colocando-a entre duas cidades do itinerário original, de modo a minimizar o desvio adicional.
    As cidades de origem e destino não são alteradas.
    Pre:
        O itenerário tem pelo menos duas cidades e estas têm de existir no dicionário 'cidades'
        A cidade a adicionar não pode ser uma string vazia e tem de existir no dicionário 'cidades'
    Args: 
        itinerario (list): Lista com várias cidades que se querem ordenar para formar um percurso
        cidade (str): cidade a adicionar ao percurso dado pelo 'itinerario'
    Returns:
        (list): Lista com as cidades do itinerario dado como argumento contendo ainda a cidade adicionada na melhor posição do percurso, minimizando os desvios
    
    >>> adicionar_cidade(['Lisboa', 'Setúbal', 'Coimbra', 'Viseu', 'Porto'], 'Aveiro')
    ['Lisboa', 'Setúbal', 'Coimbra', 'Viseu', 'Aveiro', 'Porto']
    >>> adicionar_cidade(['Lisboa', 'Porto'] , 'Setúbal')
    ['Lisboa', 'Setúbal', 'Porto']
    >>> adicionar_cidade(['Lisboa', 'Porto'] , 'Lisboa')
    ['Lisboa', 'Lisboa', 'Porto']
    >>> adicionar_cidade(['Lisboa', 'Amadora'] , 'Porto')
    ['Lisboa', 'Porto', 'Amadora']
    >>> adicionar_cidade(['Coimbra', 'Coimbra'] , 'Setúbal')
    ['Coimbra', 'Setúbal', 'Coimbra']
    >>> adicionar_cidade(['Guimarães', 'Guimarães'] , 'Guimarães')
    ['Guimarães', 'Guimarães', 'Guimarães']
    >>> adicionar_cidade(['Leiria', 'Leiria'] , 'Porto')
    ['Leiria', 'Porto', 'Leiria']
    >>> adicionar_cidade(['Lisboa', 'Setúbal', 'Coimbra', 'Porto'], 'Viseu')
    ['Lisboa', 'Setúbal', 'Coimbra', 'Viseu', 'Porto']
    >>> adicionar_cidade(['Gondomar', 'Braga', 'Leiria', 'Setúbal', 'Queluz'],'Braga')
    ['Gondomar', 'Braga', 'Braga', 'Leiria', 'Setúbal', 'Queluz']
    >>> adicionar_cidade(['Gondomar', 'Braga', 'Leiria', 'Setúbal'], 'Loulé')
    ['Gondomar', 'Braga', 'Leiria', 'Loulé', 'Setúbal']
    >>> adicionar_cidade(['Lisboa', 'Amadora', 'Oeiras', 'Porto', 'Coimbra'], 'Porto')
    ['Lisboa', 'Amadora', 'Oeiras', 'Porto', 'Porto', 'Coimbra']
    >>> adicionar_cidade(['Braga', 'Braga', 'Leiria'], 'Maia')
    ['Braga', 'Braga', 'Maia', 'Leiria']
    >>> adicionar_cidade(['Braga', 'Lisboa', 'Lisboa', 'Leiria'], 'Braga')
    ['Braga', 'Braga', 'Lisboa', 'Lisboa', 'Leiria']
    >>> adicionar_cidade(['Lisboa', 'Setúbal', 'Coimbra', 'Lisboa'], 'Viseu')
    ['Lisboa', 'Setúbal', 'Viseu', 'Coimbra', 'Lisboa']
    >>> adicionar_cidade(['Guimarães', 'Loulé', 'Coimbra', 'Valongo','Guimarães'], 'Coimbra')
    ['Guimarães', 'Loulé', 'Coimbra', 'Coimbra', 'Valongo', 'Guimarães']
    """
    alternativas = map(lambda i: itinerario[:i] + [cidade] + itinerario[i:], range(len(itinerario),-1,-1)) 
    viaveis = filter(lambda el: el[0] == itinerario[0] and el[-1] == itinerario[-1], alternativas) 
    return min(map(lambda a: [a, distancia_itinerario(a)], viaveis), key = lambda el: el[1])[0] # a - alternativa

# adicionar_cidade(['Lisboa', 'Setúbal', 'Coimbra', 'Viseu', 'Porto'],  'Aveiro')

# 3. /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# Caracterísiticas:
# Nº de elementos do itenerário (Nº el) -----------------> (2, >2)
# Elementos repetidos (Repetidos) -----------------------> (True ou False)
# Origem e destino serem iguais (iguais) ----------------> (True ou False)

# ---------------------------------------------------------------------------------------------------------------------------------------------------------------- # 
#          Características         |                                                            Testes                                                             #
# ----------+-----------+----------+---------------------------------------------------------------+-------------------------------------------------------------- #
#   Nº el   | Repetidos |  iguais  |                           input                               |                          resultado                            #
# ----------+-----------+----------+---------------------------------------------------------------+-------------------------------------------------------------- # 
#     2     |     F     |     F    | 'Lisboa', 'Porto', ['Viseu', 'Coimbra']                       | ['Lisboa', 'Coimbra', 'Viseu', 'Porto']                       #
#     2     |     F     |     T    | 'Coimbra', 'Coimbra', ['Leiria', 'Valongo']                   | ['Coimbra', 'Leiria', 'Valongo', 'Coimbra']                   #
#     2     |     T     |     F    | 'Braga', 'Maia', ['Amadora', 'Amadora']                       | ['Braga', 'Amadora', 'Amadora', 'Maia']                       #
#     2     |     T     |     T    | 'Paredes', 'Paredes', ['Matosinhos', 'Matosinhos']            | ['Paredes', 'Matosinhos', 'Matosinhos', 'Paredes']            #
#     >2    |     F     |     F    | 'Almada', 'Setúbal', ['Lisboa','Amadora','Oeiras']            | ['Almada', 'Oeiras', 'Amadora', 'Lisboa', 'Setúbal']          #                                       
#     >2    |     F     |     T    | 'Mafra', 'Mafra', ['Penafiel', 'Loulé', 'Lisboa', 'Queluz']   | ['Mafra', 'Penafiel', 'Loulé', 'Lisboa', 'Queluz', 'Mafra']   #                                  
#     >2    |     T     |     F    | 'Viana do Castelo', 'Braga', ['Gondomar', 'Leiria', 'Leiria'] | ['Viana do Castelo', 'Leiria', 'Leiria', 'Gondomar', 'Braga'] #                                     
#     >2    |     T     |     T    | 'Loulé', 'Loulé', ['Lisboa', 'Setúbal', 'Coimbra', 'Lisboa']  | ['Loulé', 'Coimbra', 'Lisboa', 'Lisboa', 'Setúbal', 'Loulé']  #                              
# ---------------------------------------------------------------------------------------------------------------------------------------------------------------- # 

from functools import reduce

def construir_itinerario(origem, destino, lista_cidades):
    """
    Função que constrói um itinerário a partir de uma lista de cidades, minimizando os desvios adicionais.

    Pre:
        A origem não pode ser uma string vazia e tem de existir no dicionário 'cidades'
        O destino não pode ser uma string vazia e tem de existir no dicionário 'cidades'
        A lista_cidades tem pelo menos duas cidades e estas têm de existir no dicionário 'cidades'
    Args: 
        origem (str): Cidade de origem do itinerario a ser construído
        destino (str): Cidade de destino do itinerario a ser construído
        lista_cidades (list): Lista com as cidades que se deseja visitar no itinerario
    Returns:
        (list): Lista com o itinerário que minimiza os desvios e cuja distância total é menor, ou seja, o melhor a seguir
    
    >>> construir_itinerario('Lisboa', 'Porto', ['Viseu', 'Coimbra', 'Aveiro', 'Setúbal'])
    ['Lisboa', 'Setúbal', 'Coimbra', 'Viseu', 'Aveiro', 'Porto']
    >>> construir_itinerario('Lisboa', 'Porto', ['Viseu', 'Coimbra'])
    ['Lisboa', 'Coimbra', 'Viseu', 'Porto']
    >>> construir_itinerario('Coimbra', 'Coimbra', ['Leiria', 'Valongo'])
    ['Coimbra', 'Leiria', 'Valongo', 'Coimbra']
    >>> construir_itinerario('Braga', 'Maia', ['Amadora', 'Amadora'])
    ['Braga', 'Amadora', 'Amadora', 'Maia']
    >>> construir_itinerario('Paredes', 'Paredes', ['Matosinhos', 'Matosinhos'])
    ['Paredes', 'Matosinhos', 'Matosinhos', 'Paredes']
    >>> construir_itinerario('Almada', 'Setúbal', ['Lisboa','Amadora','Oeiras'])
    ['Almada', 'Oeiras', 'Amadora', 'Lisboa', 'Setúbal']
    >>> construir_itinerario('Mafra', 'Mafra', ['Penafiel', 'Loulé', 'Lisboa', 'Queluz'])
    ['Mafra', 'Penafiel', 'Loulé', 'Lisboa', 'Queluz', 'Mafra']
    >>> construir_itinerario('Viana do Castelo', 'Braga', ['Gondomar', 'Leiria', 'Leiria'])
    ['Viana do Castelo', 'Leiria', 'Leiria', 'Gondomar', 'Braga']
    >>> construir_itinerario('Loulé', 'Loulé', ['Lisboa', 'Setúbal', 'Coimbra', 'Lisboa'])
    ['Loulé', 'Coimbra', 'Lisboa', 'Lisboa', 'Setúbal', 'Loulé']
    """
    return reduce(lambda od, l: (adicionar_cidade(od, l)), lista_cidades, [origem, destino]) # od - origem destino; l - lista

# print(construir_itinerario('Lisboa', 'Porto', ['Viseu', 'Coimbra', 'Aveiro', 'Setúbal']))

if __name__ == "__main__":
    import doctest
    doctest.testmod()