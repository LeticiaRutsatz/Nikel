const mymodal = new bootstrap.Modal("#transaction-modal");
let loged = sessionStorage.getItem("logged");
const sesion = localStorage.getItem("session");
let data = {
    transactions:[]
};

document.getElementById("button-logout").addEventListener("click", logout);



document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    mymodal.hide();

    getTransactions();

    alert("Lançamento adicionado com sucesso!");
});

checkLogged();

function checkLogged() {
    if(sesion) {
        sessionStorage.getItem("logged", sesion);
        loged = sesion;
    }

    if(!loged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(loged);
        if(dataUser) {
        data = JSON.parse(dataUser);
        }
    
        getTransactions();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function saveData() {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function getTransactions() {
    const transactions = data.transactions;
    let transactionhtml = ``;

    if(transactions.length) {
        transactions.forEach((item) => {
            let type = ("entrada");

            if(item.type === "2") {
                type = "Saída";
            }

            transactionhtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `
        })
    }

    document.getElementById("transactions-list").innerHTML = transactionhtml;
}
