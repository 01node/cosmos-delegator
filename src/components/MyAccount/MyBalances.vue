<template>
  <div class="card">
    <div class="card-header">My balances</div>
    <div class="card-body">
      <table class="table table-sm table-borderless text-white">
        <tr>
          <th class="text-success">Available</th>
          <th class="text-success text-right">{{ available }} {{ DENOM }}s</th>
        </tr>
        <tr>
          <td>Delegated</td>
          <td class="text-right">{{ delegated }} {{ DENOM }}s</td>
        </tr>
        <tr>
          <td>Unbonding</td>
          <td class="text-right">{{ unbonded }} {{ DENOM }}s</td>
        </tr>
        <tr>
          <td>Rewards</td>
          <td class="text-right">{{ rewards }} {{ DENOM }}s</td>
        </tr>
        <tr>
          <th>Total</th>
          <th class="text-right">
            <div class="total">{{ total }} {{ DENOM }}s</div>
            <div class="total-usd font-weight-normal">
              ~ ${{ totalUsd }}
              <br>
              <span class="text-muted">
                <small>~ ${{ price }} / {{ DENOM }}</small>
              </span>
            </div>
          </th>
        </tr>
        <tr v-if="vesting !== false">
          <td colspan="2">
            <div class="mb-4">Vesting start<br/>
            {{ startFormatted }}
            </div>
            <div><b>Vesting</b></div>
            <vesting-balance v-for="(vest,index) in vesting" :key="index" :start="vestingStart" :amount="vest.amount[0].amount" :length="vest.length"/>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import moment from "moment";
import VestingBalance from '@/components/MyAccount/VestingBalance.vue';

import { DENOM, REALDENOM, DIVISOR } from "@/utils/helpers";
export default {
  name: "my-balances",
  data() {
    return {
      DENOM,
      DIVISOR,
      price: 0,
      available: 0,
      delegated: 0,
      unbonded: 0,
      rewards: 0,
      vesting: false,
      vestingStart: null,
      startFormatted: null
    };
  },
  props: ["delegatorAddress"],
  components: {VestingBalance},
  computed: {
    total() {
      const totals =
        this.available + this.delegated + this.unbonded + this.rewards + this.unbonded;

      return totals;
    },
    totalUsd() {
      return parseInt(this.total * this.price);
    }
  },
  methods: {
    async getAvailable() {
      const response = await axios.get(
        "https://kava-relay.01node.com/bank/balances/" + this.delegatorAddress
      );

      const rewarded = await response.data.result.reduce((acc, it) => {
        return it.denom === REALDENOM ? acc + parseInt(it.amount) : acc;
      }, 0);

      this.available = parseFloat(rewarded / DIVISOR);
    },
    async getRewards() {
      const response = await axios.get(
        `https://kava-relay.01node.com/distribution/delegators/${
          this.delegatorAddress
        }/rewards`
      );

      const rewarded = await response.data.result.reduce((acc, it) => {
        return it.denom === REALDENOM ? acc + parseInt(it.amount) : acc;
      }, 0);

      this.rewards = parseFloat(rewarded / DIVISOR);
    },
    async getDelegated() {
      const response = await axios.get(
        `https://kava-relay.01node.com/staking/delegators/${
          this.delegatorAddress
        }/delegations`
      );

      const delegated = await response.data.result.reduce((acc, it) => {
        return acc + parseInt(it.shares);
      }, 0);

      this.delegated = parseFloat(delegated / DIVISOR);
    },
    async getUnbonded() {
      const response = await axios.get(
        `https://kava-relay.01node.com/staking/delegators/${
          this.delegatorAddress
        }/unbonding_delegations`
      );

      const unbonded = await response.data.result.reduce((acc, it) => {
        return acc + parseInt(it.entries[0].balance);
      }, 0);

      this.unbonded = parseFloat(unbonded / DIVISOR);
    },
    async getPrice() {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/kava"
      );

      this.price = parseFloat(response.data.market_data.current_price.usd);
    },
    async getVested() {
      const response = await axios.get(
        `https://kava-relay.01node.com/auth/accounts/${this.delegatorAddress}`
      );

      const type = await response.data.result.type;

      if(type === 'cosmos-sdk/ValidatorVestingAccount') {
        this.vesting = response.data.result.value.PeriodicVestingAccount.vesting_periods;
        this.vestingStart = response.data.result.value.PeriodicVestingAccount.start_time;
        this.startFormatted = moment(this.vestingStart * 1000).format('DD.MM.YYYY');
      }
    }
  },
  beforeMount() {
    this.getRewards();
    this.getAvailable();
    this.getDelegated();
    this.getPrice();
    this.getUnbonded();
    this.getVested();
  }
};
</script>
