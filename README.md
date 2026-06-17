# 🐾 MyPetZone Mobile

Aplicativo mobile desenvolvido com o objetivo de **centralizar todo o ecossistema pet em uma única plataforma**, proporcionando praticidade, organização e bem-estar para tutores e seus pets.

---

## 🚀 Sobre o Projeto

O **MyPetZone Mobile** é uma aplicação que reúne funcionalidades essenciais para quem possui animais de estimação, integrando diversas soluções em um único ambiente digital.

A proposta é simples: **facilitar a vida do tutor**, oferecendo controle, informação e serviços em poucos toques.

---

## 📱 Preview do App

> *(Adicione aqui prints do app)*

./assets/screenshot-home.png  
./assets/screenshot-map.png  
./assets/screenshot-calendar.png  
./assets/screenshot-vaccine.png  

---

## 🧠 Funcionalidades

### 📍 Mapa Interativo
- Exibe serviços pet próximos ao usuário
- Integração com geolocalização em tempo real  
- Categorias disponíveis:
  - Pet shops
  - Clínicas veterinárias
  - Banho e tosa
  - Outros serviços relacionados

---

### 📦 Sistema de Estoque Inteligente
- Controle de suprimentos (ração, medicamentos, etc.)
- Cálculo automático baseado no consumo
- Previsão de quando o item irá acabar

---

### 🔐 Sistema de Autenticação
- Login persistente utilizando Firebase Authentication
- Geração e gerenciamento de tokens
- Sessões seguras e escaláveis

---

### 📅 Calendário Pet
- Registro de eventos importantes
- Exemplos:
  - Consultas
  - Vacinas
  - Banho e tosa  
- Integração com notificações automáticas

---

### 💉 Carteirinha de Vacinação
- Armazenamento digital das vacinas do pet
- Controle de datas e vencimentos
- Notificações antes do vencimento

---

### 🔔 Notificações Inteligentes
- Alertas automáticos para:
  - Vacinas próximas do vencimento
  - Eventos cadastrados
  - Reposição de estoque

---
## 🛠️ Tecnologias Utilizadas

### 📱 Mobile
- React Native com Expo

### ☁️ Backend & Serviços
- Firebase
  - Authentication
  - Firestore
  - Cloud Messaging
  - Storage

---

## ⚙️ Como Rodar o Projeto

```bash
# Baixe o app em caso de tenha um android para testes:
https://expo.dev/artifacts/eas/v5hgn1frBh2LBRUmv34czzYdWkaPPDbWsh1-Sh4m-_8.apk

# Clone o repositório
git clone https://github.com/seu-usuario/mypetzone.git

# Entre na pasta
cd mypetzone

# Instale as dependências
npm install

# Inicie o projeto
npx expo start

#Acesse o localhost:3000
```
## 📂 Estrutura do Projeto

<details>
  <summary><strong>Clique para expandir / ocultar</strong></summary>

```bash
.
├── app
│   ├── (auth)
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── signup-company.tsx
│   │   ├── signup-type.tsx
│   │   └── signup-user.tsx
│   ├── (features)
│   │   ├── appointment.tsx
│   │   ├── estoque.tsx
│   │   ├── nearby.tsx
│   │   ├── notifications.tsx
│   │   ├── partners.tsx
│   │   ├── petmap.tsx
│   │   ├── pet-shop.tsx
│   │   ├── plans.tsx
│   │   ├── settings.tsx
│   │   └── vaccines.tsx
│   ├── _layout.tsx
│   ├── loading.tsx
│   ├── modal.tsx
│   ├── pet-shop.tsx
│   ├── (profile)
│   │   ├── my-pet.tsx
│   │   ├── pet-details
│   │   └── pet-register.tsx
│   ├── services
│   │   ├── appointment.service.ts
│   │   ├── auth.service.ts
│   │   ├── auth-session.service.ts
│   │   ├── estoque.service.ts
│   │   ├── index.ts
│   │   ├── notifications.service.ts
│   │   └── profile.service.ts
│   ├── styles
│   │   ├── appointment.styles.ts
│   │   ├── estoque.styles.ts
│   │   ├── explore.styles.ts
│   │   ├── form-input.styles.ts
│   │   ├── home.styles.ts
│   │   ├── loading.styles.ts
│   │   ├── login.styles.ts
│   │   ├── my-pet.styles.ts
│   │   ├── notifications.styles.ts
│   │   ├── partners.styles.ts
│   │   ├── pet-details.styles.ts
│   │   ├── petmap.styles.ts
│   │   ├── plans.styles.ts
│   │   ├── settings.styles.ts
│   │   ├── signup.styles.company.ts
│   │   ├── signup.styles.type.ts
│   │   ├── signup.styles.user.ts
│   │   ├── status-message.styles.ts
│   │   ├── tokens
│   │   └── vaccines.styles.ts
│   ├── (tabs)
│   │   ├── explore.tsx
│   │   ├── home.tsx
│   │   ├── index.tsx
│   │   └── _layout.tsx
│   └── teste.ts
├── app.json
├── assets
│   ├── bot
│   │   ├── botpress-chat-button.tsx
│   │   ├── botpress-config.ts
│   │   ├── botpress-html.ts
│   │   ├── botpress-native.styles.ts
│   │   ├── botpress-web.logic.ts
│   │   ├── botpress-web.styles.ts
│   │   └── botpress-web.view.tsx
│   └── images
│       ├── android-icon-background.png
│       ├── android-icon-foreground.png
│       ├── android-icon-monochrome.png
│       ├── favicon.png
│       ├── icon.png
│       ├── partial-react-logo.png
│       ├── react-logo@2x.png
│       ├── react-logo@3x.png
│       ├── react-logo.png
│       └── splash-icon.png
├── components
│   ├── botpress-chat-button.tsx
│   ├── botpress-html.ts
│   ├── external-link.tsx
│   ├── form-input.tsx
│   ├── haptic-tab.tsx
│   ├── hello-wave.tsx
│   ├── parallax-scroll-view.tsx
│   ├── route-feedback.tsx
│   ├── status-message.tsx
│   ├── styles
│   │   ├── hello-wave.styles.ts
│   │   ├── parallax-scroll-view.styles.ts
│   │   └── route-feedback.styles.ts
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui
│       ├── collapsible.styles.ts
│       ├── collapsible.tsx
│       ├── icon-symbol.ios.tsx
│       └── icon-symbol.tsx
├── constants
│   └── theme.ts
├── database
│   └── firebase
│       ├── firebase-connection-test.ts
│       └── firebase.ts
├── eas.json
├── eslint.config.js
├── expo-env.d.ts
├── hooks
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── package.json
├── package-lock.json
├── README.md
├── scripts
│   └── reset-project.js
├── tsconfig.json
├── types
│   ├── appointment.types.ts
│   ├── pet.types.ts
│   └── signup.types.ts
└── utils
    ├── navigation.ts
    └── validators.ts
``
