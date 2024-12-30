# Rick and Morty Characters

Este projeto é uma aplicação web que consome a API pública [Rick and Morty API](https://rickandmortyapi.com/) para exibir personagens da série Rick and Morty. Ele utiliza HTML, CSS, JavaScript e a biblioteca Bootstrap para criar um layout responsivo e interativo.

## Funcionalidades

- Exibição de personagens com suas informações básicas: imagem, nome, status, espécie, última localização e último episódio em que apareceram.
- Sistema de paginação para navegar pelos personagens.
- Pesquisa de personagens por nome.
- Modal para exibir informações detalhadas sobre o personagem.

## Tecnologias Utilizadas

- **HTML**: Estrutura do projeto.
- **CSS**: Estilização customizada.
- **Bootstrap**: Para componentes e layout responsivo.
- **JavaScript**: Lógica de interação e consumo da API.
- **Axios**: Biblioteca para requisições HTTP.

## Estrutura do Projeto

### Arquivos Principais

- **`index.html`**: Página principal da aplicação.
- **`style.css`**: Arquivo de estilização customizada (não incluído nos códigos enviados).
- **`api.js`**: Configuração do Axios para facilitar o consumo da API.
- **`script.js`**: Lógica da aplicação, incluindo consumo da API, manipulação do DOM e interatividade.

## Estrutura da API Consumida

A aplicação consome a seguinte rota da API pública:
- **`/character`**: Retorna informações sobre os personagens, como:
  - Nome
  - Status (Vivo, Morto, Desconhecido)
  - Espécie (Humano, Alienígena, etc.)
  - Última localização conhecida
  - Episódios em que apareceram

## Recursos e Interações

### Sistema de Paginação
- Os personagens são exibidos em duas colunas, com 4 cards na primeira coluna e 2 na segunda.
- É possível navegar entre as páginas usando os botões de "Anterior" e "Próximo".

### Pesquisa de Personagens
- Campo de pesquisa para filtrar os personagens pelo nome.
- Mensagem de "Nenhum personagem encontrado" caso o termo não corresponda a nenhum personagem.

### Modal de Detalhes
- Exibe informações detalhadas sobre o personagem selecionado, incluindo:
  - Imagem
  - Nome
  - Status (traduzido para português)
  - Espécie (traduzida para português)
  - Última localização conhecida
  - Último episódio em que apareceu

## Telas da Aplicação

### Tela Principal
- Lista de personagens organizados em dois cartões responsivos.

### Modal
- Detalhes expandidos do personagem selecionado.
