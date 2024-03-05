export const ImportName = `AFilter`
export const RenderContent = `<a-filter
      v-show="showSearch"
      v-hasPermi="'management:role:query'"
      :model="filterParams"
      :on-query="() => ac.handlePage(filterParams, true)"
    >
      <el-form-item
        v-for="item in FilterField"
        :key="item.prop"
        :label="item.title"
        :prop="item.prop"
      >
        <a-input v-model="filterParams[item.prop]" />
      </el-form-item>
    </a-filter>`
