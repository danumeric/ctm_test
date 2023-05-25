<template>
  <div
    ref="vSelect"
    tabindex="0"
    class="v-select"
    @focus="changeFocus(true)"
    @blur="changeFocus(false)"
  >
    <div
      class="v-select__selected"
      :class="{
        'v-select__selected_focused': isFocused,
        'v-select_w': width,
        'v-select_h': height,
      }"
    >
      <span class="v-select__title">{{ props.title }}</span>
      <span v-if="selected[displayedKey]">
        {{ selected[displayedKey] }}
      </span>
      <span v-else class="v-select__selected_placeholder">
        {{ props.placeholder ? props.placeholder : 'Выберите вариант' }}
      </span>
    </div>
    <div
      v-show="props.options.length"
      class="v-select__options"
      :class="{ 'v-select__options_focused': isFocused }"
    >
      <div class="v-select__close">
        <p class="v-select__title">{{ props.title ? props.title.split(' ')[0] : '' }}</p>
        <div @click="changeFocus(false)" class="v-select__ico-close"></div>
      </div>

      <div
        v-for="(opt, id) of props.options"
        :key="`${props.title}_${id}`"
        class="v-select__option"
        :class="{ 'v-select__option_active': props.modelValue === opt }"
        @click="selected = opt"
      >
        {{ opt[props.displayedKey] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, computed, defineProps, ref, PropType } from 'vue'
import { IOption } from '@/models/options.model'

let isFocused = ref(false)
let vSelect = ref()

const props = defineProps({
  modelValue: {
    type: Object as PropType<IOption>,
    default: () => ({}),
  },
  options: {
    type: Array as PropType<IOption[]>,
    default: () => [],
    required: true,
  },
  placeholder: {
    type: String,
    default: null,
    required: false,
  },
  title: {
    type: String,
    default: null,
    required: true,
  },
  displayedKey: {
    type: String,
    default: 'description',
    required: false,
  },
  width: {
    type: String,
    default: null,
    required: false,
  },
  height: {
    type: String,
    default: null,
    required: false,
  },
})

let emit = defineEmits(['update:modelValue'])

let selected = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    changeFocus(false)
  },
})

function changeFocus(newFocusValue: boolean) {
  isFocused.value = newFocusValue
  if (newFocusValue === true) {
    let backgroundWrapper: HTMLDivElement = document.createElement('div')
    backgroundWrapper.className = 'background-wrapper'
    backgroundWrapper.onclick = function () {
      isFocused.value = false
      backgroundWrapper.remove()
    }
    document.body.prepend(backgroundWrapper)
  }

  if (newFocusValue === false) {
    document.querySelector('.background-wrapper')?.remove()
    vSelect.value.blur()
  }
}
</script>

<style lang="scss" scoped>
.v-select {
  position: relative;
  cursor: pointer;
  outline: none;
  width: fit-content;
  color: #000000;
  font-weight: 300;
  font-size: 1rem;
  line-height: 150%;
  user-select: none;

  &__selected {
    display: flex;
    flex-direction: column;
    transition: all 0.2s;
    outline: none;
    border: 1px solid #c3c3c3;
    border-radius: 10px;
    background: #ffffff;
    padding: 4px 38px 4px 12px;
    width: 220px;
    height: 50px;
    &::after {
      position: absolute;
      right: 12px;
      bottom: 40%;
      transform: rotate(180deg) translateY(-20%);
      transition: all 0.2s;
      background: url(../../assets/ico-svg/arrow-input-top-def.svg) no-repeat center / cover;
      width: 19px;
      height: 10px;
      content: '';
    }
    &_focused {
      outline: none;
      border: 1px solid #4024d6;
      &:after {
        transform: rotate(360deg);
      }
    }

    span {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &_placeholder {
      color: #676767;
    }
  }

  &__title {
    font-weight: 700;
  }

  &__options {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    left: 0;
    z-index: 1;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.25);
    border-radius: 10px 0 0 10px;
    background-color: #ffffff;
    padding: 7px 0;
    max-height: 205px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    &_focused {
      display: block;
    }

    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgb(194, 194, 194);
      border-radius: 33px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #8a8a8a;
    }
  }

  &__option {
    cursor: pointer;
    padding: 2px 12px;
    &_active {
      font-weight: 700;
    }
    &:hover {
      background: #f5f5f5;
    }
  }

  &__close {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: default;
    padding: 2px 12px;
  }
  &__ico-close {
    cursor: pointer;
    background: url(../../assets/ico-svg/close-def.svg) no-repeat center / cover;
    width: 12px;
    height: 12px;
  }
  &_w {
    width: v-bind('props.width');
  }

  &_h {
    height: v-bind('props.height');
  }
}
</style>
<style lang="scss">
.background-wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: transparent;
}
</style>
