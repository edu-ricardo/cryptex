# Cryptex Online

Um aplicativo web simples e divertido para criar e resolver quebra-cabeças no estilo "cryptex". Crie um cryptex com uma palavra-chave e uma mensagem secreta, e compartilhe o link para que outros possam tentar resolvê-lo.

![Cryptex Screenshot](https://i.imgur.com/your-screenshot.png) <!-- Você pode substituir isso por um screenshot real do seu projeto -->

## ✨ Funcionalidades

- **Criação de Cryptex**: Insira uma palavra-chave e uma mensagem secreta para gerar um link único.
- **Resolução Interativa**: Uma interface visual que simula um cryptex mecânico, com cilindros que giram.
- **Mensagem Secreta**: Ao resolver o quebra-cabeça, a mensagem secreta é revelada.
- **Pronto para GitHub Pages**: O projeto é configurado para ser facilmente implantado no GitHub Pages.

## 🚀 Como Usar

### Desenvolvimento Local

Para rodar o projeto em sua máquina local, siga estes passos:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

### Build para Produção

Para gerar a versão final do site para implantação:

1.  **Execute o script de build:**
    ```bash
    npm run build
    ```

2.  O comando irá gerar todo o site estático na pasta `/docs`, pronto para ser implantado.

### Implantação no GitHub Pages

1.  Faça o build do projeto com `npm run build`.
2.  Faça o commit e envie a pasta `/docs` (e o resto do seu código) para o seu repositório no GitHub.
3.  No seu repositório no GitHub, vá em `Settings > Pages`.
4.  Na seção "Build and deployment", em "Source", selecione **Deploy from a branch**.
5.  Em "Branch", selecione a sua branch principal (`main` ou `master`) e a pasta `/docs`.
6.  Clique em **Save**. Seu site estará no ar em poucos minutos!

## 🛠️ Tecnologias Utilizadas

- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- HTML5 & CSS3

## Proximas Features a Serem implementadas

- [ ] Lista circular de letras
- [ ] Gerar dica do criptex
- [ ] Permitir conteudo ser uma imagem
- [ ] Adicionar novos puzzes?