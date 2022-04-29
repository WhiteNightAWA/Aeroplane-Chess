<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <h1 class="white--text">Aeroplane Chess</h1>
      <v-spacer/>
      <v-subheader class="white--text">
        Your client ID: <code v-if="clientId !== null">{{ clientId }}</code><code v-else>Getting Id...</code>
      </v-subheader>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon v-if="$vuetify.theme.dark" class="white--text">mdi-white-balance-sunny</v-icon>
        <v-icon v-else class="white--text">mdi-weather-night</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      {{ game }}
      <v-tabs-items v-model="page" class="fill-height">
        <v-tab-item value="select" class="fill-height">
          <v-container class="fill-height justify-space-around flex-column">
            <v-card class="pa-8 justify-center align-center flex-column" style="width: 100%; height: 45%; display: flex;">
              <h1>Create new Game</h1>
              <v-btn @click="createGame(); page = 'create'">Create</v-btn>
            </v-card>
            <v-card class="pa-8 justify-center align-center flex-column" style="width: 100%; height: 45%; display: flex;">
              <v-spacer/>
              <h1>Join Game</h1>
              <v-text-field
                  class=""
                  style="width: 100%"
                  height="50px"
                  label="Game ID"
                  v-model="inputGameId"
                  type="password"
              />
              <v-btn @click="join()" :disabled="inputGameId === ''">JOIN</v-btn>
              <v-spacer/>
            </v-card>
          </v-container>
        </v-tab-item>
        <v-tab-item value="create" class="fill-height">
          <v-container class="fill-height justify-center flex-column">
            <v-card class="pa-4 ma-4">
              <v-text-field
                  label="Your name"
                  v-model="editName"
              >
                <template v-slot:append-outer>
                  <v-btn
                      :disabled="orgName === editName"
                      @click="updateName"
                      icon
                  >
                    <v-icon>
                      mdi-content-save
                    </v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-card>
            <v-alert type="info" prominent>
              Your game id will be
              <code v-if="game !== null" style="user-select: none;">
                <span :class="{ white: !showGameId }">{{ game.id }}</span>
              </code>
              <v-btn icon @click="showGameId = !showGameId">
                <v-icon v-if="!showGameId">mdi-eye</v-icon>
                <v-icon v-else>mdi-eye-off</v-icon>
              </v-btn>
              <v-btn icon @click="copy(game.id)"><v-icon>mdi-content-copy</v-icon></v-btn>

            </v-alert>
          </v-container>
        </v-tab-item>
        <v-tab-item value="wait" class="fill-height">
          <v-container class="fill-height flex-column justify-center align-center" v-if="game !== null">
            <v-card class="pa-4 ma-4">
              <v-text-field
                  label="Your name"
                  v-model="editName"
              >
                <template v-slot:append-outer>
                  <v-btn
                      :disabled="orgName === editName"
                      @click="updateName"
                      icon
                  >
                    <v-icon>
                      mdi-content-save
                    </v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-card>
            <v-progress-circular class="ma-6" indeterminate color="primary" size="100"/>
            <h2>Waiting the host to start</h2>
            <h6 class="grey--text">Reload this page if you want to quit.</h6>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
      <v-dialog v-model="errDia">
        <v-card
          color="error"
          class="fill-height"
        >
          <v-card-title class="white--text text-center">
            {{err}}
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-card class="userComp" v-if="game !== null">
        <v-expansion-panels accordion multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Players
            </v-expansion-panel-header>
            <v-divider/>
            <v-expansion-panel-content>
              <v-list dense>
                <v-list-item
                    v-for="u in game.clients"
                    :key="u.id"
                >
                  <v-list-item-icon>
                    <v-icon
                        v-if="u.host"
                        color="yellow"
                    >
                      mdi-crown
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ u.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ u.clientId }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon v-if="!u.host" :disabled="!game.clients.filter(c => c.clientId === clientId)[0].host" @click="kick(u.clientId)">
                      <v-icon>mdi-account-remove</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <ChatComp :m.sync="messages" :gameId="game.id" :client="clientId" :_ws="ws"/>
        </v-expansion-panels>
      </v-card>
      <v-snackbar
          v-model="snackbar"
          :color="snackbarColor"
      >
        <v-icon>mdi-{{ snackbarIcon }}</v-icon>
        {{ snackbarMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn
              v-bind="attrs"
              @click="snackbar = false"
              icon
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import ChatComp from "@/components/ChatComp";

export default {
  name: 'App',

  components: {
    ChatComp
  },

  data() {
    return {
      clientId: null,
      ws: new WebSocket(`ws://aeroplane-chess.vercel.app`),
      game: null,
      errDia: false,
      err: "",
      page: "select",
      showGameId: false,
      inputGameId: "",
      sendJoin: false,
      editName: "",
      orgName: "",
      message: "",
      snackbar: false,
      snackbarColor: "success",
      snackbarMessage: "test",
      snackbarIcon: "check",
      messages: []
    }
  },

  methods: {
    updateName: function () {
      const payload = {
        clientId: this.clientId,
        method: "updateName",
        name: this.editName,
        game: this.game
      }
      this.ws.send(JSON.stringify(payload))
    },
    createGame: function () {
      const payload = {
        method: "create",
        clientId: this.clientId
      }
      this.ws.send(JSON.stringify(payload))
    },
    copy: function (text) {
      navigator.clipboard.writeText(text)
    },
    join: function () {
      const payload = {
        method: "join",
        clientId: this.clientId,
        gameId: this.inputGameId
      }
      this.ws.send(JSON.stringify(payload))
      this.sendJoin = true
    },
    kick: function (clientId) {
      const payload = {
        method: "kick",
        clientId: clientId,
        gameId: this.game.id
      }
      this.ws.send(JSON.stringify(payload))
    },
    scrollDown: function () {
      let container = this.$el.querySelector("#chatBox");
      container.scrollTop = container.scrollHeight;
    },
  },

  mounted() {
    this.ws.onmessage = m => {
      const res = JSON.parse(m.data)
      console.log(res);
      if (res.method === "connect") {
        console.log(res.clientId);
        this.clientId = res.clientId
        this.snackbarMessage = "Connected to ws server!"
        this.snackbarColor = "success"
        this.snackbar = true
      }
      if (res.method === "create") {
        console.log(res.game)
        this.game = res.game;
        this.editName = this.game.clients.filter(c => c.clientId === this.clientId)[0].name
        this.orgName = this.editName
        this.snackbarMessage = "Successfully created a new game!"
        this.snackbarColor = "success"
        this.snackbar = true
      }
      if (res.method === "join") {
        this.game = res.game;
        if (this.sendJoin) {
          this.page = "wait"
          this.sendJoin = false
          this.editName = res.name
          this.orgName = res.name
        } else {
          this.snackbarIcon = "plus"
          this.snackbarMessage = `${res.name} join this Game!`
          this.snackbarColor = "success"
          this.snackbar = true
        }
      }
      if (res.method === "updateName") {
        this.game = res.game;
        this.editName = res.name
        this.orgName = this.editName
      }
      if (res.method === "kick") {
        if (res.clientId === this.clientId) {
          this.err = "You has been kicked by the Host!"
          this.errDia = true
          this.page = "select"
          this.game = null
        } else {
          this.game = res.game
          this.snackbarIcon = "karate"
          this.snackbarColor = "error"
          this.snackbarMessage = `${res.name} has been kick by the Host!`
          this.snackbar = true
        }
      }
      if (res.method === "left") {
        this.game = res.game;
        this.snackbarIcon = "exit-run"
        this.snackbarColor = "error"
        this.snackbarMessage = `${res.name} has left this game!`
        this.snackbar = true
      }
      if (res.method === "sendMessage") {
        delete res.method
        this.messages.push(res)
        setTimeout(() => {
          this.scrollDown()
        }, 100)
      }
      if (res.method === "joinError") {
        this.err = res.error
        this.errDia = true
      }
    }

  }

};
</script>

<style>
.v-card.userComp {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 50%;
}
</style>
