import { iRow, iParam } from './type'
import { format, matchItem, getPathValue } from './util'

export function select(whereParam?: iParam): any {
	if (!whereParam) { return this; }
	const list = this.filter((item: iRow): iRow => {
		if (matchItem(item, whereParam)) { return item; }
	})
	Object.defineProperty(list, 'format', {
		value: format,
	})
	return list;
}

export function selectByPath(path: string, where?: Record<string, any>) {
	return getPathValue(this, path, where)
}


export function selectPage(
	pageSize: number | string,
	pageNo: number | string,
	whereParam?: iParam
): any {

	let list: any[] = []

	if (!pageSize) { pageSize = 10; }
	if (!pageNo || !(Number(pageNo) > 1)) { pageNo = 1; }

	const min: number = Number(pageSize) * (Number(pageNo) - 1)
	const max: number = Number(pageSize) * Number(pageNo)

	// eslint-disable-next-line @typescript-eslint/no-this-alias
	if (!whereParam) { list = this; }
	else {
		list = this.filter((item: iRow): iRow => {
			if (matchItem(item, whereParam)) { return item; }
		})
		Object.defineProperty(list, 'format', {
			value: format,
		})
	}
	return list.filter((item: iRow, index: number): iRow => {
		if (index >= min && index < max) { return item; }
	});
}