var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vuetiful apparel',
        product: 'Socks',
        selectedVariant: 0,
        details: ["80% cotton", "20% polyester"],
        variants: [
            {
                variantId: 2234,
                variantColor: "Green",
                variantImage: './assets/vmSocks-green-onWhite.jpg',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "Blue",
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0
            }
        ],
        cart: 0
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