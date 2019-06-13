<template>
  <div class="row">
    <div class="col-12 mb-5 text-center">
      <h2>Select Bucket Type</h2>
    </div>
    <div class="col-12 col-md-4 text-center">
      <div class="card" @click="$emit('select-bucket', 'random')">
        <div class="card-header">
          <i class="fab fa-5x fa-bitbucket text-primary"></i>
        </div>
        <div class="card-body text-center">
          <h3>Random Bucket</h3>
          <p class="description">
            Randomly select 3-5 validators from the list of active validators, excluding the
            validators with a commission greater than 20%.
          </p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4 text-center">
      <div class="card" @click="$emit('select-bucket', 'small')">
        <div class="card-header">
          <i class="fab fa-5x fa-bitbucket text-warning"></i>
        </div>
        <div class="card-body text-center">
          <h3>Small Validators Bucket</h3>
          <p class="description">
            Randomly select 3 validators from the ones with the lowest stake values from the active
            validators list (bottom 20 validators).
          </p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4 text-center">
      <div class="card" @click="$emit('select-bucket', 'custom')">
        <div class="card-header">
          <i class="fab fa-5x fa-bitbucket text-success"></i>
        </div>
        <div class="card-body text-center">
          <h3>Custom Bucket</h3>
          <p class="description">
            Create your own custom bucket, by selecting validators from the entire active validators
            list. There are no restrictions enabled.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
.card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: lighten(#1f2251, 10%);
  }

  .card-header {
    margin-top: -10%;
  }
}
</style>
