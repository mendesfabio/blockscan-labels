const tokenListUrl = chrome.runtime.getURL("../data/tokensList.json");

const addresses = document.querySelectorAll("a");

const tokensInfo = {};

(async function() {
    const { tokens: tokensList} = 
        await fetch(tokenListUrl).then((response) => response.json());
    
    for (let { address, symbol, name, chainId } of tokensList) {
        if (chainId === 1) {
            tokensInfo[address.toLowerCase()] = {
                symbol,
                name,
            };
        };
    };
    
    const tokensAddresses = Object.keys(tokensInfo);
    
    for (let i=0; i < addresses.length; i++) {
        const address = addresses[i].innerText
        if (tokensAddresses.includes(addresses[i].innerText)) {
            addresses[i].innerText = 
                `${tokensInfo[address].name} (${tokensInfo[address].symbol})`;
        };
    };

})();