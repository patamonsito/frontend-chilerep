<template>
    <div>
    <h6>Seleccione modelo.</h6>
        <v-row>
          <v-col cols="4">
            <v-autocomplete
              v-model="MarcaSeleccionada"
              :items="Marcas"
              menu-props="auto"
              label="Seleccione Marca de Vehiculo"
              hide-details
              prepend-icon="mdi-car"
              single-line
              item-text="Descripcion"
              return-object
              @change="marcaSearch"
            ></v-autocomplete>
          </v-col>
          <v-col cols="8">
            <v-autocomplete
              v-model="ModeloSeleccionado"
              :items="Modelos"
              menu-props="auto"
              label="Seleccione Vehiculo"
              hide-details
              prepend-icon="mdi-car"
              single-line
              item-text="formatModelo"
              return-object
              @change="modelSearch()"
            ></v-autocomplete>
          </v-col>
        </v-row>


    <v-row>
      <v-col v-if="imgMarca != '' && Enviando == false" cols="4" class="pa-0 ma-0 center aling-center" style="text-align: -webkit-center;">
        <v-img
          max-width="100"
          :src="'http://143.198.165.86:3000/marcavehiculo/' + this.imgMarca"
        ></v-img>
      </v-col>
      <v-col v-if="imgModelo != '' && Enviando == false" cols="8" class="pa-0 ma-0 center aling-center" style="text-align: -webkit-center;">
        <v-img
          max-width="100"
          :src="'http://143.198.165.86:3000/vehiculo/'+ this.imgModelo + '.png'"
        ></v-img>
      </v-col>
    </v-row>


    <div class="center" v-if="Enviando == true">
      <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
      <p>Cargando, por favor espere...</p>
    </div>


    <div v-if="Modelo != '' && Enviando == false" class="subtitle-1 pt-2 pb-2 text--secondary">

    <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Importadora
          </th>
          <th class="text-center">
            Productos
          </th>
          <th class="text-center">
            Disponibles
          </th>
          <th class="text-center">
            Agotados
          </th>
          <th class="text-center">
            Ultima Actualización
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Refax</td>
          <td class="text-center">{{ RefaxCount }}</td>
          <td class="text-center">{{ RefaxCountD }}</td>
          <td class="text-center">{{ RefaxCountA }}</td>
          <td class="text-center">{{ LastUpdateRefax == 'NUNCA' ? 'NUNCA' : LastUpdateRefax.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr>
        <tr>
          <td>Alsacia</td>
          <td class="text-center">{{ AlsaciaCount }}</td>
          <td class="text-center">{{ AlsaciaCountD }}</td>
          <td class="text-center">{{ AlsaciaCountA }}</td>
          <td class="text-center">{{ LastUpdateAlsacia == 'NUNCA' ? 'NUNCA' : LastUpdateAlsacia.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr> 
        <tr>
          <td>Bicimoto</td>
          <td class="text-center">{{ BicimotoCount }}</td>
          <td class="text-center">{{ BicimotoCountD }}</td>
          <td class="text-center">{{ BicimotoCountA }}</td>
          <td class="text-center">{{ LastUpdateBicimoto == 'NUNCA' ? 'NUNCA' : LastUpdateBicimoto.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr>
        <tr>
          <td>Mannheim</td>
          <td class="text-center">{{ MannheimCount }}</td>
          <td class="text-center">{{ MannheimCountD }}</td>
          <td class="text-center">{{ MannheimCountA }}</td>
          <td class="text-center">{{ LastUpdateMannheim == 'NUNCA' ? 'NUNCA' : LastUpdateMannheim.slice(0, 10).split('-').reverse().join('/') }}</td>
        </tr>
        <tr>
          <td><b>Total</b></td>
          <td class="text-center">{{ ProductosCount + ProductosCountA}}</td>
          <td class="text-center">{{ ProductosCount }}</td>
          <td class="text-center">{{ ProductosCountA }}</td>
          <td class="text-center">-</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>

    <v-divider></v-divider>

  <v-row v-if="Modelo != '' && Enviando == false">
    <v-col cols="4" 
   v-for="(item, i) in Productos"
   :key="i">
      <v-card>
                <v-row>
                <v-col cols="6">
                    <a :href="item.CurrentImg"
                    target="_blank">
                    <v-img
                          :src="item.CurrentImg"
                          class="align-end"
                          contain
                          height="150px" style="font-size: 0.8rem">
                        </v-img>
                    </a>
                </v-col>
                <v-col cols="6">
                    <a :href='"https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + item.CodigoImportadora + "/" + item.CodigoImportadora + "A.jpg"'
                    target="_blank"
                    v-if="item.Importadora == 'Refax'">
                    <v-img
                      :src='"https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + item.CodigoImportadora + "/" + item.CodigoImportadora + "A.jpg"'
                      class="align-end"
                      contain
                      height="150px" style="font-size: 0.8rem"
                      >
                      
                    </v-img>
                    </a>
                    <a :href="item.Img"
                    target="_blank"
                    v-if="item.Importadora == 'Alsacia'">
                    <v-img
                      :src="item.Img"
                      class="align-end"
                      contain
                      height="150px" style="font-size: 0.8rem" >
                      
                    </v-img>
                    </a>
                    <a :href="item.Img"
                    target="_blank"
                    v-if="item.Importadora == 'Bicimoto'">
                    <v-img
                      :src="item.Img"
                      class="align-end"
                      contain
                      height="150px" style="font-size: 0.8rem" >
                    </v-img>
                    </a>
                    <a :href='"http://200.73.35.244:8080/webclient/images/" + item.OEM + ".jpg"'
                    target="_blank"
                    v-if="item.Importadora == 'Mannheim'">
                    <v-img
                      :src='"http://200.73.35.244:8080/webclient/images/" + item.OEM + ".jpg"'
                      class="align-end"
                      contain
                      height="150px" style="font-size: 0.8rem" >
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
  </v-list-item-content>
</v-list-item>



 <v-card-actions class="white justify-center">
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                @click="imgController(item.CodigoImportadora, item.OEM, item.Importadora, social.action, item.Img)"
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
              <v-file-input
                v-model="file"
                hide-input
                color="blue lighten-3"
                prepend-icon="mdi-image-search"
                fab
                :rules="rulesImg"
                accept="image/jpg"
                truncate-length="15"
                @change="uploadImg(item.CodigoImportadora, item.Importadora)"
                style="max-width: 1rem; padding-bottom: 1.1rem; margin-left: 1rem;"></v-file-input>
            </v-card-actions>

      </v-card>
    </v-col>
  </v-row>
  


    </div>
</template>

<script>
import API from '../../../../api.js';
    export default {
    name: 'galeria',
    props: [],
    //Variables
    data: () => ({
        imgUpdate: 0,
        file: null,
        rulesImg: [
        value => !value || value.size < 1000000 || 'La imagen no puede ser mayor a 1MB!',
      ],
        imgMarca: '',
        MarcaSeleccionada: '',
        ModeloSeleccionado: '',
        Marcas: [],
        Modelos: [],
        Productos: [],
        ProductosCount: 0,
        ProductosCountA: 0,
        AlsaciaCount: 0,
        AlsaciaCountD: 0,
        AlsaciaCountA: 0,
        RefaxCount: 0,
        RefaxCountD: 0,
        RefaxCountA: 0,
        BicimotoCount: 0,
        BicimotoCountD: 0,
        BicimotoCountA: 0,
        MannheimCount: 0,
        MannheimCountD: 0,
        MannheimCountA: 0,
        imgModelo: '',
        CodigoProducto: '',
        Modelo: '',
        AñoI: 0,
        AñoT: '',
        MarcaVehiculo: '',
        CodigoModelo: '',
        refaxUrl: '',
        alsaciaUrl: '',
        bicimotoUrl: '',
        LastUpdateRefax: '',
        LastUpdateAlsacia: '',
        LastUpdateBicimoto: '',
        LastUpdateMannheim: '',
        Enviando: false,
        socials: [
        {
          icon: 'mdi-image-plus',
          action: 'asignar',
          color: 'indigo',
        },
        {
          icon: 'mdi-image-remove',
          action: 'eliminar',
          color: 'red',
        },
      ],
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
    async marcaSearch(){
      this.imgMarca = this.MarcaSeleccionada.Img;

      this.Modelos = await API.GET_MODELSBYMARCA(this.MarcaSeleccionada.CodigoMarcaVehiculo);

      this.Modelos.map(e => {
        e.formatModelo = e.Modelo + ' ' + e.Motor + ' ' + e.AñoI + ' - ' + e.AñoT;
      })

    },

    async uploadImg(CodigoImportadora, Importadora){
      if(this.file.size < 1000000 && this.file.name.split('.')[1] == 'jpg' || this.file.size < 1000000 && this.file.name.split('.')[1] == 'jpeg'){

        var Datos = await API.UPLOAD_IMG_REPUESTO(CodigoImportadora, this.file)
        
        this.imgUpdate = this.imgUpdate + 1; 

       this.Productos = this.Productos = this.Productos.map(e => {
        if(e.CodigoImportadora == CodigoImportadora){
          e.CurrentImg = 'http://143.198.165.86:3000/repuestos/' + e.CodigoImportadora + '.jpg?version=' + this.imgUpdate;
        }
        return e;
      })

      this.file = null;

      }else{
        alert('formato invalido, asegurese de enviar imagen en jpg y que pese menos de 1MB')
      }
    },

    async modelSearch() {

      this.Enviando = true;
      
      var Datos = await API.POST_COUNT_PRODUCT_BY_MODELS(
        this.ModeloSeleccionado.CodigoModelo
      );
      //Aqui lo que se quiere hacer al seleccionar el modelo, Json respuesta: { AlsaciaCount, RefaxCount, BicimotoCount, MannheimCount, Modelo, ProductosList }
      //count
      this.ProductosCount = Datos.ProductosCount;
      this.ProductosCountA = Datos.ProductosCountA;
      this.AlsaciaCount = Datos.AlsaciaCount;
      this.AlsaciaCountD = Datos.AlsaciaCountD;
      this.AlsaciaCountA = Datos.AlsaciaCountA;
      this.RefaxCount = Datos.RefaxCount;
      this.RefaxCountD = Datos.RefaxCountD;
      this.RefaxCountA = Datos.RefaxCountA;
      this.BicimotoCount = Datos.BicimotoCount;
      this.BicimotoCountD = Datos.BicimotoCountD;
      this.BicimotoCountA = Datos.BicimotoCountA;
      this.MannheimCount = Datos.MannheimCount;
      this.MannheimCountD = Datos.MannheimCountD;
      this.MannheimCountA = Datos.MannheimCountA;
      //print dates
      this.imgModelo = Datos.Modelo.Img;
      this.CodigoProducto = Datos.Modelo.CodigoProducto;
      this.Modelo = Datos.Modelo.Modelo + " " + Datos.Modelo.Motor;
      this.AñoI = Datos.Modelo.AñoI;
      this.AñoT = Datos.Modelo.AñoT;
      this.MarcaVehiculo = Datos.Modelo.MarcaVehiculo;
      this.CodigoModelo = Datos.Modelo.CodigoModelo;
      this.refaxUrl = Datos.Modelo.Url;
      this.alsaciaUrl = Datos.Modelo.UrlAlsacia;
      this.bicimotoUrl = Datos.Modelo.UrlBicimoto;
      this.LastUpdateRefax = Datos.Modelo.LastUpdateRefax ||'NUNCA';
      this.LastUpdateAlsacia = Datos.Modelo.LastUpdateAlsacia ||'NUNCA';
      this.LastUpdateBicimoto = Datos.Modelo.LastUpdateBicimoto ||'NUNCA';
      this.LastUpdateMannheim = Datos.Modelo.LastUpdateMannheim ||'NUNCA';
      //Productos

      Datos.ProductosList.map(e => {
        e.CurrentImg = 'http://143.198.165.86:3000/repuestos/' + e.CurrentImg + '.jpg';
      })

      this.Productos = Datos.ProductosList;

      this.Enviando = false;

    },

    async imgController(CodigoImportadora, OEM, Importadora, Accion, Img){

      var response = await API.IMG_CONTROLLER(
        CodigoImportadora, OEM, Importadora, Accion, Img
      );
      

      if(Accion == 'asignar'){
      this.Productos = this.Productos = this.Productos.map(e => {
        if(e.CodigoImportadora == CodigoImportadora){
          if(e.Importadora == 'Refax'){
            e.CurrentImg = "https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + e.CodigoImportadora + "/" + e.CodigoImportadora + "A.jpg";
          }else if(e.Importadora == 'Mannheim'){
            e.CurrentImg = `http://200.73.35.244:8080/webclient/images/${ e.OEM }.jpg?version=' + imgUpdate`;
          }else if(e.Importadora == 'Alsacia' || e.Importadora == 'Bicimoto'){
            e.CurrentImg = Img;
          }
        }
        return e;
      })

      }else if(Accion == 'eliminar'){
      this.Productos = this.Productos.map(e => {
        if(e.CodigoImportadora == CodigoImportadora){
          e.CurrentImg = 'http://143.198.165.86:3000/repuestos/default.jpg';
        }
        return e;
      })
      }
    }
    },

    //Apis
    async created(){
        this.Marcas = await API.GET_MARCAS();
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>