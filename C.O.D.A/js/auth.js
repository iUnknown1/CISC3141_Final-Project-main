window.addEventListener('DOMContentLoaded', (e) => {
	e.preventDefault();
	document.querySelector("body").style.display="none";
	validateAuth();
});

function validateAuth(){
	const auth=JSON.parse(localStorage.getItem("auth"));
	const users=JSON.parse(localStorage.getItem("users"));
	if(containUser(users,auth)){
		document.querySelector("body").style.display="block";
	}else{
		window.location.replace("./authentication.html");
	}
}

function logOut(){
	localStorage.removeItem("auth");
	window.location.replace("./authentication.html");
}

function containUser(users,auth){
	if(auth==null)
		return false;
	for(var i = 0; i < users.length; i++) {
		if(users[i].username==auth.username&&users[i].password==auth.password)
			return true;
	}
	return false;
}

