fetch("https://v6.exchangerate-api.com/v6/d64503bf29b67154d1544e44/codes")
.then(function(response){
return response.json();
})
.then(function (data){
    console.log(data);
    data.supported_codes.forEach(function (element){
        let option = document.createElement("option");
        option.text = element[1];
        option.value = element[1];
        document.querySelector("#monedaBase").appendChild(option);        
    }); 
    data.supported_codes.forEach(function (element){
        let option = document.createElement("option");
        option.text = element[1];
        option.value = element[1];
        document.querySelector("#monedaDestino").appendChild(option);        
    }); 
})