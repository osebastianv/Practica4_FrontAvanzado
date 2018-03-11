# AboutGoT

*AboutGoT* es una aplicación de frontend que simula una página web responsive de publicación de artículos de diferentes contenidos y un sistema de gestión de comentarios, utilizando para ello el paquete json-server que simula llamadas a un backend propio.

## 1. Entorno (versiones)

| Entorno | Versión |
| ------ | ------ |
| Visual studio code | 1.20.1 |
| Webpack | 3.11.0 |
| json-server | 0.12.1 |

| Paquete | Versión |
| ------ | ------ |
| npm | 5.6.0 |

| Navegador | Versión |
| ------ | ------ |
| chrome | 64.0.3282.167 (Build oficial) (64 bits) |

##	2. Backend json-server
Como prerrequisito debe tener instalado *json-server*. 

El paquete *json-server* utiliza el fichero *db.json* para dar servicio a las peticiones de lectura y escritura de la web. Contiene objetos de dos clases diferentes: artículos y comentarios.

Para arrancar el servidor backend, abra la consola de comandos (dentro de la carpeta de trabajo o bien dentro de visual studio code) y teclee:
```sh
npm run json-server
```

#### 2.1 Clase artículos
El fichero *db.json* contiene una lista de 10 artículos con las siguientes propiedades:
- id: identificación única del artículo.
- title: título del artículo.
- intro: párrafo de introducción del artículo.
- url: dirección url de la imagen/video asociado al artículo.
- urlType: con valor 1 es una url de tipo imagen; con valor 2 es un vídeo.
- author: autor del artículo.
- photo: foto del autor del artículo.
- date: fecha de creación del artículo.
- tag: etiqueta para agrupar artículos del mismo tipo.

Para incluir más artículos debe introducirlos manualmente en el fichero *db.json*.

#### 2.2 Clase comentarios
El fichero *db.json* contiene una lista de comentarios con las siguientes propiedades:
- id: identificación única del comentario.
- name: nombre de la persona que escribe el comentario.
- email: correo electrónico de la persona que escribe el comentario.
- text: texto del comentario.
- date: fecha de creación del comentario.

Para incluir más comentarios, la web contiene un formulario para añadirlos de forma dinámica. También se podrían introducir de forma manual en el fichero *db.json*.

##	3. Arrancar la aplicación
Una vez arrancado el servidor backend, arrancaremos la aplicación web. Teclee:
```sh
npm run serve
```
Con ello arrancaremos el servidor de desarrollo de webpack que actualiza el navegador cada vez que guardemos una modificación en el código fuente.

##	3. Funcionalidades de la aplicación
La aplicación contiene dos páginas estáticas que comparten cabecera y pie de página:
- Cabecera: contiene el nombre de la aplicación, un menú dinámico de categorías de artículos, una opción para hacer login (no activa) y una opción de búsqueda (no activa).
- Pie de página: contiene el copyright y un icono para subir la página hasta cabecera.

Las páginas estáticas son las siguientes:
- Lista de artículos: index.html.
- Detalle de un artículo estático: detail.html.

#### 3.1 Lista de artículos
Cada artículo contendrá:
- Una imagen o video.
- Un título. Si se pulsa sobre él se abre la página de detalle (la misma para todos los artículos).
- Una introducción del artículo.
- Información del autor: foto, nombre, fecha de creación del artículo.
- Número de comentarios sobre el artículo (el número es estático). Pulsando sobre esta zona, se abrirá la página de detalla y se posicionará en la sección de comentarios directamente.

El menú permite filtrar la lista por temática (en google chrome).

 #### 3.2 Detalle del artículo.
 
 Contiene la información de un artículo estático junto a un sistema de gestión de comentarios. La estructura es la siguiente:
 - Un título.
 - Una foto.
 - Información del autor: foto, nombre, fecha de creación del artículo.
 - Número de comentarios sobre el artículo
 - Lista de comentarios.
 - Formulario para añadir un comentario.
 
Cada opción de menú únicamente carga la página principal del listado de anuncios.
