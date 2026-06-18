/* ===========================================================
   ELEMENTOS
=========================================================== */
const janela = document.getElementById("janela-conversa");
const formulario = document.getElementById("formulario-chat");
const input = document.getElementById("mensagem");
const digitando = document.getElementById("digitando");

/* ===========================================================
   ESTADO DA CONVERSA
=========================================================== */
let etapa = 0;
let nomeVisitante = "";
let aguardandoResposta = false;
let finalizado = false; 

/* ===========================================================
   ROTEIRO CASUAL & INTERATIVO REFORMULADO
=========================================================== */
const roteiro = [
    { autor: "samuel", texto: "Olá, é um prazer receber você por aqui." },
    { autor: "samuel", texto: "Antes de falar sobre código, projetos ou qualquer tecnologia..." },
    { autor: "samuel", texto: "Como posso chamar você?" },
    { autor: "input", modo: "nome" }, // Captura o primeiro input (Nome)
    
    { autor: "samuel", texto: "Prazer em conhecer você, {nome}." },
    { autor: "samuel", texto: "Queria te contar um pouco sobre o que me move aqui nesse laboratório." },
    { autor: "samuel", texto: "Estudar Ciência da Computação me ensinou que criar interfaces vai muito além de empilhar códigos e tags estruturadas." },
    { autor: "samuel", texto: "O verdadeiro desafio está nos detalhes: em como equilibrar performance com um apelo visual marcante." },
    { autor: "samuel", texto: "Passo horas refinando sombras, desfoques e layouts responsivos para que a experiência pareça natural e limpa para quem acessa." },
    
    // SEGUNDA INTERAÇÃO: O visitante digita uma escolha de tema no input
    { autor: "samuel", texto: "Para eu direcionar melhor o nosso papo, o que você gostaria de explorar agora? Digite 'PROJETOS' ou 'COMPUTAÇÃO'." },
    { autor: "input", modo: "escolha_tema" }, 
    
    // Respostas Dinâmicas injetadas com base na resposta do usuário
    { autor: "samuel", texto: "Excelente escolha. Esse universo exige constantes testes e refinamentos." },
    { autor: "samuel", texto: "Cada linha limpa de código que escrevo serve para garantir que o resultado final faça sentido e resolva problemas reais." },
    { autor: "samuel", texto: "Fique super à vontade para explorar os cantos da aplicação." }
];

/* ===========================================================
   FUNÇÕES DE SUPORTE
=========================================================== */
function horarioAtual() {
    const agora = new Date();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minuto = String(agora.getMinutes()).padStart(2, "0");
    return `${hora}:${minuto}`;
}

function calcularTempo(texto) {
    const tempo = texto.length * 20;
    return Math.max(700, Math.min(tempo, 1800));
}

function atualizarScroll() {
    janela.scrollTo({
        top: janela.scrollHeight,
        behavior: "smooth"
    });
}

function mostrarDigitando() {
    if (digitando) {
        janela.appendChild(digitando); 
        digitando.style.display = "flex";
        atualizarScroll();
    }
}

function esconderDigitando() {
    if (digitando) digitando.style.display = "none";
}

/* ===========================================================
   GERENCIAMENTO DE MENSAGENS
=========================================================== */
function criarMensagem(texto, classe) {
    const article = document.createElement("article");
    article.className = `mensagem ${classe}`;

    if (classe === "samuel") {
        article.innerHTML = `
            <div class="bloco-mensagem-samuel">
                <img src="curriculo.jpg.png" alt="Foto de Samuel" class="avatar-chat">
                <div class="balao">
                    <p>${texto}</p>
                    <span class="horario">${horarioAtual()}</span>
                </div>
            </div>
        `;
    } else {
        article.innerHTML = `
            <div class="balao">
                <p>${texto}</p>
                <span class="horario">${horarioAtual()}</span>
            </div>
        `;
    }

    janela.appendChild(article);
    atualizarScroll();
}

function digitarTexto(texto, callback) {
    const article = document.createElement("article");
    article.className = "mensagem samuel";

    article.innerHTML = `
        <div class="bloco-mensagem-samuel">
            <img src="curriculo.jpg.png" alt="Foto de Samuel" class="avatar-chat">
            <div class="balao">
                <p id="digitando-texto-atual"></p>
                <span class="horario">${horarioAtual()}</span>
            </div>
        </div>
    `;

    janela.appendChild(article);
    atualizarScroll();

    const p = article.querySelector("#digitando-texto-atual");
    p.removeAttribute("id");

    let indice = 0;
    const velocidade = 15;

    const escrever = setInterval(() => {
        p.textContent += texto[indice];
        indice++;
        atualizarScroll();

        if (indice >= texto.length) {
            clearInterval(escrever);
            if (callback) setTimeout(callback, 500);
        }
    }, velocidade);
}

/* ===========================================================
   CONTROLE DO FLUXO
=========================================================== */
function proximaMensagem() {
    if (etapa >= roteiro.length) {
        esconderDigitando();
        return;
    }

    const html_atual = roteiro[etapa];

    if (html_atual.autor === "input") {
        esconderDigitando();
        aguardandoResposta = true;
        input.disabled = false;
        
        if (html_atual.modo === "nome") {
            input.placeholder = "Digite seu nome...";
        } else if (html_atual.modo === "escolha_tema") {
            input.placeholder = "Digite 'projetos' ou 'computação'...";
        }
        
        input.focus();
        return;
    }

    mostrarDigitando();

    let texto = html_atual.texto.replace("{nome}", nomeVisitante || "Visitante");
    const tempo = calcularTempo(texto);

    setTimeout(() => {
        esconderDigitando();
        digitarTexto(texto, () => {
            etapa++;
            proximaMensagem();
        });
    }, tempo);
}

function continuarConversa() {
    aguardandoResposta = false;
    input.disabled = true;
    input.placeholder = "Aguardando o Samuel...";
    etapa++;
    setTimeout(() => {
        proximaMensagem();
    }, 400);
}

/* ===========================================================
   FORMULÁRIO E EVENTOS
=========================================================== */
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!aguardandoResposta) return;

    const texto = input.value.trim();
    if (texto === "") return;

    input.value = "";
    
    criarMensagem(texto, "visitante");

    // Lógica para discernir qual etapa de input o usuário respondeu
    const passoAtual = roteiro[etapa];
    if (passoAtual && passoAtual.modo === "nome") {
        if (nomeVisitante === "") {
            nomeVisitante = texto;
            localStorage.setItem("nomeVisitante", nomeVisitante);
        }
    } else if (passoAtual && passoAtual.modo === "escolha_tema") {
        const escolha = texto.toLowerCase();
        // Altera dinamicamente as próximas mensagens baseado na escolha de texto digitada
        if (escolha.includes("projeto")) {
            roteiro[etapa + 1].texto = `Falar de projetos é ótimo! O DigitAI e meu portfólio mostram bem como gosto de misturar front estruturado com utilidade prática.`;
        } else if (escolha.includes("computa")) {
            roteiro[etapa + 1].texto = `A ciência da computação me dá a base lógica sólida que preciso para migrar de interfaces visuais para arquiteturas robustas em Java.`;
        }
    }

    continuarConversa();
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        formulario.requestSubmit();
    }
});

/* ===========================================================
   PERSISTÊNCIA E MONITORAMENTO
=========================================================== */
function salvarConversa() {
    localStorage.setItem("chatEtapa", etapa);
}

function carregarConversa() {
    const etapaSalva = localStorage.getItem("chatEtapa");
    const nomeSalvo = localStorage.getItem("nomeVisitante");

    if (etapaSalva !== null) etapa = Number(etapaSalva);
    if (nomeSalvo) nomeVisitante = nomeSalvo;
}

function limparConversa() {
    localStorage.removeItem("chatEtapa");
    localStorage.removeItem("nomeVisitante");
}

function finalizarConversa() {
    if (finalizado) return;
    finalizado = true;

    mostrarDigitando();

    setTimeout(() => {
        esconderDigitando();
        criarMensagem("Obrigado por acompanhar até aqui.", "samuel");

        setTimeout(() => {
            mostrarDigitando();
            setTimeout(() => {
                esconderDigitando();
                criarMensagem("Espero que esta demonstração reflita meu cuidado em desenvolver experiências interativas e bem lapidadas.", "samuel");
                
                setTimeout(() => {
                    mostrarDigitando();
                    setTimeout(() => {
                        esconderDigitando();
                        criarMensagem("Caso queira analisar meu histórico profissional completo, deixei o acesso logo abaixo.", "samuel");
                        criarBotaoContato();
                    }, 1000);
                }, 1500);
            }, 1000);
        }, 1500);
    }, 900);
}

function criarBotaoContato() {
    if (document.querySelector(".botao-final")) return;

    const area = document.createElement("div");
    area.style.textAlign = "center";
    area.style.margin = "20px 0";

    const botao = document.createElement("button");
    botao.className = "botao-final";
    botao.innerText = "Acessar Currículo";
    botao.style.padding = "15px 30px";
    botao.style.background = "#00b4d8";
    botao.style.color = "#001219";
    botao.style.border = "none";
    botao.style.borderRadius = "12px";
    botao.style.fontWeight = "600";
    botao.style.cursor = "pointer";

    botao.addEventListener("click", () => {
        window.location.href = "curriculo.html"; 
    });

    area.appendChild(botao);
    janela.appendChild(area);
    atualizarScroll();
}

const verificarEtapa = setInterval(() => {
    salvarConversa();
    if (etapa >= roteiro.length) {
        clearInterval(verificarEtapa);
        finalizarConversa();
    }
}, 500);

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "r") {
        e.preventDefault();
        limparConversa();
        location.reload();
    }
});

/* ===========================================================
   INICIALIZAÇÃO ÚNICA
=========================================================== */
window.addEventListener("load", () => {
    carregarConversa();
    esconderDigitando();
    input.disabled = true;

    if (etapa >= roteiro.length) {
        finalizarConversa();
    } else {
        proximaMensagem();
    }
});