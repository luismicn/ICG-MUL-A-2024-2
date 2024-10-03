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
    #centroide;
    #puntos; // Guardamos los puntos generados
    #centroideVisible; // Estado de visibilidad del centroide

    constructor(canvasElement, resultElement) {
        this.#canvas = canvasElement;
        this.#ctx = canvasElement.getContext('2d');
        this.#result = resultElement;
        this.#centroide = null; // Inicializamos el centroide como null
        this.#puntos = []; // Inicializamos los puntos como un arreglo vacío
        this.#centroideVisible = false; // Inicializamos el estado de visibilidad del centroide
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
        this.#puntos = this.#generarPuntos(cantidad); // Guardamos los puntos generados

        // Limpiar canvas
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.#ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        this.#ctx.strokeStyle = 'black';
        this.#ctx.beginPath();
        this.#ctx.moveTo(this.#puntos[0].getX(), this.#puntos[0].getY());
        
        this.#puntos.forEach(p => {
            this.#ctx.lineTo(p.getX(), p.getY());
        });
        this.#ctx.closePath();
        this.#ctx.fill();
        this.#ctx.stroke();

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
            this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height); // Limpiar el canvas
            this.#dibujarPoligono(); // Volver a dibujar el polígono
            this.#result.textContent = ''; // Limpiar resultado
        } else {
            // Dibujar líneas desde cada punto al centroide
            this.#ctx.strokeStyle = 'red';
            this.#puntos.forEach(p => {
                this.#ctx.beginPath();
                this.#ctx.moveTo(p.getX(), p.getY());
                this.#ctx.lineTo(this.#centroide.getX(), this.#centroide.getY());
                this.#ctx.stroke();
            });

            // Dibujar el centroide
            this.#ctx.fillStyle = 'green';
            this.#ctx.beginPath();
            this.#ctx.arc(this.#centroide.getX(), this.#centroide.getY(), 7, 0, Math.PI * 2);
            this.#ctx.fill();
        }

        // Cambiar el estado de visibilidad del centroide
        this.#centroideVisible = !this.#centroideVisible;
    }
}

const canvas = document.getElementById('polygonCanvas');
const result = document.getElementById('result');
const poligono = new Poligono(canvas, result);

document.getElementById('restoreButton').onclick = () => poligono.mostrarPoligono();
document.getElementById('centroideButton').onclick = () => poligono.mostrarCentroide();
