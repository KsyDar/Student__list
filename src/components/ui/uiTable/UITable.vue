<script>
import UISelect from "@/components/ui/uiSelect/UISelect.vue";

export default {
    name: "UITable",
    components: {UISelect},
    props: {
        /** Заголовок таблицы */
        title: {
            type: String,
            required: false,
        },
        /** Элементы для отображения */
        items: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            /** Колонки */
            cols: [],
            /** Ширина окна браузера */
            width: window.innerWidth,
            /** Опции для селекта */
            selectOptions: []
        }
    },
    mounted() {
        /** Слоты колонок */
        const columnsSlots = this.$slots.default;
        /** Контент слотов */
        this.cols = columnsSlots.map(column => {
            return {
                title: column.componentOptions.propsData.title,
                titleSlot: column.data.scopedSlots.title,
                contentSlot: column.data.scopedSlots.content,
                filter: column.componentOptions.propsData.filter || 0,
                field: column.componentOptions.propsData.field,
                filterFunction: column.componentOptions.propsData.filterFunction,
                id: Symbol()
            }
        })
        /** Опции в зависимости от колонок */
        this.selectOptions = this.cols.map(col => {
            return {
                id: col.field,
                name: col.title,
                filter: col.filter
            }
        })

        window.addEventListener('resize', this.updateWidth);
    },
    unmounted() {
        window.removeEventListener('resize', this.updateWidth);
    },
    computed: {
        /** Отфильтрованные элементы */
        filteredItems: function () {
            const filteredCol = this.cols.find(col => col.filter !== 0);
            if (filteredCol === undefined) return this.items
            if (filteredCol.filter === 1) {
                return this.items.slice().sort((a, b) =>
                    filteredCol.filterFunction(a[filteredCol.field], b[filteredCol.field]))
            }

            if (filteredCol.filter === 2) {
                return this.items.slice().sort((a, b) =>
                    filteredCol.filterFunction(b[filteredCol.field], a[filteredCol.field]))
            }

            return this.items
        }
    },
    methods: {
        /**
         * Изменение фильтра колонки
         * @param column Колонка
         */
        changeFilter(column) {
            return () => {
                this.cols = this.cols.map(col => {
                    if (col.id !== column.id) {
                        col.filter = 0
                    }
                    return col
                })
                column.filter = (column.filter + 1) % 3
                return column.filter
            }
        },
        /** Обновление ширины окна браузера */
        updateWidth() {
            this.width = window.innerWidth;
        },
    },
    render(createElement) {
        let table = []
        /** Создание заголовков колонок */
        const headersSlots = []
        for (const col of this.cols) {
            if (col.titleSlot !== undefined) {
                headersSlots.push(createElement("div", {class: 'ui-table__header-item'}, [
                    col.titleSlot({changeFilter: this.changeFilter(col), filter: col.filter})
                ]))
            } else {
                headersSlots.push(createElement("div",
                    {
                        class: 'ui-table__header-item',
                        props: {changeFilter: this.changeFilter(col), filter: col.filter},
                    },
                    [
                        createElement("span", col.title)
                    ]))
            }
        }
        /** Заголовки колонок */
        const headers = createElement("div", {class: 'ui-table__header'}, headersSlots)
        /** Создание селекта для фильтрации элементов */
        const select = createElement(UISelect, {
            props: {
                options: this.selectOptions,
            },
            on: {
                select: (item) => {
                    this.cols = this.cols.map(col => {
                        if (col.field !== item.id) {
                            col.filter = 0
                        } else {
                            col.filter = 1
                        }
                        return col
                    })
                },
                filterUp: (item) => {
                    const col = this.cols.find(col => col.field === item.id)
                    col.filter = 1
                },
                filterDown: (item) => {
                    const col = this.cols.find(col => col.field === item.id)
                    col.filter = 2
                }
            }

        })
        /** Создание строк таблицы */
        const rows = []
        for (const item of this.filteredItems) {
            const columns = []
            const data = []
            for (let col in this.cols) {
                if (this.width > 768) {
                    columns.push(this.cols[col].contentSlot(item))
                } else {
                    data.push(createElement("div",
                        {class: 'ui-table__body-row-data'},
                        [headersSlots[col], this.cols[col].contentSlot(item)]
                    ))
                }
            }
            if (this.width > 768) {
                rows.push(createElement("div", {class: 'ui-table__body-row'}, columns))
            } else {
                rows.push(createElement("div", {class: 'ui-table__body-row'}, data))
            }
        }
        /** Контент таблицы - массив строк */
        const content = createElement("div", {class: 'ui-table__body'}, rows)

        if (this.width <= 768) {
            table = [select, content]
        } else {
            table = [headers, content]
        }

        return createElement(
            "div",
            {class: 'ui-table'},
            table
        )
    }
}
</script>

<style lang="scss">
@use "../../../assets/abstracts/fonts" as *;
@use "../../../assets/abstracts/colors" as *;
@use "../../../assets/abstracts/mixins" as *;
@use "../../../assets/abstracts/breackpoints" as *;

.ui-table {
  @include media('<large', '>=medium') {
    max-width: 1286px;
    overflow: auto;
    padding-bottom: .6rem;

    scrollbar-color: $blue-super-light $blue-light;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: $blue-super-light;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $blue-light;
      border-radius: 6px;
    }
  }

  &__header {
    display: grid;
    @include grid-template;
    grid-gap: 1px;
    margin-bottom: 1rem;
    @include caption;

    &-item {
      margin-left: 2rem;
      cursor: pointer;

      @include media('<medium') {
        cursor: default;
        width: 60%;
        margin: 0;
        display: flex;
        justify-content: flex-start;
      }

      & + & {
        display: flex;
        justify-content: center;
      }
    }
  }

  &__body {
    display: grid;
    grid-gap: 4px;

    &-row {
      display: grid;
      @include grid-template;
      grid-gap: 2px;
      @include normal-text;
      color: var(--color);
      cursor: pointer;

      @include media('>medium') {
        &:hover > div[class] {
          background-color: $blue-super-light;
        }
      }

      @include media('<medium') {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: $white;
        margin-bottom: .8rem;
        cursor: default;
      }

      &-data {
        display: flex;
        align-items: center;
        padding: .8rem 1.2rem;

        & + & {
          border-top: 1px solid $blue-light;
        }
      }
    }
  }
}
</style>