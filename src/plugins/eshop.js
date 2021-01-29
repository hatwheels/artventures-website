import Vue from 'vue';

let eshop = new Vue({
  data () {
    return {
      basketValue: (process.isClient) ? (JSON.parse(localStorage.getItem('itemsInBasket')) || []) : []
    }
  },
  computed: {
    basket: {
      get: function() {
        return this.basketValue;
      },
      set: function(itemArr) {
        this.basketValue = itemArr;
        if (process.isClient) {
          localStorage.setItem('itemsInBasket', JSON.stringify(itemArr));
        }
      }
    },
    isInBasket() {
      return (id) => {
        return this.basketValue.find(item => item.public_id === id) === undefined ? false : true;
      }
    }
  },
  methods: {
    addToBasket(item) {
      if (this.basketValue.find(elem => elem.public_id === item.public_id) === undefined) {  // not in basket
        this.basketValue.push(item);
        if (process.isClient) {
          localStorage.setItem('itemsInBasket', JSON.stringify(this.basketValue));
        }
      }
    },
    removeFromBasket(id) {
      const items = this.basketValue.filter(item => item.public_id !== id);
      this.basket = items;
    }
  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$eshop = eshop
  }
}