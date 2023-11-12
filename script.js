let choiceHistory = []; //matriz, para armazenar as os caminhos tomados [caminho 1, caminho 2, caminho 3, ...],
//let choiceIdHistory = [];

document.addEventListener("DOMContentLoaded", function carregamento () /*aqui ele está escutando qualquer ação feta pelo usuario(addEventListener),
nesse primeiro caso a ação é a abertura da página ou então o carregamento, com base nesse evento será executada as funções.
O DOMContentLoaded serve para carrgar página HTML inteira, sem esperar que termine de carregar as imagens, botões, etc.*/
{
    fetch('historia.xml') //busca pela "banco de dados" em XML
        .then(response => response.text()) //usa-se uma arrow function para facilitar o visaulização do código
        .then(data =>
        {
            let parser = new DOMParser();
            let xml = parser.parseFromString(data, "application/xml");
            displayApresentacao(xml);
            displayHistoria(xml.querySelector('level1')); // Começamos no Nível 1
        })
        .catch(err => {
            console.error('Erro ao carregar a história:', err);
        });
});

function displayApresentacao(xml) {
    const title = xml.querySelector('story').getAttribute('title');
    const introduction = xml.querySelector('introduction').textContent;
    const sub = xml.querySelector('subtitulo').textContent;

    document.querySelector('h1').textContent = title;
    document.getElementById('introduction').textContent = introduction;
    document.getElementById('subtitulo').textContent = sub;
}

function displayHistoria(node)
{
    const choicesDiv  = document.getElementById('choices');
    const imagemDiv   = document.getElementById('imagem');
    const perguntaDiv = document.getElementById('perguntas');
    const resultadohtm = document.getElementById('perguntas');
    
    perguntaDiv.innerHTML = ''; // Limpa escolhas anteriores
    imagemDiv.innerHTML   = ''; // Limpa escolhas anteriores
    choicesDiv.innerHTML  = ''; // Limpa escolhas anteriores
    resultadohtm.innerHTML  = ''; // Limpa escolhas anteriores

    const choices = node.querySelectorAll(':scope > choice');
    choices.forEach(choice => {
        const btn = document.createElement('button');
        const img = document.createElement('img');
        const perg = document.createElement('string');
        const tool = document.createElement('string');

        btn.textContent = choice.getAttribute('description');
        btn.setAttribute("title", tool.textContent = choice.getAttribute('tooltip'));
        const CaminhoImage = choice.getAttribute('image');
        if (CaminhoImage) {
            img.src = CaminhoImage;
            imagemDiv.appendChild(img);
        }
        perg.textContent = choice.getAttribute('pergunta');
        
        btn.addEventListener('click', () => {
            addChoiceToHistory(btn.textContent);
            //addChoiceIdToHistory(choice.getAttribute('id')); // Adiciona o ID da escolha ao histórico

            const nextLevel = choice.querySelector(':scope > level2, :scope > level3, :scope > level4, :scope > level5, :scope > level6, :scope > level7, :scope > level8');

            if (nextLevel) {
                choiceHistory.push(node);
                displayHistoria(nextLevel);
            }
        });

        perguntaDiv.appendChild(perg);
        choicesDiv.appendChild(btn);
    });


    const imagemresultDiv = document.getElementById('imagem_result');
    imagemresultDiv.innerHTML = "";

    //Adiciona resultado final
    const resultado = node.querySelectorAll(':scope > resultado');
    resultado.forEach(resultado =>
    {
        const result = document.createElement('string');
        const imagem    = document.createElement('img');

        result.textContent  = resultado.getAttribute('pergunta');
        const CaminhoImage = resultado.getAttribute('image');
        if (CaminhoImage) {
            imagem.src = CaminhoImage;
            imagemresultDiv.appendChild(imagem);
        }

        result.addEventListener('click', () =>
        {
            addRespostaFinal(result.textContent);

            const nextLevel = resultado.querySelector(':scope > level8');

            if (nextLevel)
            {
                choiceHistory.push(node);
            }
        });
        
        resultadohtm.appendChild(result);
    });
}

function addRespostaFinal(resultado){}

function addChoiceToHistory(choice) {}

function addChoiceIdToHistory(choiceId) {}
