__author__ = "Madalena Rodrigues, 55853; Lilia Colisnyc, 56949"

# IMPORTS
import matplotlib.pyplot as plt
import numpy as np
import sys
import argparse
import csv
import re

# FUNÇÕES GERAIS ###################################################################################

# LER O DICIONÁRIO 
def ler_csv_dicionario (nome_ficheiro, cabecalho = None):
    """Ler um ficheiro CSV. O ficheiro pode ou não ter cabeçalho.

    Args:
        nome_ficheiro (str): O nome do ficheiro
        cabecalho (list[str], optional):  A lista com o nomes das colunas.
            Utilizar quando o ficheiro não tiver cabeçalho. Defaults to None.

    Returns:
        list[dict]: Uma lista de dicionarios com o conteúdo do ficheiro;
            as chaves do dicionário são lidas da primeira linha do ficheiro
            ou tiradas da lista cabeçalho.
    """
    with open(nome_ficheiro, 'r') as ficheiro_csv:
        leitor = csv.DictReader(ficheiro_csv, fieldnames = cabecalho, delimiter = ',')
        return list(leitor)

####################################################################################################

# RETIRAR APENAS AS COLUNAS QUE QUEREMOS DO FICHEIRO EXCEL 
def limpa_converte(dados, lista_colunas):
    """Devolve o conjunto de dados

    Args:
        dados (list[dic]): O nome do ficheiro
        lista_colunas (list): lista de strings referentes ao cabeçalho das colunas que interessam

    Returns:
        list[dict]:Devolve o conjunto de dados, isto é, uma lista de dicionários e também filtra as linhas
        
    """
    result = []

    for linha in dados:
            new_row = dict()

            for i, column in enumerate(lista_colunas) :
                
                data = linha[column]
                new_row[column] = data

            result.append(new_row)
    return result

# print(limpa_converte(ler_csv_dicionario('xadrez.csv'), ["end_time"]))

####################################################################################################

# OPERAÇÃO ANOS ###################################################################################

def regista_anos(ficheiro_csv): 
    """
    Args:
        ficheiro_csv(str): nome do ficheiro
    Returns:
        list(list): lista de lista das chaves do dicionario e a lista dos valores do dicionario
    """
    ficheiro = ler_csv_dicionario(ficheiro_csv)
    todos_anos = limpa_converte(ficheiro, ["end_time"])
    
    lista_anos = list(map(lambda e: str(e).split("-", 1)[0][-4:], list(map(lambda linha: list(linha.values()), todos_anos)))) 
    
    dic_jogos_por_ano = {}

    for ano in lista_anos :
        if ano in dic_jogos_por_ano :
            dic_jogos_por_ano[ano] += 1
        else:
            dic_jogos_por_ano[ano] = 1
            
    anos = dict(sorted(dic_jogos_por_ano.items()))

    x, y = anos.keys(), anos.values()

    return list([x, y])


# print(regista_anos('xadrez.csv'))

def regista_usernames(ficheiro_csv, coluna):
    """
    Args:
        ficheiro_csv(str): nome do ficheiro
        coluna(str): coluna de onde se quer obter a informação
    Returns:
        list(list): lista com um tuplo contendo o ano e o nome 
    """

    ficheiro = ler_csv_dicionario(ficheiro_csv)
    lista = limpa_converte(ficheiro, ["end_time" , coluna])

    lista_anos = list(map(lambda x: x,[list(linha.values())[0][:4] for linha in lista]))
    lista_nomes = list(map(lambda x: str(x).lower(),[list(linha.values())[1] for linha in lista]))

    anos_nomes = [(ano, nome) for ano, nome in zip(lista_anos, lista_nomes)]

    return anos_nomes

# print(regista_usernames('xadrez.csv', 'white_username'))

def lista_todos_usernames(ficheiro_csv):
    """
    Args:
        ficheiro_csv(str): nome do ficheiro
    Returns:
        list(list): lista com os valores do x e do y com os anos e os usernames 
    """

    anos_nomes_brancas = regista_usernames(ficheiro_csv, "white_username") 
    anos_nomes_pretas = regista_usernames(ficheiro_csv, "black_username") 

    dic_nomes_por_ano = {}

    # Vê no dicionário se as brancas já existem e dá append
    for chave, valor in [tuplo for tuplo in anos_nomes_brancas]:  
        if chave not in dic_nomes_por_ano.keys():
            dic_nomes_por_ano[chave] = [str(valor).lower()]
        else:
            dic_nomes_por_ano[chave].append(str(valor).lower())

    # Vê no dicionário se as pretas já existem e dá append
    for chave, valor in [tuplo for tuplo in anos_nomes_pretas]:  
        if chave not in dic_nomes_por_ano.keys():
            dic_nomes_por_ano[chave] = [str(valor).lower()]
        else:
            dic_nomes_por_ano[chave].append(str(valor).lower())
           
    dic_anos_nomes_ordenado = {chave: list(set(valor)) for chave, valor in sorted(dic_nomes_por_ano.items(), key=lambda item: item[0])}

    x, y = list(dic_anos_nomes_ordenado.keys()), [len(lista) for lista in dic_anos_nomes_ordenado.values()]

    return list([x,y])

# print(lista_todos_usernames('xadrez.csv'))

# GRÁFICO -----------------------------------------------------------------------------------
def anos(ficheiro_csv, options): 
    """Gráfico de barras dos anos

    Args:
        ficheiro_csv (str): nome do ficheiro
        options [dict]: opções do comando 
    """

    x_barras, y_barras = list(regista_anos(ficheiro_csv)[0]), list(regista_anos(ficheiro_csv)[1])
    x_linha, y_linha = list(lista_todos_usernames(ficheiro_csv)[0]), list(lista_todos_usernames(ficheiro_csv)[1])

    fig, ax = plt.subplots()
    ax1 = ax.twinx()
    
    ax.bar(x_barras, y_barras,color="green", label='#Jogos')
    ax1.plot(x_linha, y_linha,color="blue", label='#Jogadoras diferentes')
    ax.tick_params(axis ="x", labelrotation=90)
    ax.set_xlabel('Ano')
    ax.set_ylabel('Jogos', color="green")
    ax1.set_ylabel('#Jogadoras diferentes', color ="blue")
    ax1.set_ylim(0, 12830)
    fig.tight_layout()
    
    plt.title("Jogos e jogadoras por ano")
    plt.legend()
    plt.show()

# print(anos('xadrez.csv'))

####################################################################################################

# OPERAÇÃO CLASSES #################################################################################

def classes(input_file, options):
    """Devolve cinco gráficos,quatro de cada classe e um que devolve sempre as 4 classes principais.
    Os gráficos aparecem todos na mesma figura.

    Args:
        input_file (str): nome do ficheiro
        options [dict]: opções do comando
    """
    if options.get('c') == None:
        limit = 5
    else:
        limit = int(options.get('c'))

    raw_data = ler_csv_dicionario(input_file)
    columns_to_select = ['time_control', 'time_class']
    data = limpa_converte(raw_data, columns_to_select)

    classes = {}

    for row in data:
        time_class, time_control = row.get('time_class'), row.get('time_control')

        time_class_value = classes.get(time_class, {})

        time_control_count = time_class_value.get(time_control, 0)
        time_class_value[time_control] = time_control_count + 1
        
        classes[time_class] = time_class_value

    somas=[]

    for value in classes.values():
        soma = sum(value.values())
        somas.append(soma)

    lista_classes=[]
    for time_class in classes :
        unsorted_data = classes.get(time_class)

        sorted_data = { k : v for k,v in sorted(unsorted_data.items(), key=lambda item: item[1], reverse=True)}
        lista_classes.append(sorted_data)

    
    # GRÁFICO -----------------------------------------------------------------------------------

    x_axis_rapid =list(lista_classes[2].keys())[:limit]
    y_axis_rapid =list(lista_classes[2].values())[:limit]

    x_axis_daily =list(lista_classes[3].keys())[:limit]
    y_axis_daily =list(lista_classes[3].values())[:limit]

    x_axis_bullet =list(lista_classes[0].keys())[:limit]
    y_axis_bullet=list(lista_classes[0].values())[:limit]

    x_axis_blitz = list(lista_classes[1].keys())[:limit]
    y_axis_blitz = list(lista_classes[1].values())[:limit]

    x_axis_timeclass = list(classes.keys())[:limit]
    y_axis_timeclass = (somas)[:limit]

    fig, axs = plt.subplots(2, 3)
    axs[-1, -1].axis('off')
    axs[0, 0].bar(x_axis_rapid, y_axis_rapid)
    axs[0, 0].set_title("rapid")
    axs[0, 1].bar(x_axis_daily, y_axis_daily)
    axs[0, 1].set_title("daily")
    axs[0, 2].bar(x_axis_bullet, y_axis_bullet)
    axs[0, 2].set_title("bullet")
    axs[1, 0].bar(x_axis_blitz, y_axis_blitz)
    axs[1, 0].set_title("blitz")
    axs[1, 1].bar(x_axis_timeclass, y_axis_timeclass)
    axs[1, 1].set_title("time_class")
    
    for ax in axs.flat:
        ax.set(xlabel='Formato de jogo', ylabel='#Jogos')
        ax.tick_params(axis ="x", labelrotation=90)
    fig.tight_layout()
    plt.show()

# print(classes('xadrez.csv', 5)) # comentar as primeiras linhas dos comandos funcionar na window

####################################################################################################

# OPERAÇÃO VITÓRIAS ################################################################################

def vitorias(input_file, options):
    """Devolve um gráfico de barras em que as abcissas são os nomes das jogadoras e as ordenadas são as percentagens de vitórias

    Args:
        input_file (str): nome do ficheiro
        options [dict]: opções do comando
    """
    if options.get('c') == None:
        limit = 5
    else:
        limit = int(options.get('c'))
    
    if options.get('u') == None:
        nomes = None
    else:
        nomes = [options.get('u')[0],options.get('u')[1]]

    ficheiro = ler_csv_dicionario(input_file)

    resultado_brancas_nome = limpa_converte(ficheiro, ["white_result", "white_username"])
    resultado_pretas_nome = limpa_converte(ficheiro, ["black_result", "black_username"])
    
    dic_vitorias_brancas = {}
    dic_vitorias_pretas = {}


    for dicionario in resultado_brancas_nome: 
        
        nome_brancas = (list(dicionario.values())[1]).lower()
        resultado = list(dicionario.values())[0] 

        if nome_brancas not in dic_vitorias_brancas.keys():
            dic_vitorias_brancas[nome_brancas] = [resultado]
        else:
            dic_vitorias_brancas[nome_brancas].append(resultado)
    
    for dicionario in resultado_pretas_nome: 
        
        nome_pretas = (list(dicionario.values())[1]).lower() 
        resultado = list(dicionario.values())[0] 
    
        if nome_pretas not in dic_vitorias_pretas.keys():
            dic_vitorias_pretas[nome_pretas] = [resultado]
        else:
            dic_vitorias_pretas[nome_pretas].append(resultado)
         
    dic_vitorias_brancas_ordenado = sorted(dic_vitorias_brancas.items(), key = lambda item: len(item[1]), reverse = True) # dic ordenado por quantidade de jogos
    dic_vitorias_nomes_brancas = {chave: valor.count('win')/len(valor) for chave, valor in [tuplo for tuplo in dic_vitorias_brancas_ordenado ]}

    dic_vitorias_pretas_ordenado = sorted(dic_vitorias_pretas.items(), key = lambda item: len(item[1]), reverse = True) # dic ordenado por quantidade de jogos
    dic_vitorias_nomes_pretas= {chave: valor.count('win')/len(valor) for chave, valor in [tuplo for tuplo in dic_vitorias_pretas_ordenado ]}

    if nomes != None:
        resultado = [[(nomes[0], dic_vitorias_nomes_brancas[nomes[0]]), (nomes[1], dic_vitorias_nomes_brancas[nomes[1]])], [(nomes[0], dic_vitorias_nomes_pretas[nomes[0]]), (nomes[1], dic_vitorias_nomes_pretas[nomes[1]])]]
    
    else:
        resultado = list([list(dic_vitorias_nomes_brancas.items())[:limit], list(dic_vitorias_nomes_pretas.items())[:limit]])

    grafico_vitorias(resultado)

# print(vitorias('xadrez.csv', 5)) # comentar as primeiras linhas dos comandos funcionar na window

def grafico_vitorias(valores): 
    """Função aixiliar que faz o gráfico de barras das vitórias

    Args:
        valores(list):lista com os valores dos vários x e y a serem utilizados
    """

    x_brancas = [tuplo[0] for tuplo in valores[0]]
    y_brancas = [tuplo[1] for tuplo in valores[0]]

    y_pretas = [tuplo[1] for tuplo in valores[1]]

    x = np.arange(len(x_brancas))  #nºs até ao len -1 
    width = 0.35
    fig, ax = plt.subplots()

    ax.bar(x - width/2, y_brancas, width, label='peças brancas', color='lightgrey')
    ax.bar(x + width/2,  y_pretas, width, label='peças pretas', color="black")
    ax.tick_params(axis ="x", labelrotation=90)
    ax.set_xlabel('Jogadoras')
    ax.set_ylabel('Percentagem')
    ax.set_xticks(x)
    ax.set_xticklabels(x_brancas)

    ax.set_title('Percentagem de vitórias jogando com \npeças brancas/pretas')
    ax.legend()

    plt.show()


####################################################################################################

# OPERAÇÃO SEGUINTE ################################################################################

def seguinte(input_file, options):
    """Devolve um gráficos de barras das jogadas mais prováveis após uma dada jogada.

    Args:
        input_file (str): nome do ficheiro
        options [dict]: opções do comando
    """
    if options.get('c') == None:
        limit = 5
    else:
        limit = int(options.get('c'))

    if options.get('j') == None:
        move_to_find = 'e4'
    else:
        move_to_find = options.get('j')

    raw_data = ler_csv_dicionario(input_file)
    columns_to_select = ['pgn']
    data = limpa_converte(raw_data, columns_to_select)
    next_move_counter = {}
    for row in data:
        game = row.get('pgn')
        game = re.sub('{[^}]+}', '', game)
        game = re.sub('\d+[.]+', '', game)
        game = re.sub(' +', ' ', game)
        moves = game.strip().split(' ')
   
        if move_to_find == moves[0] :
            i_of_move = moves.index(move_to_find)
            next_move = moves[i_of_move + 1]            
            
            count = next_move_counter.get(next_move, 0)
            next_move_counter[next_move] = count + 1

    sorted_data = { k : v for k,v in sorted(next_move_counter.items(), key=lambda item: item[1], reverse=True)}
    total_nr_of_move = sum(sorted_data.values())

    # GRÁFICO -----------------------------------------------------------------------------------
    x_axis = list(sorted_data.keys())
    y_axis = [x / total_nr_of_move for x in  sorted_data.values()]
    
    fig, ax = plt.subplots()
    ax.set_ylabel('Probabilidade')
    ax.set_xlabel('Jogadas')
    ax.set_title('Jogadas mais prováveis depois de ' + str(move_to_find))
    ax.bar(x_axis[:limit], y_axis[:limit])

    fig.tight_layout()
    plt.show()

# print(seguinte('xadrez.csv', 5))

####################################################################################################

# OPERAÇÃO MATE ####################################################################################

def cria_dicionarios_vitorias(dados):
    """
        Função auxiliar que faz as operações necessarias para a função mate e devolve um dicionário 
        com os dados das vitórias totais

        Args:
            dados(list): lista com os dados das vitórias 
        Returns:
            dicionário com as vitórias totais 
    """
    dic_vitorias = {}

    for dicionario in dados: 
        nome_brancas = (list(dicionario.values())[1]).lower() 
        nome_pretas = (list(dicionario.values())[3]).lower() 
        resultado_brancas = list(dicionario.values())[0] 
        resultado_pretas = list(dicionario.values())[2] 
 
        if nome_brancas not in dic_vitorias.keys():
            dic_vitorias[nome_brancas] = [resultado_brancas]
        else:
            dic_vitorias[nome_brancas].append(resultado_brancas)

        if nome_pretas not in dic_vitorias.keys():
            dic_vitorias[nome_pretas] = [resultado_pretas]
        else:
            dic_vitorias[nome_pretas].append(resultado_pretas)

    return dic_vitorias

# print(cria_dicionarios_vitorias(limpa_converte(ler_csv_dicionario('xadrez.csv'), ["white_result", "white_username", "black_result", "black_username"])))

def cria_dicionarios_vitorias_check(dados):
    """
        Função auxiliar que faz as operações necessarias para a função mate e devolve um dicionário 
        com os dados das vitórias por checkmate
        Args:
            dados(list): lista com os dados das vitórias 
        Returns:
            dicionário com as vitórias por checkmate 
    """
    dic_vitorias_check = {}

    for dicionario in dados: 
        nome_brancas = (list(dicionario.values())[1]).lower()
        nome_pretas = (list(dicionario.values())[3]).lower()     
        resultado_brancas = list(dicionario.values())[0]
        resultado_pretas = list(dicionario.values())[2]

        if nome_brancas not in dic_vitorias_check.keys():
    
            dic_vitorias_check[nome_brancas] = []

        if nome_pretas not in dic_vitorias_check.keys():
            
            dic_vitorias_check[nome_pretas] = []

        dic_vitorias_check[nome_pretas].append(resultado_brancas)
    
        dic_vitorias_check[nome_brancas].append(resultado_pretas)

    return dic_vitorias_check

# print(cria_dicionarios_vitorias_check(limpa_converte(ler_csv_dicionario('xadrez.csv'), ["white_result", "white_username", "black_result", "black_username"])))

def operacoes_mate(ficheiro_csv, options):
    """Faz as operações necessárias para criar o gráfico da função mate

    Args:
        ficheiro_csv (str): nome do ficheiro
        options [dict]: opções do comando
    Returns:
        (list): lista com os dados dos vários x e y necessários para criar o gráfico da função mate
    """
    if options.get('c') == None:
        limit = 5
    else:
        limit = int(options.get('c'))
    
    ficheiro = ler_csv_dicionario(ficheiro_csv)

    resultado_brancas_pretas = limpa_converte(ficheiro, ["white_result", "white_username", "black_result", "black_username"])
    
    dic_vitorias = cria_dicionarios_vitorias(resultado_brancas_pretas)
    dic_vitorias_check = cria_dicionarios_vitorias_check(resultado_brancas_pretas)

    dic_vitorias_ordenado = sorted(dic_vitorias.items(), key = lambda item: len(item[1]), reverse = True)
    dic_vitorias_nomes = {chave: valor.count('win') for chave, valor in [tuplo for tuplo in dic_vitorias_ordenado ]}

    dic_vitorias_check_ordenado = sorted(dic_vitorias_check.items(), key = lambda item: len(item[1]), reverse = True) 
    dic_vitorias_nomes_check = {chave: valor.count('checkmated') for chave, valor in [tuplo for tuplo in dic_vitorias_check_ordenado ]}


    return list(dic_vitorias_nomes.items())[:limit], list(dic_vitorias_nomes_check.items())[:limit], [x/y for (x,y) in zip(list(dic_vitorias_nomes_check.values())[:limit], list(dic_vitorias_nomes.values())[:limit])]

# print(operacoes_mate('xadrez.csv', 5))

def mate(input_files, options):
    """Devolve uma figura com dois gráficos, com um eixo das abcissas comum representando o nome das jogadoras 
     e dois eixos de ordenadas distintos.

    Args:
        input_files (str): nome do ficheiro
        options [dict]: opções do comando
    """

    nomes = [tuplo[0] for tuplo in operacoes_mate(input_files, options)[0]]
    jogos_gahos = [tuplo[1] for tuplo in operacoes_mate(input_files, options)[1]] 
    jogos_checkmate = [tuplo[1] for tuplo in  operacoes_mate(input_files, options)[0]]
    percentagem = [valor for valor in  operacoes_mate(input_files, options)[2]]

    x = np.arange(len(nomes))  
    width = 0.35

    fig, ax = plt.subplots()
    ax2 = ax.twinx()
    ax.bar(x - width/2, jogos_gahos, width, label='jogos ganhos por xeque-mate', color='lightgrey')
    ax.bar(x + width/2, jogos_checkmate, width, label='jogos ganhos', color="blue")
    ax2.plot(percentagem, label="percentagem de xeque-mate", color='red') 
    
    ax.tick_params(axis ="x", labelrotation=90)
    ax.set_ylabel('#Jogos')
    ax2.set_ylabel('Percentagem de xeque-mate', color='red')
    ax.set_xticks(x)
    
    ax.set_xticklabels(nomes)
    ax.set_title('Percentagem de xeque-mate,\njogos ganhos, e jogos ganhos por xeque-mate')
    ax.legend()

    plt.show()

####################################################################################################

# COMANDO EXTRAIR ##################################################################################

def recolhe_dados(ficheiro_csv): 
    """Função auxiliar que cria dados e guarda-os numa lista enumerada por linha

    Args:
        ficheiro_csv (str): nome do ficheiro
    Returns:
        lista enumerada por linhas
    """
    
    dados = ler_csv_dicionario(ficheiro_csv)
    return list(enumerate(dados , 1))

def extrair(ficheiro_csv, options):
    """
    Args:
        ficheiro_csv (str): nome do ficheiro
        options [dict]: opções do comando
    """

    if options.get('o') == None:
        name_options = "out.csv"
    else:
        name_options = str(options.get('o'))

    if options.get('r') == None:
        expression_options = ".*"
    else:
        expression_options = str(options.get('r'))

    if options.get('d') == None:
        collumn_options = "wgm_username"
    else:
        collumn_options = str(options.get('d'))

    # name_options = "out.csv"
    # expression_options = ".*"
    # collumn_options = "wgm_username"

    lista_chaves = []
    for tuplo in recolhe_dados(ficheiro_csv):
        for key in tuplo[1].keys():
            if key == collumn_options:
                lista_chaves.append([tuplo[0], tuplo[1][key]])      
    
    nomes_expressao_re = [x for x in list(map(lambda x: [x[0], re.findall(expression_options+'\w+', x[1])], lista_chaves)) if x[1] != []]
    
    dic_saida = []

    for tuplo in list(map(lambda tuplo: tuplo, recolhe_dados(ficheiro_csv))):
        for numx in nomes_expressao_re:
            if tuplo[0] == numx[0]:
                dic_saida.append(tuplo[1]) 
    
    escrever_csv(name_options, dic_saida)

# print(extrair('xadrez.csv', 5))

def escrever_csv(nome_ficheiro, iterador_de_iteradores, separador = ','):
    """Escrever um iterador de iteradores num ficheiro CSV

    Args:
        nome_ficheiro (str): O nome do ficheiro
        iterador_de_iteradores (iter[iter]): O iterador
        separador: opcional
    """
    cabecalhos = list(iterador_de_iteradores[0].keys())

    dados = [linha for linha in iterador_de_iteradores]
        
    with open(nome_ficheiro, 'w' , newline='') as ficheiro_csv:
        escritor = csv.DictWriter(ficheiro_csv, fieldnames = cabecalhos)
        escritor.writeheader()
        escritor.writerows(dados)

####################################################################################################

# ARGUMENTOS #######################################################################################

if __name__ == '__main__':
    commands_map = {
        'anos': anos,
        'classes' : classes,
        'vitorias': vitorias,
        'seguinte' : seguinte,
        'mate': mate,
        'extrair': extrair
    }
    
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('input_file', help="É necessário indicar o ficheio de input")
    parser.add_argument('command', help="É preciso dar um comando")
    parser.add_argument('-c', help="É possível dar opções, optional")
    parser.add_argument('-j', help="É possível dar opções, optional")
    parser.add_argument('-u', nargs = 2, help="É possível dar opções, optional")
    parser.add_argument('-o', help="É possível dar opções, optional")
    parser.add_argument('-r', help="É possível dar opções, optional")
    parser.add_argument('-d', help="É possível dar opções, optional")

    arguments = parser.parse_args()

    options = {}
    options['c'] = arguments.c
    options['j'] = arguments.j
    options['u'] = arguments.u
    options['o'] = arguments.o
    options['r'] = arguments.r
    options['d'] = arguments.d

    func = commands_map.get(arguments.command)

    # Executa a função com o ficheiro de input e as opções dos comandos
    func(arguments.input_file,options)