const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const UniswapRouter = artifacts.require("UniswapV2Router02");
const TestToken = artifacts.require("TestToken");

contract('Compound Test', function (accounts) {
    console.log(accounts[0]);
    describe('Test common flow', function () {
        let governance = accounts[0];
        let uniswapV2Factory;
        let uniswapRouter;
        let testToken;
        let tx;


        it("Common flow", async function () {
            console.log("Deploy");
            testToken = await TestToken.new({from: governance});
            console.log("1. TestToken address at:  https://kovan.etherscan.io/address/" + testToken.address);

            // uniswapV2Factory = await UniswapV2Factory.at("0x3eb867cd5cce210b9757389da0E84cbD62D4F46C");
            // console.log("2. UniswapV2Factory address at:  https://kovan.etherscan.io/address/" + testToken.address);

            uniswapRouter = await UniswapRouter.new("0xAa94A7fE99922e8373abaF5D43555C32E8A8605B", "0xd0A1E359811322d97991E03f863a0C30C2cF029C", {from: governance});
            console.log("3. UniswapRouter address at:  https://kovan.etherscan.io/address/" + testToken.address);

            tx = await testToken.approve(uniswapRouter.address, web3.utils.toWei("100", "ether"));
            console.log("4. Token approve address at:  https://kovan.etherscan.io/tx/" + tx.tx);

            tx = await uniswapRouter.addLiquidityETH(testToken.address, web3.utils.toWei("100", "ether"), 0, 0, governance, 100000000000000,{from: governance,value:web3.utils.toWei("0.1", "ether")});
            console.log("5. UniswapRouter addLiquidityETH address at:  https://kovan.etherscan.io/tx/" + tx.tx);

            tx = await uniswapRouter.addLiquidityETH(testToken.address, web3.utils.toWei("100", "ether"), 0, 0, governance, 100000000000000,{from: governance,value:web3.utils.toWei("0.1", "ether")});
            console.log("6. UniswapRouter addLiquidityETH address at:  https://kovan.etherscan.io/tx/" + tx.tx);

        }).timeout(40000000000)

    })
})
