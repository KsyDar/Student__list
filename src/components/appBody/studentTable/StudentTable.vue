<template>
    <section class="student-table">
        <UITable :items="sortedStudents">
            <UITableCol v-for="col of columns"
                        :key="col.id"
                        :filterFunction="col.filter"
                        :filter="col.field === firstSelectedFilter.field ? firstSelectedFilter.filter : 0"
                        :field="col.field"
                        :title="col.title"
            >
                <template #title="{ changeFilter, filter }">
                    <div @click="setFilter(col, changeFilter)" class="student-table__header">
                        <span>{{ col.title }}</span>
                        <ArrowIcon v-if="filter !== 0" :class="{'rotated' : filter === 2}"/>
                    </div>
                </template>
                <template #content="item">
                    <td v-if="col.field === 'percent'" class="student-table__item student-table__item--percent">
                        <div class="percentage"
                             :style="stylesPercent(item[col.field], col.field)"
                        />
                        <span>
                            {{ item[col.field] }}%
                        </span>
                    </td>

                    <td v-else-if="col.field === 'date'" class="student-table__item">
                        {{ item[col.field].split('-').reverse().join('.') }}
                    </td>

                    <td v-else
                         class="student-table__item"
                         :style="getTextColor(item[col.field], col.field)"
                    >
                        {{ item[col.field] }}
                    </td>
                </template>
            </UITableCol>
        </UITable>
    </section>
</template>

<script>
import UITable from "@/components/ui/uiTable/UITable.vue";
import ArrowIcon from "../../../../public/icons/arrow.svg";
import UITableCol from "@/components/ui/uiTable/uiTableCol/UITableCol.vue";

export default {
    name: 'StudentTable',
    components: {UITableCol, ArrowIcon, UITable},
    props: {
        /** Список студентов */
        students: {
            type: Array,
            required: true
        },
    },
    watch: {
        students: function (val) {
            this.sortedStudents = val
        }
    },
    methods: {
        /**
         * Получение стилей для шкалы процентов
         * @param value Процент
         * @param field Поле таблицы
         */
        stylesPercent: function (value, field) {
            if (field !== 'percent') return

            const numValue = parseInt(value)
            if (numValue >= 75) {
                return `--color: var(--green); --percent: ${numValue}`
            } else if (numValue > 50) {
                return `--color: var(--orange); --percent: ${numValue}`
            }
            return `--color: var(--red); --percent: ${numValue}`
        },
        /**
         * Установка фильтра и сохранение его в localstorage
         * @param col Фильтруемая колонка
         * @param changeFilter Функция изменения фильтрации
         */
        setFilter(col, changeFilter) {
            const newFilter = changeFilter()
            localStorage.setItem("filterState", JSON.stringify({field: col.field, filter: newFilter}))
        },
        /** Функция фильрации */
        filterFunction: (a, b) => {
            if (a === b) return 0;
            if (a > b) return 1;
            if (a < b) return -1;
        },
        /**
         * Получения цвета баллов
         * @param value Оценка
         * @param field Поле
         */
        getTextColor: function (value, field) {
            if (field === 'it' || field === 'ru' || field === 'math' || field === 'total') {
                let max = 5
                if (field === 'total') max = 15

                const percent = value / max * 100
                if (percent >= 75) {
                    return '--text-color: var(--green); font-weight: 700;'
                } else if (percent > 50) {
                    return '--text-color: var(--orange); font-weight: 700;'
                }
                return '--text-color: var(--red); font-weight: 700;'
            }
        }
    },
    data() {
        const columns = [
            {
                id: 0,
                title: 'ФИО',
                field: 'name',
                filter: this.filterFunction,
            },
            {
                id: 1,
                title: 'Дата подачи заявления',
                field: 'date',
                filter: this.filterFunction,
            },
            {
                id: 2,
                title: 'Балл по русскому',
                field: 'ru',
                filter: this.filterFunction,
            },
            {
                id: 3,
                title: 'Балл по математике',
                field: 'math',
                filter: this.filterFunction,
            },
            {
                id: 4,
                title: 'Балл по информатике',
                field: 'it',
                filter: this.filterFunction,
            },
            {
                id: 5,
                title: 'Суммарный балл',
                field: 'total',
                filter: this.filterFunction,
            },
            {
                id: 6,
                title: 'Процент',
                field: 'percent',
                filter: this.filterFunction,
            }
        ]
        const sortedStudents = this.students.slice()
        return {
            /** Колонки таблицы */
            columns,
            /** Отсортированные студенты */
            sortedStudents,
            /** Первый выбранный фильтр */
            firstSelectedFilter: undefined
        }
    },
    beforeMount() {
        const storageFilter = localStorage.getItem('filterState')
        this.firstSelectedFilter = storageFilter === null ? {field: 'name', filter: 1} : JSON.parse(storageFilter)
    }
}
</script>


<style lang="scss">
@use "../../../assets/abstracts/fonts" as *;
@use "../../../assets/abstracts/colors" as *;
@use "../../../assets/abstracts/breackpoints" as *;

.student-table {

  &__header {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    color: $blue;
    transition: color .3s ease-in-out;

    @include media('>medium') {
      &:hover {
        color: $blue-dark;
      }
    }

    @include media('<medium') {
      color: $medium;

      & > svg {
        display: none;
      }
    }

    & > span {
      white-space: nowrap;
      margin-right: .3rem;
    }
  }

  &__item {
    --text-color: #000;

    padding: 2.35rem 2rem;
    transition: background-color .2s ease-in-out;
    color: var(--text-color);

    @include media('>medium') {
      background-color: $white;
    }

    @include media('<medium') {
      padding: 0;
      width: 40%;
    }

    &--percent {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      position: relative;

      @include media(">medium") {
        & > span {
          position: absolute;
        }
      }

      @include media("<medium") {
        flex-direction: row-reverse;
        justify-content: flex-end;

        & > span {
          margin-right: 1rem;
        }
      }
    }
  }
}

.percentage {
  --percent: 20;
  --border: 3px;
  --color: #000;
  --width: 40px;

  width: var(--width);
  height: 40px;
  border-radius: 50%;
  outline: 1px solid $blue-light;
  outline-offset: -2px;
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  place-content: center;

  @include media(">medium") {
    &:before,
    &:after {
      content: "";
      position: absolute;
      border-radius: 50%;
    }

    &:before {
      inset: 0;
      background: radial-gradient(farthest-side, var(--color) 98%, #0000) top/var(--border) var(--border) no-repeat,
      conic-gradient(var(--color) calc(var(--percent) * 1%), #0000 0);
      -webkit-mask: radial-gradient(farthest-side, #0000 calc(99% - var(--border)), #000 calc(100% - var(--border)));
      mask: radial-gradient(farthest-side, #0000 calc(99% - var(--border)), #000 calc(100% - var(--border)));
    }

    &:after {
      inset: calc(50% - var(--border) / 2);
      background: var(--color);
      transform: rotate(calc(var(--percent) * 3.6deg)) translateY(calc(60% - var(--width) / 2));
    }
  }

  @include media("<medium") {
    width: 13rem;
    height: 4px;
    border: none;
    border-radius: 10px;
    background-color: $blue-light;

    &:before {
      content: "";
      position: absolute;
      inset: 0;
      width: calc(var(--percent) * 1%);
      background: var(--color);
    }

    & > span {
      position: absolute;
      translate: 0 -50%;
      background: $white;
      padding-right: 1rem;
    }
  }

}
</style>
