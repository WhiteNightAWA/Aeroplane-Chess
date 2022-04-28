<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      Chat
    </v-expansion-panel-header>
    <v-divider/>
    <v-expansion-panel-content>
      <v-container class="mt-4">
        <v-row class="mb-4">
          <v-card style="width: 100%" class="pa-3">
            <v-row>
              <v-virtual-scroll
                  :items="messages"
                  height="300"
                  item-height="64"
                  id="chatBox"
                  :emit-update="true"
              >
                <template v-slot:default="{ item }">
                  <v-list-item>
                    <v-list-item-content :class="{ 'text-right': item.id === clientId }">
                      <h4>{{ item.name }}<span v-if="item.id === clientId">(me)</span></h4>
                      <p style="overflow: inherit;">
                        {{ item.message }}
                      </p>
                    </v-list-item-content>


                  </v-list-item>

                </template>
              </v-virtual-scroll>
            </v-row>
            <v-row>
              <v-spacer/>
              <v-btn icon @click="scrollDown()">
                <v-icon>
                  mdi-chevron-down
                </v-icon>
              </v-btn>
            </v-row>
          </v-card>
        </v-row>
        <v-row>
          <v-text-field
              outlined
              v-model="message"
          >
            <template v-slot:append-outer>
              <v-btn
                  :disabled="message === ''"
                  @click="sendMessage()"
                  icon
              >
                <v-icon>
                  mdi-send
                </v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-row>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: "ChatComp",
  props: {
    _ws: WebSocket,
    client: String,
    gameId: String,
    m: Array
  },
  data() {
    return {
      message: "",
      ws: this._ws,
      clientId: this.client,
    }
  },
  methods: {
    scrollDown: function () {
      let container = this.$el.querySelector("#chatBox");
      container.scrollTop = container.scrollHeight;
    },
    sendMessage: function () {
      const payload = {
        method: "sendMessage",
        id: this.clientId,
        message: this.message,
        gameId: this.gameId
      }
      this.ws.send(JSON.stringify(payload))
      this.message = ""
    }
  },
  computed: {
    messages: {
      get(){
        return this.m
      },
      set(val){
        this.$emit('update:m',val)
      }
    }
  },
  mounted() {

  }


}
</script>

<style scoped>

</style>