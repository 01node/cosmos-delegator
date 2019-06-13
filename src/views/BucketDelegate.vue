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
        <bucket-selector @select-bucket="selectBucket" />

        <div id="selected-validators" class="row mt-5" v-if="bucketType !== null">
          <div class="col-12 mb-5 text-center">
            <h2 class="mb-0">Selected Validators</h2>
          </div>

          <div
            v-for="(validator, index) in selectedValidators"
            class="col-12 col-md-4"
            :key="validator.operator_address"
          >
            <validator-card
              :validator="validator"
              :ind="index"
              v-on:remove-selected="removeFromList"
            />
          </div>

          <div
            class="col-12 col-md-4"
            v-if="selectedValidators.length === 0 || bucketType === 'custom'"
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

          <div class="col-12 mt-5 text-center" v-if="selectedValidators.length > 0">
            <button class="btn btn-primary btn-lg font-weight-bold" @click="initLedger">
              Initialize Ledger Delegator <i class="fas fa-arrow-down"></i>
            </button>
          </div>

          <div class="col-12" v-if="ledger === true">
            <ledger-delegator :validators="selectedValidators" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BucketSelector from '@/components/BucketDelegate/BucketSelector.vue';
import ValidatorCard from '@/components/BucketDelegate/ValidatorCard.vue';
import ValidatorsTable from '@/components/BucketDelegate/ValidatorsTable.vue';

import LedgerDelegator from '@/components/BucketDelegate/LedgerDelegator.vue';

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

export default {
  name: 'bucket-delegate',
  data() {
    return {
      bucketType: null,
      selectedValidators: [],
      selectNew: true,
      ledger: false
    };
  },
  components: {
    BucketSelector,
    ValidatorCard,
    ValidatorsTable,
    LedgerDelegator
  },
  computed: {
    ...mapGetters(['validators'])
  },
  methods: {
    async selectBucket(type) {
      this.bucketType = type;

      await this.generateBucket(type);

      this.$scrollTo('#selected-validators');
    },
    initLedger() {
      this.ledger = true;
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
