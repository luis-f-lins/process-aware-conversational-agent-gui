<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol style="text-align: center;">
           <h4 id="traffic" class="card-title mb-0">Process-Aware Conversational Agent</h4>
          </CCol>       
        </CRow>
        <h6>
        Millions of people execute processes every day. </br> 
        Processes are intrinsic to our personal and professional lives, from planning a party or scheduling a trip, to hiring new employees
        or admitting students into a University program. </br>
        Processes are important for several reasons, including:</br>
      <div style="margin-left:30px" >
      1. Regulating a set of procedures for the execution of a task, so that its execution is unified among members of a large team; </br>
      2. Facilitating the identification of the most important tasks in a list; </br>
      3. Clarifying the dependencies between tasks, so that they can be executed in the right order;</br>
      4. Improving efficiency, both individually and for an entire team, if applicable.</br>
      </div>
      </h6>
      <div style="display: flex;
    justify-content: space-around; ">
       <CButton class="buttonclick" @click="booktrip" size="sm" color="primary">Book a trip</CButton>
       <CButton class="buttonclick" @click="planwedding" size="sm" color="primary">Plan a wedding</CButton>
       </div>
      </CCardBody>
      <CCardFooter>
        <CRow class="text-center">
         </CRow>
      </CCardFooter>
    </CCard>
    <CRow>
    </CRow>
    <center>

 <div v-if="openChatTrip || openChatWedding" id="chat">
  <div id="messages-window">
    <span v-bind:class="'message ' + (message.user_id==1 ? 'ours' : 'theirs')" v-for="message in messages">
      {{message.content}}
      </span>
  </div>
  <input type="text" v-model="newMessageContent" v-on:keyup.enter="addMessage"/>
</div>
</center> 
  </div>
</template>

<script>
import Widget from 'rasa-webchat';
import VueScriptComponent from 'vue-script-component'
import axios from 'axios'

export default {
  name: 'Dashboard',
  components: {
  },
  data () {
    return {
      openChatTrip: false,
      openChatWedding: false,
      newMessageContent: '',
      messages: [{user_id: 1, content:'Hello'}, 
      {user_id: 2, content:'This is a conversational agent'}, 
      {user_id: 3, content:'I will help you!'}]
     ,
      tableItems: [
      ],
      tableFields: [
      ]
    }
  },
  mounted () {
  },
  methods: {
    addMessage: function() {
      // 'this' refers to 'app'.
      this.messages.push({user_id: 1, content: this.newMessageContent});

      const requestBody = {
        sender: "Rasa",
        message: this.newMessageContent
      }

      const port = this.openChatTrip ? 5005 : 5006

      axios.post(`http://localhost:${port}/webhooks/rest/webhook`, requestBody)
        .then(response => {
          console.log(response)
          console.log(response.data)
          response.data.forEach(messageObj => {
            this.messages.push({user_id: 2, content: messageObj.text});
          })
      });

      this.newMessageContent = '';
    },
    booktrip(){
       this.openChatTrip = !this.openChatTrip
       this.openChatWedding = false
    },
    planwedding(){
       this.openChatWedding = !this.openChatWedding
       this.openChatTrip = false
    }
  },
  components: { 'chat-widget': Widget, VueScriptComponent },
}
</script>
  
<style>
#chat {
  height: 100%;
  width: 40%; 
  overflow: hidden;
  display: flex; 
  flex-flow: column;
}

#messages-window {
  background:#eee; 
  flex: 1 0 auto; 
  display: flex; 
  flex-direction: column; 
  justify-content: flex-end; 
  overflow: auto;
  align-items:flex-start; 
  padding:20px;
}

.message {
  background:gray;
  color:white;
  padding:8px 12px;
  margin-bottom:8px;
  border-radius:16px;
  max-width:70%;
  text-align: left;
  white-space: pre-wrap;
}

.ours {
  background:#321fdb;
  align-self:flex-end;
}

input {
  padding:10px;
}

</style>