const search = document.querySelector('#search');
const number = document.querySelector('#number');
const pokemonImage = document.querySelector('#pokemon-image');
const type = document.querySelectorAll('type');
const types = document.querySelector('#types');
const typeColors = {
    "water":[100, 147, 235],
    "rock":[182,158,49],
    "ghost":[112,85,155],
    "steel":[100,147,235],
    "grass":[116, 203,  72],
    "psychic":[251,  85, 132],
    "ice":[154, 214, 223],
    "dark":[117,  87,  76],
    "fairy":[230, 158, 172],
    "normal":[170, 166, 127],
    "fighting":[193,  34,  57],
    "flying":[168, 145, 236],
    "poison":[164,  62, 158],
    "ground":[222, 193, 107],
    "bug":[167, 183,  35],
    "fire":[245, 125,  49],
    "electric":[249, 207,  48],
    "dragon":[112,  55, 255]
};
const statNumber = document.querySelectorAll('.stat-number');
const barInner = document.querySelectorAll('.bar-inner');
const barOuter = document.querySelectorAll('.bar-outer');
const statDesc = document.querySelectorAll('.stat-desc');
const baseStats = document.querySelector('#base_stats');
const pokedex = document.querySelector('#pokedex');

const fetchApi = async (pkmnName) => {
    //putting together the name of a pokemon that is formed by more than 1 word
    pkmnNameApi = pkmnName.split(' ').join('-');

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pkmnNameApi);

    if (response.status === 200){
        const pkmnData = await response.json();
        return pkmnData;
    }

    return false;
}

search.addEventListener('change', async (event) => {
    const pkmnData = await fetchApi(event.target.value);
    console.log(pkmnData);

    // ---finding the main type/color of the pokemon
    const mainColor = typeColors[pkmnData.types[0].type.name];
    baseStats.style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    pokedex.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;

    // ---modify the pokemon number in the top bar---
    number.innerHTML = '#' + pkmnData.id.toString().padStart(3,'0');

    // ---change the pokemon image---
    pokemonImage.src = pkmnData.sprites.other.home.front_default;

    // ---change pokemon type---

    // ---first clear oldtype
    types.innerHTML = "";
    // ---then apply the new ones---
    pkmnData.types.forEach((t) =>{
        let newType = document.createElement('span');
        let color   = typeColors[t.type.name];
        newType.innerHTML = t.type.name;
        newType.classList.add('type');
        newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        types.appendChild(newType);
    });

    // ---change the pokemon stats
    pkmnData.stats.forEach((s, i) => {
        statNumber[i].innerHTML = s.base_stat.toString().padStart(3,'0');
        barInner[i].style.width = `${s.base_stat}%`;
        barInner[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        barOuter[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;
        statDesc[i].style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;

    });
});