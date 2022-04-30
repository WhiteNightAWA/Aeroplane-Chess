<template>
  <v-menu
      v-model="menu"
      top
      nudge-bottom="98"
      nudge-left="16"
      :close-on-content-click="false"
      :disabled="disabled"
      :class="{ 'disabled': disabled }"
  >
    <template v-slot:activator="{ on }">
      <div :style="swatchStyle" v-on="on" />
    </template>
    <v-card>
      <v-card-text class="pa-0">
        <v-color-picker v-model="color" flat />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "ColorPicker",
  data() {
    return {
      menu: false,
      disabled: this.d
    }
  },
  props: {
    c: String,
    d: {type: Boolean, default: false}
  },
  computed: {
    color: {
      get(){
        return this.c
      },
      set(val){
        this.$emit('update:c',val)
      }
    },
    swatchStyle() {
      return {
        backgroundColor: this.color,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: this.menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      }
    }
  },

}
</script>

<style scoped>
.disabled {
  cursor: not-allowed;
}
</style>