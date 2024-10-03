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
    #canvas;
    #ctx;
    #result;

    constructor(canvasElement, resultElement) {
        this.#canvas = canvasElement;
        this.#ctx = this.#canvas.getContext('2d');
        this.#result = resultElement;
    }

    #generarPuntos(cantidad) {
        const puntos = [];
        const margen = 20; // Margen para evitar que los puntos se salgan
        const ancho = this.#canvas.width - margen * 2;
        const alto = this.#canvas.height - margen * 2;

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
        const puntos = this.#generarPuntos(cantidad);

        // Limpiar el canvas
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        // Dibujar el polígono
        this.#ctx.beginPath();
        puntos.forEach((p, index) => {
            const x = p.getX();
            const y = p.getY();
            if (index === 0) {
                this.#ctx.moveTo(x, y);
            } else {
                this.#ctx.lineTo(x, y);
            }
        });
        this.#ctx.closePath();
        this.#ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        this.#ctx.fill();
        this.#ctx.strokeStyle = 'black';
        this.#ctx.stroke();

        // Calcular el centroide
        const centroide = this.#calcularCentroide(puntos);
        
        // Dibujar líneas desde cada punto al centroide
        puntos.forEach(p => {
            this.#ctx.beginPath();
            this.#ctx.moveTo(p.getX(), p.getY());
            this.#ctx.lineTo(centroide.getX(), centroide.getY());
            this.#ctx.strokeStyle = 'red';
            this.#ctx.stroke();
        });

        // Dibujar el centroide
        this.#ctx.beginPath();
        this.#ctx.arc(centroide.getX(), centroide.getY(), 7, 0, 2 * Math.PI);
        this.#ctx.fillStyle = 'green';
        this.#ctx.fill();
        this.#ctx.stroke();

        this.#result.textContent = ''; // Limpiar resultado
    }

    mostrarPoligono() {
        this.#dibujarPoligono();
    }

    mostrarCentroide() {
        const cantidad = parseInt(document.getElementById('cantidadPuntos').value);
        const puntos = this.#generarPuntos(cantidad);
        const centroide = this.#calcularCentroide(puntos);

        this.#ctx.beginPath();
        this.#ctx.arc(centroide.getX(), centroide.getY(), 7, 0, 2 * Math.PI);
        this.#ctx.fillStyle = 'green';
        this.#ctx.fill();
        this.#ctx.stroke();

        this.#result.textContent = `Centroide: (${centroide.getX().toFixed(2)}, ${centroide.getY().toFixed(2)})`;
    }
}

const canvas = document.getElementById('polygonCanvas');
const result = document.getElementById('result');
const poligono = new Poligono(canvas, result);

document.getElementById('restoreButton').onclick = () => poligono.mostrarPoligono();
document.getElementById('centroideButton').onclick = () => poligono.mostrarCentroide();