// Test tracking number generation
const generateTrackingNumber = () => {
  return Math.floor(Math.random() * 900000000) + 100000000;
};

console.log("Testing 10 tracking numbers:");
for (let i = 0; i < 10; i++) {
  const num = generateTrackingNumber();
  console.log(`${i + 1}. ${num} (type: ${typeof num}, length: ${num.toString().length})`);
}
