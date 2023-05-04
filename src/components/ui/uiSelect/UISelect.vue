<template>
    <div class="ui-select" v-if="selectedOption">
        <div class="ui-select__content" >
            <div class="ui-select__content-form" @click="isOpen = !isOpen">
                <input  v-model="selectedOption.name" disabled/>
                <span>Сортировать по</span>
                <SelectIcon :class="{'button-rotate' : isOpen}"/>
            </div>

            <ul class="ui-select__list" v-if="isOpen">
                <li @click="select(option)" v-for="option of this.options" :key="option.id"
                    class="ui-select__list-item">
                    {{ option.name }}
                </li>
            </ul>
        </div>

        <div class="ui-select__buttons">
            <button class="ui-select__button"
                    :class="{'ui-select__button--selected': selectedOption.filter === 1}"
                    @click="filterUp">
                <ArrowIcon/>
            </button>
            <button class="ui-select__button ui-select__button--rotate"
                    :class="{'ui-select__button--selected': selectedOption.filter === 2}"
                    @click="filterDown">
                <ArrowIcon/>
            </button>
        </div>
    </div>
</template>

<script>
import ArrowIcon from "../../../../public/icons/arrow.svg";
import SelectIcon from "../../../../public/icons/selectIcon.svg";

export default {
    name: "UISelect",
    components: {ArrowIcon, SelectIcon},
    props: {
        /** Опции */
        options: {
            type: Array,
            required: true,
        }
    },
    emits: ["select", "filterUp", "filterDown"],
    data() {
        return {
            /** Выбранная опция */
            selectedOption: undefined,
            /** Состояние списка опций (открыт/закрыт) */
            isOpen: false,
        }
    },
    watch: {
        options: {
            handler: function () {
                if (this.options.length !== 0) {
                    this.selectedOption = this.options[0]
                } else {
                    this.selectedOption = undefined
                }
            },
            immediate: true
        }
    },
    methods: {
        /**
         * Выбор опции
         * @param item Опция
         */
        select(item) {
            this.isOpen = false
            this.selectedOption = item
            this.selectedOption.filter = 1
            this.$emit("select", item)
        },
        /** Установка фильтрации от большего к меньшему */
        filterUp() {
            this.selectedOption.filter = 1
            this.$emit('filterUp', this.selectedOption)
        },
        /** Установка фильтрации от меньшего к большему */
        filterDown() {
            this.selectedOption.filter = 2
            this.$emit('filterDown', this.selectedOption)
        }
    }
}
</script>

<style lang="scss">
@use "../../../assets/abstracts/fonts" as *;
@use "../../../assets/abstracts/colors" as *;
@use "../../../assets/abstracts/mixins" as *;
@use "../../../assets/abstracts/breackpoints" as *;

.ui-select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .8rem;

  &__content {
    background: $white;
    border-radius: 4px;
    border: 1px solid $blue-light;
    padding: .7rem 1.2rem;
    width: 70%;
    cursor: pointer;
    position: relative;

    &-form {
      height: 3rem;
      display: flex;
      align-items: center;
      position: relative;

      & > input {
        width: calc(100% - 17px);
        cursor: pointer;
      }

      & > span {
        position: absolute;
        top: -3px;
        left: 2px;
        @include caption-mini;
        color: $medium;
      }
    }
  }

  &__list {
    position: absolute;
    left: 0;
    top: 50px;
    z-index: 9999;
    background-color: $white;
    border: 1px solid $blue-light;
    border-radius: 4px;
    width: 100%;
    @include normal-text;
    color: $black;
    transition: background-color .4s ease-in-out;

    &-item {
      padding: 0.95rem 1.2rem;
      border-bottom: 1px solid $blue-light;

      &:hover {
        background-color: $blue-light;
      }
    }
  }

  &__button {
    width: 4.4rem;
    height: 4.4rem;
    padding: 0;
    border: 2px solid $blue;
    border-radius: 2px;
    background: $blue-super-light;
    color: $blue;

    &--selected {
      background-color: $blue;
      color: $white;
    }

    &--rotate {
      rotate: 180deg;
      margin-left: .4rem;
    }
  }

}
</style>