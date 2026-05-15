# AppMyPet — Mobile (Expo)

Este repositório contém o código fonte de uma aplicação construída com Expo e uma estrutura pensada para rodar tanto em web quanto em mobile.

Resumo rápido

- **Stack:** Expo (React Native), TypeScript, Router baseado em arquivos.
- **Pasta principal do app:** [app](app/)
- **Outros recursos e exemplos:** [AppMyPet/app](AppMyPet/app/) (variação do projeto)

Como este port para mobile está sendo feito

- O projeto usa **Expo** para facilitar a execução em Android/iOS e acelerar o port do web/React para mobile.
- Componentes e utilitários compartilhados (em `components/`, `hooks/`, `constants/`) foram adaptados para React Native.
- A navegação é feita pelo roteamento baseado em arquivos (pasta `app/`), aproveitando o layout e os arquivos de rota já criados.
- Estilos foram convertidos para o sistema de estilos do projeto (arquivos em `app/styles/` e `AppMyPet/app/styles/`), com tokens em `tokens/tokens.ts`.
- Para features nativas (ex.: permissões, camera, armazenamento) usamos as APIs do Expo (Documentação: https://docs.expo.dev).

Configuração do ambiente Android (emulação)

1. Instale o Android Studio e o Android SDK.
   - Baixe em: https://developer.android.com/studio
2. Pelo Android Studio, abra o `AVD Manager` e crie um `Virtual Device` (recomendo um Pixel 8 pro com API 27+).
3. Verifique variáveis de ambiente (exemplo para Linux):

   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
   ```

4. Habilite aceleração de virtualização (Intel HAXM ou KVM) se necessário para acelerar o emulador.

Rodando o app no emulador Android

1. Instale dependências:

   ```bash
   npm install
   ```

2. Inicie o Metro bundler do Expo:

   ```bash
   npx expo start
   ```

   - Na tela do Metro, pressione `a` para abrir o app no emulador Android.
   - Alternativamente execute:

   ```bash
   npx expo run:android
   ```

   Esse comando instala um build de desenvolvimento no emulador conectado.

Dicas práticas e resolução de problemas

- Se o emulador não aparece ao executar `npx expo start`, verifique se o AVD está rodando (`$ANDROID_HOME/emulator/emulator -list-avds` e inicie manualmente).
- Para problemas com adb, execute `adb devices` e veja se há conexão com o emulador.
- Se alterações nativas não são refletidas, limpe cache e reinstale: `npx expo start -c` e reinicie o app no emulador.

Resumo de comandos úteis

- Instalar dependências: `npm install`
- Iniciar Metro/Dev server: `npx expo start`
- Abrir no emulador Android (pelo menu Metro): pressione `a` ou execute `npx expo run:android`
- Rodar testes unitários: `npm test`

Onde procurar ajuda

- Código principal: [app](app/)
- Exemplo/variante: [AppMyPet/app](AppMyPet/app/)
- Documentação Expo: https://docs.expo.dev
