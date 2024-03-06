export const ImportName = `APageTable,  ARightToolbar, AButton`
export const ImportName2 = `import { FilterField, Columns } from './constant'`
export const render = ` <a-page-table
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
    </a-page-table>`