// Selecciona el elemento SVG del DOM donde se dibujarán las formas
const svgCanvas = document.getElementById('svgCanvas');

// Clase Línea que representa una línea en un canvas SVG
class Linea {
    // Constructor que inicializa las coordenadas de inicio y fin de la línea
    constructor(x1, y1, x2, y2) {
        this._x1 = x1; // Almacena la coordenada x del inicio
        this._y1 = y1; // Almacena la coordenada y del inicio
        this._x2 = x2; // Almacena la coordenada x del final
        this._y2 = y2; // Almacena la coordenada y del final
    }

    // Métodos getter para acceder a las coordenadas de la línea
    get x1() { return this._x1; }
    get y1() { return this._y1; }
    get x2() { return this._x2; }
    get y2() { return this._y2; }

    // Métodos setter para modificar las coordenadas de la línea
    set x1(value) { this._x1 = value; }
    set y1(value) { this._y1 = value; }
    set x2(value) { this._x2 = value; }
    set y2(value) { this._y2 = value; }

    // Método para dibujar la línea usando SVG
    dibujar() {
        // Crea un nuevo elemento 'line' en el espacio de nombres SVG
        const lineaSVG = document.createElementNS("http://www.w3.org/2000/svg", "line");
        // Establece las coordenadas de inicio y fin en el elemento SVG
        lineaSVG.setAttribute("x1", this._x1);
        lineaSVG.setAttribute("y1", this._y1);
        lineaSVG.setAttribute("x2", this._x2);
        lineaSVG.setAttribute("y2", this._y2);
        lineaSVG.setAttribute("stroke", "black"); // Establece el color de la línea
        // Agrega la línea al canvas SVG
        svgCanvas.appendChild(lineaSVG);
    }
}

// Clase Circunferencia que representa una circunferencia en un canvas SVG
class Circunferencia {
    // Constructor que inicializa el centro y el radio de la circunferencia
    constructor(cx, cy, radio) {
        this._cx = cx; // Almacena la coordenada x del centro
        this._cy = cy; // Almacena la coordenada y del centro
        this._radio = radio; // Almacena el radio de la circunferencia
    }

    // Métodos getter para acceder a las propiedades de la circunferencia
    get cx() { return this._cx; }
    get cy() { return this._cy; }
    get radio() { return this._radio; }

    // Métodos setter para modificar las propiedades de la circunferencia
    set cx(value) { this._cx = value; }
    set cy(value) { this._cy = value; }
    set radio(value) { this._radio = value; }

    // Método para dibujar la circunferencia usando SVG
    dibujar() {
        // Crea un nuevo elemento 'circle' en el espacio de nombres SVG
        const circunferenciaSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        // Establece las coordenadas del centro y el radio en el elemento SVG
        circunferenciaSVG.setAttribute("cx", this._cx);
        circunferenciaSVG.setAttribute("cy", this._cy);
        circunferenciaSVG.setAttribute("r", this._radio);
        circunferenciaSVG.setAttribute("stroke", "black"); // Establece el color del borde
        circunferenciaSVG.setAttribute("fill", "none"); // No llena la circunferencia
        // Agrega la circunferencia al canvas SVG
        svgCanvas.appendChild(circunferenciaSVG);
    }
}

// Clase Elipse que representa una elipse en un canvas SVG
class Elipse {
    // Constructor que inicializa el centro y los radios mayor y menor de la elipse
    constructor(cx, cy, a, b) {
        this._cx = cx; // Almacena la coordenada x del centro
        this._cy = cy; // Almacena la coordenada y del centro
        this._a = a; // Almacena el radio mayor de la elipse
        this._b = b; // Almacena el radio menor de la elipse
    }

    // Métodos getter para acceder a las propiedades de la elipse
    get cx() { return this._cx; }
    get cy() { return this._cy; }
    get a() { return this._a; }
    get b() { return this._b; }

    // Métodos setter para modificar las propiedades de la elipse
    set cx(value) { this._cx = value; }
    set cy(value) { this._cy = value; }
    set a(value) { this._a = value; }
    set b(value) { this._b = value; }

    // Método para dibujar la elipse usando SVG
    dibujar() {
        // Crea un nuevo elemento 'ellipse' en el espacio de nombres SVG
        const elipseSVG = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        // Establece las coordenadas del centro y los radios en el elemento SVG
        elipseSVG.setAttribute("cx", this._cx);
        elipseSVG.setAttribute("cy", this._cy);
        elipseSVG.setAttribute("rx", this._a); // Radio en el eje x
        elipseSVG.setAttribute("ry", this._b); // Radio en el eje y
        elipseSVG.setAttribute("stroke", "black"); // Establece el color del borde
        elipseSVG.setAttribute("fill", "none"); // No llena la elipse
        // Agrega la elipse al canvas SVG
        svgCanvas.appendChild(elipseSVG);
    }
}

// Instanciar las primitivas y dibujarlas en el SVG
const linea = new Linea(50, 50, 200, 200); // Crea una nueva línea
const circunferencia = new Circunferencia(300, 100, 50); // Crea una nueva circunferencia
const elipse = new Elipse(400, 300, 80, 50); // Crea una nueva elipse

// Llama a los métodos dibujar para representar las formas en el SVG
linea.dibujar(); // Dibuja la línea
circunferencia.dibujar(); // Dibuja la circunferencia
elipse.dibujar(); // Dibuja la elipse
