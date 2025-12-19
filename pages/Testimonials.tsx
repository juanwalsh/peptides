import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  institution: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "I came because of a recommendation from a TikToker and the thing really works. Thanks for not sending a bomb. It arrived very fast. I'm from Kuwait",
    author: "Omar",
    role: "Verified Customer",
    institution: "Kuwait",
    image: "https://i.ibb.co/MyGqKwtS/Whats-App-Image-2025-10-23-at-13-50-54-1.jpg"
  },
  {
    id: 2,
    quote: "I found this site through looksmaxing.org, they said it was cheap and that it arrived fast and shipped to almost the whole world. It arrived pretty fast. I'm from Kuwait and it took around 19 days",
    author: "Omar",
    role: "Verified Customer",
    institution: "Kuwait",
    image: "https://i.ibb.co/Kx8vV0Zk/Whats-App-Image-2025-10-23-at-13-50-54.jpg"
  },
  {
    id: 3,
    quote: "Second time buying from here, now it's time to height max",
    author: "Phoebe",
    role: "Returning Customer",
    institution: "Sweden",
    image: "https://i.ibb.co/bgR0WNVN/Whats-App-Image-2025-10-23-at-13-50-53.jpg"
  }
];

const TestimonialsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-carbon-950 text-white overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <span className="font-mono text-xs text-signal-400 uppercase tracking-[0.2em] mb-6 block">
            Trusted by Researchers Worldwide
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium leading-tight mb-6">
            What Our Partners <br/>
            <span className="text-carbon-400">Are Saying.</span>
          </h1>
          <p className="text-xl text-carbon-300 font-light max-w-2xl leading-relaxed">
            Feedback from research institutions and laboratories that trust BioSynth
            for their critical research applications.
          </p>
        </div>
      </section>

      {/* Testimonials Carousel with Images */}
      <section className="py-20 md:py-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="relative">
            {/* Main Carousel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                {/* Image Container with transition */}
                <div className="relative w-full h-full overflow-hidden bg-carbon-100">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === activeIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'
                      }`}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-carbon-900/30 to-transparent" />
                    </div>
                  ))}
                </div>

                {/* Decorative Frame */}
                <div className="absolute -inset-4 border border-carbon-200 -z-10" />
                <div className="absolute -inset-8 border border-carbon-100 -z-20" />

                {/* Image Indicators */}
                <div className="absolute -bottom-12 left-0 right-0 flex justify-center space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? 'bg-signal-500 w-8'
                          : 'bg-carbon-300 hover:bg-carbon-400'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Quote Side */}
              <div className="lg:pl-8">
                <Quote className="w-12 h-12 text-signal-200 mb-8" />

                {/* Quote with transition */}
                <div className="relative min-h-[280px]">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className={`transition-all duration-500 ${
                        index === activeIndex
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                      }`}
                    >
                      <blockquote className="text-2xl md:text-3xl font-display font-light text-carbon-900 leading-relaxed mb-8">
                        "{testimonial.quote}"
                      </blockquote>

                      <div className="border-t border-carbon-200 pt-6">
                        <p className="font-display text-xl font-medium text-carbon-900 mb-1">
                          {testimonial.author}
                        </p>
                        <p className="text-carbon-600 mb-1">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-carbon-400 font-mono">
                          {testimonial.institution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center space-x-4 mt-8">
                  <button
                    onClick={prevTestimonial}
                    className="w-12 h-12 flex items-center justify-center border border-carbon-300 hover:border-carbon-900 hover:bg-carbon-900 hover:text-white transition-all"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-12 h-12 flex items-center justify-center border border-carbon-300 hover:border-carbon-900 hover:bg-carbon-900 hover:text-white transition-all"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="font-mono text-sm text-carbon-400 ml-4">
                    {activeIndex + 1} / {testimonials.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="hidden lg:flex justify-center mt-20 space-x-6">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => goToSlide(index)}
                  className={`relative w-24 h-24 overflow-hidden transition-all duration-300 ${
                    index === activeIndex
                      ? 'ring-2 ring-signal-500 ring-offset-4'
                      : 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0'
                  }`}
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-carbon-50 border-t border-carbon-200 py-20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-medium text-carbon-900 mb-4">
            Ready to experience the difference?
          </h2>
          <p className="text-carbon-600 mb-8 max-w-xl mx-auto">
            Join hundreds of research institutions that trust BioSynth for their critical peptide and reagent needs.
          </p>
          <a
            href="/catalog"
            className="inline-flex items-center space-x-2 bg-carbon-900 hover:bg-signal-600 text-white px-8 py-4 font-mono text-sm uppercase tracking-wider transition-colors"
          >
            <span>Explore Our Catalog</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
