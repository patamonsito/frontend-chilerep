<style scoped>
    @import './main.css';
</style>
<template>
    <div v-if="Usuario.Rol == 'Director' || Usuario.Rol == 'Admin' || Usuario.Rol == 'Desarrollador' || Usuario.Rol == 'Injector'">
        <h4>Importar Productos</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Los datos se deben enviar en formato Json, aqui se podra crear productos, actualizar precio y stock de las importados y eliminar productos que no esten continuados.</div>
        <v-divider></v-divider>
        <seleccionarmodelo></seleccionarmodelo>
    </div>
    <div v-else>
      <h4>No autorizado.</h4>
    </div>
</template>

<script>
import API from '../../../../api.js'
import seleccionarmodelo from './seleccionarmodelo.vue';
export default {
    name: 'dev-agregar-productos',
    props: ["Usuario", "Login"],
    //Variables
    data: () => ({

    }),
    components: {
        seleccionarmodelo,
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