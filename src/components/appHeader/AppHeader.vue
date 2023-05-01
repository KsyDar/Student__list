<template>
    <div class="app-header">
        <div class="app-header__logo">
            <TableLogo class="app-header__icon" />
            <p class="app-header__title">Система таблиц</p>
        </div>

        <div class="app-header__profile">
            <p class="app-header__profile-text">
                Светлана
                <span>Сотрудник</span>
            </p>
            <div class="app-header__profile-image">
                <img src="../../assets/images/profile.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import TableLogo from '../../../public/icons/tableLogo.svg';

export default {
    name: 'AppHeader',
    components: {
        TableLogo,
    }
}
</script>


<style lang="scss">
@use "../../assets/abstracts/fonts" as *;
@use "../../assets/abstracts/colors" as *;
@use "../../assets/abstracts/breackpoints" as *;

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 6rem;
  height: 8.4rem;
  width: 100%;
  background: $white;

  color: $blue;
  @include extra-title;

  @include media('<huge', '>=medium') {
    padding: 0 4rem;
  }

  @include media('<medium') {
    padding: 0 1.2rem;
  }

  &__logo {
    font-size: 1.6rem;
    text-transform: uppercase;

    display: flex;
    align-items: center;
    max-width: 13rem;
  }

  &__icon {
    width: 100%;
  }

  &__profile {
    display: flex;
    align-items: center;

    &-text {
      @include normal-bold-text;
      text-align: end;
      margin-right: .8rem;
      max-width: 7rem;

      & > span {
        @include normal-text;
        color: $medium;
      }
    }

    &-image {
      width: 44px;
      height: 44px;
    }
  }
}
</style>