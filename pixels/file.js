const filterselect = document.querySelector('.filter');
const Cards = document.querySelector('.cards');
const searchInput = document.querySelector("input[type='search']");

const platformIcons = {
  pc: "IMG/pc.png",
  playstation: "IMG/playstation.png",
  xbox: "IMG/xbox.png",
  mac: "IMG/mac.png",
  linux: "IMG/linux.png"
};

let url = "https://debuggers-games-api.duckdns.org/api/games";
let gamesData = [];
let nextUrl = null;
let prevUrl = null;

// Fonction pour afficher le loading
// function showLoading() {
//   Cards.innerHTML = `
//     <div class="flex items-center justify-center min-h-[500px] w-full col-span-full">
//       <div class="text-center">
//         <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
//         <p class="text-gray-300 text-base">Chargement...</p>
//       </div>
//     </div>
//   `;
// }

function showLoading() {
  Cards.innerHTML = `
    <div class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white-500 mx-auto mb-4"></div>
        <p class="text-white text-lg">Chargement...</p>
      </div>
    </div>
  `;
}




// Fonction pour afficher un message si aucun jeu
function showNoGames() {
  Cards.innerHTML = `
    <div class="flex items-center justify-center min-h-[500px] w-full col-span-full">
      <div class="text-center">
        <p class="text-gray-300 text-xl">Aucun jeu trouvé</p>
      </div>
    </div>
  `;
}

// Charger les données initiales
async function loadInitialData() {
  showLoading(); // Afficher le loading au début
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    nextUrl = data.next;
    prevUrl = data.previous;
    gamesData = data.results;
   
    if (gamesData.length === 0) {
      showNoGames();
    } else {
      getSelect();
      getcard();
    }
  } catch (error) {
    console.error('Erreur chargement données:', error);
    Cards.innerHTML = `
      <div class="flex items-center justify-center min-h-[500px] w-full col-span-full">
        <div class="text-center bg-red-900/50 backdrop-blur-md p-8 rounded-lg max-w-md">
          <p class="text-red-300 text-xl mb-2 font-bold">Erreur lors du chargement</p>
          <p class="text-gray-300 text-sm">Impossible de charger les jeux</p>
        </div>
      </div>
    `;
  }
}

async function getjeuxfilter({ genre, plateforme, notes }) {
  try {
    let filteredGames = [...gamesData];

    if (genre) {
      filteredGames = filteredGames.filter(game =>
        game.genres.some(g => g.name === genre)
      );
    }

    if (plateforme) {
      filteredGames = filteredGames.filter(game =>
        game.parent_platforms.some(p => p.platform.name === plateforme)
      );
    }

    if (notes === "Croissant") {
      filteredGames.sort((a, b) => a.rating - b.rating);
    } else if (notes === "decroissant") {
      filteredGames.sort((a, b) => b.rating - a.rating);
    }

    return filteredGames;
  } catch (error) {
    console.error('Erreur dans getjeuxfilter:', error);
    return [];
  }
}

async function getSelect() {
  try {
    const allgenres = gamesData.flatMap(elem => elem.genres.map(g => g.name));
    const genresUniques = [...new Set(allgenres)];

    const allplateformes = gamesData.flatMap(elem =>
      elem.parent_platforms.map(platf => platf.platform.name)
    );
    const plateformeUniques = [...new Set(allplateformes)];

    filterselect.innerHTML = `
      <select id="genre" class="text-white bg-black ml-4 text-center w-[80px] rounded-3xl border border-white-300 p-2 md:w-[140px] lg:w-[200px]">
        <option value="" selected>genres</option>
        ${genresUniques.map(e => `<option value="${e}">${e}</option>`).join('')}
      </select>
      
      <select id="plateforme" class="text-white bg-black ml-4 text-center w-[90px] rounded-3xl border border-white-300 p-2 lg:w-[200px] md:w-[140px]">
        <option value="" selected>plateformes</option>
        ${plateformeUniques.map(e => `<option value="${e}">${e}</option>`).join('')}
      </select>
      
      <select id="note" class="text-white bg-black ml-4 mr-3 text-center w-[80px] rounded-3xl border border-white-300 p-2 lg:w-[200px] md:w-[140px]">
        <option value="" selected>notes</option>
        <option value="Croissant">Croissant</option>
        <option value="decroissant">Décroissant</option>
      </select>
      
      <button id="filterBtn" class="border border-red-500 text-white w-[80px] px-4 py-2 ml-4 lg:w-[200px] md:w-[120px]">Filtrer</button>
    `;

    const filterBtn = document.querySelector('#filterBtn');
    filterBtn.addEventListener('click', async () => {
      const genre = document.querySelector('#genre').value;
      const plateforme = document.querySelector('#plateforme').value;
      const notes = document.querySelector('#note').value;

      showLoading(); // Afficher le loading pendant le filtrage
      
      const filteredGames = await getjeuxfilter({ genre, plateforme, notes });
      
      if (filteredGames.length === 0) {
        showNoGames();
      } else {
        AfficherGames(filteredGames);
      }
    });

  } catch (error) {
    console.error('Erreur dans getSelect:', error);
  }
}

function AfficherGames(games) {
  if (games.length === 0) {
    showNoGames();
    return;
  }

  Cards.innerHTML = games.map(game => `
    <div class='card m-auto mt-5 rounded-3xl w-[300px] h-[300px]'>
      <div data-gameid="${game.id}" class="card-img">
        <img class="rounded-t-2xl w-full h-[200px] object-cover" src="${game.background_image}">
      </div>
      <div class="card-text pl-2 bg-red-600 flex flex-col justify-between text-white rounded-b-lg h-[100px]">
        <div class="img-platform flex">
          ${game.parent_platforms.map((p) => {
            const slug = p.platform.slug;
            const icon = platformIcons[slug];
            return icon ? `<img src="${icon}" alt="${slug}" class="w-[20px] inline-block mx-1">` : "";
          }).join("")}
        </div>
        <div class="namecoeur mb-[10px] flex justify-between gap-4">
          <h2 class="name text-white font-bold truncate">${game.name}</h2>
          <h2 class="name text-white font-bold truncate">${game.rating}</h2>
          <img class="w-[20px] mr-5" src="IMG/comme.png">
        </div>
      </div>
    </div>
  `).join("");

  attachCardEvents();
}

// Pagination
document.querySelector(".previous").addEventListener("click", async () => {
  if (!prevUrl) return;

  showLoading(); // Afficher le loading pendant la pagination

  try {
    const response = await fetch(prevUrl);
    const data = await response.json();

    gamesData = data.results;
    nextUrl = data.next;
    prevUrl = data.previous;

    AfficherGames(gamesData);
  } catch (error) {
    console.error('Erreur pagination:', error);
    Cards.innerHTML = `
      <div class="flex items-center justify-center min-h-[400px] w-full col-span-full">
        <div class="text-center">
          <p class="text-red-500 text-lg sm:text-xl font-bold mb-2">Erreur lors du chargement</p>
          <p class="text-gray-300 text-sm sm:text-base">Impossible de charger la page</p>
        </div>
      </div>
    `;
  }
});

document.querySelector(".next").addEventListener("click", async () => {
  if (!nextUrl) return;

  showLoading(); // Afficher le loading pendant la pagination

  try {
    const response = await fetch(nextUrl);
    const data = await response.json();

    gamesData = data.results;
    nextUrl = data.next;
    prevUrl = data.previous;

    AfficherGames(gamesData);
  } catch (error) {
    console.error('Erreur pagination:', error);
    Cards.innerHTML = `
      <div class="flex items-center justify-center min-h-[400px] w-full col-span-full">
        <div class="text-center">
          <p class="text-red-500 text-lg sm:text-xl font-bold mb-2">Erreur lors du chargement</p>
          <p class="text-gray-300 text-sm sm:text-base">Impossible de charger la page</p>
        </div>
      </div>
    `;
  }
});

async function getcard() {
  try {
    AfficherGames(gamesData);

    searchInput.addEventListener("input", e => {
      const value = e.target.value.toLowerCase();
      const cards = document.querySelectorAll(".card");
      let visibleCount = 0;

      cards.forEach(card => {
        const name = card.querySelector(".name").textContent.toLowerCase();
        if (name.includes(value)) {
          card.style.display = "block";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      // Si aucune carte visible après la recherche
      if (visibleCount === 0 && value !== "") {
        const existingNoResult = document.querySelector('.no-result-message');
        if (!existingNoResult) {
          Cards.insertAdjacentHTML('afterbegin', `
            <div class="no-result-message flex items-center justify-center min-h-[300px] w-full col-span-full">
              <div class="text-center">
                <p class="text-gray-300 text-lg sm:text-xl">Aucun jeu trouvé pour "${value}"</p>
              </div>
            </div>
          `);
        }
      } else {
        const noResultMsg = document.querySelector('.no-result-message');
        if (noResultMsg) {
          noResultMsg.remove();
        }
      }
    });

  } catch (error) {
    console.error('Erreur dans getcard:', error);
  }
}

function attachCardEvents() {
  const cardImgs = document.querySelectorAll(".card-img");
  cardImgs.forEach(c => {
    c.addEventListener('click', (e) => {
      const gameid = e.currentTarget.dataset.gameid;
      window.location.href = `detaille.html?game.id=${gameid}`;
    });
  });
}

// Démarrer l'application
loadInitialData();