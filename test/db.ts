export const text = `<script setup>
import { useHook } from './hook'
import {
  // $$filter.ImportName,
  APageTable, ARightToolbar,
  AButton,
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
    <a-page-table
      :loading="loading"
      :columns="Columns"
      :data="dataSource"
      :paging="paging"
      @pagination="ac.pagination"
    >
      <a-button
        permission="management:role:add"
        data-type="add"
        @click="dialogAc.onCreate"
      />
      <a-right-toolbar
        v-model:showSearch="showSearch"
        v-hasPermi="'management:role:query'"
        @refresh="ac.handlePage(filterParams)"
      />
      <template #actions="{ row }">
        <a-button
          v-if="row.code !=='admin'"
          permission="management:role:edit"
          data-type="edit"
          :click="() => dialogAc.onEdit(row)"
        />
        <a-button
          v-if="row.code !== 'admin'"
          permission="management:role:delete"
          data-type="del"
          :click="() => ac.handleDel(row)"
        />
      </template>
    </a-page-table>
    <edit-dialog :action="dialogAction" :ac="ac" />
  </div>
</template>

<style scoped></style>
`