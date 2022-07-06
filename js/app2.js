// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // se ejecuta cuando doy click en 'Agragar al carrito'
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del Carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar todo el carrito de Compras
    vaciarCarritoBtn.addEventListener('click', () => {
        if( articulosCarrito.length > 0 ) { // Preguntamos si en el carrito hay objetos
            articulosCarrito = []; //reseteamos el carrito
            limpiarHTML();
        } else {
            alert('Su carrito se encuentra Vacio');
        }
    })
}

////////////////////////////////////////////////////  Funciones  /////////////////////////////////////////////////
//Agregar curso al carrito
function agregarCurso(e) {
    e.preventDefault();// Previene el evento por default que seria redirigir al enlace del href

    if (e.target.classList.contains('agregar-carrito')) {
        let cursoElegido = e.target.parentElement.parentElement;
        leerDatosCurso(cursoElegido);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id'); //Obtener el Id del curso a Eliminar
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId ); // Lista en el arreglo todos los cursos Excepto el del id obtenido

        carritoHMTL();// Volvemos a iterar sobre el carrito y mostrar su HTML
    }
}

//lee el contenido html al que seleccionamos
function leerDatosCurso(curso) {

    //crear un objeto con el contenido del curso seleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    //Revisa si existe el articulo en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
        if( curso.id === infoCurso.id ){
            curso.cantidad++;
            return curso; //Retorna los objetos actualizados
        } else {
            return curso; // Retorna los cursos que no son duplicados
            }
        } );
        articulosCarrito = [...cursos];
    } else {
    //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHMTL();
}

// Muestra el carrito de compras en el HTML
function carritoHMTL() {

    // limpia el HTML
    limpiarHTML();
    articulosCarrito.forEach(curso => {
        const { imagen, nombre, precio, cantidad, id}= curso;
    // recorre el carrito  y genera HTML
        const row = document.createElement('tr');
        row.innerHTML= `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${nombre}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

    //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// ELimina el HTML del Carrito
function limpiarHTML(){
    //contenedorCarrito.innerHTML = '';//Forma lenta
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}