window.addEventListener('load', function () {
    //Capturar el formulario 
    let formulario = document.querySelector('.formulario');
    //console.log(formulario.elements.correo.value);
    formulario.addEventListener('submit', function (evento) {
        if (!validaciones(evento)) {
            evento.preventDefault();
        } else {
            formulario.submit();
        }

        function validaciones(evento) {
            //Destructuring  
            let { nombre, apellido, correo, password, re_password, telefono, direccion, ciudad, img } = formulario.elements;
            let errores = [];
            console.log(formulario.elements.re_password.value);
            //Validar Nombre
            if (nombre.value == '') {
                errores.push('El campo Nombre no puede estar vacio...');
                nombre.classList.add('is-invalid');
                //errores['nombre'] = 'El campo nombre no puede estar vacio... ';
            } else {
                nombre.classList.add('is-valid');
                nombre.classList.remove('is-invalid');
            }

            //Validar Apellido
            if (apellido.value == '') {
                errores.push('El campo Apellido no puede estar vacio...');
                apellido.classList.add('is-invalid');
                //errores['apellido'] = 'El campo nombre no puede estar vacio...';
            } else {
                apellido.classList.add('is-valid');
                apellido.classList.remove('is-invalid');
            }
            //Validar el email - Expresiones Regulares https://www.w3schools.com/jsref/jsref_obj_regexp.asp       https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
            let reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if (!reEmail.test(correo.value)) {
                errores.push('El email es inválido...');
                correo.classList.add('is-invalid');
                //errores['correo'] = 'El campo nombre no puede estar vacio...';
            } else {
                correo.classList.add('is-valid');
                correo.classList.remove('is-invalid');
            }
            //Aquí valido el password haciendo uso de Expresiones Regulares
            //Esta expresión regular valida como Mínimo seis caracteres, al menos una letra y un número:
            let rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            if (!rePassword.test(password.value)) {
                errores.push('La contraseña como mínimo debe tener seis caracteres, al menos una letra y un número');
                password.classList.add('is-invalid');
                //errores['last_name'] = 'El campo nombre no puede estar vacio...';
            } else {
                password.classList.add('is-valid');
                password.classList.remove('is-invalid');
            }
            //Aquí valido a que la confirmación del password no llegue vacia
            if (re_password.value == "") {
                errores.push('La confirmación de la contraseña no puede estar vacia');
                re_password.classList.add('is-invalid');

            } else {
                //Ahora valido si las dos contraseñas son iguales
                if (password.value != re_password.value && re_password != "") {
                    errores.push('Las contraseñas deben ser iguales');
                    re_password.classList.add('is-invalid');
                    //errores['re_password'] = 'El campo nombre no puede estar vacio...';
                } else {
                    re_password.classList.add('is-valid');
                    re_password.classList.remove('is-invalid');
                }
            }
            //Validar Telefono
            if (telefono.value == '') {
                errores.push('El campo Telefono no puede estar vacio...');
                telefono.classList.add('is-invalid');
                //errores['telefono'] = 'El campo nombre no puede estar vacio... ';
            } else {
                telefono.classList.add('is-valid');
                telefono.classList.remove('is-invalid');
            }

            //Validar direccion
            if (direccion.value == '') {
                errores.push('El campo Dirección no puede estar vacio...');
                direccion.classList.add('is-invalid');
                //errores['telefono'] = 'El campo nombre no puede estar vacio... ';
            } else {
                direccion.classList.add('is-valid');
                direccion.classList.remove('is-invalid');
            }

            //Validar ciudad
            if (ciudad.value == '') {
                errores.push('El campo Ciudad no puede estar vacio...');
                ciudad.classList.add('is-invalid');
                //errores['ciudad'] = 'El campo nombre no puede estar vacio... ';
            } else {
                ciudad.classList.add('is-valid');
                ciudad.classList.remove('is-invalid');
            }
            //Aquí valido que el usuario coloque su img (Yo en mi caso lo considero como un dato obligatorio, ustedes si quieren lo validan como deseen)
            if (img.value == '') {
                errores.push('Debe seleccionar su Avatar en formato JPG - JPEG- PNG ó GIF');
                img.classList.add('is-invalid');
                //errores['last_name'] = 'El campo nombre no puede estar vacio...';
            } else {
                img.classList.add('is-valid');
                img.classList.remove('is-invalid');
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