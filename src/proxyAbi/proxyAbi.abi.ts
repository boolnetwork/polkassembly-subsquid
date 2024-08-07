export const ABI_JSON = [
    {
        "type": "function",
        "name": "addProxy",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "delegate"
            },
            {
                "type": "uint8",
                "name": "proxyType"
            },
            {
                "type": "uint32",
                "name": "delay"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "isProxy",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "real"
            },
            {
                "type": "address",
                "name": "delegate"
            },
            {
                "type": "uint8",
                "name": "proxyType"
            },
            {
                "type": "uint32",
                "name": "delay"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "exists"
            }
        ]
    },
    {
        "type": "function",
        "name": "proxy",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "real"
            },
            {
                "type": "address",
                "name": "callTo"
            },
            {
                "type": "bytes",
                "name": "callData"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "proxyForceType",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "real"
            },
            {
                "type": "uint8",
                "name": "forceProxyType"
            },
            {
                "type": "address",
                "name": "callTo"
            },
            {
                "type": "bytes",
                "name": "callData"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removeProxies",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removeProxy",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "delegate"
            },
            {
                "type": "uint8",
                "name": "proxyType"
            },
            {
                "type": "uint32",
                "name": "delay"
            }
        ],
        "outputs": []
    }
]
