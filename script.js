window.onload = function start() { //Roda a função quando a tela for carregada

    const fundoBotoes = document.getElementById("background-buttons"); //A tela de botões
    const fundoInput = document.getElementById("input-background"); //Barra do input com botão
    const fundoBackground = document.getElementById("full-background"); //Tela inteira

    let textoTarefa = document.getElementById("texto-tarefa"); //Input
    let botaoTarefa = document.getElementById("criar-tarefa"); //Botão adicionar do input
    let listaTarefa = document.getElementById("lista-tarefas"); //Lista de tarefas
    let tarefas = document.getElementsByClassName('li-tarefa'); //Ao adicionar um elemento li atribui essa classe ao a string
    let tarefaSelecioada = document.getElementsByClassName('li-tarefa tarefaSelecioada'); //Quando selecionar a tarefa, essa classe é atribuída
    let removerSelecionado = document.getElementById("remover-selecionado"); //Botão
    let moverCima = document.getElementById("mover-cima"); //Botão
    let moverBaixo = document.getElementById("mover-baixo"); //Botão 
    let removerFinalizados = document.getElementById("remover-finalizados"); //Botão
    let apagaTudo = document.getElementById("apaga-tudo"); //Botão
    let salvarTarefas = document.getElementById("salvar-tarefas"); //Botão

    //Cria uma cadeia de eventos aqui de cima
    resgatarLista();
    botaoTarefa.addEventListener("click", adicionarTarefa);
    removerSelecionado.addEventListener("click", apagarTarefa);
    moverCima.addEventListener("click", moverTarefaCima);
    moverBaixo.addEventListener("click", moverTarefaBaixo);
    removerFinalizados.addEventListener("click", apagarConcluido);
    apagaTudo.addEventListener("click", apagarTodasTarefas);
    salvarTarefas.addEventListener("click", salvarLista);
    //Até aqui

    function selecionar(event) { //Função para declarar qual é o elemento selecionado

        const tarefa = event.target; //Detecta um evento na tela

        for (let i = 0; i < tarefas.length; i++) { //Loop para percorrer o conjunto de elementos
            if (tarefas[i].className === 'li-tarefa tarefaSelecioada') { //
                tarefas[i].classList.remove('tarefaSelecioada'); //Remove a classe de seleção do elemento
            } else if (tarefas[i].className === 'li-tarefa completed tarefaSelecioada');
            tarefas[i].classList.remove('tarefaSelecioada'); //Remove a classe de seleção do elemento
        }
        tarefa.classList.add('tarefaSelecioada');
    }

    function adicionarTarefa() { //Função para ativar o botão adicionar

        let tarefa = document.createElement("li"); //Cria um elemento do tipo li

        tarefa.classList.add("li-tarefa"); //Adiciona a classe li-tarefa
        tarefa.innerHTML = textoTarefa.value; //Escreve no HTML
        listaTarefa.appendChild(tarefa); //Adiciona ao corpo do HTML
        textoTarefa.value = ""; //Limpa a entrada do input
        textoTarefa.value = null; //Limpa a entrada do input

        tarefa.addEventListener("click", fundoTarefaSelecionada); //Adiciona um evento
        tarefa.addEventListener("dblclick", riscaTarefa); //Adiciona um evento
        tarefa.addEventListener("click", selecionar); //Adiciona um evento
    }

    function fundoTarefaSelecionada(event) { //Função para selecionar a tarefa e alterar o background

        let tarefa = event.target;

        for (let i = 0; i < tarefas.length; i++) { //Percorre o loop e o que não for selecionado, volta a cor normal
            tarefas[i].style.backgroundColor = 'whitesmoke'; //Altera a cor para padrão
        }

        tarefa.style.backgroundColor = 'rgb(128,128,128)'; //altera a cor para cinza
    }

    function riscaTarefa(event) { //Função para riscar a tarefa selecionada com duplo clique

        let tarefa = event.target; //Detecta um evento 

        tarefa.classList.toggle("completed"); //adiciona a classe completed nela
    }

    function apagarTarefa() { //Função para ativar o botão X

        let target = tarefaSelecioada[0]; //Variável para selecionar e poder apagar

        target.remove(); //Apaga o selecionado
    }

    function apagarConcluido() { //Função para ativar o botão limpar concluídos

        let targets = document.querySelectorAll('.completed'); //Seleciona a classe completed

        for (let i = 0; i < targets.length; i++) { //Loop para percorrer 
            if (targets[i].className === 'li-tarefa completed') { //todo elemento com essa tag
                targets[i].remove(); //Será removida
            } else if (targets[i].className === 'li-tarefa tarefaSelecioada completed') { //Também será removido
                targets[i].remove();
            }
        }
    }

    function apagarTodasTarefas() { //Apaga todas as tarefas na tela.

        while (listaTarefa.hasChildNodes()) { //Enquanto tiver filhos no DOM
            listaTarefa.removeChild(listaTarefa.firstChild); // Remove os filhos
            localStorage.clear(); // Limpa o localStorage
        }
    }

    function moverTarefaCima() { //Função para ativar o botão mover para cima

        let tarefaSobe = tarefaSelecioada[0]; //Invoca a classe, já que um único elemento teria essa classe.

        if (typeof tarefaSobe !== 'undefined') { //Analisa se a váriável selecionada seria o tipo undefined (indefinida).
            if (tarefaSobe.previousElementSibling !== null) { //Se diferente de nulo
                listaTarefa.insertBefore(tarefaSobe, tarefaSobe.previousElementSibling); //Organiza colocando o próximo para baixo e ele para cima
            }
        }
    }

    function moverTarefaBaixo() { //Função para ativar o botão mover para baixo

        let tarefaSobe = tarefaSelecioada[0]; //Invoca a classe, já que um único elemento teria essa classe.

        if (typeof tarefaSobe !== 'undefined') { //Analisa se a váriável selecionada seria o tipo undefined (indefinida).
            if (tarefaSobe.nextElementSibling !== null) { //Se diferente de nulo
                listaTarefa.insertBefore(tarefaSobe.nextElementSibling, tarefaSobe); //Organiza colocando o próximo para cima e ele para baixo
            }
        }
    }

    function salvarLista() { //Função para ativar o botão salvar 

        let listaASalvar = []; //Cria uma tabela de armazenamento.
        let listaDeClasses = []; //Cria uma tabela de armazenamento.
        let itemASalvar = tarefas; //Invoca a classe.

        for (let i = 0; i < itemASalvar.length; i++) { //Percorre o loop até concluir o volume completo
            listaASalvar.push(itemASalvar[i].innerHTML); //Adiciona a tabela de armazenamento os dados
        }

        for (let i = 0; i < itemASalvar.length; i++) { //Percorre o loop até concluir o volume completo
            listaDeClasses.push(itemASalvar[i].className); //Adiciona a tabela de armazenamento os dados
        }

        localStorage.setItem('li', JSON.stringify(listaASalvar)); //Seta os itens e salva no localStorage
        localStorage.setItem('li-classes', JSON.stringify(listaDeClasses)); //Seta os itens e salva no localStorage
    }

    function tarefasTabelaArmazenar(tipo, valorClasse) { //Função para armazenar as informações

        let tarefa = document.createElement('li'); //Cria um elemento do tipo li
        let armazenamento = valorClasse.split(' '); //Percorre a string e separa os espaços

        tarefa.classList.add('li-tarefa'); //Atribui a classe li-tarefa
        tarefa.innerHTML = tipo; //Atribui ao elemento li
        listaTarefa.appendChild(tarefa); //adiciona no HTML com o elemento li 
        tarefa.addEventListener('click', fundoTarefaSelecionada); //invoca a função com um clique
        tarefa.addEventListener('dblclick', riscaTarefa); //invoca a função com duplo clique

        for (let i = 0; i < armazenamento.length; i++) { //percorre o array até completar todo o tamanho
            if (armazenamento[i] !== 'tarefaSelecioada') { //Caso seja verdadeira essa comparação
                tarefa.classList.add(armazenamento[i]); //Ele adiciona a classe
            }
        }

    }

    function resgatarLista() { //Toda vez que abrir o site, irá conferir se o localStorage possui dados.

        let listaSalva = JSON.parse(localStorage.getItem('li')); //Puxa todas as informações do localStorage classificada com 'li'.
        let listaDeClasses = JSON.parse(localStorage.getItem('li-classes')); //Puxa todas as informações do localStorage classificada com 'li-classes'.

        if (localStorage.length !== 0) { //Confere caso o localStorage seja diferente de 0, ele prossegue para o loop.
            for (let i = 0; i < listaSalva.length; i++) { //Enquanto i for menor que o tamanho do localStorage, aumentará o valor de i
                tarefasTabelaArmazenar(listaSalva[i], listaDeClasses[i]); //Invoca a função tarefasTabelaArmazenar e atribui as variáveis nos parâmetros.
            }
        }
    }
} 
