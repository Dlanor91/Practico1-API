mostrarMonedas();

function mostrarMonedas(){
fetch("https://v6.exchangerate-api.com/v6/d64503bf29b67154d1544e44/codes")
.then(function(response){
return response.json();
})
.then(function (data){
    //console.log(data);
    data.supported_codes.forEach(function (element){
        let option = document.createElement("option");
        option.text = element[1];
        option.value = element[0];
        document.querySelector("#monedaBase").appendChild(option);        
    }); 
    data.supported_codes.forEach(function (element){
        let option = document.createElement("option");
        option.text = element[1];
        option.value = element[0];
        document.querySelector("#monedaDestino").appendChild(option);        
    }); 
})
.catch(function (error) {
    console.error(error);                  //dejo mi catch para capturar errores    
  });
}

document.querySelector("#convertirMonedas").addEventListener("click", convertir);

function convertir() {
    let monedaBase= document.querySelector("#monedaBase").value;
    let monedaDestino= document.querySelector("#monedaDestino").value;
    
    try {
        if(monedaBase==="" && monedaDestino ===""){
            throw new Error("No se pueden dejar campos vacíos.");
        }
        if(monedaBase === monedaDestino){
            throw new Error("No se puede elegir la misma moneda. Seleccione monedas distintas");
        }

        let URL = `https://v6.exchangerate-api.com/v6/d64503bf29b67154d1544e44/pair/${monedaBase}/${monedaDestino}`
        fetch(URL)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
             let valorConvertido= data.conversion_rate.toFixed(2);
             document.querySelector("#mostrar").innerHTML = `1 ${monedaBase} es igual a ${valorConvertido} ${monedaDestino}`;
        })
        .catch(function(error){
            console.error(error);
        })        

    } catch (Error) {
        document.querySelector("#mostrar").innerHTML = Error.message;
    }
}