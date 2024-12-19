<template>
  <!-- filtros -->
  <v-container>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <v-text-field
        v-model="searchInput"
        label="Busqueda IDGPS/Modelo/Marca/Placas/Serie"
        required
      ></v-text-field>
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <v-text-field
        v-model="searchStartDate"
        label="Fecha inicio"
        type="date"
        outlined
      ></v-text-field>
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <v-text-field
        v-model="searchEndDate"
        label="Fecha fin"
        type="date"
        outlined
      ></v-text-field>
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <v-btn
        color="primary"
        dark
        @click="search"
      >BUSCAR
      </v-btn>
    </v-col>
    <v-col
      cols="12"
      md="4"
    >
      <v-btn
        color="primary"
        dark
        @click="exportReport"
      >EXPORTAR REPORTE
      </v-btn>
    </v-col>
  </v-row>
  </v-container>
  <!-- Table -->
  <v-card>
  <!-- table -->
  <v-data-table
    :headers="table.headers"
    :items="table.rows"
  >
    <!-- top buttons -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{table.title}}</v-toolbar-title>
      </v-toolbar>
    </template>
    <!-- Action button -->
    <template v-slot:item.actions="{ item }">
      <v-btn v-for="i in item.actions" :key="i.id"
        style="margin: 2px"
        class="ma-2"
        outlined
        fab
        small
        dark
        :color="i.color"
        @click="rowAction(i, item)"
      ><v-icon small>{{i.icon}}</v-icon>
      </v-btn>
    </template>
    <!-- Loading -->
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
  </v-data-table>
  </v-card>
  <!-- Maps -->
  <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        min-width="800"
        prepend-icon="mdi-update"
        text="Ultima ubicación registrada de la unidad"
        title="Ubicación de la unidad"
        persistent :overlay="false"
        transition="dialog-transition"
      >
        <GoogleMap
          :api-key="center.VUE_APP_MAPKEY"
          style="width: 100%; height: 500px"
          :center="center"
          :zoom="10"
        >
          <Marker :options="{ position: center }">
            <InfoWindow>
              <div id="content">
                <h1 id="firstHeading" class="firstHeading">Denver</h1>
                <div id="bodyContent">
                  <p>
                    Denver is a consolidated city and county, the capital, and most
                    populous city of the U.S. state of Colorado
                  </p>
                </div>
              </div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      </v-card>
  </v-dialog>

</template>

<script>
import { unitsService } from "../services"
import { downloadHttpBlobResponse } from '../helpers/fileMannage'
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";

const VUE_APP_MAPKEY = process.env.VUE_APP_MAPSAPI

export default {
  name: "Units",
  components: { GoogleMap, Marker, InfoWindow },
  data: () => ({
    /* Inputs busqueda */
    searchInput: null,
    searchStartDate: null,
    searchEndDate: null,
    /* Table info */
    table: {
        title: 'Unidades',
        headers: [],
        rows: []
    },
    /* Indicador exportar */
    isDownloadReport: false,
    /* Datos maps */
    center: {
      VUE_APP_MAPKEY: VUE_APP_MAPKEY, 
      lat: null, 
      lng: null
    },
    dialog: false
  }),
  created() {
    this.getUnits();
  },
  methods: {
    getUnits(){
      unitsService.units(this.filters)
      .then(r => {
        this.table.title = r.data.data.title;
        this.table.rows = r.data.data.rows;
        this.table.headers = r.data.data.columns
      })
      .catch(e => console.log(e))      
    },
    search(){
      this.getUnits();
    },
    exportReport(){
      this.isDownloadReport = true;
      unitsService.exportUnits(this.filters)
      .then(r => {
        this.isDownloadReport = false;
        downloadHttpBlobResponse(r);
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
      })
    },
    rowAction(i, item){
      this.center.lat = parseInt(item.lat) 
      this.center.lng = parseInt(item.lon)
      this.dialog = true;
    }
  },
  computed: {
    filters(){
      let params = "?";
      /* Filtro busqueda */
      if (this.searchInput) {
        params += `busqueda=${this.searchInput}`
      }
      /* Filtro fecha inocio */
      if (this.searchStartDate) {
        params != '?' ? params += '&' : params;
        params += `start_date=${this.searchStartDate}`
      }
      /* Filtro fecha fin */
      if (this.searchEndDate) {
        params != '?' ? params += '&' : params;
        params += `end_date=${this.searchEndDate}`
      }
      /* Indicador exportar */
      if (this.isDownloadReport) {
        params != '?' ? params += '&' : params;
        params += `isExportReport=${this.isDownloadReport}`
      }
      return params;
    },
  }
}
</script>