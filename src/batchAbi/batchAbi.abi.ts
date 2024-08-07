export const ABI_JSON = [
    {
        "type": "event",
        "anonymous": false,
        "name": "SubcallFailed",
        "inputs": [
            {
                "type": "uint256",
                "name": "index",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SubcallSucceeded",
        "inputs": [
            {
                "type": "uint256",
                "name": "index",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "batchAll",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "to"
            },
            {
                "type": "uint256[]",
                "name": "value"
            },
            {
                "type": "bytes[]",
                "name": "callData"
            },
            {
                "type": "uint64[]",
                "name": "gasLimit"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "batchSome",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "to"
            },
            {
                "type": "uint256[]",
                "name": "value"
            },
            {
                "type": "bytes[]",
                "name": "callData"
            },
            {
                "type": "uint64[]",
                "name": "gasLimit"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "batchSomeUntilFailure",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "to"
            },
            {
                "type": "uint256[]",
                "name": "value"
            },
            {
                "type": "bytes[]",
                "name": "callData"
            },
            {
                "type": "uint64[]",
                "name": "gasLimit"
            }
        ],
        "outputs": []
    }
]
