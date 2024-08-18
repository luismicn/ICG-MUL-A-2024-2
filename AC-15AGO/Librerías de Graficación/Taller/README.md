Conceptos fundamentales - Luis Miguel Castiblanco

-------- Parte 1 HTML ----------

    Para esta primera parte, se va a detallar el funcionamiento de cada etiqueta encontrada en el código html, para así entender las especificaciones graficas que se encuentran en la interfaz desarrollada.

    "<!DOCTYPE html>": Declara el tipo de documento y la versión de HTML.
    "<html lang="es">": Indica que el idioma del contenido está en español.

    "<head>": Contiene información meta y recursos de la página.

    "<meta charset="UTF-8">": Define la codificación de caracteres como UTF-8 (Secuencias de 8 bits para modificar caracteres).
    "<meta name="viewport" content="width=device-width, initial-scale=1.0">": Establece el viewport para que el diseño sea responsivo en dispositivos móviles.
    "<title>" Define el titulo de la pestaña de la página web. 
    "<style>": Contiene CSS para dar estilo al documento, es decir, define cómo se muestran los elementos de la página.
    "body { font-family: Arial, sans-serif; margin: 20px; }": Define la fuente del texto, en este caso Arial, y el margen del cuerpo de la página.
    "canvas { border: 1px solid black; }": Da un borde negro al elemento "<canvas>", es decir, al lienzo donde se dibujan las figuras 2D.

    "<body>": Contiene el contenido visible de la página.

    "Las etiquetas <h1></h1> - <h6></h6> se emplean para titulos o subtitulos, según su tamaño.
    "<form id="figuraForm">": Define un formulario con el id figuraForm para recopilar información del usuario.
    "<label for="tipo">Tipo de figura:</label>": Etiqueta para el menú desplegable que permite seleccionar el tipo de figura.
    "<select id="tipo">": Menú desplegable para elegir el tipo de figura.
    "<option value="cuadrado">Cuadrado</option>": Opciones del menú desplegable, para cada valor específico.

    --- Para las coordenadas cartesianas ---
    "<label for="x">Posición X (px):</label>": Etiqueta para el campo de entrada de la posición X.
    "<input type="number" id="x" min="0" value="50">": Campo de entrada para la posición X, con valor inicial de 50. ("min" es mínimo).
    "<label for="y">Posición Y (px):</label>": Etiqueta para el campo de entrada de la posición Y.
    "<input type="number" id="y" min="0" value="50">": Campo de entrada para la posición Y, con valor inicial de 50.

    --- Para las coordenadas polares ---
    "<label for="radio">Radio (px):</label>": Etiqueta para el campo de entrada del radio.
    "<input type="number" id="radio" min="0" value="100">": Campo de entrada para el radio, con valor inicial de 100.
    "<label for="angulo">Ángulo (grados):</label>": Etiqueta para el campo de entrada del ángulo.
    "<input type="number" id="angulo" min="0" max="360" value="0">": Campo de entrada para el ángulo, con valor inicial de 0.

    --- Rotación ----
    "<label for="rotacion">Rotación (grados):</label>: Etiqueta para el campo de entrada de la rotación.
    "<input type="number" id="rotacion" min="0" max="360" value="0">: Campo de entrada para la rotación, con valor inicial de 0.

    --- Tamaño ---
    "<label for="tamaño">Tamaño (px):</label>": Etiqueta para el campo de entrada del tamaño de la figura.
    "<input type="number" id="tamaño" min="1" value="50">": Campo de entrada para el tamaño, con valor inicial de 50.

    --- Color Relleno Figura ---
    "<label for="colorFigura">Color de la figura:</label>": Etiqueta para el selector de color de la figura.
    "<input type="color" id="colorFigura" value="#FFFFFF">": Selector de color para la figura, con color inicial blanco (#FFFFFF).

    --- Color Borde Figura ---
    "<label for="colorBorde">Color del borde:</label>": Etiqueta para el selector de color del borde.
    "<input type="color" id="colorBorde" value="#000000">": Selector de color para el borde, con color inicial negro (#000000).

    --- Botones ---
    --> Se define mediante la etiqueta <button> y su ejecución es apartir de una función definida en JavaScript, programación orientada a objetos. Por ejemplo:
    "<button type="button" onclick="dibujarFigura()">Dibujar Figura</button>": Botón para dibujar una figura usando la función dibujarFigura().

    "<canvas id="miCanvas" width="800" height="600"></canvas>"
    El elemento <canvas> en HTML es un área en la que se puede dibujar gráficos dinámicamente utilizando JavaScript y se define con los atributos: "id" para identificar el nombre del lienzo, "width" ancho del lienzo y "height" altura del lienzo.

    "<script src = "Figuras2D.js"></script>": Se usa para incluir y ejecutar el código de JavaScript en el documento html.

------- Parte 2 JavaScript -------

    "let figuras = [];": Arreglo vacío para almacenar las figuras y sus especificaciones (tamaño, posición)

    La parte de JavaScript se basa principalmente en el uso de funciones que se emplean apartir de los parámetros dados por el usuario en los controles de formulario puestos en la interfaz creada con html. Mediante los valores que se asignan en la página web dinámica, las funciones o métodos en JavaScript permiten desarrollar, trazar y almacenar las figuras. Es decir, de forma general, JavaScript es la parte logica del programa y el código HTML se encarga de mostrar y recolectar los valores para las funciones. Algunas de las funciones en el código JavaScript son:

    - Función dibujarFigura: Recoge valores de un formulario, convierte coordenadas polares a cartesianas para ubicar la figura, almacena estos datos en el arreglo figuras, y luego llama a redibujarCanvas para actualizar el lienzo con todas las figuras.

    - Función redibujarCanvas: Borra el lienzo y vuelve a dibujar todas las figuras almacenadas en el arreglo figuras. Ajusta el contexto del lienzo para dibujar cada figura en su posición y rotación especificada, y soporta figuras básicas (cuadrado, círculo, triángulo) así como polígonos con varios lados.

    - Función borrarUltimaFigura: Elimina la última figura del arreglo y actualiza el lienzo para reflejar el cambio.

    - Función borrarTodasFiguras: Limpia el arreglo figuras y redibuja el lienzo, eliminando todas las figuras.

    - Función vectorizar: Genera un archivo SVG con las figuras almacenadas. Convierte cada figura a un formato SVG adecuado y crea un archivo descargable.

    Así mismo, es importante conocer los comandos que se emplean para dar desarrollo a la función/Método definido. Por ejemplo:

    "const canvas = document.getElementById('miCanvas');": Obtener elemento del canvas.
    "const ctx = canvas.getContext('2d');": Obtener el contexto del canvas.
    "const tipo = document.getElementById('tipo').value;" se emplea para obtener los valores asignados por el usuario en la interfaz. 
    "figuras.push({ tipo, x: xPolar, y: yPolar, tamaño, rotacion, colorFigura, colorBorde });" Almacena ls propiedades de las figuras y se agrega a la lista "Figuras". 

    Por otro lado, JavaScript para gestionar y dibujar figuras en el lienzo (canvas), y para exportarlas como archivos SVG, utiliza:

    - getElementById: Este método recupera elementos del DOM por su identificador, como el lienzo (canvas) y los campos del formulario. Es esencial para interactuar con la interfaz de usuario y obtener datos para procesar.

    - getContext('2d'): Obtiene el contexto de dibujo en 2D del lienzo. Este contexto proporciona métodos para dibujar y manipular gráficos, como fillRect, arc, y lineTo.

    - clearRect: Limpia un área del lienzo. Se usa para borrar el contenido anterior antes de redibujar las figuras, asegurando que no queden trazas de dibujos previos.

    - save y restore: Guardan y restauran el estado del contexto de dibujo. Se utilizan para aplicar transformaciones (como rotación y traslación) sin afectar otros elementos del lienzo.

    - translate y rotate: Ajustan el origen del contexto y aplican rotaciones a las figuras. translate mueve el origen del sistema de coordenadas, y rotate gira el contexto en torno al nuevo origen.

    - beginPath, moveTo, lineTo, closePath, fill, stroke: Estos métodos se usan para crear y dibujar formas. beginPath inicia un nuevo camino de dibujo, moveTo y lineTo definen los puntos del camino, y fill y stroke aplican el color de relleno y borde.

    - Blob, URL.createObjectURL, download: Utilizados en la función vectorizar para crear y descargar un archivo SVG que contiene las figuras. Blob crea un objeto de datos, URL.createObjectURL genera una URL para ese objeto, y download inicia la descarga del archivo.
