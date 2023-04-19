<template>
  <div class="home">
    <img class="fundo" alt="Vue logo" src="../assets/logo.jpg">
    <div class="chat">
        <div id="conversa" class="areaTexto">
            <div class="usuario" v-for="(mensagem, index) in mensagens" :key="index" :class="mensagem.usuario">
                <span class="sent-by">{{ mensagem.usuario }}:</span>
                <span>{{ mensagem.mensagem }}</span>
           </div>
            
        </div>
        <div class="areaInput">
            <!-- <input id='enviar' type="text" placeholder="Digite sua mensagem">  -->
            <input id="enviar" type="text" v-model="meuInput" placeholder="Digite sua mensagem" @keypress="verifica">
            <Button type="button" icon="pi pi-search" class="buttonEnviar" style="margin-left: 5px" @click="enviar">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" 
            stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" 
            class="css-i6dzq1"><line x1="22" y1="2" x2="11" y2="13"></line><polygon 
            points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></Button>
            <!--  -->
            
        </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import '@/css/home.css';
import axios from "axios";


export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      meuInput: '',
      meuContexto: 'geral',
      mensagens: [],
      

    }
    
  }, 
  methods:{
    adicionarMensagem(mensagem,usuario){
      this.mensagens.push({ mensagem: mensagem, usuario: usuario }); 
    },
    enviar(){
      this.adicionarMensagem(this.meuInput, 'user');
      this.receber(this.meuInput);
      this.meuInput = '';
      
      
    },
    async receber(recebido) {
       axios.post("http://localhost:5000/chat/", { mensagem: recebido, contexto: this.meuContexto})
       .then((response) => {
        this.meuContexto = response.data.contexto
        this.adicionarMensagem(response.data.resposta, "bot" );
       })
   },
    verifica(e){
      if(e.key == "Enter"){
          this.enviar();
      }
    }
  }
}
</script>
