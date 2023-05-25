<template>
  <header class="header">
    <div class="header__content container">Тест СТМ</div>
  </header>
</template>

<style scoped lang="scss">
.header {
  background: #f0f0f0;
  &__content {
    display: flex;
    align-items: center;
    margin-left: 3rem;
    font-size: 1.5rem;
    @media (min-width: 992px) {
      height: 40px;
    }
  }
}
</style>
