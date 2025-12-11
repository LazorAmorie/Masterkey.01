
const fetch = require('node-fetch'); // Ensure node-fetch is available, or use native fetch in Node 18+

// Use native fetch if available (Node 18+), otherwise require check would fail if we didn't add it to package.json
// But since we are using Node, let's assume native fetch or we should have extended package.json.
// Actually, 'fetch' is global in Node 18+. I'll assume Node 18+.

const BASE_URL = 'http://localhost:5000/api';

async function runTest() {
    console.log('🚀 Starting Test Flow...');
    
    // 1. Register User
    const timestamp = Date.now();
    const user = {
        username: `user_${timestamp}`,
        email: `user_${timestamp}@example.com`,
        password: 'password123'
    };
    
    console.log(`\n1️⃣ Registering User: ${user.email}`);
    
    try {
        let response = await fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        
        let data = await response.json();
        
        if (!response.ok) {
            // If user already exists (unlikely with timestamp), try login
            console.log('   Registration failed (maybe exists?), trying login...');
        } else {
            console.log('   ✅ Registration successful');
        }

        // 2. Login
        console.log(`\n2️⃣ Logging in...`);
        response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });
        
        data = await response.json();
        
        if (!response.ok) {
            throw new Error(`Login failed: ${data.message}`);
        }
        
        const token = data.token;
        console.log('   ✅ Login successful');
        console.log(`   🔑 Token received (${token.substring(0, 15)}...)`);
        
        // 3. Send Transaction
        console.log(`\n3️⃣ Sending Transaction...`);
        const transactionPayload = {
            receiverIdentifier: 'recipient@example.com',
            amount: 50.00
        };
        
        response = await fetch(`${BASE_URL}/transaction/send`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(transactionPayload)
        });
        
        data = await response.json();
        
        if (!response.ok) {
            throw new Error(`Transaction failed: ${data.message}`);
        }
        
        console.log('   ✅ Transaction successful');
        console.log(`   💸 Transaction ID: ${data.data.transactionId}`);
        console.log(`   💰 New Balance: ${data.data.newBalance}`);

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

runTest();
