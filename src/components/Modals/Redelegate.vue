<template>
  <div class="modal-container" v-if="from">
    <v-dialog v-model="dialogActive" width="500">
      <div class="card mb-0 bg-3 elevate-3 elevating-3">
        <div class="card-header">
          Redelegate from
          <account type="validator" :address="from"></account>
        </div>

        <div class="card-body">
          <div class="form-group">
            <label>From</label>
            <select v-model="from" class="form-control">
              <option
                v-for="(item, index) in delegations"
                :key="index"
                :value="item.validator_address"
              >
                <account type="validator" :address="item.validator_address"></account>
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>To</label>
            <input type="radio" v-model="type" value="single" class="ml-2 mr-2" />
            <label>Single validator</label>
            <input type="radio" v-model="type" value="bucket" class="ml-4 mr-2" />
            <label>Bucket</label>
            <select v-model="to" class="form-control mt-2" v-if="type === 'single'">
              <option selected>Select validator</option>
              <option
                v-for="(item, index) in validators"
                :key="index"
                :value="item.operator_address"
              >
                <account type="validator" :address="item.operator_address"></account>
              </option>
            </select>
          </div>
          <div class="form-group mt-4" v-if="type === 'bucket'">
            <div class="row">
              <div class="col-12 col-md-4 text-center bucket">
                <div class="card" @click="selectBucket('random')">
                  <div class="card-header">
                    <i class="fab fa-5x fa-bitbucket text-primary"></i>
                  </div>
                  <div class="card-body text-center">
                    <h5 class="mb-0">Random Bucket</h5>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 text-center bucket">
                <div class="card" @click="selectBucket('small')">
                  <div class="card-header">
                    <i class="fab fa-5x fa-bitbucket text-warning"></i>
                  </div>
                  <div class="card-body text-center">
                    <h5 class="mb-0">Small Bucket</h5>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-4 text-center bucket">
                <div class="card" @click="selectBucket('custom')">
                  <div class="card-header">
                    <i class="fab fa-5x fa-bitbucket text-success"></i>
                  </div>
                  <div class="card-body text-center">
                    <h5 class="mb-0">Custom Bucket</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="selected-validators" class="row mt-5" v-if="selectedBucket !== null">
            <div
              v-for="(validator, index) in selectedValidators"
              class="col-12"
              :key="validator.operator_address"
            >
              <validator-card
                :validator="validator"
                :ind="index"
                v-on:remove-selected="removeFromList"
              />
            </div>

            <div
              class="col-12"
              v-if="selectedValidators.length === 0 || selectedBucket === 'custom'"
            >
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12 col-md-3 d-flex align-items-center justify-content-center">
                      <i class="fas fa-plus-circle fa-5x"></i>
                    </div>
                    <div class="col-12 col-md-9">
                      <div>
                        <button
                          class="btn btn-neutral btn-simple btn-block"
                          @click="addRandomValidator()"
                        >
                          Add random validator
                        </button>
                        <button
                          class="btn btn-success btn-simple btn-block"
                          @click="addNewSelector()"
                        >
                          Select validator from list
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 my-4" v-if="selectNew === true">
              <validators-table :validators="validators" @select-validator="addToList" />
            </div>
          </div>
          <div class="form-group">
            <label>Amount</label>
            <input v-model="amount" type="number" step="0.001" class="form-control" />
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
import Account from '@/components/Account.vue';
import { DENOM, REALDENOM, DIVISOR, LCD } from '@/utils/helpers';
import { mapGetters } from 'vuex';

import ValidatorCard from '@/components/BucketDelegate/ValidatorCard.vue';
import ValidatorsTable from '@/components/BucketDelegate/ValidatorsTable.vue';

export default {
  data() {
    return {
      DENOM,
      amount: 0,
      type: 'single',
      selectedBucket: null,
      selectedValidators: [],
      selectNew: false
    };
  },
  props: ['dialog', 'from', 'delegatorAddress', 'to', 'delegations'],
  components: { Account, ValidatorCard, ValidatorsTable },
  computed: {
    ...mapGetters(['validators']),
    shares() {
      const sharesData = this.delegations.find(item => item.validator_address === this.from);
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
          this.$emit('close');
        }
      }
    }
  },
  methods: {
    addMax() {
      this.amount = this.shares;
    },
    async selectBucket(type) {
      this.selectedBucket = type;

      await this.generateBucket(type);
    },
    async generateTransaction() {
      let txMessage;
      if (this.type === 'single') {
        txMessage = [
          {
            type: 'staking/MsgBeginRedelegate',
            value: {
              delegator_address: this.delegatorAddress,
              validator_src_address: this.from,
              validator_dst_address: this.to,
              amount: {
                denom: REALDENOM,
                amount: String(this.amount * DIVISOR)
              }
            }
          }
        ];
      } else {
        const amount = this.amount;
        const selectedValidators = this.selectedValidators;
        const delegatorAddress = this.delegatorAddress;
        const from = this.from;

        txMessage = this.selectedValidators.map(function(item) {
          let amm = amount / selectedValidators.length;
          return {
            type: 'cosmos-sdk/MsgBeginRedelegate',
            value: {
              delegator_address: delegatorAddress,
              validator_src_address: from,
              validator_dst_address: item.operator_address,
              amount: {
                denom: REALDENOM,
                amount: String(parseInt(amm * DIVISOR))
              }
            }
          };
        });
      }
      this.$emit('generated-messages', txMessage);
      this.$emit('close');
    },
    generateBucket(type) {
      switch (type) {
        case 'random':
          let max = Math.floor(Math.random() * 3 + 3);
          this.selectedValidators = this.validators.sort(() => 0.5 - Math.random()).slice(0, max);
          break;
        case 'small':
          this.selectedValidators = this.validators
            .slice(70, 99)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          break;
        default:
          this.selectedValidators = [];
          break;
      }
    },
    generateSmall() {
      this.selectedType = 'small';
      this.selected = this.validators.sort(() => 0.5 - Math.random()).slice(0, 3);
    },
    generateRandom() {
      this.selectedType = 'random';
      this.selected = this.validators.sort(() => 0.5 - Math.random()).slice(0, 3);
    },
    addRandomValidator() {
      let picked = this.validators[Math.floor(Math.random() * this.validators.length)];
      this.selectedValidators.push(picked);
    },
    addNewSelector() {
      this.selectNew = true;
    },
    generateEmpty() {
      this.selectedType = 'custom';
      this.selected = [];
    },
    addToList(index) {
      let pickedValidator = this.validators.find(element => {
        return element.operator_address === index;
      });

      this.selectedValidators.push(pickedValidator);
      this.selectNew = false;
    },
    removeFromList(index) {
      console.log('splice', index);
      this.selectedValidators.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.maxShares {
  cursor: pointer;
}

.bucket {
  .card {
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: lighten(#1f2251, 10%);
    }

    &.active {
      background-color: lighten(#1f2251, 10%);
    }

    .card-header {
      margin-top: 0%;
    }
  }
}
</style>

