import { VDao } from '../../src'

const vDao = new VDao()
vDao.init('db', [
	{
		value: [
			{
				id: 'aa',
				value: 'aaaa'
			}, {
				id: 'bb',
				value: 'bbbb'
			}
		]
	}
])

const db = vDao['db']

// db.addByPath({ id: 'cc', value: 'cccc' }, '0.value')
// db.addByPath({ id: 'cc', value: 'ccccd' }, '')
// db.updateByPath({ id: 'aa222', value: 'aaaa2' }, '0.value', { id: 'aa' })
// db.updateByPath({ id: 'aa3', value: 'aaaa3' }, '0.value', { id: 'aa2' })

// console.log(db)
// console.log(db.selectByPath('0.value'))
console.log(db.selectByPath('0.value', { id: 'aa' }))
// console.log(db[0].value)
// console.log(db.selectByPath(''));
