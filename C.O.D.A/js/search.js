let jsondata=[]
let searchedData=[];

async function getJSONData() {
    const response = await fetch('https://data.cityofnewyork.us/resource/jb7j-dtam.json')
    const data = await response.json()
    return data;
}

document.addEventListener('DOMContentLoaded',async(e)=>{            
	e.preventDefault();
	jsondata=await getJSONData()
	let form = JSON.parse(localStorage.getItem("form"));
	searchedData = searchTable(form,jsondata)
	buildTable(searchedData)
})


function buildTable(data){
    table = document.getElementById('myTable')
    table.innerHTML = ''
    if(data.length==0)
    	table.innerHTML += `<tr>No data found</tr>`
    else{
	    for(i=0;i<data.length;i++){
	        row = `<tr>
	               <td>${data[i].leading_cause}</td>
	               <td>${data[i].race_ethnicity}</td>
	               <td>${data[i].sex}</td>
	               <td>${data[i].deaths}</td>
	               <td>${data[i].year}</td>
		           </tr>`
	        table.innerHTML += row;
	    }
    }
}

function searchTable(form,jsondata){
    data = [];
    year=parseInt(form.year)
    ethnicity=form.ethnicity
    cause=form.cause
    sex=form.sex
    minDeath=parseInt(form.minDeath)
    maxDeath=parseInt(form.maxDeath)

    for(i=0;i<jsondata.length;i++){
        let result = jsondata[i].year==year
               			&&jsondata[i].leading_cause.toLowerCase().includes(cause)
               			&&jsondata[i].sex.toLowerCase().includes(sex)
               			&&jsondata[i].race_ethnicity.toLowerCase().includes(ethnicity)
               			&&jsondata[i].deaths>=minDeath
               			&&jsondata[i].deaths<=maxDeath
 
    	if(result)
       		data.push(jsondata[i])
    }
    return data
}

document
document.getElementById('return').addEventListener('click',()=>{
	console.log(1)
	window.location.replace("./index.html");  
})
