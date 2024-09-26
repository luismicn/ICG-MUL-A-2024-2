// Selecciona el elemento SVG del DOM donde se dibujarán las formas
const svgCanvas = document.getElementById('svgCanvas');

// Clase Punto que representa un punto en el espacio
class Punto {
    #x; // Coordenada x privada
    #y; // Coordenada y privada

    // Constructor que inicializa las coordenadas del punto
    constructor(x, y) {
        this.#x = x; // Asigna el valor a x
        this.#y = y; // Asigna el valor a y
    }

    // Métodos getter para acceder a las coordenadas
    get x() { return this.#x; }
    get y() { return this.#y; }

    // Métodos setter para modificar las coordenadas
    set x(value) { this.#x = value; }
    set y(value) { this.#y = value; }
}

// Clase Línea que representa una línea en un canvas SVG
class Linea {
    #p1; // Punto de inicio
    #p2; // Punto de fin

    // Constructor que inicializa los puntos de la línea
    constructor(x1, y1, x2, y2) {
        this.#p1 = new Punto(x1, y1); // Crea el punto inicial
        this.#p2 = new Punto(x2, y2); // Crea el punto final
    }

    // Método para dibujar la línea en el SVG
    dibujar() {
        const puntos = this.bresenham(); // Obtiene los puntos de la línea usando el algoritmo de Bresenham

        // Crea un único elemento 'line' para representar la línea
        const lineaSVG = document.createElementNS("http://www.w3.org/2000/svg", "line");
        lineaSVG.setAttribute("x1", this.#p1.x); // Establece la coordenada x del inicio
        lineaSVG.setAttribute("y1", this.#p1.y); // Establece la coordenada y del inicio
        lineaSVG.setAttribute("x2", this.#p2.x); // Establece la coordenada x del fin
        lineaSVG.setAttribute("y2", this.#p2.y); // Establece la coordenada y del fin
        lineaSVG.setAttribute("stroke", "black"); // Establece el color de la línea
        svgCanvas.appendChild(lineaSVG); // Agrega la línea al canvas SVG
    }

    // Algoritmo de Bresenham para determinar los puntos de la línea
    bresenham() {
        const puntos = []; // Array para almacenar los puntos de la línea
        let x1 = this.#p1.x; // Coordenada x del punto inicial
        let y1 = this.#p1.y; // Coordenada y del punto inicial
        let x2 = this.#p2.x; // Coordenada x del punto final
        let y2 = this.#p2.y; // Coordenada y del punto final

        const dx = Math.abs(x2 - x1); // Diferencia en x
        const dy = Math.abs(y2 - y1); // Diferencia en y
        const sx = (x1 < x2) ? 1 : -1; // Dirección en x
        const sy = (y1 < y2) ? 1 : -1; // Dirección en y
        let err = dx - dy; // Error inicial

        while (true) {
            puntos.push(new Punto(x1, y1)); // Agrega el punto actual a la lista
            if (x1 === x2 && y1 === y2) break; // Termina si se llega al punto final

            // El comando "===" se usa para comparar dos valores de forma estricta.
            
            const err2 = err * 2; // Duplicar el error para la comparación
            if (err2 > -dy) {
                err -= dy; // Ajusta el error
                x1 += sx; // Avanza en x
            }
            if (err2 < dx) {
                err += dx; // Ajusta el error
                y1 += sy; // Avanza en y
            }
        }
        return puntos; // Devuelve la lista de puntos que forman la línea
    }
}

// Clase Circunferencia que representa una circunferencia en un canvas SVG
class Circunferencia {
    #centro; // Punto central de la circunferencia
    #radio; // Radio de la circunferencia

    // Constructor que inicializa el centro y el radio de la circunferencia
    constructor(cx, cy, radio) {
        this.#centro = new Punto(cx, cy); // Crea el punto central
        this.#radio = radio; // Asigna el radio
    }

    // Método para dibujar la circunferencia en el SVG
    dibujar() {
        const circunferenciaSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferenciaSVG.setAttribute("cx", this.#centro.x); // Establece la coordenada x del centro
        circunferenciaSVG.setAttribute("cy", this.#centro.y); // Establece la coordenada y del centro
        circunferenciaSVG.setAttribute("r", this.#radio); // Establece el radio
        circunferenciaSVG.setAttribute("stroke", "black"); // Establece el color del borde
        circunferenciaSVG.setAttribute("fill", "none"); // No llena la circunferencia
        svgCanvas.appendChild(circunferenciaSVG); // Agrega la circunferencia al canvas SVG
    }
}

// Clase Elipse que representa una elipse en un canvas SVG
class Elipse {
    #centro; // Punto central de la elipse
    #a; // Radio mayor de la elipse
    #b; // Radio menor de la elipse

    // Constructor que inicializa el centro y los radios de la elipse
    constructor(cx, cy, a, b) {
        this.#centro = new Punto(cx, cy); // Crea el punto central
        this.#a = a; // Asigna el radio mayor
        this.#b = b; // Asigna el radio menor
    }

    // Método para dibujar la elipse en el SVG
    dibujar() {
        const elipseSVG = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipseSVG.setAttribute("cx", this.#centro.x); // Establece la coordenada x del centro
        elipseSVG.setAttribute("cy", this.#centro.y); // Establece la coordenada y del centro
        elipseSVG.setAttribute("rx", this.#a); // Establece el radio mayor
        elipseSVG.setAttribute("ry", this.#b); // Establece el radio menor
        elipseSVG.setAttribute("stroke", "black"); // Establece el color del borde
        elipseSVG.setAttribute("fill", "none"); // No llena la elipse
        svgCanvas.appendChild(elipseSVG); // Agrega la elipse al canvas SVG
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
