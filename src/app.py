import sys,json
import cv2
import time
import pytesseract
from pytesseract import Output

inicio = time.time()

pytesseract.pytesseract.tesseract_cmd = '/app/.apt/usr/bin/tesseract'

#C:/Program Files/Tesseract-OCR/tesseract.exe
image_teste = sys.argv[1]


img_cv = cv2.imread(image_teste, cv2.COLOR_BAYER_BG2BGR);

config_custom = r'--oem 3 --psm 6'

resultado = pytesseract.image_to_data(img_cv, config=config_custom, output_type= Output.DICT)

print('Resposta do Pytesseract: ', resultado['text'])

textos = ', '.join(resultado['text'])
remover = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZW?%)'
for i in range(0, len(remover)):
    textos = textos.replace(remover[i],"")
textos = textos.split(', ')
print('Após remoção das letras: ', textos)

soma=0
cont=0

for x in textos:
    if((x!='')):
        soma += int(x)
        cont += 1

media_consumo = round(soma/cont)
media_geracao = 0
if(media_consumo%10==0):
    print('nada a acrescentar...')
else:
    resto = media_consumo%10
    dividendo = round(media_consumo/10)
    media_geracao = media_consumo + resto + dividendo

print(media_geracao)

numero_placas = round((media_consumo)/(0.444*5.70*0.75*30))
potencia_sistema = 440 * numero_placas
valor_placas = 1100 * numero_placas
potencia_inversor = 0

if((potencia_sistema/1000)<=3):
    potencia_inversor=3
    valor_inversor=3500

elif(3<(potencia_sistema/1000)<=5):
    potencia_inversor=5
    valor_inversor=4500

elif(5<(potencia_sistema/1000)<=8):
    potencia_inversor=8
    valor_inversor=5500

valor_mat_instalacao = numero_placas*500 + 500

valor_orcamento = valor_inversor + valor_placas + valor_mat_instalacao

fim = time.time()

print ('Média de Consumo foi: ', media_consumo, ' kWh/mês')
print ('Número de placas: ', numero_placas, ' de 440 W')
print ('Potência total do sistema: ', (potencia_sistema/1000), ' kWp')
print ('Potência do Inversor: ', potencia_inversor, ' kW DEYE')
print ('Valor das placas: R$', valor_placas)
print ('Valor do Inversor: R$', valor_inversor)
print ('Valor dos Materiais e Instalação: R$', valor_mat_instalacao)
print ('Valor Total do Orçamento: R$', valor_orcamento)
print ('Tempo de execução: ', round((fim - inicio),3) )
