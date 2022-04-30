<template>
  <v-expansion-panels>
    <v-expansion-panel class="pa-4 ma-4 mt-0 pt-0 mb-0">
      <v-expansion-panel-header>
        Game Settings
      </v-expansion-panel-header>
      <v-divider/>
      <v-expansion-panel-content class="">
        <v-form class="ma-3">
          <v-row>
            <v-col>
              <v-select
                  :items="Object.keys(settings.games)"
                  item-text="name"
                  item-value="id"
                  v-model="settings.game"
                  label="Game"
                  filled
                  hide-details
              />
            </v-col>
          </v-row>
          <v-row v-if="settings.games[settings.game] !== undefined">
            <v-col>
              <v-row class="align-center">
                <v-col cols="4">
                  <v-select
                      label="Player Numbers"
                      v-model="settings.playerNumbers"
                      :items="settings.games[settings.game].players"
                      filled
                      hide-details
                      @change="editPlayerNumber()"
                  />
                </v-col>
                <v-col>
                  <v-row class="justify-space-around" v-if="!settings.userSelectColor">
                    <ColorPicker
                        v-for="n in settings.playerNumbers"
                        :key="n"
                        class="justify-center text-center"
                        :c.sync="settings.colors[n-1]"
                    />
                  </v-row>
                  <v-row class="justify-space-around" v-else>
                    <ColorPicker
                        class="justify-center text-center"
                        :c.sync="myColor"
                    />
                  </v-row>
                </v-col>
                <v-col cols="1">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <span
                          v-bind="attrs"
                          v-on="on"
                      ><v-checkbox @click="updateUserSelectColor" v-model="settings.userSelectColor"/></span>
                    </template>
                    <span>Able User to select their color</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row class="align-end">
                <v-col
                    v-for="n in 6"
                    :key="n"
                >
                  <v-checkbox
                      v-model="settings.moves"
                      :label="n.toString()"
                      :value="n"
                      hide-details
                  />
                </v-col>
                <v-col>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                          dark
                          v-bind="attrs"
                          v-on="on"
                      >
                        mdi-help-circle-outline
                      </v-icon>
                    </template>
                    <span>Step of move can one of the plane from base.</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <v-row class="align-center">
                <v-col cols="1">
                  <v-switch v-model="settings.timeLimited" hide-details/>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                      :disabled="!settings.timeLimited"
                      v-model="settings.timeLimitedNumber"
                      hide-details
                      label="Time limit of every rounds (s)"
                      type="number"
                  />
                </v-col>
                <v-col cols="1">
                  <v-switch v-model="settings.wholeTimeLimited" hide-details/>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                      :disabled="!settings.wholeTimeLimited"
                      v-model="settings.wholeTimeLimitedNumber"
                      hide-details
                      label="Time limit of the whole game (min)"
                      type="number"
                  />
                </v-col>

              </v-row>
              <v-row class="align-center justify-space-around">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                      <span
                          v-bind="attrs"
                          v-on="on"
                      ><v-checkbox v-model="settings.ableChat"/></span>
                  </template>
                  <span>Able Chat</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                      <span
                          v-bind="attrs"
                          v-on="on"
                      ><v-checkbox v-model="settings.ableSkip"/></span>
                  </template>
                  <span>Able Skip</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                      <span
                          v-bind="attrs"
                          v-on="on"
                      ><v-checkbox v-model="settings.ableFly"/></span>
                  </template>
                  <span>Able Fly</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                      <span
                          v-bind="attrs"
                          v-on="on"
                      ><v-checkbox v-model="settings.ableOverLuckyPunish"/></span>
                  </template>
                  <span>Able Over Lucky Punish</span>
                </v-tooltip>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-btn :disabled="game.clients.length < 2 || settings.game === ''" x-large color="success" class="ma-4">
      <v-icon>mdi-play</v-icon>
      Start Game!
    </v-btn>
  </v-expansion-panels>
</template>

<script>
import ColorPicker from "@/components/ColorPicker";

export default {
  name: "GameSettings",
  components: {
    ColorPicker
  },
  props: {
    g: Object,
    c: String,
    pN: Number
  },
  data() {
    return {
      settings: {
        games: {
          AeroplaneChess: {id: "AeroplaneChess", name: "Aeroplane Chess", players: [2,3,4]}
        },
        game: "",
        colors: ["#ffdd00", "#1976D2", "#ee0c0c", "#55AA00"],
        moves: [2, 4, 6],
        timeLimited: false,
        timeLimitedNumber: 30,
        wholeTimeLimited: false,
        wholeTimeLimitedNumber: 30,
        ableChat: true,
        ableSkip: false,
        ableFly: true,
        ableOverLuckyPunish: true,
        userSelectColor: false,
        playerNumbers: 4,
      },
    }
  },
  computed: {
    game: {
      get(){
        return this.g
      },
      set(val){
        this.$emit('update:g',val)
      }
    },
    myColor: {
      get(){
        return this.c
      },
      set(val){
        this.$emit('update:c',val)
      }
    },
  },
  methods: {
    updateUserSelectColor: function () {
      const payload = {
        method: "updateUserSelectColor",
        gameId: this.game.id,
        able: this.settings.userSelectColor
      }
      this.$root.ws.send(JSON.stringify(payload))
    },
    editPlayerNumber: function () {
      const payload = {
        method: "updatePlayerNumber",
        newNumber: this.settings.playerNumbers,
        gameId: this.game.id
      }
      this.$root.ws.send(JSON.stringify(payload))
    }
  }
}
</script>

<style scoped>

</style>