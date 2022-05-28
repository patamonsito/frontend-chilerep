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


  <v-simple-table v-if="Datos.length > 0">
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
            Giro
          </th>
          <th class="text-left">
            Correo
          </th>
          <th class="text-left">
            Comuna
          </th>
          <th class="text-left">
            Direccion
          </th>
          <th class="text-left">
            Creación
          </th>
          <th class="text-left">
            Iva en Factura
          </th>
          <th class="text-left">
            Eliminar
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Dato in Datos"
          :key="Dato._id"
        >
          <td>{{ Dato.rut }}</td>
          <td>{{ Dato.razon_social }}</td>
          <td>{{ Dato.giro }}</td>
          <td>{{ Dato.email }}</td>
          <td>{{ Dato.comuna_glosa }}</td>
          <td>{{ Dato.direccion }}</td>
          <td>{{ Dato.createdAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/') }}</td>
          <td>
            <v-container
              class="px-0"
              fluid
            >
              <v-switch
                v-model="Dato.iva"
                @click="Update(Dato.rut, Dato.iva)"
              ></v-switch>
            </v-container>
          </td>
          <td>
              <v-btn color="error" @click="Delete(Dato.rut)">
                  <v-icon small dark>mdi-archive-remove</v-icon>
              </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  <v-simple-table v-else>
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
                    <v-col cols="8">
                        <v-text-field
                          label="Rut"
                          prepend-icon="mdi-account-box"
                          :rules="RutEmpresaRules"
                          v-model="RutEmpresa"
                          placeholder="Ingrese su rut"
                          @blur="Format()"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="4" class="text-center d-flex justify-center">
                      <v-container
                      class="px-0"
                      fluid
                    >
                      <v-switch
                        v-model="switchIva"
                        label="Factura con Iva?"
                      ></v-switch>
                    </v-container>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                          label="Razon Social"
                          prepend-icon="mdi-account-box"
                          v-model="RazonSocial"
                          :disabled="true"
                        >
                        </v-text-field>

                    </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  color="primary"
                  @click="Crear()"
                >Crear {{ ModuloName }}</v-btn>
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
    name: 'gestionar-proveedores',
    props: [],
    //Variables
    data: () => ({
    //FORMULARIO
    RutEmpresa: '',
    RazonSocial: '',
    switchIva: false,
    Iva: false,
    RutEmpresaRules: [(v) => !!v || "Ingrese el Rut del Proveedor."],
    //MODULO
    ModuloFullName: 'Proveedores',
    ModuloName: 'Proveedor',
    //Alertas
    dialogCrear: false,
    Alert: '',
    //Data
    Datos: [],
    //Loader
    Loader: false
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

        async Update(rut, iva){
            console.log(rut, iva)
            let Json = {
                //ingrese los datos a actualizar
                rut,
                iva
            }
            var Actualizar = await API.UPDATE_PROVEEDOR(Json)

            if(Actualizar == 'EXITO'){
                this.dialogCrear = false;
                this.GetDatos()
            }
        },
        
        async Delete(rut){
            let Eliminar = await API.ELIMINAR_PROVEEDOR(rut)

            if(Eliminar == 'EXITO'){
                this.GetDatos()
            }else{
                alert(Eliminar)
            }
        },

        Modal(){
            this.Alert = '',
            //Ingrese los datos por defecto
            this.$refs.form.resetValidation();
            this.dialogCrear = true;
        },
        
        async Crear(){
        if(this.$refs.form.validate()){
            console.log(this.switchIva)
            let Json = {
                //Ingrese los datos para crear
                Rut: this.RutEmpresa.replace(/\./g, '').slice(0, -2),
                iva: this.switchIva
            }

            var Crear = await API.CREAR_PROVEEDOR(Json)

            if(Crear == 'EXITO'){
                this.GetDatos()
                this.dialogCrear = false;
            }else{
                this.Alert = Crear 
            }
        }
        },

    formatRUT(rut) {
      var actual = rut.replace(/^0+/, "");
      actual = actual.replace(/-/, "");
      actual = actual.replace(/\s/g, "");
      if (actual != "" && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
          var letra = inicio.charAt(i);
          rutPuntos = letra + rutPuntos;
          if (j % 3 == 0 && j <= inicio.length - 1) {
            rutPuntos = "." + rutPuntos;
          }
          j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
      }
      return rutPuntos;
    },

    async Format() {
      if (
        this.RutEmpresa == "" ||
        this.RutEmpresa == null ||
        this.RutEmpresa == undefined
      ) {
        return true;
      }
      this.RutEmpresa = this.formatRUT(this.RutEmpresa);

      this.Loader = true;

      //Verificar rut empresa
      var ValidarRut = await API.POST_RUTEMPRESA(
        this.RutEmpresa.replaceAll(".", "")
      );

      if (ValidarRut != "Invalido") {
        this.RazonSocial = ValidarRut.razon_social;
        this.rutEmpresaInvalido = false;
        this.Loader = false;
      } else {
        this.RazonSocial = "";
        this.RutEmpresa = "";
        this.CorreoEmpresa = "";
        this.rutEmpresaInvalido = true;
        this.Loader = false;
        return true;
      }
    },
    },

    //Apis
    async created(){
        this.GetDatos();
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>