<template>
  <div>
    <div class="mb-4">
      <button
        class="btn btn-primary"
        @click="openDeposit"
        v-if="proposal.proposal_status === 'DepositPeriod' && !deposit"
      >
        Deposit
      </button>
    </div>
    <div class="deposit-form" v-if="deposit === true">
      <div v-if="!depositLoading">
          <label>Enter deposit amount (in {{ DENOM }})</label>
        <input v-model="amount" type="number" step="0.001" class="form-control mb-2" />

        <button class="btn btn-primary" @click="generateDeposit">Start Deposit</button>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
    <table class="table">
      <tr>
        <td>Proposal ID</td>
        <td>{{ proposal.id }}</td>
      </tr>
      <tr>
        <td>Proposer</td>
        <td>{{ proposer }}</td>
      </tr>
      <tr>
        <td>Title</td>
        <td>{{ proposal.content.value.title }}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>{{ proposal.content.value.description }}</td>
      </tr>
      <tr>
        <td>Proposal Type</td>
        <td>{{ proposal.content.type }}</td>
      </tr>
      <tr>
        <td>Proposal Status</td>
        <td>{{ proposal.proposal_status }}</td>
      </tr>
      <tr>
        <td>Deposit</td>
        <td>{{ proposal.total_deposit[0].amount / DIVISOR }} {{ DENOM }}</td>
      </tr>
      <tr>
        <td>Tally Result</td>
        <td>
          <p>{{ proposal.final_tally_result.yes }} Yes</p>
          <p>{{ proposal.final_tally_result.abstain }} Abstain</p>
          <p>{{ proposal.final_tally_result.no }} No</p>
          <p>{{ proposal.final_tally_result.no_with_veto }} No with veto</p>

          <p class="alert-alert-info" v-if="proposal.voting_start_time === '0001-01-01T00:00:00Z'">
            Voting not started yet
          </p>
        </td>
      </tr>
      <tr>
        <td>Submit Time</td>
        <td>{{ proposal.submit_time }}</td>
      </tr>
      <tr>
        <td>Deposit End Time</td>
        <td>{{ proposal.deposit_end_time }}</td>
      </tr>
      <tr>
        <td>Voting Start Time</td>
        <td>{{ proposal.voting_start_time }}</td>
      </tr>
      <tr>
        <td>Voting End Time</td>
        <td>{{ proposal.voting_end_time }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { DENOM, DIVISOR, formatNumber, REALDENOM, LCD } from '@/utils/helpers';
import axios from 'axios';

export default {
  name: 'proposal',
  data() {
    return {
      DENOM,
      DIVISOR,
      proposer: null,
      deposit: false,
      depositLoading: false,
      amount: 0
    };
  },
  props: ['proposal', 'depositor'],
  async mounted() {
    const response = await axios.get(`${LCD}/gov/proposals/${this.proposal.id}/proposer`);
    const proposer = await response.data.result;

    this.proposer = proposer.proposer;
  },
  methods: {
    openDeposit() {
      this.deposit = true;
    },
    generateDeposit() {
       const txMessage = [
          {
            type: 'cosmos-sdk/MsgDeposit',
            value: {
              proposal_id: this.proposal.id,
              depositor: this.depositor,
              amount: {
                denom: REALDENOM,
                amount: String(this.amount * DIVISOR)
              }
            }
          }
        ];

      return this.$emit('generate-deposit', txMessage);
    }
  }
};
</script>

<style lang="scss" scoped>
tr {
  padding: 0.5rem;
  td {
    color: #fff;
    font-size: 1rem;
    border-bottom: 1px solid #444;
  }
}
</style>