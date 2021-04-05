<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol style="text-align: center;">
            <h4 id="traffic" class="card-title" style="margin-top: 15px;">
              Process-Aware Conversational Agent
            </h4>
          </CCol>
        </CRow>
        <h6
          style="width: 50%; margin: 20px auto 40px auto; text-align: justify;"
        >
          <p>
            Processes are intrinsic to our personal and professional lives, from
            planning a party or scheduling a trip, to hiring new employees or
            admitting students into a University program.
          </p>
          <p>
            This tool can help you easily execute processes by talking to a
            conversational agent that will guide you throughout the execution.
          </p>
        </h6>
        <div
          style="display: flex;
    justify-content: space-around; margin: 30px 0 20px 0;"
        >
          <CButton
            class="buttonclick"
            @click="booktrip"
            size="sm"
            color="primary"
            :variant="openChatTrip ? '' : 'outline'"
            >Book a trip</CButton
          >
          <CButton
            class="buttonclick"
            @click="planwedding"
            size="sm"
            color="primary"
            :variant="openChatWedding ? '' : 'outline'"
            >Plan a wedding</CButton
          >
        </div>
      </CCardBody>
    </CCard>
    <center>
      <div v-if="openChatTrip || openChatWedding" id="chat">
        <div id="messages-wrapper">
          <div id="messages-window">
            <span
              v-bind:class="
                'message ' + (message.user_id == 1 ? 'ours' : 'theirs')
              "
              v-for="message in messages"
            >
              {{ message.content }}
            </span>
            <span v-if="loadingResponse" v-bind:class="'message theirs'">
              <vue-loading
                type="bubbles"
                color="white"
                :size="{ width: '30px', height: '20px' }"
              ></vue-loading>
            </span>
          </div>
        </div>
        <input
          style="margin-bottom: 50px;"
          type="text"
          v-model="newMessageContent"
          v-on:keyup.enter="addMessage"
        />
      </div>
    </center>
  </div>
</template>

<script>
import Widget from "rasa-webchat";
import VueScriptComponent from "vue-script-component";
import axios from "axios";
import { VueLoading } from "vue-loading-template";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      loadingResponse: false,
      openChatTrip: false,
      openChatWedding: false,
      newMessageContent: "",
      tripMessages: [],
      weddingMessages: [],
      tableItems: [],
      tableFields: [],
    };
  },
  computed: {
    messages: function() {
      return this.openChatTrip ? this.tripMessages : this.weddingMessages;
    },
  },
  mounted() {},
  methods: {
    addMessage: function() {
      // 'this' refers to 'app'.
      this.messages.push({ user_id: 1, content: this.newMessageContent });

      const requestBody = {
        sender: "Rasa",
        message: this.newMessageContent,
      };

      const port = this.openChatTrip ? 5005 : 5006;

      const loadingIndicator = setTimeout(() => {
        this.loadingResponse = true;
      }, 500);

      axios
        .post(`http://localhost:${port}/webhooks/rest/webhook`, requestBody)
        .then((response) => {
          response.data.forEach((messageObj) => {
            setTimeout(() => {
              this.messages.push({ user_id: 2, content: messageObj.text });
              clearTimeout(loadingIndicator);
              this.loadingResponse = false;
            }, 1500);
          });
        });

      this.newMessageContent = "";
    },
    booktrip() {
      this.openChatTrip = !this.openChatTrip;
      this.openChatWedding = false;
    },
    planwedding() {
      this.openChatWedding = !this.openChatWedding;
      this.openChatTrip = false;
    },
  },
  components: { "chat-widget": Widget, VueScriptComponent, VueLoading },
};
</script>

<style>
#chat {
  height: 100%;
  width: 40%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
}

#messages-wrapper {
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  height: 250px;
}

#messages-window {
  background: #eee;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

.message {
  background: gray;
  color: white;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 16px;
  max-width: 70%;
  text-align: left;
  white-space: pre-wrap;
}

.ours {
  background: #321fdb;
  align-self: flex-end;
}

input {
  padding: 10px;
}

svg {
  margin-top: -45px;
}
</style>
