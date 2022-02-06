mostrarPaises()

function mostrarPaises(){
   fetch("https://restcountries.com/v3.1/all")         //Primero la URL de la API 

   .then(function(response){                            //llamo mi primer response de JSON como un return 
      return  response.json();
    }
    )

    .then(function(data)                                //capturo los datos con los que trabajare
    {
        //console.log(data);                            //reviso que me devuelva los valores
        for (let i = 0; i < data.length; i++) {
            const paises = data[i];
            let option = document.createElement("option");
            option.text = paises.name.common;
            option.value = paises.name.common;
            document.querySelector("#country").appendChild(option);
        };        
    })
    .catch(function(error){                             //dejo mi catch para capturar errores
        console.error(error);
    }
    )
    
}