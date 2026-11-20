<script setup lang="ts">
defineProps<{ subtotal: number; delivery: number }>()
defineEmits<{ checkout: [] }>()
</script>

<template>
	<div class="summary-section">
		<div class="summary-card">
			<h2 class="summary-title">Order Summary</h2>

			<div class="summary-items">
				<div class="summary-row">
					<span class="summary-label">Subtotal</span>
					<span class="summary-value">${{ subtotal }}</span>
				</div>
				<div class="summary-row">
					<span class="summary-label">Delivery</span>
					<span class="summary-value">${{ delivery }}</span>
				</div>
				<div class="summary-row">
					<span class="summary-label">Discount</span>
					<span class="summary-value discount">$0</span>
				</div>
			</div>

			<div class="summary-divider"></div>

			<div class="summary-total">
				<span class="total-label">Total</span>
				<span class="total-value">${{ subtotal + delivery }}</span>
			</div>

			<RouterLink @click="$emit('checkout')" to="/orderPlacement" class="checkout-btn">
				Place an order
			</RouterLink>

			<div class="consent-section">
				<input class="consent-checkbox" type="checkbox" name="agree" id="agree" />
				<label for="agree" class="consent-text">
					By clicking "Place Order", you consent to the processing of <a href="#">personal data</a>
				</label>
			</div>
		</div>
	</div>
</template>

<style scoped>
.summary-section {
	flex: 0 0 320px;
	position: sticky;
	top: 100px;
}

.summary-card {
	background: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 12px;
	padding: 24px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.summary-title {
	font-size: 18px;
	font-weight: 700;
	color: #333;
	margin: 0 0 20px 0;
}

.summary-items {
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-bottom: 16px;
}

.summary-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
}

.summary-label {
	color: #666;
	font-weight: 500;
}

.summary-value {
	color: #333;
	font-weight: 600;
}

.summary-value.discount {
	color: #4caf50;
}

.summary-divider {
	height: 1px;
	background: #e0e0e0;
	margin: 16px 0;
}

.summary-total {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	padding-bottom: 16px;
	border-bottom: 2px solid #f0f0f0;
}

.total-label {
	font-size: 16px;
	font-weight: 600;
	color: #333;
}

.total-value {
	font-size: 24px;
	font-weight: 700;
	color: var(--color1);
}

.checkout-btn {
	display: block;
	width: 100%;
	padding: 14px 16px;
	background: var(--color1);
	color: white;
	text-align: center;
	text-decoration: none;
	border-radius: 8px;
	font-weight: 600;
	font-size: 15px;
	transition: background 0.3s ease, transform 0.2s ease;
	border: none;
	cursor: pointer;
	margin-bottom: 16px;
}

.checkout-btn:hover {
	background: #239b7d;
	transform: translateY(-2px);
}

.consent-section {
	display: flex;
	gap: 8px;
	align-items: flex-start;
}

.consent-checkbox {
	width: 16px;
	height: 16px;
	margin-top: 2px;
	cursor: pointer;
	flex-shrink: 0;
}

.consent-text {
	font-size: 12px;
	color: #666;
	cursor: pointer;
	line-height: 1.4;
}

.consent-text a {
	color: var(--color1);
	text-decoration: none;
	font-weight: 600;
}

.consent-text a:hover {
	text-decoration: underline;
}

@media (max-width: 768px) {
	.summary-section {
		flex: 1;
		width: 100%;
		position: static;
	}

	.summary-card {
		padding: 20px;
	}

	.summary-title {
		font-size: 16px;
		margin-bottom: 16px;
	}

	.total-value {
		font-size: 20px;
	}

	.checkout-btn {
		padding: 12px 16px;
		font-size: 14px;
	}
}

@media (max-width: 480px) {
	.summary-section {
		width: 100%;
		position: static;
	}

	.summary-card {
		padding: 16px;
	}

	.summary-title {
		font-size: 15px;
		margin-bottom: 14px;
	}

	.summary-row {
		font-size: 13px;
	}

	.summary-total {
		margin-bottom: 16px;
		padding-bottom: 12px;
	}

	.total-label {
		font-size: 14px;
	}

	.total-value {
		font-size: 18px;
	}

	.checkout-btn {
		padding: 12px;
		font-size: 13px;
		margin-bottom: 12px;
	}

	.consent-checkbox {
		width: 14px;
		height: 14px;
	}

	.consent-text {
		font-size: 11px;
	}
}
</style>
