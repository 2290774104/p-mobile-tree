
import Vue from 'vue'
// for future
// export interface InstallationOptions {}
// export function install (vue: typeof Vue, options: InstallationOptions): void

// now
export function install(vue: typeof Vue): void

export type ValueType = string | number | string[] | number[]

export interface IProps {
	id?: string
	label?: string
	children?: string
	expand?: string
}
