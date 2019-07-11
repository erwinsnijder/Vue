Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
    }
},
    template:`
    <div class="product">
          
            <div class="product-image">
              <img :src="image" />
            </div>

            <div class="product-info">
                <h1 class="title is-1">{{ title }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
                
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
                        
                        </div> 


                        <product-tabs></product-tabs>

                        <div>
                        <h2>Reviews</h2>
                        <p v-if="!reviews.length">There are no reviews yet</p>
                        <ul>
                            <li v-for="review in reviews">
                            <p>{{ review.name }}</p>
                            <p>{{ review.review }}</p>
                            <p>{{ review.rating }}</p>
                            </li>
                        </ul>
                        </div>
             
                        <product-review @review-submitted="addReview"></product-review>
                     
                     </div>
    `,
    data() {
        return {
            product: 'Socks',
            brand: 'Vuetiful apparel ',
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
            reviews: []
            
        }
      },
      methods: {
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
    },
    shipping() {
        if (this.premium) {
            return "Free for Premium"
        }
        return 2.99
    }
 }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">


    <p v-if="errors.length">
    <b>Please correct the following error:</b>
    <ul>
    <li v-for="error in errors">{{ error }}</li>    
    </ul>
    </p>

        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>
        
        <p>
          <label for="review">Review:</label>      
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
        <label>
        Yes
        <input type="radio" value="Yes" v-model="recommend"/>
      </label>
      <label>
        No
        <input type="radio" value="No" v-model="recommend"/>
      </label>
        <p>
          <input type="submit" value="Submit">  
        </p>    
      
    </form>
    `,
data() {
    return {
        name: null,
        review: null,
        rating: null,
        recommend: null,
        errors: []
    }
},
methods: {
    onSubmit() {
        if (this.name && this.review && this.rating && this.recommend) {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
            }
            this.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
            this.recommend= null
        }
        else {
            if(!this.name) this.errors.push("Name Required!")
            if(!this.review) this.errors.push("Review Required!")
            if(!this.rating) this.errors.push("Rating Required!")
        }   if(!this.recommend) this.errors.push("Recommendation required!")
    }
}
})

Vue.component('product-tabs', {
    template: `
    <div>
    <span class="tabs" 
          :class="{ activeTab: selectedTab === tab }"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectedTab = tab"
    >{{ tab }}</span>
  </div>
    `,
    data() {
        return {
          tabs: ['Reviews', ' Make a Review'],
          selectedTab: 'Reviews'
        }
      }
    })

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
          this.cart.push(id)
        }
    } 
    
})
