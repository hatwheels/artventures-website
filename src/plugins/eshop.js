import Vue from 'vue';

let eshop = new Vue({
  computed: {
    isInBasket() {
      return (id) => {
        const itemsInBasket = JSON.parse(localStorage.getItem('itemsInBasket')) || [];
        return itemsInBasket.find(item => item.public_id === id) === undefined ? itemsInBasket : true;
      }
    }
  },
  methods: {
    addToBasket(item) {
      const found = this.isInBasket(item.public_id);
      if (true !== found) { // not in basket
        found.push(item);
        localStorage.setItem('itemsInBasket', JSON.stringify(found));
      }
    },
    removeFromBasket(id) {
      console.log(id)
      const items = (JSON.parse(localStorage.getItem('itemsInBasket')) || []).filter(item => item.public_id !== id);
      console.log(items);
      console.log(JSON.parse(localStorage.getItem('itemsInBasket')) || [])
      localStorage.setItem('itemsInBasket', JSON.stringify(items));
    }
  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$eshop = eshop
  }
}