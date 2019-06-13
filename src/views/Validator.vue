<template>
  <div v-if="validator" class="profile-page page-validator">
    <div class="page-header">
      <img src="@/assets/dots.png" class="dots" />
      <img src="@/assets/path4.png" class="path" />
      <div class="container align-items-center">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <hr class="line-success" />
            <h1 class="title mb-0 text-left">
              <span v-text="validator.description.moniker"></span>
            </h1>
            <h3
              class="subtitle operator_address text-white-50 mb-4"
              v-text="validator.operator_address"
            ></h3>
            <p class="profile-description pt-4" v-text="validator.description.details"></p>
            <div class="btn-wrapper profile pt-3">
              <a
                target="_blank"
                :href="validator.description.website"
                class="btn btn-icon btn-twitter btn-round mr-2"
              >
                <i class="fas fa-link"></i>
              </a>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 ml-auto mr-auto">
            <div class="card card-coin card-plain">
              <div class="card-header">
                <img :src="avatarUrl" class="img-center img-fluid rounded-circle" />
                <h4 class="title">Informations</h4>

                <p>
                  Delegated Tokens:
                  <span class="font-weight-bold" v-text="bondedTokens"></span>
                  {{ denom }}s
                </p>
                <p>
                  Self-Bonded:
                  <span class="font-weight-bold" v-text="selfBonded"></span>
                  {{ denom }}s
                </p>
                <p>
                  Commision Rate:
                  <span class="font-weight-bold" v-text="commissionRate"></span>%
                </p>
                <p>
                  Max Rate:
                  <span class="font-weight-bold" v-text="commissionMaxRate"></span>%
                </p>
                <p>
                  Max Rate Change:
                  <span class="font-weight-bold" v-text="commissionMaxChangeRate"></span>%
                </p>
              </div>
              <div class="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="title">About Validator</h2>
          </div>

          <div class="col-12 text-center" v-if="!about">
            <p class="text-center">
              Hmm, looks like we don't know much about this validator.
              <br />Are you part of the team? Write us some details so we can update this page.
            </p>
          </div>

          <div class="col-12 col-md-6 mx-auto" v-else>
            <p class="about-validator description" v-html="about"></p>
          </div>
        </div>
      </div>
      <div class="container" v-if="!loaded">
        <div class="text-center">
          <i class="fas fa-atom fa-spin fa-5x"></i>
        </div>
      </div>
      <div class="container" v-if="loaded">
        <div class="row">
          <div class="col-12 mb-5 pb-5 text-center">
            <h2 class="title">Team</h2>
            <p v-if="team.length === 0">
              Hmm, looks like we don't know much about this validator's team.
              <br />Are you part of the team? Write us some details so we can update this page.
            </p>
          </div>
          <div class="col-12 col-md-3 mb-5" v-for="(member, index) in team" :key="index">
            <div class="card card-coin card-plain">
              <div class="card-header">
                <img :src="member.avatarUrl" class="img-center img-fluid rounded-circle" />
                <h4 class="title mb-0" v-text="member.name"></h4>
                <h5 class="title mt-0 text-muted" v-text="member.title"></h5>
                <p class="text-center" v-text="member.description"></p>

                <div class="socials d-flex justify-content-center">
                  <a
                    target="_blank"
                    :href="social.profile"
                    class="btn btn-icon btn-default btn-round mx-2"
                    v-for="(social, ii) in member.social"
                    :key="ii"
                  >
                    <i :class="['fab', 'fa-' + social.type]"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="loaded">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="title">Validator Metrics</h2>
            <p>What are Validator Metrics?</p>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12 validator-metrics mb-5">
            <vue-circle
              :progress="metrics.infrastructure"
              :size="200"
              :reverse="false"
              line-cap="round"
              empty-fill="rgba(0, 0, 0, .1)"
              :animation-start-value="0.0"
              :start-angle="0"
              insert-mode="append"
              :thickness="5"
              :show-percent="true"
            >
              <h4>INFRASTRUCTURE</h4>
            </vue-circle>

            <vue-circle
              :progress="metrics.economics"
              :size="200"
              :reverse="false"
              line-cap="round"
              empty-fill="rgba(0, 0, 0, .1)"
              :animation-start-value="0.0"
              :start-angle="0"
              insert-mode="append"
              :thickness="5"
              :show-percent="true"
            >
              <h4>ECONOMICS</h4>
            </vue-circle>

            <vue-circle
              :progress="metrics.communication"
              :size="200"
              :reverse="false"
              line-cap="round"
              empty-fill="rgba(0, 0, 0, .1)"
              :animation-start-value="0.0"
              :start-angle="0"
              insert-mode="append"
              :thickness="5"
              :show-percent="true"
            >
              <h4>COMMUNICATION</h4>
            </vue-circle>

            <vue-circle
              :progress="metrics.experience"
              :size="200"
              :reverse="false"
              line-cap="round"
              empty-fill="rgba(0, 0, 0, .1)"
              :animation-start-value="0.0"
              :start-angle="0"
              insert-mode="append"
              :thickness="5"
              :show-percent="true"
            >
              <h4>EXPERIENCE</h4>
            </vue-circle>
          </div>
          <div class="col-12 text-center">
            <a href="#" class="btn btn-success btn-link">
              Find more about how Metrics are calculated
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatNumber, DIVISOR, DENOM, getSelfBonded } from '@/utils/helpers';
import numbro from 'numbro';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCGQwrP_PN-QZSqZPgP7xu8bXOFS3bDKZI',
  authDomain: 'cosmos-delegator.firebaseapp.com',
  databaseURL: 'https://cosmos-delegator.firebaseio.com',
  projectId: 'cosmos-delegator',
  storageBucket: '',
  messagingSenderId: '885526441276',
  appId: '1:885526441276:web:a2f66239ab489bc0'
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

import VueCircle from 'vue2-circle-progress';

export default {
  name: 'validator',
  data() {
    return {
      loaded: false,
      selfBonded: null,
      denom: DENOM,
      commission: {
        rate: null,
        max_rate: null,
        max_change_rate: null
      },
      about: false,
      metrics: {
        infrastructure: 50,
        economics: 50,
        communication: 50,
        experience: 50
      },
      team: []
    };
  },
  components: {
    VueCircle
  },
  methods: {
    avatarImage(mm) {
      return 'https://via.placeholder.com/128.png?text=' + mm;
    }
  },
  async beforeMount() {
    var docRef = db.collection('validators').doc(this.$route.params.address);

    try {
      const doc = await docRef.get();

      if (doc.exists) {
        const data = await doc.data();

        if (data.about) {
          this.about = data.about;
        }

        if (data.metrics) {
          this.metrics = data.metrics;
        }
        if (data.team) {
          this.team = data.team;
        }
      }

      this.loaded = true;
    } catch (error) {
      console.error(error);
    }
  },
  async mounted() {
    let selfbond = await getSelfBonded(this.$route.params.address);

    this.selfBonded = numbro(selfbond).format({ thousandSeparated: true });

    /* this.uptime = numbro(1).format({ output: 'percent' });

    this.commissionRate = numbro(this.data.commission.rate).format({ output: 'percent', mantissa: 0 });

    this.bondedTokens = numbro(parseInt(this.data.tokens / DIVISOR)).format({
      thousandSeparated: true
    }); */
  },
  computed: {
    ...mapGetters(['getKeybaseById', 'getValidatorByAddress']),
    validator() {
      return this.getValidatorByAddress(this.$route.params.address);
    },
    keybase() {
      if (this.validator.description.identity !== undefined) {
        return this.getKeybaseById(this.validator.description.identity);
      }

      return false;
    },

    commissionRate() {
      if (this.validator !== undefined) {
        return parseInt((this.validator.commission.rate * 100).toString());
      }

      return null;
    },

    commissionMaxRate() {
      if (this.validator !== undefined) {
        return parseInt((this.validator.commission.max_rate * 100).toString());
      }

      return null;
    },

    commissionMaxChangeRate() {
      if (this.validator !== undefined) {
        return parseInt((this.validator.commission.max_change_rate * 100).toString());
      }

      return null;
    },

    bondedTokens() {
      if (this.validator !== undefined) {
        return formatNumber(parseInt(this.validator.tokens / DIVISOR, 10));
      }

      return null;
    },

    avatarUrl() {
      if (this.keybase !== undefined) {
        return this.keybase.avatarUrl;
      } else {
        return 'https://via.placeholder.com/128.png?text=?'; // TODO replace with local placeholder
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 5%;
  margin-bottom: 4rem;
}
.validator-metrics {
  display: flex;
  justify-content: space-between;
}

@media screen and(max-width: 1440px) {
  .operator_address {
    font-size: 1.25rem;
  }
}
@media screen and(max-width: 667px) {
  .validator-metrics {
    flex-direction: column;
  }
}
</style>
