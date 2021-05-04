package com.productReview.exception;

public class ProductNotFoundException extends RuntimeException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ProductNotFoundException(String message) {
		this.message = message;

	}
}
