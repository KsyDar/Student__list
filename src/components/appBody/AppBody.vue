<template>
    <div class="app-body">
        <h1 class="app-body__title">Список заявлений</h1>
        <UISearcher v-model="searchText" @change="search" />
        <StudentTable :students="foundStudents" />
    </div>
</template>

<script>
import UISearcher from "@/components/ui/uiSearcher/UISearcher.vue";
import StudentTable from "@/components/appBody/studentTable/StudentTable.vue";

export default {
    name: "AppBody",
    components: {StudentTable, UISearcher},
    computed: {
        /** Найденные студенты по запросу пользователя */
        foundStudents() {
            return this.students.filter(student => student.name.toLowerCase().includes(this.searchText.toLowerCase()))
        }
    },
    methods: {
        /**
         * Сохранение поискового запроса в localstorage
         * @param text Поисковый запрос
         */
        search(text) {
            localStorage.setItem("search", text)
        }
    },
    data() {
        /** Моковые данные */
        const data = [
            {
                id: 1,
                name: "Соколова София Михайловна",
                date: "2023-01-25",
                subjects: [
                    {
                        subject: "Русский язык",
                        score: "4.3"
                    },
                    {
                        subject: "Математика",
                        score: "4"
                    },
                    {
                        subject: "Информатика",
                        score: "5"
                    }
                ]
            },
            {
                id: 2,
                name: "Павлов Владислав Эминович",
                date: "2023-02-24",
                subjects: [
                    {
                        subject: "Русский язык",
                        score: "5"
                    },
                    {
                        subject: "Математика",
                        score: "4"
                    },
                    {
                        subject: "Информатика",
                        score: "5"
                    }
                ]
            },
            {
                id: 3,
                name: "Филиппов Семён Глебович",
                date: "2023-01-22",
                subjects: [
                    {
                        subject: "Русский язык",
                        score: "4"
                    },
                    {
                        subject: "Математика",
                        score: "3"
                    },
                    {
                        subject: "Информатика",
                        score: "5"
                    }
                ]
            },
            {
                id: 4,
                name: "Щукина Мария Викторовна",
                date: "2023-03-20",
                subjects: [
                    {
                        subject: "Русский язык",
                        score: "4.2"
                    },
                    {
                        subject: "Математика",
                        score: "4.5"
                    },
                    {
                        subject: "Информатика",
                        score: "4.5"
                    }
                ]
            },
            {
                id: 5,
                name: "Потапова Вера Михайловна",
                date: "2023-01-21",
                subjects: [
                    {
                        subject: "Русский язык",
                        score: "3"
                    },
                    {
                        subject: "Математика",
                        score: "5"
                    },
                    {
                        subject: "Информатика",
                        score: "4"
                    }
                ]
            },
            {
                id: 6,
                name: "Ефремова Стефания Максимовна",
                date: "2023-02-02",
                subjects: [
                    {
                        subject: "Русский язык",
                        score: "4"
                    },
                    {
                        subject: "Математика",
                        score: "4"
                    },
                    {
                        subject: "Информатика",
                        score: "3"
                    }
                ]
            },
            {
                id: 7,
                name: "Сычев Василий Михайлович",
                date: "2023-02-02",
                subjects: [
                    {
                        subject: "Русский язык",
                        score: "4.3"
                    },
                    {
                        subject: "Математика",
                        score: "4.8"
                    },
                    {
                        subject: "Информатика",
                        score: "5"
                    }
                ]
            },
            {
                id: 8,
                name: "Соколова Полина Арсентьевна",
                date: "2023-01-29",
                subjects: [
                    {
                        subject: "Русский язык",
                        score: "4"
                    },
                    {
                        subject: "Математика",
                        score: "3"
                    },
                    {
                        subject: "Информатика",
                        score: "3"
                    }
                ]
            },
            {
                id: 9,
                name: "Шаповалов Артемий Сергеевич",
                date: "2023-01-20",
                subjects: [
                    {
                        subject: "Русский язык",
                        score: "5"
                    },
                    {
                        subject: "Математика",
                        score: "5"
                    },
                    {
                        subject: "Информатика",
                        score: "5"
                    }
                ]
            },
            {
                id: 10,
                name: "Александрова Милана Тимуровна",
                date: "2023-01-31",
                subjects: [
                    {
                        subject: "Русский язык",
                        score: "4.5"
                    },
                    {
                        subject: "Математика",
                        score: "3"
                    },
                    {
                        subject: "Информатика",
                        score: "3"
                    }
                ]
            }
        ]
        /** Преобразование данных с сервера под нужды клиента */
        const students = data.map(student => {
            const total = student.subjects.reduce((acc, cur) => acc + parseInt(cur.score), 0)
            return {
                id: student.id,
                name: student.name,
                date: student.date,
                ru: student.subjects[0].score,
                math: student.subjects[1].score,
                it: student.subjects[2].score,
                total: total,
                percent: Math.round(total / 15 * 100),
            }
        })

        return {
            /** Список студентов */
            students,
            /** Текст поискового запроса */
            searchText: ""
        }
    },
    beforeMount() {
        const storageSearch = localStorage.getItem("search")
        this.searchText = storageSearch || ""
    }
}
</script>

<style lang="scss">
@use "../../assets/abstracts/fonts" as *;
@use "../../assets/abstracts/colors" as *;
@use "../../assets/abstracts/breackpoints" as *;

.app-body {
  padding: 6rem;

  @include media('<huge', '>=medium') {
    padding: 4rem;
  }

  @include media('<medium') {
    padding: 1.2rem;
  }

  &__title {
    @include extra-title;
    margin-bottom: 2rem;
  }
}
</style>