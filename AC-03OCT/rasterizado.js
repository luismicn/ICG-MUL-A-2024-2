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
            const x = Math.floor(Math.random() * 700) + 50; // Mantener los puntos dentro del área
            const y = Math.floor(Math.random() * 600) + 50;
            puntos.push(new Punto(x, y));
        }
        return puntos;
    }

    static calcularCentroide(puntos) {
        let sumaX = 0, sumaY = 0;
        for (let i = 0; i < puntos.length; i++) {
            sumaX += puntos[i].getX();
            sumaY += puntos[i].getY();
        }
        return new Punto(sumaX / puntos.length, sumaY / puntos.length);
    }
}

// Clase para ordenar puntos
class Ordenador {
    static ordenar(puntos) {
        const centroide = GeneradorPuntos.calcularCentroide(puntos);
        let angulos = [];

        // Calcular los ángulos para cada punto
        for (let i = 0; i < puntos.length; i++) {
            const angulo = Math.atan2(puntos[i].getY() - centroide.getY(), puntos[i].getX() - centroide.getX());
            angulos.push({
                punto: puntos[i],
                angulo: angulo
            });
        }

        // Ordenar los puntos
        angulos.sort((a, b) => a.angulo - b.angulo);

        // Devolver los puntos ordenados
        return angulos.map(item => item.punto);
    }
}

// Clase para dibujar el polígono utilizando imágenes
class DibujadorPoligono {
    static dibujar(puntos) {
        const canvasDiv = document.getElementById('canvasDiv');
        canvasDiv.innerHTML = ''; // Limpiar el canvas

        // Dibuja los puntos como imágenes
        for (let i = 0; i < puntos.length; i++) {
            const x = puntos[i].getX();
            const y = puntos[i].getY();
            const img = document.createElement('img');
            img.src = 'path/to/point_image.png'; // Cambiar a la ruta de la imagen deseada
            img.className = 'point';
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
            canvasDiv.appendChild(img);
        }

        // Dibuja el polígono conectando los puntos
        let pathData = `M ${puntos[0].getX()} ${puntos[0].getY()}`;
        for (let i = 1; i < puntos.length; i++) {
            pathData += ` L ${puntos[i].getX()} ${puntos[i].getY()}`;
        }
        pathData += ' Z'; // Cierra el polígono

        const polygon = document.createElement('div');
        polygon.style.position = 'absolute';
        polygon.style.border = '2px solid blue'; // Color del polígono
        polygon.style.clipPath = `polygon(${puntos.map(p => `${p.getX()}px ${p.getY()}px`).join(', ')})`;
        canvasDiv.appendChild(polygon);
    }

    static dibujarCentroide(centroide) {
        const canvasDiv = document.getElementById('canvasDiv');
        const cx = centroide.getX();
        const cy = centroide.getY();
        const img = document.createElement('img');
        img.src = 'path/to/centroide_image.png'; // Cambiar a la ruta de la imagen del centroide deseada
        img.className = 'point centroide';
        img.style.left = `${cx}px`;
        img.style.top = `${cy}px`;
        canvasDiv.appendChild(img);
    }
}

// Clase para analizar si el polígono es convexo o cóncavo
class AnalizadorPoligono {
    static esConvexo(puntos) {
        function crossProduct(o, a, b) {
            return (a.getX() - o.getX()) * (b.getY() - o.getY()) - (a.getY() - o.getY()) * (b.getX() - o.getX());
        }

        let crossProducts = [];
        const n = puntos.length;

        for (let i = 0; i < n; i++) {
            const o = puntos[i];
            const a = puntos[(i + 1) % n];
            const b = puntos[(i + 2) % n];
            const cp = crossProduct(o, a, b);
            crossProducts.push(cp);
        }

        const positive = crossProducts.every(cp => cp > 0);
        const negative = crossProducts.every(cp => cp < 0);

        return positive || negative ? "Convexo" : "Cóncavo";
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
