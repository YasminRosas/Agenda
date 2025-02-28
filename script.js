    document.getElementById("btnAdd").onclick = () => {
    document.getElementById("modalAddCommit").style.display = "flex";
    clean();
}

// Função para fechar modal
function btnCloseModal(modalId){
    document.getElementById(modalId).style.display = "none";
}

// função para limpar os campos
function clean() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
}

// funcção para abrir a modal para adicionar novo compromisso
function btnAddCommit(){
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const alert = document.getElementById("alert");

    if ( !title || !description || !date){
        alert.textContent = "Preencha todos os campos!";
        alert.style.display = "block";
        setTimeout(() => alert.style.display = "none", 3000);
        return;
    }

    const commit = { title, description, date };
    const dateToday = new Date().toISOString().split("T")[0];
    const dateCommit = new Date(date);
    const dateNext = new Date();

    let list;
    if (date === dateToday) {
        list =  "commitListToday";
        document.getElementById("sectionToday").style.display = "block";
    } else if (dateCommit < new Date(dateNext.setMonth(dateNext.getMonth() + 2))) {
        list = "commitListNext";
    } else {
        list = "commitListLater";
    }


    const li = document.createElement("li");
    li.innerHTML = `<div class="li-content">
                        <span class="li-title"><h3>${commit.title}</h3></span>
                        <span class="li-date"><span class="material-symbols-outlined">
                        calendar_month</span>${commit.date}</span>
                        </div>
                        `;

    li.onclick = () => openDetail(commit);

    const btnDelete = document.getElementById("btnDelete");
    btnDelete.textContent = "Excluir";
    btnDelete.classList.add("btnDelete");
    btnDelete.onclick = function(e) {
        e.stopPropagation();
        li.remove();
        btnCloseModal("modalDetailCommit")
    }
   
    document.getElementById(list).appendChild(li);

    btnCloseModal("modalAddCommit");
    clean();
}

// função para abrir os detalhes do compromisso
function openDetail(commit){
    document.getElementById("detailTitle").textContent = commit.title;
    document.getElementById("detailDescription").textContent = commit.description;
    document.getElementById("detailDate").textContent = `${commit.date}`;
    document.getElementById("modalDetailCommit").style.display = "flex";
}