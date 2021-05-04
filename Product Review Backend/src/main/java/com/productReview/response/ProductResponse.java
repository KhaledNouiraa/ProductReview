package com.productReview.response;


import java.util.List;

import org.springframework.stereotype.Component;

import com.productReview.entity.Product;

@Component
public class ProductResponse {
	Product product;

	private Object obj;
	double rate;
	

	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

	int statusCode;
	String response;
	List<Product> productList;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public List<Product> getProductlist() {
		return productList;
	}

	public void setProductList(List<Product> productList) {
		this.productList = productList;
	}

	public ProductResponse() {

	}



	public ProductResponse(String response, Object obj) {
		super();
		this.obj = obj;

		this.response = response;
	}

	public ProductResponse(int statusCode, String response) {
		super();
		this.statusCode = statusCode;
		this.response = response;
	}

}