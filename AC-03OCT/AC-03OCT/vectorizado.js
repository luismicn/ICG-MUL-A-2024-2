class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }
}

class Poligono {
    #svg;
    #result;
    #centroide;
    #puntos; // Guardamos los puntos generados
    #centroideVisible; // Estado de visibilidad del centroide

    constructor(svgElement, resultElement) {
        this.#svg = svgElement;
        this.#result = resultElement;
        this.#centroide = null; // Inicializamos el centroide como null
        this.#puntos = []; // Inicializamos los puntos como un arreglo vacío
        this.#centroideVisible = false; // Inicializamos el estado de visibilidad del centroide
    }

    #generarPuntos(cantidad) {
        const puntos = [];
        const margen = 20; // Margen para evitar que los puntos se salgan
        const ancho = this.#svg.width.baseVal.value - margen * 2;
        const alto = this.#svg.height.baseVal.value - margen * 2;

        for (let i = 0; i < cantidad; i++) {
            const x = Math.random() * ancho + margen; // Mantener dentro de los márgenes
            const y = Math.random() * alto + margen; // Mantener dentro de los márgenes
            puntos.push(new Punto(x, y));
        }
        return puntos;
    }

    #calcularCentroide(puntos) {
        const sumaX = puntos.reduce((sum, punto) => sum + punto.getX(), 0);
        const sumaY = puntos.reduce((sum, punto) => sum + punto.getY(), 0);
        const centroideX = sumaX / puntos.length;
        const centroideY = sumaY / puntos.length;
        return new Punto(centroideX, centroideY);
    }

    #dibujarPoligono() {
        const cantidad = parseInt(document.getElementById('cantidadPuntos').value);
        this.#puntos = this.#generarPuntos(cantidad); // Guardamos los puntos generados

        // Limpiar SVG
        this.#svg.innerHTML = '';

        const pathData = this.#puntos.map((p, index) => 
            `${index === 0 ? 'M' : 'L'} ${p.getX()},${p.getY()}`
        ).join(' ') + ' Z';

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        polygon.setAttribute('d', pathData);
        polygon.setAttribute('stroke', 'black');
        polygon.setAttribute('fill', 'rgba(0, 0, 255, 0.3)');
        this.#svg.appendChild(polygon);

        // Calcular el centroide
        this.#centroide = this.#calcularCentroide(this.#puntos);

        this.#result.textContent = ''; // Limpiar resultado
    }

    mostrarPoligono() {
        this.#dibujarPoligono();
    }

    mostrarCentroide() {
        if (!this.#centroide) return; // Si no hay centroide, salir

        if (this.#centroideVisible) {
            // Si el centroide ya es visible, lo ocultamos
            const lines = this.#svg.querySelectorAll('line');
            lines.forEach(line => line.remove());
            const centroideCircle = this.#svg.querySelector('circle');
            if (centroideCircle) centroideCircle.remove();
            this.#result.textContent = ''; // Limpiar resultado
        } else {
            // Dibujar líneas desde cada punto al centroide
            this.#puntos.forEach(p => {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', p.getX());
                line.setAttribute('y1', p.getY());
                line.setAttribute('x2', this.#centroide.getX());
                line.setAttribute('y2', this.#centroide.getY());
                line.setAttribute('stroke', 'red');
                this.#svg.appendChild(line);
            });

            const centroideCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            centroideCircle.setAttribute('cx', this.#centroide.getX());
            centroideCircle.setAttribute('cy', this.#centroide.getY());
            centroideCircle.setAttribute('r', 7);
            centroideCircle.setAttribute('fill', 'green');
            this.#svg.appendChild(centroideCircle);
        }

        // Cambiar el estado de visibilidad del centroide
        this.#centroideVisible = !this.#centroideVisible;
    }
}

const svg = document.getElementById('polygonSvg');
const result = document.getElementById('result');
const poligono = new Poligono(svg, result);

document.getElementById('restoreButton').onclick = () => poligono.mostrarPoligono();
document.getElementById('centroideButton').onclick = () => poligono.mostrarCentroide();
