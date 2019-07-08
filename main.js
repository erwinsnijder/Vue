vue.component('product', {
    template:`
    <div class="product">
          
            <div class="product-image">
              <img :src="image" />
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div v-for="(variant, index) in variants"
                     :key="variant.variantId"
                     class="color-box"
                     :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)">
                </div>

                <button v-on:click="addToCart"
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">Add to Cart</button>
                <div class="cart">
                    <p>Cart({{ cart }})</p>
                </div>
            </div>        
        </div>
    </div>`,
    data() {
        return {
            product: 'Socks',
            brand: 'Vuetiful apparel',
            selectedVariant: 0,
            details: ['80% cotton', '20% polyester'],
            variants: [
              {
                variantId: 2234,
                variantColor: 'green',
                variantImage:  './assets/vmSocks-green-onWhite.jpg',
                variantQuantity: 10     
              },
              {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0     
              }
            ],
            cart: 0
        }
      },
    methods: {
        addToCart: function() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
            
        }
    },
    computed: {
        title() {
            return this.brand + '' + this.product 
    },
    image() {
        return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
        return this.variants[this.selectedVariant].variantQuantity
    }
 }
})


var app = new Vue({
    el: '#app',
    
    
})