//obteniendo el presupuesto
const presupuesto = prompt("Ingrese su presupuesto");
let cantidadPresupuesto;

const nombreGasto = document.querySelector("#nombre-gasto");
const cantidadGasto = document.querySelector("#cantidad-gasto");
let btnAgregar = document.querySelector("#btn-agregar");

//classes
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    presupuestoRestante(gasto = 0){
        return this.restante -= Number(gasto); 
    }
}

class Gasto { 
    constructor(nombre,cantidad){
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
    realizarGasto(){
        let listado = document.querySelector("#box-list");
        listado.innerHTML+=`
        <div class="elem">
            <h5 id="prod">${this.nombre}</h5>
            <h5 id="cant">${this.cantidad}</h5>
        </div>  
        `;
    }
}

class Interfaz{
 
    //insertar el presupuesto
    insertarPresupuesto(cantidad){
        let rest = cantidad;
        document.querySelector("#pres").innerHTML=`Presupusto: ${cantidad}`;
        document.querySelector("#rest").innerHTML=`Restante: ${rest}`;
    }

    //actulizar presupuesto restante
    restarPresupuesto(cantidad ){
        let presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);
        document.querySelector("#rest").innerHTML=`Restante: ${presupuestoRestanteUsuario}`;
    }

    //cambiar de color al presepuesto restante
    comprobarPresupuesto(){
        const pres = cantidadPresupuesto.presupuesto; 
        const rest = cantidadPresupuesto.restante;

        if(rest <= ((pres / 100)*25)){
            console.log("25% del presupuesto");
            document.querySelector("#rest").style.color="red";
        }else if(rest <= ((pres / 100)*50)){
            console.log("50% del presupuesto");
            document.querySelector("#rest").style.color="orange";
        }else if(rest <= ((pres / 100)*75)){
            console.log("75% del presupuesto");
            document.querySelector("#rest").style.color="greenyellow";
        }
    }
    showMessage(type,...message){
        let msg="";
        if(type && message){
            if(type="error"){
                message.map((ms)=>{
                    msg +=`${ms}\n`;
                });
                alert(msg);
            }
        }  
    }
}

//listeners
document.addEventListener('DOMContentLoaded',()=>{
    if(presupuesto === null || presupuesto.trim()==="" || presupuesto === undefined){
        window.location.reload();
    }else{
        if(isNaN(presupuesto*1)===true){
            let ok = alert("Solo valores numericos");
            if(ok===undefined){
                window.location.reload();
            }   
        }else{
            const ui = new Interfaz();
            cantidadPresupuesto = new Presupuesto(presupuesto);
            ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);     
        }
    }
});


btnAgregar.addEventListener("click",()=>{

    const interfaz = new Interfaz();
    if(nombreGasto.value.trim()==="" && cantidadGasto.value.trim()==="" ){
        interfaz.showMessage("error","No se ingreso un gasto.","No se ingreso una cantidad.");
    }else if(nombreGasto.value.trim()==="" && cantidadGasto.value.trim()!=="" ){  
        if(isNaN(cantidadGasto.value*1)===true){
            interfaz.showMessage("error","No se ingreso un gasto.","La cantidad debe ser un valor numerico.");
        }else{
            if(cantidadGasto.value<0){
                interfaz.showMessage("error","No se ingreso un gasto.","La cantidad no debe ser un valor negativo.");
            }else{
                interfaz.showMessage("error","No se ingreso un gasto.");
            }
        }
    }else if(nombreGasto.value.trim()!=="" && cantidadGasto.value.trim()===""){  
        interfaz.showMessage("error","No se ingreso una cantidad.");
    }else{
        if(isNaN(cantidadGasto.value*1)===true){
            interfaz.showMessage("error","La cantidad debe ser un valor numerico.");
        }else{
            if(cantidadGasto.value<0){
                interfaz.showMessage("error","La cantidad no debe ser un valor negativo.");
            }else{
                const gasto = new Gasto(nombreGasto.value,cantidadGasto.value);
                gasto.realizarGasto();
                interfaz.restarPresupuesto(cantidadGasto.value);
                interfaz.comprobarPresupuesto();
                 
            }
        }   
    }
});
