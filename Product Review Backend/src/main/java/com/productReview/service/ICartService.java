package com.productReview.service;

import java.util.List;

import com.productReview.dto.CartDto;
import com.productReview.entity.CartItem;

public interface ICartService {
 List<CartItem> addProducttoCart(String token,long ProductId);
 
 List<CartItem> getProductsfromCart(String token);
 
 boolean removeProductsFromCart(String token, Long ProductId);
 
 int getCountOfProducts(String token);
 
 CartItem IncreaseProductsQuantityInCart(String token, Long ProductId, CartDto ProductQuantityDetails);
 
 CartItem descreaseProductsQuantityInCart(String token, Long ProductId, CartDto ProductQuantityDetails);

 
}
