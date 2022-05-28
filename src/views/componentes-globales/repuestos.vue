<template>
    <v-row>
        <v-col v-if="location == '/'" cols="12">
            <p class="mt-5" style="font-size: 1.5rem; font-family: 'Audiowide'">
                Ofertas
                <v-chip
                class="ma-1"
                color="primary"
                outlined
              >
                <v-icon left>
                  mdi-truck
                </v-icon>
                Envios a todo chile
              </v-chip>
            </p>

            <div class="row-yt" v-for="(Producto, i) in Productos" :key="i" @click="ActiveModalRepuestoOfertaEmit(Producto._id, Producto.CodigoImportadora, Producto.CodigoModelo)">
                <div class="col-md-12-yt">
                  <div class="container-img-yt">
                    <div class="cover-img-yt">
                      <img :src="'http://143.198.165.86:3000/repuestos/' + Producto.CurrentImg + '.jpg'" class="img-yt" alt="yt-items" />
                    </div>
                  </div>
                  <div class="separador-yt">
                    <div class="item1-yt">
                      <div class="h4-yt" v-text="Producto.Descripcion"></div>
                      <div class="container-price-yt">
                        <!-- <div class="price-offer" v-text="Producto.PrecioCliente + ' $'"></div> -->
                        <div style="font-size: 12px">
                          <b>MODELO:</b> {{ Producto.Modelo }}
                        </div>
                        <div style="font-size: 12px">
                          <b>AÑOS:</b> {{ Producto.AñoI }} al {{ Producto.AñoT }}
                        </div>
                        <div style="font-size: 12px" v-if="Producto.Retiro == true">
                          <v-chip
                          class="ma-0"
                          color="orange"
                          outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
                        >
                          <v-icon left>
                            mdi-store
                          </v-icon>
                          Entrega inmediata
                        </v-chip>
                    
                        </div>
                        <div style="font-size: 12px" v-if="Producto.Retiro == false && Producto.Importadora == 'Mannheim'">
                          <v-chip
                          class="ma-0"
                          color="blue"
                          outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
                        >
                          <v-icon left>
                            mdi-car
                          </v-icon>
                          Despacho en 2 dias habiles
                        </v-chip>
                    
                        </div>
                        <div style="font-size: 12px" v-if="Producto.Retiro == false && Producto.Importadora == 'Refax'">
                          <v-chip
                          class="ma-0"
                          color="blue"
                          outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
                        >
                          <v-icon left>
                            mdi-car
                          </v-icon>
                          Despacho en 2 dias habiles
                        </v-chip>
                    
                        </div>
                        <div style="font-size: 12px" v-if="Producto.Retiro == false && Producto.Importadora == 'Alsacia'">
                          <v-chip
                          class="ma-0"
                          color="blue"
                          outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
                        >
                          <v-icon left>
                            mdi-car
                          </v-icon>
                          Despacho en 2 dias habiles
                        </v-chip>
                    
                        </div>
                        <div style="font-size: 12px" v-if="Producto.Retiro == false && Producto.Importadora == 'Bicimoto'">
                          <v-chip
                          class="ma-0"
                          color="blue"
                          outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
                        >
                          <v-icon left>
                            mdi-car
                          </v-icon>
                          Despacho en 2 dias habiles
                        </v-chip>
                    
                        </div>
                        <div class="price-real">
                          {{ Producto.PrecioCliente + " $" }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </v-col>
        <!-- Ofertas -->
                <v-col v-if="location != '/'" cols="12">
            <p class="mt-5" style="font-size: 1.5rem; font-family: 'Audiowide'">
                Repuestos
                <v-chip
                class="ma-1"
                color="primary"
                outlined
              >
                <v-icon left>
                  mdi-truck
                </v-icon>
                Envios a todo chile
              </v-chip>
            </p>

            <div class="row-yt" v-for="(Producto, i) in Productos" :key="i" @click="ActiveModalRepuesto(Producto._id, Producto.CodigoImportadora)">
                <div class="col-md-12-yt">
                  <div class="container-img-yt">
                    <div class="cover-img-yt">
                      <img :src="'http://143.198.165.86:3000/repuestos/' + Producto.CurrentImg + '.jpg'" class="img-yt" alt="yt-items" />
                    </div>
                  </div>
                  <div class="separador-yt">
                    <div class="item1-yt">
                      <div class="h4-yt" v-text="Producto.Descripcion"></div>
                      <div class="container-price-yt">
                        <!-- <div class="price-offer" v-text="Producto.PrecioCliente + ' $'"></div> -->
                        <div style="font-size: 12px">
                          <b>MARCA:</b> {{ Producto.Marca }}
                        </div>
                        <div style="font-size: 12px">
                          <b>ORIGEN:</b> {{ Producto.Origen }}
                        </div>
                        <div style="font-size: 12px" v-if="Producto.Retiro == true">
                          <v-chip
                          class="ma-0"
                          color="orange"
                          outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
                        >
                          <v-icon left>
                            mdi-store
                          </v-icon>
                          Entrega inmediata
                        </v-chip>
                    
                        </div>
                        <div style="font-size: 12px" v-if="Producto.Retiro == false && Producto.Importadora == 'Mannheim'">
                          <v-chip
                          class="ma-0"
                          color="blue"
                          outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
                        >
                          <v-icon left>
                            mdi-car
                          </v-icon>
                          Despacho en 2 dias habiles
                        </v-chip>
                    
                        </div>
                        <div style="font-size: 12px" v-if="Producto.Retiro == false && Producto.Importadora == 'Refax'">
                          <v-chip
                          class="ma-0"
                          color="blue"
                          outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
                        >
                          <v-icon left>
                            mdi-car
                          </v-icon>
                          Despacho en 2 dias habiles
                        </v-chip>
                    
                        </div>
                        <div style="font-size: 12px" v-if="Producto.Retiro == false && Producto.Importadora == 'Alsacia'">
                          <v-chip
                          class="ma-0"
                          color="blue"
                          outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
                        >
                          <v-icon left>
                            mdi-car
                          </v-icon>
                          Despacho en 2 dias habiles
                        </v-chip>
                    
                        </div>
                        <div style="font-size: 12px" v-if="Producto.Retiro == false && Producto.Importadora == 'Bicimoto'">
                          <v-chip
                          class="ma-0"
                          color="blue"
                          outlined style="font-size: 10px !important; max-height: 1.6rem !important;"
                        >
                          <v-icon left>
                            mdi-car
                          </v-icon>
                          Despacho en 2 dias habiles
                        </v-chip>
                    
                        </div>
                        <div class="price-real">
                          {{ Producto.PrecioCliente + " $" }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </v-col>
    </v-row>
</template>

<script>
import API from "../../api";

export default {
  name: 'repuestos',
  props: ["Productos"],
  data() {
      return {
        location: document.location.pathname,
      }
  },
  methods: {
    ActiveModalRepuesto(id, CodigoImportadora){
        this.$emit('DefinirModeloEmit', )
        this.$emit('ActiveModalRepuestoEmit', id, CodigoImportadora)
    },
    
    ActiveModalRepuestoOfertaEmit(id, CodigoImportadora, CodigoModelo){
      console.log(CodigoModelo)
        this.$emit('DefinirModeloEmit', CodigoModelo)
        this.$emit('ActiveModalRepuestoEmit', id, CodigoImportadora)
    }
  },

  async created() {
  },
}
</script>