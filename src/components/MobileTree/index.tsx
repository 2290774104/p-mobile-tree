import { omit } from 'lodash'
import { CreateElement, VNode } from 'vue'
import { Component, Emit, Model, Prop, Vue, Watch } from 'vue-property-decorator'
import { ValueType } from '../../../types'

@Component({ name: 'MobileTree' })
export default class MobileTree extends Vue {
  // v-model 双向绑定
  @Model('model-change', { type: [String, Number, Array], required: true })
  private readonly value!: ValueType

  // 更新 v-model
  @Emit('model-change')
  private modelChange(value: ValueType): ValueType {
    return value
  }

  render(h: CreateElement): VNode {
    return (
      <div>123</div>
    )
  }
}
