<template>
  <q-page class="flex flex-center">
     <BarChart :chart-data="chartData" />
  </q-page>
</template>

<style>
</style>

<script>

import BarChart from './BarChart'

export default {
  name: 'HelloWorld',
  components: { BarChart },
  data(){
   return {

   }
  },
  computed: {
    chartData() { 
      return {
        labels: [ 'January', 'February', 'March', 'Abril' ],
        datasets: [ { data: [40, 20, 12, 13], label:"Datos", backgroundColor: '#239B56' } ]
      }
    }
  }
}
</script>
