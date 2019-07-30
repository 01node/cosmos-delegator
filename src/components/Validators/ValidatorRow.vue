<template>
  <tr>
    <td>
      <img :src="avatarUrl" class="rounded-circle" height="24px" />
      <router-link
        :to="{ name: 'validator', params: { address: data.operator_address } }"
        class="btn btn-link btn-neutral"
        v-text="data.description.moniker"
      ></router-link>
      <span class="badge badge-success" v-if="data.description.moniker === '01node.com'"
        ><i class="fas fa-check"></i> metrics</span
      >
    </td>
    <td class="operatorAddress" v-text="data.operator_address"></td>
    <td class="text-center"><span v-text="commissionRate"></span></td>
    <td><span v-text="bondedTokens"></span> {{ DENOM }}</td>
    <td><span class="uptime" v-text="uptime"></span></td>
    <td><span v-text="selfBonded"></span> {{ DENOM }}s</td>
    <td>
      <router-link
        :to="{ name: 'delegate-to', params: { address: data.operator_address } }"
        class="btn btn-primary btn-simple"
        >Delegate</router-link
      >
    </td>
  </tr>
</template>


<script >
import { mapGetters } from 'vuex';
import { getSelfBonded, DENOM, DIVISOR } from '@/utils/helpers.js';

import numbro from 'numbro';

// cosmos1zcjduepqlzmd0spn9m0m3eq9zp93d4w6e5tugamv44yqjzyacelnvra634fqzxzscz
// cosmos17mggn4znyeyg25wd7498qxl7r2jhgue8ep585n
// cosmos17mggn4znyeyg25wd7498qxl7r2jhgue8ep585n

export default {
  name: 'validator-row',
  data() {
    return {
      DENOM,
      selfBonded: 0,
      uptime: null,
      commissionRate: null,
      bondedTokens: null
    };
  },
  props: ['data'],
  computed: {
    ...mapGetters(['keybase']),
    validatorLink() {
      return '/validators/';
    },

    avatarUrl() {
      if (this.keybase[this.data.description.identity] !== undefined) {
        return this.keybase[this.data.description.identity].avatarUrl;
      } else {
        return 'https://via.placeholder.com/24.png?text=?'; // TODO replace with local placeholder
      }
    }
  },
  async mounted() {
    let selfbond = await getSelfBonded(this.data.operator_address);

    this.selfBonded = numbro(selfbond).format({ thousandSeparated: true });

    this.uptime = numbro(1).format({ output: 'percent' });

    this.commissionRate = numbro(this.data.commission.rate).format({
      output: 'percent',
      mantissa: 0
    });

    this.bondedTokens = numbro(parseInt(this.data.tokens / DIVISOR)).format({
      thousandSeparated: true
    });

    /*  getSelfBonded(this.data.operator_address).then(function(response) {
      console.log(response);
      this.selfBonded = response;
    }); */
  }
};
</script>


<style lang="scss" scoped>
.operatorAddress {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
