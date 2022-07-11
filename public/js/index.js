const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checksession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("ops, verifique seu usario e senha.");
        return;
    }

    if(account) {
        if(account.password !== password) {
            alert("ops, verifique seu usario e senha.");
            return;   
        }

        saveSession(email, checksession);
        window.location.href = "home.html"; 
    }
});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault(); 

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com e-mail válido");
        return;
    }

    if(email.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos");
        return;
    }

    saveAccoount({
        login: email,
        password: password,
        transactions: []
    });


    myModal.hide();
    alert("Conta Criada com sucesso!");
});

function checkLogged() {
    if(session) {
        sessionStorage.getItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

function saveAccoount(data) {
    localStorage.setItem(data.login, JSON.stringify(data))
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data); 
    }

    sessionStorage.setItem("logged", data)
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}

