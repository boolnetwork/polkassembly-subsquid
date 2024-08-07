export const ABI_JSON = [
    {
        "type": "event",
        "anonymous": false,
        "name": "Delegated",
        "inputs": [
            {
                "type": "address",
                "name": "who",
                "indexed": true
            },
            {
                "type": "address",
                "name": "target",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Proposed",
        "inputs": [
            {
                "type": "uint32",
                "name": "proposalIndex",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "deposit",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Seconded",
        "inputs": [
            {
                "type": "uint32",
                "name": "proposalIndex",
                "indexed": true
            },
            {
                "type": "address",
                "name": "seconder",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "StandardVote",
        "inputs": [
            {
                "type": "uint32",
                "name": "referendumIndex",
                "indexed": true
            },
            {
                "type": "address",
                "name": "voter",
                "indexed": false
            },
            {
                "type": "bool",
                "name": "aye",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "voteAmount",
                "indexed": false
            },
            {
                "type": "uint8",
                "name": "conviction",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Undelegated",
        "inputs": [
            {
                "type": "address",
                "name": "who",
                "indexed": true
            }
        ]
    },
    {
        "type": "function",
        "name": "delegate",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "representative"
            },
            {
                "type": "uint256",
                "name": "conviction"
            },
            {
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "depositOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "propIndex"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "finishedReferendumInfo",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint32",
                "name": "refIndex"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "lowestUnbaked",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "noteImminentPreimage",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bytes",
                "name": "encodedProposal"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "notePreimage",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bytes",
                "name": "encodedProposal"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "ongoingReferendumInfo",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint32",
                "name": "refIndex"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "bytes32",
                "name": ""
            },
            {
                "type": "uint8",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "propose",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bytes32",
                "name": "proposalHash"
            },
            {
                "type": "uint256",
                "name": "value"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "publicPropCount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "removeVote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "refIndex"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "second",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "propIndex"
            },
            {
                "type": "uint256",
                "name": "secondsUpperBound"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "standardVote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "refIndex"
            },
            {
                "type": "bool",
                "name": "aye"
            },
            {
                "type": "uint256",
                "name": "voteAmount"
            },
            {
                "type": "uint256",
                "name": "conviction"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "unDelegate",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "unlock",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "target"
            }
        ],
        "outputs": []
    }
]
