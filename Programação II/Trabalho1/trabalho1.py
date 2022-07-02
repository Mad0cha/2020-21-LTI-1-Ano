__author__ = "Madalena Rodrigues, 55853"

def ler_palavras(ficheiro_pesquisa):

    """Função que lê um ficheiro de texto e devolve um conjunto com as palavras desse ficheiro

    Args:
        ficheiro_pesquisa: Ficheiro de onde vão ser retiradas as palavras
    
    Returns:
        palavras (set): Devolve o conjunto de palavras do ficheiro sem repetidas e por ordem alfabética
    """
    with open(ficheiro_pesquisa,'r', encoding='utf-8') as texto:
        palavras = set(texto.read().split())
        return (palavras)

# print(ler_palavras("palavras.txt"))

def ficheiro_limpo (ficheiro_leitura):
    """Função que recebe como parâmetro um ficheiro de texto e coloca as palavras desse ficheiro separadas numa lista 

    Args:
        ficheiro_leitura (str): Ficheiro que contém o texto que se quer separar em palavras 

    Returns:
        lista_limpa (list): Lista com as palavras do texto separdas 
    """
    
    with open(ficheiro_leitura,'r', encoding='utf-8') as ficheiro_origem:
    
        lista_limpa = ficheiro_origem.read().split()
    
    return lista_limpa

# print(ficheiro_limpo("turing.txt"))

def encontrar_palavras(ficheiro_leitura, ficheiro_pesquisa):

    """Função que cria um dicionário com as frequências e as linhas em que algumas palavras ocorrem

    Args:
        ficheiro_leitura (str): Ficheiro que contém o texto em que se querem procurar as palavras 
        ficheiro_pesquisa (str): Ficheiro que contém as palavras que se querem procurar (palavras de interesse)

    Returns:
        dicionario (dict): Dicionário que tem como chaves as palavras que se querem procurar (definidas no ficheiro_pesquisa) 
        e como valores tuplos com as ocorrências dessa palvra e com o conjunto (set) das linhas onde a palavra aparece 
    """

    dicionario={}

    lista_palavras = [elemento for elemento in ler_palavras(ficheiro_pesquisa)]

    with open(ficheiro_leitura,'r', encoding='utf-8') as ficheiro_origem:
        for linha, conteudo_linha in enumerate(ficheiro_origem):
            for palavra in conteudo_linha.split():
                if palavra in lista_palavras:
                    if palavra in dicionario.keys():
                        dicionario[palavra][1].add(linha+1) 
                    else:
                        dicionario[palavra]= tuple([ficheiro_limpo(ficheiro_leitura).count(palavra), set([linha+1])])

    return dicionario
encontrar_palavras('turing.txt','palavras.txt')



