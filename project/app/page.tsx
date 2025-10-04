'use client';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Section } from '@/components/Section';
import { FAQ } from '@/components/FAQ';
import { ApplicationForm } from '@/components/ApplicationForm';
import { FloatingApplyButton } from '@/components/FloatingApplyButton';
import { useEffect, useState } from 'react';

const trustBadges = [
  { icon: '🏠', text: 'Remote & Flexible' },
  { icon: '💰', text: 'Paid Weekly' },
  { icon: '✨', text: 'Little Experience Needed' },
  { icon: '📚', text: 'Training Provided' },
];

const features = [
  {
    title: 'Friendly team',
    description: 'We keep things simple and supportive.',
    icon: '💕',
  },
  {
    title: 'Clear playbook',
    description: 'You\'ll get templates & a step-by-step guide.',
    icon: '📋',
  },
  {
    title: 'Flexible hours',
    description: 'Post around your life, not the other way around.',
    icon: '⏰',
  },
];

const steps = [
  {
    number: '01',
    title: 'Apply',
    description: 'Share your details & IG.',
  },
  {
    number: '02', 
    title: 'Quick chat',
    description: 'We\'ll DM or text you.',
  },
  {
    number: '03',
    title: 'Start',
    description: 'Get your mini-playbook & begin posting.',
  },
];

const faqItems = [
  {
    question: 'Do I need experience?',
    answer: 'Just a good eye for content, the willingness to learn, and a creative mindset. Templates and training provided.',
  },
  {
    question: 'How many hours?',
    answer: 'Flexible; most do 3–4 hrs/day.',
  },
  {
    question: 'What\'s the pay?',
    answer: 'Competitive; weekly payouts; bonuses.',
  },
  {
    question: 'Is this remote?',
    answer: 'Yes, UK-based only.',
  },
  {
    question: 'What will I post?',
    answer: 'Instagram reels, feed posts, carousels, stories and threads. You\'ll take inspiration from competitors and trending content, following our brand guidelines and content calendar.',
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-lg">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center">
              <div className="relative">
                <div className="font-sans text-lg sm:text-xl font-medium text-pink-500 tracking-tight">
                  bloom
                </div>
                <div className="h-0.5 w-full bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 rounded-full mt-1"></div>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              {[
                ['About', 'about'],
                ['Role', 'role'],
                ['FAQs', 'faqs'],
                ['Apply', 'apply'],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-sm text-ink-600 hover:text-pink-500 transition-colors duration-200"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="md:hidden flex space-x-4">
              {[
                ['About', 'about'],
                ['Role', 'role'],
                ['Apply', 'apply'],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-xs text-ink-600 hover:text-pink-500 transition-colors duration-200"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center pt-16 pb-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-4 w-24 h-24 sm:w-32 sm:h-32 sm:left-10 bg-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-4 w-32 h-32 sm:w-40 sm:h-40 sm:right-10 bg-pink-300/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center relative z-10">
          {/* Main content card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-pink-100/50 p-6 sm:p-8 md:p-12 mx-auto max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center bg-pink-100 text-pink-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
              Now Hiring
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-ink-900 mb-4 sm:mb-6 font-manrope leading-tight">
              Turn your scroll time into side income.
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-ink-600 leading-relaxed max-w-lg mx-auto">
              We're hiring UK-based girls to post for social media clients on a part-time basis.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-10">
              <Button
                size="lg"
                onClick={() => scrollToSection('apply')}
                className="bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-600 hover:to-pink-500 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Apply in 60 seconds
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => scrollToSection('role')}
                className="border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50"
              >
                What you'll do
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center bg-gradient-to-b from-white to-pink-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-pink-100/50 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <span className="text-lg sm:text-2xl mb-1 sm:mb-2">{badge.icon}</span>
                  <span className="text-xs font-medium text-ink-700 text-center leading-tight">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-300/30 rounded-full blur-sm"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-pink-200/20 rounded-full blur-sm"></div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className="bg-gradient-to-b from-white to-pink-50/30">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink-900 mb-6 leading-tight">
            We're a social-first agency helping<br />
            creators & brands grow 🌸
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed text-ink-600 px-4">
            We help creators and brands grow with simple, consistent posting systems.<br />
            Now we're expanding our poster squad — and we want you on the team.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-xl sm:text-2xl">{feature.icon}</span>
              </div>
              <h3 className="font-manrope text-sm sm:text-base font-semibold text-ink-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Role Section */}
      <Section id="role" className="bg-pink-gradient">
        <div className="text-center mb-8">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-ink-900 mb-4">
            Social Media Poster (Part-Time, UK)
          </h2>
          <p className="text-xs sm:text-sm md:text-base mb-6 font-light leading-relaxed tracking-wide max-w-2xl mx-auto px-4">
            Join our friendly team of content creators! You'll be posting simple, engaging content<br />
            while following our proven playbook. Perfect for anyone looking to earn extra income<br />
            from a phone. 💖
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <Card>
              <h3 className="font-manrope text-xs sm:text-sm font-semibold text-ink-900 mb-2">
                You'll be:
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm text-ink-600">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Posting engaging content across Instagram & Threads
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Spotting trends early and riding the viral wave
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Following a simple daily checklist
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Keeping the brand aesthetic on-point (clean, girly, consistent)
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-manrope text-xs sm:text-sm font-semibold text-ink-900 mb-2">
                We provide:
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm text-ink-600">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Copy/paste templates
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Content calendar & prompts
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Quick video guides
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Support chat for questions
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-manrope text-xs sm:text-sm font-semibold text-ink-900 mb-2">
                Who it's for:
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm text-ink-600">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Girls, UK-based
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  18+
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  great for university students
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Friendly, consistent, good vibe
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-manrope text-xs sm:text-sm font-semibold text-ink-900 mb-2">
                Pay:
              </h3>
              <ul className="space-y-1 text-xs sm:text-sm text-ink-600">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Competitive hourly or per-post structure
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Weekly payouts
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span>
                  Bonuses for consistency
                </li>
              </ul>
            </Card>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-pink-50 border border-pink-200 rounded-xl px-3 py-1.5 mx-4">
              <span className="text-pink-500 mr-2">✨</span>
              <span className="text-xs text-pink-700 font-normal">Little previous experience required</span>
            </div>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section title="How It Works" className="bg-white">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-manrope text-sm sm:text-base font-bold text-pink-500">
                  {step.number}
                </span>
              </div>
              <h3 className="font-manrope text-xs sm:text-sm font-semibold text-ink-900 mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-600">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Vibe Gallery */}
      <Section className="bg-pink-gradient">
        <div className="text-center mb-4">
          <h2 className="text-ink-900 mb-4">
            The vibe ✨
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-medium">Clean, simple, social-friendly content</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-lg mx-auto px-4">
          {[
            '/_ (6).jpeg',
            '/6cc34658-88f9-4d36-9ce7-d91a7977b86f.jpeg',
            '/f43290f8-6e81-483c-acfc-d50e1c354945.jpeg',
            '/Credits to sakdrss.jpeg'
          ].map((imageUrl, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg sm:rounded-xl border border-pink-300/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={imageUrl}
                alt={`Lifestyle content ${i + 1}`}
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section id="faqs" title="FAQs" className="bg-white">
        <div className="max-w-3xl mx-auto">
          <FAQ items={faqItems} />
        </div>
      </Section>

      {/* Application Form */}
      {/* Meet Sophie Section */}
      <Section className="bg-white">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-6">
            <img
              src="/Screenshot 2025-09-29 at 23.32.15.png"
              alt="Sophie, Head of Social Strategy"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover object-center mx-auto shadow-lg border-4 border-pink-100"
            />
          </div>
          
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-ink-900 mb-3">
            Meet Sophie, our Head of Social Strategy at bloom
          </h2>
          
          <p className="text-sm sm:text-base text-ink-600 leading-relaxed px-4">
            Sophie leads our content strategy and will be your go-to person for guidance. 
            She's passionate about helping creators turn their social media skills into income 
            and will support you every step of the way.
          </p>
        </div>
      </Section>

      <Section id="apply" title="Apply in 60 seconds" className="bg-pink-gradient">
        <div className="max-w-xs sm:max-w-sm mx-auto">
          <div className="text-center mb-4">
            <p className="text-xs sm:text-sm md:text-base font-medium leading-snug px-4">
              Ready to turn your social media time into income? Let's get started! 🚀
            </p>
          </div>
          
          <Card className="shadow-lg">
            <ApplicationForm />
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-lg py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="font-sans text-base sm:text-lg font-medium text-pink-500 tracking-tight">
                  bloom
                </div>
                <div className="h-0.5 w-full bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 rounded-full mt-1"></div>
              </div>
              <span className="text-xs sm:text-sm text-ink-400">
                © Bloom. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Apply Button */}
      <FloatingApplyButton />
    </>
  );
}