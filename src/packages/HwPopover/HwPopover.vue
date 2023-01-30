<template>
  <div
    class="hw-popover-container"
    :class="[popoverProps.containerClass]"
  >
    <component
      :is="component"
      v-bind="componentProps"
      @close="onClose"
    />
    <div
      class="hw-popover-arrow"
      :class="[`arrow-${popoverProps.placement}`, popoverProps.arrowClass]"
      v-if="popoverProps.useArrow"
      ref="arrow"
    >
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onClose(){
      this.$popover.close();
    }
  }
}
</script>
