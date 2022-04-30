<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <a href="https://whitenightawa.github.io/Aeroplane-Chess/">
        <v-icon x-large>mdi-chess-pawn</v-icon>
      </a>
      <a href="https://whitenightawa.github.io/Aeroplane-Chess/">
        <h1 class="white--text">Aeroplane Chess</h1>
      </a>

      <v-spacer/>
      <v-subheader class="white--text">
        Your client ID: <code v-if="clientId !== null">{{ clientId }}</code><code v-else>Getting Id...</code>
      </v-subheader>
      <v-btn icon @click="changeTheme()">
        <v-icon v-if="$vuetify.theme.dark" class="white--text">mdi-white-balance-sunny</v-icon>
        <v-icon v-else class="white--text">mdi-weather-night</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
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
                  v-on:keyup.enter="inputGameId === '' ? null : join()"
              />
              <v-btn @click="join()" :disabled="inputGameId === ''">JOIN</v-btn>
              <v-spacer/>
            </v-card>
          </v-container>
        </v-tab-item>
        <v-tab-item v-if="game !== null" value="create" class="fill-height">
          <v-container class="fill-height justify-center flex-column">
            <v-card class="pa-4 ma-4" min-width="70%">
              <v-alert type="info" prominent>
                Your game id will be
                <code v-if="game !== null" style="user-select: none;">
                  <span :class="{ white: !showGameId }">{{ game.id }}</span>
                </code>
                <v-btn icon @click="showGameId = !showGameId">
                  <v-icon v-if="!showGameId">mdi-eye</v-icon>
                  <v-icon v-else>mdi-eye-off</v-icon>
                </v-btn>
                <v-btn icon @click="copy(`${urlHost}?joinId=${game.id}`)"><v-icon>mdi-content-copy</v-icon></v-btn>
              </v-alert>
              <v-alert class="mb-0">
                <v-text-field
                    label="Your name"
                    v-model="editName"
                    v-on:keyup.enter="updateName()"
                    hide-details
                >
                  <template v-slot:append-outer>
                    <v-btn
                        :disabled="orgName === editName"
                        @click="updateName()"
                        icon
                    >
                      <v-icon>
                        mdi-content-save
                      </v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-alert>
              <GameSettings :g.sync="game" :c.sync="myColor"/>
            </v-card>
          </v-container>
        </v-tab-item>
        <v-tab-item v-if="game !== null" value="wait" class="fill-height">
          <v-container class="fill-height flex-column justify-center align-center" v-if="game !== null">
            <LoaderXLVI class="ma-6"/>
            <h2>Waiting the host to start</h2>
            <h6 class="grey--text">Reload this page if you want to quit.</h6>
            <v-card class="pa-4 ma-4">
              <v-alert type="info" prominent>
                Your game id will be
                <code v-if="game !== null" style="user-select: none;">
                  <span :class="{ white: !showGameId }">{{ game.id }}</span>
                </code>
                <v-btn icon @click="showGameId = !showGameId">
                  <v-icon v-if="!showGameId">mdi-eye</v-icon>
                  <v-icon v-else>mdi-eye-off</v-icon>
                </v-btn>
                <v-btn icon @click="copy(`${urlHost}?joinId=${game.id}`)"><v-icon>mdi-content-copy</v-icon></v-btn>
              </v-alert>
              <v-alert>
                <v-text-field
                    label="Your name"
                    v-model="editName"
                    v-on:keyup.enter="updateName()"
                >
                  <template v-slot:append-outer>
                    <v-btn
                        :disabled="orgName === editName"
                        @click="updateName()"
                        icon
                    >
                      <v-icon>
                        mdi-content-save
                      </v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-alert>
              <v-alert v-if="game.userSelectColor" class="justify-center">
                <v-row class="text-center">
                  <h3>The host available you to select your color: </h3>
                </v-row>
                <v-row>
                  <v-spacer/>
                  <ColorPicker :c.sync="myColor"/>
                  <v-spacer/>
                </v-row>
              </v-alert>
            </v-card>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
      <v-dialog v-model="errDia">
        <v-card
          color="error"
          class="fill-height"
        >
          <v-card-title class="white--text text-center">
            {{ err }}
          </v-card-title>
        </v-card>
      </v-dialog>
      <v-card class="userComp" v-if="game !== null" style="z-index: 999;">
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
                  <v-list-item-content>
                    <v-list-item-title><v-icon
                        v-if="u.host"
                        color="yellow"
                    >
                      mdi-crown
                    </v-icon>{{ u.name }}</v-list-item-title>
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
          <ChatComp :m.sync="messages" :gameId="game.id" :client="clientId"/>
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
      <v-fade-transition>
        <v-overlay v-if="clientId === null" :opacity="0.75" :value="linking">
          <v-row class="text-center justify-center align-center">
            <h1 class="text-center">Connecting to the server...</h1>
          </v-row>
          <v-row style="height: 1em"/>
          <v-row class="text-center justify-center align-center">
            <LoaderXLVI/>
          </v-row>
          <v-row style="height: 1em"/>
          <v-row class="text-center justify-center align-center">
            <v-subheader>
              This may took a few seconds
              <br>
              Try to reload this page is you stuck in this for > 1 minuses
            </v-subheader>
          </v-row>

        </v-overlay>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
import ChatComp from "@/components/ChatComp";
import GameSettings from "@/components/GameSettings";
import ColorPicker from "@/components/ColorPicker";
import LoaderXLVI from "@/components/LoaderXLVI";

export default {
  name: 'App',

  components: {
    ChatComp,
    GameSettings,
    ColorPicker,
    LoaderXLVI
  },

  data() {
    return {
      clientId: null,
      ws: this.$root.ws,
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
      messages: [],
      urlHost: document.location.href,
      myColor: "#ffffff",
      linking: true
    }
  },

  methods: {
    changeTheme: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      window.localStorage.setItem("isDark", this.$vuetify.theme.dark.toString())
    },
    updateName: function () {
      const payload = {
        clientId: this.clientId,
        method: "updateName",
        name: this.editName,
        gameId: this.game.id
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

    // theme
    let isDark = window.localStorage.getItem("isDark");
    if (isDark === null) {
      isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      window.localStorage.setItem("isDark", isDark.toString())
      this.$vuetify.theme.dark = isDark
    } else {
      this.$vuetify.theme.dark = isDark === "true"
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      isDark = !event.matches
      window.localStorage.setItem("isDark", isDark.toString())
      this.$vuetify.theme.dark = isDark  === "true"
    });

    // ws
    this.ws.onmessage = m => {
      const res = JSON.parse(m.data)
      console.log(res);
      if (res.method === "connect") {
        console.log(res.clientId);
        this.clientId = res.clientId
        this.snackbarMessage = "Connected to ws server!"
        this.snackbarColor = "success"
        this.snackbar = true

        // join link
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        if (params.joinId !== undefined) {
          this.inputGameId = params.joinId
          this.join()
          window.history.replaceState(null, null, "?");
        }
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
        if (this.editName === res.name) {
          this.editName = res.name;
          this.orgName = this.editName;
        }
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
      if (res.method === "updateUserSelectColor") {
        this.game = res.game

      }
      if (res.method === "close") {
        this.err = "This game is closed by the host"
        this.errDia = true
        this.page = "select"
        this.game = null
      }
      if (res.method === "updatePlayerNumber") {
        this.game = res.game
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
