

class CarritoController extends CarritoModel {

    constructor() {
        //llamar a carrito model
        //si o si hacer el super
        super()


        //averiguar que hay en el local storage
        //si se encuantra
        try {

            this.carrito = JSON.parse(localStorage.getItem('carrito')) 
            || [] 
            
        } catch (error) { //sino

            console.error('Algo ocurrio con la lectura del local storage', error)

            this.carrito = []  //inicializa en vacio el carrito
            localStorage.setItem('carrito', this.carrito)
            //se crea en el local storage vacio o no
            
        }

        
        
    }
    //metodos
    
    elProductoEstaEnElCarrito(producto) {

        /* const tengoProductos = 
        this.carrito.filter(prod => prod.id == producto.id).length
        //filter construte un array de los elem que coincidan
        //si no hay me devuelve el array vacio
        return tengoProductos */

        return this.carrito.filter(prod => prod.id == producto.id).length
    
    }
//--

    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id )
    
    }

//--

    agregarAlCarrito(producto) {

        console.log(producto)

        //verficar si el prod esta en el carrito
        if(!this.elProductoEstaEnElCarrito(producto)) {
            producto.cantidad = 1
            this.carrito.push(producto)
        }
        else {
            const productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad++
        }

        localStorage.setItem('carrito', JSON.stringify(this.carrito))
    
    }

//--

    async borrarProductoCarrito(id) {
        
        try {
            //busco el indice al id que me estan pasando
        const index = this.carrito.findIndex(prod => prod.id == id)
        //me devuelve un numero
        this.carrito.splice(index, 1)
        localStorage.setItem('carrito', JSON.stringify(this.carrito))

        await renderTablaCarrito(this.carrito)

        } catch (error) {
            console.error(error)
        }
    
    }

//--

    async enviarCarrito() {
        
        try {
            const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

        elemSectionCarrito.innerHTML = '<h2>Enviando carrito...</h2>'
        await carritoService.guardarCarritoService(this.carrito)
        this.carrito = []
        localStorage.setItem('carrito', JSON.stringify(this.carrito))
        

        elemSectionCarrito.innerHTML = '<h2>Enviando carrito..<b>OK!</b></h2>'

        } catch (error) {
            console.error(error)
        }
    }

}

const carritoController = new CarritoController()