window.localStorageWithExpiry = {
    // Method to set an item with expiry
    setItem: (key, value, expiryInSeconds)=> {
        const now = new Date().getTime();
        const expiry = now + expiryInSeconds * 1000; 
        localStorage.setItem(key, JSON.stringify({ value, expiry }));
    },

    // Method to get an item from storage if it has not expired
    getItem: (key) => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return undefined;
        }
        const item = JSON.parse(itemStr);
        const now = new Date().getTime();
        if (now > item.expiry) {
            localStorage.removeItem(key);
            return undefined;
        }
        return item.value;
    }
};

window.localStorageWithExpiry.setItem("key1", "value", 1000);

console.log(window.localStorageWithExpiry.getItem("key1")); 
setTimeout(() => {
    console.log(window.localStorageWithExpiry.getItem("key1")); 
}, 1010000);