package com.productReview.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import lombok.Data;

@Entity
@Data
public class CartItem implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartId;
	@ManyToMany(cascade = CascadeType.ALL)
	private List<Product> productlist;
	 
	
	@OneToMany(cascade = CascadeType.ALL, targetEntity = Quantity.class, fetch = FetchType.LAZY)
	@JoinColumn(name = "cartId")
	private List<Quantity> quantityOfProdduct;

	
	private LocalDateTime createdTime;


	public Long getCartId() {
		return cartId;
	}


	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}


	public List<Product> getProductsList() {
		return productlist;
	}


	public void setProductsList(List<Product> productsList) {
		this.productlist = productsList;
	}


	public List<Quantity> getQuantityOfProduct() {
		return quantityOfProdduct ;
	}


	public void setQuantityOfProduct(List<Quantity> quantityOfProduct) {
		this.quantityOfProdduct = quantityOfProduct;
	}


	public LocalDateTime getCreatedTime() {
		return createdTime;
	}


	public void setCreatedTime(LocalDateTime createdTime) {
		this.createdTime = createdTime;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}