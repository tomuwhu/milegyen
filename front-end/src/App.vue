<template>
  <v-app>
    <v-container class="text-xs-center">
    <v-text-field v-model="o.nev" label="Név"/>
    <v-select v-model="o.select" :items="['Cumó','Cica']" multiple/>
    <v-btn color="red" @click="f">Mentés</v-btn>
    <br>
    <table class="table">
      <tr v-for="(row,k) in t">
        <td>{{row.nev}}</td>
        <td>{{row.select.join(', ')}}</td>
        <td>
          <i @click="szerk(k)"
             class="material-icons katt">
            edit
          </i>
          <i @click="torol(k)"
             class="material-icons katt">
            delete
          </i>
        </td>
      </tr>
    </table>   
    </v-container>
  </v-app>
</template>
<script>
//import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',
  /*
  components: {
    HelloWorld
  },
  */
  data: () => ({
    o: {},
    t: []
  }),
  methods: {
    f() { 
       this
        .axios
        .post('http://localhost:3000',this.o)
        .then( resp => {
          if (resp.data.n) {
            console.log(resp.data)  
          } else {
            this.t.push(resp.data)
          }
        } )
    },
    szerk(k) {
      this.o = this.t[k]
    },
    torol(k) {
      this
        .axios
        .post('http://localhost:3000/del',this.t[k])
        .then( resp => {
          if (resp.data.n) {
            this.t.splice(k,1)  
          } else {
         
          }
        } )
    }
  },
  mounted() {
    this
        .axios
        .get('http://localhost:3000')
        .then( resp => {
          this.t = resp.data
        } )
  }
}
</script>
<style>
i.katt {
  cursor:pointer;
  color:red;
}
i.katt:hover {
  color:brown;
  text-shadow: 1px 1px 4px black;
}
</style>