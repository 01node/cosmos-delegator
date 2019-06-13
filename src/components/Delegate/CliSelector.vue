<template>
  <div class="col-12 col-md-4">
    <div class="card" @click="selectMethod('cli')">
      <div class="card-header d-flex justify-content-between">
        <h6 class="category-social"><i class="fas fa-terminal"></i> Delegate with IRISCLI</h6>
        <a href="#" class="btn btn-round btn-link p-0 m-0">
          <i class="fas fa-lg fa-question-circle"></i>
        </a>
      </div>
      <div class="card-body text-center py-4 px-5">
        <img src="https://www.irisnet.org/dist/irisnet_logo.png?4386a8f8710c9076ff3bb63fc78ef4e7" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'cli-selector',

  methods: {
selectMethod(type) {
    return this.$emit('method-select', type);
  }
  }
  
}
</script>


<style lang="scss" scoped>
.card {
  transition: all 0.2s ease;

  img {
    width: auto;
    height: 60px;
  }

  &:hover {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.5);
    transform: translateY(-2px);

    cursor: pointer;
  }
}
</style>
