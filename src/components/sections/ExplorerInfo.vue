<template>
  <section class="section section-lg">
    <section class="section">
      <img src="@/assets/path4.png" class="path" />
      <div class="container">
        <div class="row row-grid justify-content-between">
          <div class="col-md-5 mt-lg-5">
            <div class="row">
              <div class="col-lg-6 col-sm-12 px-2 py-2">
                <div class="card card-stats ">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-5 col-md-4">
                        <div class="icon-big text-center icon-warning">
                          <i class="fas fa-circle-thin text-warning"></i>
                        </div>
                      </div>
                      <div class="col-7 col-md-8">
                        <div class="numbers">
                          <div class="card-title">
                            <span v-text="current_price"></span>
                            <p class="card-category">Total txs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 px-2 py-2">
                <div class="card card-stats upper bg-default">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-5 col-md-4">
                        <div class="icon-big text-center icon-warning">
                          <i class="fas fa-box text-white"></i>
                        </div>
                      </div>
                      <div class="col-7 col-md-8">
                        <div class="numbers">
                          <div class="card-title">
                            <span v-text="current_block"></span>
                            <p class="card-category">Current Block</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6 col-sm-12 px-2 py-2">
                <div class="card card-stats ">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-5 col-md-4">
                        <div class="icon-big text-center icon-warning">
                          <i class="fas fa-clock text-info"></i>
                        </div>
                      </div>
                      <div class="col-7 col-md-8">
                        <div class="numbers">
                          <div class="card-title">
                            <span v-text="average_block_time"></span>
                            <p class="card-category">Average block time</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 px-2 py-2">
                <div class="card card-stats ">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-5 col-md-4">
                        <div class="icon-big text-center icon-warning">
                          <i class="fas fa-bolt text-success"></i>
                        </div>
                      </div>
                      <div class="col-7 col-md-8">
                        <div class="numbers">
                          <div class="card-title">
                            <span v-text="online_voting_power"></span>
                            <p class="card-category">Online voting power</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="pl-md-5">
              <h1>IRISnet Explorer</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde suscipit eos
                dicta asperiores cupiditate consequuntur. Rerum, dicta veritatis! Perferendis,
                quibusdam. Similique nulla placeat consequatur deleniti est possimus! Molestiae,
                alias.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde suscipit eos
                dicta asperiores cupiditate consequuntur. Rerum, dicta veritatis! Perferendis,
                quibusdam. Similique nulla placeat consequatur deleniti est possimus! Molestiae,
                alias.
              </p>
              <router-link to="/validators" class="btn btn-primary mt-5">
                Go to Explorer
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>

import axios from 'axios';
import { formatNumber } from '@/utils/helpers';

export default {
  name: 'explorer-info',
  data: () => {
    return {
      current_price: '$',
      current_block: 123123,
      average_block_time: 's',
      online_voting_power: 'm'
    };
  },
  methods: {
    async getBlockData() {
      let response = await axios.get('https://iris-relay.01node.com/blocks/latest');

      let data = await response.data;

      console.log(data);

      this.current_block = formatNumber(data.block_meta.header.height);

      this.current_price = formatNumber(data.block.header.total_txs);
    }
  },
  mounted() {
    this.getBlockData();
  }
};
</script>