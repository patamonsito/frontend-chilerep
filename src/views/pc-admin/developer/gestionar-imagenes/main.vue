<style scoped>
    @import './main.css';
</style>
<template>
    <div v-if="Usuario.Rol == 'Director' || Usuario.Rol == 'Admin' || Usuario.Rol == 'Diseñador' || Usuario.Rol == 'Desarrollador'">
        <h4>Gestionar Imagenes</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Aqui podras actualizar las imagenes de los productos.</div>
        <v-divider></v-divider>
    <galeria></galeria>
    </div>
    <div v-else>
      <h4>No autorizado.</h4>
    </div>
</template>

<script>
import API from '../../../../api.js'
import galeria from './galeria.vue';
    export default {
    name: 'gestionar-imagenes',
    props: ["Usuario", "Login"],
    //Variables
    data: () => ({

    }),
    components: {
      galeria
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