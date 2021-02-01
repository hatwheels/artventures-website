import Vue from 'vue';

let eshop = new Vue({
  data () {
    return {
      basketValue: (process.isClient) ? (JSON.parse(localStorage.getItem('itemsInBasket')) || []) : [],
      redirectInCheckoutValue: (process.isClient) ?
        (JSON.parse(localStorage.getItem('redirectInCheckoutValue')) || false) : false
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
    redirectInCheckout: {
      get: function() {
        return this.redirectInCheckoutValue;
      },
      set: function(bVal) {
        this.redirectInCheckoutValue = bVal;
        if (process.isClient) {
          localStorage.setItem('redirectInCheckoutValue', bVal);
        }
      }
    },
    isInBasket() {
      return (id) => {
        return this.basketValue.find(item => item.public_id === id) === undefined ? false : true;
      }
    },
    allRentPricesValid() {
      return this.basketValue.every(el1 => Object.prototype.hasOwnProperty.call(el1, "rentPrice") === true);
    },
    allSalePricesValid() {
      return this.basketValue.every(el1 => Object.prototype.hasOwnProperty.call(el1, "salePrice") === true);
    },
    totalRentPrice() {
      let total = 0;
      this.basketValue.forEach(el1 => {
        if (el1.choice === "rent") {
          total += parseInt(el1.rentPrice)
        }
      });
      return total;
    },
    totalSalePrice() {
      let total = 0;
      this.basketValue.forEach(el1 => {
        if (el1.choice === "sale") {
          total += parseInt(el1.salePrice)
        }
      });
      return total;
    }
  },
  methods: {
    addToBasket(item) {
      if (this.basketValue.find(elem => elem.public_id === item.public_id) === undefined) {  // not in basket
        this.basketValue.push({
          public_id: item.public_id,
          user_id: item.user_id || "",
          artist_name: item.artist_name || "",
          url: item.url || "",
          title: item.title || "",
          type: item.type || "",
          rentPrice: item.rentPrice || "",
          salePrice: item.salePrice || "",
          size: item.size || "",
          tags: item.tags || "",
          choice: "sale",
          selected: false
        });
        if (process.isClient) {
          localStorage.setItem('itemsInBasket', JSON.stringify(this.basketValue));
        }
      }
    },
    removeFromBasket(id) {
      const items = this.basketValue.filter(item => item.public_id !== id);
      this.basket = items;
    },
    removeSelectedFromBasket() {
      const items = this.basketValue.filter(item => item.selected === false);
      this.basket = items;
    }
  }
})

export default {
  install: function (Vue) {
    Vue.prototype.$eshop = eshop
  }
}