"use client";

import { useState } from "react";
import { createTestimonial } from "@/lib/firebase-utils";

interface TestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TestimonialDialog({ isOpen, onClose }: TestimonialDialogProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await createTestimonial({
        name,
        text,
        rating,
        status: 'pending',
        date: new Date().toISOString(),
        featured: false
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      setError("Failed to submit testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setText("");
    setRating(5);
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={handleClose}></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-lg overflow-hidden p-8 md:p-12">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-charcoal/20 hover:text-charcoal transition-colors p-2 hover:bg-charcoal/5 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {!submitted ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-3xl font-awesome-serif text-charcoal uppercase tracking-wider mb-2">Share Your Story</h2>
                <p className="text-charcoal/60 text-sm font-medium">Your experience can help others find their path to clarity.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                  <p className="text-red-800 text-xs font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-charcoal/40 mb-2 uppercase tracking-widest">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-3.5 bg-background border border-charcoal/5 rounded-2xl focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none transition-all text-sm font-medium"
                    placeholder="E.g. Ananya Sharma"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-charcoal/40 mb-2 uppercase tracking-widest">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-transform active:scale-90"
                      >
                        <svg
                          className={`w-8 h-8 ${star <= rating ? 'text-[#DDA74A]' : 'text-charcoal/10'} fill-current`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-charcoal/40 mb-2 uppercase tracking-widest">Your Message</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    className="w-full px-5 py-3.5 bg-background border border-charcoal/5 rounded-2xl focus:ring-2 focus:ring-teal/20 focus:border-teal outline-none transition-all text-sm font-medium resize-none"
                    placeholder="Tell us about your journey with Mantrana..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal text-white py-4 rounded-2xl font-bold hover:bg-teal/90 disabled:opacity-50 transition-all text-xs uppercase tracking-[0.2em] shadow-lg shadow-teal/20"
                >
                  {isSubmitting ? "Submitting..." : "Send Testimonial"}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-awesome-serif text-charcoal uppercase mb-4">Thank You!</h2>
              <p className="text-charcoal/60 text-sm font-medium mb-10">Your testimonial has been submitted for review. We appreciate you sharing your experience!</p>
              <button
                onClick={handleClose}
                className="px-10 py-4 bg-charcoal text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
