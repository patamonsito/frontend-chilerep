<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>Buscar Factura</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Aqui podras ver todos los productos disponibles.</div>
        <v-divider></v-divider>
    <!-- <catalogo></catalogo> -->
    
    <object data="" type="" style="width:100%; height:calc(100vh - 3rem)"></object>
    </div>
</template>

<script>
import API from '../../../../api.js'
// import catalogo from './catalogo.vue';
    export default {
    name: 'buscar-factura',
    props: [],
    //Variables
    data: () => ({

    }),
    components: {
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
        fetch("http://localhost:3000/api/certificado/Letter/62744a2e357b3a34c6458d2b", {method:'GET',  headers: {'Content-Type': 'application/json'} })
            .then( (r) => r.json())
            .then( d => {
                
                let obj = document.querySelector("object");
                let link = document.querySelector("a");
                
                obj.setAttribute("data", "data:application/pdf;base64," + d.data.base64)
                link.setAttribute("href", "data:application/pdf;base64," + d.data.base64);
        })
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>