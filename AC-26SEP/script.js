// Selecciona el elemento SVG del DOM donde se dibujarán las formas
const svgCanvas = document.getElementById('svgCanvas');

// Clase Punto que representa un punto en el espacio
class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() { return this.#x; }
    get y() { return this.#y; }

    set x(value) { this.#x = value; }
    set y(value) { this.#y = value; }
}

// Clase Línea que representa una línea en un canvas SVG
class Linea {
    #p1; // Punto de inicio
    #p2; // Punto de fin

    constructor(x1, y1, x2, y2) {
        this.#p1 = new Punto(x1, y1);
        this.#p2 = new Punto(x2, y2);
    }

    dibujar() {
        const puntos = this.bresenham();
        puntos.forEach(p => {
            const puntoSVG = document.createElementNS("http://www.w3.org/2000/svg", "line");
            puntoSVG.setAttribute("x1", p.x);
            puntoSVG.setAttribute("y1", p.y);
            puntoSVG.setAttribute("x2", p.x);
            puntoSVG.setAttribute("y2", p.y);
            puntoSVG.setAttribute("stroke", "black");
            svgCanvas.appendChild(puntoSVG);
        });
    }

    // Algoritmo de Bresenham para determinar los puntos de la línea
    bresenham() {
        const puntos = [];
        let x1 = this.#p1.x;
        let y1 = this.#p1.y;
        let x2 = this.#p2.x;
        let y2 = this.#p2.y;

        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            puntos.push(new Punto(x1, y1));
            if (x1 === x2 && y1 === y2) break;
            const err2 = err * 2;
            if (err2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (err2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
        return puntos;
    }
}

// Clase Circunferencia que representa una circunferencia en un canvas SVG
class Circunferencia {
    #centro; // Punto central
    #radio;

    constructor(cx, cy, radio) {
        this.#centro = new Punto(cx, cy);
        this.#radio = radio;
    }

    dibujar() {
        const circunferenciaSVG = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circunferenciaSVG.setAttribute("cx", this.#centro.x);
        circunferenciaSVG.setAttribute("cy", this.#centro.y);
        circunferenciaSVG.setAttribute("r", this.#radio);
        circunferenciaSVG.setAttribute("stroke", "black");
        circunferenciaSVG.setAttribute("fill", "none");
        svgCanvas.appendChild(circunferenciaSVG);
    }
}

// Clase Elipse que representa una elipse en un canvas SVG
class Elipse {
    #centro; // Punto central
    #a; // Radio mayor
    #b; // Radio menor

    constructor(cx, cy, a, b) {
        this.#centro = new Punto(cx, cy);
        this.#a = a;
        this.#b = b;
    }

    dibujar() {
        const elipseSVG = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipseSVG.setAttribute("cx", this.#centro.x);
        elipseSVG.setAttribute("cy", this.#centro.y);
        elipseSVG.setAttribute("rx", this.#a);
        elipseSVG.setAttribute("ry", this.#b);
        elipseSVG.setAttribute("stroke", "black");
        elipseSVG.setAttribute("fill", "none");
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
