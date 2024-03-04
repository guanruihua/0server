import { VDao } from "./index.test"
import { logGroup, toPathValue } from 'abandonjs'
import { mock } from 'mock-record'
import { _data } from './data'
const vDao = new VDao()

vDao.init('table', [_data])
vDao.init('a', (mock({
	"value|5-9": {
		// name: '@name'
		name: '@name'
	}
}) as any)?.value)

vDao['table'].delByPath()
const { useDashboardId, dashboard } = vDao['table'][0].Ruihua
// const { useDashboardId, dashboard } = 	vDao['table'].select({ 'Ruihua': /.*/ })[0].Ruihua

dashboard.forEach(item => {
	if (item.id === useDashboardId) {
		// console.log(item)
	}
})

// logGroup('test',
// vDao['table'].select({ 'Ruihua': /.*/ })[0],
// vDao['table'].select({ 'Ruihua': /.*/ })[0].Ruihua,
// )

vDao.init('_a', [{
	id: 'aaa',
	b: [1, 2, 3],
	c: {
		d: [{
			id: 'e1',
		}, {
			id: 'f2'
		}]
	}
}])

const _a = vDao['_a']
_a.addByPath({ a: 'bbb' }, '0.b')
_a.updateByPath('a', '0.b')
_a.updateByPath(1, '0.b')
_a.updateByPath([], '0.b')
_a.updateByPath(undefined, '0.c.d')
_a.updateByPath({ a: 'bbb' }, '0.b')
_a.addByPath('a', '0.b')
_a.delByPath('0.c.d')
// _a.addByPath('a','0.b')
1 && logGroup('test',
	// _a.updateByPath('bbb', '0.id'),
	// _a.updateByPath('bbb', '0.c.d'),
	// _a.updateByPath({ a: 'bbb' }, '0.c.e'),
	// _a.addByPath({ a: 'bbb' }, '0.b'),
	_a,
)

0 && logGroup('test-update',
	// _a.updateByPath('bbb', '0.id'),
	// _a.updateByPath('bbb', '0.c.d'),
	// _a.updateByPath({ a: 'bbb' }, '0.c.e'),
)

0 && logGroup('test-del',
	// _a.delByPath('0'),
	// _a.delByPath('0.id'),
)

0 && logGroup('test-select',
	// _a,
	// _a['0'],
	toPathValue(_a, '0.id'),
	_a.selectByPath('0.id')
)

// _a.add({ id: 'bbb', e: 123s })
// _a.addByPath({ id: 'cccc333' }, 'this[0].c.d')
// _a.updateByPath({ id: 'eee' }, 'this[1]')
// _a.delByPath('this[1]')

// const _r = "'fjsdkjf'"
// console.log(eval(`_a[1].id=${_r}`))

// console.log(_a.selectByPath('this[0]'))
// console.log(eval('_a[0]'))

// console.log(JSON.stringify(_a, null, 2))

// logGroup('test',
// 	vDao['a'],
// 	vDao['a'].select({ name: /R/ })
// )