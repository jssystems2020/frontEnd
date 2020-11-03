const data = document.getElementById("data");
const horaInicio = document.getElementById("horai");
const horaFinal = document.getElementById("horaf");
const descricao = document.getElementById("descricao");
const botao = document.getElementById("botao");
const corpoT = document.getElementById("corpoTabela");

botao.addEventListener("click", adicioarLinhas);

function adicioarLinhas() {
    if (descricao.value != "") {
        //Cria os elementos HTML (TR e TD) Linhas e Colunas
        const linha = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");
        const col4 = document.createElement("td");
        const col5 = document.createElement("td");
        const col6 = document.createElement("td");
        //Atribui valores entre as colunas TD
        col1.innerText = data.value;
        col2.innerText = horaInicio.value;
        col3.innerText = horaFinal.value;
        col4.innerText = descricao.value;
        col5.innerText = "";
        col6.innerHTML =
            "<input type='button' value=' Alterar ' onclick='alterarLinhas(this)'/>";
        col6.innerHTML +=
            "<input type='button' value=' Excluir ' onclick='excluirLinhas(this)'/>";
        //Inclui objetos HTML filhos para a linha TR (as colunas)
        linha.appendChild(col1);
        linha.appendChild(col2);
        linha.appendChild(col3);
        linha.appendChild(col4);
        linha.appendChild(col5);
        linha.appendChild(col6);
        //Acrescenta a linha ao corpo da Tabela
        corpoT.appendChild(linha);
        //Limpar os Campos do Formulário
        data.value = "";
        horaInicio.value = "";
        horaFinal.value = "";
        descricao.value = "";
    }
}

function excluirLinhas(elemento) {
    elemento.parentNode.parentNode.remove();
}

function alterarLinhas(elemento) {
    elemento.parentNode.parentNode.cells[0].setAttribute(
        "contenteditable",
        "true"
    );
    elemento.parentNode.parentNode.cells[1].setAttribute(
        "contenteditable",
        "true"
    );
    elemento.parentNode.parentNode.cells[2].setAttribute(
        "contenteditable",
        "true"
    );
    elemento.parentNode.parentNode.cells[3].setAttribute(
        "contenteditable",
        "true"
    );
    elemento.parentNode.parentNode.cells[4].setAttribute(
        "contenteditable",
        "true"
    );
    elemento.parentNode.parentNode.cells[5].innerHTML =
        "<td>" +
        "<input type='button' value=' Concluir ' onclick='concluirEdicao(this)'/>" +
        "</td>";
}

function concluirEdicao(elemento) {
    elemento.parentNode.parentNode.cells[0].setAttribute(
        "contenteditable",
        "false"
    );
    elemento.parentNode.parentNode.cells[1].setAttribute(
        "contenteditable",
        "false"
    );
    elemento.parentNode.parentNode.cells[2].setAttribute(
        "contenteditable",
        "false"
    );
    elemento.parentNode.parentNode.cells[3].setAttribute(
        "contenteditable",
        "false"
    );
    elemento.parentNode.parentNode.cells[4].setAttribute(
        "contenteditable",
        "false"
    );
    elemento.parentNode.parentNode.cells[5].innerHTML =
        "<td><input type='button' value=' Alterar ' onclick='alterarLinhas(this)'/>" +
        "<input type='button' value=' Excluir ' onclick='excluirLinhas(this)'/></td>";
}

function carregaCookie() {
    let agenda = lerCookie("agenda");
    let linhas = agenda.split("*");
    for (let i = 0; i < linhas.length - 1; i++) {
        let celula = linhas[i].split("/"); //Divide em células
        const linha = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        const col3 = document.createElement("td");
        const col4 = document.createElement("td");
        const col5 = document.createElement("td");
        const col6 = document.createElement("td");
        col1.innerText = celula[0];
        col2.innerText = celula[1];
        col3.innerText = celula[2];
        col4.innerText = celula[3];
        col5.innerText = celula[4];
        col6.innerHTML =
            "<input type='button' value=' Alterar ' onclick='alterarLinhas(this)'/>";
        col6.innerHTML +=
            "<input type='button' value=' Excluir ' onclick='excluirLinhas(this)'/>";
        linha.appendChild(col1);
        linha.appendChild(col2);
        linha.appendChild(col3);
        linha.appendChild(col4);
        linha.appendChild(col5);
        linha.appendChild(col6);
        corpoT.appendChild(linha);
    }
}

function salvaTabelaCookie() {
    let conteudo = "";
    for (let i = 1; i < corpoT.parentNode.rows.length; i++) {
        conteudo += corpoT.parentNode.rows[i].cells[0].innerHTML + "/";
        conteudo += corpoT.parentNode.rows[i].cells[1].innerHTML + "/";
        conteudo += corpoT.parentNode.rows[i].cells[2].innerHTML + "/";
        conteudo += corpoT.parentNode.rows[i].cells[3].innerHTML + "/";
        conteudo += corpoT.parentNode.rows[i].cells[4].innerHTML + "*";
    }
    criarCookie("agenda", conteudo);
    alert("Dados salvos em Cookie");
}

function criarCookie(data, horai, horaf, descricao, status) {
    let dtExpira = "expires = Tue, 01 Jan 2050 12:00:00 UTC";
    document.cookie = data + "=" + horai + ";" + horaf + ";" + descricao + ";" + status + ";" + dtExpira;
}

function lerCookie(descricao) {
    let vdescricao = descricao + "=";
    let ca = document.cookie.split(";"); //Retorna um vetor com todos os cookies
    for (let i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        } //Eliminar caracteres em branco
        if (c.indexOf(vdescricao) == 0) {
            return c.substring(vdescricao.length, c.length);
        }
    }
    return "";
}