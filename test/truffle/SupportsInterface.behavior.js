const {makeInterfaceId} = require('../helpers/makeInterfaceId');

const INTERFACE_IDS = {
  ERC165: makeInterfaceId([
    'supportsInterface(bytes4)',
  ]),
  ERC721: makeInterfaceId([
    'balanceOf(address)',
    'ownerOf(uint256)',
    'approve(address,uint256)',
    'getApproved(uint256)',
    'setApprovalForAll(address,bool)',
    'isApprovedForAll(address,address)',
    'transferFrom(address,address,uint256)',
    'safeTransferFrom(address,address,uint256)',
    'safeTransferFrom(address,address,uint256,bytes)',
  ]),
  ERC721Enumerable: makeInterfaceId([
    'totalSupply()',
    'tokenOfOwnerByIndex(address,uint256)',
    'tokenByIndex(uint256)',
  ]),
  ERC721Metadata: makeInterfaceId([
    'name()',
    'symbol()',
    'tokenURI(uint256)',
  ]),
  ERC721Exists: makeInterfaceId([
    'exists(uint256)',
  ]),
};

function shouldSupportInterfaces(interfaces = []) {
  describe('ERC165\'s supportsInterface(bytes4)', function () {
    beforeEach(function () {
      this.thing = this.mock || this.token;
    });

    for (let k of interfaces) {
      const interfaceId = INTERFACE_IDS[k];
      describe(k, function () {
        it('should use less than 30k gas', async function () {
          const gasEstimate = await this.thing.supportsInterface.estimateGas(interfaceId);
          assert(gasEstimate <= 30000);
        });

        it('is supported', async function () {
          const isSupported = await this.thing.supportsInterface(interfaceId);
          assert(isSupported === true);
        });
      });
    }
  });
}

module.exports = {
  shouldSupportInterfaces,
};
