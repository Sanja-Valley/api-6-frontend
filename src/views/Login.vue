<template>
  <div class="login">
    <div class="formulario">
      <img alt="logo" src="../assets/logo.jpg" />
      
      <input id="userLogin" type="email" v-model="login" placeholder="Digite seu e-mail">
      <input id="senhaLogin" type="password" v-model="senha" placeholder="Digite sua senha">
      <button class="btn-copy" @click="logar()">Entrar</button>
    </div>
    <div class="termo">
       <h3>Termo de responsabilidade</h3> 
       <p><br>São deveres do credenciado ou autorizado nas dependências do Palácio do Planalto:
            <br>1. I – portar visivelmente a credencial ou a autorização; II – trajar-se de forma compatível
            com o local onde se desenvolvem as atividades, segundo critérios fixados em ato
            normativo específico; III – manter atualizados os seus dados pessoais e profissionais; IV
            – agir com urbanidade e disciplina no desempenho de suas atividades de acordo com o
            código de ética da profissão; V – conhecer e cumprir as normas regulamentares do
            Palácio do Planalto.
            <br>2. O uso da credencial ou da autorização é pessoal e intransferível, sujeitando-se o seu
            titular à responsabilidade administrativa, civil e penal, quanto ao seu uso indevido.
            <br>3. A credencial ou a autorização deverá ser devolvida ao Setor de Credenciamento da
            Secretaria de Imprensa nas hipóteses de cancelamento, suspensão ou revogação do
            credenciamento ou da autorização.
            <br>Em respeito a Lei Geral de Proteção de dados - Lei nº13.709/2018 informamos que o iFest irá guardar seus dados para recomendações futuras de produtos e serviços. 
       </p> 
       <br>
       <button class="aceite" @click="aceita()">Concordo</button>
    </div> 
  </div>

 
</template>

<script>
// @ is an alias to /src
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
      alert()
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
            
      axios
        .get('http://localhost:5000/chat/lgpd', {
          params: {
                email: this.login
          }
          }).then(result => {
            if (result.data.lgpd == false){
                this.aceita()
            }
            else{
              this.$router.push('/home')
            }
          })
            
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
      document.querySelector(".chat").style.display = "block" 
      document.querySelector(".termo").style.display = "none"
      // localStorage.setItem('concorda', true)
      axios
      .post("http://localhost:5000/chat/login"){
        
      }
      alert("Para iniciar ou interromper o recebimento de e-mails com novidades clique no sininho.")
      this.$router.push('/home')
  },
  },
};
</script>

