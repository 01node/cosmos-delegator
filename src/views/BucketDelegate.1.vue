<template>
  <div>
    <div class="home">
      <div class="page-header">
        <img src="@/assets/blob.png" class="path" />
        <img src="@/assets/path2.png" class="path2" />
        <img src="@/assets/triunghiuri.png" class="shapes triangle" />
        <img src="@/assets/waves.png" class="shapes wave" />
        <img src="@/assets/patrat.png" class="shapes squares" />
        <img src="@/assets/cercuri.png" class="shapes circle" />
        <div class="content-center">
          <div class="row row-grid justify-content-between align-items-center text-left">
            <div class="col-12 col-lg-7 col-md-7">
              <hr class="line-success" />
              <h1 class="text-white">
                Bucket Delegate
              </h1>
              <p class="text-white mb-3">
                We introduced the possibility to delegate to multiple validators at the same time,
                using one single transaction. Delegating to multiple validators help reduce the risk
                and decentralization of governance.
              </p>
              <div class="btn-wrapper mb-3">
                <router-link to="/help/bucket-delegate" class="btn btn-secondary btn-link p-0">
                  Read more about delegating using buckets
                </router-link>
              </div>
            </div>
            <div class="col-12 col-lg-4 col-md-5">
              <img src="@/assets/undraw_analyze.svg" class="img-fluid" />
            </div>

            <div class="col-12 mt-5 pt-5 text-center">
              <a class="btn btn-primary btn-lg font-weight-bold" v-scroll-to="'#delegation-start'"
                >Start Bucket Delegation <i class="fas fa-arrow-down"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="delegation-start" class="profile-page">
      <div class="container">
        <div class="row pb-5">
          <div class="col-12 text-center">
            <h2 class="mb-0">Select Bucket Type</h2>
          </div>
        </div>

        <div class="row justify-content-between">
          <div class="col-md-6">
            <h1 class="profile-title text-left">Compose validators bucket</h1>
            <h5 class="text-on-back">01</h5>
            <p class="profile-description text-left">
              Select the delegation bucket type you want to generate and choose desired validators.
            </p>
            <div class="btn-wrapper pt-3"></div>
          </div>
          <div class="col-md-6 justify-content-between align-items-center">
            <h4 class="title">Select delegation type</h4>
            <div class="d-flex flex-column">
              <button class="btn btn-primary btn-simple" @click="generateRandom()">
                <i class="fab fa-bitbucket"></i> Generate random bucket
              </button>
              <button class="btn btn-warning btn-simple" @click="generateSmall()">
                <i class="fab fa-bitbucket"></i> Generate small bucket
              </button>
              <button class="btn btn-success btn-simple" @click="generateEmpty()">
                <i class="fab fa-bitbucket"></i> Select custom validators
              </button>
            </div>
          </div>
        </div>

        <div class="row mt-4" v-if="selected !== false">
          <div class="col-12 my-4">
            <h2>Selected validators</h2>
          </div>
          <div
            v-for="(validator, index) in selected"
            class="col-12 col-md-6"
            :key="validator.operator_address"
          >
            <validator-card
              :validator="validator"
              :ind="index"
              v-on:remove-validator="removeFromList"
            ></validator-card>
          </div>
          <div class="col-12 col-md-6">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-12 col-md-3 d-flex align-items-center justify-content-center">
                    <i class="fas fa-plus-circle fa-5x"></i>
                  </div>
                  <div class="col-12 col-md-9">
                    <h4 class="validator-title">Add new validator</h4>
                    <hr class="line-success" />
                    <div>
                      <button class="btn btn-primary btn-simple mr-2" @click="addRandomValidator()">
                        Random
                      </button>
                      <button class="btn btn-success btn-simple" @click="addNewSelector()">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row" v-if="selectNew === true">
          <div class="col-12">
            <table class="table">
              <thead>
                <th>Name</th>
                <th>Address</th>
                <th>Commission</th>
                <th>Voting Power</th>
                <th></th>
              </thead>
              <tbody>
                <ValidatorRow
                  v-for="(validator, index) in validators"
                  :key="index"
                  :data="validator"
                  :ind="index"
                  v-on:select-validator="addToList"
                />
              </tbody>
            </table>
          </div>
        </div>

        <div
          class="row justify-content-between align-items-center"
          v-if="selected && selected.length > 0"
        >
          <div class="col-12 my-4">
            <hr class="line-success" style="width: 100%;" />
          </div>
          <div class="col-md-6">
            <h1 class="profile-title text-left">Generate transaction</h1>
            <h5 class="text-on-back">02</h5>
            <p class="profile-description text-left">
              Generate, and sign Delegate transaction with Ledger.
            </p>
            <div class="btn-wrapper pt-3"></div>
          </div>
          <div class="col-md-6 justify-content-between align-items-center">
            <div class="card card-coin border-0">
              <div class="card-body" v-if="!final">
                <h4 class="title">Enter delegation details</h4>
                <label>Total delegation amount (in IRIS)</label>
                <input
                  type="text"
                  v-model="totalAmount"
                  @keyup="refreshDelegations"
                  class="form-control"
                />
                <div class="my-2">
                  <input type="checkbox" v-model="splitEqually" /> Split automatically across all
                  validators.
                </div>
                <div class="d-flex flex-column mt-4" v-if="!splitEqually">
                  <div v-for="(validator, index) in selected" :key="index" class="mb-4">
                    <div class="amounts d-flex justify-content-between align-items-center">
                      <h4 v-text="validator.description.moniker"></h4>
                      <div class="d-flex justify-content-start align-items-center">
                        <input
                          type="text"
                          class="ml-2 mr-2 form-control amount-element"
                          v-model="selectedAmounts[index].value"
                        />
                        IRIS
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-between">
                  <button class="btn btn-primary" @click="generateTransaction()">
                    Generate transaction
                  </button>
                </div>

                <div class="alert alert-info my-4" v-text="delegateInfo"></div>

                <div class="details">
                  <ul>
                    <li>
                      <i class="fas fa-lg fa-spin fa-spinner" v-if="!step1"></i>
                      <i class="fas fa-lg fa-check-circle" v-else></i> Connect your Ledger Nano S to
                      the computer and enter your PIN.
                    </li>
                    <li v-if="step1 && step2 === 1">
                      <i class="fas fa-lg fa-spin fa-spinner" v-if="step2 === 1"></i>
                      <i class="fas fa-lg fa-check-circle" v-else></i> Sign the transaction with
                      your Ledger Device
                    </li>
                  </ul>
                </div>
              </div>
              <div class="card-body" v-else>
                <div class="alert alert-success">
                  <i class="fas fa-check-circle text-success"></i> Transaction successfully
                  injected.
                </div>
                <div class="alert alert-info">
                  <i class="fas fa-link"></i>
                  <a
                    class="btn btn-link btn-neutral"
                    href="https://www.irisplorer.io/#/tx?txHash={txHash}"
                    >TX HASH</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ValidatorCard from '@/components/BucketDelegate/ValidatorCard.vue';
import ValidatorRow from '@/components/BucketDelegate/ValidatorRow.vue';

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  name: 'bucket-delegate',
  data() {
    return {
      selected: false,
      selectedType: null,
      selectNew: false,
      totalAmount: 0,
      selectedAmounts: [],
      splitEqually: true,
      delegateInfo: 'Connect your Ledger Device and click Generate transaction.',
      step1: false,
      step2: false,
      final: false
    };
  },
  components: {
    ValidatorRow,
    ValidatorCard,
    VueSlider
  },
  computed: {
    ...mapGetters(['validators'])
  },
  methods: {
    injectTransaction() {
      this.step2 = true;
      this.final = true;
    },
    generateTransaction() {
      this.step1 = true;
      this.delegateInfo = 'Sign the transaction using your Ledger Device.';
      this.step2 = 1;

      setTimeout(() => {
        this.injectTransaction();
      }, 4000);
    },
    async refreshDelegations() {
      //await this.reloadDefaultAmounts();
      /* 
      await this.selected.map((item, i) => {
        let newAmount = (this.totalAmount * this.selectedAmounts[i].rate) / 100;

        this.selectedAmounts[i].value = newAmount;
      }); */
    },
    reloadDefaultAmounts() {
      this.selectedAmounts = [];
      this.selected.map((item, i) => {
        let amountRate = 100 / this.selected.length;

        this.selectedAmounts[i] = {
          rate: amountRate,
          value: 0
        };
      });
    },
    generateSmall() {
      this.selectedType = 'small';
      this.selected = this.validators.sort(() => 0.5 - Math.random()).slice(0, 3);
    },
    generateRandom() {
      this.selectedType = 'random';
      this.selected = this.validators.sort(() => 0.5 - Math.random()).slice(0, 3);

      this.reloadDefaultAmounts();
    },
    addRandomValidator() {
      let picked = this.validators[Math.floor(Math.random() * this.validators.length)];
      this.selected.push(picked);

      this.reloadDefaultAmounts();
    },
    addNewSelector() {
      this.selectNew = true;
    },
    generateEmpty() {
      this.selectedType = 'custom';
      this.selected = [];
    },
    addToList(index) {
      this.selected.push(this.validators[index]);
      this.selectNew = false;

      this.reloadDefaultAmounts();
    },
    removeFromList(index) {
      console.log('splice', index);
      this.selected.splice(index, 1);

      this.reloadDefaultAmounts();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 5%;
  margin-bottom: 4rem;
}

.details {
  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
