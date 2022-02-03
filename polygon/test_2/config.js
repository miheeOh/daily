
module.exports = {
    plasma:{
        parent:{
            erc20:"0x3f152B63Ec5CA5831061B2DccFb29a874C317502",
            erc721:"0xfA08B72137eF907dEB3F202a60EfBc610D2f224b",
            weth:"0x60D4dB9b534EF9260a88b0BED6c486fe13E604Fc"
        },
        child:{
            erc721:"0x33FC58F12A56280503b04AC7911D1EceEBcE179c",
            erc20:"0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e",
            weth:"0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62"
        },
        childChainAddress:"0x1EDd419627Ef40736ec4f8ceffdE671a30803c5e",
        registryAddress:"0xeE11713Fe713b2BfF2942452517483654078154D",
        rootChainAddress:"0x77f32d6c7bf3639b2f59c6843420e80e9e3a86af",
        withdrawManagerAddress:"0xb075cdda944d4e1ff19f2201cdc3a440a11d4710",
        depositManagerAddress:"0x20339c5Ea91D680E681B9374Fc0a558D5b96a026",

    },
    parent:{
        rpc:process.env.GOERLI_RPC_URL
    },
    child:{
        rpc:"https://rpc-mumbai.matic.today"
    },
    pos:{
        parent:{
            erc20:"0x655F2166b0709cd575202630952D71E2bB0d61Af",
            erc721:"0x084297B12F204Adb74c689be08302FA3f12dB8A7",
            erc1155:"0x2e3Ef7931F2d0e4a7da3dea950FF3F19269d9063",
            chainManagerAddress:"",
            erc20Predicate:"0x39c1e715316a1acbce0e6438cf62edf83c111975",
            erc721Predicate:"0x473cb675c9214f79dee10948443509c441a678e7",
            erc1155Predicate:"",
            etherPredicate:""
        },
        child:{
            erc721:"0x757b1BD7C12B81b52650463e7753d7f5D0565C0e",
            erc20:"0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
            weth:"0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
            erc1155:"0xA07e45A987F19E25176c877d98388878622623FA"
        }
    },
    SYNCER_URL:"https://testnetv3-syncer.api.matic.network/api/v1",
    WATCHER_URL:"https://testnetv3-watcher.api.matic.network/api/v1",
    user1:{
        privateKey: process.env.privateKey,
        address:"0x90062dDC0f4a576174CC97cd02F77735E0b89e7E"
    },
    user2:{
        privateKey:process.env.privateKey2,
        address:"0xd2D6E8117bb48a3bDcD29835479b4980c6795bBF"
    }
}