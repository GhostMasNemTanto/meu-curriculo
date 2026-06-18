/* ==========================================================
   DIGITAI INTERFACE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const introducaoSpans = document.querySelectorAll("#introducao span");
    const mensagensSpans = document.querySelectorAll("#mensagens span");
    const status = document.querySelectorAll("#system-status span");

    /* ==========================================================
       CONFIGURAÇÃO INICIAL PARA A DIGITAÇÃO
    ========================================================== */
    const textosIntroducao = [];
    introducaoSpans.forEach(span => {
        textosIntroducao.push(span.textContent);
        span.textContent = "";
        span.style.opacity = "1";
        span.style.transform = "none";
        span.style.borderRight = "2px solid rgba(0, 191, 255, 0.75)"; // Cursor piscante
    });

    /* ==========================================================
       EFEITO MÁQUINA DE ESCREVER (AUTOMÁTICO)
    ========================================================== */
    let linhaAtual = 0;
    
    function digitarTexto() {
        if (linhaAtual < introducaoSpans.length) {
            let elemento = introducaoSpans[linhaAtual];
            let textoCompleto = textosIntroducao[linhaAtual];
            let caractereIndex = 0;

            function caracterePorCaractere() {
                if (caractereIndex < textoCompleto.length) {
                    elemento.textContent += textoCompleto.charAt(caractereIndex);
                    caractereIndex++;
                    setTimeout(caracterePorCaractere, 40); // Velocidade da escrita (40ms por letra)
                } else {
                    elemento.style.borderRight = "none"; // Remove cursor da linha finalizada
                    linhaAtual++;
                    setTimeout(digitarTexto, 400); // Pausa entre linhas
                }
            }
            caracterePorCaractere();
        }
    }

    // Inicia a digitação automaticamente
    digitarTexto();

    /* ==========================================================
       CICLO DE FRASES CONTÍNUO (APARECE E SOME)
    ========================================================== */
    mensagensSpans.forEach(span => {
        span.style.display = "none";
        span.style.opacity = "0";
        span.style.transition = "opacity 1s ease";
    });

    let mensagemIndex = 0;

    function alternarMensagens() {
        let anterior = mensagensSpans[(mensagemIndex - 1 + mensagensSpans.length) % mensagensSpans.length];
        anterior.style.opacity = "0";
        
        setTimeout(() => {
            anterior.style.display = "none";
            
            let atual = mensagensSpans[mensagemIndex];
            atual.style.display = "block";
            
            setTimeout(() => {
                atual.style.opacity = "1";
            }, 50);

            mensagemIndex = (mensagemIndex + 1) % mensagensSpans.length;
        }, anterior.style.opacity === "1" ? 1000 : 0);
    }

    // Inicia o ciclo contínuo automático
    setTimeout(() => {
        alternarMensagens();
        setInterval(alternarMensagens, 5000); // Alterna a cada 5 segundos
    }, 2000);

    /* ==========================================================
       STATUS DINÂMICO ORIGINAL
    ========================================================== */
const estados = [
        "STATUS: ONLINE",
        "SISTEMA: ATIVO",
        "ANALISANDO VISITANTE",
        "CARREGANDO EXPERIÊNCIA",
        "SISTEMA ESTÁVEL"
    ];
    
    let contador = 0;

    setInterval(() => {
        status[0].textContent = estados[contador];
        contador++;
        if (contador >= estados.length) {
            contador = 0;
        }
    }, 2500);
});

/* ==========================================================
   MOVIMENTO SUAVE DO PAINEL ORIGINAL
========================================================== */
document.addEventListener("mousemove", (event) => {
    const painel = document.getElementById("painel-principal");
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * 12;
    painel.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

/* ==========================================================
   RETORNO AO CENTRO ORIGINAL
========================================================== */
document.addEventListener("mouseleave", () => {
    const painel = document.getElementById("painel-principal");
    painel.style.transform = "rotateY(0deg) rotateX(0deg)";
});

/* ==========================================================
   BOTÕES ORIGINAL
========================================================== */
const botoes = document.querySelectorAll(".botao");
botoes.forEach(botao => {
    botao.addEventListener("mouseenter", () => {
        botao.style.transform = "translateY(-4px) scale(1.04)";
    });
    botao.addEventListener("mouseleave", () => {
        botao.style.transform = "translateY(0px) scale(1)";
    });
});

/* ==========================================================
   CLIQUE ORIGINAL
========================================================== */
document.addEventListener("click", () => {
    const frame = document.getElementById("scanner-frame");
    frame.animate(
        [
            { opacity: .4, transform: "scale(1)" },
            { opacity: 1, transform: "scale(1.005)" },
            { opacity: .4, transform: "scale(1)" }
        ],
        { duration: 500 }
    );
});