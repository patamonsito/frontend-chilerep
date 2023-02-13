import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/dashboard/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/dashboard/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/dashboard/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/dev/importar-productos',
    name: 'dev-agregar-repuestos',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/developer/importar-productos/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/developer/importar-productos/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/developer/importar-productos/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/dev/gestionar-imagenes',
    name: 'gestionar-imagenes',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/developer/gestionar-imagenes/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/developer/gestionar-imagenes/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/developer/gestionar-imagenes/main.vue') : console.log('Pantalla no compatible'))
  }, 
  {
    path: '/productos/catalogo',
    name: 'catalogo',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/productos/catalogo/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/productos/catalogo/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/productos/catalogo/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/productos/marca',
    name: 'marca',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/productos/marca/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/productos/marca/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/productos/marca/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/productos/buscador',
    name: 'buscador',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/productos/buscador/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/productos/buscador/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/productos/buscador/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/productos/lineas',
    name: 'line',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/productos/lineas/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/productos/lineas/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/productos/lineas/main.vue') : console.log('Pantalla no compatible'))
  },    
  {
    path: '/bodega/gestionar-bodegas',
    name: 'gestionar-bodegas',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/bodega/gestionar-bodegas/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/bodega/gestionar-bodegas/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/bodega/gestionar-bodegas/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/bodega/ingresar-mercaderia',
    name: 'ingresar-mercaderia',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/bodega/ingresar-mercaderia/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/bodega/ingresar-mercaderia/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/bodega/ingresar-mercaderia/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/ventas/libro-venta',
    name: 'libro-venta',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/ventas/libro-venta/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/ventas/libro-venta/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/ventas/libro-venta/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/ventas/guia-despacho',
    name: 'guia-despacho',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/ventas/guia-despacho/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/ventas/guia-despacho/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/ventas/guia-despacho/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/pedidos/gestionar-pedidos',
    name: 'gestionar-pedidos',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/pedidos/gestionar-pedidos/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/pedidos/gestionar-pedidos/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/pedidos/gestionar-pedidos/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/ecommerce/ventas-ecommerce',
    name: 'ventas-ecommerce',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/ecommerce/ventas-ecommerce/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/ecommerce/ventas-ecommerce/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/ecommerce/ventas-ecommerce/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/ecommerce/seguimiento',
    name: 'seguimiento',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/ecommerce/seguimiento/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/ecommerce/seguimiento/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/ecommerce/seguimiento/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/soporte/crear-ticket',
    name: 'crear-ticket',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/soporte/crear-ticket/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/soporte/crear-ticket/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/soporte/crear-ticket/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/soporte/mis-ticket',
    name: 'mis-ticket',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/soporte/mis-ticket/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/soporte/mis-ticket/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/soporte/mis-ticket/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/configuracion/mis-datos',
    name: 'mis-datos',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/configuracion/mis-datos/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/configuracion/mis-datos/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/configuracion/mis-datos/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/estadisticas/rentabilidad',
    name: 'rentabilidad',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/estadisticas/rentabilidad/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/estadisticas/rentabilidad/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/estadisticas/rentabilidad/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/estadisticas/productos',
    name: 'productos',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/estadisticas/productos/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/estadisticas/productos/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/estadisticas/productos/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/estadisticas/ecommerce',
    name: 'ecommerce',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/estadisticas/ecommerce/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/estadisticas/ecommerce/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/estadisticas/ecommerce/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/estadisticas/bodega',
    name: 'bodega',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/estadisticas/bodega/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/estadisticas/bodega/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/estadisticas/bodega/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/estadisticas/vendedores',
    name: 'vendedores',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/estadisticas/vendedores/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/estadisticas/vendedores/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/estadisticas/vendedores/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/clientes/gestionar-clientes',
    name: 'clientes',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/clientes/gestionar-clientes/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/clientes/gestionar-clientes/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/clientes/gestionar-clientes/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/proveedores/gestionar-proveedores',
    name: 'proveedores',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/proveedores/gestionar-proveedores/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/proveedores/gestionar-proveedores/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/proveedores/gestionar-proveedores/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/configuracion/gestionar-sucursales',
    name: 'sucursales',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/configuracion/gestionar-sucursales/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/configuracion/gestionar-sucursales/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/configuracion/gestionar-sucursales/main.vue') : console.log('Pantalla no compatible'))
  },
  {
    path: '/facebook/marketplace',
    name: 'marketplace',
    component: () => (window.matchMedia("(max-width: 600px)").matches == true ? import('../views/pc-admin/facebook/marketplace/main.vue') : window.matchMedia("(max-width: 1264px)").matches == true ? import('../views/pc-admin/facebook/marketplace/main.vue') : window.matchMedia("(max-width: 9999px)").matches == true ? import('../views/pc-admin/facebook/marketplace/main.vue') : console.log('Pantalla no compatible'))
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
