document.addEventListener('DOMContentLoaded', () => {
  const column1 = document.getElementById('card-column-1');
  const column2 = document.getElementById('card-column-2');
  let currentPage = 1;
  const charactersPerPage = 6;
  let allCharacters = [];

  function fetchData() {
    allCharacters = [];

    const fetchPage = async (pageIndex) => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageIndex}`);
        const data = response.data;

        allCharacters = [...allCharacters, ...data.results];

        if (data.info.next) {
          await fetchPage(pageIndex + 1);
        } else {
          updatePageDisplay();
          updatePaginationButtons();
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchPage(1);
  }

  function updatePageDisplay() {
    column1.innerHTML = '';
    column2.innerHTML = '';

    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;

    allCharacters.slice(startIndex, endIndex).forEach((character, index) => {
      const card = createCard(character);

      if (index < 4) {
        column1.appendChild(card);
      } else {
        column2.appendChild(card);
      }
    });
  }

  document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePageDisplay(); 
      updatePaginationButtons();
    }
  });

  document.getElementById('next-button').addEventListener('click', () => {
    const totalPages = Math.ceil(allCharacters.length / charactersPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updatePageDisplay();
      updatePaginationButtons();
    }
  });

  function updatePaginationButtons() {
    const totalPages = Math.ceil(allCharacters.length / charactersPerPage);
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage >= totalPages;
  }

  function createCard(character) {
    const cardColumn = document.createElement('div');
    cardColumn.classList.add('col-12', 'mb-3');

    const card = document.createElement('div');
    card.classList.add('card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const image = document.createElement('img');
    image.classList.add('card-image');
    image.src = character.image;
    image.alt = character.name;

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    const name = document.createElement('h5');
    name.textContent = character.name;
    name.classList.add('nome');

    const statusDot = createStatusDot(character.status);
    const status = document.createElement('p');
    status.appendChild(statusDot);
    status.classList.add('status');

    if (character.status === "Alive") {
        status.appendChild(document.createTextNode("Vivo "));
    } else if (character.status === "Dead") {
        status.appendChild(document.createTextNode("Morto "));
    } else {
        status.appendChild(document.createTextNode("Desconhecido "));
    }

    const species = document.createElement('p');
    const speciesText = {
        "Human": "- Humano",
        "Alien": "- Alienígena",
        "Humanoid": "- Humanóide",
        "Mythological Creature": "- Criatura Mitológica",
        "unknown": "- Desconhecido",
        "Robot": "- Robô",
        "Disease": "- Doença"
    };
    species.textContent = speciesText[character.species] || `- ${character.species}`;
    species.classList.add('especie');

    const lastEpisodeTitle = document.createElement('p');
    lastEpisodeTitle.textContent = "Visto a última vez em:";
    lastEpisodeTitle.classList.add('titulo-local');

    const lastEpisodeText = document.createElement('p');
    lastEpisodeText.textContent = "Carregando...";
    lastEpisodeText.classList.add('local');
    lastEpisodeText.setAttribute('id', `characterEpisodes-${character.id}`);

    const lastEpisodeUrl = character.episode[character.episode.length - 1];
    fetch(lastEpisodeUrl)
        .then(response => response.json())
        .then(lastEpisode => {
            lastEpisodeText.textContent = lastEpisode.name;
        })
        .catch(error => {
            console.error("Erro ao buscar o episódio:", error);
            lastEpisodeText.textContent = "Desconhecido";
        });

    const localizacao = document.createElement('p');
    const tituloLocal = document.createElement('p');
    tituloLocal.textContent = `Última localização conhecida`;
    tituloLocal.classList.add('titulo-local');
    localizacao.textContent = `${character.location.name}`;
    localizacao.classList.add('local');

    const viewDetailsBtn = document.createElement('button');
    viewDetailsBtn.classList.add('btn', 'btn-info', 'details-btn');
    viewDetailsBtn.setAttribute('data-bs-toggle', 'modal');
    viewDetailsBtn.setAttribute('data-bs-target', '#characterModal');
    viewDetailsBtn.setAttribute('id', `btn-details-${character.id}`);

    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-info-circle');
    viewDetailsBtn.appendChild(icon);

    viewDetailsBtn.addEventListener('click', () => {
        openModal(character);
    });

    cardBody.appendChild(image);
    cardContent.appendChild(name);
    cardContent.appendChild(status);
    cardContent.appendChild(species);
    
    cardContent.appendChild(tituloLocal);
    cardContent.appendChild(localizacao);
    cardContent.appendChild(lastEpisodeTitle);
    cardContent.appendChild(lastEpisodeText);
    cardContent.appendChild(viewDetailsBtn);
    status.classList.add('d-inline');
    species.classList.add('d-inline');
    cardBody.appendChild(cardContent);
    card.appendChild(cardBody);
    cardColumn.appendChild(card);

    return cardColumn;
  }

  function createStatusDot(status) {
    const dot = document.createElement('span');
    dot.classList.add('rounded-circle');
    dot.style.width = '10px';
    dot.style.height = '10px';
    dot.style.display = 'inline-block';
    dot.style.marginRight = '5px';

    if (status === "Alive") dot.classList.add('bg-success');
    else if (status === "Dead") dot.classList.add('bg-danger');
    else dot.classList.add('bg-secondary');

    return dot;
  }

  function openModal(character) {
  
    document.getElementById('characterImage').src = character.image;
    document.getElementById('characterName').textContent = character.name;

    const statusElement = document.getElementById('characterStatus');
    statusElement.innerHTML = '';
    const statusDot = createStatusDot(character.status);
    statusElement.appendChild(statusDot);

    const statusTraduzido = character.status === "Alive" ? "Vivo" : character.status === "Dead" ? "Morto" : "Desconhecido";
    statusElement.appendChild(document.createTextNode(` ${statusTraduzido}`));

    const speciesMap = {
        "Human": "Humano",
        "Alien": "Alienígena",
        "Humanoid": "Humanóide",
        "Mythological Creature": "Criatura Mitológica",
        "unknown": "Desconhecido",
        "Robot": "Robô",
        "Disease": "Doença"
    };
    document.getElementById('characterSpecies').textContent = speciesMap[character.species] || character.species;

    const location = character.location.name ? character.location.name : 'Desconhecido';
    document.getElementById('characterLocation').textContent = location;

    const lastEpisodeUrl = character.episode[character.episode.length - 1];
    fetch(lastEpisodeUrl)
        .then(response => response.json())
        .then(lastEpisode => {
            const lastSeenElement = document.getElementById('characterEpisodes');
            lastSeenElement.textContent = ` ${lastEpisode.name}`;
        })
        .catch(error => {
            console.error("Erro ao buscar o episódio:", error);
            document.getElementById('characterEpisodes').textContent = "Desconhecido";
        });
  }

  function filterCards(searchTerm) {
    column1.innerHTML = '';
    column2.innerHTML = '';

    const filteredCharacters = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm)
    );

    if (filteredCharacters.length === 0) {
        const noResults = document.createElement('div');
        noResults.textContent = 'Nenhum personagem encontrado.';
        noResults.classList.add('text-center', 'text-danger', 'w-100', 'mt-3');
        column1.appendChild(noResults);
    } else {
        filteredCharacters.slice(0, 6).forEach((character, index) => {
            const card = createCard(character);
            if (index < 4) {
                column1.appendChild(card);
            } else {
                column2.appendChild(card);
            }
        });
    }
  }
  
  const searchButton = document.getElementById('searchButton');
  const searchBar = document.getElementById('searchBar');
  searchButton.addEventListener('click', () => {
    const searchTerm = searchBar.value.toLowerCase();
    filterCards(searchTerm);
  });

  fetchData();
});