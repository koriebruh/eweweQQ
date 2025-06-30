const bcrypt = require('bcryptjs');
const { createCategory } = require('../src/models/Category');
const { createProduct } = require('../src/models/Product');
const { addUser } = require('../src/models/Users');
const { createWishlist } = require('../src/models/Wishlist');

const runSeeder = async () => {
    try {
        // === 1. SEED CATEGORIES ===
        const categoriesData = ['Chair', 'Table', 'Sofa'];
        const categories = [];

        for (const name of categoriesData) {
            try {
                // Try to create the category
                const category = await createCategory({ category_name: name });
                categories.push(category);
                console.log(`Created category: ${name}`);
            } catch (error) {
                // If category already exists, find it instead
                if (error.code === 'P2002') {
                    console.log(`Category '${name}' already exists, fetching existing one...`);
                    // You'll need to add a findCategoryByName function to your Category model
                    // For now, we'll assume you have prisma access here
                    const { PrismaClient } = require('@prisma/client');
                    const prisma = new PrismaClient();
                    const existingCategory = await prisma.categories.findUnique({
                        where: { category_name: name }
                    });
                    categories.push(existingCategory);
                } else {
                    throw error; // Re-throw if it's a different error
                }
            }
        }

        // === 2. SEED PRODUCTS ===
        const products = [];

        const chairProducts = [
            {
                product_name: 'Modern Chair',
                product_label: 'modern-chair',
                product_image: ['https://example.com/chair1.png'],
                description: 'Stylish modern chair',
                color: ['Black'],
                stock_quantity: 10,
                price: 500000,
                rating: 4.5,
                material: 'Wood',
                fabric: 'Cotton',
                dimension: '50x50x90 cm',
            },
            {
                product_name: 'Office Chair',
                product_label: 'office-chair',
                product_image: ['https://example.com/chair2.png'],
                description: 'Comfortable office chair',
                color: ['Gray'],
                stock_quantity: 5,
                price: 700000,
                rating: 4.8,
                material: 'Plastic',
                fabric: 'Mesh',
                dimension: '55x55x100 cm',
            },
        ];

        const tableProducts = [
            {
                product_name: 'Dining Table',
                product_label: 'dining-table',
                product_image: ['https://example.com/table1.png'],
                description: 'Wooden dining table',
                color: ['Brown'],
                stock_quantity: 3,
                price: 1200000,
                rating: 4.6,
                material: 'Wood',
                fabric: '-',
                dimension: '150x80x75 cm',
            },
            {
                product_name: 'Work Desk',
                product_label: 'work-desk',
                product_image: ['https://example.com/table2.png'],
                description: 'Minimalist work desk',
                color: ['White'],
                stock_quantity: 7,
                price: 800000,
                rating: 4.4,
                material: 'MDF',
                fabric: '-',
                dimension: '120x60x75 cm',
            },
        ];

        const sofaProducts = [
            {
                product_name: 'L-Shaped Sofa',
                product_label: 'l-sofa',
                product_image: ['https://example.com/sofa1.png'],
                description: 'Comfy L-shaped sofa',
                color: ['Blue'],
                stock_quantity: 2,
                price: 3000000,
                rating: 4.9,
                material: 'Wood + Foam',
                fabric: 'Velvet',
                dimension: '200x150x90 cm',
            },
            {
                product_name: '2-Seater Sofa',
                product_label: '2-seater-sofa',
                product_image: ['https://example.com/sofa2.png'],
                description: 'Elegant 2-seater',
                color: ['Beige'],
                stock_quantity: 4,
                price: 1800000,
                rating: 4.7,
                material: 'Metal',
                fabric: 'Linen',
                dimension: '140x90x80 cm',
            },
        ];

        const productGroups = [chairProducts, tableProducts, sofaProducts];

        for (let i = 0; i < categories.length; i++) {
            for (const product of productGroups[i]) {
                try {
                    const createdProduct = await createProduct({
                        ...product,
                        category_id: categories[i].category_id,
                    });
                    products.push(createdProduct);
                    console.log(`Created product: ${product.product_name}`);
                } catch (error) {
                    if (error.code === 'P2002') {
                        console.log(`Product '${product.product_name}' already exists, skipping...`);
                        // Optionally fetch existing product and add to products array
                    } else {
                        throw error;
                    }
                }
            }
        }

        // === 3. SEED USERS ===
        const users = [];
        const userSeeds = [
            {
                username: 'alice',
                email: 'alice@furniscan.com',
                password: 'alice123',
            },
            {
                username: 'bob',
                email: 'bob@furniscan.com',
                password: 'bob123',
            },
        ];

        for (const userSeed of userSeeds) {
            try {
                const hashed = await bcrypt.hash(userSeed.password, 10);
                const newUser = await addUser({
                    username: userSeed.username,
                    email: userSeed.email,
                    password: hashed,
                });
                users.push(newUser);
                console.log(`Created user: ${userSeed.username}`);
            } catch (error) {
                if (error.code === 'P2002') {
                    console.log(`User '${userSeed.username}' already exists, skipping...`);
                    // Optionally fetch existing user and add to users array
                } else {
                    throw error;
                }
            }
        }

        // === 4. SEED WISHLISTS ===
        if (users.length >= 2 && products.length >= 6) {
            try {
                await createWishlist({
                    user_id: users[0].id,
                    product_id: products[0].product_id, // Chair
                });
                console.log('Created wishlist entry 1');
            } catch (error) {
                if (error.code === 'P2002') {
                    console.log('Wishlist entry 1 already exists, skipping...');
                }
            }

            try {
                await createWishlist({
                    user_id: users[0].id,
                    product_id: products[3].product_id, // Table
                });
                console.log('Created wishlist entry 2');
            } catch (error) {
                if (error.code === 'P2002') {
                    console.log('Wishlist entry 2 already exists, skipping...');
                }
            }

            try {
                await createWishlist({
                    user_id: users[1].id,
                    product_id: products[5].product_id, // Sofa
                });
                console.log('Created wishlist entry 3');
            } catch (error) {
                if (error.code === 'P2002') {
                    console.log('Wishlist entry 3 already exists, skipping...');
                }
            }
        }

        console.log('Seeder executed successfully with multiple entries!');
        process.exit(0);
    } catch (error) {
        console.error('Seeder failed:', error);
        process.exit(1);
    }
};

runSeeder();