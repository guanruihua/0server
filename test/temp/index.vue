<script setup>
import { useHook } from './hook'
import {
  // $$filter.ImportName,
  // $$table.ImportName,
  useDialog,
} from '@/components'
import { FilterField, Columns } from './constant'
import EditDialog from './edit-dialog.vue'
const dialogAction = useDialog()
const dialogAc = dialogAction[3]
const { loading, filterParams, paging, showSearch, dataSource, ac } = useHook()
</script>

<template>
  <div class="app-container">
    <!-- $$filter.RenderContent -->
    <!-- $$table.Render -->
    <edit-dialog :action="dialogAction" :ac="ac" />
  </div>
</template>

<style scoped></style>
