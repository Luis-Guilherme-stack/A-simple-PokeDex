const id = document.querySelector('.id')
const namePoke = document.querySelector('.name')
const imgPoke = document.querySelector('.pokemon-img')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const prevBtn = document.querySelector('.button-prev')
const nextBtn = document.querySelector('.button-foward')

const getPokemon = async (pokemon) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        if(response.ok){
            const data = await response.json()
            return {data, status: response.status}
        } else {
            return {data: null, status: response.status}
        }
    }

let lastPokemon = 0

const renderPokemon = async (pokemon) => {
    const {data, status} = await getPokemon(pokemon)
    if(status === 200){
        lastPokemon = data.id
        id.innerHTML = `${data.id} - `
        namePoke.innerHTML = data.name
        imgPoke.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    } else {
        imgPoke.src = ''
        id.innerHTML = `404 - `
        namePoke.innerHTML = 'Not Found'
    }
    
}


form.addEventListener('submit', (event) =>{
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
    input.value = ''
})


prevBtn.addEventListener('click', () => {
    if(lastPokemon >= 1){
    lastPokemon--
    renderPokemon(lastPokemon)} else{
        imgPoke.src = ''
    }
})

nextBtn.addEventListener('click', () => {
    lastPokemon++
    renderPokemon(lastPokemon)
})