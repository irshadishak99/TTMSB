


<!-- PROJECT LOGO -->


  <h3 align="center">Trusted Transcript Management System Using Blockchain</h3>


Transcript Management System is a document management system that records student transcripts for the institution. In education, a transcript is a certified record of a student throughout study having entire enrollment history including all courses attempted, grades earned and degree. Counterfeit and forged transcripts can be a significant problem in the job market, causing difficulties for educational institutions, employers, and students. A Trusted Transcript Management System using Blockchain (TTMSB) is a system purpose for this problem by securely storing and verifying educational transcripts. TTMSB uses blockchain technology to create an immutable record of a student's academic achievements, improving the efficiency and security of transcript management. By using blockchain technology, TTMSB can increase traceability, improve performance and speed in the management process, and make it easier to spot and verify fake transcripts.

## Objective

- To propose a trusted and immutable transcript management system using blockchain
- To develop a trusted and immutable transcript management system using blockchain
- To test the functionality of the system in order to verify the original transcript

## Requirements

- Node.js and npm installed on your system
- Ganache or any other Ethereum network client
- MySQL 

## Installation

1. Clone this repository: 
``
``


2. Install the required packages:

``cd BlockChain-Based-Document-Verfication-With-IPFS
npm install``


3. Run the application using nodemon



## Usage

1. The owner of the system must first add an exporter to the list of authorized parties. This is done by clicking on the "Add Exporter" button and entering the exporter's Ethereum address.
2. Upload a document to the system by clicking on the "Upload Document" button and selecting a file from your computer. The document will be encrypted and stored in the IPFS network, and its hash will be recorded in the Blockchain.

3. Verify a document by clicking on the "Verify Document" button and entering its unique identifier (hash) in the input field. The system will retrieve the document from the IPFS network, decrypt it, and compare its hash with the one recorded in the Blockchain.

4. The system will display a message indicating whether the document is authentic or not.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments
- Metamask documentation
- Solidity and Web3.js documentation
- Truffle documentation




