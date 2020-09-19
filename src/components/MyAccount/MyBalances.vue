<template>
  <div class="card">
    <div class="card-header">My balances</div>
    <div class="card-body">
      <table class="table table-sm table-borderless text-white">
        <tr>
          <th class="text-success">Available</th>
          <th class="text-success text-right">{{ available }} {{ DENOM }}</th>
        </tr>
        <tr>
          <td>Delegated</td>
          <td class="text-right">{{ delegated }} {{ DENOM }}</td>
        </tr>
        <tr>
          <td>Unbonding</td>
          <td class="text-right">{{ unbonded }} {{ DENOM }}</td>
        </tr>
        <tr>
          <td>Rewards</td>
          <td class="text-right">{{ rewards }} {{ DENOM }}</td>
        </tr>
        <tr>
          <th>Total</th>
          <th class="text-right">
            <div class="total">{{ total }} {{ DENOM }}</div>
            <div class="total-usd font-weight-normal">
              ~ ${{ totalUsd }}
              <br>
              <span class="text-muted">
                <small>~ ${{ price }} / {{ DENOM }}</small>
              </span>
            </div>
          </th>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import axios from "axios";

import { DENOM, REALDENOM, DIVISOR, LCD } from "@/utils/helpers";
export default {
  name: "my-balances",
  data() {
    return {
      DENOM,
      price: 0,
      available: 0,
      delegated: 0,
      unbonded: 0,
      rewards: 0
    };
  },
  props: ["delegatorAddress"],
  computed: {
    total() {
      const totals = parseFloat(this.available) + parseFloat(this.delegated) + parseFloat(this.unbonded) + parseFloat(this.rewards) + parseFloat(this.unbonded);

      return totals;
    },
    totalUsd() {
      return parseFloat(this.total * this.price);
    }
  },
  methods: {
    async getAvailable() {
      const response = await axios.get(
        `${LCD}/bank/accounts/` + this.delegatorAddress
      );

      const rewarded = await response.data.value.coins.reduce((acc, it) => {
        return it.denom === REALDENOM ? acc + parseInt(it.amount) : acc;
      }, 0);

      this.available = parseFloat(rewarded / DIVISOR).toFixed(4);
    },
    async getRewards() {
      const response = await axios.get(
        `${LCD}/distribution/${
          this.delegatorAddress
        }/rewards`
      );

        const rewarded = await response.data.total;

      if (rewarded.length > 0) {
        this.rewards = parseFloat(rewarded[0].amount / DIVISOR).toFixed(
          4
        );
      }

    },
    async getDelegated() {
      const response = await axios.get(
        `${LCD}/stake/delegators/${
          this.delegatorAddress
        }/delegations`
      );

      const delegated = await response.data.reduce((acc, it) => {
        return acc + parseFloat(it.shares * DIVISOR);
      }, 0);

      this.delegated = parseFloat(delegated / DIVISOR).toFixed(4);
    },
    async getUnbonded() {
      const response = await axios.get(
        `${LCD}/stake/delegators/${
          this.delegatorAddress
        }/unbonding-delegations`
      );

      const unbonded = await response.data.reduce((acc, it) => {
        return acc + parseFloat(it.entries[0].balance * DIVISOR);
      }, 0);

      this.unbonded = parseFloat(unbonded / DIVISOR).toFixed(4);
    },
    async getPrice() {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/iris-network"
      );

      this.price = parseFloat(response.data.market_data.current_price.usd);
    }
  },
  beforeMount() {
    this.getRewards();
    this.getAvailable();
    this.getDelegated();
    this.getPrice();
    this.getUnbonded();
  }
};
</script>
