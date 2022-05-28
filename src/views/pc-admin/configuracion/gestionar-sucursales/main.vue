<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>{{ ModuloFullName }}</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Aqui Podras Crear, Actualizar y Eliminar {{ ModuloFullName }}.</div>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="12" class="mt-2 mb-2" style="text-align-last: right;">
              <v-btn color="primary" @click="Modal()">
                  <v-icon small dark>mdi-package</v-icon> Crear {{ ModuloName }}
              </v-btn>
            </v-col>
        </v-row>


<v-col cols="12" v-if="Loader == true">
<div class="center">
  <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
  <p>Cargando, por favor espere...</p>
</div>
</v-col>

  <v-simple-table v-if="Datos.length > 0 && Loader == false">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Creación
          </th>
          <th class="text-left">
            Actualización
          </th>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Nombre
          </th>
          <th class="text-left">
            Direccion
          </th>
          <th class="text-left">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Dato in Datos"
          :key="Dato._id"
        >
          <td>{{ Dato.createdAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/') }}</td>
          <td>{{ Dato.updatedAt == Dato.createdAt ? 'NUNCA' : Dato.updatedAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/') }}</td>
          <td>{{ Dato.Codigo }}</td>
          <td>{{ Dato.Nombre }}</td>
          <td>{{ Dato.Calle  + ' ' + Dato.Numeracion + ',' + (Dato.Departamento ? ' Dep ' + Dato.Departamento + ',' : '' ) + ' ' + Dato.Comuna + ', ' + Dato.Region }}</td>
          <td>
              <v-btn color="primary" class="mr-3" @click="GetDato(Dato._id)">
                  <v-icon small dark>mdi-archive-edit</v-icon>
              </v-btn>
              <v-btn color="error" @click="Delete(Dato._id)">
                  <v-icon small dark>mdi-archive-remove</v-icon>
              </v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  <v-simple-table v-else-if="Datos.length <= 0 && Loader == false">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            {{ ModuloName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">No existen {{ ModuloFullName }}.</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>


<v-form ref="form" lazy-validation>
  <v-dialog
          transition="dialog-bottom-transition"
          max-width="1200"
        v-model="dialogCrear">
          <template>
            <v-card>

              <v-card-text class="text-center" v-if="Loader == true">
                <v-alert
                  shaped
                  dense
                  dark
                  color="grey"
                >
                    Crear {{ ModuloFullName }}
                </v-alert>
                <div class="center">
                  <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
                  <p>Cargando, por favor espere...</p>
                </div>
              </v-card-text>

              <v-card-text class="text-center" v-else>
                <v-alert
                  shaped
                  dense
                  dark
                  color="grey"
                >
                    Crear {{ ModuloFullName }}
                </v-alert>

                <v-alert v-if="Alert != ''" class="mt-2"
                     dense
                     outlined
                     type="error"
                >
                  <strong>{{ Alert }}</strong>
                </v-alert>

                <v-row>
                    <v-col cols="4">
                        <v-text-field
                          :label="'Codigo de la ' + ModuloName"
                          :rules="DefaultRules"
                          v-model="Codigo"
                          prepend-icon="mdi-user"
                          :placeholder="'Ingrese Codigo de la ' + ModuloName"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field
                          :label="'Nombre de la ' + ModuloName"
                          :rules="DefaultRules"
                          v-model="NombreSucursal"
                          prepend-icon="mdi-user"
                          :placeholder="'Ingrese Nombre de la ' + ModuloName"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
              <v-row>
                  <v-col cols="3">
                      <v-select
                        v-model="RegionSeleccionada"
                        :rules="DefaultRules"
                        :items="Regiones"
                        label="Seleccione una region"
                        prepend-icon="mdi-map"
                        persistent-hint
                        return-object
                        single-line
                        dense
                        @change="RegionChange()"
                        style="margin-top: 1.3rem"
                      ></v-select>
                  </v-col>
                  <v-col cols="2">
                      <v-select
                        v-model="ComunaSeleccionada"
                        :rules="DefaultRules"
                        :items="Comunas"
                        label="Seleccione Comuna"
                        prepend-icon="mdi-map-marker"
                        persistent-hint
                        return-object
                        single-line
                        dense
                        style="margin-top: 1.3rem"
                      ></v-select>
                  </v-col>
                  <v-col cols="3">
                      <v-text-field
                        label="Calle"
                        :rules="DefaultRules"
                        v-model="Calle"
                        prepend-icon="mdi-road"
                        placeholder="Nombre de la calle"
                      >
                      </v-text-field>
                  </v-col>
                  <v-col cols="2">
                      <v-text-field
                        label="Numeración"
                        :rules="DefaultRules"
                        v-model="Numeracion"
                        prepend-icon="mdi-numeric"
                        placeholder="Numeración de la calle"
                      >
                      </v-text-field>
                  </v-col>
                  <v-col cols="2">
                      <v-text-field
                        label="Departamento"
                        v-model="Departamento"
                        prepend-icon="mdi-city"
                        placeholder="Numeracion del departamento (Opcional)"
                      ></v-text-field>
                  </v-col>
              </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  color="primary"
                  @click="Update()"
                v-if="Actualizacion">Actualizar</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="Crear()"
                v-else>Crear {{ ModuloName }}</v-btn>
                <v-btn
                  text
                  color="secondary"
                  @click="dialogCrear = false"
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
    name: 'gestionar-sucursales',
    props: [],
    //Variables
    data: () => ({
    //MODULO
    Codigo: null,
    ModuloFullName: 'Sucursales',
    ModuloName: 'Sucursal',
    Sucursal: null,
    NombreSucursal: null,
    Regiones: [],
    RegionSeleccionada: null,
    Comunas: [],
    ComunaSeleccionada: null,
    Calle: null,
    Numeracion: null,
    Departamento: null,
    Agencias: [],
    AgenciaSeleccionada: null,
    //Alertas
    dialogCrear: false,
    Alert: '',
    DefaultRules: [(v) => !!v || "Falta completar este campo."],
    Actualizacion: false,
    //Data
    Datos: [],
    //LOADER
    Loader: false,
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
        async GetDatos(){
            this.Datos = await API.GET_SUCURSALES();
            console.log(this.Datos)
        },

        async GetDato(Id){
            this.Actualizacion = true;
            let Dato = await API.GET_SUCURSAL(Id)
            this.Alert = '';

            console.log(Dato)

            this.Codigo = Dato.Codigo,
            this.NombreSucursal = Dato.Nombre,
            this.RegionSeleccionada = Dato.Region,
            this.ComunaSeleccionada = Dato.Comuna,
            this.Calle = Dato.Calle,
            this.Numeracion = Dato.Numeracion,
            this.Departamento = Dato.Departamento,
            this.$refs.form.resetValidation();
            this.dialogCrear = true;
        },

        async Update(){
            
        if(this.$refs.form.validate()){
            this.Loader = true
            let Json = {
                //ingrese los datos a actualizar
                Codigo: this.Codigo,
                Nombre: this.NombreSucursal,
                Region: this.RegionSeleccionada,
                Comuna: this.ComunaSeleccionada,
                Calle: this.Calle,
                Numeracion: this.Numeracion,
                Departamento: this.Departamento
            }

            var Actualizar = await API.UPDATE_SUCURSAL(Json)

            if(Actualizar == 'EXITO'){
                this.dialogCrear = false;
                this.Loader = false;
                this.GetDatos();
                this.Actualizacion = false;
            }else{
                this.Alert = Actualizar 
            }
                this.Loader = false
            }
        },
        
        async Delete(id){
            this.Loader = true
            let Eliminar = await API.ELIMINAR_SUCURSAL(id)

            if(Eliminar == 'EXITO'){
                this.GetDatos()
            }else{
                this.Alert = Eliminar
            }
            this.Loader = false
        },

        Modal(){
            this.Actualizacion = false;
            this.Alert = '',
            //Ingrese los datos por defecto
            this.Codigo = null;
            this.NombreSucursal = null;
            this.RegionSeleccionada = null;
            this.ComunaSeleccionada = null;
            this.Calle = null;
            this.Numeracion = null;
            this.Departamento = null;
            this.AgenciaSeleccionada = null;
            this.$refs.form.resetValidation();
            this.dialogCrear = true;
        },

        async RegionChange() {
          var Region = this.RegionSeleccionada;

          this.ComunaSeleccionada = "Cargando Comunas...";

          var Comunas = await API.POST_COMUNA(Region);

          this.Comunas = Comunas.Comunas;

          this.ComunaSeleccionada = "Seleccione una comuna";
        },


        async Crear(){
        if(this.$refs.form.validate()){
            this.Loader = true
            let Json = {
                //Ingrese los datos para crear    Codigo: String,
                Codigo: this.Codigo,
                Nombre: this.NombreSucursal,
                Region: this.RegionSeleccionada,
                Comuna: this.ComunaSeleccionada,
                Calle: this.Calle,
                Numeracion: this.Numeracion,
                Departamento: this.Departamento
            }

            var Crear = await API.CREAR_SUCURSAL(Json)

            if(Crear == 'EXITO'){
                this.GetDatos()
                this.dialogCrear = false;
            }else{
                this.Alert = Crear 
            }
                this.Loader = false
            }
        }
    },

    //Apis
    async created(){
        this.Loader = true
        var Regiones = await API.GET_REGIONES();

        Regiones.map((e) => {
          this.Regiones.push(e.Region);
        });
        
        this.GetDatos();
        this.Loader = false
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>