# Navbar.jsx Changes - TODO

## Plan

### 1. Change category click to redirect to CategoriesPage
- Update `handleCategoryClick` to navigate to `/categories?category=${categoryId}` instead of `/products?category=${categoryId}`

### 2. Show only 5 categories in nav links (after Home)
- Change `categories.slice(0, 6)` → `categories.slice(0, 5)`

### 3. Remove "Offers" link from nav links
- Delete the `<Link to="/products" className="km-nav-link">Offers</Link>` block

### 4. Remove "More" link from nav links
- Delete the `<Link to="/products" className="km-nav-link">More</Link>` block

### 5. Update CSS (optional)
- No CSS changes needed (existing styles work fine)

