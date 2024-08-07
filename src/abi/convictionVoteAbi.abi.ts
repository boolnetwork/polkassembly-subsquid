export const ABI_JSON = [
    {
        "type": "function",
        "name": "delegate",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint16",
                "name": "trackId"
            },
            {
                "type": "address",
                "name": "representative"
            },
            {
                "type": "uint8",
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
        "name": "removeOtherVote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "target"
            },
            {
                "type": "uint16",
                "name": "trackId"
            },
            {
                "type": "uint32",
                "name": "pollIndex"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removeVote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint32",
                "name": "pollIndex"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "undelegate",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint16",
                "name": "trackId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "unlock",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint16",
                "name": "trackId"
            },
            {
                "type": "address",
                "name": "target"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "voteNo",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint32",
                "name": "pollIndex"
            },
            {
                "type": "uint256",
                "name": "voteAmount"
            },
            {
                "type": "uint8",
                "name": "conviction"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "voteYes",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint32",
                "name": "pollIndex"
            },
            {
                "type": "uint256",
                "name": "voteAmount"
            },
            {
                "type": "uint8",
                "name": "conviction"
            }
        ],
        "outputs": []
    }
]
