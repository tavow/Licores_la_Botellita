window.addEventListener('load', function () {
    //Capturar el formulario 
    //let formulario = document.querySelector('.formulario');
    let formulario = document.getElementById('formulario');
    console.log(formulario.elements.nombre.value);
    formulario.addEventListener('submit', function (evento) {
        if (!validaciones(evento)) {
            evento.preventDefault();
        } else {
            formulario.submit();
        }

        function validaciones(evento) {
            //Destructuring  
            let { nombre, precio, descuento, descripcion} = formulario.elements;
            let errores = [];
            console.log('Validaciones');
            console.log(formulario.elements.nombre.value);
            console.log(formulario.elements.precio.value);
            //Validar Nombre
            if (nombre.value == '') {
                errores.push('El campo Nombre no puede estar vacio...');
                nombre.classList.add('is-invalid');
                //errores['nombre'] = 'El campo nombre no puede estar vacio... ';
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }

            //Validar Precio
            if (precio.value == '') {
                errores.push('El campo precio no puede estar vacio...');
                precio.classList.add('is-invalid');
                //errores['precio'] = 'El campo nombre no puede estar vacio...';
            } else {
                precio.classList.add('is-valid');
                precio.classList.remove('is-invalid');
            }

            //Validar descuento
            if (descuento.value == '') {
                errores.push('El campo descuento no puede estar vacio...');
                descuento.classList.add('is-invalid');
                //errores['descuento'] = 'El campo nombre no puede estar vacio... ';
            } else {
                descuento.classList.add('is-valid');
                descuento.classList.remove('is-invalid');
            }

            //Validar descripcion
            if (descripcion.value == '') {
                errores.push('El campo descripcion no puede estar vacio...');
                descripcion.classList.add('is-invalid');
                //errores['telefono'] = 'El campo nombre no puede estar vacio... ';
            } else {
                descripcion.classList.add('is-valid');
                descripcion.classList.remove('is-invalid');
            }

            //Aquí enviamos los errores al usuario
            let ulErrores = document.getElementById('errores');
            ulErrores.classList.add('alert-danger')
            if (errores.length > 0) {
                evento.preventDefault();
                ulErrores.innerHTML = "";
                for (let i = 0; i < errores.length; i++) {
                    ulErrores.innerHTML += `<li> ${errores[i]} </li> `
                }
                errores = [];
            } else {
                return true;
            }
        }

    })

})