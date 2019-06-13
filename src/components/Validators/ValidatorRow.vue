<template>
  <tr>
    <td>
      <img :src="avatarUrl" class="rounded-circle" height="24px" />
      <router-link
        :to="data.operator_address"
        class="btn btn-link btn-neutral"
        v-text="data.description.moniker"
        append
      ></router-link>
    </td>
    <td class="operatorAddress" v-text="data.operator_address"></td>
    <td class="text-center"><span v-text="commissionRate"></span>%</td>
    <td><span v-text="bondedTokens"></span> IRIS</td>
    <td></td>
    <td></td>
    <td>
      <router-link to="/delegate/iva1nzgvvfam8n4lskkcqmhes07td6wkum9cffvkkx" class="btn btn-primary btn-simple"
        >Delegate</router-link
      >
    </td>
  </tr>
</template>


<script >
import { mapGetters } from 'vuex';
import { formatNumber } from '@/utils/helpers.js';

export default {
  name: 'validator-row',
  props: ['data'],
  computed: {
    ...mapGetters(['keybase']),
    validatorLink() {
      return '/validators/';
    },

    bondedTokens() {
      return formatNumber(parseInt(this.data.tokens));
    },

    avatarUrl() {
      if (this.keybase[this.data.description.identity] !== undefined) {
        return this.keybase[this.data.description.identity].avatarUrl;
      } else {
        return 'https://via.placeholder.com/24.png?text=?'; // TODO replace with local placeholder
      }
    },

    votingPower() {
      return '10%';
    },

    commissionRate() {
      return parseInt(100 * this.data.commission.rate);
    }
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
