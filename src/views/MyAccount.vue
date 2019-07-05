<template>
  <div>
    <div
      class="home"
      v-if="!ledger || this.ledger.connected === false || (ledger && address.bech32 === undefined)"
    >
      <div class="page-header">
        <img src="@/assets/blob.png" class="path" />
        <img src="@/assets/path2.png" class="path2" />
        <img src="@/assets/triunghiuri.png" class="shapes triangle" />
        <img src="@/assets/waves.png" class="shapes wave" />
        <img src="@/assets/patrat.png" class="shapes squares" />
        <img src="@/assets/cercuri.png" class="shapes circle" />
        <div class="content-center">
          <div class="row">
            <div class="col-12 col-md-8 mx-auto">
              <h1 class="title">My Account</h1>
              <h4 class="description">
                Here you can see all your delegations, rewards and transactions. You can perform
                several actions such as: withdraw, un-delegate, re-delegate. Here you can check all
                your rewards.
              </h4>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 mx-auto mt-5 pt-5 text-center">
              <div class="py-4">
                <i class="fas fa-5x fa-atom fa-spin"></i>
              </div>
              <div>Please connect your Ledger Device to continue</div>

              <div v-if="errorMessage" class="text-center mt-5">
                <div class="alert alert-danger" v-text="errorMessage"></div>

                <button class="btn btn-primary" @click="connect">Retry connection</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="account-settings section" v-else>
      <div class="container">
        <div v-if="errorMessage">
          <div class="alert alert-danger" v-text="errorMessage"></div>

          <button class="btn btn-primary" @click="connect">Retry connection</button>
        </div>
        <div class="row">
          <div class="col-12 mb-4">
            <h1 class="title mb-0">My Account</h1>
            <i v-if="address.bech32 === undefined" class="fa fa-spin fa-atom fa-2x"></i>
            <h4 class="subtitle m-0" v-else>
              <span v-text="address.bech32" class="mr-2"></span>
              <i class="fas fa-copy"></i>
            </h4>
          </div>
          <!-- BALANCES + REWARDS -->
          <div class="col-12 col-md-4" v-if="address.bech32">
            <my-balances :delegatorAddress="address.bech32" />
             <my-rewards
              :delegatorAddress="address.bech32"
              @generated-messages="handleGeneratedMessages"
            />
          </div>
          <!-- /BALANCES -->
          <!-- DELEGATIONS + TRANSACTIONS -->
           <div class="col-12 col-md-8" v-if="address.bech32 && txMessages.length === 0">
            <my-delegations
              :delegatorAddress="address.bech32"
              @generated-messages="handleGeneratedMessages"
            />
            <my-transactions :delegatorAddress="address.bech32" />
          </div>
          <!-- /DELEGATIONS -->

          <!-- LEDGER ACTIONS -->
          <div class="col-12 col-md-8" v-if="txMessages.length > 0">
            <div
              class="alert alert-info"
              v-if="delegateInfo && !errorMessage"
              v-text="delegateInfo"
            ></div>
            <div v-if="txMessage">
              <p>
                <i class="fas fa-check-circle text-success"></i> Transaction successfully generated:
              </p>
              <pre v-html="txMessage"></pre>
            </div>

            <div class="sslide card-body" v-if="waitConfirm">
              <div class="alert alert-warning">
                <i class="fas fa-spinner fa-spin"></i> Please wait while we broadcast your
                transaction.
              </div>
            </div>
            <div class="card-body" v-if="confirmed !== false">
              <div class="alert alert-success">
                <i class="fas fa-check-circle text-success"></i> Transaction successfully injected.
              </div>
              <div class="alert alert-info">
                <i class="fas fa-link"></i>
                <a class="btn btn-link btn-neutral" href="#" v-text="txHash"></a>
              </div>
              <pre v-html="confirmed"></pre>
            </div>
          </div>
          <!-- /LEDGER ACTIONS -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* tslint:disable-next-line */
import IrisDelegateTool from '@/utils/iris-delegation-tool';
import { DENOM, REALDENOM, DIVISOR, LCD, CHAIN_ID } from '@/utils/helpers';
import { signatureImport } from 'secp256k1';
import * as wallet from '@/utils/cosmos-wallet';

import MyBalances from '@/components/MyAccount/MyBalances.vue';
import MyDelegations from '@/components/MyAccount/MyDelegations.vue';
import MyRewards from '@/components/MyAccount/MyRewards.vue';
import MyTransactions from '@/components/MyAccount/MyTransactions.vue';

const DEFAULT_FEE = 0.3;
const HDPATH = [44, 118, 0, 0, 0];
const DEFAULT_GAS = 150000;
const DEFAULT_GAS_PRICE = 0.025;
const RPC_ADDRESS = LCD;

export default {
  name: 'my-account',
  data() {
    return {
      DENOM,
      ledger: false,
      address: {},
      accountInfo: {},
      errorMessage: null,
      waitConfirm: false,
      confirmed: false,
      delegateInfo: null,
      delegateError: null,
      txMessages: [],
      txMessage: null,
      type: 'normal'
    };
  },
  components: { MyBalances, MyDelegations, MyRewards, MyTransactions },
  methods: {
    async init() {
      this.ledger = new IrisDelegateTool();
      this.ledger.transportDebug = true;
      this.ledger.checkAppInfo = true;
      this.ledger.setNodeURL(RPC_ADDRESS);

      try {
        this.connect();
      } catch (error) {
        //console.log(error);
        this.errorMessage = error;
      }
    },

    async connect() {
      this.errorMessage = null;
      try {
        await this.ledger.connect();
        this.ledger.appDetails = await this.ledger.app.appInfo();

        try {
          await this.checkAddress();
        } catch (error) {
          this.errorMessage = error;
        }

        try {
          await this.getAccountInfo();
        } catch (error) {
          this.errorMessage = error;
        }
      } catch (error) {
        this.errorMessage = error;
      }
    },
    async checkAddress() {
      if (this.ledger.connected === true) {
        try {
          this.address = await this.ledger.retrieveAddress();
        } catch (error) {
          this.errorMessage = error;
          //throw new Error(error);
        }
      } else {
        this.connect();
      }
    },

    async getAccountInfo() {
      if (this.ledger.connected === true) {
        try {
          this.accountInfo = await this.ledger.getAccountInfo(this.address);
        } catch (error) {
          this.errorMessage = 'Ledger connection has been lost. Check your Ledger device.';
          //throw new Error(error);
        }
      } else {
        this.errorMessage = 'Ledger connection has been lost. Check your Ledger device.';
      }
    },
    async injectTransaction() {
      this.txMessage = null;
      this.addressOpen = false;
      this.injected = true;
      this.confirmed = false;
      this.waitConfirm = true;

      const response = await fetch(RPC_ADDRESS + '/txs', {
        method: 'POST',
        body: this.txData
      });

      const data = await response.json();

      if (data.error) {
        this.errorMessage = data.error;
        this.waitConfirm = false;
        this.confirmed = false;
        /* this.setState({
          confirmed: false,
          waitConfirm: false,
          confirmedTx: null,
          errorMessage: data.error,
        }); */
      } else {
        this.confirmed = data;
        this.waitConfirm = false;
        this.txHash = data.txhash;
        /* this.setState({
          confirmed: true,
          waitConfirm: false,
          confirmedTx: data,
          txHash: data.hash
        }); */
      }
    },

    async signTransaction() {
      var signMessage = wallet.createSignMessage(this.txMessage, this.requestMetaData);

      try {
        const pubKeyBuffer = Buffer.from(this.address.pk, 'hex');
        const ledgerSignature = await this.ledger.app.sign(HDPATH, signMessage);

        console.log('ledger signature code', ledgerSignature.return_code);
        if (ledgerSignature.return_code === 36864) {
          const signature = wallet.createSignature(
            signatureImport(ledgerSignature.signature),
            this.accountInfo.sequence,
            this.accountInfo.accountNumber,
            pubKeyBuffer
          );
          const signedTx = wallet.createSignedTx(this.txMessage, signature);
          const body = wallet.createBroadcastBody(signedTx);
          this.txData = body;
        } else {
          console.error(ledgerSignature.error_message);
          this.errorMessage = ledgerSignature.error_message;
          this.txData = null;
        }
      } catch ({ message, statusCode }) {
        console.error('Error signing transaction', message, statusCode);
      }
    },
    async handleGeneratedMessages(payload) {
      this.txMessages.push(...payload);

      const defaultTx = {
        fee: {
          amount: [
            {
              denom: REALDENOM,
              amount: String(DEFAULT_GAS * DEFAULT_GAS_PRICE * 3)
            }
          ],
          gas: String(DEFAULT_GAS * 3)
        },
        signature: null,
        memo: 'Stake online using delegate.01node.com'
      };

      let txMessage = defaultTx;

      txMessage['msg'] = this.txMessages;

      const requestMetaData = {
        sequence: String(this.accountInfo.sequence),
        from: this.address.bech32,
        account_number: String(this.accountInfo.accountNumber),
        chain_id: CHAIN_ID,
        fees: String(DEFAULT_GAS * DEFAULT_GAS_PRICE),
        generate_only: false
      };

      // Save TX data to state

      this.txMessage = txMessage;
      this.requestMetaData = requestMetaData;
      this.txData = null;
      this.error = null;
      this.delegateInfo = 'Please sign transaction on Legder';

      console.log('generated tx..');

      // Sign TX
      await this.signTransaction();
      this.delegateInfo = null;
      console.log('tx signed... now trying to inject');

      if (this.txData !== null) {
        await this.injectTransaction();
        console.log('successfully injected');
      }
    }
  },
  async mounted() {
    await this.init();
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}

.nav {
  hr {
    width: 100%;
  }
}
</style>
