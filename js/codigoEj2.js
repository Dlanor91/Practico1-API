//OCulto el div de mostrar los datos
document.querySelector("#mostrarDatos").style.display="none";
document.querySelector("#error").style.display="none";

function mostrarPaises(ciudad) {
  fetch("https://restcountries.com/v3.1/all") //Primero la URL de la API
    .then(function (response) {
      //llamo mi primer response de JSON como un return
      return response.json();
    })

    .then(function (data) //capturo los datos con los que trabajare
    {
      console.log(data);                            //reviso que me devuelva los valores
      for (let i = 0; i < data.length; i++) {
        const paises = data[i];
        if(paises.cca2===ciudad){
            document.querySelector("#country").innerHTML = paises.name.common;
            break;
        }
      }
    })
    .catch(function (error) {
      //dejo mi catch para capturar errores
      console.error(error);
    });
}

document.querySelector("#enviarDatos").addEventListener("click", mostrarDatosClima);

function mostrarDatosClima() {   
    let city= document.querySelector("#city").value;   
    let cantDays = Number(document.querySelector("#cantDays").value);
    document.querySelector("#city").value=""; 
    document.querySelector("#cantDays").value="";
    try {
      if(city==="" || cantDays===""){
        throw new Error ("No debe dejar campos vacíos.");
      }
      if(isNaN(cantDays)){
        throw new Error ("El campo de días debe ser numérico.");
      }
      if(cantDays<=0 || cantDays>7 ){
        throw new Error ("Cantidad de Días debe ser mayor que 0 y menor que 7.");
      }   
    
      document.querySelector("#error").style.display="none";         
    document.querySelector("#mostrarDatos").style.display="block";
    let url=`https://api.openweathermap.org/data/2.5/forecast/daily?cnt=${cantDays}&appid=1573c2baa2cfe07cb8ee524834829651&units=metric&q=${city}&lang=es`;
  fetch(url)
    .then(function (response) {
      //llamo mi primer response de JSON como un return
      return response.json();
    })

    .then(function (data)                             //capturo los datos con los que trabajare
    {
      console.log(data); //reviso que me devuelva los valores     
      if(data.cod >=200 && data.cod <300) {
        mostrarPaises(data.city.country);        
        document.querySelector("#mostrarDatos").innerHTML=`<p>País: <span id="country" class="fw-bold"></span></p>`;
       data.list.forEach(function (element){        
        document.querySelector("#mostrarDatos").innerHTML += `
             <p>Temperatura Actual: <span class="fw-bold" id="tempActual">${element.temp.day}</span></p>
             <p id="description" class="text-capitalize fw-bold">${element.weather[0].description}</p>
             <p>Temperatura Mínima: <span class="fw-bold" id="tempMin">${element.temp.min}</span></p>
                <p>Temperatura Temperatura Máxima: <span class="fw-bold" id="tempMax">${element.temp.max}</span></p>
                <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" id="icon" class="img-fluid"></img>
                <hr>`;

        });               
        }else{     
                document.querySelector("#mostrarDatos").innerHTML=`<p>Error: <span id="country" class="fw-bold"></span></p>`;       
                document.querySelector("#country").innerHTML = "La ciudad no existe";                    
        }
    })
    .catch(function (error) {
      //dejo mi catch para capturar errores
      console.error(error);
    });
            
    } catch (Error) {
        document.querySelector("#mostrarDatos").style.display="none";
      document.querySelector("#error").style.display="block";
      document.querySelector("#mostrarError").innerHTML = Error.message;
    } 
}
