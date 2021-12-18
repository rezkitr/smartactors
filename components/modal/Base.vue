<template>
  <transition name="modal-fade">
    <div
      class="modal-backdrop fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center"
    >
      <div
        class="bg-white w-72 md:w-96 shadow-md overflow-x-auto rounded-t-lg pb-4"
      >
        <div class="relative text-center border-b py-3 font-semibold">
          <slot name="header"> Title </slot>
          <button class="absolute right-3 top-3" @click="onClose">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div class="px-4">
          <slot name="body"> Body </slot>
        </div>
        <div class="px-4">
          <slot name="footer"> Footer </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$emit('onClose')
    },
  },
}
</script>

<style>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
</style>
