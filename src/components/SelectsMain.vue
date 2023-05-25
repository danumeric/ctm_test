<template>
  <!-- <VSelect
      v-model="object"
      :options="[{key:1,description:'descr'},{key:2,description:'descr2'}]"
      title="title"
      width="200px"
      height="50px"
      placeholder="custom placeholder"
    /> -->
  <div class="selects-main">
    <VSelect
      v-model="choosedSupplyOption"
      :options="optionsSupply"
      title="Статус поставки"
      width="280px"
    />
    <VSelect v-model="choosedMovingOption" :options="optionsMoving" title="Режим перемещения" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { optionsSupply, optionsMoving } from '@/mock/mockOptions'

let choosedSupplyOption = ref({})
let choosedMovingOption = ref({})
</script>

<style scoped lang="scss">
.selects-main {
  display: flex;
  gap: 0 80px;
  margin-top: 4rem;
}
</style>
