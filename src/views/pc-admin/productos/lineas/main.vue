<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>Busqueda de Productos por linea</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Seleccione MarcaVehiculo y Linea para ver los productos disponibles.</div>
        <v-divider></v-divider>
        <lineas
        @AgregarCarritoEmit="AgregarCarritoEmit"
        @RestarCarritoEmit="RestarCarritoEmit"
        :CantidadMinima="CantidadMinima"
        :CantidadMaxima="CantidadMaxima"
        :CantidadAgregada="CantidadAgregada"
        :spinnerCantidad="spinnerCantidad"
        :Carrito="Carrito"
        :Usuario="Usuario"
        :Login="Login"></lineas>
        

    </div>
</template>

<script>
import API from '../../../../api.js'
import lineas from './lineas'
// import catalogo from './catalogo.vue';
    export default {
    name: 'linea',
    props: ["CantidadMinima", "CantidadMaxima", "CantidadAgregada", "spinnerCantidad", "Carrito", "Usuario", "Login", "spinnerCantidad"],
    //Variables
    data: () => ({

    }),
    components: {
        lineas
    },

    //Variable en base a otra
    computed: {
    //    Example : function() { 
        //   return this.existe ? this.existe : this.nop
        // }
    },

    watch: {
    //   UnaVariable: function (val) { // val es el valor anterior
        // this.Ejemplo = val + ' ' + this.UnaVariable
    //   },
    },

    // funciones 
    methods: {
        // Formulario: <v-form ref="Ejemplo" lazy-validation></v-form> // :rules="EjemploRules" // EjemploRules: [(v) => !!v || "Seleccione agencia de su preferencia"] // this.$refs.formEjemplo.validate(); 
    AgregarCarritoEmit(CodigoImportadora, Cantidad, Modelo){
        console.log('2')
      this.$emit('AgregarAlCarrito', CodigoImportadora, Cantidad, Modelo);
    },

    async RestarCarritoEmit(CodigoImportadora){
        await this.$emit('RestarCarrito', CodigoImportadora)
    },
    },

    //Apis
    async created(){
        // this.dato  = await API.function()
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>