<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>Buscar productos en importadora</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Aqui buscar los productos disponibles en la importadora, usted podra usar el buscador para realizar una busqueda exacta.</div>
        <v-divider></v-divider>

        <v-row>
            <v-col cols="10">
                <v-text-field :rules="rules" v-model="Solicitud" placeholder="Amortiguador Chevrolet Sail 1.4"></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-btn color="info" @click="Buscar()">Buscar</v-btn>
            </v-col>
        </v-row>
        
    <div v-if="Refax == '' && Alsacia == '' && Loader == false"> 
        
        <p class="center">Realice una busqueda.</p>

    </div>

    <div v-else-if="Loader == true">
        <div class="center">
            <img src="http://localhost:3000/etc/loader.gif" alt="Cargando...">
        </div>
    </div>

    <div v-else>
    <v-tabs
      v-model="tab"
      background-color="black"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#tab-1">
        Refax
      </v-tab>

      <v-tab href="#tab-2">
        Alsacia
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
            <v-card-text v-if="i == 1">
                <table v-html="Refax"></table>
            </v-card-text>
            
            <v-card-text v-if="i == 2">
                <table v-html="Alsacia"></table>
            </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </div>


    <!-- <catalogo></catalogo> -->
        

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
        Loader: true,
        Refax: '',
        Alsacia: '',
        Solicitud: '',
        rules: [
        value => !!value || 'Este campo es requirido para buscar.',
        value => (value || '').length <= 100 || 'Maximo 100 letras',
      ],
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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


        async Buscar(){
            this.Loader = true;
            let Datos = await API.POST_API_IMPORTADORA(this.Solicitud)

            this.Refax = Datos.Refax.replaceAll('style', 'stylo').replaceAll('<th stylo="width: 40px;">Comprar</th>', '<th style="display: none;">Comprar</th>')
            this.Alsacia = Datos.Alsacia.replaceAll('style', 'stylo').replaceAll('<th stylo="width: 40px;" scope="col"></th>', '<th style="display:none;" scope="col"></th>').replaceAll('button type="submit"', 'button style="display: none;"').replaceAll('stylo="width: 40px;"', 'style="display: none;"').replaceAll('class="tobuy"', 'style="display: none;"').replaceAll('span stylo="font-size: 10px;"', 'span style="display: none;"');

            this.Loader = false;

        }

    },

    //Apis
    async created(){
        this.Loader = false;
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>