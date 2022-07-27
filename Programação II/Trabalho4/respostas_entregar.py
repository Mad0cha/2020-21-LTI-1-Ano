# def limpa_converte(dados, lista_colunas, pred_filtragem,funs_converter):
#     tiraVazias = list(filter(pred_filtragem, dados)) # retira as vazias (tirar o list)

#     listaFiltrada = []
#     for elemento in tiraVazias:
#         lista_colunas = ['colA', 'colC']
#         filtraColunas = {chave: valor for chave, valor in elemento.items() if chave in lista_colunas}
#         listaFiltrada.append(filtraColunas)
       
#     return listaFiltrada

# dados = [{'colA':'', 'colB':'b', 'colC':''}, {'colA':'1', 'colB':'2', 'colC':'3'}, {'colA':'4', 'colB':'5', 'colC':'6'}]
# lista_colunas = ['colA', 'colC']
# pred_filtragem = lambda d: d['colC'] != ''
# funs_converter = [str, lambda x: 2*int(x)]
# print(limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter))


# # Melhorar o tamanho


import csv
def ler_csv_dicionario (nome_ficheiro, cabecalho = None):
    """Ler um ficheiro CSV. O ficheiro pode ou não ter cabeçalho.

    Args:
        nome_ficheiro (str): O nome do ficheiro
        fieldnames (list[str], optional):  A lista com o nomes das colunas.
            Utilizar quando o ficheiro não tiver cabeçalho. Defaults to None.

    Returns:
        list[dict]: Uma lista de dicionarios com o conteúdo do ficheiro;
            as chaves do dicionário são lidas da primeira linha do ficheiro
            ou tiradas da lista cabeçalho.
    """
    with open(nome_ficheiro) as ficheiro_csv:
        leitor = csv.DictReader(ficheiro_csv, fieldnames = cabecalho, delimiter = ';')
        return list(leitor)

#############################################################################################

# Ainda tem de ser melhorada mas por enquanrto é isto
def limpa_converte(dados, lista_colunas, pred_filtragem,funs_converter):
    tiraVazias = list(filter(pred_filtragem, dados)) # retira as vazias (tirar o list)

    listaFiltrada = []
    for elemento in tiraVazias:
        filtraColunas = {chave: valor for chave, valor in elemento.items() if chave in lista_colunas}
        listaFiltrada.append(filtraColunas)

    final = []
    for valor in listaFiltrada:
        for i in range(len(funs_converter)):
            (valor.update({list(valor.keys())[i]: funs_converter[i](list(valor.values())[i])}))
        final.append(valor)
    
    return final


dados = [{'colA':'', 'colB':'b', 'colC':''}, {'colA':'1', 'colB':'2', 'colC':'3'}, {'colA':'4', 'colB':'5', 'colC':'6'}]
lista_colunas = ['colA', 'colC']
pred_filtragem = lambda d: d['colC'] != ''
funs_converter = [str, lambda x: 2*int(x)]
print(limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter))


#############################################################################################


# Ainda tem de ser melhorada mas por enquanrto é isto

def media_movel(yy, janela):

    soma = [0]
    medias = []
    for i, x in enumerate(yy, 1):
        soma.append(soma[i-1] + x)
        if i>=janela:
            media = (soma[i] - soma[i-janela])/janela
            medias.append(media)

    return medias

yy=[92, 105, 96, 108, 104, 100, 106, 95, 104, 109]
# print(list(map(lambda x: round(x, 2), media_movel(yy, 3))))

yy=[92, 105, 96, 108, 104, 100, 106, 95, 104, 109]
indiceAtual = 0 
for indice, valor in enumerate(yy):
    indiceAtual = indice


#############################################################################################


# Ainda tem de ser melhorada mas por enquanrto é isto

def desvio_padrao(yy, janela):
    soma = []
    desvios = []
    
    for i, x in enumerate(yy, 0):
        
        if i>=janela:
            soma.pop(0)
            soma.append(x)
            tamanho = len(soma)
            media = sum(soma) / tamanho
            variancia = sum((x-media)**2 for x in soma) / len(soma)
            desvio_padrao = variancia**(1/2)
            desvios.append(desvio_padrao)
        
            
        else:
            soma.append(x)
            tamanho = len(soma)
            media = sum(soma) / tamanho
            variancia = sum((x-media)**2 for x in soma) / len(soma)
            desvio_padrao = variancia**(1/2)
            desvios.append(desvio_padrao)
        
    return desvios
        
        
        
yy=[92, 105, 96, 108, 104, 100, 106, 95, 104, 109]
print(list(map(lambda x: round(x, 2), desvio_padrao(yy, 3))))



# Para o kyoto
# dados = ler_csv_dicionario("kyoto.csv")[4:]
# lista_colunas = ['AD','Full-flowering date (DOY)']
# pred_filtragem = lambda d: d['Full-flowering date (DOY)'] != ''
# funs_converter = [str, lambda x: 2*int(x)]
# print(limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter))





# ATUALIZADAS 

def limpa_converte(dados, lista_colunas, pred_filtragem,funs_converter):
    tiraVazias = filter(pred_filtragem, dados) # retira as vazias (tirar o list)
    listaFiltrada = map(lambda elemento: {chave: valor for chave, valor in elemento.items() if chave in lista_colunas}, tiraVazias)

    final = []
    for valor in listaFiltrada:
        for i in range(len(funs_converter)):
            (valor.update({list(valor.keys())[i]: funs_converter[i](list(valor.values())[i])}))
        final.append(valor)
    
    return final


dados = [{'colA':'', 'colB':'b', 'colC':''}, {'colA':'1', 'colB':'2', 'colC':'3'}, {'colA':'4', 'colB':'5', 'colC':'6'}]
lista_colunas = ['colA', 'colC']
pred_filtragem = lambda d: d['colC'] != ''
funs_converter = [str, lambda x: 2*int(x)]
print(limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter))


def media_movel(yy, janela):

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

yy=[92, 105, 96, 108, 104, 100, 106, 95, 104, 109]
print(list(map(lambda x: round(x, 2), media_movel(yy, 3))))

# Ainda tem de ser reduzida
def desvio_padrao(yy, janela):
    soma = []
    desvios = []
    
    for i, x in enumerate(yy, 0):
        
        if i>=janela:
            soma.pop(0)
            soma.append(x)
            tamanho = len(soma)
            media = sum(soma) / tamanho
            variancia = sum((x-media)**2 for x in soma) / len(soma)
            desvio_padrao = variancia**(1/2)
            desvios.append(desvio_padrao)
        
            
        else:
            soma.append(x)
            tamanho = len(soma)
            media = sum(soma) / tamanho
            variancia = sum((x-media)**2 for x in soma) / len(soma)
            desvio_padrao = variancia**(1/2)
            desvios.append(desvio_padrao)
        
    return desvios
        
yy=[92, 105, 96, 108, 104, 100, 106, 95, 104, 109]
print(list(map(lambda x: round(x, 2), desvio_padrao(yy, 3))))




# Certo em principio
dados = ler_csv_dicionario("kyoto.csv")
lista_colunas = ['AD','Full-flowering date (DOY)']
pred_filtragem = lambda d: d['Full-flowering date (DOY)'] != ''
funs_converter = [int, int]
janela = 30

import numpy as np
import matplotlib.pyplot as plt

abcissas = list(map(lambda abcissa: list(abcissa.values())[0], limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter)))
ordenadas = list(map(lambda ordenada: list(ordenada.values())[1], limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter)))

plt.scatter(abcissas, ordenadas, s=1.5, color= 'green')
plt.xlabel("Ano DC")
plt.ylabel("Dias a partir do início do ano", color='green')
plt.title('Registo Histórico da Data de Florescimento \n das Cerejeiras em Quioto')
plt.show()

# Tirar o round das funções



















def desvio_padrao(yy, janela):
    soma = []
    desvios = []
    
    for i, x in enumerate(yy, 0):
        
        if i>=janela:
            soma.pop(0)
            soma.append(x)
            tamanho = len(soma)
            media = sum(soma) / tamanho
            variancia = sum((x-media)**2 for x in soma) / len(soma)
            desvio_padrao = variancia**(1/2)
            desvios.append(desvio_padrao)
        
            
        else:
            soma.append(x)
            tamanho = len(soma)
            media = sum(soma) / tamanho
            variancia = sum((x-media)**2 for x in soma) / len(soma)
            desvio_padrao = variancia**(1/2)
            desvios.append(desvio_padrao)
        
    return desvios
        
dados = ler_csv_dicionario("kyoto.csv")
lista_colunas = ['AD','Full-flowering date (DOY)']
pred_filtragem = lambda d: d['Full-flowering date (DOY)'] != ''
funs_converter = [int, int]
janela = 30

import numpy as np
import matplotlib.pyplot as plt

abcissas = list(map(lambda abcissa: list(abcissa.values())[0], limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter)))
ordenadas = list(map(lambda ordenada: list(ordenada.values())[1], limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter)))
ordenada_movel = list(map(lambda x: x, media_movel(ordenadas, janela)))

ordenada_desvio = list(map(lambda x: x, desvio_padrao(ordenadas, janela)))
dobro_desvio = list(map(lambda y: 2*y, ordenada_desvio))
superior =  [y1 + y2 for (y1, y2) in zip(ordenada_movel, dobro_desvio)]
inferior = [y1 - y2 for (y1, y2) in zip(ordenada_movel, dobro_desvio)]

# plt.fill_between(superior, inferior)
# plt.plot(abcissas, superior)
# plt.plot(abcissas, inferior)
# plt.plot(abcissas, ordenadas, 'go')
# plt.plot(abcissas, ordenada_movel, 'b-')
plt.scatter(abcissas, ordenadas, s=1.5, color= 'green')
plt.plot(abcissas, ordenada_movel, 'b-')
plt.fill_between(abcissas, superior, inferior, alpha= 0.2)
plt.xlabel("Ano DC")
plt.ylabel("Dias a partir do início do ano", color='green')
plt.title('Registo Histórico da Data de Florescimento \n das Cerejeiras em Quioto')
plt.show()





def sismos(ficheiro_csv):
    with open(ficheiro_csv, encoding='utf-8') as ficheiro_csv:
        dados = list(csv.DictReader(ficheiro_csv, delimiter = ','))

        lista_colunas = ['time','mag']
        pred_filtragem = lambda d: d['mag'] != ''
        funs_converter = [str, str]
        janela = 30

        dados_limpos = limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter)

        datas = []
        for dicionario in dados_limpos:
            data_limpa = datetime.datetime.strptime(list(dicionario.values())[0].split(".")[0], '%Y-%m-%dT%H:%M:%S')

            tempoMinutos = datetime.datetime(int(data_limpa.strftime("%Y")),int(data_limpa.strftime("%m")),int(data_limpa.strftime("%d")),int(data_limpa.strftime("%H")),int(data_limpa.strftime("%M"))) - datetime.datetime(2021, 3, 1, 0, 0, 0)

            datas.append(int(tempoMinutos.total_seconds() / 60 ))

        return datas

print(sismos("all_month.csv"))

import datetime
from itertools import groupby

def sismos(ficheiro_csv):
    with open(ficheiro_csv, encoding='utf-8') as ficheiro_csv:
        dados = list(csv.DictReader(ficheiro_csv, delimiter = ','))

        lista_colunas = ['time','mag']
        pred_filtragem = lambda d: d['mag'] != ''
        funs_converter = [str, str]
        janela = 30
        parametros = {"titulo":'Registo Histórico da Data de Florescimento \n das Cerejeiras em Quioto', "xLabel":"Ano DC", "yLabel":"Dias a partir do início do ano"}

        dados_limpos = limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter)

        minutosInicio = []
        magnitudes = []
        for dicionario in dados_limpos:
            magnitudes.append(float(list(dicionario.values())[1])) 
            data_limpa = datetime.datetime.strptime(list(dicionario.values())[0].split(".")[0], '%Y-%m-%dT%H:%M:%S')

            tempoMinutos = datetime.datetime(int(data_limpa.strftime("%Y")),int(data_limpa.strftime("%m")),int(data_limpa.strftime("%d")),int(data_limpa.strftime("%H")),int(data_limpa.strftime("%M"))) - datetime.datetime(2021, 3, 1, 0, 0, 0)

            minutosInicio.append(int(tempoMinutos.total_seconds() / 60 ))

        minutos_magnitudes = list(zip(minutosInicio,magnitudes))

        minutos_agrupados = []
        minutos_agrupados.append([(minuto, list(list(zip(*(magnitudes)))[1])) for minuto, magnitudes in groupby(minutos_magnitudes, itemgetter(0))])
    
        media_minuto = []
        minuto = []
        for tuplo in minutos_agrupados[0]:
            minuto.append(tuplo[0])
            media_minuto.append(sum(tuplo[1])/len(tuplo[1]))

    
    return tracar(minuto,media_minuto,parametros) #media_minuto #lista com as médias por minuto 

print(sismos("all_month.csv"))



######################## FINAL #################################

def limpa_converte(dados, lista_colunas, pred_filtragem,funs_converter):
    tiraVazias = filter(pred_filtragem, dados) # retira as vazias (tirar o list)
    listaFiltrada = map(lambda elemento: {chave: valor for chave, valor in elemento.items() if chave in lista_colunas}, tiraVazias)

    final = []
    for valor in listaFiltrada:
        for i in range(len(funs_converter)):
            (valor.update({list(valor.keys())[i]: funs_converter[i](list(valor.values())[i])}))
        final.append(valor)
    
    return final


dados = [{'colA':'', 'colB':'b', 'colC':''}, {'colA':'1', 'colB':'2', 'colC':'3'}, {'colA':'4', 'colB':'5', 'colC':'6'}]
lista_colunas = ['colA', 'colC']
pred_filtragem = lambda d: d['colC'] != ''
funs_converter = [str, lambda x: 2*int(x)]
print(limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter))


def media_movel(yy, janela):

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

yy=[92, 105, 96, 108, 104, 100, 106, 95, 104, 109]
print(list(map(lambda x: round(x, 2), media_movel(yy, 3))))

# Ainda tem de ser reduzida
def desvio_padrao(yy, janela):
    soma = []
    desvios = []
    
    for i, x in enumerate(yy, 0):
        
        if i>=janela:
            soma.pop(0)
            soma.append(x)
            tamanho = len(soma)
            media = sum(soma) / tamanho
            variancia = sum((x-media)**2 for x in soma) / len(soma)
            desvio_padrao = variancia**(1/2)
            desvios.append(desvio_padrao)
        
            
        else:
            soma.append(x)
            tamanho = len(soma)
            media = sum(soma) / tamanho
            variancia = sum((x-media)**2 for x in soma) / len(soma)
            desvio_padrao = variancia**(1/2)
            desvios.append(desvio_padrao)
        
    return desvios
        
yy=[92, 105, 96, 108, 104, 100, 106, 95, 104, 109]
print(list(map(lambda x: round(x, 2), desvio_padrao(yy, 3))))
 
def sakura(ficheiro_csv):
    with open(ficheiro_csv) as ficheiro_csv:
        dados = csv.DictReader(ficheiro_csv, delimiter = ';')

        lista_colunas = ['AD','Full-flowering date (DOY)']
        pred_filtragem = lambda d: d['Full-flowering date (DOY)'] != ''
        funs_converter = [int, int]
        janela = 30
        
        parametros = {"titulo":'Registo Histórico da Data de Florescimento \n das Cerejeiras em Quioto', "xLabel":"Ano DC", "yLabel":"Dias a partir do início do ano"}

        abcissas_ordenadas = list(map(lambda abcissa: list(abcissa.values()), limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter)))
        abcissas = list(map(lambda x: x[0], abcissas_ordenadas))
        ordenadas = list(map(lambda x: x[1], abcissas_ordenadas))
         
        return tracar(abcissas,ordenadas,parametros)

print(sakura("kyoto.csv"))


import datetime
from itertools import groupby

def sismos(ficheiro_csv):
    with open(ficheiro_csv, encoding='utf-8') as ficheiro_csv:
        dados = list(csv.DictReader(ficheiro_csv, delimiter = ','))

        lista_colunas = ['time','mag']
        pred_filtragem = lambda d: d['mag'] != ''
        funs_converter = [str, str]
        janela = 30
        parametros = {"titulo":'Registo dos sismos registados \n em março de 2021', "xLabel":"Minutos a partir do início do mês", "yLabel":"Média das magnitudes"}

        dados_limpos = limpa_converte(dados, lista_colunas, pred_filtragem, funs_converter)

        minutosInicio = []
        for dicionario in dados_limpos:
    
            data_limpa = datetime.datetime.strptime(list(dicionario.values())[0].split(".")[0], '%Y-%m-%dT%H:%M:%S')
            tempoMinutos = datetime.datetime(int(data_limpa.strftime("%Y")),int(data_limpa.strftime("%m")),int(data_limpa.strftime("%d")),int(data_limpa.strftime("%H")),int(data_limpa.strftime("%M"))) - datetime.datetime(2021, 3, 1, 0, 0, 0)
            minutosInicio.append(int(tempoMinutos.total_seconds() / 60 ))
       
        minutos_magnitudes = list(zip(minutosInicio,list(map(lambda dicionario: float(list(dicionario.values())[1]), dados_limpos))))
        minutos_agrupados = list(map(lambda x: x, [(minuto, list(list(zip(*(magnitudes)))[1])) for minuto, magnitudes in groupby(minutos_magnitudes, itemgetter(0))]))
        minuto, media_minuto = list(map(lambda tuplo: tuplo[0], minutos_agrupados)), list(map(lambda tuplo: sum(tuplo[1])/len(tuplo[1]), minutos_agrupados))

    return tracar(minuto,media_minuto,parametros) 

print(sismos("all_month.csv"))

