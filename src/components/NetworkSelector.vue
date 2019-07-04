<template>
  <div>
    <div class="current-network">
      <a class="navbar-brand" href="/"> <span>Terra</span> Delegator </a>
      <i class="fas fa-chevron-down network-changer" @click="changeNetwork"> network change</i>

      <div class="network-selector">
        <ul>
          <li v-for="(network, index) in networks" :key="index">
            <a class="btn btn-link text-white" :href="network.link"
              ><img :src="network.logo" style="width: 50px;" class="mr-2" /> {{ network.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        }
        /* {
          id: 'terra',
          title: 'Terra (columbus-2)',
          current: true,
          link: 'https://terra-delegator.01node.com'
        } */
      ]
    };
  },
  methods: {
    changeNetwork() {
      const nselector = document.querySelector('.network-selector');

      nselector.classList.toggle('active');
    }
  }
};
</script>


<style lang="scss" scoped>
.current-network {
  position: relative;
}
.network-selector {
  position: absolute;
  left: 0;
  top: 3rem;
  z-index: 9999;
  display: none;
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
  box-shadow: 1px 2px 2px 0px #000;
  width:260px;
  background-color: lighten(#171941, 10);

  &.active {
    display: block;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      a {
        padding: 1rem !important;
        width: 100% !important;
        text-align: left;
      }

      &:hover {
        background-color: lighten(#171941, 6);
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid lighten(#171941, 20);
      }
    }
  }
}
.network-changer {
  &:hover {
    color: #fff;
    cursor: pointer;
  }
}
</style>
