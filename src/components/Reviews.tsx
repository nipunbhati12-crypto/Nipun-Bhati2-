import React, { useState } from 'react';
import { Star, Check, PenTool, ThumbsUp, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  initialReviews: Review[];
}

export default function Reviews({ initialReviews }: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null);
  
  // Review form states
  const [writeMode, setWriteMode] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  // Filter reviews by selected rating filter
  const filteredReviews = selectedRatingFilter 
    ? reviews.filter((r) => r.rating === selectedRatingFilter)
    : reviews;

  // Star counters breakdown
  const starCounts = [5, 4, 3, 2, 1].map((star) => {
    const qty = reviews.filter((r) => r.rating === star).length;
    const ratio = totalReviews > 0 ? (qty / totalReviews) * 100 : 0;
    return { star, qty, ratio };
  });

  const handleLikeReview = (id: string) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        return { ...rev, likes: rev.likes + 1 };
      }
      return rev;
    }));
  };

  const handleWriteReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newComment) return;

    const addedReview: Review = {
      id: "rev-new-" + Date.now(),
      author: newAuthor,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      title: newTitle,
      comment: newComment,
      verified: true,
      likes: 0
    };

    setReviews([addedReview, ...reviews]);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setWriteMode(false);
      setNewAuthor("");
      setNewRating(5);
      setNewTitle("");
      setNewComment("");
    }, 2500);
  };

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-black uppercase text-zinc-900 dark:text-white mb-2 leading-none">
            WHAT THE STREETS ARE SAYING
          </h2>
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            AUTHENTIC COMMODITIES TESTED BY ICONIC CULTURES
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Stats & Breakdown */}
          <div className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8 rounded-none border border-zinc-200 dark:border-zinc-800 self-start">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-zinc-850 dark:text-neutral-100 mb-4">
              Overall Rating Summary
            </h3>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-mono font-black text-zinc-900 dark:text-white">{averageRating}</span>
              <span className="text-zinc-400 text-sm">/ 5.0 rating</span>
            </div>

            {/* Overall stars display */}
            <div className="flex items-center gap-1.5 mb-6">
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={`${i < Math.floor(Number(averageRating)) ? "fill-yellow-500" : "text-zinc-300 dark:text-zinc-700 font-light"}`} 
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-500 font-mono">Based on {totalReviews} reviews</span>
            </div>

            {/* Progress Bars distribution list */}
            <div className="space-y-3 mb-6">
              {starCounts.map(({ star, qty, ratio }) => {
                const isCurrentFilter = selectedRatingFilter === star;
                return (
                  <button
                    key={star}
                    onClick={() => setSelectedRatingFilter(isCurrentFilter ? null : star)}
                    className={`w-full flex items-center gap-2 hover:bg-zinc-150/40 dark:hover:bg-zinc-800/40 p-1 rounded-none transition-all text-left ${
                      isCurrentFilter ? "ring-1 ring-[#E00000] bg-red-50/10" : ""
                    }`}
                  >
                    <span className="text-xs font-mono w-10 text-zinc-600 dark:text-zinc-400">{star} Stars</span>
                    <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-none overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: `${ratio}%` }} />
                    </div>
                    <span className="text-xs font-mono w-8 text-right text-zinc-550">{qty}</span>
                  </button>
                );
              })}
            </div>

            {selectedRatingFilter && (
              <button
                onClick={() => setSelectedRatingFilter(null)}
                className="w-full py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-xs font-display font-bold uppercase rounded-none transition-colors mb-4"
              >
                Clear Filter (* showing {selectedRatingFilter} stars)
              </button>
            )}

            <button
              onClick={() => setWriteMode(!writeMode)}
              className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black hover:bg-[#E00000] hover:text-white dark:hover:bg-[#E00000] dark:hover:text-white font-display font-black text-xs uppercase tracking-widest rounded-none transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <PenTool size={14} />
              Write A Product Review
            </button>
          </div>

          {/* Right Column: Reviews Grid / Form */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* WRITE REVIEW PANEL (Simulated Form toggle) */}
            {writeMode && (
              <div className="bg-zinc-50 dark:bg-zinc-900 border-2 border-dashed border-[#E00000]/60 p-6 rounded-none animate-fade-in mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-display font-black text-sm uppercase text-zinc-900 dark:text-white tracking-wider flex items-center gap-1.5">
                    <Sparkles size={16} className="text-[#E00000] animate-pulse" />
                    Share Your Denim Journey
                  </h4>
                  <button onClick={() => setWriteMode(false)} className="text-xs text-zinc-400 hover:text-red-500 font-mono">CANCEL</button>
                </div>

                {formSuccess ? (
                  <div className="py-8 text-center text-green-700 dark:text-green-400 font-semibold space-y-2 animate-bounce">
                    <Check className="mx-auto w-10 h-10 p-2 bg-green-100 rounded-none mb-2" />
                    <p>Review Submitted Successfully!</p>
                    <p className="text-xs font-mono text-zinc-405">Rendering details directly in timeline feed soon...</p>
                  </div>
                ) : (
                  <form onSubmit={handleWriteReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Your Alias/Name *</label>
                        <input
                          type="text"
                          required
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs focus:ring-1 focus:ring-[#E00000] focus:outline-none text-black dark:text-white"
                          placeholder="e.g. Maverick_501"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Rating Stars *</label>
                        <select
                          value={newRating}
                          onChange={(e) => setNewRating(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs focus:ring-1 focus:ring-[#E00000] focus:outline-none font-bold text-yellow-500"
                        >
                          <option value="5">⭐⭐⭐⭐⭐ (5 Stars Excellent)</option>
                          <option value="4">⭐⭐⭐⭐ (4 Stars Good)</option>
                          <option value="3">⭐⭐⭐ (3 Stars Average)</option>
                          <option value="2">⭐⭐ (2 Stars Fair)</option>
                          <option value="1">⭐ (1 Star Bad)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Review Title Headline *</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs focus:ring-1 focus:ring-[#E00000] focus:outline-none text-black dark:text-white"
                        placeholder="e.g. Best Fitting Jeans I Have Owned!"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 uppercase mb-1">Detailed Story Message *</label>
                      <textarea
                        required
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-none text-xs focus:ring-1 focus:ring-[#E00000] focus:outline-none text-black dark:text-white"
                        placeholder="Detail how the denim sits, fabric stiffness, and true fit styling experience..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#E00000] text-white font-display font-black text-xs uppercase tracking-widest rounded-none hover:bg-neutral-900 transition-colors"
                      id="write-review-submit-btn"
                    >
                      POST TESTIMONIAL FEEDBACK
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* List columns */}
            {filteredReviews.length === 0 ? (
              <div className="py-12 text-center text-zinc-500">
                <p className="font-mono text-xs">No reviews matching {selectedRatingFilter} Star criteria.</p>
              </div>
            ) : (
              filteredReviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="p-6 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-105 dark:border-zinc-800/80 rounded-none flex flex-col justify-between hover:shadow-md transition-shadow"
                  id={`review-row-${rev.id}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-zinc-250 dark:bg-zinc-800 px-2 py-1 rounded-none text-zinc-800 dark:text-zinc-200">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/20 px-1.5 py-0.5 rounded-none">
                          <Check size={10} /> Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">{rev.date}</span>
                  </div>

                  {/* Rating Stars line */}
                  <div className="flex text-yellow-500 gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className={`${i < rev.rating ? "fill-yellow-500" : "text-zinc-200 dark:text-zinc-800"}`} 
                      />
                    ))}
                  </div>

                  <h4 className="font-display font-bold text-sm md:text-base text-zinc-900 dark:text-white mb-2 uppercase tracking-wide">
                    {rev.title}
                  </h4>

                  <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                    <button
                      onClick={() => handleLikeReview(rev.id)}
                      className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-405 hover:text-[#E00000] transition-colors"
                      id={`like-review-${rev.id}`}
                    >
                      <ThumbsUp size={11} />
                      Was this helpful? ({rev.likes})
                    </button>
                  </div>
                </div>
              ))
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
