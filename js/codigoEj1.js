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
    let city= document.querySelector("#city").value.trim(); //Capturo el valor y luego limpio el campo
    document.querySelector("#city").value="";
    try {
      if(city.trim()===""){
        throw new Error ("No debe dejar campos vacíos.");
      }  
      
    let url=`https://api.openweathermap.org/data/2.5/weather?appid=a2a4e23e0043c30a6c155907672aaf71&q=${city}&units=metric&lang=es`;
  fetch(url)
    .then(function (response) {
      //llamo mi primer response de JSON como un return
      return response.json();
    })

    .then(function (data)                             //capturo los datos con los que trabajare
    {
      //console.log(data); //reviso que me devuelva los valores     
      if(data.cod >=200 && data.cod <300) {
        mostrarPaises(data.sys.country);
        document.querySelector("#error").style.display="none";
        document.querySelector("#mostrarDatos").style.display="block";
        document.querySelector("#tempActual").innerHTML = data.main.temp;
        document.querySelector("#tempMin").innerHTML = data.main.temp_min;
        document.querySelector("#tempMax").innerHTML = data.main.temp_max;
        document.querySelector("#description").innerHTML = data.weather[0].description;
        let idIcon = data.weather[0].icon;
        let srcIcon = `http://openweathermap.org/img/w/${idIcon}.png`;
        document.querySelector("#icon").src = srcIcon;       
        }else{  
          document.querySelector("#mostrarDatos").style.display="none";
          document.querySelector("#error").style.display="block";
          document.querySelector("#mostrarError").innerHTML =`La ciudad no existe.`;          
                document.querySelector("#country").innerHTML = "";  
                document.querySelector("#tempActual").innerHTML = "";
                document.querySelector("#tempMin").innerHTML = "";
                document.querySelector("#tempMax").innerHTML = "";  
                document.querySelector("#description").innerHTML = "";              
                document.querySelector("#icon").src = "";       
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
