<?php
/* ===========================================================
   EXPERIENCIA.PHP
   =========================================================== */
session_start();
date_default_timezone_set("America/Sao_Paulo");

if (!isset($_SESSION["visitante"])) {
    $_SESSION["visitante"] = "";
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mensagem = trim($_POST["mensagem"] ?? "");
    if (!empty($mensagem) && empty($_SESSION["visitante"])) {
        $_SESSION["visitante"] = htmlspecialchars($mensagem);
    }
}

$nome = $_SESSION["visitante"];
$status = "Online";
$hora = date("H:i");
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Samuel | A Experiência</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="experiencia.css">
</head>
<body>

    <main id="aplicativo-chat">
        <!-- CABEÇALHO -->
        <header id="cabecalho-chat">
            <div class="perfil">
                <div class="avatar">SF</div>
                <div class="informacoes-perfil">
                    <h1>Samuel do Carmo Fernandes</h1>
                    <span class="status">● <?php echo $status; ?></span>
                </div>
            </div>
        </header>

        <!-- CONVERSA -->
        <section id="janela-conversa">
            <div class="separador">
                <span>Hoje</span>
            </div>

            <!-- Balão Inicial Renderizado via PHP para SEO e Primeira Carga Eficiente -->
            <article class="mensagem samuel">
                <div class="bloco-mensagem-samuel">
                    <img src="curriculo.jpg.png" alt="Foto de Samuel" class="avatar-chat">
                    <div class="balao">
                        <p>Olá! Que bom receber você por aqui no meu espaço de testes.</p>
                        <span class="horario"><?php echo $hora; ?></span>
                    </div>
                </div>
            </article>

            <!-- O JavaScript inserirá as próximas mensagens e opções aqui dentro -->

            <div id="digitando">
                <div class="digitando-balao">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </section>

        <!-- ÁREA DE INTERAÇÃO COM OPÇÕES (DETALHE NÃO PENSADO ANTES) -->
        <div id="container-opcoes" class="oculto"></div>

        <!-- RODAPÉ DE INPUT -->
        <footer id="rodape-chat">
            <form id="formulario-chat">
                <label for="mensagem" class="visualmente-oculto">Digite sua mensagem</label>
                <input type="text" id="mensagem" name="mensagem" placeholder="Aguardando o Samuel..." autocomplete="off" disabled>
                <button type="submit" id="botao-enviar" disabled>Enviar</button>
            </form>
        </footer>
    </main>

    <script src="experiencia.js"></script>
</body>
</html>