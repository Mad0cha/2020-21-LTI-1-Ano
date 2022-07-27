import csv
import matplotlib.pyplot as plt
from itertools import groupby
from operator import itemgetter
import datetime

def limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter):

    """Função que limpa um conjunto de dados de acordo com as condições definidas no predicado de filtragem

    Args:
        dados (list): Lista de dicionário que contém o conteúdo que se pretende limpar 
        lista_colunas (list): Lista de strings correspondentes aos cabeçalhos das colunas que interessam 
        pred_filtragem (function): Predicado que filtra as linhas que correspondam à condição especificada no predicado 
        funs_converter (list):  Lista de predicados para transformar os dados de forma a serem mais fáceis de trabalhar 

    Returns:
        (list): Retorna uma lista filtrada e convertida de acordo com os parametros especificados
        
    """
    tira_vazias = filter(pred_filtragem, dados) 
    lista_filtrada = map(lambda elemento: {chave: valor for chave, valor in elemento.items() if chave in lista_colunas}, tira_vazias) 

    lista_final = []
    for valor in lista_filtrada: 
        for i in range(len(funs_converter)): 
            valor.update({list(valor.keys())[i]: funs_converter[i](list(valor.values())[i])}) 
        lista_final.append(valor)
    
    return lista_final

# # Testes
# dados = [{'colA':'', 'colB':'b', 'colC':''}, {'colA':'1', 'colB':'2', 'colC':'3'}, {'colA':'4', 'colB':'5', 'colC':'6'}]
# lista_colunas = ['colA', 'colC']
# pred_filtragem = lambda d: d['colC'] != ''
# funs_converter = [str, lambda x: 2*int(x)]
# print(limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter))


def media_movel(yy, janela):

    """ Função que recebe a lista dos valores das ordenadas de um conjunto de dados e uma dimensão de janela e calcula a média móvel respetiva

    Args:
        yy (list): lista dos valores das ordenadas de um conjunto de dados
        janela (int): dimensão da janela usada para calcular a média móvel

    Returns:
        (list): Lista das médias móveis calculadas
    """

    lista_soma = [] 
    medias = []
    for indice, valor in enumerate(yy): 
        if indice >= janela:
            lista_soma.pop(0) 

            lista_soma.append(valor) 
            medias.append(sum(lista_soma)/len(lista_soma)) 
        else:
            lista_soma.append(valor) 
            medias.append(sum(lista_soma)/len(lista_soma))
    
    return medias

# yy=[92, 105, 96, 108, 104, 100, 106, 95, 104, 109]
# print(list(map(lambda x: round(x, 2), media_movel(yy, 3))))

def desvio_padrao(yy, janela):

    """Função que recebe a lista dos valores das ordenadas de um conjunto de dados e uma dimensão de janela e calcula o desvio padrão respetivo

    Args:
        yy (list): lista dos valores das ordenadas de um conjunto de dados
        janela (int): dimensão da janela usada para calcular o desvio padrão

    Returns:
        (list): Lista dos desvios padrão calculados
    """
    soma, desvios = [], []
    
    for indice, valor in enumerate(yy, 0):
        
        if indice >= janela:
            soma.pop(0)

            soma.append(valor) 
            desvios.append((sum((valor-(sum(soma)/len(soma)))**2 for valor in soma) / len(soma))**(1/2))

        else:
            soma.append(valor)
            desvios.append((sum((valor-(sum(soma)/len(soma)))**2 for valor in soma) / len(soma))**(1/2))
        
    return desvios

# yy=[92, 105, 96, 108, 104, 100, 106, 95, 104, 109]
# print(list(map(lambda x: round(x, 2), desvio_padrao(yy, 3))))

def tracar(abcissas, ordenadas, parametros, janela=30):

    """
    Args:
        abcissas (list): Lista de valores para as abcissas que vão ser utilizadas para desenhar o gráfico
        ordenadas (list): Lista de valores para as ordenadas que vão ser utilizadas para desenhar o gráfico
        parametros (list): Lista de parâmetros para embelezar o gráfico 
        janela (int): valor da janela temporal representada no gráfico

    """
    ordenada_movel = list(map(lambda x: x, media_movel(ordenadas, janela))) 
    dobro_desvio = list(map(lambda y: 2*y, desvio_padrao(ordenadas, janela)))

    superior =  [y1 + y2 for (y1, y2) in zip(ordenada_movel, dobro_desvio)]
    inferior = [y1 - y2 for (y1, y2) in zip(ordenada_movel, dobro_desvio)]

    plt.scatter(abcissas, ordenadas, s=float(parametros['s']), color=parametros['colorScatter']) 
    plt.plot(abcissas, ordenada_movel, color=parametros['colorPlot'])
    plt.fill_between(abcissas, superior, inferior, alpha = float(parametros['alpha']), color=parametros['colorFill'])

    plt.title(parametros['titulo'], color = parametros['colorTitulo'])
    plt.xlabel(parametros['xLabel'], color = parametros['colorX'])
    plt.ylabel(parametros['yLabel'], color = parametros['colorY'])
    
    plt.show()

def sakura(ficheiro_csv):

    """Função que lê dados de um ficheiro CSV, limpa e converte esses dados e traça os gráficos
    da média móvel, do desvio padrão e o da diferença entre mm+2dp e mm-2dp 
    (mm- média móvel, dp- desvio padrão)

    Args:
       ficheiro_csv (str): Nome do ficheiro CSV que vai ser analisado

    Returns:
        Retorna os gráficos referentes aos dados que lhe são passados
    """

    with open(ficheiro_csv) as ficheiro_csv:
        dados = csv.DictReader(ficheiro_csv, delimiter = ';')

        lista_colunas = ['AD','Full-flowering date (DOY)']
        pred_filtragem = lambda d: d['Full-flowering date (DOY)'] != ''
        funs_converter = [int, int]
        janela = 30
        
        parametros = {"titulo":'Registo Histórico da Data de Florescimento \n das Cerejeiras em Quioto',"colorTitulo":'pink', 
        "xLabel":"Ano DC","colorX":"grey","yLabel":"Dias a partir do início do ano","colorY":"grey", "s":"1.5", "alpha":"0.2",
        "colorScatter":"c", "colorPlot":'pink', "colorFill":"lightblue"}

        abcissas_ordenadas = list(map(lambda abcissa: list(abcissa.values()), limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter))) 
        abcissas = list(map(lambda x: x[0], abcissas_ordenadas))
        ordenadas = list(map(lambda x: x[1], abcissas_ordenadas))
         
        return tracar(abcissas,ordenadas,parametros)

sakura("kyoto.csv")

def sismos(ficheiro_csv):

    """Função que lê dados de um ficheiro CSV, limpa e converte esses dados e traça os gráficos
    da média móvel, do desvio padrão e o da diferença entre mm+2dp e mm-2dp 
    (mm- média móvel, dp- desvio padrão)

    Args:
        ficheiro_csv (str): Nome do ficheiro CSV que vai ser analisado

    Returns:
        Retorna os gráficos referentes aos dados que lhe são passados
    """

    with open(ficheiro_csv, encoding='utf-8') as ficheiro_csv:
        dados = list(csv.DictReader(ficheiro_csv, delimiter = ','))

        lista_colunas = ['time','mag']
        pred_filtragem = lambda d: d['mag'] != ''
        funs_converter = [(lambda x: x.split(".")[0]), float]
        janela = 30

        parametros = {"titulo":'Registo dos sismos registados \n em março de 2021',"colorTitulo":'tomato', 
        "xLabel":"Minutos a partir do início do mês", "colorX":"grey", "yLabel":"Média das magnitudes", "colorY":"grey",
        "s":"1.5", "alpha":"0.2","colorScatter":"orange", "colorPlot":'tomato', "colorFill":"gold"}

        dados_limpos = limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter)

        minutosInicio = []
        for dicionario in dados_limpos:
    
            data_limpa = datetime.datetime.strptime(list(dicionario.values())[0], '%Y-%m-%dT%H:%M:%S')
            tempoMinutos = datetime.datetime(int(data_limpa.strftime("%Y")),int(data_limpa.strftime("%m")),int(data_limpa.strftime("%d")),int(data_limpa.strftime("%H")),int(data_limpa.strftime("%M"))) - datetime.datetime(2021, 3, 1, 0, 0, 0) 
            minutosInicio.append(int(tempoMinutos.total_seconds() / 60 )) 
       
        minutos_magnitudes = list(zip(minutosInicio,list(map(lambda dicionario: list(dicionario.values())[1], dados_limpos)))) 
        minutos_agrupados = list(map(lambda x: x, [(minuto, list(list(zip(*(magnitudes)))[1])) for minuto, magnitudes in groupby(minutos_magnitudes, itemgetter(0))])) 
        minuto, media_minuto = list(map(lambda tuplo: tuplo[0], minutos_agrupados)), list(map(lambda tuplo: sum(tuplo[1])/len(tuplo[1]), minutos_agrupados)) 

    return tracar(minuto,media_minuto,parametros) 

sismos("all_month.csv")


