<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>Gestionar Bodegas</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Aqui podras ver todas las bodegas y sus caracteristicas, tambien podras crear, actualizar y eliminarlas.</div>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12" class="mt-2 mb-2" style="text-align-last: right;">
              <v-btn color="primary" @click="ModalBodega()">
                  <v-icon small dark>mdi-package</v-icon> Crear Bodega
              </v-btn>
            </v-col>
        </v-row>

                <v-alert v-if="Alert != ''" class="mt-2"
                     dense
                     outlined
                     type="error"
                >
                  <strong>{{ Alert }}</strong>
                </v-alert>



  <v-simple-table v-if="Bodegas.length > 0">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Sucursal
          </th>
          <th class="text-left">
            Bodega
          </th>
          <th class="text-left">
            Filas
          </th>
          <th class="text-left">
            Columnas
          </th>
          <th class="text-left">
            Niveles
          </th>
          <th class="text-left">
            Creación
          </th>
          <th class="text-left">
            Actualización
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Bodega in Bodegas"
          :key="Bodega._id"
        >
          <td>{{ Bodega.Sucursal }}</td>
          <td>{{ Bodega.Bodega }}</td>
          <td>{{ Bodega.FilaDesde }} - {{ Bodega.FilaHasta }}</td>
          <td>{{ Bodega.ColumnaDesde }} - {{ Bodega.ColumnaHasta }}</td>
          <td>{{ Bodega.NivelDesde }} - {{ Bodega.NivelHasta }}</td>
          <td>{{ Bodega.createdAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/') }}</td>
          <td>{{ Bodega.updatedAt == Bodega.createdAt ? 'NUNCA' : Bodega.updatedAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/') }}</td>
          <td>
              <v-btn color="primary" class="mr-3" @click="GetBodega(Bodega._id)">
                  <v-icon small dark>mdi-archive-edit</v-icon>
              </v-btn>
              <v-btn color="error" @click="DeleteBodega(Bodega.Bodega)">
                  <v-icon small dark>mdi-archive-remove</v-icon>
              </v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  <v-simple-table v-else>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Bodega
          </th>
          <th class="text-left">
            Filas
          </th>
          <th class="text-left">
            Columnas
          </th>
          <th class="text-left">
            Niveles
          </th>
          <th class="text-left">
            Creación
          </th>
          <th class="text-left">
            Actualización
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="7" class="text-center">No existen bodegas.</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>


<v-form ref="formbodega" lazy-validation>
  <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
        v-model="dialogCrearBodega">
          <template>
            <v-card>
              <v-card-text class="text-center">
                <v-alert
                  shaped
                  dense
                  dark
                  color="grey"
                >
                    Crear Bodega
                </v-alert>

                <v-alert v-if="Alert != ''" class="mt-2"
                     dense
                     outlined
                     type="error"
                >
                  <strong>{{ Alert }}</strong>
                </v-alert>

                <v-row>
                    <v-col cols="12">
                  <v-text-field
                    label="Nombre de la Bodega"
                    :rules="BodegaRules"
                    v-model="Bodega"
                    prepend-icon="mdi-rename-box"
                    placeholder="Ingrese Nombre de la Bodega"
                    :disabled="Actualizacion"
                  >
                  </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                          label="Fila Desde"
                          :rules="FilaDesdeRules"
                          v-model="FilaDesde"
                          type="number"
                          prepend-icon="mdi-align-vertical-distribute"
                          placeholder="Fila Vertical Inicio"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                          label="Fila Hasta"
                          :rules="FilaHastaRules"
                          v-model="FilaHasta"
                          type="number"
                          prepend-icon="mdi-align-vertical-distribute"
                          placeholder="Fila Vertical Fin"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                          label="Columna Desde"
                          :rules="ColumnaDesdeRules"
                          v-model="ColumnaDesde"
                          type="number"
                          prepend-icon="mdi-align-vertical-distribute"
                          placeholder="Columna Horizontal Inicio"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                          label="Columna Hasta"
                          :rules="ColumnaHastaRules"
                          v-model="ColumnaHasta"
                          type="number"
                          prepend-icon="mdi-align-vertical-distribute"
                          placeholder="Columna Horizontal Fin"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                          label="Nivel Desde"
                          :rules="NivelDesdeRules"
                          v-model="NivelDesde"
                          type="number"
                          prepend-icon="mdi-align-vertical-distribute"
                          placeholder="Nivel Altura Inicio"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                          label="Nivel Hasta"
                          :rules="NivelHastaRules"
                          v-model="NivelHasta"
                          type="number"
                          prepend-icon="mdi-align-vertical-distribute"
                          placeholder="Nivel Altura Fin"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  color="primary"
                  @click="UpdateBodega()"
                v-if="Actualizacion">Actualizar</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="CrearBodega()"
                v-else>Crear Bodega</v-btn>
                <v-btn
                  text
                  color="secondary"
                  @click="dialogCrearBodega = false"
                >Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </template>
  </v-dialog>
</v-form>
    </div>
</template>

<script>
import API from '../../../../api.js'
    export default {
    name: 'gestionar-bodegas',
    props: [],
    //Variables
    data: () => ({
    dialogCrearBodega: false,
    //Alertas
    Alert: '',
    //Datos Bodega
    Bodega: '',
    FilaDesde: 1,
    FilaHasta: null,
    ColumnaDesde: 1,
    ColumnaHasta: null,
    NivelDesde: 1,
    NivelHasta: null,
    BodegaRules: [(v) => !!v || "Ingrese Nombre de la bodega"],
    FilaDesdeRules: [(v) => !!v || "Ingrese Fila Inicial"],
    FilaHastaRules: [(v) => !!v || "Ingrese Fila Final"],
    ColumnaDesdeRules: [(v) => !!v || "Ingrese Columna Inicial"],
    ColumnaHastaRules: [(v) => !!v || "Ingrese Columna Final"],
    NivelDesdeRules: [(v) => !!v || "Ingrese Nivel Inicial"],
    NivelHastaRules: [(v) => !!v || "Ingrese Nivel Final"],
    Actualizacion: false,
    //Bodega
    Bodegas: [],
    BodegaSeleccionada: {},
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
        async GetBodegas(){
            this.Bodegas = await API.GET_BODEGAS();
        },

        async GetBodega(Id){
            let Bodega = await API.GET_BODEGA(Id)
  
            this.Alert = '',
            this.Bodega = Bodega.Bodega.toUpperCase(),
            this.FilaDesde = Bodega.FilaDesde,
            this.FilaHasta = Bodega.FilaHasta,
            this.ColumnaDesde = Bodega.ColumnaDesde,
            this.ColumnaHasta = Bodega.ColumnaHasta,
            this.NivelDesde = Bodega.NivelDesde,
            this.NivelHasta = Bodega.NivelHasta,
            this.Actualizacion = true;
            this.$refs.formbodega.resetValidation();
            this.dialogCrearBodega = true;
        },

        async UpdateBodega(Json){
            
        if(this.$refs.formbodega.validate()){
            if(this.FilaDesde > this.FilaHasta || this.ColumnaDesde > this.ColumnaHasta || this.NivelDesde > this.NivelHasta ){
                return this.Alert = 'Error en filas, columnas o niveles. verifique desde y hasta, deben ser por ejemplo del 1 al 100.'
            }else{
            let Json = {
                Bodega: this.Bodega.toUpperCase(),
                FilaDesde: this.FilaDesde,
                FilaHasta: this.FilaHasta,
                ColumnaDesde: this.ColumnaDesde,
                ColumnaHasta: this.ColumnaHasta,
                NivelDesde: this.NivelDesde,
                NivelHasta: this.NivelHasta,
            }

            var Actualizar = await API.UPDATE_BODEGA(Json)

            if(Actualizar == 'EXITO'){
                this.dialogCrearBodega = false;
                this.GetBodegas()
            }else{
                this.Alert = Actualizar 
            }

            }
        }
        },
        
        async DeleteBodega(Bodega){
            let Eliminar = await API.ELIMINAR_BODEGA(Bodega)

            if(Eliminar == 'EXITO'){
                this.GetBodegas()
            }else{
                this.Alert = Eliminar
            }
        },

        ModalBodega(){
            this.Alert = '',
            this.Bodega = '',
            this.FilaDesde = 1,
            this.FilaHasta = null,
            this.ColumnaDesde = 1,
            this.ColumnaHasta = null,
            this.NivelDesde = 1,
            this.NivelHasta = null,
            this.Actualizacion = false;
            this.$refs.formbodega.resetValidation();
            this.dialogCrearBodega = true;
        },
        
        async CrearBodega(){
        if(this.$refs.formbodega.validate()){
            if(this.FilaDesde > this.FilaHasta || this.ColumnaDesde > this.ColumnaHasta || this.NivelDesde > this.NivelHasta ){
                return this.Alert = 'Error en filas, columnas o niveles. verifique desde y hasta, deben ser por ejemplo del 1 al 100.'
            }else{
            let Json = {
                Bodega: this.Bodega.toUpperCase(),
                FilaDesde: this.FilaDesde,
                FilaHasta: this.FilaHasta,
                ColumnaDesde: this.ColumnaDesde,
                ColumnaHasta: this.ColumnaHasta,
                NivelDesde: this.NivelDesde,
                NivelHasta: this.NivelHasta,
            }

            var Crear = await API.CREAR_BODEGA(Json)

            if(Crear == 'EXITO'){
                this.GetBodegas()
                this.dialogCrearBodega = false;
            }else{
                this.Alert = Crear 
            }


            }
        }
        }
    },

    //Apis
    async created(){
        this.GetBodegas();
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>