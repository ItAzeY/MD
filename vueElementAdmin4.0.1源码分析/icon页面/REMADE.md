# Icon 页面分析

## html

```html
<!-- el-tabs组件 -->
<el-tabs type="border-card">
<!-- el-tab-pane 组件 -->
	<el-tab-pane label="Icons">
  <!-- 根据 iconsMap 循环代码 -->
		<div
			v-for="item of iconsMap"
			:key="item"
			@click="handleClipboard(generateIconCode(item), $event)"
		>
    <!-- el-tooltip文字提醒组件 -->
			<el-tooltip placement="top">
      <!-- 这个是el-ttoltip自定义插槽 -->
				<div slot="content">
					{{ generateIconCode(item) }}
				</div>
        <!--  -->
				<div class="icon-item">
					<svg-icon :icon-class="item" class-name="disabled" />
					<span>{{ item }}</span>
				</div>
			</el-tooltip>
		</div>
	</el-tab-pane>
	<el-tab-pane label="Element-UI Icons">
		<div
			v-for="item of elementIcons"
			:key="item"
			@click="handleClipboard(generateElementIconCode(item), $event)"
		>
			<el-tooltip placement="top">
				<div slot="content">
					{{ generateElementIconCode(item) }}
				</div>
				<div class="icon-item">
					<i :class="'el-icon-' + item" />
					<span>{{ item }}</span>
				</div>
			</el-tooltip>
		</div>
	</el-tab-pane>
</el-tabs>
```
