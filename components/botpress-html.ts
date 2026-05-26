// Arquivo contém o HTML do Botpress para ser usado no WebView
export const BOTPRESS_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MyPet - Chat Bot</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            height: 100vh;
            background: #f5f5f5;
        }
        #botpress-container {
            height: 100%;
            width: 100%;
        }
    </style>
</head>
<body>
    <div id="botpress-container"></div>

    <script src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"><\/script>
    <script src="https://files.bpcontent.cloud/2026/04/11/14/20260411142817-PAG1S2DL.js" defer><\/script>
        <script>
            (function autoOpenBotpressChat() {
                var attempts = 0;
                var maxAttempts = 60;

                function tryOpen() {
                    attempts += 1;

                    try {
                        if (window.botpress && typeof window.botpress.open === "function") {
                            window.botpress.open();
                        }
                    } catch (error) {
                        // no-op
                    }

                    try {
                        if (window.botpressWebChat && typeof window.botpressWebChat.open === "function") {
                            window.botpressWebChat.open();
                        }
                    } catch (error) {
                        // no-op
                    }

                    try {
                        var launcher = document.querySelector(
                            'button[aria-label*="chat" i], button[title*="chat" i], [data-testid*="launcher" i]'
                        );

                        if (launcher && typeof launcher.click === "function") {
                            launcher.click();
                        }
                    } catch (error) {
                        // no-op
                    }

                    if (attempts >= maxAttempts) {
                        clearInterval(timer);
                    }
                }

                var timer = setInterval(tryOpen, 400);
                setTimeout(function () {
                    clearInterval(timer);
                }, 25000);
            })();
        <\/script>
</body>
</html>`;
