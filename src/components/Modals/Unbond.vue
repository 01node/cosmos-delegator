<template>
  <div class="modal-container" v-if="from">
    <v-dialog v-model="dialogActive" width="500">
      <div class="card mb-0 bg-3 elevate-3 elevating-3">
        <div class="card-header">
          Unbond from
          <account type="validator" :address="from"></account>
        </div>

        <div class="card-body">
          <div class="form-group">
            <label>Amount</label>
            <input v-model="amount" type="number" step="0.001" class="form-control">
            <span class="maxShares" @click="addMax">Max: {{ shares }} {{ DENOM }}s</span>
          </div>
        </div>

        <div class="card-footer">
          <v-spacer></v-spacer>
          <button class="btn btn-primary" @click="generateTransaction">Generate transaction</button>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import Account from "@/components/Account.vue";
import { DENOM, REALDENOM, DIVISOR } from "@/utils/helpers";

export default {
  data() {
    return {
      DENOM,
      amount: 0
    };
  },
  props: ["dialog", "from", "delegatorAddress", "delegations"],
  components: { Account },
  computed: {
    shares() {
      const sharesData = this.delegations.find(
        item => item.validator_address === this.from
      );
      if (sharesData !== -1) {
        return parseFloat(sharesData.shares / DIVISOR);
      }

      return 0;
    },
    dialogActive: {
      get: function() {
        if (this.dialog) {
          return this.dialog;
          // Some dialog initialization code could be placed here
          // because it is called only when this.dialogVisible changes
        }
        return false;
      },
      set: function(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    addMax() {
      this.amount = this.shares;
    },
    async generateTransaction() {
      const txMessage = [
        {
          type: "cosmos-sdk/MsgUndelegate",
          value: {
            delegator_address: this.delegatorAddress,
            validator_address: this.from,
            amount: {
              denom: REALDENOM,
              amount: String(this.amount * DIVISOR)
            }
          }
        }
      ];
      this.$emit("generated-messages", txMessage);
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.maxShares {
  cursor: pointer;
}
</style>

