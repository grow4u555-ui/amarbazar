import { PrismaClient, UserRole, UserStatus, OrderStatus, PaymentStatus, PaymentMethod, KYCStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bazaarconnect.in' },
    update: {},
    create: {
      email: 'admin@bazaarconnect.in',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create demo customer
  const customerPassword = await bcrypt.hash('customer123', 12);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@demo.com' },
    update: {},
    create: {
      email: 'customer@demo.com',
      name: 'Demo Customer',
      passwordHash: customerPassword,
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });
  console.log('✅ Demo customer created:', customer.email);

  // Create demo seller
  const sellerPassword = await bcrypt.hash('seller123', 12);
  const seller = await prisma.user.upsert({
    where: { email: 'seller@demo.com' },
    update: {},
    create: {
      email: 'seller@demo.com',
      name: 'Demo Seller',
      passwordHash: sellerPassword,
      role: UserRole.SELLER,
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });
  console.log('✅ Demo seller created:', seller.email);

  // Create seller profile
  const sellerProfile = await prisma.sellerProfile.upsert({
    where: { userId: seller.id },
    update: {},
    create: {
      userId: seller.id,
      businessName: 'Demo Electronics Store',
      businessType: 'individual',
      gstin: '29AAAAA0000A1Z5',
      pan: 'AAAAA0000A',
      bankAccount: {
        accountNumber: '1234567890',
        ifsc: 'HDFC0001234',
        accountHolderName: 'Demo Seller',
        bankName: 'HDFC Bank',
      },
      upiId: 'demoseller@upi',
      commissionRate: 10,
      isActive: true,
      kycStatus: KYCStatus.APPROVED,
      kycApprovedAt: new Date(),
    },
  });
  console.log('✅ Seller profile created:', sellerProfile.businessName);

  // Create wallets
  await prisma.wallet.upsert({
    where: { userId: customer.id },
    update: {},
    create: {
      userId: customer.id,
      balance: 50000, // ₹500 in paise
      pendingBalance: 0,
    },
  });

  await prisma.wallet.upsert({
    where: { userId: seller.id },
    update: {},
    create: {
      userId: seller.id,
      balance: 100000, // ₹1000 in paise
      pendingBalance: 0,
    },
  });

  await prisma.wallet.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      balance: 0,
      pendingBalance: 0,
    },
  });
  console.log('✅ Wallets created');

  // Create default addresses
  await prisma.address.upsert({
    where: { id: 'default-customer-address' },
    update: {},
    create: {
      id: 'default-customer-address',
      userId: customer.id,
      type: 'shipping',
      name: 'Demo Customer',
      phone: '9876543210',
      addressLine1: '123 Demo Street',
      addressLine2: 'Near Demo Landmark',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India',
      isDefault: true,
    },
  });

  await prisma.address.upsert({
    where: { id: 'default-seller-address' },
    update: {},
    create: {
      id: 'default-seller-address',
      userId: seller.id,
      type: 'shipping',
      name: 'Demo Seller',
      phone: '9876543211',
      addressLine1: '456 Seller Avenue',
      addressLine2: 'Commercial Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India',
      isDefault: true,
    },
  });
  console.log('✅ Default addresses created');

  // Create categories
  const categories = [
    { name: 'Electronics', slug: 'electronics', description: 'Electronic devices and gadgets', level: 0, sortOrder: 1 },
    { name: 'Mobiles & Tablets', slug: 'mobiles-tablets', description: 'Smartphones and tablets', parentId: null, level: 1, sortOrder: 1 },
    { name: 'Laptops & Computers', slug: 'laptops-computers', description: 'Laptops, desktops and accessories', parentId: null, level: 1, sortOrder: 2 },
    { name: 'Audio & Wearables', slug: 'audio-wearables', description: 'Headphones, speakers, smartwatches', parentId: null, level: 1, sortOrder: 3 },
    { name: 'Fashion', slug: 'fashion', description: 'Clothing, footwear and accessories', level: 0, sortOrder: 2 },
    { name: "Men's Clothing", slug: 'mens-clothing', description: 'Clothing for men', parentId: null, level: 1, sortOrder: 1 },
    { name: "Women's Clothing", slug: 'womens-clothing', description: 'Clothing for women', parentId: null, level: 1, sortOrder: 2 },
    { name: 'Footwear', slug: 'footwear', description: 'Shoes, sandals and boots', parentId: null, level: 1, sortOrder: 3 },
    { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Home decor, kitchen appliances and furniture', level: 0, sortOrder: 3 },
    { name: 'Kitchen Appliances', slug: 'kitchen-appliances', description: 'Small and large kitchen appliances', parentId: null, level: 1, sortOrder: 1 },
    { name: 'Home Decor', slug: 'home-decor', description: 'Decorative items for home', parentId: null, level: 1, sortOrder: 2 },
    { name: 'Furniture', slug: 'furniture', description: 'Home and office furniture', parentId: null, level: 1, sortOrder: 3 },
  ];

  const createdCategories: Record<string, string> = {};

  for (const cat of categories) {
    const parentSlug = cat.parentId ? createdCategories[cat.parentId] : null;
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        level: cat.level,
        sortOrder: cat.sortOrder,
        parentId: parentSlug,
        commissionRate: cat.level === 0 ? 10 : undefined,
      },
    });
    createdCategories[cat.slug] = created.id;
    console.log(`✅ Category created: ${cat.name}`);
  }

  // Create sample products
  const electronicsCategory = await prisma.category.findUnique({ where: { slug: 'mobiles-tablets' } });
  const laptopsCategory = await prisma.category.findUnique({ where: { slug: 'laptops-computers' } });
  const fashionCategory = await prisma.category.findUnique({ where: { slug: 'mens-clothing' } });

  if (electronicsCategory) {
    const product1 = await prisma.product.upsert({
      where: { sku: 'DEMO-MOB-001' },
      update: {},
      create: {
        sellerId: seller.id,
        categoryId: electronicsCategory.id,
        name: 'iPhone 15 Pro Max 256GB - Natural Titanium',
        slug: 'iphone-15-pro-max-256gb-natural-titanium',
        description: 'The iPhone 15 Pro Max features a 6.7-inch Super Retina XDR display, A17 Pro chip, 48MP main camera with 5x optical zoom, and USB-C connectivity. Built with aerospace-grade titanium.',
        shortDescription: 'Latest iPhone with A17 Pro chip, 48MP camera, and titanium design',
        sku: 'DEMO-MOB-001',
        mrp: 159900,
        sellingPrice: 149900,
        discountPercent: 6,
        costPrice: 120000,
        stock: 25,
        lowStockThreshold: 5,
        weight: 221,
        dimensions: { length: 15.9, width: 7.7, height: 0.8 },
        images: [
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
          'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
        ],
        tags: ['apple', 'smartphone', 'flagship', '5g', 'titanium'],
        specifications: {
          display: '6.7-inch Super Retina XDR',
          chip: 'A17 Pro',
          storage: '256GB',
          camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
          battery: 'Up to 29 hours video playback',
          os: 'iOS 17',
        },
        isActive: true,
        isFeatured: true,
        seoTitle: 'Buy iPhone 15 Pro Max 256GB Natural Titanium - Best Price',
        seoDescription: 'Shop iPhone 15 Pro Max 256GB in Natural Titanium at best price. Free shipping, COD available.',
        publishedAt: new Date(),
      },
    });
    console.log('✅ Product created:', product1.name);

    // Create variant
    await prisma.productVariant.upsert({
      where: { sku: 'DEMO-MOB-001-128' },
      update: {},
      create: {
        productId: product1.id,
        name: 'Storage',
        value: '128GB',
        sku: 'DEMO-MOB-001-128',
        mrp: 139900,
        sellingPrice: 129900,
        stock: 30,
        isActive: true,
        sortOrder: 1,
      },
    });
  }

  if (laptopsCategory) {
    const product2 = await prisma.product.upsert({
      where: { sku: 'DEMO-LAP-001' },
      update: {},
      create: {
        sellerId: seller.id,
        categoryId: laptopsCategory.id,
        name: 'MacBook Air 15" M3 Chip 256GB - Midnight',
        slug: 'macbook-air-15-m3-256gb-midnight',
        description: 'The 15-inch MacBook Air with M3 chip delivers incredible performance and up to 18 hours of battery life in a stunningly thin and light design. Features Liquid Retina display, 1080p FaceTime HD camera, and six-speaker sound system.',
        shortDescription: 'Ultra-thin laptop with M3 chip, 15" Liquid Retina display, 18hr battery',
        sku: 'DEMO-LAP-001',
        mrp: 134900,
        sellingPrice: 124900,
        discountPercent: 7,
        costPrice: 100000,
        stock: 15,
        lowStockThreshold: 3,
        weight: 1510,
        dimensions: { length: 34.0, width: 23.8, height: 1.2 },
        images: [
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        ],
        tags: ['apple', 'laptop', 'macbook', 'm3', 'ultrabook'],
        specifications: {
          display: '15.3-inch Liquid Retina',
          chip: 'Apple M3 (8-core CPU, 10-core GPU)',
          memory: '8GB Unified Memory',
          storage: '256GB SSD',
          battery: 'Up to 18 hours',
          os: 'macOS Sonoma',
        },
        isActive: true,
        isFeatured: true,
        seoTitle: 'Buy MacBook Air 15" M3 256GB Midnight - Best Price',
        seoDescription: 'Shop MacBook Air 15" with M3 chip at best price. Free shipping, EMI available.',
        publishedAt: new Date(),
      },
    });
    console.log('✅ Product created:', product2.name);
  }

  if (fashionCategory) {
    const product3 = await prisma.product.upsert({
      where: { sku: 'DEMO-FSH-001' },
      update: {},
      create: {
        sellerId: seller.id,
        categoryId: fashionCategory.id,
        name: "Men's Classic Fit Cotton T-Shirt - Pack of 3",
        slug: 'mens-classic-fit-cotton-tshirt-pack-of-3',
        description: 'Premium quality 100% cotton t-shirts in classic fit. Soft, breathable fabric perfect for daily wear. Available in multiple colors.',
        shortDescription: '100% cotton, classic fit, pack of 3 - Black, Navy, White',
        sku: 'DEMO-FSH-001',
        mrp: 999,
        sellingPrice: 699,
        discountPercent: 30,
        costPrice: 350,
        stock: 100,
        lowStockThreshold: 10,
        weight: 300,
        dimensions: { length: 28, width: 20, height: 2 },
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        ],
        tags: ['cotton', 't-shirt', 'men', 'casual', 'pack'],
        specifications: {
          material: '100% Cotton',
          fit: 'Classic Fit',
          sleeve: 'Short Sleeve',
          neck: 'Crew Neck',
          care: 'Machine Wash',
          pack: '3 Pieces',
        },
        isActive: true,
        isFeatured: false,
        seoTitle: "Buy Men's Cotton T-Shirt Pack of 3 - Best Price",
        seoDescription: "Shop premium cotton t-shirts for men. Pack of 3 in Black, Navy, White. Free shipping.",
        publishedAt: new Date(),
      },
    });
    console.log('✅ Product created:', product3.name);

    // Create variants for sizes
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    for (let i = 0; i < sizes.length; i++) {
      await prisma.productVariant.upsert({
        where: { sku: `DEMO-FSH-001-${sizes[i]}` },
        update: {},
        create: {
          productId: product3.id,
          name: 'Size',
          value: sizes[i],
          sku: `DEMO-FSH-001-${sizes[i]}`,
          mrp: 999,
          sellingPrice: 699,
          stock: 20,
          isActive: true,
          sortOrder: i + 1,
        },
      });
    }
  }

  // Create platform settings
  const settings = [
    { key: 'platform_name', value: 'BazaarConnect', category: 'general', isPublic: true },
    { key: 'platform_commission_rate', value: '10', category: 'commission', isPublic: false },
    { key: 'min_payout_amount', value: '500', category: 'payout', isPublic: false },
    { key: 'payout_schedule_days', value: '7', category: 'payout', isPublic: false },
    { key: 'cod_enabled', value: 'true', category: 'payment', isPublic: true },
    { key: 'razorpay_enabled', value: 'true', category: 'payment', isPublic: true },
    { key: 'wallet_enabled', value: 'true', category: 'payment', isPublic: true },
    { key: 'return_window_days', value: '7', category: 'shipping', isPublic: true },
    { key: 'free_shipping_threshold', value: '499', category: 'shipping', isPublic: true },
    { key: 'default_shipping_charge', value: '50', category: 'shipping', isPublic: true },
    { key: 'gst_enabled', value: 'true', category: 'general', isPublic: false },
    { key: 'supported_languages', value: '["en", "hi", "bn"]', category: 'general', isPublic: true },
    { key: 'default_language', value: 'en', category: 'general', isPublic: true },
  ];

  for (const setting of settings) {
    await prisma.platformSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log('✅ Platform settings created');

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });