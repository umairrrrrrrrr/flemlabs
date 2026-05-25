import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Service, Order } from '../types';
import MetamaskModal from '../components/MetamaskModal';
import { Loader2, Calendar, Compass, ShieldAlert, ShieldCheck, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const Orders: React.FC = () => {
  const { user, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Tab layout: 'place' or 'history'
  const [activeTab, setActiveTab] = useState<'place' | 'history'>('place');

  // Form selections states
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedTier, setSelectedTier] = useState<'Basic' | 'Standard' | 'Pro'>('Basic');
  const [requirements, setRequirements] = useState('');
  const [refImageUrl, setRefImageUrl] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Crypto'>('Crypto');

  // Orders list history
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  // MetaMask wallet modal toggle
  const [isWeb3ModalOpen, setIsWeb3ModalOpen] = useState(false);
  
  // Checkout feedback overlay
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState('');

  // Cancellation prompt modal
  const [cancellingOrder, setCancellingOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Fallback services
  const fallbackServices: Service[] = [
    {
      _id: 'fallback-pixel',
      name: 'Pixel Art character design & sprites',
      category: '2D Art & Game Design',
      description: 'High-quality retro-styled pixel art character sprites.',
      prices: { basic: 45, standard: 95, pro: 180 },
      features: { basic: [], standard: [], pro: [] },
      imageUrl: ''
    },
    {
      _id: 'fallback-character',
      name: 'High-Fidelity 3D Character Model',
      category: '3D Art & Modeling',
      description: 'High-res stylized or semi-realistic character model.',
      prices: { basic: 150, standard: 350, pro: 650 },
      features: { basic: [], standard: [], pro: [] },
      imageUrl: ''
    }
  ];

  // Fetch Services & User Orders
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) setServices(data);
          else setServices(fallbackServices);
        } else setServices(fallbackServices);
      } catch (err) {
        setServices(fallbackServices);
      }
    };
    fetchServices();
  }, []);

  // Sync Preselected parameters from deep catalog link
  useEffect(() => {
    if (services.length > 0) {
      const state = location.state as { preSelectedServiceId?: string, preSelectedTier?: 'Basic' | 'Standard' | 'Pro' } | null;
      if (state?.preSelectedServiceId) {
        setSelectedServiceId(state.preSelectedServiceId);
        if (state?.preSelectedTier) {
          setSelectedTier(state.preSelectedTier);
        }
      } else {
        setSelectedServiceId(services[0]._id || services[0].id || '');
      }
    }
  }, [services, location.state]);

  const fetchOrders = async () => {
    if (!token) return;
    setLoadingOrders(true);
    try {
      const response = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchOrders();
    }
  }, [activeTab, token]);

  const activeService = services.find(s => s._id === selectedServiceId || s.id === selectedServiceId);
  const activePrice = activeService ? activeService.prices[selectedTier.toLowerCase() as 'basic' | 'standard' | 'pro'] : 0;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setIsWeb3ModalOpen(true);
  };

  const handleWeb3Success = (hash: string) => {
    setIsWeb3ModalOpen(false);
    processFinalOrder('Crypto', hash);
  };

  const processFinalOrder = async (method: 'Crypto', txnProof: string) => {
    setPlacingOrder(true);
    try {
      // 1. Submit Order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: selectedServiceId,
          tier: selectedTier,
          requirements,
          referenceImage: refImageUrl,
          price: activePrice,
          paymentMethod: method
        })
      });

      if (orderResponse.ok) {
        const newOrder = await orderResponse.json();
        const orderId = newOrder._id || newOrder.id;

        // 2. Log Payment Record
        await fetch('/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            orderId,
            amount: activePrice,
            paymentMethod: method,
            txHash: txnProof
          })
        });

        setSuccessOrderId(orderId);
        setCheckoutSuccess(true);
        
        // Reset states
        setRequirements('');
        setRefImageUrl('');
      }
    } catch (err) {
      console.error('Submit order failed:', err);
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleCancelRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancellingOrder || !token) return;

    try {
      const response = await fetch(`/api/orders/${cancellingOrder._id || cancellingOrder.id}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cancellationReason: cancelReason })
      });

      if (response.ok) {
        setCancellingOrder(null);
        setCancelReason('');
        fetchOrders(); // Reload orders list
      }
    } catch (err) {
      console.error('Cancel request error:', err);
    }
  };

  // Helper status styling variables
  const statusColors = {
    'Pending': 'text-yellow-400 bg-yellow-400/5 border-yellow-400/20',
    'Accepted': 'text-blue-400 bg-blue-400/5 border-blue-400/20',
    'In Progress': 'text-amber-300 bg-amber-300/5 border-amber-300/20',
    'Completed': 'text-emerald-400 bg-emerald-400/5 border-emerald-400/20',
    'Cancelled': 'text-rose-400 bg-rose-400/5 border-rose-400/20'
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12">
      <motion.div
        className="max-w-6xl mx-auto w-full space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Toggle tabs */}
        <motion.div variants={itemVariants} className="flex justify-center border-b border-cream/10 max-w-sm mx-auto p-1 bg-surface-dark rounded-full">
          <button
            onClick={() => setActiveTab('place')}
            className={`flex-1 text-xs py-3 rounded-full font-semibold transition-all ${
              activeTab === 'place' ? 'bg-cream text-black' : 'text-gray-400 hover:text-cream'
            }`}
          >
            Place Commission
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 text-xs py-3 rounded-full font-semibold transition-all ${
              activeTab === 'history' ? 'bg-cream text-black' : 'text-gray-400 hover:text-cream'
            }`}
          >
            Track & History
          </button>
        </motion.div>

        {/* Tab 1: Place order commission form */}
        {activeTab === 'place' ? (
          <motion.div variants={itemVariants}>
            {!checkoutSuccess ? (
              <form onSubmit={handleOrderSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form fields */}
                <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl border border-cream/15 space-y-6">
                  <h3 className="text-xl font-bold text-cream font-serif italic border-b border-cream/5 pb-3">
                    Creative Specs & Briefing
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service Listing Selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                        Choose Your Creative Pillar
                      </label>
                      <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full bg-black border border-cream/10 rounded-xl p-3 text-xs text-cream-light focus:border-cream/35 outline-none font-bold"
                      >
                        {services.map(s => (
                          <option key={s._id || s.id} value={s._id || s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Tier Selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                        Select Package Tier
                      </label>
                      <select
                        value={selectedTier}
                        onChange={(e) => setSelectedTier(e.target.value as any)}
                        className="w-full bg-black border border-cream/10 rounded-xl p-3 text-xs text-cream-light focus:border-cream/35 outline-none font-bold"
                      >
                        <option value="Basic">Basic Package</option>
                        <option value="Standard">Standard Package</option>
                        <option value="Pro">Pro Package</option>
                      </select>
                    </div>
                  </div>

                  {/* Requirements Description */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                      Your Creative Brief
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your dream asset — color scheme, style, characters, vibe. Go crazy!"
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      className="w-full bg-black border border-cream/10 focus:border-cream/30 text-cream-light text-xs rounded-xl p-4 outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Mock reference image url */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                      Reference Moodboard / Image Link (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/reference-moodboard.jpg"
                      value={refImageUrl}
                      onChange={(e) => setRefImageUrl(e.target.value)}
                      className="w-full bg-black border border-cream/10 focus:border-cream/30 text-cream-light text-xs rounded-xl p-3 outline-none"
                    />
                  </div>
                </div>

                {/* Billing Summary Panel */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="glass-panel p-6 rounded-3xl border border-cream/15 space-y-6">
                    <h3 className="text-sm font-bold text-cream uppercase tracking-widest border-b border-cream/5 pb-3">
                      Price & Timeline Breakdown
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between text-gray-400">
                        <span>Selected Package:</span>
                        <span className="text-cream font-bold">{selectedTier} Package</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Estimated Turnaround:</span>
                        <span className="text-cream font-serif italic text-cream-dark">
                          {selectedTier === 'Basic' ? '2-3 days' : selectedTier === 'Standard' ? '5-6 days' : '10-12 days'}
                        </span>
                      </div>
                      <div className="border-t border-cream/5 pt-3 flex justify-between items-baseline">
                        <span className="text-gray-400 font-bold">Total Due:</span>
                        <span className="text-2xl font-bold text-cream">${activePrice}.00</span>
                      </div>
                    </div>

                    {/* Checkout methods info card */}
                    <div className="space-y-4 border-t border-cream/5 pt-4">
                      <div className="flex gap-3 bg-cream/5 border border-cream/15 rounded-2xl p-4">
                        <Compass className="text-cream mt-0.5 flex-shrink-0 animate-pulse" size={18} />
                        <div>
                          <span className="text-[10px] text-cream uppercase tracking-widest font-bold block">
                            Secure Web3 Escrow Gateway
                          </span>
                          <p className="text-[11px] text-gray-500 leading-normal font-light mt-1">
                            Payments are secured in standard escrow on the Ethereum blockchain. Connected MetaMask signature approves transaction transfer hooks automatically.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Order button */}
                    <button
                      type="submit"
                      disabled={placingOrder}
                      className="w-full bg-cream hover:bg-cream-light text-black font-bold text-sm py-5 rounded-full flex items-center justify-center gap-2 shadow-[0_6px_24px_rgba(222,219,200,0.25)] hover:shadow-[0_8px_32px_rgba(222,219,200,0.4)] transition-all duration-300 tracking-wide"
                    >
                      {placingOrder ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Securing Blockchain Tx...
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={18} />
                          Proceed with MetaMask
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Success Checkout Message */
              <div className="glass-panel max-w-xl mx-auto p-8 rounded-3xl border border-cream/15 text-center space-y-6 animate-fade-in">
                <CheckCircle2 className="text-emerald-400 mx-auto" size={48} />
                <div>
                  <h3 className="text-xl font-bold text-cream font-serif italic">Commission Accepted!</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Order ID: {successOrderId}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Your payment has been successfully secured in our studio escrow ledger. The creative team has been notified, and you can track the real-time status of your assets now.
                </p>
                <div className="pt-2 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setCheckoutSuccess(false);
                      setActiveTab('history');
                    }}
                    className="bg-cream text-black font-semibold text-xs py-3 px-6 rounded-full hover:bg-cream-light transition-colors"
                  >
                    Track Production Status
                  </button>
                  <button
                    onClick={() => setCheckoutSuccess(false)}
                    className="border border-cream/20 hover:border-cream/45 text-cream text-xs py-3 px-6 rounded-full transition-colors"
                  >
                    New Commission
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          /* Tab 2: User order track history list */
          <motion.div variants={itemVariants} className="space-y-6">
            {!user ? (
              <div className="text-center py-12 space-y-4">
                <ShieldAlert className="text-cream/50 mx-auto" size={40} />
                <p className="text-xs text-gray-500 uppercase tracking-wider">Authentication Required</p>
                <button onClick={() => navigate('/login')} className="bg-cream text-black font-semibold text-xs px-5 py-2.5 rounded-full">
                  Login to view history
                </button>
              </div>
            ) : loadingOrders ? (
              <div className="text-center py-12">
                <Loader2 className="animate-spin text-cream mx-auto" size={32} />
              </div>
            ) : orders.length === 0 ? (
              <div className="glass-panel text-center py-16 rounded-3xl border border-cream/10 space-y-4">
                <Compass className="text-cream/35 mx-auto" size={36} />
                <div>
                  <h4 className="text-base font-bold text-cream">No Active Commissions Found</h4>
                  <p className="text-xs text-gray-500 font-light mt-1">Open a commission to start curating masterpieces.</p>
                </div>
                <button
                  onClick={() => setActiveTab('place')}
                  className="bg-cream text-black font-semibold text-xs py-2.5 px-6 rounded-full mt-2"
                >
                  Commission flemlabs Now
                </button>
              </div>
            ) : (
              /* Orders lists */
              <div className="space-y-8">
                {orders.map((order) => (
                  <div
                    key={order._id || order.id}
                    className="glass-panel p-6 rounded-3xl border border-cream/10 space-y-6 hover:border-cream/20 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-cream/5 pb-4">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase font-semibold">Active Commission</span>
                        <h4 className="text-base font-bold text-cream">{order.serviceName}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-bold border px-3 py-1 rounded-full ${statusColors[order.status] || 'text-gray-400 bg-gray-400/5'}`}>
                          {order.status}
                        </span>
                        {/* Cancel button if Pending or Accepted */}
                        {['Pending', 'Accepted'].includes(order.status) && (
                          <button
                            onClick={() => setCancellingOrder(order)}
                            className="text-xs text-rose-400 hover:text-rose-300 transition-colors p-1"
                          >
                            Cancel Commission
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Timeline status track */}
                    {order.status !== 'Cancelled' ? (
                      <div className="py-2">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-4">
                          Production Timeline Tracker
                        </span>
                        <div className="grid grid-cols-4 gap-2 relative">
                          {/* Progress Line */}
                          <div className="absolute top-2.5 left-0 right-0 h-0.5 bg-surface-dark z-0" />
                          {/* Active filled line progress indicator */}
                          <div 
                            className="absolute top-2.5 left-0 h-0.5 bg-cream shadow-[0_0_8px_#DEDBC8] z-0 transition-all duration-700" 
                            style={{ 
                              width: order.status === 'Pending' ? '0%' 
                                   : order.status === 'Accepted' ? '33%' 
                                   : order.status === 'In Progress' ? '66%' 
                                   : '100%' 
                            }}
                          />

                          {/* Steps */}
                          {[
                            { step: 'Created', label: '1. Commission Logged', status: ['Pending', 'Accepted', 'In Progress', 'Completed'] },
                            { step: 'Accepted', label: '2. Spec Approved', status: ['Accepted', 'In Progress', 'Completed'] },
                            { step: 'In Progress', label: '3. Asset Forge', status: ['In Progress', 'Completed'] },
                            { step: 'Completed', label: '4. Master Delivery', status: ['Completed'] }
                          ].map((s, sIdx) => {
                            const isDone = s.status.includes(order.status);
                            return (
                              <div key={sIdx} className="text-center relative z-10 flex flex-col items-center">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                  isDone 
                                    ? 'bg-cream border-cream text-black shadow-[0_0_10px_#DEDBC8]' 
                                    : 'bg-black border-surface-dark text-gray-600'
                                }`}>
                                  {isDone && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                                </div>
                                <span className={`text-[9px] mt-2 block font-medium uppercase tracking-wider ${
                                  isDone ? 'text-cream' : 'text-gray-600'
                                }`}>
                                  {s.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* Cancelled details card */
                      <div className="flex gap-3 bg-rose-500/5 border border-rose-500/20 rounded-2xl p-4">
                        <XCircle className="text-rose-400 mt-0.5 flex-shrink-0" size={16} />
                        <div>
                          <span className="text-[10px] text-rose-400 uppercase tracking-widest font-bold block">
                            Commission Terminated
                          </span>
                          <p className="text-xs text-gray-400 leading-relaxed font-light mt-1">
                            Reason: <span className="font-serif italic text-rose-300">"{order.cancellationReason || 'User request.'}"</span>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Metadata specs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-500 pt-2 font-light">
                      <div className="bg-surface-dark p-3.5 rounded-xl border border-cream/5">
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold block mb-1">
                          Specs Brief
                        </span>
                        <p className="text-cream-light leading-relaxed italic">
                          "{order.requirements}"
                        </p>
                      </div>
                      <div className="bg-surface-dark p-3.5 rounded-xl border border-cream/5">
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold block mb-1">
                          Escrow Details
                        </span>
                        <p>Total Escrow: <span className="text-cream font-bold">${order.price}.00 USD</span></p>
                        <p className="mt-1">Gateway: <span className="text-cream-dark">{order.paymentMethod} Payment</span></p>
                        <p className="mt-1">Status: <span className="text-emerald-400">{order.paymentStatus}</span></p>
                      </div>
                      <div className="bg-surface-dark p-3.5 rounded-xl border border-cream/5 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold block mb-1">
                            Creation Logs
                          </span>
                          <p className="flex items-center gap-1">
                            <Calendar size={12} /> Logged: {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {order.referenceImage && (
                          <a 
                            href={order.referenceImage} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[9px] text-cream underline flex items-center gap-0.5 mt-2"
                          >
                            Inspect Reference Board <ChevronRight size={10} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Dynamic MetaMask Connection Handshake Modal */}
      <MetamaskModal
        isOpen={isWeb3ModalOpen}
        onClose={() => setIsWeb3ModalOpen(false)}
        priceUSD={activePrice}
        onSuccess={handleWeb3Success}
      />

      {/* Cancellation reason prompt Modal popup */}
      {cancellingOrder && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div 
            onClick={() => setCancellingOrder(null)}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm" 
          />
          <div className="relative glass-panel w-full max-w-md rounded-2xl p-6 border border-cream/15 shadow-2xl animate-fade-in space-y-6">
            <div className="text-center">
              <ShieldAlert className="text-rose-400 mx-auto mb-2" size={32} />
              <h4 className="text-base font-bold text-cream">Request Commission Termination</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                Refund Escrow Gate
              </p>
            </div>
            <form onSubmit={handleCancelRequest} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 uppercase font-semibold">Cancellation Reason</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail reasons for terminating this creative escrow commission..."
                  value={cancelReason}
                  onChange={e => setCancelReason(e.target.value)}
                  className="w-full bg-black border border-cream/10 rounded-lg p-2.5 text-xs text-cream-light outline-none resize-none focus:border-cream/35"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCancellingOrder(null)}
                  className="flex-1 bg-surface-dark border border-cream/10 text-cream text-xs font-semibold py-2.5 rounded-full"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-rose-500 text-white text-xs font-semibold py-2.5 rounded-full hover:bg-rose-600 transition-colors"
                >
                  Cancel Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
