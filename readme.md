# AboutGoT

*AboutGoT* es una aplicaci�n de frontend que simula una p�gina web responsive de publicaci�n de art�culos de diferentes contenidos y un sistema de gesti�n de comentarios, utilizando para ello el paquete json-server que simula llamadas a un backend propio.

## 1. Entorno (versiones)

| Entorno | Versi�n |
| ------ | ------ |
| Visual studio code | 1.20.1 |
| Webpack | 3.11.0 |
| json-server | 0.12.1 |

| Paquete | Versi�n |
| ------ | ------ |
| npm | 5.6.0 |

| Navegador | Versi�n |
| ------ | ------ |
| chrome | 64.0.3282.167 (Build oficial) (64 bits) |

##	2. Backend json-server
Como prerrequisito debe tener instalado *json-server*. 

El paquete *json-server* utiliza el fichero *db.json* para dar servicio a las peticiones de lectura y escritura de la web. Contiene objetos de dos clases diferentes: art�culos y comentarios.

Para arrancar el servidor backend, abra la consola de comandos (dentro de la carpeta de trabajo o bien dentro de visual studio code) y teclee:
```sh
npm run json-server
```

#### 2.1 Clase art�culos
El fichero *db.json* contiene una lista de 10 art�culos con las siguientes propiedades:
- id: identificaci�n �nica del art�culo.
- title: t�tulo del art�culo.
- intro: p�rrafo de introducci�n del art�culo.
- url: direcci�n url de la imagen/video asociado al art�culo.
- urlType: con valor 1 es una url de tipo imagen; con valor 2 es un v�deo.
- author: autor del art�culo.
- photo: foto del autor del art�culo.
- date: fecha de creaci�n del art�culo.
- tag: etiqueta para agrupar art�culos del mismo tipo.

Para incluir m�s art�culos debe introducirlos manualmente en el fichero *db.json*.

#### 2.2 Clase comentarios
El fichero *db.json* contiene una lista de comentarios con las siguientes propiedades:
- id: identificaci�n �nica del comentario.
- name: nombre de la persona que escribe el comentario.
- email: correo electr�nico de la persona que escribe el comentario.
- text: texto del comentario.
- date: fecha de creaci�n del comentario.

Para incluir m�s comentarios, la web contiene un formulario para a�adirlos de forma din�mica. Tambi�n se podr�an introducir de forma manual en el fichero *db.json*.

##	3. Arrancar la aplicaci�n
Una vez arrancado el servidor backend, arrancaremos la aplicaci�n web. Teclee:
```sh
npm run serve
```
Con ello arrancaremos el servidor de desarrollo de webpack que actualiza el navegador cada vez que guardemos una modificaci�n en el c�digo fuente.

##	3. Funcionalidades de la aplicaci�n
La aplicaci�n contiene dos p�ginas est�ticas que comparten cabecera y pie de p�gina:
- Cabecera: contiene el nombre de la aplicaci�n, un men� din�mico de categor�as de art�culos, una opci�n para hacer login (no activa) y una opci�n de b�squeda (no activa).
- Pie de p�gina: contiene el copyright y un icono para subir la p�gina hasta cabecera.

Las p�ginas est�ticas son las siguientes:
- Lista de art�culos: index.html.
- Detalle de un art�culo est�tico: detail.html.

#### 3.1 Lista de art�culos
Cada art�culo contendr�:
- Una imagen o video.
- Un t�tulo. Si se pulsa sobre �l se abre la p�gina de detalle (la misma para todos los art�culos).
- Una introducci�n del art�culo.
- Informaci�n del autor: foto, nombre, fecha de creaci�n del art�culo.
- N�mero de comentarios sobre el art�culo (el n�mero es est�tico). Pulsando sobre esta zona, se abrir� la p�gina de detalla y se posicionar� en la secci�n de comentarios directamente.

El men� permite filtrar la lista por tem�tica (en google chrome).

 #### 3.2 Detalle del art�culo.
 
 Contiene la informaci�n de un art�culo est�tico junto a un sistema de gesti�n de comentarios. La estructura es la siguiente:
 - Un t�tulo.
 - Una foto.
 - Informaci�n del autor: foto, nombre, fecha de creaci�n del art�culo.
 - N�mero de comentarios sobre el art�culo
 - Lista de comentarios.
 - Formulario para a�adir un comentario.
 
Cada opci�n de men� �nicamente carga la p�gina principal del listado de anuncios.
