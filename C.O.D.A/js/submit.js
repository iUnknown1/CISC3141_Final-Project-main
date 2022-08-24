document.querySelector("#submitButton").addEventListener('click',function(e){            
	e.preventDefault();

    let year=document.querySelector(".year");
    if(year.value=="")
        year.value=2007;
    let ethnicity=document.querySelector(".ethnicity");
    let cause=document.querySelector(".cause");
    let sex=document.querySelector(".sex");
    let minDeath=document.querySelector(".minDeath");
    if(minDeath.value=="")
        minDeath.value=0;
    let maxDeath=document.querySelector(".maxDeath");
    if(maxDeath.value=="")
        maxDeath.value=100000000000000000;

    var form = {
        "year": year.value,
        "ethnicity":ethnicity.value.trim().toLowerCase(),
        "cause":cause.value.trim().toLowerCase(),
        "sex":sex.value.trim().toLowerCase(),
        "minDeath":minDeath.value,
        "maxDeath":maxDeath.value
    };

    year.value=""
    ethnicity.value=""
    cause.value=""
    sex.value=""
    minDeath.value=""
    maxDeath.value=""
    
    localStorage.setItem("form",JSON.stringify(form));
    window.location.replace("./table.html");  
})