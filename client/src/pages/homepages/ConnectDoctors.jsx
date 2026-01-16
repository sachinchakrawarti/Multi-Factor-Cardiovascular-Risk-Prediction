import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Video,
  Calendar,
  CheckCircle,
  Stethoscope,
  Heart,
} from "lucide-react";

export default function ConnectDoctors() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Dummy Doctors Data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Cardiologist",
      experience: "15+ years",
      rating: 4.9,
      reviews: 1247,
      image: "👩‍⚕️",
      available: "Online Now",
      nextAvailable: "Today, 2:30 PM",
      hospital: "Johns Hopkins Hospital",
      location: "Baltimore, MD",
      education: "Harvard Medical School",
      languages: ["English", "Mandarin"],
      isVerified: true,
      consultationFee: "$299",
      insurance: ["Aetna", "BlueCross", "UnitedHealth"],
      expertise: ["Heart Failure", "Arrhythmia", "Preventive Cardiology"],
    },
    {
      id: 2,
      name: "Dr. Marcus Johnson",
      specialty: "Interventional Cardiologist",
      experience: "12+ years",
      rating: 4.8,
      reviews: 892,
      image: "👨‍⚕️",
      available: "Available in 1 hour",
      nextAvailable: "Today, 4:00 PM",
      hospital: "Mayo Clinic",
      location: "Rochester, MN",
      education: "Stanford University",
      languages: ["English", "Spanish"],
      isVerified: true,
      consultationFee: "$349",
      insurance: ["Cigna", "Humana", "Medicare"],
      expertise: ["Angioplasty", "Stent Placement", "Cardiac Catheterization"],
    },
    {
      id: 3,
      name: "Dr. Aisha Patel",
      specialty: "Cardiac Electrophysiologist",
      experience: "10+ years",
      rating: 4.7,
      reviews: 654,
      image: "👩‍⚕️",
      available: "Online Now",
      nextAvailable: "Today, 3:15 PM",
      hospital: "Cleveland Clinic",
      location: "Cleveland, OH",
      education: "Yale School of Medicine",
      languages: ["English", "Hindi", "Gujarati"],
      isVerified: true,
      consultationFee: "$399",
      insurance: ["Aetna", "BlueCross", "Medicaid"],
      expertise: ["Heart Rhythm Disorders", "Pacemakers", "Defibrillators"],
    },
    {
      id: 4,
      name: "Dr. Robert Kim",
      specialty: "Preventive Cardiologist",
      experience: "18+ years",
      rating: 4.9,
      reviews: 1563,
      image: "👨‍⚕️",
      available: "Tomorrow, 9:00 AM",
      nextAvailable: "Tomorrow",
      hospital: "Massachusetts General",
      location: "Boston, MA",
      education: "Johns Hopkins University",
      languages: ["English", "Korean"],
      isVerified: true,
      consultationFee: "$279",
      insurance: ["UnitedHealth", "Cigna", "Aetna"],
      expertise: ["Risk Assessment", "Lifestyle Medicine", "Lipid Disorders"],
    },
    {
      id: 5,
      name: "Dr. Elena Rodriguez",
      specialty: "Pediatric Cardiologist",
      experience: "14+ years",
      rating: 4.8,
      reviews: 723,
      image: "👩‍⚕️",
      available: "Online Now",
      nextAvailable: "Today, 1:45 PM",
      hospital: "Children's Hospital",
      location: "Philadelphia, PA",
      education: "University of Pennsylvania",
      languages: ["English", "Spanish", "Portuguese"],
      isVerified: true,
      consultationFee: "$329",
      insurance: ["BlueCross", "Humana", "Tricare"],
      expertise: [
        "Congenital Heart Disease",
        "Pediatric Echo",
        "Fetal Cardiology",
      ],
    },
    {
      id: 6,
      name: "Dr. David Wilson",
      specialty: "Cardiac Surgeon",
      experience: "20+ years",
      rating: 4.9,
      reviews: 1987,
      image: "👨‍⚕️",
      available: "Consultation Only",
      nextAvailable: "Next Week",
      hospital: "Texas Heart Institute",
      location: "Houston, TX",
      education: "Duke University",
      languages: ["English"],
      isVerified: true,
      consultationFee: "$499",
      insurance: ["All Major Providers"],
      expertise: ["Bypass Surgery", "Valve Repair", "Heart Transplants"],
    },
  ];

  const slidesToShow = 3;

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === doctors.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? doctors.length - slidesToShow : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, currentSlide]);

  const handleBookAppointment = (doctorId) => {
    alert(`Booking appointment with Doctor ID: ${doctorId}`);
    // In real app: navigate to booking page or open modal
  };

  const handleEmergencyCall = () => {
    alert(
      "🚨 Emergency services contacted! Please call 911 for immediate assistance."
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Stethoscope className="w-4 h-4" />
            <span className="font-medium">Expert Cardiology Care</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Connect With Leading Cardiologists
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get personalized cardiovascular risk assessment and consultation
            from board-certified cardiologists using our AI-powered predictions
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="mb-12 bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-red-900">Cardiac Emergency?</h3>
                <p className="text-red-700 text-sm">
                  If experiencing chest pain, shortness of breath, or other
                  heart attack symptoms
                </p>
              </div>
            </div>
            <button
              onClick={handleEmergencyCall}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Emergency: 911
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-200 w-12 h-12 rounded-full shadow-lg hover:bg-blue-50 transition flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-200 w-12 h-12 rounded-full shadow-lg hover:bg-blue-50 transition flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Slider Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / slidesToShow)
                }%)`,
              }}
            >
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="px-3"
                  style={{ minWidth: `${100 / slidesToShow}%` }}
                >
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                    {/* Doctor Header */}
                    <div className="p-6 border-b">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{doctor.image}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-bold text-gray-900">
                                {doctor.name}
                              </h3>
                              {doctor.isVerified && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                            <p className="text-blue-600 font-medium">
                              {doctor.specialty}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {doctor.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-bold">{doctor.rating}</span>
                            <span className="text-gray-500 text-sm">
                              ({doctor.reviews})
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
                            <Clock className="w-3 h-3" />
                            <span>{doctor.available}</span>
                          </div>
                        </div>
                      </div>

                      {/* Hospital & Education */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>{doctor.hospital}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Exp:</span>
                          <span>{doctor.experience}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expertise & Details */}
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Areas of Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {doctor.expertise.slice(0, 3).map((area, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>

                      {/* Insurance */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Accepts Insurance
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.insurance.slice(0, 3).map((ins, idx) => (
                            <span
                              key={idx}
                              className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs"
                            >
                              {ins}
                            </span>
                          ))}
                          {doctor.insurance.length > 3 && (
                            <span className="text-gray-500 text-xs">
                              +{doctor.insurance.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.languages.map((lang, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Consultation Fee */}
                      <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-600">
                            Consultation Fee
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {doctor.consultationFee}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Next Available
                          </p>
                          <p className="font-medium text-gray-900">
                            {doctor.nextAvailable}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleBookAppointment(doctor.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Book Appointment
                        </button>
                        <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Message
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2">
                          <Video className="w-4 h-4" />
                          Video Call
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: doctors.length - slidesToShow + 1 }).map(
            (_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition ${
                  idx === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            )
          )}
        </div>

        {/* Auto-play Toggle */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <div
              className={`w-8 h-4 rounded-full transition ${
                autoPlay ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition ${
                  autoPlay ? "translate-x-4" : ""
                }`}
              />
            </div>
            Auto-play {autoPlay ? "On" : "Off"}
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <p className="text-gray-600">Board Certified Cardiologists</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
            <p className="text-gray-600">Successful Consultations</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-gray-600">Emergency Support</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
            <p className="text-gray-600">Patient Satisfaction</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-1">
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Take Control of Your Heart Health?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our cardiologists can help interpret your CVD risk results and
                create a personalized prevention plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition">
                  Find Your Cardiologist
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition">
                  Take Risk Assessment First
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
