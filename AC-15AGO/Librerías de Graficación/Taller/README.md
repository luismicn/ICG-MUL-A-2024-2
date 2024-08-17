Conceptos fundamentales - Luis Miguel Castiblanco

-------- Parte 1 HTML ----------

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
   