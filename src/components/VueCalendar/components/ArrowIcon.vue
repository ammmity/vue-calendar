<template>
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 8"
    :width="width"
    :height="height"
    :class="`arrow-icon arrow-icon--${direction}`"
  >
    <path
      d="M1.41 0.0899963L6 4.67L10.59 0.0899963L12 1.5L6 7.5L0 1.5L1.41 0.0899963Z"
      :fill="fill"
    />
  </svg>
</template>

<script>
export default {
  name: "ArrowIcon",
  props: {
    direction: {
      type: String,
      default: "bottom",
    },
    width: {
      type: String,
      default: "12px",
    },
    height: {
      type: String,
      default: "8px",
    },
    fill: {
      type: String,
      default: "#D9D9D9",
    },
  },
};
</script>

<style lang="scss">
.arrow-icon {
  transition: transform 0.25s linear;

  &--top {
    transform: rotate(180deg);
  }

  &--left {
    transform: rotate(90deg);
  }

  &--right {
    transform: rotate(-90deg);
  }
}
</style>
