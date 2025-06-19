import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './App.css';

// Blog articles data (expanded to 10 articles)
const blogArticles = [
  {
    id: 1,
    title: "How to Protect Your Crypto in 2025",
    date: "March 15, 2025",
    excerpt: "Essential security practices every crypto holder should know to safeguard their digital assets from evolving threats in the Web3 ecosystem.",
    image: "https://images.pexels.com/photos/6763964/pexels-photo-6763964.jpeg",
    content: `
      <h2>Essential Crypto Security Practices for 2025</h2>
      
      <p>As the cryptocurrency landscape continues to evolve, so do the threats facing digital asset holders. In 2025, protecting your crypto requires a multi-layered approach that combines traditional security practices with cutting-edge protection strategies.</p>
      
      <h3>1. Hardware Wallets: Your First Line of Defense</h3>
      <p>Hardware wallets remain the gold standard for crypto storage. Devices like Ledger Nano X and Trezor Model T provide offline storage that keeps your private keys away from internet-connected devices. In 2025, look for wallets with biometric authentication and air-gapped transaction signing.</p>
      
      <h3>2. Multi-Factor Authentication (MFA)</h3>
      <p>Never rely on SMS-based 2FA. Use authenticator apps like Google Authenticator or hardware-based solutions like YubiKey. For added security, consider using multiple authentication methods on critical accounts.</p>
      
      <h3>3. Smart Contract Auditing</h3>
      <p>Before interacting with any DeFi protocol or smart contract, check if it has been audited by reputable firms. Use tools like DeFiSafety and CertiK to verify the security ratings of protocols you plan to use.</p>
      
      <h3>4. Insurance Coverage</h3>
      <p>Crypto insurance is no longer optional in 2025. Platforms like BitSafe offer comprehensive coverage for individual users, protecting against hacks, scams, and smart contract failures. Consider it an essential part of your crypto security stack.</p>
      
      <h3>5. Regular Security Audits</h3>
      <p>Conduct quarterly reviews of your security setup. Update passwords, review connected applications, and ensure your backup phrases are secure and accessible only to you.</p>
      
      <p><strong>Remember:</strong> The cost of security measures is always less than the cost of losing your crypto assets. Stay vigilant, stay protected.</p>
    `
  },
  {
    id: 2,
    title: "Case Study: $30k Phishing Hack Recovered with BitSafe",
    date: "March 12, 2025",
    excerpt: "Real story of how our AI-powered claims system helped a user recover from a sophisticated phishing attack within 48 hours.",
    image: "https://images.pexels.com/photos/2022650/pexels-photo-2022650.jpeg",
    content: `
      <h2>How BitSafe Recovered $30,000 from a Sophisticated Phishing Attack</h2>
      
      <p>This case study demonstrates the power of decentralized insurance and smart contract automation in protecting individual crypto users.</p>
      
      <h3>The Incident</h3>
      <p>On March 8, 2025, Alex (name changed for privacy), a DeFi trader from Berlin, received what appeared to be a legitimate email from his favorite DEX platform announcing a "limited-time governance token airdrop." The email looked identical to official communications, complete with proper branding and links.</p>
      
      <p>The phishing site prompted Alex to connect his MetaMask wallet and sign a transaction to "claim" his tokens. What he actually signed was a malicious contract that drained $30,000 worth of ETH and USDC from his wallet within minutes.</p>
      
      <h3>The BitSafe Response</h3>
      <p><strong>Hour 1:</strong> Alex noticed the unauthorized transactions and immediately submitted a claim through the BitSafe portal, providing his wallet address and transaction hashes.</p>
      
      <p><strong>Hour 6:</strong> BitSafe's AI system automatically verified the phishing attack using Chainlink oracles that cross-referenced the malicious contract address with known phishing databases.</p>
      
      <p><strong>Hour 24:</strong> Our AI governance system automatically approved the claim. With clear evidence of a phishing attack and Alex's Pro Plan coverage, the smart contract triggered instantly.</p>
      
      <p><strong>Hour 48:</strong> Smart contracts automatically transferred $30,000 USDC to Alex's designated recovery wallet.</p>
      
      <h3>Key Factors in Successful Recovery</h3>
      <ul>
        <li><strong>Immediate Reporting:</strong> Alex submitted his claim within hours of the attack</li>
        <li><strong>Proper Coverage:</strong> His Pro Plan included phishing protection</li>
        <li><strong>Clear Evidence:</strong> Transaction hashes and contract addresses provided undeniable proof</li>
        <li><strong>AI Efficiency:</strong> Automated review process ensured fair and fast resolution</li>
      </ul>
      
      <h3>Lessons Learned</h3>
      <p>This case highlights the importance of:</p>
      <ul>
        <li>Having comprehensive crypto insurance in place before you need it</li>
        <li>Acting quickly when security incidents occur</li>
        <li>The power of blockchain transparency in insurance claims</li>
      </ul>
      
      <p><em>"BitSafe didn't just recover my funds – they restored my faith in the crypto ecosystem. The AI automation ensured I was treated fairly, and the smart contract automation made the payout instant once approved."</em> - Alex, BitSafe user</p>
    `
  },
  {
    id: 3,
    title: "Understanding AI-Powered Insurance Claims",
    date: "March 10, 2025",
    excerpt: "Deep dive into how artificial intelligence is revolutionizing insurance claims processing through automation and smart contract integration.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxjcnlwdG8lMjBzZWN1cml0eXxlbnwwfHx8fDE3NDgyNjc0MzV8MA&ixlib=rb-4.1.0&q=85",
    content: `
      <h2>The Revolution of AI-Powered Insurance Claims</h2>
      
      <p>Artificial Intelligence and smart contracts are transforming how insurance claims are processed, bringing unprecedented speed, accuracy, and efficiency to an industry traditionally plagued by slow manual processes and bureaucratic delays.</p>
      
      <h3>Traditional Insurance vs. AI Insurance</h3>
      
      <h4>Traditional Insurance Problems:</h4>
      <ul>
        <li>Opaque decision-making processes</li>
        <li>Lengthy claim processing times (weeks to months)</li>
        <li>Subjective claim rejections</li>
        <li>Limited user recourse for disputes</li>
        <li>High operational costs passed to customers</li>
      </ul>
      
      <h4>AI Insurance Advantages:</h4>
      <ul>
        <li>Instant, automated claim processing</li>
        <li>24/7 fraud detection and prevention</li>
        <li>Transparent smart contract execution</li>
        <li>Immutable blockchain audit trails</li>
        <li>Predictive risk assessment</li>
      </ul>
      
      <h3>How BitSafe's AI Claims Process Works</h3>
      
      <h4>1. Claim Submission</h4>
      <p>Users submit claims through the BitSafe portal or AI chatbot, providing:</p>
      <ul>
        <li>Wallet addresses and transaction hashes</li>
        <li>Description of the incident</li>
        <li>Supporting evidence (screenshots, emails, etc.)</li>
      </ul>
      
      <h4>2. Automated Verification</h4>
      <p>Smart contracts and Chainlink oracles automatically verify:</p>
      <ul>
        <li>Policy validity and coverage limits</li>
        <li>Transaction authenticity</li>
        <li>Known attack signatures</li>
        <li>Wallet activity patterns</li>
      </ul>
      
      <h4>3. AI Analysis & Approval</h4>
      <p>For claims requiring verification:</p>
      <ul>
        <li>AI analyzes blockchain data and patterns</li>
        <li>Machine learning models detect fraud indicators</li>
        <li>Instant approval for verified legitimate claims</li>
        <li>All decisions recorded on-chain for transparency</li>
      </ul>
      
      <h4>4. Automated Payout</h4>
      <p>Upon approval:</p>
      <ul>
        <li>Smart contracts automatically transfer funds</li>
        <li>No manual intervention required</li>
        <li>Instant settlement to user's wallet</li>
      </ul>
      
      <h3>The Role of AI Technology</h3>
      <p>BitSafe's AI system creates value through automation:</p>
      <ul>
        <li><strong>Real-time Monitoring:</strong> Continuous blockchain analysis and risk assessment</li>
        <li><strong>Pattern Recognition:</strong> Machine learning models identify fraud patterns</li>
        <li><strong>Instant Processing:</strong> Automated claim validation and payout execution</li>
        <li><strong>Cost Efficiency:</strong> Lower operational costs enable competitive premiums</li>
      </ul>
      
      <h3>Real-World Impact</h3>
      <p>Since launching in Q1 2025, BitSafe's AI has processed 347 claims with:</p>
      <ul>
        <li><strong>Average processing time:</strong> 18 minutes</li>
        <li><strong>Approval rate:</strong> 96% for valid claims</li>
        <li><strong>User satisfaction:</strong> 4.9/5 rating</li>
        <li><strong>Total payouts:</strong> €2.3M recovered for users</li>
      </ul>
      
      <h3>The Future of Insurance</h3>
      <p>AI-powered insurance represents a paradigm shift toward:</p>
      <ul>
        <li>Fully automated insurance protocols</li>
        <li>Predictive risk management</li>
        <li>Real-time policy adjustments</li>
        <li>AI-enhanced fraud prevention</li>
      </ul>
      
      <p>As the crypto ecosystem matures, AI insurance will become the standard for protecting digital assets, offering the speed and accuracy that traditional insurance has failed to deliver.</p>
    `
  },
  {
    id: 4,
    title: "DeFi Insurance: Protecting Your Yield Farming Investments",
    date: "March 8, 2025",
    excerpt: "Navigate the risks of DeFi protocols and learn how to protect your yield farming investments with smart insurance strategies.",
    image: "https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg",
    content: `
      <h2>DeFi Insurance: Protecting Your Yield Farming Investments</h2>
      
      <p>Yield farming offers attractive returns, but it comes with significant risks. Smart contract bugs, rug pulls, and impermanent loss can wipe out gains overnight. Here's how to protect your DeFi investments.</p>
      
      <h3>Common DeFi Risks</h3>
      <ul>
        <li><strong>Smart Contract Risk:</strong> Code vulnerabilities and exploits</li>
        <li><strong>Impermanent Loss:</strong> Price divergence in liquidity pools</li>
        <li><strong>Rug Pulls:</strong> Malicious project abandonment</li>
        <li><strong>Oracle Manipulation:</strong> Price feed attacks</li>
        <li><strong>Governance Attacks:</strong> Hostile takeovers of protocols</li>
      </ul>
      
      <h3>Insurance Strategies</h3>
      <p>BitSafe's DeFi coverage includes protection against smart contract failures, covering major protocols like Uniswap, Aave, and Compound. Our coverage extends to both capital loss and lost yield opportunities.</p>
    `
  },
  {
    id: 5,
    title: "The Rise of Crypto Scams: How to Stay Protected",
    date: "March 5, 2025",
    excerpt: "Cybercriminals are becoming increasingly sophisticated. Learn to identify and avoid the latest crypto scams targeting individual investors.",
    image: "https://images.pexels.com/photos/5940844/pexels-photo-5940844.jpeg",
    content: `
      <h2>The Rise of Crypto Scams: How to Stay Protected</h2>
      
      <p>As crypto adoption grows, so does the creativity of scammers. In 2024, crypto scams cost investors over $5.6 billion. Here's how to protect yourself from the most common threats.</p>
      
      <h3>Top 2025 Crypto Scams</h3>
      <ol>
        <li><strong>Fake Airdrops:</strong> Malicious token distributions requiring wallet connections</li>
        <li><strong>Romance Scams:</strong> Long-term relationship building leading to investment fraud</li>
        <li><strong>Fake DEX Platforms:</strong> Copycat exchanges stealing funds</li>
        <li><strong>NFT Phishing:</strong> Malicious NFT mints draining wallets</li>
        <li><strong>Telegram Bots:</strong> Automated scams in crypto communities</li>
      </ol>
      
      <h3>Protection Strategies</h3>
      <p>BitSafe's scam protection covers losses from verified phishing attempts, fake platforms, and social engineering attacks. Our AI monitoring system flags suspicious transactions in real-time.</p>
    `
  },
  {
    id: 6,
    title: "Multi-Chain Security: Protecting Assets Across Networks",
    date: "March 2, 2025",
    excerpt: "With assets spread across Ethereum, Polygon, BSC, and more, multi-chain security has never been more critical for crypto investors.",
    image: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg",
    content: `
      <h2>Multi-Chain Security: Protecting Assets Across Networks</h2>
      
      <p>The multi-chain ecosystem offers opportunities but multiplies risks. Each network has unique security considerations and attack vectors. Here's how to navigate this complex landscape safely.</p>
      
      <h3>Cross-Chain Risks</h3>
      <ul>
        <li><strong>Bridge Vulnerabilities:</strong> Cross-chain bridge exploits</li>
        <li><strong>Network-Specific Attacks:</strong> Different consensus mechanisms</li>
        <li><strong>Token Standard Differences:</strong> ERC-20 vs BEP-20 confusion</li>
        <li><strong>Gas Fee Manipulation:</strong> Front-running on different chains</li>
      </ul>
      
      <h3>BitSafe Multi-Chain Coverage</h3>
      <p>Our insurance extends across 15+ blockchain networks, providing seamless protection whether you're trading on Ethereum, farming on Polygon, or exploring opportunities on emerging chains.</p>
    `
  },
  {
    id: 7,
    title: "Hardware Wallet Security: Beyond the Basics",
    date: "February 28, 2025",
    excerpt: "Hardware wallets aren't foolproof. Learn advanced security techniques to maximize the protection of your cold storage setup.",
    image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg",
    content: `
      <h2>Hardware Wallet Security: Beyond the Basics</h2>
      
      <p>Hardware wallets provide excellent security, but user error and advanced attacks can still compromise your funds. Master these advanced techniques to bulletproof your cold storage.</p>
      
      <h3>Advanced Security Measures</h3>
      <ul>
        <li><strong>Multi-Signature Setup:</strong> Require multiple hardware devices for transactions</li>
        <li><strong>Passphrases:</strong> Add a 25th word to your seed phrase</li>
        <li><strong>Decoy Wallets:</strong> Create multiple wallets with small amounts</li>
        <li><strong>Air-Gapped Verification:</strong> Verify transactions offline</li>
      </ul>
      
      <h3>Common Mistakes</h3>
      <p>Even hardware wallet users can lose funds through phishing attacks, malicious DApps, or compromised computers. BitSafe's hardware wallet coverage protects against user error and sophisticated attacks targeting cold storage users.</p>
    `
  },
  {
    id: 8,
    title: "NFT Security: Protecting Your Digital Collectibles",
    date: "February 25, 2025",
    excerpt: "NFTs represent significant value but come with unique security challenges. Learn how to protect your digital art and collectibles.",
    image: "https://images.pexels.com/photos/8369747/pexels-photo-8369747.jpeg",
    content: `
      <h2>NFT Security: Protecting Your Digital Collectibles</h2>
      
      <p>NFTs have created new wealth but also new attack vectors. From malicious mints to marketplace exploits, NFT holders face unique security challenges requiring specialized protection strategies.</p>
      
      <h3>NFT-Specific Threats</h3>
      <ul>
        <li><strong>Malicious Mints:</strong> NFTs that drain wallets upon interaction</li>
        <li><strong>Marketplace Exploits:</strong> OpenSea and other platform vulnerabilities</li>
        <li><strong>Fake Collections:</strong> Copycat projects mimicking popular NFTs</li>
        <li><strong>Approval Scams:</strong> Unlimited token approvals through NFT interactions</li>
      </ul>
      
      <h3>Protection Strategies</h3>
      <p>BitSafe offers specialized NFT insurance covering theft, loss through marketplace exploits, and damages from malicious smart contracts. Our coverage includes both the NFT asset value and any associated utility tokens.</p>
    `
  },
  {
    id: 9,
    title: "Institutional vs Retail Crypto Security",
    date: "February 22, 2025",
    excerpt: "Why individual crypto investors need different security strategies than institutions, and how to implement enterprise-grade protection.",
    image: "https://images.pexels.com/photos/7887865/pexels-photo-7887865.jpeg",
    content: `
      <h2>Institutional vs Retail Crypto Security</h2>
      
      <p>Institutional crypto security focuses on compliance and custody, while retail investors need practical, user-friendly solutions. Here's how to achieve institutional-grade security as an individual investor.</p>
      
      <h3>Key Differences</h3>
      <table>
        <tr><th>Aspect</th><th>Institutional</th><th>Retail</th></tr>
        <tr><td>Custody</td><td>Third-party custodians</td><td>Self-custody</td></tr>
        <tr><td>Compliance</td><td>Regulatory oversight</td><td>Personal responsibility</td></tr>
        <tr><td>Insurance</td><td>Lloyd's of London policies</td><td>Limited options</td></tr>
        <tr><td>Support</td><td>24/7 dedicated teams</td><td>Community forums</td></tr>
      </table>
      
      <h3>Bridging the Gap</h3>
      <p>BitSafe democratizes institutional-grade protection for individual investors, offering the same level of coverage and support traditionally available only to large institutions.</p>
    `
  },
  {
    id: 10,
    title: "Crypto Insurance Tax Implications",
    date: "February 19, 2025",
    excerpt: "Understanding the tax implications of crypto insurance premiums and payouts in different jurisdictions around the world.",
    image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg",
    content: `
      <h2>Crypto Insurance Tax Implications</h2>
      
      <p>Crypto insurance premiums and payouts have complex tax implications that vary by jurisdiction. Understanding these rules is crucial for proper financial planning and compliance.</p>
      
      <h3>Tax Considerations by Region</h3>
      
      <h4>United States</h4>
      <ul>
        <li><strong>Premiums:</strong> Generally not deductible for personal crypto holdings</li>
        <li><strong>Payouts:</strong> May be taxable as ordinary income</li>
        <li><strong>Business Use:</strong> Different rules apply for trading businesses</li>
      </ul>
      
      <h4>European Union</h4>
      <ul>
        <li><strong>VAT:</strong> Insurance services generally exempt</li>
        <li><strong>Income Tax:</strong> Varies by member state</li>
        <li><strong>Capital Gains:</strong> Replacement property rules may apply</li>
      </ul>
      
      <h4>United Kingdom</h4>
      <ul>
        <li><strong>Insurance Premium Tax:</strong> May apply to certain policies</li>
        <li><strong>Capital Gains Relief:</strong> Available for asset replacement</li>
      </ul>
      
      <h3>Record Keeping</h3>
      <p>Maintain detailed records of premiums paid, policy terms, and any claims. BitSafe provides comprehensive tax documentation to simplify compliance across all major jurisdictions.</p>
      
      <h3>Professional Advice</h3>
      <p>Given the complexity and evolving nature of crypto taxation, always consult with qualified tax professionals familiar with digital assets in your jurisdiction.</p>
    `
  }
];

// Individual Article Component
const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = blogArticles.find(a => a.id === parseInt(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-blue-900/80 backdrop-blur-sm border-b border-blue-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"/>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>BitSafe</span>
                <div className="text-xs text-blue-300 -mt-1">Crypto Insurance</div>
              </div>
            <div className="hidden md:flex space-x-3">
                <a 
                  href="https://x.com/bitsafecover" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  title="Follow us on X/Twitter"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/bitsafecover" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-colors"
                  title="Follow us on Instagram"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/bitsafecover/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                  title="Connect with us on LinkedIn"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61576611313372" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  title="Like us on Facebook"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 fade-in">
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-blue-800">
          <div className="text-blue-400 text-sm mb-4">{article.date}</div>
          <h1 className="text-4xl font-bold text-white mb-6">{article.title}</h1>
          <img 
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl mb-8"
          />
          <div 
            className="prose prose-invert prose-blue max-w-none text-blue-100"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <div className="mt-12 pt-8 border-t border-blue-800">
            <button 
              onClick={() => navigate('/blog')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors mr-4"
            >
              ← Back to Blog
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Home
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

// Blog List Component
const BlogList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-blue-900/80 backdrop-blur-sm border-b border-blue-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"/>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>BitSafe</span>
                <div className="text-xs text-blue-300 -mt-1">Crypto Insurance</div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Blog List */}
      <section className="py-20 fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white text-center mb-8">BitSafe Blog</h1>
          <p className="text-xl text-blue-200 text-center mb-16 max-w-3xl mx-auto">
            Stay updated with the latest insights on crypto security, insurance trends, and blockchain technology.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article, index) => (
              <article key={article.id} className={`bg-slate-800/50 rounded-xl overflow-hidden border border-blue-800 hover:border-blue-600 transition-all duration-300 hover:transform hover:scale-105 card-hover`} style={{animationDelay: `${index * 0.1}s`}}>
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-blue-400 text-sm mb-2">{article.date}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                  <p className="text-blue-200 mb-4">{article.excerpt}</p>
                  <button 
                    onClick={() => navigate(`/article/${article.id}`)}
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Main Content Component (Homepage)
const MainContent = () => {
  const navigate = useNavigate();
  const [calculatorData, setCalculatorData] = useState({
    walletValue: '',
    walletType: '',
    coverageType: '',
    securityMeasures: '',
    duration: ''
  });

  const [quote, setQuote] = useState(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    walletAddress: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Updated premium calculation logic
  const calculatePremium = () => {
    if (!calculatorData.walletValue || !calculatorData.walletType || !calculatorData.coverageType || !calculatorData.securityMeasures || !calculatorData.duration) {
      alert('Please fill in all required fields');
      return;
    }

    const baseValue = parseFloat(calculatorData.walletValue) || 0;
    
    // Base risk multipliers
    const walletRiskMultiplier = {
      'hardware': 0.5,
      'software': 1.0,
      'exchange': 1.8
    };

    const coverageMultiplier = {
      'scam': 0.8,
      'hacking': 1.0,
      'smart-contract': 1.2,
      'full': 1.5
    };

    const securityMultiplier = {
      '2fa-cold': 0.6,
      '2fa-only': 0.8,
      'cold-only': 0.7,
      'no-security': 1.5
    };

    const durationMultiplier = {
      '1month': 1.0,
      '3months': 2.8,
      '6months': 5.4,
      '1year': 10.0
    };

    // Calculate base premium (1.5-4% annually based on risk)
    const basePremiumRate = 0.025; // 2.5% base rate
    const riskMultiplier = walletRiskMultiplier[calculatorData.walletType] * 
                          coverageMultiplier[calculatorData.coverageType] * 
                          securityMultiplier[calculatorData.securityMeasures];
    
    const annualPremium = baseValue * basePremiumRate * riskMultiplier;
    const actualPremium = annualPremium * durationMultiplier[calculatorData.duration] / 12;

    // Determine risk level
    let riskLevel = 'Low';
    if (riskMultiplier > 1.5) riskLevel = 'High';
    else if (riskMultiplier > 1.0) riskLevel = 'Medium';

    setQuote({
      premium: actualPremium,
      riskLevel: riskLevel,
      duration: calculatorData.duration,
      coverageAmount: baseValue
    });
  };

  // Handle contact form submission with your EmailJS credentials
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Initialize EmailJS with your credentials
      const result = await emailjs.send(
        'service_hqgn6yn', // Your service ID
        'template_69xd4sd', // Your template ID
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          wallet_address: contactForm.walletAddress || 'Not provided',
          message: contactForm.message,
          to_email: 'hello@bitsafe.ltd'
        },
        'EOqkhvyILTgDLTbMN' // Your public key
      );

      setSubmitMessage('✅ Message sent successfully! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', walletAddress: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitMessage('❌ Sorry, there was an error sending your message. Please try again or email us directly at hello@bitsafe.ltd');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-blue-900/80 backdrop-blur-sm border-b border-blue-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              {/* Updated BitSafe Logo */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"/>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">BitSafe</span>
                <div className="text-xs text-blue-300 -mt-1">Crypto Insurance</div>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-blue-200 hover:text-white transition-colors">Home</a>
              <a href="#how-it-works" className="text-blue-200 hover:text-white transition-colors">How It Works</a>
              <a href="#calculator" className="text-blue-200 hover:text-white transition-colors">Calculator</a>
              <a href="#plans" className="text-blue-200 hover:text-white transition-colors">Plans</a>
              <a href="#claims" className="text-blue-200 hover:text-white transition-colors">Claims</a>
              <a href="#blog" className="text-blue-200 hover:text-white transition-colors">Blog</a>
              <a href="/about" className="text-blue-200 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-blue-200 hover:text-white transition-colors">Contact</a>
            </div>
            <button 
              onClick={() => {
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get Insured Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1639762681057-408e52192e55?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxjcnlwdG8lMjBzZWN1cml0eXxlbnwwfHx8fDE3NDgyNjc0MzV8MA&ixlib=rb-4.1.0&q=85"
            alt="Crypto Security"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-slate-900/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 slide-up">
            Germany's First <span className="text-blue-400">AI-Powered</span>
            <br />Crypto Insurance
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto slide-up" style={{animationDelay: '0.2s'}}>
            Instant policies. AI-monitored risks. Smart contract payouts. Protection against hacks, scams, and lost keys.
          </p>
          <button 
            onClick={() => {
              document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg pulse-blue slide-up" 
            style={{animationDelay: '0.4s'}}
          >
            Get Insured Now
          </button>
        </div>
      </section>

      {/* How It Works Section - Updated to reflect AI automation */}
      <section id="how-it-works" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16 fade-in">How AI Protection Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center fade-in" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover-glow">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Buy Coverage</h3>
              <p className="text-blue-200 text-sm">€10/month insures €10,000 in Bitcoin. Instant activation.</p>
            </div>
            <div className="text-center fade-in" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover-glow">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">AI Monitors</h3>
              <p className="text-blue-200 text-sm">Our AI tracks wallet security and exchange risks 24/7.</p>
            </div>
            <div className="text-center fade-in" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover-glow">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Hack Detected</h3>
              <p className="text-blue-200 text-sm">Chainlink oracles verify incidents automatically.</p>
            </div>
            <div className="text-center fade-in" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover-glow">
                <span className="text-xl font-bold text-white">4</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Auto-Payout</h3>
              <p className="text-blue-200 text-sm">Smart contracts pay you instantly. No forms, no delays.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Calculator Section */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-8 fade-in">AI Premium Calculator</h2>
          <p className="text-blue-200 text-center mb-12 fade-in">Our AI analyzes your risk profile to give instant, personalized pricing.</p>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-800 fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Insured Wallet Value (EUR)</label>
                  <input
                    type="number"
                    placeholder="Enter the total EUR value of your crypto wallet"
                    className="w-full bg-slate-700 text-white p-3 rounded-lg border border-blue-600 focus:border-blue-400 focus:outline-none focus-blue"
                    value={calculatorData.walletValue}
                    onChange={(e) => setCalculatorData(prev => ({...prev, walletValue: e.target.value}))}
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Type of Wallet</label>
                  <select 
                    className="w-full bg-slate-700 text-white p-3 rounded-lg border border-blue-600 focus:border-blue-400 focus:outline-none focus-blue"
                    value={calculatorData.walletType}
                    onChange={(e) => setCalculatorData(prev => ({...prev, walletType: e.target.value}))}
                  >
                    <option value="">Select wallet type</option>
                    <option value="hardware">Hardware Wallet (Ledger, Trezor, etc.)</option>
                    <option value="software">Software Wallet (MetaMask, Trust Wallet)</option>
                    <option value="exchange">Exchange Wallet (Binance, Coinbase, etc.)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Coverage Type</label>
                  <select 
                    className="w-full bg-slate-700 text-white p-3 rounded-lg border border-blue-600 focus:border-blue-400 focus:outline-none focus-blue"
                    value={calculatorData.coverageType}
                    onChange={(e) => setCalculatorData(prev => ({...prev, coverageType: e.target.value}))}
                  >
                    <option value="">Select coverage type</option>
                    <option value="scam">Scam Protection</option>
                    <option value="hacking">Hacking & Theft</option>
                    <option value="smart-contract">Smart Contract Failures</option>
                    <option value="full">Full Protection (All of the above)</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Security Measures in Place</label>
                  <select 
                    className="w-full bg-slate-700 text-white p-3 rounded-lg border border-blue-600 focus:border-blue-400 focus:outline-none focus-blue"
                    value={calculatorData.securityMeasures}
                    onChange={(e) => setCalculatorData(prev => ({...prev, securityMeasures: e.target.value}))}
                  >
                    <option value="">Select security measures</option>
                    <option value="2fa-cold">2FA + Cold Storage</option>
                    <option value="2fa-only">2FA Only</option>
                    <option value="cold-only">Cold Wallet Only</option>
                    <option value="no-security">No Security Measures</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Coverage Duration</label>
                  <select 
                    className="w-full bg-slate-700 text-white p-3 rounded-lg border border-blue-600 focus:border-blue-400 focus:outline-none focus-blue"
                    value={calculatorData.duration}
                    onChange={(e) => setCalculatorData(prev => ({...prev, duration: e.target.value}))}
                  >
                    <option value="">Select duration</option>
                    <option value="1month">1 Month</option>
                    <option value="3months">3 Months</option>
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                  </select>
                </div>

                <button 
                  onClick={calculatePremium}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors hover-glow"
                >
                  🤖 Calculate My AI Premium
                </button>

                {quote && (
                  <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-600 fade-in">
                    <div className="text-center">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${
                        quote.riskLevel === 'Low' ? 'bg-green-600 text-white risk-low' :
                        quote.riskLevel === 'Medium' ? 'bg-yellow-600 text-white risk-medium' : 'bg-red-600 text-white risk-high'
                      }`}>
                        {quote.riskLevel} Risk
                      </div>
                      <p className="text-white font-bold text-lg">
                        AI Premium: €{quote.premium.toFixed(2)}
                      </p>
                      <p className="text-blue-200 text-sm mb-4">
                        for {quote.duration.replace('month', ' month').replace('year', ' year')} 
                        covering €{quote.coverageAmount.toLocaleString()}
                      </p>
                      
                      {/* Get Insured Now Button */}
                      <button 
                        onClick={() => {
                          // After seeing the quote, scroll to contact section to apply
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg pulse-green mt-2"
                      >
                        🚀 Get Insured Now - €{quote.premium.toFixed(2)}/month
                      </button>
                      
                      <div className="mt-3 text-xs text-blue-300">
                        ✅ Instant activation • ✅ AI-powered protection • ✅ No paperwork
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Plans Section */}
      <section id="plans" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-8 fade-in">🛡️ Coverage Plans</h2>
          <p className="text-blue-200 text-center mb-16 fade-in">Choose the plan that fits your risk level and wallet size.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-slate-700/50 p-8 rounded-2xl border border-blue-800 relative card-hover fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-center mb-6">
                <div className="text-3xl mb-2">🔹</div>
                <h3 className="text-2xl font-bold text-white">Basic Plan</h3>
                <div className="text-3xl font-bold text-green-400 mt-2">€10/month</div>
                <p className="text-blue-200 text-sm mt-2">Essential protection for crypto beginners.</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-green-400">
                  <span className="mr-2">✔</span>
                  <span className="text-blue-200">Coverage up to €5,000</span>
                </li>
                <li className="flex items-center text-green-400">
                  <span className="mr-2">✔</span>
                  <span className="text-blue-200">AI scam detection alerts</span>
                </li>
                <li className="flex items-center text-red-400">
                  <span className="mr-2">✖</span>
                  <span className="text-gray-400">Smart contract hack protection</span>
                </li>
                <li className="flex items-center text-red-400">
                  <span className="mr-2">✖</span>
                  <span className="text-gray-400">Instant automated claims</span>
                </li>
              </ul>
              <button 
                onClick={() => {
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Choose Basic
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-slate-700/50 p-8 rounded-2xl border-2 border-blue-500 relative card-hover fade-in" style={{animationDelay: '0.2s'}}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">BELIEBT</span>
              </div>
              <div className="text-center mb-6">
                <div className="text-3xl mb-2">🔷</div>
                <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
                <div className="text-3xl font-bold text-blue-400 mt-2">€25/month</div>
                <p className="text-blue-200 text-sm mt-2">Perfect for active German crypto traders.</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-green-400">
                  <span className="mr-2">✔</span>
                  <span className="text-blue-200">Coverage up to €25,000</span>
                </li>
                <li className="flex items-center text-green-400">
                  <span className="mr-2">✔</span>
                  <span className="text-blue-200">AI-powered phishing protection</span>
                </li>
                <li className="flex items-center text-green-400">
                  <span className="mr-2">✔</span>
                  <span className="text-blue-200">Smart contract audit alerts</span>
                </li>
                <li className="flex items-center text-red-400">
                  <span className="mr-2">✖</span>
                  <span className="text-gray-400">Multi-chain coverage</span>
                </li>
              </ul>
              <button 
                onClick={() => {
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Choose Pro
              </button>
            </div>

            {/* AI Pro Plan - Updated from DAO Vault */}
            <div className="bg-slate-700/50 p-8 rounded-2xl border border-purple-800 relative card-hover fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-center mb-6">
                <div className="text-3xl mb-2">🤖</div>
                <h3 className="text-2xl font-bold text-white">AI Pro</h3>
                <div className="text-2xl font-bold text-purple-400 mt-2">€50/month</div>
                <p className="text-blue-200 text-sm mt-2">Full AI automation with smart contract claims processing.</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-green-400">
                  <span className="mr-2">✔</span>
                  <span className="text-blue-200">Coverage up to €100,000</span>
                </li>
                <li className="flex items-center text-green-400">
                  <span className="mr-2">✔</span>
                  <span className="text-blue-200">AI risk monitoring & alerts</span>
                </li>
                <li className="flex items-center text-green-400">
                  <span className="mr-2">✔</span>
                  <span className="text-blue-200">Instant smart contract payouts</span>
                </li>
                <li className="flex items-center text-green-400">
                  <span className="mr-2">✔</span>
                  <span className="text-blue-200">Multi-chain coverage (ETH, BTC, etc.)</span>
                </li>
              </ul>
              <button 
                onClick={() => {
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Choose AI Pro
              </button>
            </div>
          </div>

          <div className="mt-12 bg-blue-900/30 p-6 rounded-xl border border-blue-800 fade-in">
            <h4 className="text-lg font-bold text-white mb-4">All plans include:</h4>
            <div className="grid md:grid-cols-4 gap-4 text-blue-200">
              <div className="flex items-center">
                <span className="mr-2">🔍</span>
                <span>24/7 wallet monitoring</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🔒</span>
                <span>Encrypted claims handling</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📊</span>
                <span>Live security analytics</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🔔</span>
                <span>Automatic renewal alerts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claims Process Section */}
      <section id="claims" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8 fade-in">Lightning-Fast AI Claims</h2>
          <p className="text-blue-200 mb-12 max-w-3xl mx-auto fade-in">
            Our AI system instantly verifies hacks using Chainlink oracles and blockchain data. 
            Smart contracts automatically pay approved claims within minutes, not weeks.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-800 card-hover fade-in" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-bold text-white mb-2">Report Incident</h3>
              <p className="text-blue-200 text-sm">Submit hack details via our portal or AI chatbot</p>
            </div>
            <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-800 card-hover fade-in" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-bold text-white mb-2">AI Analysis</h3>
              <p className="text-blue-200 text-sm">AI verifies hack using blockchain data + oracles</p>
            </div>
            <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-800 card-hover fade-in" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-bold text-white mb-2">Smart Contract</h3>
              <p className="text-blue-200 text-sm">Automated approval triggers payout contract</p>
            </div>
            <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-800 card-hover fade-in" style={{animationDelay: '0.4s'}}>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-bold text-white mb-2">Instant Payout</h3>
              <p className="text-blue-200 text-sm">Receive compensation in minutes, not weeks</p>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-800 fade-in">
            <h4 className="text-xl font-bold text-white mb-4">Powered by Advanced AI Technology</h4>
            <div className="grid md:grid-cols-3 gap-4 text-blue-200">
              <div className="flex items-center justify-center">
                <span className="mr-2">🤖</span>
                <span>AI Fraud Detection</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">⛓️</span>
                <span>Chainlink Oracles</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">⚡</span>
                <span>Smart Contract Automation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BitSafe Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16 fade-in">Why Choose BitSafe?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-800 text-center card-hover fade-in" style={{animationDelay: '0.1s'}}>
              <div className="text-3xl mb-4">🇩🇪</div>
              <h3 className="text-lg font-bold text-white mb-3">Germany's First</h3>
              <p className="text-blue-200 text-sm">Leading automated crypto insurance in Germany.</p>
            </div>
            <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-800 text-center card-hover fade-in" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-lg font-bold text-white mb-3">AI-Powered</h3>
              <p className="text-blue-200 text-sm">Instant fraud detection and automated payouts.</p>
            </div>
            <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-800 text-center card-hover fade-in" style={{animationDelay: '0.3s'}}>
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-blue-200 text-sm">Claims processed in minutes, not weeks.</p>
            </div>
            <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-800 text-center card-hover fade-in" style={{animationDelay: '0.4s'}}>
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-white mb-3">Smart Contracts</h3>
              <p className="text-blue-200 text-sm">Transparent, automated, fraud-resistant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16 fade-in">Loved by German Crypto Users</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-800 testimonial-card card-hover fade-in" style={{animationDelay: '0.1s'}}>
              <p className="text-blue-200 mb-4">"My €15k was stolen, AI detected it, and I got paid back in 20 minutes!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Marcus Weber</p>
                  <p className="text-blue-300 text-sm">Bitcoin Investor, Berlin</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-800 testimonial-card card-hover fade-in" style={{animationDelay: '0.2s'}}>
              <p className="text-blue-200 mb-4">"No paperwork, no waiting. Just AI doing its magic. This is the future!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Anna Schmidt</p>
                  <p className="text-blue-300 text-sm">DeFi Trader, Munich</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-blue-800 testimonial-card card-hover fade-in" style={{animationDelay: '0.3s'}}>
              <p className="text-blue-200 mb-4">"Finally, crypto insurance that actually works! Every German needs this."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">T</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Thomas Müller</p>
                  <p className="text-blue-300 text-sm">Crypto Consultant, Hamburg</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 space-x-8 fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2 hover-glow">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-white font-semibold">AI-Audited Code</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 hover-glow">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-white font-semibold">Smart Contract Verified</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 hover-glow">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-2 2-2-2-2 2-2-2v-2a6 6 0 017.743-5.743L10 6l2-2 2 2 2-2 2 2v2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-white font-semibold">German Regulated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-16 fade-in">Latest from BitSafe Blog</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogArticles.slice(0, 3).map((article, index) => (
              <article key={article.id} className={`bg-slate-700/50 rounded-xl overflow-hidden border border-blue-800 hover:border-blue-600 transition-all duration-300 card-hover fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-blue-400 text-sm mb-2">{article.date}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                  <p className="text-blue-200 mb-4">{article.excerpt}</p>
                  <button 
                    onClick={() => navigate(`/article/${article.id}`)}
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/blog')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors hover-glow"
            >
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-8 fade-in">Get Your AI-Powered Coverage</h2>
          <p className="text-blue-200 text-center mb-16 fade-in">Ready to protect your crypto? Our team will set up your AI-monitored insurance in minutes.</p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="fade-in">
              {/* Insurance-focused messaging */}
              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-4 rounded-xl border border-green-600 mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-green-400 mr-2">🚀</span>
                  <span className="text-white font-semibold">Fast Track Your Application</span>
                </div>
                <p className="text-green-200 text-sm">
                  Tell us about your calculated premium and we'll get you insured today!
                </p>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-700 text-white p-3 rounded-lg border border-blue-600 focus:border-blue-400 focus:outline-none focus-blue"
                    placeholder="Your full name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({...prev, name: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-700 text-white p-3 rounded-lg border border-blue-600 focus:border-blue-400 focus:outline-none focus-blue"
                    placeholder="your.email@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({...prev, email: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Wallet Address (optional)</label>
                  <input
                    type="text"
                    className="w-full bg-slate-700 text-white p-3 rounded-lg border border-blue-600 focus:border-blue-400 focus:outline-none focus-blue"
                    placeholder="0x... (for faster setup)"
                    value={contactForm.walletAddress}
                    onChange={(e) => setContactForm(prev => ({...prev, walletAddress: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Message *</label>
                  <textarea
                    rows="4"
                    required
                    className="w-full bg-slate-700 text-white p-3 rounded-lg border border-blue-600 focus:border-blue-400 focus:outline-none focus-blue"
                    placeholder="I want to get insured! My calculated premium was €X/month for €X coverage..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({...prev, message: e.target.value}))}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none pulse-green"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="spinner mr-2"></div>
                      Setting up your coverage...
                    </span>
                  ) : (
                    '🛡️ Start My AI Insurance Coverage'
                  )}
                </button>
                {submitMessage && (
                  <div className={`p-3 rounded-lg ${submitMessage.includes('✅') ? 'bg-green-900/30 border border-green-600' : 'bg-red-900/30 border border-red-600'}`}>
                    <p className={`text-sm ${submitMessage.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                      {submitMessage}
                    </p>
                  </div>
                )}
              </form>
            </div>
            
            <div className="space-y-8 fade-in">
              {/* Insurance Process Info */}
              <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-800">
                <h3 className="text-xl font-bold text-white mb-4">🚀 What Happens Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold text-white">1</div>
                    <div>
                      <p className="text-white font-semibold">Instant Review</p>
                      <p className="text-blue-200 text-sm">Our AI analyzes your application in minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold text-white">2</div>
                    <div>
                      <p className="text-white font-semibold">Smart Contract Setup</p>
                      <p className="text-blue-200 text-sm">We deploy your personalized insurance contract</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold text-white">3</div>
                    <div>
                      <p className="text-white font-semibold">AI Monitoring Starts</p>
                      <p className="text-blue-200 text-sm">24/7 protection begins immediately</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <span className="text-blue-200">hello@bitsafe.ltd</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">🌐</span>
                    </div>
                    <span className="text-blue-200">www.bitsafe.ltd</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">📍</span>
                    </div>
                    <span className="text-blue-200">Based in Bielefeld, Germany</span>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="mt-8">
                  <h4 className="text-lg font-bold text-white mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://x.com/bitsafecover" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors hover-glow"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.instagram.com/bitsafecover" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-colors hover-glow"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/bitsafecover/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors hover-glow"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.facebook.com/profile.php?id=61576611313372" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors hover-glow"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-xl border border-blue-800">
                <h4 className="text-lg font-bold text-white mb-4">🤖 AI-Powered Protection</h4>
                <p className="text-blue-200">
                  Our advanced AI system monitors your crypto 24/7, providing instant fraud detection 
                  and automated claim processing. Experience the future of crypto insurance with 
                  Germany's first fully automated platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-white">BitSafe</span>
                <div className="text-xs text-blue-300">Crypto Insurance</div>
              </div>
            </div>
            
            {/* Social Media Links in Footer */}
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex space-x-3">
                <a 
                  href="https://x.com/bitsafecover" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  title="Follow us on X/Twitter"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/bitsafecover" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-colors"
                  title="Follow us on Instagram"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/bitsafecover/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
                  title="Connect with us on LinkedIn"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61576611313372" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                  title="Like us on Facebook"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
              
              <div className="hidden md:flex space-x-6">
                <a href="/privacy" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a>
                <a href="/impressum" className="text-blue-200 hover:text-white transition-colors">Impressum</a>
                <a href="/about" className="text-blue-200 hover:text-white transition-colors">About Us</a>
              </div>
            </div>
            
            <p className="text-blue-200">© 2025 BitSafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// About Us Component
const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-blue-900/80 backdrop-blur-sm border-b border-blue-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"/>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>BitSafe</span>
                <div className="text-xs text-blue-300 -mt-1">Crypto Insurance</div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* About Us Content */}
      <section className="py-20 fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white text-center mb-8">About BitSafe</h1>
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-blue-800 space-y-8">
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-blue-200 text-lg leading-relaxed">
                BitSafe is revolutionizing crypto security by providing the first user-friendly, DAO-powered wallet insurance protocol. 
                We believe that Web3 users shouldn't have to choose between sovereignty and security. Our mission is to bring 
                Web2-level protection to Web3 users without compromising privacy or decentralization.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-blue-200 text-lg leading-relaxed mb-4">
                Founded in 2024 by a team of crypto natives, blockchain developers, and insurance experts, BitSafe emerged from 
                a simple observation: while institutional crypto holders have access to comprehensive insurance solutions, 
                individual users are left vulnerable to hacks, scams, and smart contract failures.
              </p>
              <p className="text-blue-200 text-lg leading-relaxed">
                Based in Bielefeld, Germany, our diverse team combines decades of experience in traditional insurance, 
                DeFi protocols, and blockchain security to create transparent, fair, and accessible crypto insurance for everyone.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6">What Makes Us Different</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-600">
                  <h3 className="text-xl font-bold text-white mb-3">🏗️ DAO Governance</h3>
                  <p className="text-blue-200">All claims are processed through transparent, on-chain voting by our decentralized community.</p>
                </div>
                <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-600">
                  <h3 className="text-xl font-bold text-white mb-3">⚡ Instant Coverage</h3>
                  <p className="text-blue-200">Get protected immediately with no waiting periods or complex underwriting processes.</p>
                </div>
                <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-600">
                  <h3 className="text-xl font-bold text-white mb-3">💰 Fair Pricing</h3>
                  <p className="text-blue-200">Transparent, risk-based premiums with no hidden fees or surprise charges.</p>
                </div>
                <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-600">
                  <h3 className="text-xl font-bold text-white mb-3">🔒 Privacy First</h3>
                  <p className="text-blue-200">No KYC required. Protect your assets while maintaining your privacy and anonymity.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Transparency</h3>
                    <p className="text-blue-200">Every decision, every claim, every vote is recorded on-chain for complete transparency.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Fairness</h3>
                    <p className="text-blue-200">DAO governance ensures that every user gets fair treatment regardless of wallet size.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
                    <p className="text-blue-200">We're constantly evolving our protocols to stay ahead of emerging threats in the crypto space.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-xl border border-blue-600">
              <h2 className="text-2xl font-bold text-white mb-4">Join Our Community</h2>
              <p className="text-blue-200 mb-4">
                BitSafe is more than just insurance - it's a community of crypto users protecting each other. 
                Join our DAO, participate in governance, and help shape the future of crypto security.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Privacy Policy Component
const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-blue-900/80 backdrop-blur-sm border-b border-blue-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"/>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>BitSafe</span>
                <div className="text-xs text-blue-300 -mt-1">Crypto Insurance</div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Privacy Policy Content */}
      <section className="py-20 fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white text-center mb-8">Privacy Policy</h1>
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-blue-800 space-y-8">
            
            <div className="text-blue-200 text-sm">
              <p><strong>Last updated:</strong> March 19, 2025</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-blue-200 leading-relaxed">
                BitSafe ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our decentralized insurance platform and related services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-blue-300 mb-3">Information You Provide</h3>
              <ul className="text-blue-200 space-y-2 mb-4">
                <li>• Contact information (email address, name) when you contact us</li>
                <li>• Wallet addresses for insurance coverage</li>
                <li>• Transaction hashes for claims processing</li>
                <li>• Communications when you contact our support team</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-300 mb-3">Information Automatically Collected</h3>
              <ul className="text-blue-200 space-y-2">
                <li>• Usage data and analytics (anonymized)</li>
                <li>• IP addresses and device information</li>
                <li>• Browser type and operating system</li>
                <li>• On-chain transaction data (publicly available)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <ul className="text-blue-200 space-y-2">
                <li>• To provide and maintain our insurance services</li>
                <li>• To process insurance claims and payouts</li>
                <li>• To communicate with you about your account</li>
                <li>• To improve our platform and user experience</li>
                <li>• To comply with legal obligations</li>
                <li>• To detect and prevent fraud</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Data Sharing and Disclosure</h2>
              <p className="text-blue-200 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="text-blue-200 space-y-2">
                <li>• <strong>DAO Governance:</strong> Anonymized claim data for community voting</li>
                <li>• <strong>Service Providers:</strong> Trusted partners who assist in operating our platform</li>
                <li>• <strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li>• <strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Blockchain and Decentralization</h2>
              <p className="text-blue-200 leading-relaxed">
                As a blockchain-based platform, certain information is inherently public and immutable on the blockchain, including:
                transaction hashes, wallet addresses involved in claims, and DAO voting records. This information cannot be deleted 
                or modified due to the nature of blockchain technology.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-blue-200 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your data, including encryption, 
                secure servers, and access controls. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-blue-200 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="text-blue-200 space-y-2">
                <li>• Access to your personal data</li>
                <li>• Correction of inaccurate data</li>
                <li>• Deletion of your data (where legally permissible)</li>
                <li>• Data portability</li>
                <li>• Objection to processing</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-blue-200 leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-600 mt-4">
                <p className="text-blue-200">
                  <strong>Email:</strong> privacy@bitsafe.ltd<br/>
                  <strong>Address:</strong> Bielefeld, Germany
                </p>
              </div>
            </div>

            <div className="border-t border-blue-800 pt-6">
              <p className="text-blue-300 text-sm">
                This Privacy Policy may be updated from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Impressum Component (German Legal Disclosure)
const Impressum = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="bg-blue-900/80 backdrop-blur-sm border-b border-blue-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"/>
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>BitSafe</span>
                <div className="text-xs text-blue-300 -mt-1">Crypto Insurance</div>
              </div>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      {/* Impressum Content */}
      <section className="py-20 fade-in">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-white text-center mb-8">Impressum</h1>
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-blue-800 space-y-8">
            
            <div className="text-blue-200 text-sm">
              <p>Information according to § 5 TMG (German Telemedia Act)</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Company Information</h2>
              <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-600">
                <div className="space-y-2 text-blue-200">
                  <p><strong>Company:</strong> BitSafe Insurance DAO</p>
                  <p><strong>Location:</strong> Bielefeld, Germany</p>
                  <p><strong>Email:</strong> legal@bitsafe.ltd</p>
                  <p><strong>Website:</strong> www.bitsafe.ltd</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Legal Structure</h2>
              <p className="text-blue-200 leading-relaxed">
                BitSafe operates as a decentralized autonomous organization (DAO) providing crypto insurance services. 
                The platform facilitates peer-to-peer insurance coverage through smart contracts and community governance.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Responsible for Content</h2>
              <p className="text-blue-200 leading-relaxed">
                Content responsibility according to § 55 Abs. 2 RStV (German Interstate Broadcasting Agreement):
              </p>
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-600 mt-4">
                <p className="text-blue-200">
                  BitSafe DAO Community<br/>
                  Bielefeld, Germany<br/>
                  Email: content@bitsafe.ltd
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
              
              <h3 className="text-xl font-semibold text-blue-300 mb-3">Liability for Content</h3>
              <p className="text-blue-200 leading-relaxed mb-4">
                The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents' 
                accuracy, completeness, or topicality. According to statutory provisions, we are furthermore responsible for 
                our own content on these web pages.
              </p>

              <h3 className="text-xl font-semibold text-blue-300 mb-3">Liability for Links</h3>
              <p className="text-blue-200 leading-relaxed mb-4">
                Our offer includes links to external third-party websites. We have no influence on the contents of those websites, 
                therefore we cannot guarantee for those contents. The provider or administrator of linked pages is always responsible 
                for the contents of the linked pages.
              </p>

              <h3 className="text-xl font-semibold text-blue-300 mb-3">Copyright</h3>
              <p className="text-blue-200 leading-relaxed">
                The content and works on these pages created by the site operators are subject to German copyright law. 
                Duplication, processing, distribution, or any form of commercialization beyond the scope of the copyright law 
                shall require the prior written consent of its respective author or creator.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Regulatory Notice</h2>
              <div className="bg-yellow-900/30 p-6 rounded-xl border border-yellow-600">
                <p className="text-yellow-200 leading-relaxed">
                  <strong>Important:</strong> BitSafe provides decentralized insurance services through blockchain technology. 
                  This service may not be available in all jurisdictions. Users are responsible for ensuring compliance with 
                  local laws and regulations regarding cryptocurrency and insurance services.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Dispute Resolution</h2>
              <p className="text-blue-200 leading-relaxed">
                The European Commission provides a platform for online dispute resolution (OS): 
                <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-400 hover:text-blue-300 ml-1" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-blue-200 leading-relaxed mt-4">
                We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
              </p>
            </div>

            <div className="border-t border-blue-800 pt-6">
              <p className="text-blue-300 text-sm">
                This Impressum complies with German legal requirements under TMG and RStV. 
                Last updated: March 19, 2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Main App Component with Router
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
    </Router>
  );
};

export default App;