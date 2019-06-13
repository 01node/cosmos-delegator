<template>
  <section class="section section-lg">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <h1 class="text-center">Introducing Buckets</h1>
          <p class="text-center">
            Delegate to one of our 3 buckets of validators (3-5 validators) to minimise the risk,
            and suport the decentralization of the network.
          </p>
          <div class="row row-grid justify-content-center">
            <div class="col-12 col-lg-3 text-left">
              <div class="info">
                <div class="icon icon-primary">
                  <i class="fab fa-bitbucket"></i>
                </div>
                <h4 class="info-title">Random Bucket</h4>
                <hr class="line-primary" />
                <p>
                  we choose 3-5 random validators from the list of active validators, we exclude the
                  validators with a commission greater than 20%.
                </p>
              </div>
            </div>
            <div class="col-12 col-lg-3 text-left">
              <div class="info">
                <div class="icon icon-warning">
                  <i class="fab fa-bitbucket"></i>
                </div>
                <h4 class="info-title">Small Validators Bucket</h4>
                <hr class="line-warning" />
                <p>
                  we choose 3-5 validators who don't have a big stake (from the bottom of the
                  top100)
                </p>
              </div>
            </div>
            <div class="col-12 col-lg-3 text-left">
              <div class="info">
                <div class="icon icon-success">
                  <i class="fab fa-bitbucket"></i>
                </div>
                <h4 class="info-title">Custom Bucket</h4>
                <hr class="line-success" />
                <p>
                  create your own bucket of 3-5 validators based on your preferences.
                </p>
              </div>
            </div>
            <div class="col-12 text-center">
              <router-link to="/bucket-delegate" class="btn btn-secondary"
                >Find more about Bucket Delegate <i class="fas fa-arrow-right"></i
              ></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'buckets-section'
};
</script>


<style lang="scss" scoped>
.info {
  padding-top: 20%;
}
</style>
