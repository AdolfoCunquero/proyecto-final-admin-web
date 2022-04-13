<template>
  <div class="q-pa-md">
    <div class="row">
        <div class="col-12 col-md-auto">
            <div class="q-gutter-sm">
                <q-btn color="primary" icon="add" label="Nuevo" @click="addNewRow" />
            </div>
            
        </div>
    </div>
    <div class="row justify-center q-mt-md">
        <div class="col-12">
            <q-table
                title="Datos ingresados"
                :rows="products"
                :columns="columns"
                row-key="id"
                :loading="loadingData"
                no-data-label="Cargando..."
                :filter="tableFilter"
            >
                <template v-slot:top-right>
                    <q-input borderless dense debounce="300" v-model="tableFilter" placeholder="Buscar">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                    </q-input>
                </template>
            </q-table>
        </div>
    </div>
  </div>
  <q-dialog
      v-model="newRow"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Agregar nuevo registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="q-pa-md" >
                <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                >
                    <div class="row">
                        <div class="col">
                            <q-select 
                                outlined 
                                v-model="newRecord.category" 
                                :options="categories" 
                                label="Categoria" 
                                :rules="[ val => val != null || 'Seleccione una categoria']"
                                emit-value
                                map-options
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <q-input
                                outlined
                                v-model="newRecord.name"
                                label="Nombre *"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Ingrese un nombre']"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <q-input
                                outlined
                                type="number"
                                v-model="newRecord.quantity"
                                label="Existencia inicial *"
                                lazy-rules
                                :rules="[
                                val => val !== null && val !== '' || 'Ingrese un dato',
                                val => val >= 0 || 'La existencia no puede ser negativa'
                                ]"
                            />
                        </div>
                        
                        <div class="col q-ml-md">
                            <q-input
                                outlined
                                v-model="newRecord.um"
                                label="Unidad de Medida *"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Ingrese una unidad de medida']"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <q-input
                                outlined
                                type="number"
                                v-model="newRecord.purchase_price"
                                label="Precio Compra *"
                                lazy-rules
                                :rules="[
                                val => val !== null && val !== '' || 'Ingrese un dato',
                                val => val >= 0 || 'El precio de compra no puede ser negativa'
                                ]"
                            />
                        </div>
                        <div class="col q-ml-md">
                            <q-input
                                outlined
                                type="number"
                                v-model="newRecord.sale_price"
                                label="Precio Venta *"
                                lazy-rules
                                :rules="[
                                val => val !== null && val !== '' || 'Ingrese un dato',
                                val => val >= 0 || 'El precio de venta no puede ser negativa'
                                ]"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <q-btn label="Guardar" type="submit" color="primary"/>
                            <q-btn label="Cancelar" type="reset" color="red" flat class="q-ml-sm" />
                        </div>
                    </div>
                </q-form>
            </div>
            
        </q-card-section>

        <!-- <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
</template>

<script>
const columns = [
  {
    category: 'category',
    required: true,
    label: 'Categoria',
    align: 'left',
    field: row => row.category.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'name', align: 'left', label: 'Nombre', field: 'name', sortable: true },
  { name: 'um', label: 'Unidad Medida', field: 'um',align: 'left', sortable: true },
  { name: 'purchase_price', label: 'Precio Compra', align: 'left', field: 'purchase_price' ,sortable: true },
  { name: 'sale_price', label: 'Precio Venta', align: 'left', field: 'sale_price',sortable: true  },
  { name: 'quantity', label: 'Existencia', align: 'left', field: 'quantity', sortable: true}
]

import axios from 'axios';
import { useQuasar } from 'quasar'

export default {
  setup () {
    let notify = useQuasar();
    let database = localStorage.getItem('selectedDatabase');
    return {
      columns,
      notify,
      database
    }
  },
  data(){
      return {
        newRow:false,
        tableFilter:"",
        products:[],
        categories:[],
        loadingData:true,
        newRecord:{
            category:null,
            name:"",
            quantity:0,
            um: "",
            purchase_price:0,
            sale_price:0
        }
      }
  },
  methods:{
      addNewRow(){
          this.newRow = true;
      },
      loadData(){
        let $this = this;
        this.loadingData = true;
        axios.get("/product/"+this.database).then(function(data){
            console.log(data.data)
            $this.products = data.data;
            $this.loadingData = false;
        }).catch(function(err){
            console.log(err);
            $this.notify.notify({
                type: 'negative',
                message: 'Ocurrio un error al cargar los articulos'
            });
        })
      },
      loadCategories(){
        let $this = this;
        this.categories = [];
        axios.get("/category/"+this.database).then(function(data){
            data = data.data;
            data.forEach(item => {
                $this.categories.push({
                    label:item.name,
                    value:item.id
                })
            });
        }).catch(function(err){
            console.log(err);
            $this.notify.notify({
                type: 'negative',
                message: 'Ocurrio un error al cargar las categorias'
            });
        })
      },
      onSubmit(){
        let $this = this;
        console.log($this.newRecord)
        axios.post("/product/"+this.database, $this.newRecord).then(function(res){
            $this.loadData();
            $this.notify.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Registro guardado correctamente'
            })
            console.log(res);
            $this.newRecord ={
                category:null,
                name:"",
                quantity:0,
                um: "",
                purchase_price:0,
                sale_price:0
            }
            $this.newRow = false;
        }).catch(function(err){
            console.log(err);
            $this.notify.notify({
                type: 'negative',
                message: 'Ocurrio un error al guardar el articulo'
            });
        })
      },
      onReset(){
          this.newRow = false;
          this.newRecord ={
            category:1,
            name:"",
            quantity:0,
            um: "",
            purchase_price:0,
            sale_price:0
        }
      }
  },
  created(){
      this.loadData();
      this.loadCategories();
      if(this.database == ""){
          this.$router.push({ path: '/database' });
      }
      console.log(this.database)
  }
}
</script>