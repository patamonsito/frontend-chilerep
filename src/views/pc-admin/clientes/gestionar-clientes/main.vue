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
  <p>Cargando Carrito, por favor espere...</p>
</div>
</v-col>

  <v-simple-table v-if="Datos.length > 0 && Loader == false">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Rut
          </th>
          <th class="text-left">
            {{ ModuloName }}
          </th>
          <th class="text-left">
            Telefono
          </th>
          <th class="text-left">
            Correo
          </th>
          <th class="text-left">
            Creación
          </th>
          <th class="text-left">
            Actualización
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
          <td>{{ Dato.Rut }}</td>
          <td>{{ Dato.Nombres }} {{ Dato.Apellidos}}</td>
          <td>{{ Dato.Telefono }}</td>
          <td>{{ Dato.Correo }}</td>
          <td>{{ Dato.createdAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/') }}</td>
          <td>{{ Dato.updatedAt == Dato.createdAt ? 'NUNCA' : Dato.updatedAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/') }}</td>
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
          max-width="600"
        v-model="dialogCrear">
          <template>
            <v-card>
              <v-card-text class="text-center">
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
                    <v-col cols="12">
                        <v-text-field
                          :label="'Nombre del ' + ModuloName"
                          :rules="NombreRules"
                          v-model="Nombre"
                          prepend-icon="mdi-user"
                          :placeholder="'Ingrese ' + ModuloName"
                          :disabled="Actualizacion"
                        >
                        </v-text-field>
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
    name: 'gestionar-clientes',
    props: [],
    //Variables
    data: () => ({
    //MODULO
    ModuloFullName: 'Clientes',
    ModuloName: 'Cliente',
    //Alertas
    dialogCrear: false,
    Alert: '',
    NombreRules: [(v) => !!v || "Falta completar este campo."],
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
            this.Datos = await API.GET_PROVEEDORES();
        },

        async GetDato(Id){
            let Dato = await API.GET_PROVEEDOR(Id)

            this.Alert = '',
            this.$refs.form.resetValidation();
            this.dialogCrear = true;
        },

        async Update(){
            
        if(this.$refs.form.validate()){
            if(this.FilaDesde > this.FilaHasta || this.ColumnaDesde > this.ColumnaHasta || this.NivelDesde > this.NivelHasta ){
                return this.Alert = 'Error al enviar los datos, por favor verifiquelos.'
            }else{
            this.Loader = true
            let Json = {
                //ingrese los datos a actualizar
            }

            var Actualizar = await API.UPDATE_PROVEEDOR(Json)

            if(Actualizar == 'EXITO'){
                this.dialogCrear = false;
                this.Loader = true
                this.GetDatos()
            }else{
                this.Alert = Actualizar 
            }
                this.Loader = false

            }
        }
        },
        
        async Delete(id){
            this.Loader = true
            let Eliminar = await API.ELIMINAR_PROVEEDOR(id)

            if(Eliminar == 'EXITO'){
                this.GetDatos()
            }else{
                this.Alert = Eliminar
            }
            this.Loader = false
        },

        Modal(){
            this.Alert = '',
            //Ingrese los datos por defecto
            this.$refs.form.resetValidation();
            this.dialogCrear = true;
        },
        
        async Crear(){
        if(this.$refs.form.validate()){
            if(validacion){ // Editar condiciones de validacion
                return this.Alert = 'Error en los datos enviados.'
            }else{
            this.Loader = true
            let Json = {
                //Ingrese los datos para crear
            }

            var Crear = await API.CREAR_PROVEEDOR(Json)

            if(Crear == 'EXITO'){
                this.GetDatos()
                this.dialogCrear = false;
            }else{
                this.Alert = Crear 
            }
                this.Loader = false

            }
        }
        }
    },

    //Apis
    async created(){
        this.Loader = true
        this.GetDatos();
        this.Loader = false
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>