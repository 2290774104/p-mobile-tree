<template>
  <div>
    <p-mobile-tree v-model="model" :data="data" :default-expand-all="true"  />

    选中的值：{{model.join('，')}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  public model = []

  public data = [
    {
      id: '1',
      label: '全部',
      children: [
        {
          id: '1-1',
          label: '选项1',
          children: [
            { id: '1-1-1', label: '选项1-1' },
            { id: '1-1-2', label: '选项1-2' },
            { id: '1-1-3', label: '选项1-3' },
            { id: '1-1-4', label: '选项1-4' },
          ],
        },
        { id: '1-2', label: '选项2' },
        { id: '1-3', label: '选项3' },
        { id: '1-4', label: '选项4' },
        { id: '1-5', label: '选项5' },
      ],
    },
  ]
}
</script>
