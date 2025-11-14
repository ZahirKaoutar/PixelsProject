// const filterselect= document.querySelector('.filter') 
//  const Cards=document.querySelector('.cards')
//  const searchInput = document.querySelector("input[type='search']");
// const platformIcons = {
//   pc: "IMG/pc.png",
//   playstation: "IMG/playstation.png",
//   xbox: "IMG/xbox.png",
//   mac: "IMG/mac.png",
//   linux: "IMG/linux.png"
// };
// let url ="https://debuggers-games-api.duckdns.org/api/games"
// let data=url.json();









// async function getjeuxfilter({genre, plateforme,notes}){
// let url1 = "https://example-api.com/games?";
  
//   // Ajouter les paramètres facultatifs si ils existent
//   if (genre) url += `genre=${encodeURIComponent(genre)}&`;
//   if (plateforme)  url += `type=${encodeURIComponent(plateforme)}&`;
//    if (notes)  url += `type=${encodeURIComponent(notes)}&`;
  
//   // Supprimer le dernier & si nécessaire
//   url = url.slice(0, -1);

//   const response = await fetch(url1);
//   data = await response.json();
//   return data.results;
// }


//  async function  getSelect()
//  {
//     try {
//         // const datagame=await fetch(url)
//         // const reponse =await datagame.json()
        
//         const res1=data.results

//         const allgenres = res1.flatMap(elem => elem.genres.map(g => g.name));
//         const genresUniques = [...new Set(allgenres)];

//         const allplateformes = res1.flatMap(elem => elem.parent_platforms.map(platf => platf.platform.name));
//         const palteformeUniques = [...new Set(allplateformes)];
        
//         filterselect.innerHTML+=`< id="genre"  class="text-white  bg-black   ml-4 text-center w-20 rounded-3xl border border-white-300 p-2">  <option disabled selected"> genre</option>${genresUniques.map(e=>`<option value=${e}>${e}</option>`)}</select>`
//         filterselect.innerHTML+=`<select  id="plateforme" class="text-white bg-black  ml-4 text-center w-[90px] rounded-3xl border border-white-300 p-2">  <option disabled selected> note</option>${palteformeUniques.map(e=>`<option value=${e}>${e}</option>`)}</select>`
//         filterselect.innerHTML+=`<select  id="note" class="text-white    bg-black ml-4 mr-3  text-center w-[110px] rounded-3xl border border-white-300 p-2">  <option disabled selected > plateforme</option>${palteformeUniques.map(e=>`<option value=${e}>${e}</option>`)}</select>`
//             const searchBtn = document.querySelector('#filter');
//     searchBtn.addEventListener('click', () => {
//         const genre = document.querySelector('#genre').value;
//         const plateforme = document.querySelector('#plateforme').value;
//         const notes = document.querySelector('#notes').value;
       
//         getpost({ genre,plateforme,notes});
//     }) }catch (error) {
//         console.error('Erreur dans getSelect:', error);
//     }
//  }
//  getSelect()


// async function getcard(){
//     try {
//         // const datagame=await fetch("https://debuggers-games-api.duckdns.org/api/games?page=1&limit=20")
//         // const reponse =await datagame.json()
//         const res1=data.results

//         Cards.innerHTML += res1.map(game => `
//             <div class='card    m-auto  mt-5 rounded-3xl  w-[300px] h-[300px] '>
//             <div   data-gameid="${game.id}" class="card-img  ">
//             <img  class="rounded-t-2xl "src="${game.background_image}">
//             </div>
//             <div class="card-text pl-2  bg-red-600 flex flex-col justify-between  text-white rounded-b-lg h-[30%]">


//                 <div class="img-platform flex  ">
                
//                 ${game.parent_platforms.map((p)=> {
//                     const slug = p.platform.slug; 
//                     const icon = platformIcons[slug];
//                     return icon ? `<img src="${icon}" alt="${slug}" class="w-[20px] inline-block ml-2px  mx-1">` : "";
//                 }).join(" ")}
//                 </div>
//                 <div class="namecoeur mb-[10px] flex justify-between  gap-4">
//                     <h2 class="name text-white font-bold truncate ">${game.name}</h2>
//                     <img  class="w-[20px] mr-5"   src="IMG/comme.png">
//                 </div>
//             </div>
//             </div>
//         `).join(""); 
        







//   searchInput.addEventListener("input", e => {
//   const value = e.target.value.toLowerCase();
//   const cards = document.querySelectorAll(".card");

//   cards.forEach(card => {
//     const name = card.querySelector(".name").textContent.toLowerCase();
    

//     if (name.includes(value) ) {
//       card.style.display = "block"; // afficher
//     } else {
//       card.style.display = "none"; // cacher
//     }
//   });
// });
// const cardss=document.querySelectorAll(".card-img ")
//  cardss.forEach(c => {
//         c.addEventListener('click',(e)=>{
//         const gameid =  e.currentTarget.dataset.gameid;
        
//         window.location.href = `detaille.html?game.id=${gameid}`;  })})

        

//     } catch (error) {
//         console.error('Erreur dans getcard:', error);
//     }
// }
 

// getcard();





















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
let gamesData = []; // Stocker les données globalement

// Charger les données initiales
async function loadInitialData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    gamesData = data.results; // Stocker les données
    getSelect();
    getcard();
  } catch (error) {
    console.error('Erreur chargement données:', error);
  }
}

async function getjeuxfilter({ genre, plateforme, notes }) {
  try {
    let filteredGames = [...gamesData]; // Copie des données originales

    // Appliquer les filtres
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

    if (notes==="Croissant") {
      // Supposons que vous voulez filtrer par rating
      
      filteredGames.sort((a, b) => a.rating - b.rating);
     
    }else if(notes==="decroissant") {
      filteredGames = filteredGames.sort((a, b) => b.rating - a.rating);

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
      <select id="genre" class="text-white bg-black ml-4 text-center w-20 rounded-3xl border border-white-300 p-2">
        <option value="" selected>Tous les genres</option>
        ${genresUniques.map(e => `<option value="${e}">${e}</option>`).join('')}
      </select>
      
      <select id="plateforme" class="text-white bg-black ml-4 text-center w-[110px] rounded-3xl border border-white-300 p-2">
        <option value="" selected>Toutes plateformes</option>
        ${plateformeUniques.map(e => `<option value="${e}">${e}</option>`).join('')}
      </select>
      
      <select id="note" class="text-white bg-black ml-4 mr-3 text-center w-[90px] rounded-3xl border border-white-300 p-2">
        <option value="" selected>Toutes notes</option>
        <option value="Croissant" selected>Croissant</option>
        <option value="decroissant" selected>Decroissant</option>

      </select>
      
      <button id="filterBtn" class="bg-blue-500 text-white px-4 py-2 rounded-3xl ml-4">Filtrer</button>
    `;

    const filterBtn = document.querySelector('#filterBtn');
    filterBtn.addEventListener('click', async () => {
      const genre = document.querySelector('#genre').value;
      const plateforme = document.querySelector('#plateforme').value;
      const notes = document.querySelector('#note').value;
      
      const filteredGames = await getjeuxfilter({ genre, plateforme, notes });
      AfficherGames(filteredGames);
    });

  } catch (error) {
    console.error('Erreur dans getSelect:', error);
  }
}

function AfficherGames(games) {
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
          <h2 class="name text-white font-bold truncate">${game.name}</h2><br>
          <h2 class="name text-white font-bold truncate">${game.rating}</h2>
          <img class="w-[20px] mr-5" src="IMG/comme.png">
        </div>
      </div>
    </div>
  `).join("");

  // Réattacher les événements click après le rendu
  attachCardEvents();
}

async function getcard() {
  try {
    AfficherGames(gamesData);
    
    // Gestion de la recherche
    searchInput.addEventListener("input", e => {
      const value = e.target.value.toLowerCase();
      const cards = document.querySelectorAll(".card");

      cards.forEach(card => {
        const name = card.querySelector(".name").textContent.toLowerCase();
        if (name.includes(value)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
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