const signupForm = document.querySelector('.signupForm');
const back=document.querySelector(".return");
const signup=document.querySelector("#signup");
const createButton=document.querySelector(".createButton");
const createAccount=document.querySelector(".createAccount");
const signUpFields = ["usernameSignUp", "passwordSignUp"];

createButton.addEventListener("click", (e)=>{
	login.classList.add("hide");
	signup.classList.remove('hide');
	fields.forEach((field)=>{
		const input=document.querySelector(`#${field}`);
		input.classList.remove("input-error");
		input.value="";
	});
	clearErrorText();
})

back.addEventListener("click",(e)=>{
	login.classList.remove("hide");
	signup.classList.add('hide');
	signUpFields.forEach((field)=>{
		const input=document.querySelector(`#${field}`);
		input.classList.remove("input-error");
		input.value="";
	});
	clearErrorText();
})

createAccount.addEventListener("click",(e)=>{
	e.preventDefault();
	var error = 0;
	signUpFields.forEach((field)=>{
		const input=document.querySelector(`#${field}`);
		if(validateFields(input) == false){
			error++;
		}	
	});
	if(error == 0){
		const username=document.querySelector("#usernameSignUp");
		const password=document.querySelector("#passwordSignUp");
		var users = JSON.parse(localStorage.getItem("users") || "[]");
    	var newUser = {
        		"username": username.value,
        		"password":password.value
    		};

    	if(duplicateUser(users,newUser)){
    		field=document.querySelector("#usernameSignUp");
    		setStatus(
				field,
				`Duplicate ${field.previousElementSibling.innerText}`,
				"error"
			);
    	}else{
    		users.push(newUser);
			localStorage.setItem("users", JSON.stringify(users));
    		login.classList.remove("hide");
			signup.classList.add('hide');
    	}
    	username.value="";
    	password.value="";
	}
})

function duplicateUser(users,newUser){
	for(var i = 0; i < users.length; i++) {
    	if(users[i].username===newUser.username)
    		return true;
    return false;
	}
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

function clearErrorText(){
	var messages = document.querySelectorAll('.error-message');
	messages.forEach((message)=> {
  		message.innerText="";
});
}