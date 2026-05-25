import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Review } from '../types';
import { Loader2, Star, Plus, Quote, Trash2, Edit3, X, Check } from 'lucide-react';

const Reviews: React.FC = () => {
  const { user, token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Submission Form States
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Edit Form States
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComments, setEditComments] = useState('');

  const fallbackReviews: Review[] = [
    {
      _id: 'fall-rev-1',
      userId: 'mock-u-1',
      userName: 'Helena Vance',
      rating: 5,
      comments: 'flemlabs represents the absolute pinnacle of digital craftsmanship. The low-poly environment designs exceeded our expectations, and the cinematic aesthetics matched our high-end game vision perfectly. Simply unmatched.',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'fall-rev-2',
      userId: 'mock-u-2',
      userName: 'Kaelen Thorne',
      rating: 5,
      comments: 'The anime-style character renders were detailed and delivered days ahead of schedule. Their attention to lighting overlays and clean separations sets them apart as a true luxury digital art studio.',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'fall-rev-3',
      userId: 'mock-u-3',
      userName: 'Seraphina Vance',
      rating: 5,
      comments: 'Our streetwear brand has seen immediate attention since adopting flemlabs designs. The custom typography and vector layout illustrations are exceptionally premium.',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'fall-rev-4',
      userId: 'mock-u-4',
      userName: 'Aria Chen',
      rating: 5,
      comments: "The volume rendering simulations flemlabs created for our cinematic trailer were absolute art. No generic presets, just pure hand-crafted dynamics that made our launch video pop. Literally the easiest project integration we've ever done.",
      createdAt: new Date().toISOString()
    },
    {
      _id: 'fall-rev-5',
      userId: 'mock-u-5',
      userName: 'Lucas Sterling',
      rating: 5,
      comments: 'Collaborated with flemlabs on our limited-edition winter streetwear capsule. Their typography pacing and vector layout compositions are incredibly clean. Complete escrow transparency made the entire commission process a breeze.',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'fall-rev-6',
      userId: 'mock-u-6',
      userName: 'Nadia Petrov',
      rating: 5,
      comments: "Honestly, their custom 3D character rigs are top-tier. Mesh topology was perfectly clean, retopologies were optimized for Unreal Engine, and the blendshapes are incredibly expressive. They are our go-to studio now.",
      createdAt: new Date().toISOString()
    }
  ];

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) setReviews(data);
        else setReviews(fallbackReviews);
      } else {
        setReviews(fallbackReviews);
      }
    } catch (err) {
      setReviews(fallbackReviews);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, comments })
      });

      if (response.ok) {
        setComments('');
        setRating(5);
        setShowForm(false);
        fetchReviews();
      }
    } catch (err) {
      console.error('Submit review failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (rev: Review) => {
    setEditingReviewId(rev._id || rev.id || null);
    setEditRating(rev.rating);
    setEditComments(rev.comments);
  };

  const handleUpdateReview = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating: editRating, comments: editComments })
      });

      if (response.ok) {
        setEditingReviewId(null);
        fetchReviews();
      }
    } catch (err) {
      console.error('Update review error:', err);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to remove your testimonial?')) return;

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchReviews();
      }
    } catch (err) {
      console.error('Delete review error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-cream" size={40} />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12">
      <motion.div
        className="max-w-6xl mx-auto w-full space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-cream/10 pb-8">
          <div>
            <span className="text-[10px] text-cream uppercase font-bold tracking-[0.3em] block">
              client satisfaction ledger
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mt-2">
              Verified Testimonials.
            </h2>
            <p className="text-xs text-gray-500 font-light mt-1 max-w-sm">
              Read accounts of commission assets delivered to creative agencies.
            </p>
          </div>

          {user && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-cream hover:bg-cream-light text-black font-semibold text-xs px-5 py-3 rounded-full flex items-center gap-1 shadow-[0_4px_15px_rgba(222,219,200,0.15)] transition-all duration-300"
            >
              <Plus size={14} />
              Submit Studio Review
            </button>
          )}
        </motion.div>

        {/* Create Review Form Overlay */}
        {showForm && user && (
          <div className="glass-panel p-6 rounded-2xl border border-cream/15 w-full max-w-xl mx-auto animate-fade-in space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-cream/10">
              <span className="text-xs font-bold text-cream uppercase tracking-widest">
                Log New Testimonial
              </span>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-cream">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleCreateReview} className="space-y-4">
              {/* Star selector */}
              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 uppercase font-semibold block">Select rating star level</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-yellow-400 hover:scale-110 transition-transform p-0.5"
                    >
                      <Star size={20} fill={star <= rating ? '#eab308' : 'none'} stroke={star <= rating ? '#eab308' : 'rgba(222, 219, 200, 0.4)'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comments text area */}
              <div className="space-y-1">
                <label className="text-[9px] text-gray-500 uppercase font-semibold block">Your Experience Review</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail your experience, model integrations, response speed, or layout designs..."
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                  className="w-full bg-black border border-cream/10 rounded-lg p-3 text-xs text-cream-light focus:border-cream/35 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-cream hover:bg-cream-light text-black text-xs font-bold py-2.5 px-6 rounded-full"
                >
                  {submitting ? 'Logging...' : 'Publish Testimonial'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Testimonials Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {reviews.map((rev) => {
            const isEditing = editingReviewId === (rev._id || rev.id);
            const isOwner = user && rev.userId === user.id;

            return (
              <div
                key={rev._id || rev.id}
                className="glass-panel p-6 rounded-3xl border border-cream/10 relative hover:border-cream/20 transition-all duration-300 space-y-4"
              >
                <Quote className="absolute top-6 right-6 text-cream/5" size={40} />

                {/* Edit Form Toggle */}
                {isEditing ? (
                  <form onSubmit={(e) => handleUpdateReview(e, rev._id || rev.id || '')} className="space-y-4 animate-fade-in">
                    <div className="space-y-1">
                      <label className="text-[8px] text-gray-500 uppercase block font-semibold">Stars Level</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setEditRating(star)}
                            className="text-yellow-400 p-0.5"
                          >
                            <Star size={16} fill={star <= editRating ? '#eab308' : 'none'} stroke={star <= editRating ? '#eab308' : 'rgba(222,219,200,0.4)'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] text-gray-500 uppercase block font-semibold">Modify Comments</label>
                      <textarea
                        required
                        rows={3}
                        value={editComments}
                        onChange={e => setEditComments(e.target.value)}
                        className="w-full bg-black border border-cream/10 rounded-lg p-2.5 text-xs text-cream-light outline-none resize-none focus:border-cream/35"
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setEditingReviewId(null)}
                        className="bg-surface-dark border border-cream/10 text-cream text-[10px] py-1.5 px-4 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-cream text-black text-[10px] font-bold py-1.5 px-4 rounded-full flex items-center gap-1"
                      >
                        <Check size={10} /> Save Edits
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Standard review display card */
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-cream">{rev.userName}</h4>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                          Commission Customer
                        </span>
                      </div>
                      
                      {/* Rating Stars */}
                      <div className="flex gap-0.5 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, sIdx) => (
                          <Star 
                            key={sIdx} 
                            size={12} 
                            fill={sIdx < rev.rating ? '#eab308' : 'none'} 
                            stroke={sIdx < rev.rating ? '#eab308' : 'rgba(222, 219, 200, 0.25)'}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial comments */}
                    <p className="text-xs text-gray-400 leading-relaxed font-light font-serif italic text-cream-dark">
                      "{rev.comments}"
                    </p>

                    {/* Footer / Actions */}
                    <div className="flex justify-between items-center text-[9px] text-gray-500 border-t border-cream/5 pt-3">
                      <span>Logged: {new Date(rev.createdAt).toLocaleDateString()}</span>
                      
                      {/* Owner CRUD edit/delete buttons */}
                      {isOwner && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEditClick(rev)}
                            className="text-gray-400 hover:text-cream flex items-center gap-0.5 transition-colors"
                          >
                            <Edit3 size={11} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReview(rev._id || rev.id || '')}
                            className="text-rose-400 hover:text-rose-300 flex items-center gap-0.5 transition-colors"
                          >
                            <Trash2 size={11} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Reviews;
