function createAutoOpenScript(): string {
  return `
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
  `;
}

interface BotpressHtmlInput {
  css: string;
  injectScriptUrl: string;
  botScriptUrl: string;
}

export function createBotpressHtml({
  css,
  injectScriptUrl,
  botScriptUrl,
}: BotpressHtmlInput): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MyPet - Chat Bot</title>
  <style>${css}</style>
</head>
<body>
  <div id="botpress-container"></div>
  <script src="${injectScriptUrl}"><\/script>
  <script src="${botScriptUrl}" defer><\/script>
  <script>${createAutoOpenScript()}<\/script>
</body>
</html>`;
}
