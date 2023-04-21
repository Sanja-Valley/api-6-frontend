<template>
  <div class="home">
    <img class="fundo" alt="Vue logo" src="../assets/logo.jpg">

    <div>
      
    </div>

    <div class="chat">
        <div id="conversa" class="areaTexto">
            <div class="usuario" ref="messages" v-for="(mensagem, index) in mensagens" :key="index" :class="mensagem.usuario">
                <span class="sent-by">{{ mensagem.usuario }}:</span>
                <span>{{ mensagem.mensagem }}</span>
                <div v-for="(imagem, imagem_index) in mensagem.imagem" :key="imagem_index">
                  {{imagem_index + 1}}
                  <img :src="require(`@/assets/${imagem}`)" class="imagemChat" >
                </div>
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
      n: 0,
      mensagens: [],
      imagens:{
        "local": ["chacara.jpg", "salao.jpeg"],
        "decoracao": []
      }
    }
    
  }, 
  methods:{
    adicionarMensagem(mensagem,usuario, imagem){
      if(!imagem){
        imagem = []
      }
      this.mensagens.push({ mensagem: mensagem, usuario: usuario, imagem: imagem});
      console.log(mensagem, usuario, imagem) 
      this.$nextTick(this.scrollToBottom);
    },

    enviar(){
      this.adicionarMensagem(this.meuInput, 'user');
      this.receber(this.meuInput);
      this.meuInput = '';  
    },

    async receber(recebido) {
       axios.post("http://localhost:5000/chat/", { mensagem: recebido, contexto: this.meuContexto, n: this.n, })
       .then((response) => {
        this.meuContexto = response.data.contexto
        this.n = response.data.n
        let resposta = response.data.resposta
        let imagem = null

        if(resposta.includes("|")){
          let respostas_partes = resposta.split("|")
          resposta = respostas_partes[0];
          imagem = this.imagens[respostas_partes[1]];
        }

        this.adicionarMensagem(resposta, "bot", imagem );
      })},
    verifica(e){
      if(e.key == "Enter"){
          this.enviar();
      }
    },
    scrollToBottom() {
            let lastMessage = this.$refs.messages.slice(-1)[0];

            lastMessage.scrollIntoView();
        }
  }
}

</script>