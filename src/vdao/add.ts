import { iRow, Row } from './type'
import { setPathProp } from './util'

export function add(row: iRow | iRow[]): any {
	if (Array.isArray(row)) {
		const len: number = row.length
		let i = 0
		while (i < len) { this.push(row[i++]); }
	} else {
		this.push(row)
	}
	return this;
}

export function addByPath(row: Row, path?: string, where?: Record<string, any>) {
	if (!path) return add.bind(this)(row)
	setPathProp(this, { path, value: row, type: 'add', where })
	return this
}