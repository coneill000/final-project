document.addEventListener("DOMContentLoaded", function(){
    //Set event listeners/handlers for buttons
    dispLogin();
    document.getElementById("enter").onclick = checkLogin;
    document.getElementById("new-account").onclick = dispNewAccount;
});