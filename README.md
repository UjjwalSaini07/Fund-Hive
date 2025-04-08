# Fund-Hive

Fund-Hive is a Web3-powered crowdfunding platform built on the Solana blockchain. Leveraging the Anchor framework (Rust) for smart contract development and Next.js for its responsive interface, Fund-Hive offers a decentralized and transparent ecosystem for creators and communities to fund innovative ideas. By eliminating intermediaries and ensuring trustless transactions, Fund-Hive empowers users to bring their visions to life in the Web3 era. 🚀

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

## What is Web3 🌐??
Web3 represents the next evolution of the internet, transitioning from centralized control to decentralized ecosystems. Powered by blockchain technology, Web3 enables peer-to-peer interactions, ownership of digital assets, and transparent, trustless systems. It empowers users to control their data, participate in decentralized finance (DeFi), and interact with smart contracts, making the internet more open, secure, and user-driven.

### About Smart Contracts 📜
Smart contracts are self-executing agreements written in code that run on blockchain networks. They automatically enforce the terms and conditions set between parties without the need for intermediaries.
Key Features of Smart Contracts:
- **Decentralized Execution:** Operates on a blockchain, ensuring no single entity controls the process.
- **Transparency:** All terms and transactions are visible on the blockchain.
- **Automation:** Executes actions (like fund transfers) automatically when predefined conditions are met.
- **Security:** Immutable and tamper-proof, ensuring the integrity of agreements.

Smart contracts power a wide range of applications in decentralized finance (DeFi), supply chain management, digital identity, gaming, and crowdfunding platforms like Fund-Hive, enabling trustless and efficient systems.

## Demo 🖥️
You can visit the live site here: **(-Temporarily Disable-)**

## Technologies Used 👨🏻‍💻
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

## Architecture Diagram
![Fund-Hive_Architecture](https://github.com/user-attachments/assets/11275c04-d52a-45d4-8e08-6bdb4a9cfb11)

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
![image](https://github.com/user-attachments/assets/ddb266b2-8d0b-4f97-9da5-414e3a0ebf52)

</details>

- By default, WSL installs Ubuntu. You can open a Linux terminal by searching "Ubuntu" in the Search bar.
- The Ubuntu screen looks like this:

<details>	
 <summary><b>Image Reference</b></summary><br>
    
![image](https://github.com/user-attachments/assets/b8b4dd7b-4884-4d06-bdb9-9afcf3acc724)

</details>

- If you use VS Code, the WSL extension enables you to use WSL and VS Code together.
<details>	
 <summary><b>Image Reference</b></summary><br>
    
![image](https://github.com/user-attachments/assets/56d95d4f-bf7b-4d45-8c6e-168e5fc6c72e)
![image](https://github.com/user-attachments/assets/fe19d92f-526b-4cda-9808-31b27ca13e6b)

</details>

## Now Install Rust, Solana & Anchor CLI (WSL(Ubuntu) / Unix / Linux)
### Install Rust

Developers build Solana programs using the Rust programming language.
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
```
Run the following command to reload your PATH environment variable to include Cargo's bin directory:
```bash
. "$HOME/.cargo/env"
```
To verify the installation succeeded, check the Rust version:
```bash
rustc --version
```
You should see output like the following:
```shell
rustc 1.84.1 (e71f9a9a9 2025-01-27)
```

### Install Solana CLI
The Solana CLI provides all the tools required to build and deploy Solana programs.
```bash
sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"
```
For a first-time installation of the Solana CLI, you may see the following message prompting you to add a PATH environment variable
```bash
Close and reopen your terminal to apply the PATH changes or run the following in your existing shell:

export PATH="/Users/test/.local/share/solana/install/active_release/bin:$PATH"
```

Now Reopen the Terminal after Seting Up the Path variables

```bash
echo $SHELL
```
- If the output contains /bash, use .bashrc.
- If the output contains /zsh, use .zshrc.

Depending on your shell, run the appropriate command.
- For Bash (bashrc):
```bash
echo 'export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.bashrc
```
- For Zsh (zshrc):
```bash
echo 'export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.zshrc
```

Then run the following command to refresh the terminal session or restart your terminal.
```bash
source ~/.bashrc # If using Bash
```
```bash
source ~/.zshrc # If using Zsh
```

To verify that the installation succeeded, check the Solana CLI version:
```bash
solana --version
```
You should see output like the following:
```shell
solana-cli 2.0.26 (src:3dccb3e7; feat:607245837, client:Agave)
```

Later update the Solana CLI to the latest version
```bash
agave-install update
```

### Install Anchor CLI
Anchor is a framework for developing Solana programs. The Anchor framework leverages Rust macros to simplify the process of writing Solana programs.
The Anchor version manager (AVM) allows you to install and manage different Anchor versions on your system and easily update Anchor versions in the future.
- Install AVM with the following command:
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --force
```
- Confirm that AVM installed successfully:
```bash
avm --version
```
- Install the latest version of Anchor CLI using AVM:
```bash
avm install latest
```
```bash
avm use latest
```
- You can install a specific version of Anchor CLI by specifying the version number:
```bash
avm install 0.30.1
avm use 0.30.1
```

To verify that the installation succeeded, check the Anchor CLI version:
```bash
anchor --version
```
You should see output like the following:
```shell
anchor-cli 0.30.1
```

> [!Warning]  
> When installing the Anchor CLI on Linux or WSL, you may encounter this error:
> 
> error: could not exec the linker cc = note: Permission denied (os error 13)

If you see this error message:

- Install the dependencies listed in the Linux section (WSL Properly).
- Retry installing the Anchor CLI.

### Installing Node.js and Yarn on Linux Setup
Install nvm using the following command:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
```
Restart your terminal and confirm that the nvm command runs successfully:
```bash
command -v nvm
```
Next, use nvm to install node:
```bash
nvm install node
```
To verify that the installation succeeded, check the Node version:
```bash
node --version
```
You should see output like the following: v23.7.0

> [!Warning]  
> The error indicates that the npm install command is encountering a permission issue

1.  Check Permissions of the node_modules Directory
- Run the following to check the ownership of the node_modules directory:
```bash
ls -ld node_modules
```
- If the directory is owned by another user or has restricted permissions, update the ownership to your user:
```bash
sudo chown -R $(whoami) node_modules
```

2. Clear node_modules and Reinstall
- Sometimes, issues occur due to incomplete or corrupted installations. Remove the node_modules directory and reinstall dependencies:
```bash
rm -rf node_modules
pnpm install
```
3. Avoid Using sudo with npm
- Using sudo with npm/pnpm can cause permission problems. Ensure that your npm/pnpm and Node.js setup doesn’t require elevated privileges.
- Reset the pnpm permissions:
```bash
sudo chown -R $(whoami) ~/.npm
```
4. Try Installing in a Clean Environment
- If the problem persists, try removing both the node_modules folder and the package-lock.json file, then reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```
> Installation of pnpm over npm
- Install pnpm
```bash
npm install -g pnpm
```
- Verify the installation:
```bash
pnpm --version
```
- Migrate Dependencies

Option A: Use pnpm import
- pnpm has a built-in command to migrate your existing package-lock.json or npm-shrinkwrap.json:
```bash
pnpm import
```
This command converts the lock file into pnpm-lock.yaml while keeping the dependencies consistent.

Option B: Remove node_modules and Reinstall
- Delete the existing node_modules directory and package-lock.json:
```bash
rm -rf node_modules package-lock.json
```
- Install dependencies using pnpm:
```bash
pnpm install
```
This will create a pnpm-lock.yaml and organize dependencies in a more efficient structure.

## Solana CLI Basics (Wallet Connect)
### Solana Config
```bash
solana config get
```
You should see output like the following:
![image](https://github.com/user-attachments/assets/4e08ea79-a099-43b9-b957-62d6f53cf8d7)

The RPC URL and Websocket URL specify the Solana cluster the CLI makes requests to.
```bash
solana config set --url mainnet-beta
```
```bash
solana config set --url devnet
```
```bash
solana config set --url localhost
```
```bash
solana config set --url testnet
```
The Keypair Path points to the default Solana wallet (keypair) used by the Solana CLI to pay transaction fees and deploy programs. By default, this file is stored at ~/.config/solana/id.json

### Create Wallet
- To send transactions using the Solana CLI, you need a Solana wallet funded with SOL.
```bash
solana-keygen new
```
- You should see output like the following:
```bash
Generating a new keypair

For added security, enter a BIP39 passphrase

NOTE! This passphrase improves security of the recovery seed phrase NOT the
keypair file itself, which is stored as insecure plain text

BIP39 Passphrase (empty for none):

Wrote new keypair to /Users/test/.config/solana/id.json
===========================================================================
pubkey: 8dBTPrjnkXyuQK3KDt9wrZBfizEZijmmUQXVHpFbVwGT
===========================================================================
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
cream bleak tortoise ocean nasty game gift forget fancy salon mimic amazing
===========================================================================
```
- To view your wallet's address (public key), run:
```bash
solana address
```

### Airdrop SOL
Request an airdrop of SOL to your wallet to pay for transactions and program deployments.
- Set your cluster to the devnet:
```bash
solana config set -ud
```
- Then request an airdrop of devnet SOL:
```bash
solana airdrop 2
```
- To check your wallet's SOL balance, run the following command:
```bash
solana balance
```

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

## Feedback 💬
If you have any feedback, please reach out to us at:
- Provide your feedback on this [Mail](ujjwalsaini0007+FundHive@gmail.com)
- Raising the [Issues](https://github.com/UjjwalSaini07/Fund-Hive/issues)

<div align="center">
    <a href="#top">
        <img src="https://img.shields.io/badge/Back%20to%20Top-000000?style=for-the-badge&logo=github&logoColor=white" alt="Back to Top">
    </a>
</div>
