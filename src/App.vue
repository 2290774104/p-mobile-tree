<template>
  <div>
    <p-mobile-tree
      v-model="model"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  public model = ''
}
</script>
