<template>
  <v-app>
    <v-container class="text-xs-center">
    <div v-if="edit">  
      <h1 v-if="o._id">Szerkesztés</h1>  
      <h1 v-else>Új felvitel</h1>  
      <v-layout class="row wrap">  
        <v-flex class="td" xs12 offset-sm1 offset-md1 sm5 md5 lg4 offset-lg2>  
          <v-text-field v-model="o.nev" label="Név"/>
        </v-flex>
        <v-flex  class="td" xs12 sm5 md5 lg4>
          <v-select v-model="o.select" label="Nomi" :items="['Cumó','Cica']" multiple/>
        </v-flex>
      </v-layout>
      <v-btn color="warning" @click="edit=false">Mégse</v-btn>
      <v-btn color="success" @click="f">Mentés</v-btn>
    </div>
    <table class="table" v-else>
      <tr><td colspan=4>Cuccok listája</td></tr>
      <tr v-for="(row,k) in t">
        <td>{{row.nev}}</td>
        <td>{{row.select.join(', ')}}</td>
        <td>
          <i @click="szerk(k)"
             class="material-icons katt">
            edit
          </i>
         </td>
         <td> 
          <i @click="torol(k)"
             class="material-icons katt">
            delete
          </i>
        </td>
      </tr>
      <tr>
        <td colspan=4>
           <i v-if="!edit"@click="o={},edit = true"
            class="material-icons katt">
          note_add
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
    t: [],
    edit: false
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
          this.edit=false
        } )
    },
    szerk(k) {
      this.edit=true
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
@import url('https://fonts.googleapis.com/css?family=Indie+Flower');
i.katt {
  cursor:pointer;
  color:red;
}
i.katt:hover {
  color:brown;
  text-shadow: 1px 1px 4px black;
}
table {
  width:100%;
  border-spacing: 10px;
  border-collapse: separate;
}
td,.td {
  font-family: 'Indie Flower', cursive;
  font-size: 18px;
  margin:15px;
  padding:3px;
  padding-left:20px;
  padding-right:20px;
  box-shadow:1px 1px 4px Black;
  border-radius:7px;
  background-color: rgb(215, 223, 223);
}
</style>