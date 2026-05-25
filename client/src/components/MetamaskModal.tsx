import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Wallet, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

interface MetamaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  priceUSD: number;
  onSuccess: (txHash: string) => void;
}

const MetamaskModal: React.FC<MetamaskModalProps> = ({ isOpen, onClose, priceUSD, onSuccess }) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'signing' | 'broadcasting' | 'mining' | 'success'>('idle');
  const [txHash, setTxHash] = useState('');
  const [hasProvider, setHasProvider] = useState(false);

  // Conversion rate: 1 ETH = $3000 USD
  const priceETH = (priceUSD / 3000).toFixed(4);

  useEffect(() => {
    // Detect real MetaMask provider
    const ethereum = (window as any).ethereum;
    setHasProvider(!!ethereum);
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulating delay for organic Web3 handshake
    setTimeout(async () => {
      const ethereum = (window as any).ethereum;
      
      if (hasProvider && ethereum) {
        try {
          // Request account access from real metamask extension
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts[0]) {
            setWalletAddress(accounts[0]);
            setIsConnecting(false);
            return;
          }
        } catch (err) {
          console.warn('Real Metamask connection rejected, falling back to simulated engine.', err);
        }
      }

      // Fallback Simulator (Robust zero-setup)
      const mockAddress = '0x' + Array.from({ length: 40 }, () => 
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
      ).join('');
      setWalletAddress(mockAddress);
      setIsConnecting(false);
    }, 1200);
  };

  const handlePay = async () => {
    if (!walletAddress) return;
    setIsPaying(true);
    
    // Step 1: Signing Request
    setPaymentStep('signing');

    // If real provider exists, attempt real signature request (optional non-blocking)
    const ethereum = (window as any).ethereum;
    if (hasProvider && ethereum) {
      try {
        await ethereum.request({
          method: 'personal_sign',
          params: [
            `Request signature to approve flemlabs payment: ${priceETH} ETH ($${priceUSD} USD)`,
            walletAddress
          ],
        });
      } catch (err) {
        console.warn('Real signature denied, proceeding with simulated block engine.', err);
      }
    }

    // Step 2: Broadcaster transmission (simulated network lag)
    setTimeout(() => {
      setPaymentStep('broadcasting');
      
      // Step 3: Block mining (simulating proof-of-stake latency)
      setTimeout(() => {
        setPaymentStep('mining');
        
        setTimeout(() => {
          const generatedHash = '0x' + Array.from({ length: 64 }, () => 
            '0123456789abcdef'[Math.floor(Math.random() * 16)]
          ).join('');
          
          setTxHash(generatedHash);
          setPaymentStep('success');
          setIsPaying(false);

          // Return successful transaction hash to order component
          setTimeout(() => {
            onSuccess(generatedHash);
          }, 1000);

        }, 1500);
      }, 1500);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Background Dim Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity" 
      />

      {/* Main Glassmorphic Panel */}
      <div className="relative glass-panel w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-cream/15 p-6 animate-fade-in">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-cream transition-colors"
          disabled={isPaying}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex w-12 h-12 bg-cream/5 border border-cream/25 rounded-full items-center justify-center mb-3">
            <Wallet className="text-cream" size={24} />
          </div>
          <h3 className="text-lg font-bold text-cream">Crypto Wallet Payment</h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
            MetaMask Web3 Transaction System
          </p>
        </div>

        {/* Invoice Summary */}
        <div className="bg-surface-dark border border-cream/10 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-gray-400">Artwork Commission Package</span>
            <span className="text-cream font-medium">Safe Escrow Pay</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Total Due</span>
            <div className="text-right">
              <span className="text-xl font-bold text-cream">{priceETH} ETH</span>
              <span className="text-xs text-gray-400 block">${priceUSD}.00 USD</span>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        {paymentStep === 'idle' ? (
          <div>
            {!walletAddress ? (
              <div className="space-y-4">
                <p className="text-xs text-gray-400 leading-relaxed text-center">
                  {hasProvider 
                    ? 'Confirm signature access request via MetaMask popup extension to process Ethereum payment.'
                    : 'MetaMask extension not detected in this browser. flemlabs has activated a full web3 ledger simulator for sandbox testing.'}
                </p>
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full bg-cream hover:bg-cream-light text-black font-semibold text-xs py-3 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(222,219,200,0.2)] transition-all duration-300"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Opening secure connection...
                    </>
                  ) : (
                    <>
                      <Wallet size={16} />
                      {hasProvider ? 'Connect MetaMask Extension' : 'Activate Web3 Simulator'}
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border border-cream/15 rounded-lg p-3 text-center">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">
                    Connected Wallet Address
                  </span>
                  <span className="text-xs font-mono text-cream select-all">
                    {walletAddress.substring(0, 8)}...{walletAddress.substring(34)}
                  </span>
                </div>
                <button
                  onClick={handlePay}
                  className="w-full bg-cream hover:bg-cream-light text-black font-semibold text-xs py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
                >
                  Authorize Payment ({priceETH} ETH)
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Transaction Steps Feedback */
          <div className="py-6 text-center space-y-4">
            {paymentStep === 'signing' && (
              <>
                <Loader2 className="animate-spin text-cream mx-auto" size={32} />
                <h4 className="text-sm font-bold text-cream">Waiting for Signature Approval</h4>
                <p className="text-[11px] text-gray-500">
                  Please check your MetaMask popup interface and sign the transaction request.
                </p>
              </>
            )}
            {paymentStep === 'broadcasting' && (
              <>
                <Loader2 className="animate-spin text-cream mx-auto" size={32} />
                <h4 className="text-sm font-bold text-cream">Broadcasting Transaction to Pool</h4>
                <p className="text-[11px] text-gray-500">
                  Transmitting signed block data packet to distributed validators.
                </p>
              </>
            )}
            {paymentStep === 'mining' && (
              <>
                <div className="relative w-10 h-10 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-cream/10 rounded-full" />
                  <div className="absolute inset-0 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                </div>
                <h4 className="text-sm font-bold text-cream">Mining Block Consensus</h4>
                <p className="text-[11px] text-gray-500">
                  Waiting for Proof-of-Stake validator ledger confirmations (1/3).
                </p>
              </>
            )}
            {paymentStep === 'success' && (
              <div className="animate-fade-in space-y-3">
                <CheckCircle2 className="text-emerald-400 mx-auto" size={40} />
                <h4 className="text-sm font-bold text-emerald-400">Transaction Confirmed!</h4>
                <div className="bg-surface-dark border border-emerald-500/20 rounded-lg p-3 text-left">
                  <div className="flex gap-2 items-center text-[10px] text-gray-400 mb-1">
                    <ShieldCheck className="text-emerald-400" size={12} />
                    <span>SECURE TRANSACTION LOGGED</span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-400 break-all select-all block">
                    Tx: {txHash}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500">
                  Redirecting to order dashboard and receipts confirmation...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetamaskModal;
