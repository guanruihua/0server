<script setup>
defineOptions({ name: 'EditDialog' })
import { ADialog, AForm, AInput } from '@/components'
import { DialogFields } from './constant'
import { formValidate } from '@/utils/index'

const props = defineProps({
  action: {
    type: Array,
    required: true
  },
  ac: {
    type: Object,
    required: true
  }
})
const [dialogVisible, dialogRecord, dialogType, dialogAc] = props.action
</script>

<template>
  <a-dialog
    v-model="dialogVisible"
    :data-type="dialogType"
    :close="dialogAc.onClose"
    :save="formValidate(editRef, () => ac.handleSave(dialogRecord, dialogAc))"
  >
    <a-form :model="dialogRecord">
      <div v-for="field in DialogFields" :key="field.prop">
        <el-form-item :prop="field.prop" :label="field.title">
          <a-input v-model="dialogRecord[key]" />
        </el-form-item>
      </div>
    </a-form>
  </a-dialog>
</template>
