// Test script for the transaction endpoint

const testTransaction = async () => {
    const url = 'http://localhost:5000/api/transaction/send';
    
    const testData = {
        sender: "alice@wallet",
        receiver: "bob@wallet",
        amount: 250
    };

    console.log('🚀 Testing Transaction Endpoint...\n');
    console.log('📤 Sending request to:', url);
    console.log('📋 Request body:', JSON.stringify(testData, null, 2));
    console.log('\n---\n');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        console.log('✅ Transaction Successful!\n');
        console.log('📥 Response:', JSON.stringify(result, null, 2));
        console.log('\n---\n');
        console.log('Transaction Details:');
        console.log(`  Status: ${result.status}`);
        console.log(`  Transaction ID: ${result.transactionId}`);
        console.log(`  From: ${result.sender}`);
        console.log(`  To: ${result.receiver}`);
        console.log(`  Amount: $${result.amount}`);
        console.log(`  Fee: $${result.fee}`);
        console.log(`  Route: ${result.route}`);
        
    } catch (error) {
        console.error('❌ Error testing transaction:', error.message);
        process.exit(1);
    }
};

testTransaction();
