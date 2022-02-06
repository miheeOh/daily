// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

/**
 * @dev Required interface of an ERC721 compliant contract.
 */
 interface IERC721 is IERC165 {
     /**
      * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
      */
      event Transfer(
          address indexed from,
          address indexed to,
          uint256 indexed tokenId
      );
 }
