const fetchBtn = document.getElementById('fetch-btn');
const randomBtn = document.getElementById('random-btn');
const input = document.getElementById('input');
const content = document.getElementById('content');

let select = document.getElementById('select-minion')

fetchBtn.addEventListener('click',  fetchData)

async function fetchData(e) {
    e.preventDefault();

    try {

        let url = ('https://ffxivcollect.com/api/minions?name_en_cont=' + input.value)

        if (select.value == "1-Obedient") {
            url = ('https://ffxivcollect.com/api/minions?behavior_id_eq=1' + '&name_en_cont=' + input.value)
        } else if (select.value == "2-Independent") {
            url = ('https://ffxivcollect.com/api/minions?behavior_id_eq=2' + '&name_en_cont=' + input.value)
        } else if (select.value == "3-Stationary") {
            url = ('https://ffxivcollect.com/api/minions?behavior_id_eq=3' + '&name_en_cont=' + input.value)
        }

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('oops');
        }

        const data = await response.json();

        console.log(data)

        content.innerHTML = '';

        for(var i = 0, l = data.results.length; i < l; i++) {
            content.innerHTML += `
            <div id="minion-entry">
            <img src="${data.results[i].image}">
            <h2>${data.results[i].name}</h2>
            <p>${data.results[i].description}</p>
            <i>${data.results[i].enhanced_description}</i>
            </div>
            `
        }

    } catch (error) {
        console.log(error)
    }

}

randomBtn.addEventListener('click', fetchRandom)

function getRandom(min, max) {
    return Math.random() * (433 - 1) + 1;
  }

async function fetchRandom(e) {
    e.preventDefault();

    try {
        const response = await fetch('https://ffxivcollect.com/api/minions/' + getRandom())

        if (!response.ok) {
            throw new Error('oops');
        }

        const data = await response.json();

        content.innerHTML = `
        <div id="minion-entry">
        <img src="${data.image}">
        <h2>${data.name}</h2>
        <p>${data.description}</p>
        <i>${data.enhanced_description}</i>
        </div>
        `


    } catch (error) {
        console.log(error)
    }
}

