<template>
  <div class="home">
    <img class="fundo" alt="Vue logo" src="../assets/logo.jpg">
    <Button type="button" icon="pi pi-search" class="notifica" style="margin-left: 5px" @click="notificacao">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
       fill="none" stroke-linecap="round" stroke-linejoin="round" class="sgvNotifay">
       <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    </Button>
    <div class="email">
       <h3>Feed de notícias</h3> 
       <p><br>Aceita receber e-mails com as novidades e promoções. 
       </p> 
       <input type="checkbox" id="switch" v-model= "estado"/><label for="switch">Toggle</label> 
       <br>
       <button class="aceite" @click="concordaEmail()">Concordo</button>
    </div> 
  
    <div class="chat">
        <div id="conversa" class="areaTexto">
            <div class="ajuste" ref="messages" v-for="(mensagem, index) in mensagens" :key="index" >
              <div class="usuario" :class="mensagem.usuario">
              <p class="sent-by">{{ mensagem.usuario }}:</p>
                <p>{{ mensagem.mensagem }}</p>
                <div v-for="(imagem, imagem_index) in mensagem.imagem" :key="imagem_index">
                  <br>{{imagem_index + 1}}
                  <img :src="require(`@/assets/${imagem}`)" class="imagemChat" >
                </div>
                <div v-if="mensagem.pix" class="qrCode">
                  <br>
                  <img :src="`data:image/png;base64, ${mensagem.pix.codigo_QR}`" >
                  <br>
                  <button class="btn-copy" @click="copyKey(mensagem)">Copiar chave PIX</button>
                </div>              
              </div>
            </div>           
        </div>
      <div class="areaInput">
            <input  id="enviar" type="text" v-model="meuInput" placeholder="Digite sua mensagem" @keypress="verifica">
            <Button id="enviar" type="button" icon="pi pi-search" class="buttonEnviar" style="margin-left: 5px" @click="enviar">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" 
            stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" 
            class="css-i6dzq1"><line x1="22" y1="2" x2="11" y2="13"></line><polygon 
            points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></Button>           
        </div>
    </div>
  </div>

</template>

<script>
import '@/css/home.css';
import axios from "axios";
import Clipboard from 'clipboard';

export default {
  name: 'Home', 
  components: {
  },
  data() {
    return {
      estado: false,
      meuInput: '',
      meuContexto: 'geral',
      n: 0,
      mensagens: [],
      imagens:{
        "local": ["chacara.jpg", "salao.jpeg"],
        "decoracao": ["arco.jpg","bolo.jpg","kit.jpg","baloes.jpg","tecido.jpg"]
      },
    }    
  }, 
  mounted() {
  new Clipboard('.btn-copy', {
    text: function() {
      return 'sua_chave_pix'
    }
    }),
   alert("Para iniciar ou interromper o recebimento de e-mails com novidades clique no sininho.")
  },
  methods:{
    notificacao(){
      this.ativaNotificacao()
    },
    concordaEmail(){
        document.querySelector("input#enviar").disabled = false
        document.querySelector("button#enviar").disabled = false
        document.querySelector(".chat").style.display = "block" 
        document.querySelector(".email").style.display = "none"
        localStorage.setItem('concorda', true)
        axios.post('http://localhost:5000/chat/salvar', {
        nome: 'João',
        email: 'joao@email.com',
        estado: this.estado,
        data: Date() 
      })
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    },
    ativaNotificacao(){
      document.querySelector(".email").style.display = "block" 
    },  
   copyKey(mensagem) {
    new Clipboard('.btn-copy', {
      text: function() {
        return mensagem.pix.copia_cola
      }
    }).on('success', function() {
      alert('Chave PIX copiada para a área de transferência')
    })
    },
    adicionarMensagem(mensagem,usuario, imagem, pix){
      let retorno = {
        "mensagem": mensagem, 
        "usuario": usuario
      }
      
      if(!imagem){
        imagem = []
      }
      retorno["imagem"] = imagem
      
      if(pix){
        retorno["pix"] = pix
      }
      
      this.mensagens.push(retorno);
      console.log(mensagem, usuario, imagem, pix) 
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
        let resposta = ''
        let pix = ''
        let imagem = null

        if(this.meuContexto == "finalizar"){
          resposta = response.data.resposta.mensagem
          pix = response.data.resposta.pix
        }

        else{
          resposta = response.data.resposta
          pix = response.data.pix
        }

        if(resposta.includes("|")){
          let respostas_partes = resposta.split("|")
          resposta = respostas_partes[0]; 
          imagem = this.imagens[respostas_partes[1]];
        }
        this.adicionarMensagem(resposta, "bot", imagem, pix);

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
}}
</script>