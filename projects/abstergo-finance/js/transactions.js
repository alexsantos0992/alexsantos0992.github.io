const myModal = new bootstrap.Modal("#transaction-Label");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

//Adicionar lançamentos
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-imput").value);
    const description = document.getElementById("description-imput").value;
    const date = document.getElementById("date-imput").value;
    const type = document.querySelector('input[name="type-imput"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();
    getTransactions();

    alert("Lançamento realizado com sucesso.");
    
});

//Checagem de login do usuário
checklogged();

function checklogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getTransactions();
}

//Logout de sessão
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {
        transactions.forEach((item) => {
            let = type = "Entrada";
            if(item.type === "2") {
                type = "Saída"
            }

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>`
        })
    }
    document.getElementById("transactions-list").innerHTML = transactionsHtml
}

//Salvamento de dados
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}