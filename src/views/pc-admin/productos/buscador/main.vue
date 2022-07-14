<style scoped>
    @import './main.css';
</style>
<template>
    <div>
        <h4>Buscar productos en importadora</h4>
        <div class="subtitle-1 mt-3 mb-3 text--secondary">Aqui buscar los productos disponibles en la importadora, usted podra usar el buscador para realizar una busqueda exacta.</div>
                      <v-alert class="mt-2 mb-2 center"
              dense
              outlined
              type="info"
              >
        <strong>Sugerencia de busqueda "Descripcion Marca y Modelo". Ejmeplo: EMPAQUETADURA CULATA CHEVROLET AVEO</strong>
        </v-alert>
        <v-divider></v-divider>
 
        <v-row>
            <v-col cols="8">
                <v-text-field :rules="rules" v-model="Solicitud" placeholder="Amortiguador Chevrolet Sail 1.4" v-on:keyup.enter="onEnter"></v-text-field>
            </v-col>
            <v-col cols="2" style="align-self: center;margin-top: 0.5rem;">
                <v-select
                  v-model="ImportadoraSeleccionada"
                  :items="['Todas', 'Bodega', 'Refax', 'Alsacia', 'Mannheim', 'Bicimoto', 'Noriega', 'CuatroRuedas', 'Gabtec']"
                  label="Importadora"
                  prepend-icon="mdi-panorama-sphere"
                  persistent-hint
                  single-line
                  dense></v-select>
            </v-col>
            <v-col cols="2">
                  <v-checkbox v-model="OcultarAgotados" @change="check($event)">
                    <template v-slot:label>
                      <div>
                        Ocultar Agotados
                      </div>
                    </template>
                  </v-checkbox>
            </v-col>
        </v-row>
        
                <v-divider></v-divider>



            <v-col cols="12" v-if="Proceso != ''">
              <v-alert class="mt-2 mb-2 center"
              dense
              outlined
              type="success"
              >
                 <strong>{{ Proceso }}</strong>
              </v-alert>
            </v-col>

    <div style="margin-top: 1rem" v-if="Chilerepuestos == '' && Refax == '' && Alsacia == '' && Bicimoto == '' && Mannheim == ''  && Noriega == ''  && CuatroRuedas == '' && Gabtec == '' && Loader == false"> 
        
        <p class="center" style="margin-top: 1rem">{{Msg}}</p>

    </div>

    <div v-else-if="Loader == true">
        <div class="center">
            <img src="http://143.198.165.86:3000/etc/loader.gif" alt="Cargando...">
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
      <v-tab href="#tab-1" v-if="Chilerepuestos.length != 0">
        Bodega
      </v-tab>
      <v-tab href="#tab-2" v-if="Refax.length != 0">
        Refax 
      </v-tab>

      <v-tab href="#tab-3" v-if="Alsacia.length != 0">
        Alsacia
      </v-tab>

      <v-tab href="#tab-4" v-if="Bicimoto.length != 0">
        Bicimoto
      </v-tab>

      <v-tab href="#tab-5" v-if="Mannheim.length != 0">
        Mannheim
      </v-tab>

      <v-tab href="#tab-6" v-if="Noriega.length != 0">
        Noriega
      </v-tab>
      
      <v-tab href="#tab-7" v-if="CuatroRuedas.length != 0">
        CuatroRuedas
      </v-tab>

      <v-tab href="#tab-8" v-if="Gabtec.length != 0">
        Gabtec
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 8"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
            <v-card-text v-if="i == 1">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Imagen
                      </th>
                      <th class="text-left">
                        Sku
                      </th>
                      <th class="text-left">
                        Sku 2
                      </th>
                      <th class="text-left">
                        Descripcion
                      </th>
                      <th class="text-left">
                        Marca
                      </th>
                      <th class="text-left">
                        Modelo
                      </th>
                      <th class="text-left">
                        Fabricante
                      </th>
                      <th class="text-left">
                        Origen
                      </th>
                      <th class="text-left">
                        Precio
                      </th>
                      <th class="text-left">
                        Stock
                      </th>
                      <th class="text-left">
                        Ubicación
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="Producto, i in Chilerepuestos"
                      :key="i"
                    >
                      <td><img :src="'https://chilerepuestos.com/img/productos/' + Producto.CodigoImportadora  + '-preview.jpg'" width="50px"></td>
                      <td>{{ Producto.CodigoImportadora }}</td>
                      <td>{{ Producto.CodigoProducto }}</td>
                      <td>{{ Producto.Descripcion + ' ' + Producto.DatosAdicionales }}</td>
                      <td>{{ Producto.MarcaVehiculo[0] }}</td>
                      <td>{{ Producto.Modelo + ' ' + Producto.AñoI + ' ' + Producto.AñoT }}</td>
                      <td>{{ Producto.Marca }}</td>
                      <td>{{ Producto.Origen }}</td>
                      <td>{{ Producto.PrecioCliente }}</td>
                      <td>{{ Producto.StockCH }}</td>
                      <td>{{ Producto.Ubicacion }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            
            </v-card-text>
            <v-card-text v-if="i == 2">
                
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Imagen
          </th>
          <th class="text-left">
            Sku
          </th>
          <th v-if="Refax[0].Oem">
            Oem
          </th>
          <th class="text-left" v-if="!Refax[0].Oem">
            Marca
          </th>
          <th class="text-left" v-if="!Refax[0].Oem">
            Modelo
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Fabricante
          </th>
          <th class="text-left">
            Origen
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Refax"
          :key="i"
        >
          <td><a :href="'https://img.refaxchile.cl:9092/FOTOGRAFIAS/' + Producto.Sku + '/' + Producto.Sku + 'A.jpg'" target="_blank"><img :src="'https://img.refaxchile.cl:9092/FOTOGRAFIAS/' + Producto.Sku + '/' + Producto.Sku + 'A.jpg'" width="50px"></a></td>
          <td>{{ Producto.Sku }}</td>
          <td v-if="Producto.Oem"><ul v-html="Producto.Oem"></ul></td>
          <td v-if="!Producto.Oem">{{ Producto.Marca }}</td>
          <td v-if="Producto.Modelo != '' && Producto.Modelo && !Producto.Oem" :style=" i != 0? 'border-top: 2px solid red' : ''">{{ Producto.Modelo }} {{ Producto['AñoI'] }} - {{ Producto['AñoT'] }}</td>
          <td v-else-if="!Producto.Oem"></td>
          <td>{{ Producto.Producto }} {{ Producto.Descripcion }}</td>
          <td>{{ Producto.MARCA }}</td>
          <td>{{ Producto.Origen }}</td>
          <td>{{ MargenPrecio(Producto.PrecioImportadora) }}</td>
          <td>{{ Producto.Stock }}</td>
          <td v-if="Producto.Stock == 'DISPONIBLE' || Producto.Stock == 'Disponible'">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="VerAplicacionesR(Producto)">
                    <v-list-item-title>Ver Aplicaciones</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
         <td v-else></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
            
            <v-card-text v-if="i == 3">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Marca
          </th>
          <th class="text-left">
            Modelo
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Fabricante
          </th>
          <th class="text-left">
            Origen
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Alsacia"
          :key="i"
        >
          <td @click="ModalAlsacia(Producto.Sku)" style="color: blue; cursor: pointer;">{{ Producto.Sku }}</td>
          <td>{{ Producto.Marca }}</td>
          <td v-if="Producto.Modelo != ''" :style=" i != 0? 'border-top: 2px solid red' : ''">{{ Producto.Modelo }} {{ Producto['AñoI'] }} - {{ Producto['AñoT'] }}</td>
          <td v-else></td>
          <td>{{ Producto.Producto }} {{ Producto.Descripcion }}</td>
          <td>{{ Producto.MARCA }}</td>
          <td>{{ Producto.Origen }}</td>
          <td>{{ MargenPrecio(Producto.Precio) }}</td>
          <td>{{ Producto.Stock }}</td>
          <td v-if="Producto.Stock != ''">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
         <td v-else></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
            <v-card-text v-if="i == 4">
                
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Oem
          </th>
          <th class="text-left">
            Marca
          </th>
          <th class="text-left">
            Modelo
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Origen
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Bicimoto"
          :key="i"
        >
          <td>{{ Producto.Sku }}</td>
          <td>{{ Producto.Oem }}</td>
          <td>{{ Producto.Marca }}</td>
          <td>{{ Producto.Modelo }}</td>
          <td>{{ Producto.Descripcion }}</td>
          <td>{{ Producto.Origen }}</td>
          <td>{{ MargenPrecio(Producto.PrecioImportadora) }}</td>
          <td>{{ Producto.Stock }}</td>
          <td v-if="Producto.Stock != '0'">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
         <td v-else></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
            <v-card-text v-if="i == 5">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Imagen
          </th>
          <th class="text-left">
            Oem
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Fabricante
          </th>
          <th class="text-left">
            Origen
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
          v-for="Producto, i in Mannheim"
          :key="i"
        >
          <td><a :href="'http://200.73.35.244:8080/webclient/images/' + Producto.Oem + '.jpg'" target="_blank"><img :src="'http://200.73.35.244:8080/webclient/images/' + Producto.Oem + '.jpg'" width="50px"></a></td>
          <td>{{ Producto.Oem }}</td>
          <td>{{ Producto.Descripcion }}</td>
          <td>{{ Producto.Fabricante  }}</td>
          <td>{{ Producto.Origen }}</td>
          <td>{{ MargenPrecioMannheim(Producto.PrecioImportadora) }}</td>
          <td>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="VerAplicacionesM(Producto)">
                    <v-list-item-title>Ver Aplicaciones</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

            </v-card-text>
            <v-card-text v-if="i == 6">
                
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Marca
          </th>
          <th class="text-left">
            Modelo
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Origen
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Noriega"
          :key="i"
        >
          <td>{{ Producto.Sku }}</td>
          <td>{{ Producto.Marca }}</td>
          <td v-if="Producto.Modelo != '' && Producto.Modelo" :style=" i != 0? 'border-top: 2px solid red' : ''">{{ Producto.Modelo }} {{ Producto['Año'] }}</td>
          <td v-else></td>
          <td>{{ Producto.Producto }} {{ Producto.Descripcion }}</td>
          <td>{{ Producto.Origen }}</td>
          <td>{{ MargenPrecio(Producto.Precio) }}</td>
          <td>{{ Producto.Stock }}</td>
          <td v-if="Producto.Stock != ''">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
         <td v-else></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-card-text>
            <v-card-text v-if="i == 7">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Codigo
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Stock
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
          v-for="Producto, i in CuatroRuedas"
          :key="i"
        >
          <td>{{ Producto.Sku }}</td>
          <td>{{ Producto.Descripcion }}</td>
          <td>{{ Producto.Stock }}</td>
          <td>{{ MargenPrecio(Producto.Precio) }}</td>
          <td>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

            </v-card-text>
            <v-card-text v-if="i == 8">
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Imagen
          </th>
          <th class="text-left">
            Sku
          </th>
          <th class="text-left">
            Marca
          </th>
          <th class="text-left">
            Modelo
          </th>
          <th class="text-left">
            Posicion
          </th>
          <th class="text-left">
            Descripcion
          </th>
          <th class="text-left">
            Fabricante
          </th>
          <th class="text-left">
            Sotck
          </th>
          <th class="text-left">
            Precio
          </th>
          <th class="text-left">
            Accion
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Producto, i in Gabtec"
          :key="i"
        >
          <td><a :href="'https://www.gabtec.cl./' + Producto.Img" target="_blank"><img :src="'https://www.gabtec.cl./' + Producto.Img" width="50px"></a></td>
          <td>{{ Producto.CodigoImportadora }}</td>
          <td>{{ Producto.Marca }}</td>
          <td>{{ Producto.Modelo }} {{ Producto.AñoI }} - {{ Producto.AñoT}}</td>
          <td>{{ Producto.Posicion }}</td>
          <td>{{ Producto.Descripcion }}</td>
          <td>{{ Producto.Fabricante }}</td>
          <td>{{ Producto.Stock }}</td>
          <td>{{ MargenPrecio(Producto.Precio) }}</td>
          <td>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-1"
              outlined
              fab
              small
              color="grey"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
              </template>
                <v-list>
                  <v-list-item link @click="CrearProducto(Producto)">
                    <v-list-item-title>Crear Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="PedirProducto(Producto, 'Refax')">
                    <v-list-item-title>Pedir Producto</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="VerEnImportadora(Producto, 'Refax')">
                    <v-list-item-title>Ver en Importadora</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
         </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

            </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </div>


    <!-- Modal Aplicaciones-->

        <v-dialog
      v-model="dialogMannheim"
      width="1300"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ ProductoMannheim.Oem }} - {{ ProductoMannheim.Descripcion }} Aplicaciones:
        </v-card-title>

 <v-card-text>
  <v-simple-table class="mt-2">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Marca
          </th>
          <th class="text-left">
            Modelo
          </th>
          <th class="text-left">
            SubModelo
          </th>
          <th class="text-left">
            Año
          </th>
          <th class="text-left">
            Motor
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="Modelo, i in AplicacionesM"
          :key="i"
        >
          <td>{{ Modelo.marca }}</td>
          <td>{{ Modelo.modelo }}</td>
          <td>{{ Modelo.submodelo }}</td>
          <td>{{ Modelo.ano }}</td>
          <td>{{ Modelo.motor }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
          
            

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="secondary"
            text
            @click="dialogMannheim = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        


        <v-dialog
      v-model="dialogRefax"
      width="1300"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ ProductoRefax.Sku }} - {{ ProductoRefax.Descripcion }} Aplicaciones:
        </v-card-title>

 <v-card-text>
 
      <table v-html="AplicacionesR"></table>
          
            

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="secondary"
            text
            @click="dialogRefax = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


        <v-dialog
      v-model="dialogAlsacia"
      width="1300"
    >
      <v-card>
 <v-card-text>
 

        <body v-html="AlsaciaHtml">
        </body>

            

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="secondary"
            text
            @click="dialogAlsacia = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


<!-- Modal Crear Producto -->
    <v-dialog
      v-model="dialogCrearProducto"
      width="1300"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Crear Nuevo Producto
        </v-card-title>

        <v-card-text v-if="tab == 1">

        </v-card-text>

        <v-card-text v-if="tab == 2">

        </v-card-text>

        <v-card-text v-if="tab == 3">

        </v-card-text>

        <v-card-text v-if="tab == 4">

        </v-card-text>

        <v-card-text v-if="tab == 5">

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="secondary"
            text
            @click="dialogCrearProducto = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </div>
</template>


<script>
import API from '../../../../api.js'
import { FormatearPrecio } from '../../../global-function/formatear-precio.js';
    export default {
    name: 'api-importadora',
    props: [],
    //Variables
    data: () => ({
        Loader: true,
        ImportadoraSeleccionada: 'Todas',
        OcultarAgotados: true,
        BestPrice: [],
        Proceso: '',
        AlsaciaHtml: `
        <div class="center">
            <img src="http://143.198.165.86:3000/etc/loader.gif" alt="Cargando...">
        </div>`,
        dialogCrearProducto: false,
        dialogRefax: false,
        dialogAlsacia: false,
        dialogMannheim: false,
        AplicacionesM: [],
        AplicacionesR: [],
        Chilerepuestos: [],
        CuatroRuedas: [],
        CuatroRuedasByPass: [{
          Descripcion: ''
        }],
        Refax: [],
        Alsacia: [],
        Bicimoto: [],
        Mannheim: [],
        Noriega: [],
        Gabtec: [],
        Msg: 'Realice una busqueda para empezar.',
        ProductoRefax: {
          Descripcion: '',
          Sku: ''
        },
        ProductoMannheim: {
          Descripcion: '',
          Oem: ''
        },
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

       async ModalAlsacia(Codigo){
        this.AlsaciaHtml = `
        <div class="center">
            <img src="http://143.198.165.86:3000/etc/loader.gif" alt="Cargando...">
        </div>`,
        this.dialogAlsacia = true
        let AlsaciaHtml = await API.POST_CONSULTARALSACIA(Codigo);
        this.AlsaciaHtml = AlsaciaHtml.toString().trim().replace('https://www.repuestosalsacia.com/alsacia/public/layouts/images/online_icon_right@2x.png', '').replace('https://www.repuestosalsacia.com/alsacia/public/layouts/images/online_icon_right@2x.png', '').replace('padding: 5px 0 0;', 'display: none;').replaceAll('placeholder="Buscar..."', 'style="display: none;"').replaceAll('<img', '<img width="50px"').replaceAll('th scope="col"', 'th scope="col" style="color:black"');
       },

        check(evt){
          this.OcultarAgotados = evt;
        },

        MargenPrecio(Precio){

          let NewPrecio = Precio.replaceAll(' ', '').replaceAll('$', '').replaceAll('.', '').replaceAll(',', '').replaceAll('Precio:', '');
          NewPrecio = parseInt(NewPrecio) * 2;

          if(!NewPrecio){
            return Precio;
          }else{
            return FormatearPrecio(NewPrecio);
          }

        },


      MargenPrecioMannheim(Precio){

          Precio = Math.round(parseInt(Precio.replaceAll(' ', '').replaceAll('$', '').replaceAll('.', '').replaceAll(',', '')) * 1.70);

          if(Precio == NaN){
            return 'Oferta';
          }else{
            return FormatearPrecio(Precio);
          }
      },


        CrearProducto(Producto){

        },

        async VerAplicacionesR(Producto){
            this.dialogRefax = true;

          this.AplicacionesR = `<table style="margin-top: 1rem">
                                    <thead>
                                      <th style="background-color: black;">Marca</th>
                                      <th style="background-color: black;">Modelo</th>
                                      <th style="background-color: black;">Años</th>            
                                    </thead>
                                             <tbody>
                                                <tr>
                                                  <td>
                                                    Cargando...
                                                  </td>
                                                  <td>
                                                    Cargando...
                                                  </td>
                                                  <td>
                                                    Cargando...
                                                  </td>
                                                </tr>
                                             </body>
                                  </table>`

            this.ProductoRefax = Producto;
            
            let AplicacionesR = await API.POST_APLICACIONESR(Producto.Sku);
            
            this.AplicacionesR = `<table style="margin-top: 2rem">
                                    <thead>
                                      <th style="background-color: black;">Marca</th>
                                      <th style="background-color: black;">Modelo</th>
                                      <th style="background-color: black;">Años</th>            
                                    </thead>
                                             ${AplicacionesR.replaceAll('ul', 'tbody').replaceAll('li', 'tr').replaceAll('span', 'td').replaceAll('small', 'td').replaceAll('<strong></strong>', '')}
                                  </table>`

        },

        async VerAplicacionesM(Producto){
      
            this.dialogMannheim = true;

            this.AplicacionesM = [];

            this.ProductoMannheim = Producto;
            
            let AplicacionesM = await API.POST_APLICACIONESM(Producto.Aplicacion);
            
            this.AplicacionesM = AplicacionesM.aplicaciones;

        },


        onEnter(){
            this.Buscar();
        },

        async Buscar(){

            if(this.Solicitud == ''){
              return alert('No puedes realizar una busqueda vacia.')
            }

            this.Loader = true;


            this.Refax = [];
            this.Alsacia = [];
            this.Bicimoto = [];
            this.Mannheim = [];
            this.Noriega = [];
            this.CuatroRuedas = [];
            this.Chilerepuestos = [];
            this.Gabtec = []


            if(this.ImportadoraSeleccionada == 'Todas'){

            this.Proceso = 'Buscando en Bodega...';

            this.Chilerepuestos = await API.POST_API_CHILEREPUESTOS(this.Solicitud);

            if(this.OcultarAgotados == true){
              this.Chilerepuestos = this.Chilerepuestos.filter(e => {
                if(e.StockCH != 0){
                  return e;
                }
              })
            }

            if(this.Chilerepuestos.length != 0){
              this.Loader = false;
            }


            this.Proceso = 'Buscando en refax...';

            let Refax = await API.POST_API_REFAX(this.Solicitud);

            if(Refax == 'Error al iniciar sesion'){
              this.Proceso = 'Actualizando Acceso a las importadoras...';
              await API.POST_REFAX_AUTH();


            let CuatroRuedas = await API.POST_API_CUATRORUEDAS('kikikaka');

            this.CuatroRuedas = CuatroRuedas || [{ Descripcion: '' }];


            if(this.OcultarAgotados == true){
              this.CuatroRuedas = this.CuatroRuedas.filter(e => {
                if(e.Stock != 'NO DISPONIBLE'){
                  return e;
                }
              })
            }


              this.CuatroRuedasByPass = this.CuatroRuedas || [{ Descripcion: '' }];
            
              this.Proceso = 'Buscando en refax...';

              Refax = await API.POST_API_REFAX(this.Solicitud);
            }




            Refax[0].pop();
            Refax[0].pop();

            this.Refax = Refax[0];

            this.Refax = this.Refax.map((e) => {
              e.Precio = e.PrecioImportadora
              return e;
            });


            if(this.OcultarAgotados == true){
              this.Refax = this.Refax.filter((e) => {
                if(e.Stock != '0' || e.Marca != ""){
                  return e;
                }
              })
            }


            if(this.Refax.length != 0){
              this.Loader = false;
            }

            
            this.Proceso = 'Buscando en alsacia...';

            let Alsacia = await API.POST_API_ALSACIA(this.Solicitud);

            this.Alsacia = Alsacia[0];
            
            if(this.OcultarAgotados == true){
              this.Alsacia = this.Alsacia.filter((e)=> {
                if(e.Stock != '' || e.Marca != ""){
                  return e;
                }
              })
            }

            if(this.Alsacia.length != 0){
              this.Loader = false;
            }
            

            if(process.env.NODE_ENV == 'development'){
            this.Proceso = 'Buscando en bicimoto...';

            let Bicimoto = await API.POST_API_BICIMOTO(this.Solicitud);
            
            if(Bicimoto[0].Descripcion == '' || process.env.NODE_ENV == 'production'){
                Bicimoto = [];
            }

            this.Bicimoto = Bicimoto;

            this.Bicimoto = this.Bicimoto.map((e) => {
              e.Precio = e.PrecioImportadora
              return e;
            });


            if(this.OcultarAgotados == true){
              this.Bicimoto = this.Bicimoto.filter(e => {
                if(e.Stock != '0'){
                  return e;
                }
              })
            }


            if(this.Bicimoto.length != 0){
              this.Loader = false;
            }

            }

            this.Proceso = 'Buscando en mannheim...';

            let Mannheim = await API.POST_API_MANNHEIM(this.Solicitud);
            
            this.Mannheim = Mannheim;

            this.Mannheim = this.Mannheim.map((e) => {
              e.Precio = e.PrecioImportadora
              return e;
            });

            if(this.Mannheim.length != 0){
              this.Loader = false;
            }

            this.Proceso = 'Buscando en noriega...';

            let Noriega = await API.POST_API_NORIEGA(this.Solicitud);
            
            this.Noriega = Noriega;

            if(this.OcultarAgotados == true){
              this.Noriega = this.Noriega.filter(e => {
                if(e.Stock != '' || e.Marca != ""){
                  return e;
                }
              })
            }


            if(this.Noriega.length != 0){
              this.Loader = false;
            }


            this.Proceso = 'Buscando en CuatroRuedas...'

            let CuatroRuedas = await API.POST_API_CUATRORUEDAS(this.Solicitud);

            this.CuatroRuedas = CuatroRuedas || [{ Descripcion: '' }];

            if(this.OcultarAgotados == true){
              this.CuatroRuedas = this.CuatroRuedas.filter(e => {
                if(e.Stock != 'NO DISPONIBLE'){
                  return e;
                }
              })
            }

            if(this.CuatroRuedas.length != 0){
                if(this.CuatroRuedas[0].Descripcion == this.CuatroRuedasByPass[0].Descripcion){
                  this.CuatroRuedas = [];
                }else{
                  this.CuatroRuedasByPass = this.CuatroRuedas || [{ Descripcion: '' }];
                  this.Loader = false;
                }
            }

            // aqui}
            this.Proceso = 'Buscando en Gabtec...'

            let Gabtec = await API.POST_API_GABTEC(this.Solicitud);

            Gabtec = Gabtec.map(e => {
              e.Stock = 'Consultado...';
              e.Precio = '0';
              return e;
            })

            this.Gabtec = Gabtec;


            if(this.Gabtec.length != 0){
                this.Loader = false;
                for (let i = 0; i < Gabtec.length; i++) {
                  this.Proceso = 'Consultando Stock y Precio en Gabtec... ' + (i + 1) + ' de '  + Gabtec.length;

                  if(Gabtec[i].Precio == '0'){
                        var RequestData = await API.POST_CONSULTARGABTEC(Gabtec[i].CodigoImportadora);
                          Gabtec.map(e => {
                            if(e.CodigoImportadora == Gabtec[i].CodigoImportadora){
                                e.Stock = RequestData.Stock.replace('Stock: ', '');
                                e.Precio = RequestData.Precio;
                            }
                            return e;
                          })
                  }

                }
                this.Gabtec = Gabtec;
            }

            }else if(this.ImportadoraSeleccionada == 'Bodega'){
            
            this.Proceso = 'Buscando en Bodega...';

            this.Chilerepuestos = await API.POST_API_CHILEREPUESTOS(this.Solicitud);

            if(this.OcultarAgotados == true){
              this.Chilerepuestos = this.Chilerepuestos.filter(e => {
                if(e.StockCH != 0){
                  return e;
                }
              })
            }

            if(this.Chilerepuestos.length != 0){
              this.Loader = false;
            }


            }else if(this.ImportadoraSeleccionada == 'Refax'){

            this.Proceso = 'Buscando en refax...';

            let Refax = await API.POST_API_REFAX(this.Solicitud);


            Refax[0].pop();
            Refax[0].pop();

            this.Refax = Refax[0];

            if(this.OcultarAgotados == true){
              this.Refax = this.Refax.filter(e => {
                if(e.Stock != '0' || e.Marca != ""){
                  return e;
                }
              })
            }


            if(this.Refax.length != 0){
              this.Loader = false;
            }


            }else if(this.ImportadoraSeleccionada == 'Alsacia'){

              
            
            this.Proceso = 'Buscando en alsacia...';

            let Alsacia = await API.POST_API_ALSACIA(this.Solicitud);

            this.Alsacia = Alsacia[0];
            
            if(this.OcultarAgotados == true){
              this.Alsacia = this.Alsacia.filter(e => {
                if(e.Stock != ''  || e.Marca != ""){
                  return e;
                }
              })
            }

            if(this.Alsacia.length != 0){
              this.Loader = false;
            }
            
              
            }else if(this.ImportadoraSeleccionada == 'Mannheim'){

            this.Proceso = 'Buscando en mannheim...';

            let Mannheim = await API.POST_API_MANNHEIM(this.Solicitud);
            
            this.Mannheim = Mannheim;

            if(this.Mannheim.length != 0){
              this.Loader = false;
            }

            }else if(this.ImportadoraSeleccionada == 'Noriega'){

            this.Proceso = 'Buscando en noriega...';

            let Noriega = await API.POST_API_NORIEGA(this.Solicitud);
            
            this.Noriega = Noriega;

            if(this.OcultarAgotados == true){
              this.Noriega = this.Noriega.filter(e => {
                if(e.Stock != '' || e.Marca != ""){
                  return e;
                }
              })
            }


            if(this.Noriega.length != 0){
              this.Loader = false;
            }

            }else if(this.ImportadoraSeleccionada == 'CuatroRuedas'){

            this.Proceso = 'Buscando en CuatroRuedas...'

            let CuatroRuedas = await API.POST_API_CUATRORUEDAS(this.Solicitud);

            this.CuatroRuedas = CuatroRuedas;

            if(this.OcultarAgotados == true){
              this.CuatroRuedas = this.CuatroRuedas.filter(e => {
                if(e.Stock != 'NO DISPONIBLE'){
                  return e;
                }
              })
            }

            if(this.CuatroRuedas.length != 0){
                if(this.CuatroRuedas[0].Descripcion == this.CuatroRuedasByPass[0].Descripcion){
                  this.CuatroRuedas = [];
                }else{
                  this.CuatroRuedasByPass = this.CuatroRuedas;
                  this.Loader = false;
                }
            }
            }else if(this.ImportadoraSeleccionada == 'Gabtec'){

            this.Proceso = 'Buscando en Gabtec...'

            let Gabtec = await API.POST_API_GABTEC(this.Solicitud);

            Gabtec = Gabtec.map(e => {
              e.Stock = 'Consultado...';
              e.Precio = '0';
              return e;
            })


            this.Gabtec = Gabtec;


            if(this.Gabtec.length != 0){
                this.Loader = false;
                for (let i = 0; i < Gabtec.length; i++) {
                  this.Proceso = 'Consultando Stock y Precio en Gabtec... ' + (i + 1) + ' de '  + Gabtec.length;

                  if(Gabtec[i].Precio == '0'){
                        var RequestData = await API.POST_CONSULTARGABTEC(Gabtec[i].CodigoImportadora);
                          Gabtec.map(e => {
                            if(e.CodigoImportadora == Gabtec[i].CodigoImportadora){
                                e.Stock = RequestData.Stock;
                                e.Precio = RequestData.Precio;
                            }
                            return e;
                          })
                  }

                }
                this.Gabtec = Gabtec;
            }

            }


            var Cantidad = this.Bicimoto.length + this.Refax.length + this.Mannheim.length + this.Alsacia.length + this.Noriega.length + this.CuatroRuedas.length + this.Chilerepuestos.length;

            if(Cantidad == 0){
                this.Msg = 'No hay resultados.'
            }
            
            this.Proceso = '';
            this.Loader = false;


      

            // if(Datos.Refax == "ERROR : java.lang.Exception: Logica.ProductosLogica.BuscarArticuloGlosa5: null"){
            //     let Go = await API.POST_REFAX_AUTH();
            //     let Datos = await API.POST_API_IMPORTADORA(this.Solicitud);
            //     this.Loader = false;
            // }else{
            //     this.Refax = Datos.Refax.replaceAll('style', 'stylo').replaceAll('<th stylo="width: 40px;">Comprar</th>', '<th style="display: none;">Comprar</th>')
            //     this.Alsacia = Datos.Alsacia.replaceAll('style', 'stylo').replaceAll('<th stylo="width: 40px;" scope="col"></th>', '<th style="display:none;" scope="col"></th>').replaceAll('button type="submit"', 'button style="display: none;"').replaceAll('stylo="width: 40px;"', 'style="display: none;"').replaceAll('class="tobuy"', 'style="display: none;"').replaceAll('span stylo="font-size: 10px;"', 'span style="display: none;"');
            //     this.Loader = false;
            // }

        }

    },

    //Apis
    async created(){
        this.Loader = false;

      let CuatroRuedas = await API.POST_API_CUATRORUEDAS('kikikaka')
      await API.POST_NORIEGA_AUTH();

        if(process.env.NODE_ENV == 'development'){
           await API.POST_BICIMOTO_AUTH();
        }

      this.CuatroRuedasByPass = CuatroRuedas;

      if(this.OcultarAgotados == true){
        this.CuatroRuedas = this.CuatroRuedas.filter(e => {
          if(e.Stock != 'NO DISPONIBLE'){
            return e;
          }
        })
      }

    },

    //WindowsOnready
    mounted(){
    // console.log(this.$el.querySelectorAll('a'));
    }

}
</script>