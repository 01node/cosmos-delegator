<template>
  <div class="container d-flex py-5 flex-column justify-content-center">
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h1>Select your network</h1>
      </div>
      <div class="col-12 col-md-4" v-for="(network, index) in networks" :key="index">
        <a :href="network.link">
          <div class="card card-coin card-plain">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <div
                class="image-container"
                :class="network.id"
                v-bind:style="{ backgroundImage: 'url(' + network.logo + ')' }"
              ></div>

              <div class="description text-center">{{ network.title }}</div>
            </div>
          </div>
        </a>
      </div>
    </div>

    <div class="mt-4 text-center">
      <h4>Project build by</h4>
      <a href="https://01node.com">
        <img
          src="https://01node.com/wp-content/themes/node/img/logo-01node-white.svg"
          width="150px;"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  data() {
    return {
      networks: [
        {
          id: 'cosmos',
          title: 'Cosmos (cosmoshub-2)',
          logo: 'https://cosmos.network/img/cosmos-wordmark.6cbfcad2.svg',
          current: false,
          link: 'https://cosmos-delegator.01node.com'
        },
        {
          id: 'iris',
          title: 'IRISnet (irishub)',
          logo: 'https://www.irisnet.org/dist/irisnet_logo.png?4386a8f8710c9076ff3bb63fc78ef4e7',
          current: false,
          link: 'https://iris-delegator.01node.com'
        },
        {
          id: 'terra',
          title: 'Terra (columbus-2)',
          logo:
            'https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-LUZHYWSCovhzTQtyRDP%2Favatar.png?generation=1554296533269532&alt=media',
          current: true,
          link: 'https://terra-delegator.01node.com'
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;

  .card-coin {
    height: 200px;
    transition: all 0.2s ease-in-out;

    &:hover {
      cursor: pointer;
      background-color: #344675;
    }

    .image-container {
      width: 100%;
      height: 100px;
      background-size: 50%;
      background-position: center center;

      &.terra {
        background-size: auto 50%;
      }
    }

    img {
      width: 60%;
    }

    .description {
      display: block;
      width: 100%;
    }
  }
}
</style>
