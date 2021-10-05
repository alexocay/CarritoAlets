document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
})
const fetchData = async()=>{
    try{
        const res = await fetch('api.json')
        const data = await res.json()
        //console.log(data)
        pintarProductos(data)
        detectarBotones(data)
    }catch(error){
        console.log(error)
    }
}

const contenedorProductos = document.querySelector('#contenedor-productos')
const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content;
    const fragment = document.createDocumentFragment();
    //console.log(template);
    data.forEach(producto => {
        //console.log(producto)
        template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        template.querySelector('h5').textContent = producto.title
        template.querySelector('p span').textContent = producto.precio
        template.querySelector('button').dataset.id = producto.id

    const clone = template.cloneNode(true); //clona todo lo construido
    fragment.appendChild(clone)
    })
    contenedorProductos.appendChild(fragment)
}

let carrito = {}


const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button')

    botones.forEach(btn => {
        btn.addEventListener('click', ()=>{
            console.log(btn.dataset.id)
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            producto.cantidad = 1
            if(carrito.hasOwnProperty(producto.id)){
                producto.cantidad ++;
            }

            carrito[producto.id]={...producto}
            console.log(carrito)
        })
    })
}

