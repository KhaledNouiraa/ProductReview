// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,


  // BASE_URL: 'http://localhost:8081/',
  // ProductUrl: 'http://localhost:8081/',
  // getallproductsurl: '',
  BASE_URL: 'http://localhost:8080',
  ProductUrl: 'http://localhost:8080',
  getallproductsurl: 'products/',


  // BASE_URL: 'http://localhost:8080',
  // ProductUrl: 'http://localhost:8080',
  // getallproductsurl: '',
  // BASE_URL: 'http://localhost:8080',
  // ProductUrl: 'http://localhost:8080',
  // getallproductsurl: 'products/getAllProducts',


  getproductbyIdurl: 'products/',
  addandupdatecartUrl: 'products/addandupdatecart',
  sorting: 'products/sorting',
  SortNewestArrival: 'products/unsorting',
  cusUrl : 'products/pagewise',

  addproducts: 'products',
  deleteProduct: 'products',
  editProduct: 'products',
  verifyProduct: 'products',
  addProductImage: 'products/productimage',
  CartUrl: 'http://localhost:8080/',
  addUrl: 'customers/addcustomer',
  addtocart: 'carts/addcart',
  getproductprice: 'getproductprice',
  getReview: 'products/getratereviews',

  quantity: 'http://localhost:8080/',
  addproductsquantity: 'addproductsquantity',
  USER_REGISTRATION: 'registration',
  USER_LOGIN: 'login',
  USER_FORGET_PASSWORD: 'forgotpassword',
  USER_RESETPASSWORD: 'update',
  ADDCART: '/productstore/v3/cart/addproductCart/',
  COUNT_PRODUCTS_IN_CART: '/productstore/v3/cart/productCount',
  DEC_PRODUCTS_QUANTITY: '/productstore/v3/cart/decreaseQuantityPrice?productId=',
  INC_PRODUCTS_QUANTITY: '/productstore/v3/cart/increaseproductsquantity?productId=',
  REMOVE_PRODUCTS_FROM_CART: '/productstore/v3/cart/removeCartProducts',
  GET_PRODUCTS_FROM_CART: '/productstore/v3/cart/getcartproducts',
  GET_ADDRESS_BY_ADDRES: '/address/users',
  UPDATE_ADDRESS: '/address/updateAddress',
  ADD_ADDRESS: '/address/add',
  PLACE_ORDER: '/productstore/placeOrder?addressId=',
  WRITE_REVIEW: 'products/ratingreview?productId=',
  GET_REVIEWS: 'products/ratingreviews/?productId=',

  ratereview: 'products/getratereviews/?productId=',

  adminUrl: 'http://localhost:8080/',
  approveProduct: 'admin/update/',
  rejectProduct: 'admin/update/',
  unVerifiedProducts: 'admin/products',
  rejectedProducts: 'admin/products',
  approvedProducts: 'admin/products',
  avgrateofproduct: 'products/avgrate?productId=',
  getallOrderedProducts: 'productstore/getOrdersByAdmin',
  changeOrderstatus: 'productstore/orderStatusByAdmin',
  getOrdersByseller: 'productstore/getOrdersByseller',
  getSortedProductByRate: 'products/sortbyrate',

  WISHLIST_ADD: 'productstore/v3/wishlist/addproductWishlist',
  WISHLIST_GET: 'productstore/v3/wishlist/getwishproducts',
  WISHLIST_COUNT: 'productstore/v3/wishlist/wishlistcount',
  WISHLIST_REMOVE: 'productstore/v3/wishlist/removeWishlist/',

};
