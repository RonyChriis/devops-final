// Base de datos de productos - Comida Criolla Peruana
const productos = [
  
    {
        id: 2,
        nombre: "Lomo Saltado",
        descripcion: "Tiernos trozos de lomo de res salteados con cebolla, tomate, ajo y huacatay. Servido con arroz y papas.",
        precio: 38.00,
        imagen: "https://images.unsplash.com/photo-1565299624946-b28974268df0?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        nombre: "Aji de Gallina",
        descripcion: "Pollo desmenuzado en salsa cremosa de ají amarillo con leche y queso. Clásico de la mesa peruana.",
        precio: 28.50,
        imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
    },
  
  
    {
        id: 7,
        nombre: "Sudado de Pescado",
        descripcion: "Filete de pescado cocido al vapor con tomate, cebolla, cilantro y patatas. Muy sabroso y fresco.",
        precio: 30.00,
        imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        nombre: "Rocoto Relleno",
        descripcion: "Rocoto fresco relleno de carnes, pasas y aceitunas. Gratinado con queso y servido en salsa de rocoto.",
        precio: 26.00,
        imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        nombre: "Tallarín Negro",
        descripcion: "Tallarín con tinta de calamar, camarones, almejas y un toque de ají. Sabor marino inconfundible.",
        precio: 34.50,
        imagen: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
    },
 
   
];

// Carrito de compras
let carrito = [];

// Función para cargar y mostrar productos
function cargarProductos() {
    const productosGrid = document.getElementById('productosGrid');
    productosGrid.innerHTML = '';

    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        
        productoCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <div class="producto-contenido">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-descripcion">${producto.descripcion}</p>
                <p class="producto-precio">S/. ${producto.precio.toFixed(2)}</p>
                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al Carrito
                </button>
            </div>
        `;

        productosGrid.appendChild(productoCard);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    
    if (producto) {
        // Verificar si el producto ya está en el carrito
        const itemExistente = carrito.find(item => item.id === productoId);
        
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({
                ...producto,
                cantidad: 1
            });
        }

        // Actualizar el contador del carrito
        actualizarContadorCarrito();

        // Mostrar notificación visual
        mostrarNotificacion(`${producto.nombre} agregado al carrito`);
    }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    document.getElementById('carritoCount').textContent = totalItems;
    
    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    notificacion.textContent = mensaje;

    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notificacion);

    // Remover notificación después de 2 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 2000);
}

// Función para restaurar carrito desde localStorage
function restaurarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
}

// Función para ver el carrito (puede expandirse)
function verCarrito() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    let resumen = 'CARRITO DE COMPRAS\n\n';
    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        resumen += `${index + 1}. ${item.nombre} (${item.cantidad}x) - S/. ${subtotal.toFixed(2)}\n`;
    });

    resumen += `\n-------------------\nTotal: S/. ${total.toFixed(2)}`;
    alert(resumen);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    restaurarCarrito();
    cargarProductos();

    // Agregar click al icono del carrito para ver el resumen
    const carritoContainer = document.querySelector('.carrito-container');
    if (carritoContainer) {
        carritoContainer.addEventListener('click', verCarrito);
    }
});
