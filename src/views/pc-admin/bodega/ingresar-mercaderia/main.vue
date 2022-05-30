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
      <p>Cargando Registros, por favor espere...</p>
    </div>
</v-col>

  <v-simple-table v-if="Datos.length > 0 && Loader == false">
    <template v-slot:default>
      <thead>
          <tr>
            <th class="text-left">
              Ingreso/Salida
            </th>
            <th class="text-left">
              Folio
            </th>
            <th class="text-left">
              Razon Social
            </th>
            <th class="text-left">
              Codigo
            </th>
            <th class="text-left">
              Descripcion
            </th>
            <th class="text-left">
              Cantidad
            </th>
            <th class="text-left">
              Ubicación
            </th>
            <th class="text-left">
              Acción
            </th>
          </tr>
      </thead>
      <tbody>
        <tr
          v-for="Dato in Datos"
          :key="Dato._id"
        >
          <td style="width: 6rem;">{{ Dato.createdAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/') }}</td>
          <td style="width: 4rem;">{{ Dato.Folio }}</td>
          <td style="width: 9rem;">{{ Dato.razon_social }}</td>
          <td style="width: 5rem;">{{ Dato.CodigoImportadora }}</td>
          <td style="width: auto;">{{ Dato.Producto[0].Descripcion }}</td>
          <td v-if="Dato.Entrada == true" style="width: 7rem;">{{ Dato.Producto[0].Bodega }} {{ '+' + Dato.Cantidad }}  <v-icon
              color="green"
            >
               mdi-arrow-up-bold-box-outline
            </v-icon>
          </td>
          <td v-else style="width: 7rem;">{{ Dato.Producto[0].Bodega }} {{ '-' + Dato.Cantidad }} 
            <v-icon
                color="red"
              >
              mdi-arrow-down-bold-box-outline
            </v-icon>
          </td>
          <td v-if="Dato.Producto[0].Ubicacion[0].Columna == null" style="width: 9rem;">SIN UBICACIÓN</td>
          <td v-else style="width: 9rem;">
            <div class="row" v-for=" Ubicacion, i in Dato.Producto[0].Ubicacion" :key="i" style="margin: 0">
              <v-col cols="12" :style="i == 0 ? 'padding: 0;' : 'padding: 0.2rem;border-top: 1px solid lightgray;'">{{ Ubicacion.Bodega }} 10{{Ubicacion.Fila}}00{{Ubicacion.Columna}}00{{Ubicacion.Nivel}}</v-col>
            </div>


          </td>
          <td style="width: 11rem;" v-if="Dato.Entrada == true">
              <v-btn color="primary" class="mr-3" @click="EditarUbicacion(Dato)">
                  <v-icon small dark>mdi-archive-edit</v-icon> Editar
              </v-btn>
          </td>
          <td v-else>

          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

  <v-simple-table v-else-if="Datos.length == 0 && Loader == false">
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

 <!-- Crear Registro -->
<v-form ref="formCrear" lazy-validation>
  <v-dialog
          transition="dialog-bottom-transition"
          max-width="1200"
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
                    Crear {{ ModuloName }}
                </v-alert>

                <v-row>
                    <v-col cols="6">
                        <v-select
                          class="mt-5"
                          v-model="ProveedorSeleccionado"
                          :rules="ProveedorRules"
                          :items="Proveedores"
                          item-text="razon_social"
                          label="Seleccione un proveedor"
                          prepend-icon="mdi-map"
                          persistent-hint
                          return-object
                          single-line
                          dense
                          @change="BuscarFactura()"
                        ></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                          label="Folio"
                          :rules="FolioRules"
                          v-model="Folio"
                          prepend-icon="mdi-code"
                          type="Number"
                          placeholder="Ingrese Folio"
                          @blur="BuscarFactura()"
                        >
                        </v-text-field>
                    </v-col>

                    <v-col cols="2">
                        <v-container
                          class="px-0"
                          fluid
                          >
                          <v-switch
                          label="Factura con IVA?"
                            v-model="Iva"
                            @click="UpdateIva(ProveedorSeleccionado.rut, ProveedorSeleccionado.iva)"
                          > Factura con Iva?</v-switch>
                        </v-container>
                    </v-col>

                </v-row>
                    <v-col cols="12">
                        <div class="center" v-if="LoaderFactura == true">
                          <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
                          <p>Cargando, por favor espere...</p>
                        </div>
                    </v-col>



                  <v-row v-if="FacturaNull == true && LoaderFactura == false && ApiGetFactura == false">
                    <v-alert class="mt-2"
                         dense
                         outlined
                         type="error"
                    >
                        <strong>No se encontro la factura en el Servicio de Impuestos Internos. verifique el numero de folio y proveedor.</strong>
                    </v-alert>
                    <v-col cols="12" class="center">
                        <v-btn color="success" @click="ApiGetFactura = true">Ingresar de todos modos.</v-btn>
                    </v-col>
                  </v-row>
                    <v-row v-if="ApiGetFactura == true && LoaderFactura == false">
                    <v-alert v-if="Alert != ''" class="mt-2"
                         dense
                         outlined
                         :type="AlertType"
                    >
                        <strong>{{ Alert }}</strong>
                    </v-alert>
                      <div class="center" v-if="Loader == true">
                              <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
                              <p>Cargando, por favor espere...</p>
                      </div>
                      <v-col cols="12" v-else>
                          <v-simple-table>
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th class="text-left">
                                      #
                                    </th>
                                    <th class="text-left">
                                      Codigo
                                    </th>
                                    <th class="text-left">
                                      Descripcion
                                    </th>
                                    <th class="text-left">
                                      Cant.
                                    </th>
                                    <th class="text-left">
                                      Precio
                                    </th>
                                    <th class="text-left">
                                      Acción
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                    <tr
                                      v-for=" Producto,i in ProductosRegistrados"
                                      :key="i"
                                    >
                                      <td>{{ i + 1 }}</td>
                                      <td><v-text-field
                                          label="Codigo Producto"
                                          :rules="CodigoImportadoraRules"
                                          v-model="Producto.CodigoImportadora"
                                          prepend-icon="mdi-code"
                                          placeholder="Codigo Producto"
                                          @blur="BuscarProducto(i, Producto.CodigoImportadora)"
                                        >
                                        </v-text-field></td>
                                      <td><v-text-field
                                          label="Descripcion"
                                          :rules="DescripcionRules"
                                          v-model="Producto.Descripcion"
                                          prepend-icon="mdi-code"
                                          placeholder="Descripcion del Producto"
                                          :disabled="true"
                                        >
                                        </v-text-field></td>
                                      <td><v-text-field
                                          label="Cantidad"
                                          :rules="CantidadRules"
                                          v-model="Producto.Cantidad"
                                          prepend-icon="mdi-code"
                                          type="Number"
                                          placeholder="Cantidad"
                                          @blur="CantidadController(i)"
                                          :disabled="Producto.Descripcion == null || '' ? true : false"
                                        >
                                        </v-text-field>
                                        </td>
                                        <td>
                                            <v-text-field
                                            label="Precio"
                                            :rules="PrecioImportadoraRules"
                                            v-model="Producto.PrecioImportadora"
                                            prepend-icon="mdi-code"
                                            type="Number"
                                            placeholder="Precio"
                                            @blur="PrecioImportadoraController(i)"
                                            :disabled="Producto.Descripcion == null || '' ? true : false"
                                          >
                                          </v-text-field>
                                        </td>
                                        <td>
                                            <v-btn v-if="ProductosRegistrados.length != 1" color="error" @click="EliminarProducto(i)">
                                                <v-icon small dark>mdi-archive-remove</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                              </template>
                          </v-simple-table>
                          <v-divider></v-divider>
                          <v-row>
                              <v-col cols="6">
                                    <v-textarea
                                      label="Observaciones"
                                      v-model="Observaciones"
                                      outlined
                                    ></v-textarea>
                              </v-col>
                              <v-col cols="6">
                                <div>
                                  <v-simple-table>
                                    <template v-slot:default>
                                      <tbody>
                                        <tr>
                                          <td style="font-weight: bold">Neto</td>
                                          <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatPrecio(Math.round(PrecioTotal / 1.19))}} $</td>
                                        </tr>
                                        <tr>
                                          <td style="font-weight: bold">Iva</td>
                                          <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatPrecio(Math.round(PrecioTotal - Math.round((PrecioTotal / 1.19))) )}} $</td>
                                        </tr>
                                        <tr>
                                          <td style="font-weight: bold">Total</td>
                                          <td colspan="2" class="text-nowrap" style="text-align: end;">{{FormatPrecio(Math.round(PrecioTotal))}} $</td>
                                        </tr>
                                      </tbody>
                                    </template>
                                  </v-simple-table>
                            </div>

                              </v-col>
                          </v-row>
                      </v-col>
                    </v-row>
              </v-card-text>
              <v-card-actions class="justify-end" v-if="Loader == false">
                <div class="center" v-if="BotonLoader == true">
                    <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
                </div>
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

<!-- Form Ubicacion  -->
<v-form ref="formUbicacion" lazy-validation>
  <v-dialog
          transition="dialog-bottom-transition"
          max-width="1200"
        v-model="dialogUbicacion">
          <template>
            <v-card>
              <v-card-text class="text-center">
                    <v-alert v-if="Alert != ''" class="mt-2"
                         dense
                         outlined
                         :type="AlertType"
                    >
                        <strong>{{ Alert }}</strong>
                    </v-alert>
                    <v-col cols="12">
                        <div class="center" v-if="Loader == true">
                          <div class="spinner" style="max-width: 1rem; margin: 1rem"></div>
                          <p>Cargando, por favor espere...</p>
                        </div>
                    </v-col>
                    <div v-if="Loader == false">
                    <v-row>
                    <v-col cols="8">
                        <v-select
                          class="mt-5"
                          v-model="ProductoSeleccionado.razon_social"
                          :items="Proveedores"
                          :rules="ProveedorRules"
                          item-text="razon_social"
                          label="Seleccione un proveedor"
                          prepend-icon="mdi-map"
                          persistent-hint
                          return-object
                          single-line
                          dense
                          :disabled="true"
                        ></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                          label="Folio"
                          v-model="ProductoSeleccionado.Folio"
                          :rules="ProveedorRules"
                          prepend-icon="mdi-code"
                          type="Number"
                          placeholder="Ingrese Folio"
                          :disabled="true"
                        >
                        </v-text-field>
                    </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" v-if="ProductoSeleccionado">
                        <v-simple-table>
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th class="text-left">
                                      Fecha
                                    </th>
                                    <th class="text-left">
                                      Codigo
                                    </th>
                                    <th class="text-left">
                                      Producto
                                    </th>
                                    <th class="text-center">
                                      Cantidad
                                    </th>
                                    <th class="text-center">
                                      Precio
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                      <td>
                                        {{ ProductoSeleccionado.createdAt.slice(0, 10).split('-').reverse().join('-').replaceAll('-', '/')}}
                                      </td>
                                      <td>
                                        <v-text-field
                                          label="CodigoImportadora"
                                          v-model="ProductoSeleccionado.CodigoImportadora"
                                          prepend-icon="mdi-code"
                                          placeholder="Ingrese CodigoImportadora"
                                          :rules="ProveedorRules"
                                          :disabled="true"
                                        >
                                        </v-text-field>
                                      </td>
                                      <td>
                                        <v-text-field
                                          label="Descripcion"
                                          v-model="ProductoSeleccionado.Producto[0].Descripcion"
                                          :rules="ProveedorRules"
                                          prepend-icon="mdi-code"
                                          placeholder="Ingrese CodigoImportadora"
                                        >
                                        </v-text-field>
                                      </td>
                                      <td>
                                        <v-text-field
                                          label="Cantidad"
                                          v-model="ProductoSeleccionado.Cantidad"
                                          :rules="ProveedorRules"
                                          prepend-icon="mdi-code"
                                          type="Number"
                                          placeholder="Ingrese CodigoImportadora"
                                          :disabled="CantidadAnterior != ProductoSeleccionado.CantidadRestante ? true : false"
                                        >
                                        </v-text-field>
                                      </td>
                                      <td>
                                        <v-text-field
                                          label="Precio"
                                          v-model="ProductoSeleccionado.PrecioImportadora"
                                          :rules="ProveedorRules"
                                          prepend-icon="mdi-code"
                                          type="Number"
                                          placeholder="Ingrese CodigoImportadora"
                                          :disabled="CantidadAnterior != ProductoSeleccionado.CantidadRestante ? true : false"
                                        >
                                        </v-text-field>
                                      </td>
                                      <td>
                                      </td>
                                    </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                      </v-col>
                      <v-divider></v-divider>
                    </v-row>
                            <v-simple-table>
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th class="text-left">
                                      Bodega
                                    </th>
                                    <th class="text-left">
                                      Fila
                                    </th>
                                    <th class="text-left">
                                      Columna
                                    </th>
                                    <th class="text-left">
                                      Nivel
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                    <tr
                                      v-for="Ubicacion, i in Ubicaciones"
                                      :key="i"
                                    >
                                      <td>
                                        <v-select
                                          class="mt-5"
                                          v-model="Ubicacion.Bodega"
                                          :items="Bodegas"
                                          :rules="ProveedorRules"
                                          item-text="Bodega"
                                          label="Bodega"
                                          prepend-icon="mdi-map"
                                          persistent-hint
                                          return-object
                                          single-line
                                          dense
                                          @change="BodegaSelected(i, $event)"
                                        ></v-select>
                                      </td>
                                      <td>
                                        <v-select
                                          class="mt-5"
                                          v-model="Ubicacion.Fila"
                                          :rules="ProveedorRules"
                                          :items="Ubicacion.Filas"
                                          label="Fila"
                                          prepend-icon="mdi-map"
                                          persistent-hint
                                          return-object
                                          single-line
                                          dense
                                          :disabled="Ubicacion.Filas.length == 0 ? true : false"
                                        ></v-select>
                                      </td>
                                      <td>
                                        <v-select
                                          class="mt-5"
                                          v-model="Ubicacion.Columna"
                                          :rules="ProveedorRules"
                                          :items="Ubicacion.Columnas"
                                          label="Columna"
                                          prepend-icon="mdi-map"
                                          persistent-hint
                                          return-object
                                          single-line
                                          dense
                                          :disabled="Ubicacion.Columnas.length == 0 ? true : false"
                                        ></v-select>
                                        </td>
                                        <td>
                                        <v-select
                                          class="mt-5"
                                          v-model="Ubicacion.Nivel"
                                          :rules="ProveedorRules"
                                          :items="Ubicacion.Niveles"
                                          label="Nivel"
                                          prepend-icon="mdi-map"
                                          persistent-hint
                                          return-object
                                          single-line
                                          dense
                                          :disabled="Ubicacion.Niveles.length == 0 ? true : false"
                                        ></v-select>
                                        </td>
                                        <td v-if="i == 0">
                                            <v-btn color="success" @click="AgregarUbicacion()">
                                                <v-icon small dark>mdi-map-marker-plus</v-icon>
                                            </v-btn>
                                        </td>
                                        <td v-if="i != 0">
                                            <v-btn color="error" @click="EliminarUbicacion(i)">
                                                <v-icon small dark>mdi-map-marker-minus</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                    </div>
              </v-card-text>
              <v-card-actions class="justify-end" v-if="Loader == false">
                <v-btn
                  text
                  color="primary"
                  @click="UpdateRegistro()"
                >Actualizar</v-btn>
                <v-btn
                  text
                  color="secondary"
                  @click="dialogUbicacion = false"
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
    name: 'ingresar-mercaderia',
    props: ["CantidadMinima", "CantidadMaxima", "CantidadAgregada", "spinnerCantidad", "Carrito", "Usuario", "Login"],
    //Variables
    data: () => ({
    //MODULO
    ModuloFullName: 'Registros',
    ModuloName: 'Registro',
    //Alertas
    ApiGetFactura: false,
    FacturaNull: false,
    dialogUbicacion: false,
    dialogCrear: false,
    Alert: '',
    AlertType: 'error',
    ProveedorRules: [(v) => !!v || "Falta completar este campo."],
    CantidadRules: [(v) => !!v || "Falta completar este campo."],
    CodigoImportadoraRules: [(v) => !!v || "Falta completar este campo."],
    DescripcionRules: [(v) => !!v || "Falta completar este campo."],
    PrecioImportadoraRules: [(v) => !!v || "Falta completar este campo."],
    FolioRules: [(v) => !!v || "Falta completar este campo."],
    FilaRules: [(v) => !!v || "Falta completar este campo."],
    BodegaRules: [(v) => !!v || "Falta completar este campo."],
    ColumnaRules: [(v) => !!v || "Falta completar este campo."],
    NivelRules: [(v) => !!v || "Falta completar este campo."],
    Actualizacion: false,
    //Data
    Datos: [],
    Proveedores: [],
    ProveedorSeleccionado: {
      rut: '',
      iva: false,
    },
    Iva: false,
    Folio: null,
    Bodegas: [],
    BodegaSeleccionada: null,
    Producto: null,
    Observaciones: '',
    ProductosRegistrados: [{
        CodigoImportadora: null,
        Descripcion: null,
        Cantidad: 1,
        PrecioImportadora: 0,
    }],
    Ubicaciones: [{
        Bodega: null,
        Fila: null,
        Columna: null,
        Nivel: null,
        Filas: [],
        Columnas: [],
        Niveles: []
    }],
    PrecioTotal: 0,
    //Datos Ubicacion
    Filas: [],
    Columnas: [],
    Niveles: [],
    ProductoSeleccionado: {
      Cantidad: 0,
      CantidadRestante: 1
    },
    CantidadAnterior: 0,
    //LOADER
    Loader: false,
    LoaderFactura: false,
    BotonLoader: false,
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


    async UpdateRegistro(){
      //Comprobaciones
      if(this.$refs.formUbicacion.validate()){
        this.Alert = '';
        if(this.ProductoSeleccionado.Descripcion == '' || this.ProductoSeleccionado.PrecioImportadora < 1000 || this.ProductoSeleccionado.Cantidad == 0){
          return this.Alert = 'ERROR: VERIFIQUE QUE LOS CAMPOS ESTEN CORRECTOS'
        }else{
          this.Loader = true;
          this.Datos = [];
          // Preparar el Json
          let Json = {
              CodigoImportadora: this.ProductoSeleccionado.CodigoImportadora,
              IdRegistro: this.ProductoSeleccionado._id,
              Descripcion: this.ProductoSeleccionado.Producto[0].Descripcion,
              Ubicacion: this.Ubicaciones,
              Cantidad: parseInt(this.ProductoSeleccionado.Cantidad.toString().replaceAll('.', '').replaceAll(',', '')),
              CantidadAnterior: this.CantidadAnterior,
              PrecioImportadora: parseInt(this.ProductoSeleccionado.PrecioImportadora.toString().replaceAll('.', '').replaceAll(',', '')),
              Usuario: this.Usuario.Nombre + ' ' + this.Usuario.Apellido
          }
            let Enviar = await API.UPDATE_REGISTRO(Json)
            setTimeout(async () => {
              if(Enviar == 'EXITO'){
                  await this.GetDatos()
                  this.Loader = false;
                  this.dialogUbicacion = false;
              }else{
                return this.Alert = Enviar;
              }
            }, 2000);

        }
      }

    },     

    async EliminarUbicacion(i){
      this.Ubicaciones = this.Ubicaciones.filter( (e, a) => {
           if(i == a){ console.log(e) }else{ return e } 
        })
    },

      AgregarUbicacion(){
        this.Ubicaciones.push({
        Bodega: null,
        Fila: null,
        Columna: null,
        Nivel: null,
        Filas: [],
        Columnas: [],
        Niveles: []
    })
      },

        async BodegaSelected(i, info){
          console.log(info)
          this.Ubicaciones.filter( (e, a) => {
              console.log(a, i)
               if(i == a){
                 e.Bodega = info.Bodega;
                 e.Filas = info.Filas;
                 e.Niveles = info.Niveles;
                 e.Columnas = info.Columnas;
                 console.log(e)
               }
            })
        },

        async EditarUbicacion(Producto){
          this.dialogUbicacion = true;
          this.CantidadAnterior = Producto.Cantidad;
          this.ProductoSeleccionado = Producto;
          this.Ubicaciones = Producto.Producto[0].Ubicacion;
          this.AlertType = 'error';
          this.Alert = '';
          this.BotonLoader = false;
        },

        CantidadController(i){
            this.Alert = '';
            this.Loader = true;
            this.ProductosRegistrados.filter( (e, a) => {
               if(i == a){
                   if(e.Cantidad < 1){
                       console.log(e.Cantidad)
                    this.BuscarProducto(i)
                    this.AlertType = 'error';
                    this.Alert = 'CANTIDAD ERROR'
                    this.Loader = false;
                   }else{
                   e.Cantidad = parseInt(e.Cantidad.toString().replace(/\./g, '').replace(/\,/g, ''));
                   console.log(e.Cantidad, 'Go precioController')
                   this.PrecioController()
                   this.Loader = false;
                   }
               }
            })
        },

        PrecioImportadoraController(i){
           this.ProductosRegistrados.filter( (e, a) => {
                this.Alert = '';
               if(i == a){
                   if(e.PrecioImportadora < 100){
                    this.BuscarProducto(i)
                    this.AlertType = 'error';
                    this.Alert = 'PRECIO ERROR'
                   }else{
                       e.PrecioImportadora = parseInt(e.PrecioImportadora.toString().replace(/\./g, '').replace(/\,/g, ''));
                       console.log(e.PrecioImportadora, 'Go precioController')
                       this.PrecioController()
                   }
               }
            })
        },

        PrecioController(){
            this.PrecioTotal = 0;
            
            if(this.Iva == false){
                this.ProductosRegistrados.map((e) => {
                    let Total = (e.PrecioImportadora * 1.19) * e.Cantidad;
                    this.PrecioTotal = this.PrecioTotal + Total; 
                    console.log(this.PrecioTotal)
                })
            }else{
                this.ProductosRegistrados.map((e) => {
                    let Total = e.PrecioImportadora * e.Cantidad;
                    this.PrecioTotal = this.PrecioTotal + Total; 
                    console.log(this.PrecioTotal)
                })
            }
            this.Loader = false;
        },


        async UpdateIva(){
            this.Loader = true;
            let Json = {
                //ingrese los datos a actualizar
                rut: this.ProveedorSeleccionado.rut,
                iva: this.Iva,
            }

            var Actualizar = await API.UPDATE_PROVEEDOR(Json)

            if(Actualizar == 'EXITO'){
                this.PrecioController()
            }
            this.Loader = false;
            
        },
        
        // AñadirProducto(){
        //     this.ProductosRegistrados.push({
        //         CodigoImportadora: null,
        //         Descripcion: null,
        //         Cantidad: 1,
        //         PrecioImportadora: 0,
        //     })
        // },

        EliminarProducto(i){
            this.ProductosRegistrados = this.ProductosRegistrados.filter( (e, a) => {
               if(i == a){}else{ return e } 
            })
            this.PrecioController()
        },

        async BuscarFactura(){
          if(this.ProveedorSeleccionado == '' || this.Folio == ''){
            return console.log('vacios');
          }else{
            this.Iva = this.ProveedorSeleccionado.iva
            this.LoaderFactura = true;
            let Factura = await API.POST_DTE_COMPRA(this.ProveedorSeleccionado.rut, this.Folio);
            if(Factura.split('')[1] == 'N'){
               this.FacturaNull = true;
              return this.LoaderFactura = false;
            }
            Factura = JSON.parse(Factura)
            this.ProductosRegistrados = [];
            console.log(Factura.detalle)
            if(!Factura.detalle){
              this.Alert = 'SE ENCONTRO LA FACTURA PERO LOS DETALLES SE DEBEN INGRESAR MANUALMENTE, TOTAL: ' + Factura.total;
              this.AlertType = 'info';
              
              this.ProductosRegistrados = [{
                  CodigoImportadora: null,
                  Descripcion: null,
                  Cantidad: 1,
                  PrecioImportadora: 0,
              }],
              this.ApiGetFactura = true;
              return this.LoaderFactura = false;
            }

            for(let i = 0; i < Factura.detalle.length; i++){
             this.ProductosRegistrados.push({
                    CodigoImportadora: Factura.detalle[i].CdgItem.VlrCodigo,
                    Descripcion: Factura.detalle[i].NmbItem,
                    Cantidad: parseInt(Factura.detalle[i].QtyItem),
                    PrecioImportadora: parseInt(Factura.detalle[i].PrcItem),
                })
            }

            this.ApiGetFactura = true;
            return this.LoaderFactura = false;

          }
        },

        async BuscarProducto(i, CodigoImportadora = ''){
          this.Alert = ''

          if(CodigoImportadora != ''){
            let validacion = this.ProductosRegistrados.filter(async (e, a) => {
              let repetido = 0
              if(i != a){
                console.log(e.CodigoImportadora, CodigoImportadora, 'validador')
                if(e.CodigoImportadora == CodigoImportadora){
                  this.AlertType = 'error';
                  this.Alert = 'EL PRODUCTO YA SE ENCUENTRA AGREGADO EN LA LISTA.'
                  this.Loader = false;
                }
              }
            })
          }
          setTimeout(() => {
            if(this.Alert == 'EL PRODUCTO YA SE ENCUENTRA AGREGADO EN LA LISTA.'){
              return true;
            } 

            this.ProductosRegistrados.filter(async (e, a) => {
             this.AlertType = 'error';
             this.Alert = '';
             this.Loader = true;
              if(i == a && e.CodigoImportadora != null){
                  if(!e.CodigoImportadora){
                    this.AlertType = 'error';
                    this.Alert = 'EL DODIGO DEL PRODUCTO NO PUEDE ESTAR VACIO.'
                    this.Loader = false;
                    return true;
                  }
                   let Product = await API.POST_PRODUCTS_CODE(e.CodigoImportadora)
                   console.log(Product)
                   if(Product[0]){
                       e.Descripcion = Product[0].Descripcion,
                       e.PrecioImportadora = Product[0].PrecioImportadora
                       this.PrecioController();
                       if(this.ProductosRegistrados[this.ProductosRegistrados.length - 1].Descripcion == null || this.ProductosRegistrados[this.ProductosRegistrados.length - 1].Descripcion == ''){
                         }else{
                         this.ProductosRegistrados.push({
                             CodigoImportadora: null,
                             Descripcion: null,
                             Cantidad: 1,
                             PrecioImportadora: 0,
                         })
                       }
                   }else{
                       e.CodigoImportadora = null;
                       e.Descripcion = null;
                       e.PrecioImportadora = null;
                       this.AlertType = 'error';
                       this.Alert = 'PRODUCTO NO ENCONTRADO'
                   }
               }
             this.Loader = false;
            })



          }, 100);

        },

        async GetDatos(){
            let Res = await API.GET_REGISTROS();
            Res.Salidas = Res.Salidas.map(Dato => {
              Dato.Folio = Dato.Registro.Folio
              Dato.razon_social = Dato.Registro.razon_social
              Dato.Producto = [ { Descripcion: Dato.Descripcion, Ubicacion: [{ Bodega: null, Fila: null, Columna: null, Nivel: null, Filas: [], Columnas: [], Niveles: [] }] } ]
              return Dato;
            })
            console.log(Res.Salidas)
            this.Datos = [
              ...Res.Entradas,
              ...Res.Salidas
            ]
          
          this.Datos.sort((a, b) => a.createdAt > b.createdAt)


        },

        async GetProveedores(){
            this.Proveedores = await API.GET_PROVEEDORES();
        },

        async GetBodegas(){
            this.Bodegas = await API.GET_BODEGAS();

            this.Bodegas = this.Bodegas.map( e => {
              e.Filas = [];
              for(let i = e.FilaDesde; i < e.FilaHasta + 1; i++){
                e.Filas.push(i);
              }
              e.Columnas = [];
              for(let i = e.ColumnaDesde; i < e.ColumnaHasta + 1; i++){
                e.Columnas.push(i);
              }
              e.Niveles = [];
              for(let i = e.NivelDesde; i < e.NivelHasta + 1; i++){
                e.Niveles.push(i);
              }
              return e;
            })

        },

        async GetDato(Id){
            let Dato = await API.GET_PROVEEDOR(Id)

            this.AlertType = 'error';
            this.Alert = '',
            this.$refs.formCrear.resetValidation();
            this.dialogCrear = true;
        },

        async Update(){
            
        this.ProductosRegistrados = this.ProductosRegistrados.filter( (e, a) => {
           if(!e.CodigoImportadora){}else{ return e } 
        })


        if(this.$refs.formCrear.validate()){
            this.Loader = true
            let Json = {
                //ingrese los datos a actualizar
            }

            // var Actualizar = await API.UPDATE_PROVEEDOR(Json)

            if(Actualizar == 'EXITO'){
                this.dialogCrear = false;
                this.Loader = true
                this.GetDatos()
            }else{
                this.AlertType = 'error';
                this.Alert = Actualizar 
            }
                this.Loader = false

            }
        },
        
        async Delete(id){
            this.Loader = true
            let Eliminar = await API.ELIMINAR_PROVEEDOR(id)

            if(Eliminar == 'EXITO'){
                this.GetDatos()
            }else{
                this.AlertType = 'error';
                this.Alert = Eliminar
            }
            this.Loader = false
        },

        Modal(){
            this.Iva = false;
            this.FacturaNull = false;
            this.ApiGetFactura = false;
            this.LoaderFactura = false;
            this.AlertType = 'error';
            this.Alert = '';
            this.ProveedorSeleccionado = null;
            this.BodegaSeleccionada = null;
            this.Observaciones = '';
            this.Folio = '';
            this.ProductosRegistrados = [{
                CodigoImportadora: null,
                Descripcion: null,
                Cantidad: 1,
                PrecioImportadora: 0,
            }],
            this.PrecioTotal = 0;
            //Ingrese los datos por defecto
            this.$refs.formCrear.resetValidation();
            this.dialogCrear = true;
        },
        
        async Crear(){

        this.ProductosRegistrados = this.ProductosRegistrados.filter( (e, a) => {
           if(!e.CodigoImportadora){}else{ return e } 
        })

        setTimeout(async () => {
          if(this.$refs.formCrear.validate()){
            this.Loader = true;
            this.BotonLoader = true;
            if(this.ProductosRegistrados.length == 0){
                this.AlertType = 'error';
              return this.Alert = 'NO PUEDES ENVIAR UN REGISTRO VACIO.'
            }else if(this.Folio == ''){
              this.AlertType = 'error';
              return this.Alert = 'Ingrese Folio';
            }

            let Json = {
                //Ingrese los datos para crear
                ProveedorSeleccionado: this.ProveedorSeleccionado,
                Observaciones: this.Observaciones,
                Folio: this.Folio,
                rut: this.ProveedorSeleccionado.rut,
                dv: this.ProveedorSeleccionado.dv,
                iva: this.Iva,
                razon_social: this.ProveedorSeleccionado.razon_social,
                giro: this.ProveedorSeleccionado.giro,
                ProductosRegistrados: this.ProductosRegistrados,
                PrecioTotal: this.PrecioTotal,
                Usuario: this.Usuario.Nombre + ' ' + this.Usuario.Apellido
            }

            var Crear = await API.CREAR_REGISTRO(Json)

            if(Crear == 'EXITO'){
                this.GetDatos()
                this.dialogCrear = false;
                this.BotonLoader = false;
            }else{
                this.Alert = Crear 
            }
            this.Loader = false
            this.BotonLoader = false;
        }
        }, 100);

        },


    FormatPrecio (number) {
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1.';
        let arr = number.toString().split(',');
        arr[0] = arr[0].replace(exp,rep);
        return arr[1] ? arr.join(','): arr[0];
      },
    },

    //Apis
    async created(){
        this.Loader = true
        this.GetDatos();
        this.GetProveedores()
        this.GetBodegas()
        this.Loader = false
    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>