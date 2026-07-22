/* ===========================================
   MiCarga.mx
   app.js
===========================================*/

document.addEventListener("DOMContentLoaded", function(){

    iniciarFormulario();

});

function iniciarFormulario(){

    actualizarResumen();

    guardarAutomatico();

    actualizarProgreso();

}
const inputs = document.querySelectorAll("input, select, textarea");

const barra = document.querySelector(".progress-fill");
function guardarAutomatico(){

    inputs.forEach(function(campo){

        campo.addEventListener("input", guardarFormulario);

    });

}
function guardarFormulario(){

    let datos={};

    inputs.forEach(function(campo){

        let llave;

        if(campo.id!=""){

            llave=campo.id;

        }else{

            llave=campo.name || campo.placeholder;

        }

        datos[llave]=campo.value;

    });

    localStorage.setItem(

        "micarga_publicacion",

        JSON.stringify(datos)

    );
mensajeGuardado();

}
window.onload=function(){

    let datos=

    JSON.parse(

        localStorage.getItem(

            "micarga_publicacion"

        )

    );

    if(!datos) return;

    inputs.forEach(function(campo){

        let llave;

        if(campo.id!=""){

            llave=campo.id;

        }else{

            llave=campo.name || campo.placeholder;

        }

        if(datos[llave]!=undefined){

            campo.value=datos[llave];

        }

    });

    actualizarResumen();

    actualizarProgreso();

}
function limpiarFormulario(){

    localStorage.removeItem(

        "micarga_publicacion"

    );

}
function actualizarResumen(){

    let origen=document.getElementById("origenCiudad");

    let destino=document.getElementById("destinoCiudad");

    let peso=document.getElementById("peso");

    let precio=document.getElementById("precio");

    let unidad=document.getElementById("unidad");

    if(document.getElementById("rOrigen"))

        document.getElementById("rOrigen").innerHTML=

        origen?origen.value:"";

    if(document.getElementById("rDestino"))

        document.getElementById("rDestino").innerHTML=

        destino?destino.value:"";

    if(document.getElementById("rPeso"))

        document.getElementById("rPeso").innerHTML=

        peso?peso.value+" Ton":"";

    if(document.getElementById("rPrecio"))

        document.getElementById("rPrecio").innerHTML=

        precio?"$"+precio.value:"";

    if(document.getElementById("rUnidad"))

        document.getElementById("rUnidad").innerHTML=

        unidad?unidad.value:"";

}
/* ===========================================
BARRA DE PROGRESO
===========================================*/

function actualizarProgreso(){

    let total=inputs.length;

    let completos=0;

    inputs.forEach(function(campo){

        if(campo.type=="checkbox"){

            if(campo.checked){

                completos++;

            }

        }else{

            if(campo.value.trim()!=""){

                completos++;

            }

        }

    });

    let porcentaje=Math.round((completos/total)*100);

    if(barra){

        barra.style.width=porcentaje+"%";

        barra.innerHTML=porcentaje+"%";

    }

}

}
inputs.forEach(function(campo){

    campo.addEventListener("input",function(){

        actualizarProgreso();

        actualizarResumen();

    });

});


/* ===========================================
VALIDAR CAMPOS
===========================================*/

inputs.forEach(function(campo){

    campo.addEventListener("blur",function(){

        if(campo.value.trim()==""){

            campo.style.borderColor="#e74c3c";

        }else{

            campo.style.borderColor="#27ae60";

        }

    });

});
/* ===========================================
MENSAJE
===========================================*/

function mensajeGuardado(){

    let aviso=document.getElementById("guardado");

    if(!aviso) return;

    aviso.style.opacity="1";

    setTimeout(function(){

        aviso.style.opacity="0";

    },1800);

}
