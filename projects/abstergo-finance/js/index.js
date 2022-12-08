//Login de usuário//
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-imput").value;
    const password = document.getElementById("password-imput").value;
    const checkSession = document.getElementById("session-check").checked;
    const account = getAccount(email);

    if(!account) {
        alert("Ops! Conta não encontrada no sistema. Verifique seu usuário e senha.");
        return;
        
    }

    if(account) {
        if(account.password !== password) {
            alert("Ops! Conta não encontrada no sistema. Verifique seu usuário e senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href = "home.html";
    }

});

//Exit Modal Success//
const mymodal = new bootstrap.Modal("#registerModalLabel");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checklogged();

//Criar conta//
document.getElementById("creator-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("InputEmail").value;
    const password = document.getElementById("InputPassword").value;

    if(email.length <3) {
        alert("Informe um endereço de e-mail válido.");
    }
    if(password.length <8) {
        alert("A senha deve conter pelo menos 8 caracteres.");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    });
    
    mymodal.hide();
        alert("Conta criada com sucesso!");
});

function checklogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

//Salvar conta//
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return ""
;}