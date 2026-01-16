import { useState, useEffect } from "react";
import {
  Heart,
  Activity,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Play,
  Users,
  Award,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function HeroSectionSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedText, setAnimatedText] = useState("");
  const fullTexts = [
    "Prevent Heart Disease",
    "Predict Cardiovascular Risk",
    "Personalize Heart Health",
    "Protect Your Future",
  ];

  // Slides data
  const slides = [
    {
      id: 1,
      title: "AI-Powered Heart Health",
      subtitle: "Advanced Cardiovascular Risk Assessment",
      description:
        "Our machine learning algorithms analyze your health data to provide accurate heart disease risk predictions.",
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
      stats: [
        { label: "Accuracy", value: "95%", icon: TrendingUp },
        { label: "Response Time", value: "< 2 min", icon: Clock },
      ],
    },
    {
      id: 2,
      title: "Early Detection Saves Lives",
      subtitle: "Catch Risks Before Symptoms Appear",
      description:
        "Identify potential cardiovascular issues years in advance with our predictive analytics platform.",
      icon: Shield,
      color: "from-emerald-500 to-teal-500",
      stats: [
        { label: "Early Detection", value: "5-10 Years", icon: Award },
        { label: "Users Protected", value: "50k+", icon: Users },
      ],
    },
    {
      id: 3,
      title: "Personalized Prevention Plans",
      subtitle: "Your Custom Heart Health Strategy",
      description:
        "Receive tailored recommendations based on your unique risk factors and health profile.",
      icon: Heart,
      color: "from-rose-500 to-pink-500",
      stats: [
        { label: "Success Rate", value: "89%", icon: CheckCircle },
        { label: "Risk Reduction", value: "Up to 60%", icon: Zap },
      ],
    },
  ];

  // Text typing animation
  useEffect(() => {
    const text = fullTexts[currentSlide];
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= text.length) {
        setAnimatedText(text.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentSlide]);

  // Auto slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handle slide change
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Hearts */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <Heart size={40 + Math.random() * 60} />
          </div>
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px]" />

        {/* Pulse Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 animate-ping-slow">
              <div
                className={`w-96 h-96 rounded-full bg-gradient-to-r ${currentSlideData.color} opacity-20 blur-3xl`}
              />
            </div>
            <div className="w-64 h-64 rounded-full bg-gradient-to-r from-white/10 to-transparent border border-white/10 backdrop-blur-sm flex items-center justify-center">
              <Icon className="w-32 h-32 text-white/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full animate-fade-in">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">
                HIPAA Compliant • Medical Grade
              </span>
            </div>

            {/* Title with Animation */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block">Your Heart's</span>
                <span className="block">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                    Digital Guardian
                  </span>
                </span>
              </h1>

              {/* Animated Subtitle */}
              <div className="h-20">
                <div className="text-2xl lg:text-3xl font-semibold text-white/90">
                  <span className="inline-block min-w-[400px]">
                    {animatedText}
                    <span className="inline-block w-[2px] h-8 bg-white animate-pulse ml-1"></span>
                  </span>
                </div>
                <p className="text-lg text-white/70 mt-4 max-w-2xl">
                  {currentSlideData.description}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {currentSlideData.stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${currentSlideData.color}`}
                      >
                        <StatIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-sm text-white/70">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-3 animate-bounce-in">
                Start Free Assessment
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-white/80">FDA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-white/80">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-white/80">50,000+ Users</span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Slider */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Slide Content */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${currentSlideData.color}`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {currentSlideData.title}
                      </h3>
                      <p className="text-white/70">
                        {currentSlideData.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="text-white/50">
                    0{currentSlide + 1}/0{slides.length}
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        index === currentSlide ? "bg-white" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>

                {/* Feature List */}
                <div className="space-y-4">
                  {[
                    "Real-time Risk Analysis",
                    "Personalized Insights",
                    "Doctor Integration",
                    "Continuous Monitoring",
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 group cursor-pointer"
                      onClick={() => goToSlide(index % slides.length)}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          index === currentSlide
                            ? currentSlideData.color
                                .replace("from-", "bg-")
                                .split(" ")[0]
                            : "bg-white/30"
                        } group-hover:scale-125 transition-transform`}
                      />
                      <span
                        className={`text-lg ${
                          index === currentSlide
                            ? "text-white font-medium"
                            : "text-white/60"
                        } group-hover:text-white transition-colors`}
                      >
                        {feature}
                      </span>
                      {index === currentSlide && (
                        <ArrowRight className="w-4 h-4 text-white/50 ml-auto animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Interactive Demo */}
                <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-medium">
                      Live Risk Simulation
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-green-400">Live</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-white/80">
                      <span>Heart Rate Variability</span>
                      <span className="font-mono">78.4 ms</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${currentSlideData.color} transition-all duration-1000`}
                        style={{ width: `${70 + currentSlide * 15}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/50 text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-scroll {
          animation: scroll 1.5s infinite;
        }

        .bg-grid-white\/5 {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
        }
      `}</style>
    </section>
  );
}
