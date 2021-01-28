import Vue from 'vue';

let eshop = new Vue({
  computed: {
    isInBasket() {
      return (id) => {
        const itemsInBasket = JSON.parse(localStorage.getItem('itemsInBasket')) || [];
        return itemsInBasket.find(item => item.public_id === id) === undefined ? false : true;
      }
    }
  },
  methods: {

    addToBasket(item) {
      const curItems = JSON.parse(localStorage.getItem('itemsInBasket')) || [];
      if (curItems.find(elem => elem.public_id === item.public_id) === undefined) {  // not in basket
        curItems.push(item);
        localStorage.setItem('itemsInBasket', JSON.stringify(curItems));
      }
    },
    removeFromBasket(id) {
      const items = (JSON.parse(localStorage.getItem('itemsInBasket')) || []).filter(item => item.public_id !== id);
      localStorage.setItem('itemsInBasket', JSON.stringify(items));
    }
  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$eshop = eshop
  }
}