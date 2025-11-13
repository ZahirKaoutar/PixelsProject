const filterselect= document.querySelector('.filter') 
 const Cards=document.querySelector('.cards')
 const searchInput = document.querySelector("input[type='search']");
const platformIcons = {
  pc: "IMG/pc.png",
  playstation: "IMG/playstation.png",
  xbox: "IMG/xbox.png",
  mac: "IMG/mac.png",
  linux: "IMG/linux.png"
};

 async function  getSelect()
 {
    try {
        const datagame=await fetch("https://debuggers-games-api.duckdns.org/api/games?page=1&limit=20")
        const reponse =await datagame.json()
        const res1=reponse.results

        const allgenres = res1.flatMap(elem => elem.genres.map(g => g.name));
        const genresUniques = [...new Set(allgenres)];

        const allplateformes = res1.flatMap(elem => elem.parent_platforms.map(platf => platf.platform.name));
        const palteformeUniques = [...new Set(allplateformes)];
        
        filterselect.innerHTML+=`<select  class="text-white  bg-black   ml-4 text-center w-20 rounded-3xl border border-white-300 p-2">  <option disabled selected"> genre</option>${genresUniques.map(e=>`<option value=${e}>${e}</option>`)}</select>`
        filterselect.innerHTML+=`<select  class="text-white bg-black  ml-4 text-center w-[90px] rounded-3xl border border-white-300 p-2">  <option disabled selected> note</option>${palteformeUniques.map(e=>`<option value=${e}>${e}</option>`)}</select>`
        filterselect.innerHTML+=`<select  class="text-white    bg-black ml-4 mr-3  text-center w-[110px] rounded-3xl border border-white-300 p-2">  <option disabled selected > plateforme</option>${palteformeUniques.map(e=>`<option value=${e}>${e}</option>`)}</select>`
    } catch (error) {
        console.error('Erreur dans getSelect:', error);
    }
 }
 getSelect()


async function getcard(){
    try {
        const datagame=await fetch("https://debuggers-games-api.duckdns.org/api/games?page=1&limit=20")
        const reponse =await datagame.json()
        const res1=reponse.results

        Cards.innerHTML += res1.map(game => `
            <div class='card    m-auto  mt-5 rounded-3xl  w-[300px] h-[300px] '>
            <div   data-gameid="${game.id}" class="card-img  ">
            <img  class="rounded-t-2xl "src="${game.background_image}">
            </div>
            <div class="card-text pl-2  bg-red-600 flex flex-col justify-between  text-white rounded-b-lg h-[30%]">


                <div class="img-platform flex  ">
                
                ${game.parent_platforms.map((p)=> {
                    const slug = p.platform.slug; 
                    const icon = platformIcons[slug];
                    return icon ? `<img src="${icon}" alt="${slug}" class="w-[20px] inline-block ml-2px  mx-1">` : "";
                }).join(" ")}
                </div>
                <div class="namecoeur mb-[10px] flex justify-between  gap-4">
                    <h2 class="name text-white font-bold truncate ">${game.name}</h2>
                    <img  class="w-[20px] mr-5"   src="IMG/comme.png">
                </div>
            </div>
            </div>
        `).join(""); 
        







  searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const name = card.querySelector(".name").textContent.toLowerCase();
    

    if (name.includes(value) ) {
      card.style.display = "block"; // afficher
    } else {
      card.style.display = "none"; // cacher
    }
  });
});
const cardss=document.querySelectorAll(".card-img ")
 cardss.forEach(c => {
        c.addEventListener('click',(e)=>{
        const gameid =  e.currentTarget.dataset.gameid;
        
        window.location.href = `detaille.html?game.id=${gameid}`;  })})

        

    } catch (error) {
        console.error('Erreur dans getcard:', error);
    }
}
 

getcard();











