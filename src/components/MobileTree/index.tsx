import { omit } from 'lodash'
import { CreateElement, VNode } from 'vue'
import { Component, Emit, Model, Prop, Vue, Watch } from 'vue-property-decorator'
import { ValueType, IProps } from '../../../types'
import './style/index.scss'

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

  // 展示数据
  @Prop({ type: Array, default: () => ([]) }) private readonly data!: any[]

  // 配置选项
  @Prop({ type: Object, default: () => ({}) }) private readonly props!: IProps

  // 是否默认展开所有节点
  @Prop({ type: Boolean, default: false }) private readonly defaultExpandAll!: boolean

  // 是否多选
  @Prop({ type: Boolean, default: false }) private readonly multiple!: boolean

  private handleFold(e: Event, data: any) {
    e.stopPropagation()
    const props = Object.assign({
      id: 'id',
      label: 'label',
      children: 'children',
      expand: 'expand'
    }, this.props)
    if (data[props.children]) {
      const itemRef = this.$refs[`${data[props.id]}_item`] as HTMLElement
      const childrenRef = this.$refs[`${data[props.id]}_children`] as HTMLElement
      const className = itemRef.className
      if (className.includes('fold')) {
        itemRef.classList.remove('fold')
        childrenRef.classList.remove('fold')
      } else {
        itemRef.classList.add('fold')
        childrenRef.classList.add('fold')
      }
    }
  }

  private selectData: any[] = []

  private handleSelect(data: any) {
    const props = Object.assign({
      id: 'id',
      label: 'label',
      children: 'children',
      expand: 'expand'
    }, this.props)
    const selectIds = this.selectData.map(o => o[props.id])
    if (selectIds.includes(data[props.id])) {
      this.selectData.splice(selectIds.indexOf(data[props.id]), 1)
      if (this.multiple) {
        this.clearChildren(data)
      }
    } else {
      if (this.selectData.length && !this.multiple) {
        this.selectData = []
      }
      this.selectData.push(data)
      if (this.multiple) {
        this.selectChildren(data)
      }
    }
    this.selectChange(this.selectData)
    this.modelChange(this.selectData.map(o => o[this.props.id || 'id']))
  }

  private selectChildren(data: any) {
    const props = Object.assign({
      id: 'id',
      label: 'label',
      children: 'children',
      expand: 'expand'
    }, this.props)

    const selectIds = this.selectData.map(o => o[props.id])
    if (data[props.children]) {
      data[props.children].forEach((i: any) => {
        if (!selectIds.includes(i[props.id])) {
          this.selectData.push(i)
        }
        if (i.children) {
          this.selectChildren(i)
        }
      });
    }
  }

  private clearChildren(data: any) {
    const props = Object.assign({
      id: 'id',
      label: 'label',
      children: 'children',
      expand: 'expand'
    }, this.props)

    const selectIds = this.selectData.map(o => o[props.id])
    if (data[props.children]) {
      data[props.children].forEach((i: any) => {
        this.selectData.splice(selectIds.indexOf(i[props.id]), 1)
        selectIds.splice(selectIds.indexOf(i[props.id]), 1)
        if (i.children) {
          setTimeout(() => {
            this.clearChildren(i)
          })
        }
      });
    }
  }

  @Emit('select-change')
  private selectChange(selectData: any[]): any[] {
    return selectData
  }

  render(h: CreateElement): VNode {
    console.log(this.data);

    const props = Object.assign({
      id: 'id',
      label: 'label',
      children: 'children',
      expand: 'expand'
    }, this.props)

    const renderArrow = (data: any) => {
      return <i class="el-icon-arrow-right" onclick={(e: Event) => this.handleFold(e, data)} />
    }

    const renderCheck = () => {
      return <i class="el-icon-check" />
    }

    const renderChildren = (data: any) => {
      const expand = data[props.expand] || this.defaultExpandAll
      return (
        <div class={{
          'p-mobile-tree-children': true,
          fold: !expand
        }} ref={`${data[props.id]}_children`}>
          {renderList(data[props.children])}
        </div>
      )
    }

    const renderList = (data: any[]) => {
      return data.map(o => {
        const expand = o[props.expand] || this.defaultExpandAll
        return (
          <div class="p-mobile-tree-wrap">
            <div class={{
              'p-mobile-tree-item': true,
              fold: !expand,
              'p-mobile-tree-item_check': this.selectData.map(i => i[props.id]).includes(o[props.id])
            }} ref={`${o[props.id]}_item`} onclick={() => this.handleSelect(o)}>
              <div>{o[props.label]}</div>
              {/* { this.selectData.includes(o) ? renderCheck() : '' } */}
              {o[props.children] ? renderArrow(o) : ''}
            </div>
            {o[props.children] ? renderChildren(o) : ''}
          </div>
        )
      })
    }
    return (
      <div class="p-mobile-tree">
        {renderList(this.data)}
      </div >
    )
  }
}
