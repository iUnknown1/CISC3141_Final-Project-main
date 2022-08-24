const loginForm = document.querySelector('.loginForm');
const login=document.querySelector("#login");
const fields = ["username", "password"];

login.addEventListener("submit",(e)=>{
	e.preventDefault();
	var error = 0;
	fields.forEach((field)=>{
		const input=document.querySelector(`#${field}`);
		if(validateFields(input) == false){
			error++;
		}	
	});
	if(error == 0){
		const username=document.querySelector("#username");
		const password=document.querySelector("#password");
		var users = JSON.parse(localStorage.getItem("users") || "[]");
    	var user = {
        		"username": username.value,
        		"password":password.value
    		};

    	if(containUser(users,user)){
			localStorage.setItem("auth",JSON.stringify(user));
			window.location.replace("./index.html");
    	}else{
    		document.querySelector(".signin-error").innerText="Invalid Username or Password. Please try again.";
			username.classList.add("input-error");
			password.classList.add("input-error");
    	}
    	username.value="";
    	password.value="";
	}
})

function containUser(users,user){
	for(var i = 0; i < users.length; i++) {
			console.log(users[i].username+" "+user.username+" "+users[i].password+" "+user.password)
			console.log(users[i].username===user.username&&users[i].password===user.password)

    	if(users[i].username===user.username&&users[i].password===user.password)
    			return true;
	}
	return false;

}

function validateFields(field){
	if(field.value.trim() == ""){
		setStatus(
			field,
			`${field.previousElementSibling.innerText} cannot be blank`,
			"error"
		);
		return false;
	}else{
		if(field.type == 'password'){
			if(field.value.length <8 ){
				setStatus(
					field,
					`${field.previousElementSibling.innerText} must be at least 8 characters`,
					"error"
				);
			return false;
			}else{
				setStatus(field,null,"success");
				return true;
			}
		}else{
			setStatus(field,null,"success");
			return true;
		}
	}
}

function setStatus(field,message,status){
	const errorMessage = field.parentElement.querySelector(".error-message");

	if(status == "success"){
		if(errorMessage){
			errorMessage.innerText="";
		}
		field.classList.remove("input-error");
	}

	if(status == "error"){
		errorMessage.innerText=message;
		field.classList.add("input-error");
	}
}