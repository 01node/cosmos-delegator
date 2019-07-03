<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-3 ml-auto">
          <h1 class="title">Terra <span class="font-weight-light">Delegator</span></h1>
          <p>Powered by</p>
          <a href="https://01node.com" target="_blank">
            <img
              src="https://01node.com/wp-content/themes/node/img/logo-01node-white.svg"
              width="100px"
            />
          </a>
        </div>
        <div class="col-md-3">
          <h3 class="title">Reach us on:</h3>
          <div class="btn-wrapper profile">
            <a
              target="_blank"
              href="mailto:hello@01node.com"
              class="btn btn-icon btn-neutral btn-round btn-simple mr-2"
            >
              <i class="fas fa-envelope"></i>
            </a>
            <a
              target="_blank"
              href="https://github.com/01node"
              class="btn btn-icon btn-neutral btn-round btn-simple mr-2"
            >
              <i class="fab fa-github"></i>
            </a>
            <a
              target="_blank"
              href="https://twitter.com/01node"
              class="btn btn-icon btn-neutral btn-round btn-simple mr-2"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              target="_blank"
              href="https://medium.com/01node"
              class="btn btn-icon btn-neutral btn-round btn-simple mr-2"
            >
              <i class="fab fa-medium"></i>
            </a>
          </div>
        </div>
        <div class="col-md-3 mr-auto">
          <ul class="nav">
            <li class="nav-item">
              <a href="https://cosmos-delegator.01node.com" class="nav-link">Cosmos Delegator</a>
            </li>
            <li class="nav-item">
              <a href="https://iris-delegator.01node.com" class="nav-link">IRISnet Delegator</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer'
};
</script>
