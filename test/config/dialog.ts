export const dependent = `import EditDialog from './edit-dialog.vue'`
export const render = `<edit-dialog :action="dialogAction" :ac="ac" />`
export const CodeDependent = `useDialog`
export const Code = `const dialogAction = useDialog()`