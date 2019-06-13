import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Validators from './views/Validators.vue';
import Validator from './views/Validator.vue';
import Delegate from './views/Delegate.vue';
import BucketDelegate from './views/BucketDelegate.vue';
import DelegateValidator from './views/DelegateValidator.vue';
import HowToDelegate from './views/HowToDelegate.vue';
import MyAccount from './views/MyAccount.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: MyAccount
    },
    {
      path: '/how-to-delegate',
      name: 'how-to-delegate',
      component: HowToDelegate
    },
    {
      path: '/help',
      name: 'help',
      component: HowToDelegate
    },
    {
      path: '/validators',
      name: 'validators',
      component: Validators
    },
    {
      path: '/validators/:address',
      name: 'validator',
      component: Validator
    },
    {
      path: '/delegate',
      name: 'delegate',
      component: Delegate
    },
    {
      path: '/bucket-delegate',
      name: 'bucket-delegate',
      component: BucketDelegate
    },
    {
      path: '/delegate/:address',
      name: 'delegate-to',
      component: DelegateValidator
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
