<template>
    <form
            class="ui-searcher"
            @submit.prevent="$emit('search', input)"
    >
        <SearchIcon class="ui-searcher__icon" @click="this.$emit('search', input)"/>
        <input
                class="ui-searcher__input"
                type="text"
                placeholder="Поиск"
                v-model="input"
                @input="$emit( 'change', input)"
        />
    </form>
</template>

<script>
import SearchIcon from "/public/icons/search.svg";

export default {
    name: "UISearcher",
    components: {SearchIcon},
    emits: ['change'],
    props: {
        modelValue: {
            type: String,
            required: false
        }
    },
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    watch: {
        modelValue: {
            handler() {
                this.input = this.modelValue
            },
            immediate: true
        }
    },
    data() {
        const input = ''
        return {
            /** Текст поиска */
            input
        }
    }
}
</script>

<style lang="scss">
@use "../../../assets/abstracts/fonts" as *;
@use "../../../assets/abstracts/colors" as *;

.ui-searcher {
  display: flex;
  position: relative;
  margin-bottom: 2.4rem;
  background: $white;
  border-radius: 4px;
  border: 1px solid $blue-light;
  transition: border .3s ease-in-out;

  &:hover {
    border: 1px solid $blue-05;
  }

  &:focus-within {
    border: 1px solid $blue;
  }

  &__input {
    width: 100%;
    padding: 1.65rem 1.6rem;
    margin-left: 2.2rem;
    background: $white;

    color: $black;
    @include big-text;

    &::-moz-placeholder {
      color: $medium;
    }

    &::-webkit-input-placeholder {
      color: $medium;
    }
  }

  &__icon {
    position: absolute;
    top: calc(50% - 8px);
    left: 16px;
    cursor: pointer;
  }
}
</style>