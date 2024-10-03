// Clase Punto con encapsulamiento
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

// Clase para generar y manejar puntos
class GeneradorPuntos {
    static generarPuntos(numPuntos) {
        const puntos = [];
        for (let i = 0; i < numPuntos; i++) {
            const x = Math.floor(Math.random() * 700) + 50; // Mantener los puntos dentro del SVG
            const y = Math.floor(Math.random() * 700) + 50; // Ajustado para el alto del SVG
            puntos.push(new Punto(x, y));
        }
        return puntos;
    }

    static calcularCentroide(puntos) {
        let sumaX = 0, sumaY = 0;
        for (const punto of puntos) {
            sumaX += punto.getX();
            sumaY += punto.getY();
        }
        return new Punto(sumaX / puntos.length, sumaY / puntos.length);
    }
}

// Clase para ordenar puntos
class Ordenador {
    static ordenar(puntos) {
        const centroide = GeneradorPuntos.calcularCentroide(puntos);
        return puntos.sort((a, b) => {
            const anguloA = Math.atan2(a.getY() - centroide.getY(), a.getX() - centroide.getX());
            const anguloB = Math.atan2(b.getY() - centroide.getY(), b.getX() - centroide.getX());
            return anguloA - anguloB;
        });
    }
}

// Clase para dibujar el polígono utilizando SVG
class DibujadorPoligono {
    static dibujar(puntos) {
        const svg = document.getElementById('polygonSvg');
        svg.innerHTML = ''; // Limpiar el SVG

        // Dibuja los puntos como cuadrados
        puntos.forEach(punto => {
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", punto.getX() - 5);
            rect.setAttribute("y", punto.getY() - 5);
            rect.setAttribute("width", 10);
            rect.setAttribute("height", 10);
            rect.setAttribute("fill", "black");
            svg.appendChild(rect);
        });

        // Dibuja el polígono conectando los puntos
        let pathData = `M ${puntos[0].getX()} ${puntos[0].getY()}`;
        for (let i = 1; i < puntos.length; i++) {
            pathData += ` L ${puntos[i].getX()} ${puntos[i].getY()}`;
        }
        pathData += ' Z'; // Cierra el polígono

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "blue");
        svg.appendChild(path);
    }

    static dibujarCentroide(centroide) {
        const svg = document.getElementById('polygonSvg');
        const cx = centroide.getX();
        const cy = centroide.getY();
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", 5);
        circle.setAttribute("class", "centroide");
        svg.appendChild(circle);
    }
}

// Clase para analizar si el polígono es convexo o cóncavo
class AnalizadorPoligono {
    static esConvexo(puntos) {
        function crossProduct(o, a, b) {
            return (a.getX() - o.getX()) * (b.getY() - o.getY()) - (a.getY() - o.getY()) * (b.getX() - o.getX());
        }

        const n = puntos.length;
        let crossProducts = [];
        
        for (let i = 0; i < n; i++) {
            const o = puntos[i];
            const a = puntos[(i + 1) % n];
            const b = puntos[(i + 2) % n];
            crossProducts.push(crossProduct(o, a, b));
        }

        const positivo = crossProducts.every(cp => cp > 0);
        const negativo = crossProducts.every(cp => cp < 0);
        return positivo || negativo ? "Convexo" : "Cóncavo";
    }
}

// Función principal para generar el polígono y verificar su tipo
let puntosGenerados = [];

function main() {
    const cantidadSeleccionada = parseInt(document.getElementById('cantidadPuntos').value);
    puntosGenerados = GeneradorPuntos.generarPuntos(cantidadSeleccionada);
    puntosGenerados = Ordenador.ordenar(puntosGenerados);
    DibujadorPoligono.dibujar(puntosGenerados);
    const tipoPoligono = AnalizadorPoligono.esConvexo(puntosGenerados);
    document.getElementById('result').innerText = `El polígono es ${tipoPoligono}.`;
}

// Evento para el botón de restaurar
document.getElementById('restoreButton').addEventListener('click', () => {
    main();
});

// Evento para el botón de mostrar centroide
document.getElementById('centroideButton').addEventListener('click', () => {
    const centroide = GeneradorPuntos.calcularCentroide(puntosGenerados);
    DibujadorPoligono.dibujarCentroide(centroide);
});

// Generar el polígono al cargar la página
window.onload = main;