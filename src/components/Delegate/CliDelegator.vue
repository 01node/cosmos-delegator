<template>
  <div v-if="validator" class="col-12 col-md-8">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h6 class="category-social"><i class="fas fa-terminal"></i> Delegate with IRISCLI</h6>
        <a href="#" class="btn btn-round btn-link p-0 m-0">
          <i class="fas fa-lg fa-question-circle"></i>
        </a>
      </div>
      <div class="card-body">
        <div class="col-12 col-md-6" v-if="!delegated">
          <div class="form-group">
            <label>Delegate amount (in IRIS)</label>
            <input type="number" v-model="delegateValue" value="0" placeholder="Enter amount" class="form-control" />
          </div>
          <div class="form-group">
            <label>Key name</label>
            <input type="text" v-model="delegateKey" value="0" placeholder="Enter your account key" class="form-control" />
          </div>
          <div class="form-group">
            <input type="checkbox" v-model="ledger" /> Use Ledger to delegate
          </div>
          <div class="form-group">
            <button class="btn btn-primary" @click="generateTx()">Generate transaction</button>
          </div>
        </div>
        <div class="col-12" v-else>
          <textarea class="form-control" v-model="delegateCommand"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'cli-delegator',
  data: () => {
    return {
      delegateValue: 0,
      delegateKey: null,
      ledger: false,
      delegated: false,
      delegateCommand: null
    }
  },
  props: ['operator_address'],
  computed: {
    ...mapGetters([
      'getValidatorByAddress',
    ]),
    validator() {
      return this.getValidatorByAddress(this.operator_address);
    }
  },
  methods: {
    generateTx() {
      this.delegated = true;
      this.delegateCommand = `iriscli stake delegate --chain-id irishub --node https://iris-relay.01node.com/ --address-validator ${this.operator_address} --amount ${this.delegateValue}iris --from ${this.delegateKey} --fee 0.5iris --gas 75000`;

      if(this.ledger) {
        this.delegateCommand += ' --ledger';
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  textarea {
    width: 100%;
    height: 150px;
  }
</style>
