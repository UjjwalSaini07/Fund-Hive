# Fund-Hive

Fund-Hive is an innovative Web3 crowdfunding platform that empowers creators, entrepreneurs, and communities to bring their ideas to life. Built on the Solana blockchain, Fund-Hive leverages cutting-edge Web3 technologies to provide a decentralized, transparent, and efficient funding ecosystem.

<table align="left">
    <thead align="left">
        <tr border: 1px;>
            <td><b>🌟 Stars</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>📏 Repo Size</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Close PRs</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/UjjwalSaini07/Fund-Hive?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/UjjwalSaini07/Fund-Hive?style=flat&logo=github"/></td>
            <td><img alt="Repo Size" src="https://img.shields.io/github/repo-size/UjjwalSaini07/Fund-Hive?style=flat&logo=github"/></td>
            <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/UjjwalSaini07/Fund-Hive?style=flat&logo=github"/></td>
           <td><img alt="Close Pull Requests" src="https://img.shields.io/github/issues-pr-closed/UjjwalSaini07/Fund-Hive?style=flat&color=critical&logo=github"/></td>
        </tr>
    </tbody>
</table>
<br/>
<br/>
<br/>

## Key Features 🎯
- **Blockchain-Powered Crowdfunding:** Using Solana's high-speed and low-cost infrastructure, Fund-Hive ensures secure and transparent transactions.
- **Solana Anchor:** Smart contracts are written in Rust using the Anchor framework, ensuring robust and scalable decentralized applications.
- **Next.js Integration:** The platform’s user-friendly and responsive front end is built with Next.js, offering a seamless user experience.
- **Decentralized & Trustless:** No intermediaries—funds are managed by smart contracts, ensuring complete trust and transparency between funders and creators.

## Demo 🖥️
You can visit the live site here: **(-Temporarily Disable-)**

## Technologies Used
- Next.js: React framework for building fast and scalable web applications.
- Tailwind CSS: Utility-first CSS framework for styling components efficiently.
- Node.js: JavaScript runtime for backend development.
- Express: Lightweight web application framework for Node.js.
- Rust: Systems programming language used for secure and high-performance development.
- Anchor: Framework for writing Solana smart contracts in Rust.
- Solana: High-speed blockchain for decentralized applications.

## Getting Started ⚙️
### Prerequisites

- Node v22.14.0 or higher
- Rust v1.85.1 or higher
- Anchor CLI 0.31.1 or higher
- avm (Anchor Version Manager) 0.31.1 or higher
- Solana CLI 2.1.17 or higher

![image](https://github.com/user-attachments/assets/f1eb5aea-ae41-4a04-9cf8-0d01f3487e78)

- [Full Setup of Prerequisites](#Prerequisites-Setup)

## Installation 🛠️
- First Read this [License](https://github.com/UjjwalSaini07/Fund-Hive/blob/main/LICENSE) & their terms then proceed.
- Star the [Repository](https://github.com/UjjwalSaini07/Fund-Hive)
- Project Setup:
1. Clone the repository:
```bash
git clone https://github.com/UjjwalSaini07/Fund-Hive.git
```
2. Navigate to the project directory:
```bash
cd Fund-Hive
```
3. Install Dependencies (Use Any One Accordingly):
```bash
pnpm install
```
```bash
npm install
```

> [!IMPORTANT]  
> You need to use either npm or pnpm based on your preference. All commands will work with both; choose accordingly to match your setup.

#### Start the web app
```bash
pnpm dev
```

## Setup Apps 🌍

### **Anchor**

This is a Solana smart contract developed in Rust using the Anchor framework.

#### Commands

You can use standard Anchor commands. Either navigate to the `anchor` directory (`cd anchor`) and run the `anchor command` directly, or prefix the command with `pnpm`, e.g., `pnpm anchor`.

#### Sync the program id:

Running this command will generate a new keypair in the `anchor/target/deploy` directory, update the address in the Anchor configuration file, and modify the `declare_id!` macro in the program's `./src/lib.rs` file.

<details>	
 <summary><b>Directory Reference</b></summary><br>
 
 ![image](https://github.com/user-attachments/assets/518e725c-346c-4e40-a6ac-29329d251c85)

</details>

You will manually need to update the constant in `anchor/lib/basic-exports.ts` to match the new program id.

```bash
pnpm anchor keys sync
```

#### Build the program:

```shell
pnpm anchor-build
```

#### Start the test validator with the program deployed:

```shell
pnpm anchor-localnet
```

#### Run the tests

```shell
pnpm anchor-test
```

#### Deploy to Devnet

```shell
pnpm anchor deploy --provider.cluster devnet
```

## Web Configurations ✨

This is a Next.js application that utilizes the Anchor-generated client to interact seamlessly with the Solana smart contract.

#### Commands

Start the Web app

```shell
pnpm run dev
```

Build the Static Collection of Web app

```shell
pnpm build
```

## Prerequisites-Setup

### Mac and Linux
#### On Mac and Linux, run this single command to install all dependencies.
```bash
curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash
```
##### After installation, you should see output like the following:
```bash
Installed Versions:
Rust: rustc 1.85.0 (4d91de4e4 2025-02-17)
Solana CLI: solana-cli 2.1.14 (src:3ad46824; feat:3271415109, client:Agave)
Anchor CLI: anchor-cli 0.30.1
Node.js: v23.8.0
Yarn: 1.22.1
```

The Anchor CLI installation requires the following dependencies.
```bash
sudo apt-get update
```
```bash
sudo apt-get install -y \
build-essential \
pkg-config \
libudev-dev llvm libclang-dev \
protobuf-compiler libssl-dev
```
### Windows
#### However, there is a different process to install this on Windows. Take a look below:
To develop Solana programs on Windows you must use WSL (Windows subsystem for Linux). Install all other dependencies through the Linux terminal.
```bash
wsl --install
```
<details>	
 <summary><b>Image Reference</b></summary><br>
    
![image](https://github.com/user-attachments/assets/4ebf1581-a190-4439-b720-f4e4ccb21a58)
![image](https://github.com/user-attachments/assets/40538f2a-9615-4324-8ccd-6596a18c487c)

</details>
- By default, WSL installs Ubuntu. You can open a Linux terminal by searching "Ubuntu" in the Search bar.
- The Ubuntu screen looks like this:

<details>	
 <summary><b>Image Reference</b></summary><br>
    
![image](https://github.com/user-attachments/assets/b8b4dd7b-4884-4d06-bdb9-9afcf3acc724)

</details>

## Resources 📚
- [Nodejs Docs](https://nodejs.org/en)
- [Tailwind Docs](https://tailwindcss.com/docs/installation/using-vite)
- [Nextjs Docs](https://nextjs.org/docs)
- [Anchor Docs](https://www.anchor-lang.com/docs/installation)
- [Solana Docs](https://solana.com/docs/intro/installation)
- [Rust Docs](https://doc.rust-lang.org/stable/)
- [Blockchain API Docs](https://exchange.blockchain.com/api/#introduction)

## Author ✍️
- [@Ujjwal Saini](https://github.com/UjjwalSaini07)
- [@Vansh Anand](https://github.com/vanshanand34)
- [@Sambhav Mishra](https://github.com/SambhavMishra17)

## Feedback 💬
If you have any feedback, please reach out to us at:
- Provide your feedback on this [Mail](ujjwalsaini0007+FundHive@gmail.com)
- Raising the [Issues](https://github.com/UjjwalSaini07/Fund-Hive/issues)

<div align="center">
    <a href="#top">
        <img src="https://img.shields.io/badge/Back%20to%20Top-000000?style=for-the-badge&logo=github&logoColor=white" alt="Back to Top">
    </a>
</div>
