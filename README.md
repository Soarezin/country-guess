# 🎮 Flag Guessing Game

Um jogo interativo de adivinhação de bandeiras com estilo terminal/hacker, desenvolvido com Vue.js e Vuetify.

![Preview do Jogo](/api/placeholder/800/400)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Jogar](#como-jogar)
- [API](#api)

## 🎯 Sobre o Projeto

O Flag Guessing Game é um jogo educativo onde os jogadores tentam adivinhar países com base em suas bandeiras. Com um design inspirado em interfaces de terminal e jogos hacker, o jogo oferece uma experiência única e envolvente de aprendizado sobre geografia mundial.

## ✨ Funcionalidades

- 🚩 Visualização de bandeiras de países
- 💡 Sistema progressivo de dicas
- ❤️ Sistema de vidas (6 tentativas)
- 🎯 Feedback imediato das tentativas
- 📝 Histórico de palpites
- 🔄 Sistema de reinício do jogo
- 🌍 Suporte para nomes de países em português e inglês

## 🛠 Tecnologias Utilizadas

- Vue.js 3
- Vuetify 3
- Restcountries API
- Vue Router
- Vuex

## 💻 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Soarezin/country-guess
```

2. Entre no diretório do projeto:
```bash
cd country-guess
```

3. Instale as dependências:
```bash
npm install
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🎮 Como Jogar

1. Ao iniciar o jogo, você verá a bandeira de um país aleatório
2. Use as dicas fornecidas para tentar adivinhar o país
3. Digite sua resposta no campo de entrada
4. Você tem 6 tentativas para acertar
5. A cada tentativa incorreta, você receberá uma nova dica
6. O jogo aceita o nome do país em português ou inglês

## 🌐 API

O jogo utiliza a API Restcountries para obter informações dos países. As principais informações utilizadas são:

- Bandeira do país
- Nome oficial e comum
- Traduções
- População
- Continente
- Fuso horário

## 👥 Autores

- João Victor Soares - [GitHub](https://github.com/Soarezin)
