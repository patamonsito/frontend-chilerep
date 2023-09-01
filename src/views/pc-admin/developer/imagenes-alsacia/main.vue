<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>Imagenes Alsacia</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Aqui podras asignar imagenes de alsacia.</div>
        <v-divider></v-divider>
    <!-- <catalogo></catalogo> -->
        

    <v-row>
        <v-col cols="3" ></v-col>
        <v-col cols="6" 
       v-for="(item, i) in Productos"
       :key="i">
          <v-card>
                    <v-row>
                    <v-col cols="12">
                        <a :href="item.CurrentImg"
                        target="_blank">
                        <v-img
                              :src="item.CurrentImg"
                              class="align-end"
                              contain
                              height="300px" style="font-size: 0.8rem">
                            </v-img>
                        </a>
                    </v-col>
                    </v-row>
            <v-divider></v-divider>
    
    <v-list-item class="text-center">
      <v-list-item-content>
        <v-list-item-title>OEM: {{item.OEM}}</v-list-item-title>
        <v-list-item-subtitle>
          {{ item.Importadora }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{ item.Descripcion }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{ item.Extra }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    
    
    
     <v-card-actions class="white justify-center">
        <v-text-field v-model="Solicitud" placeholder="Presione Enter para enviar" v-on:keyup.enter="onEnter" ></v-text-field>
                  
        <div style="margin: 0 1rem">
            
                    <v-btn v-on:click="SolicitudSame(item.CurrentImg)" color="success"
                  >
              
                    No Cambiar
              
                  </v-btn>


                  <v-btn v-on:click="Reload(item.CodigoImportadora)" color="warning"
                  >
                    Reload
              
                  </v-btn>

        </div>
        <!-- <v-btn
                    hide-input
                    color="blue lighten-3"
                    prepend-icon="mdi-image-search"
                    fab
                    truncate-length="15"
                    @change="this.Solicitud = item.Img"
                    style="max-width: 1rem; padding-bottom: 1.1rem; margin-left: 1rem;"></v-btn> -->
                </v-card-actions>
    
          </v-card>
        </v-col>
      </v-row>
    </div>
</template>

<script>
import API from '../../../../api.js'
// import catalogo from './catalogo.vue';
    export default {
    name: 'gestionar-imagenes-alsacia',
    props: [],
    //Variables
    data: () => ({
    Productos: [],
    Solicitud: ''
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

        async onEnter(){
            if(!this.Solicitud){
                return;
            }
            await API.POST_ALSACIA_IMAGENES(this.Solicitud, this.Productos[0].CodigoImportadora);

            this.iniciar();

            this.Solicitud = '';
        },


        async Reload(CodigoImportadora){
            await API.GET_REQUEST_IMAGENES_SKIP(CodigoImportadora);

            this.iniciar();
        },

        SolicitudSame(img){
            this.Solicitud = img

            this.onEnter()
        },


        async iniciar(){
            
        let dato  = await API.GET_IMAGENES_ALSACIA();
            
            this.Productos = [{
                CurrentImg: dato.Img,
                CodigoImportadora: dato.CodigoImportadora,
                Importadora: dato.Importadora,
                OEM: typeof(dato.OEM) == 'string' ? dato.OEM : dato.OEM[0],
                Descripcion: dato.Titulo,
                Extra: dato.Descripcion,
                Img: ''
            }]
        }

    },

    //Apis
    async created(){

        this.iniciar();

    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>