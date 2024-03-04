import { tTable } from './type'
import { add, addByPath } from './add'
import { del, delByPath } from './delete'
import { select, selectByPath, selectPage } from './select'
import { update, updateByPath } from './update'
import { format } from './util'

function initCRUD(tableData: tTable): void {
	Object.defineProperties(tableData, {
		select: { value: select },
		selectByPath: { value: selectByPath },
		selectPage: { value: selectPage },
		add: { value: add },
		addByPath: { value: addByPath },
		update: { value: update },
		updateByPath: { value: updateByPath },
		del: { value: del },
		delByPath: { value: delByPath },
		format: { value: format }
	})
}

// 简易数据临时存储实现实现
// 生成数据库的同时生成 对应的接口 配置 , 再通过app去注册
export class VDao {
	init(tableName: string, tableData?: tTable): any {
		if (!tableData) { tableData = []; }
		initCRUD(tableData)
		this[tableName] = tableData ?? []
		return this;
	}
	insert(tableName: string, tableData: tTable): any {
		if (!this[tableName]) { this.init(tableName); }
		if (Array.isArray(tableData)) {
			const len: number = tableData.length;
			let i = 0
			while (i < len) { this[tableName].push(tableData[i++]); }
		} else {
			this[tableName].push(tableData);
		}
		return this;
	}
}