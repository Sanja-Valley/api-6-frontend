<template>
  <div class="login">
    <div class="formulario">
      <img alt="logo" src="../assets/logo.jpg" />
      
      <input id="userLogin" type="email" v-model="login" placeholder="Digite seu e-mail">
      <input id="senhaLogin" type="password" v-model="senha" placeholder="Digite sua senha">
      <button class="btn-copy" @click="logar()">Entrar</button>
    </div>
    <div ref="popUp" class="termo">
      <p ref="texto"/>    
       <button class="aceite" @click="aceita()">Concordo</button>
    </div> 
  </div> 
</template>

<script>
import axios from "axios";
import '@/css/login.css';

export default {
  name: "Login",
  components: {
  },
  data() {
    //onde se declara o objetos e variáveis
    return {
      login: '',
      senha: ''
    };
  },

  methods: {
    //todas as funções
    logar() {
      const headers = { 'Content-Type': 'application/json'}

      const body = { 
        username: this.login, 
      }
      axios
        .post("http://localhost:5000/chat/login", body, headers)
        .then(result => {
          if (result.data !== "" && result.status === 200) {
            console.log(result);
            const token = result.headers.token;
            localStorage.setItem('userToken', token);
          }
          if (result.data.lgpd !== null) {
            this.$refs.texto.innerHTML = result.data.lgpd
            this.$refs.popUp.style.display = "block"

          } else {
            this.$router.push('/home');
          }
          })
        .catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "Erro no servidor",
            life: 10000,
          });
        });
    },
    aceita(){
      const headers = { 'Content-Type': 'application/json'}

      const body = { 
        email: this.login, 
      }
      axios
      .post("http://localhost:5000/chat/aceitar", body, headers)
      .then(() => {
        this.$router.push('/home')
      })
  },
  },
};
</script>

