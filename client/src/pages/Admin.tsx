import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Order, Review, Payment } from '../types';
import { Loader2, ShieldCheck, DollarSign, FolderGit, Star, ShieldAlert, Ban, Trash2 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Admin: React.FC = () => {
  const { token } = useAuth();
  
  // Dashboard states
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  // Active viewing sub-tab: 'orders' | 'reviews' | 'payments'
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'reviews' | 'payments'>('orders');

  // Filter state for orders
  const [orderFilter, setOrderFilter] = useState('All');

  // Decline/Cancel reason modal
  const [terminatingOrder, setTerminatingOrder] = useState<Order | null>(null);
  const [declineReason, setDeclineReason] = useState('');

  const fetchDashboardData = async () => {
    if (!token) return;
    try {
      // Fetch Orders
      const resOrders = await fetch('/api/orders', { headers: { 'Authorization': `Bearer ${token}` } });
      const ordersData = await resOrders.ok ? await resOrders.json() : [];
      setOrders(ordersData);

      // Fetch Reviews
      const resReviews = await fetch('/api/reviews');
      const reviewsData = await resReviews.ok ? await resReviews.json() : [];
      setReviews(reviewsData);

      // Fetch Payments
      const resPayments = await fetch('/api/payments', { headers: { 'Authorization': `Bearer ${token}` } });
      const paymentsData = await resPayments.ok ? await resPayments.json() : [];
      setPayments(paymentsData);

    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // Actions: Update Order Status
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    if (!token) return;
    try {
      const response = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  // Actions: Decline / Terminate Order
  const handleDeclineOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminatingOrder || !token) return;

    try {
      const response = await fetch(`/api/orders/${terminatingOrder._id || terminatingOrder.id}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ cancellationReason: declineReason })
      });
      if (response.ok) {
        setTerminatingOrder(null);
        setDeclineReason('');
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Decline order error:', err);
    }
  };

  // Actions: Remove inappropriate Review
  const handleDeleteReview = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Delete this user review from testimonials wall?')) return;

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Delete review error:', err);
    }
  };

  // Metric calculation helpers
  const totalSales = orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.price, 0);
  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '5.0';
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  const filteredOrders = orderFilter === 'All'
    ? orders
    : orders.filter(o => o.status === orderFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-cream" size={40} />
      </div>
    );
  }

  const orderFiltersList = ['All', 'Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'];

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
        className="max-w-7xl mx-auto w-full space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Title */}
        <motion.div variants={itemVariants} className="border-b border-cream/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em] block">
              flemlabs master control
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-cream mt-1">
              Atelier Command Dashboard.
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSubTab('orders')}
              className={`text-xs px-5 py-2.5 rounded-full font-bold border transition-colors ${
                activeSubTab === 'orders' ? 'bg-cream text-black' : 'bg-surface-dark border-cream/10 text-gray-400'
              }`}
            >
              Order Pipeline
            </button>
            <button
              onClick={() => setActiveSubTab('reviews')}
              className={`text-xs px-5 py-2.5 rounded-full font-bold border transition-colors ${
                activeSubTab === 'reviews' ? 'bg-cream text-black' : 'bg-surface-dark border-cream/10 text-gray-400'
              }`}
            >
              Review Moderator
            </button>
            <button
              onClick={() => setActiveSubTab('payments')}
              className={`text-xs px-5 py-2.5 rounded-full font-bold border transition-colors ${
                activeSubTab === 'payments' ? 'bg-cream text-black' : 'bg-surface-dark border-cream/10 text-gray-400'
              }`}
            >
              Ledger Transactions
            </button>
          </div>
        </motion.div>

        {/* Analytics Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-5 rounded-2xl border border-cream/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-cream/5 border border-cream/20 rounded-xl flex items-center justify-center text-cream">
              <DollarSign size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Total Revenue</span>
              <span className="text-2xl font-bold text-cream">${totalSales} USD</span>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-cream/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-cream/5 border border-cream/20 rounded-xl flex items-center justify-center text-cream">
              <FolderGit size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Total Escrows</span>
              <span className="text-2xl font-bold text-cream">{orders.length} Orders</span>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-cream/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-cream/5 border border-cream/20 rounded-xl flex items-center justify-center text-cream">
              <Star size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Testimonials Score</span>
              <span className="text-2xl font-bold text-cream">{avgRating} Stars</span>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-2xl border border-cream/10 flex items-center gap-4">
            <div className="w-10 h-10 bg-cream/5 border border-cream/20 rounded-xl flex items-center justify-center text-cream">
              <ShieldAlert size={20} />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block">Pending Review</span>
              <span className="text-2xl font-bold text-cream">{pendingOrders} Commissions</span>
            </div>
          </div>
        </motion.div>

        {/* Tab 1: Orders Pipeline Table */}
        {activeSubTab === 'orders' && (
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Filter buttons list */}
            <div className="flex flex-wrap gap-2">
              {orderFiltersList.map((f) => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f)}
                  className={`text-[10px] px-3.5 py-1.5 rounded-full border transition-all ${
                    orderFilter === f
                      ? 'bg-cream text-black border-transparent font-bold'
                      : 'bg-surface-dark border-cream/5 text-gray-400 hover:text-cream'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Orders Table layout */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-cream/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-surface-dark border-b border-cream/10 text-gray-500 uppercase font-semibold select-none">
                      <th className="p-4">Customer</th>
                      <th className="p-4">Service Required</th>
                      <th className="p-4">Billing Rate</th>
                      <th className="p-4">Gateway</th>
                      <th className="p-4">State</th>
                      <th className="p-4 text-right">Actions Pipeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-gray-500 font-light">
                          No order pipeline records found.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order._id || order.id} className="border-b border-cream/5 hover:bg-surface-dark/15 transition-colors">
                          <td className="p-4 font-bold text-cream">
                            {order.customerName}
                            <span className="block text-[9px] text-gray-500 mt-0.5 select-all">{order._id || order.id}</span>
                          </td>
                          <td className="p-4 font-light text-cream-light max-w-xs">
                            <span className="text-[10px] text-cream-dark uppercase tracking-widest font-bold block mb-0.5">
                              {order.serviceName} ({order.tier})
                            </span>
                            <span className="truncate block italic text-gray-500">"{order.requirements}"</span>
                          </td>
                          <td className="p-4 font-bold text-cream">${order.price}</td>
                          <td className="p-4 text-cream-dark font-medium">{order.paymentMethod}</td>
                          <td className="p-4">
                            <span className={`text-[9px] font-bold border px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                            {order.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(order._id || order.id || '', 'Accepted')}
                                  className="bg-cream hover:bg-cream-light text-black font-semibold text-[10px] py-1 px-3 rounded-full flex-inline items-center gap-0.5"
                                  title="Approve Specifications"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => setTerminatingOrder(order)}
                                  className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-[10px] py-1 px-3 rounded-full flex-inline items-center gap-0.5"
                                  title="Decline/Terminate commission"
                                >
                                  Decline
                                </button>
                              </>
                            )}

                            {order.status === 'Accepted' && (
                              <button
                                onClick={() => handleUpdateStatus(order._id || order.id || '', 'In Progress')}
                                className="bg-amber-400 hover:bg-amber-500 text-black font-semibold text-[10px] py-1 px-3 rounded-full"
                              >
                                Start Production
                              </button>
                            )}

                            {order.status === 'In Progress' && (
                              <button
                                onClick={() => handleUpdateStatus(order._id || order.id || '', 'Completed')}
                                className="bg-emerald-400 hover:bg-emerald-500 text-black font-semibold text-[10px] py-1 px-3 rounded-full"
                              >
                                Deliver Assets
                              </button>
                            )}

                            {['Completed', 'Cancelled'].includes(order.status) && (
                              <span className="text-[10px] text-gray-600 block pr-4">Pipeline Terminal</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Review Moderator */}
        {activeSubTab === 'reviews' && (
          <motion.div variants={itemVariants} className="glass-panel rounded-2xl overflow-hidden border border-cream/10">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-surface-dark border-b border-cream/10 text-gray-500 uppercase font-semibold">
                  <th className="p-4">Customer User</th>
                  <th className="p-4">Star Rating</th>
                  <th className="p-4">Testimonial comments</th>
                  <th className="p-4 text-right">Moderator Controls</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-500 font-light">
                      No customer reviews logged.
                    </td>
                  </tr>
                ) : (
                  reviews.map((rev) => (
                    <tr key={rev._id || rev.id} className="border-b border-cream/5 hover:bg-surface-dark/15 transition-colors">
                      <td className="p-4 font-bold text-cream">{rev.userName}</td>
                      <td className="p-4">
                        <div className="flex gap-0.5 text-yellow-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} size={10} fill="#eab308" stroke="#eab308" />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-light text-gray-400 max-w-md italic">"{rev.comments}"</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteReview(rev._id || rev.id || '')}
                          className="text-rose-400 hover:text-rose-300 p-1 hover:bg-rose-500/10 rounded-full transition-colors inline-flex"
                          title="Purge review"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Tab 3: Ledger Transactions list */}
        {activeSubTab === 'payments' && (
          <motion.div variants={itemVariants} className="glass-panel rounded-2xl overflow-hidden border border-cream/10">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-surface-dark border-b border-cream/10 text-gray-500 uppercase font-semibold">
                  <th className="p-4">Order Ref ID</th>
                  <th className="p-4">Gateway</th>
                  <th className="p-4">Transacted Amount</th>
                  <th className="p-4">Verification proof</th>
                  <th className="p-4 text-right">Auditor Seal</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-500 font-light">
                      No ledger transactions compiled.
                    </td>
                  </tr>
                ) : (
                  payments.map((pay) => (
                    <tr key={pay._id} className="border-b border-cream/5 hover:bg-surface-dark/15 transition-colors">
                      <td className="p-4 font-mono font-bold text-cream select-all">{pay.orderId}</td>
                      <td className="p-4 text-cream-dark font-medium">{pay.paymentMethod}</td>
                      <td className="p-4 font-bold text-cream">${pay.amount} USD</td>
                      <td className="p-4 font-mono text-gray-400 select-all max-w-xs truncate">
                        {pay.paymentMethod === 'Crypto' ? pay.txHash : `Card Ending **** ${pay.cardLast4}`}
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-[10px] text-emerald-400 bg-emerald-400/5 border border-emerald-400/20 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                          <ShieldCheck size={10} /> Escrow Verified
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>

      {/* Decline/Cancel reason modal pop-up */}
      {terminatingOrder && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div 
            onClick={() => setTerminatingOrder(null)}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm" 
          />
          <div className="relative glass-panel w-full max-w-md rounded-2xl p-6 border border-cream/15 shadow-2xl animate-fade-in space-y-6">
            <div className="text-center">
              <Ban className="text-rose-400 mx-auto mb-2" size={32} />
              <h4 className="text-base font-bold text-cream">Decline Escrow Commission</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                Atelier Termination Request
              </p>
            </div>
            <form onSubmit={handleDeclineOrder} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 uppercase font-semibold">Reason for Declining Commission</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail technical grounds (retopologies overflow, resource constraints, incorrect brief specifications) for termination..."
                  value={declineReason}
                  onChange={e => setDeclineReason(e.target.value)}
                  className="w-full bg-black border border-cream/10 rounded-lg p-2.5 text-xs text-cream-light outline-none resize-none focus:border-cream/35"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTerminatingOrder(null)}
                  className="flex-1 bg-surface-dark border border-cream/10 text-cream text-xs font-semibold py-2.5 rounded-full"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-rose-500 text-white text-xs font-semibold py-2.5 rounded-full hover:bg-rose-600 transition-colors"
                >
                  Confirm Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
