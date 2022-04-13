<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-auto">
         <div style="width: 300px">
            <div class="q-gutter-md">
              <q-select  
                v-model="database" 
                :options="options" 
                label="Seleccionar base de datos"
                emit-value
                map-options />
            </div>
          </div>
      </div>
    </div>

    <div class="row justify-center q-mt-md">
      <div class="col-12 col-md-auto">
        <q-btn push color="indigo" @click="changeDatabase">
          <q-icon left size="3em" name="check" />
          <div>Aceptar</div>
        </q-btn>
      </div>
    </div>
  </div>

</template>

<script>

import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name:"DatabaseView",
  setup () {
    let q = useQuasar();
    return {
      q,
      database: ref(null),
      options: [
        {
          label:"SQL Server",
          value:"sqlserver"
        },
        {
          label:"Postgres",
          value:"postgres"
        },
        {
          label:"MySql",
          value:"mysql"
        }
      ]
    }
  },
  methods:{
    changeDatabase(){
      if(this.database){
        this.q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Base de datos seleccionada correctamente'
        })
        this.$router.push({ path: '/data-entry' });
      }else{
          this.q.notify({
          type: 'negative',
          message: 'Ocurrio un error al seleccionar base de datos'
        });
      }
      localStorage.setItem('selectedDatabase', this.database);
    }
  },
  created(){
    let database = localStorage.getItem('selectedDatabase');
    if(database){
      this.database = database;
    }
  }
}

</script>
