
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar class="bg-primary text-white">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          {{currentRouteName}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Menu Principal</q-item-label>
        <q-item clickable tag="a" to="/database">
          <q-item-section avatar>
            <q-icon name="storage" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-left">Base de datos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/data-entry">
          <q-item-section avatar>
            <q-icon name="summarize" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-left">Ingeso de datos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/kpi">
          <q-item-section avatar>
            <q-icon name="pie_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-left">KPI</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import { ref } from 'vue'

export default {
  name:"MainView",
  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  },
  data(){
    return{
      //leftDrawerOpen:false
    }
  }
}
</script>
