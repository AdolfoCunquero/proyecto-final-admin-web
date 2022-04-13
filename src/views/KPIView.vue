<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12 col-md-auto">
          <div class="text-h5">Cantidad de productos por categoria</div>
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col-12 col-md-auto">
          <BarChart :chart-data="categoryPlot" />
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col-12 col-md-auto">
          <div class="text-h5">Cantidad de productos por base de datos</div>
        </div>
      </div>
      <div class="row q-mt-md">
        <div class="col-12 col-md-auto">
          <BarChart :chart-data="databasePlot" />
        </div>
      </div>
    </div>
  </q-page>
</template>


<script>
// @ is an alias to /src
import BarChart from '../components/BarChart'
import { ref } from 'vue'
import axios from 'axios'
import { useQuasar, QSpinnerFacebook } from 'quasar'
//import { QSpinnerFacebook } from 'quasar'

export default {
  name: 'KPIView',
  components: {
    BarChart
  },
  setup () {
    const q = useQuasar();
    let database = localStorage.getItem('selectedDatabase');
    return {
      database,
      leftDrawerOpen: ref(false),
      q,
      datosCargados(){
        if(this.loadingCategory && this.loadingDatabase){
          this.q.loading.hide()
        }
      }
    }
  },
  data(){
    return {
      loadingCategory:false,
      loadingDatabase:false,
      categoryPlot:{
        labels:[],
        datasets:[ { data: [], label:"Categorias", backgroundColor: '#239B56' } ]
      },
      databasePlot:{
        labels:[],
        datasets:[ { data: [], label:"Base de datos", backgroundColor: '#1F618D' } ]
      }
    }
  },
  methods(){
    return {
      
    }
  },
  created(){
    if(this.database == ""){
      this.$router.push({ path: '/database' });
      return;
    }
    

    this.q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'white',
      spinnerSize: 140,
      backgroundColor: 'gray',
      //message: 'Cargando datos...',
      messageColor: 'black'
    })
    
    let $this = this;
    axios.get("/product-group/"+this.database).then(function(data){
      data = data.data;
      $this.categoryPlot.labels = [];
      $this.categoryPlot.datasets[0].data = [];
      data.forEach(item => {
        $this.categoryPlot.labels.push(item.category__name);
        $this.categoryPlot.datasets[0].data.push(item.count);
      });
      $this.loadingCategory=true;
      $this.datosCargados();
    }).catch(function(err){
      console.log(err)
      $this.q.notify({
          type: 'negative',
          message: 'Ocurrio un error al cargar los datos por categoria'
      });
      $this.loadingCategory=true;
      $this.datosCargados();
    })

    axios.get("/product-by-database").then(function(data){
      data = data.data;
      $this.databasePlot.labels = [];
      $this.databasePlot.datasets[0].data = [];
      data.forEach(item => {
        $this.databasePlot.labels.push(item.database);
        $this.databasePlot.datasets[0].data.push(item.payload.products);
      });
      $this.loadingDatabase=true,
      $this.datosCargados();
    }).catch(function(err){
      console.log(err);
      $this.q.notify({
          type: 'negative',
          message: 'Ocurrio un error al cargar los datos por base de datos'
      });
      $this.loadingDatabase=true;
      $this.datosCargados();
    })
  }
}
</script>
