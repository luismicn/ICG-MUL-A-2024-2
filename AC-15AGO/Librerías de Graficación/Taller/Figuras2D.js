 // Arreglo para almacenar las figuras
 let figuras = [];

 function dibujarFigura() {
     const canvas = document.getElementById('miCanvas');
     const ctx = canvas.getContext('2d');

     // Obtener los valores del formulario
     const tipo = document.getElementById('tipo').value;
     const x = parseInt(document.getElementById('x').value);
     const y = parseInt(document.getElementById('y').value);
     const radio = parseInt(document.getElementById('radio').value);
     const angulo = parseFloat(document.getElementById('angulo').value);
     const rotacion = parseFloat(document.getElementById('rotacion').value);
     const tamaño = parseInt(document.getElementById('tamaño').value);
     const colorFigura = document.getElementById('colorFigura').value;
     const colorBorde = document.getElementById('colorBorde').value;

     // Convertir coordenadas polares a cartesianas
     const anguloRad = (angulo * Math.PI) / 180;
     const xPolar = x + radio * Math.cos(anguloRad);
     const yPolar = y + radio * Math.sin(anguloRad);

     // Almacenar las propiedades de la figura
     figuras.push({ tipo, x: xPolar, y: yPolar, tamaño, rotacion, colorFigura, colorBorde });

     // Redibujar todas las figuras
     redibujarCanvas();
 }

 function redibujarCanvas() {
     const canvas = document.getElementById('miCanvas');
     const ctx = canvas.getContext('2d');

     // Limpiar el área del canvas
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     // Redibujar todas las figuras
     figuras.forEach(figura => {
         ctx.fillStyle = figura.colorFigura;
         ctx.strokeStyle = figura.colorBorde;
         ctx.lineWidth = 2;

         ctx.save(); // Guardar el estado actual del contexto
         ctx.translate(figura.x, figura.y); // Mover el origen al centro de la figura
         ctx.rotate((figura.rotacion * Math.PI) / 180); // Rotar el contexto

         if (figura.tipo === 'cuadrado') {
             // Dibujar un cuadrado
             ctx.fillRect(-figura.tamaño / 2, -figura.tamaño / 2, figura.tamaño, figura.tamaño);
             ctx.strokeRect(-figura.tamaño / 2, -figura.tamaño / 2, figura.tamaño, figura.tamaño);
         } else if (figura.tipo === 'circulo') {
             // Dibujar un círculo
             ctx.beginPath();
             ctx.arc(0, 0, figura.tamaño / 2, 0, 2 * Math.PI);
             ctx.fill();
             ctx.stroke();
         } else if (figura.tipo === 'triangulo') {
             // Dibujar un triángulo
             ctx.beginPath();
             ctx.moveTo(0, -figura.tamaño / 2);
             ctx.lineTo(-figura.tamaño / 2, figura.tamaño / 2);
             ctx.lineTo(figura.tamaño / 2, figura.tamaño / 2);
             ctx.closePath();
             ctx.fill();
             ctx.stroke();
         } else {
             // Dibujar polígonos (pentágono, hexágono, heptágono, octágono)
             const lados = {
                 'pentagono': 5,
                 'hexagono': 6,
                 'heptagono': 7,
                 'octagono': 8
             }[figura.tipo] || 0;
             
             if (lados > 0) {
                 ctx.beginPath();
                 for (let i = 0; i < lados; i++) {
                     const angulo = (i * 2 * Math.PI) / lados;
                     const xVertice = figura.tamaño * Math.cos(angulo);
                     const yVertice = figura.tamaño * Math.sin(angulo);
                     if (i === 0) {
                         ctx.moveTo(xVertice, yVertice);
                     } else {
                         ctx.lineTo(xVertice, yVertice);
                     }
                 }
                 ctx.closePath();
                 ctx.fill();
                 ctx.stroke();
             }
         }

         ctx.restore(); // Restaurar el estado del contexto
     });
 }

 function borrarUltimaFigura() {
     // Eliminar la última figura del arreglo
     figuras.pop();
     // Redibujar el canvas
     redibujarCanvas();
 }

 function borrarTodasFiguras() {
     // Vaciar el arreglo de figuras
     figuras = [];
     // Redibujar el canvas
     redibujarCanvas();
 }

 function vectorizar() {
     let svgContent = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">';
     figuras.forEach(figura => {
         const colorFigura = figura.colorFigura;
         const colorBorde = figura.colorBorde;
         const tamaño = figura.tamaño;

         if (figura.tipo === 'cuadrado') {
             svgContent += `<rect x="${figura.x - tamaño / 2}" y="${figura.y - tamaño / 2}" width="${tamaño}" height="${tamaño}" fill="${colorFigura}" stroke="${colorBorde}" stroke-width="2" transform="rotate(${figura.rotacion} ${figura.x} ${figura.y})"/>`;
         } else if (figura.tipo === 'circulo') {
             svgContent += `<circle cx="${figura.x}" cy="${figura.y}" r="${tamaño / 2}" fill="${colorFigura}" stroke="${colorBorde}" stroke-width="2"/>`;
         } else if (figura.tipo === 'triangulo') {
             svgContent += `<polygon points="${figura.x},${figura.y - tamaño / 2} ${figura.x - tamaño / 2},${figura.y + tamaño / 2} ${figura.x + tamaño / 2},${figura.y + tamaño / 2}" fill="${colorFigura}" stroke="${colorBorde}" stroke-width="2" transform="rotate(${figura.rotacion} ${figura.x} ${figura.y})"/>`;
         } else {
             const lados = {
                 'pentagono': 5,
                 'hexagono': 6,
                 'heptagono': 7,
                 'octagono': 8
             }[figura.tipo] || 0;
             
             if (lados > 0) {
                 let points = '';
                 for (let i = 0; i < lados; i++) {
                     const angulo = (i * 2 * Math.PI) / lados;
                     const xVertice = figura.tamaño * Math.cos(angulo);
                     const yVertice = figura.tamaño * Math.sin(angulo);
                     points += `${figura.x + xVertice},${figura.y + yVertice} `;
                 }
                 svgContent += `<polygon points="${points.trim()}" fill="${colorFigura}" stroke="${colorBorde}" stroke-width="2" transform="rotate(${figura.rotacion} ${figura.x} ${figura.y})"/>`;
             }
         }
     });
     svgContent += '</svg>';

     const blob = new Blob([svgContent], { type: 'image/svg+xml' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = 'figuras.svg';
     a.click();
     URL.revokeObjectURL(url);
 }