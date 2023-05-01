<template>
    <div>
        <slot name="title"></slot>
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    name: "UITableCol",
    props: {
        /** Заголовок колонки */
        title: {
            type: String,
            required: false,
        },
        /** Параметры фильтра */
        filter: {
            type: Number,
            default: 0,
            required: false
        },
        /** Функция фильтрации */
        filterFunction: {
            type: Function,
            required: false
        },
        /** Поле объекта для отображения */
        field: {
            type: String,
            required: true,
        }
    },
}
</script>