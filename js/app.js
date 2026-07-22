/* ==========================================
   MiCarga.mx - app.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const inputs = document.querySelectorAll("input, select, textarea");
    const barra = document.querySelector(".progress-fill");
    const aviso = document.getElementById("guardado");

    // ==========================
    // CARGAR BORRADOR
    // ==========================

    cargarFormulario();

    actualizarResumen();

    actualizarProgreso();

    // ==========================
    // EVENTOS
    // ==========================

    inputs.forEach(campo => {

        campo.addEventListener("input", () => {

            guardarFormulario();

            actualizarResumen();

            actualizarProgreso();

            validarCampo(campo);

        });

        campo.addEventListener("blur", () => {

            validarCampo(campo);

        });

    });

    // ==========================
    // GUARDAR
    // ==========================

    function guardarFormulario(){

        let datos={};

        inputs.forEach(campo=>{

            let llave=campo.id || campo.name || campo.placeholder;

            if(campo.type==="checkbox"){

                datos[llave]=campo.checked;

            }else{

                datos[llave]=campo.value;

            }

        });

        localStorage.setItem(

            "micarga_publicacion",

            JSON.stringify(datos)

        );

        if(aviso){

            aviso.style.opacity="1";

            setTimeout(()=>{

                aviso.style.opacity="0";

            },1500);

        }

    }

    // ==========================
    // CARGAR
    // ==========================

    function cargarFormulario(){

        let datos=JSON.parse(

            localStorage.getItem("micarga_publicacion")

        );

        if(!datos) return;

        inputs.forEach(campo=>{

            let llave=campo.id || campo.name || campo.placeholder;

            if(datos[llave]===undefined) return;

            if(campo.type==="checkbox"){

                campo.checked=datos[llave];

            }else{

                campo.value=datos[llave];

            }

        });

    }

    // ==========================
    // VALIDAR
    // ==========================

    function validarCampo(campo){

        if(campo.type==="checkbox") return;

        if(String(campo.value).trim()===""){

            campo.style.borderColor="#e74c3c";

        }else{

            campo.style.borderColor="#27ae60";

        }

    }

    // ==========================
    // PROGRESO
    // ==========================

    function actualizarProgreso(){

        let total=0;

        let completos=0;

        inputs.forEach(campo=>{

            if(campo.type==="checkbox") return;

            total++;

            if(String(campo.value).trim()!==""){

                completos++;

            }

        });

        let porcentaje=Math.round((completos/total)*100);

        if(barra){

            barra.style.width=porcentaje+"%";

            barra.innerHTML=porcentaje+"%";

        }

    }

    // ==========================
    // RESUMEN
    // ==========================

    function actualizarResumen(){

        actualizarTexto("origenCiudad","rOrigen");

        actualizarTexto("destinoCiudad","rDestino");

        actualizarTexto("unidad","rUnidad");

        actualizarTexto("peso","rPeso"," Ton");

        actualizarTexto("precio","rPrecio"," MXN");

    }

    function actualizarTexto(origen,destino,sufijo=""){

        const a=document.getElementById(origen);

        const b=document.getElementById(destino);

        if(a && b){

            b.innerHTML=a.value+sufijo;

        }

    }

});
