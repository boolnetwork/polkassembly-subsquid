export const ABI_JSON = [
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
        "name": "deposit_of",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "prop_index"
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
        "name": "finished_referendum_info",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "ref_index"
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
        "name": "lowest_unbaked",
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
        "name": "note_imminent_preimage",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bytes",
                "name": "encoded_proposal"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "note_preimage",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bytes",
                "name": "encoded_proposal"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "ongoing_referendum_info",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "ref_index"
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
                "name": "proposal_hash"
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
        "name": "public_prop_count",
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
        "name": "remove_vote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "ref_index"
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
                "name": "prop_index"
            },
            {
                "type": "uint256",
                "name": "seconds_upper_bound"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "standard_vote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "ref_index"
            },
            {
                "type": "bool",
                "name": "aye"
            },
            {
                "type": "uint256",
                "name": "vote_amount"
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
        "name": "un_delegate",
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
