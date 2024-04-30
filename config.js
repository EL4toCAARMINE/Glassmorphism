(()=>{
    const rangeInput = document.getElementById('range');
    const rangeInputT = document.getElementById('rangeT');
    const elementoConFiltro = document.getElementById('container');
    const botonCopiar = document.getElementById('copy');
    const colorI = document.getElementById('color');
    const code = document.querySelector('code');
    
    function hexToRgb(hex) {
        hex = hex.replace('#', '');

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return `${r}, ${g}, ${b}`;
    }

    function actualizarFiltro() {
        const valor = rangeInput.value;
        const colorVal = colorI.value;
        const transp =  rangeInputT.value;

        elementoConFiltro.style.backdropFilter = `blur(${valor}px)`;
        elementoConFiltro.style.webkitBackdropFilter = `blur(${valor}px)`;
        elementoConFiltro.style.backgroundColor = `rgba(${hexToRgb(colorVal)}, ${transp})`;
        
        code.innerText =  
        `
background: rgba(${hexToRgb(colorVal)}, ${transp});
box-shadow: 0 8px 32px 0 #0000005e;
backdrop-filter: blur(${valor});
-webkit-backdrop-filter: blur(${valor});
border-radius: 20px;`
    }       

    // Función para copiar el contenido del código CSS
    function copiarCodigoCSS() {
        // Seleccionar el texto dentro del código CSS
        const codigo = code.innerText;

        // Crear un elemento temporal (input) para copiar el texto
        const inputTemp = document.createElement('input');
        inputTemp.setAttribute('value', codigo);
        document.body.appendChild(inputTemp);

        // Seleccionar y copiar el texto del input temporal
        inputTemp.select();
        document.execCommand('copy');

        // Eliminar el input temporal
        document.body.removeChild(inputTemp);

        // Alerta o mensaje de copia realizada
        Toastify({
            text: "Código CSS copiado al portapapeles",
            duration: 3000,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #505050, #595959)",
            },
        }).showToast();
    }

    botonCopiar.addEventListener('click', copiarCodigoCSS);

    rangeInput.addEventListener('input', actualizarFiltro);
    rangeInputT.addEventListener('input', actualizarFiltro);
    colorI.addEventListener('input', actualizarFiltro);

    actualizarFiltro();
})()