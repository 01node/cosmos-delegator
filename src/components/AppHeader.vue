<template>
  <nav id="navbar" class="navbar navbar-expand-lg fixed-top navbar-transparent">
    <div class="container">
      <div class="navbar-translate">
        <a class="navbar-brand" href="/">
          <span>Cosmos</span> Delegator
        </a>
        <button
          class="navbar-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse justify-content-end" id="navigation">
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <a>Cosmos Delegator</a>
            </div>
            <div class="col-6 collapse-close text-right">
              <button
                type="button"
                class="navbar-toggler"
                data-toggle="collapse"
                data-target="#navigation"
                aria-controls="navigation-index"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i class="tim-icons icon-simple-remove"></i>
              </button>
            </div>
          </div>
        </div>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/delegate" class="btn btn-primary">Delegate</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/bucket-delegate" class="nav-link">Buckets</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/validators" class="nav-link">Validators List</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/my-account" class="nav-link">My Account</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/help" class="nav-link">Help</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "app-header"
};

window.onscroll = function() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").classList.add("scrolled");
  } else {
    document.getElementById("navbar").classList.remove("scrolled");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#navbar.navbar {
  &.scrolled {
    background-color: rgba(0, 0, 0, 0.9) !important;
  }

  .nav-link {
    &.router-link-active {
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>
