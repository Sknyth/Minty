<template>
  <footer class="store-footer">
    <div class="store-shell">
      <div class="footer-main">
        <RouterLink to="/" class="store-brand" aria-label="Minty home">
          <span class="brand-mark"><i class="bi bi-leaf-fill" aria-hidden="true"></i></span>
          Minty
        </RouterLink>

        <nav aria-label="Footer navigation">
          <RouterLink to="/">Shop</RouterLink>
          <RouterLink to="/wishlist">Wishlist</RouterLink>
          <RouterLink to="/cart">Cart</RouterLink>
          <a href="mailto:iulianrusu29@gmail.com">Contact</a>
        </nav>
      </div>
      <small class="footer-note">© {{ new Date().getFullYear() }} Minty</small>
    </div>
  </footer>
</template>

<style scoped>
.store-footer {
  margin-top: auto;
  padding-block: 24px 16px;
  background: var(--minty-ink);
  color: white;
}

.store-footer .store-brand {
  color: white;
}

.store-footer .brand-mark {
  background: var(--color2);
  color: var(--minty-ink);
}

.footer-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 20px;
}

.footer-main nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
}

.footer-main nav a {
  color: #ecf3eb;
  font-size: 0.9rem;
  font-weight: 550;
}

.footer-main nav a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.footer-note {
  display: block;
  padding-top: 14px;
  border-top: 1px solid #ffffff33;
  color: #c4d1c6;
}

.store-footer :focus-visible {
  outline-color: var(--color2);
}
</style>
