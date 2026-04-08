/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Apple as AppleIcon, 
  ShoppingBag, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  CreditCard,
  Globe,
  Send,
  HelpCircle,
  CheckCircle2,
  Languages,
  Loader2,
  Lock,
  User,
  ArrowRight,
  Phone,
  Headphones,
  Upload,
  QrCode,
  Copy,
  Check,
  Plus,
  Minus,
  Star,
  Info
} from 'lucide-react';
import Modal from './components/Modal';

type Brand = 'google' | 'apple' | 'amazon';

interface Product {
  id: Brand;
  name: string;
  logo: ReactNode;
  color: string;
  bg: string;
  description: string;
}

const TESTIMONIALS = [
  {
    name: "Rahul S.",
    location: "Mumbai",
    rating: 5,
    comment: "Buying Google Play cards from BharatCards is so fast! Got my code instantly after contacting support. Very reliable service. ⚡",
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Anjali G.",
    location: "Delhi",
    rating: 5,
    comment: "BharatCards से गिफ्ट कार्ड खरीदना बहुत आसान है। पेमेंट के बाद कोड तुरंत मिल गया। बहुत ही भरोसेमंद प्लेटफॉर्म है। 🙏",
    avatar: "https://i.pravatar.cc/150?u=anjali"
  },
  {
    name: "Vikram K.",
    location: "Bangalore",
    rating: 5,
    comment: "Best rates for Apple gift cards. The support team is very helpful and the delivery is super quick. Highly recommended! 🚀",
    avatar: "https://i.pravatar.cc/150?u=vikram"
  },
  {
    name: "Priya D.",
    location: "Pune",
    rating: 5,
    comment: "मैंने यहाँ से अमेज़न वाउचर खरीदा, सर्विस बहुत तेज़ है। व्हाट्सएप पर बात करके सब कुछ जल्दी हो गया। बहुत अच्छा अनुभव! 😊",
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    name: "Amit P.",
    location: "Hyderabad",
    rating: 5,
    comment: "I was skeptical at first but BharatCards is 100% legit. Fast delivery and genuine codes every time. My go-to place now. ✅",
    avatar: "https://i.pravatar.cc/150?u=amit"
  },
  {
    name: "Suresh M.",
    location: "Chennai",
    rating: 5,
    comment: "सबसे अच्छी बात यह है कि यहाँ कोड असली मिलते हैं और डिलीवरी भी तुरंत होती है। बहुत बढ़िया सर्विस! 💎",
    avatar: "https://i.pravatar.cc/150?u=suresh"
  }
];

const CONTACTS = {
  tg1: { name: 'Telegram Representative 1', handle: '@mfdngf12345', url: 'https://t.me/mfdngf12345' },
  tg2: { name: 'Telegram Representative 2', handle: '@jiaaovo', url: 'https://t.me/jiaaovo' },
  ws1: { name: 'WhatsApp Representative 1', handle: '+852 9458 2125', url: 'https://wa.me/85294582125' },
  ws2: { name: 'WhatsApp Representative 2', handle: '+81 70-9416-2460', url: 'https://wa.me/817094162460' },
  tgChannel: { name: 'Telegram Channel', handle: 'GiftCardBonanza_123', url: 'https://t.me/GiftCardBonanza_123' }
};

const PRODUCTS: Product[] = [
  {
    id: 'google',
    name: 'Google Play',
    logo: (
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Google_Play_2022_logo.svg" 
        alt="Google Play" 
        className="w-full h-full object-contain" 
        referrerPolicy="no-referrer" 
      />
    ),
    color: 'text-blue-600',
    bg: 'bg-blue-500',
    description: 'Apps, Games & Movies'
  },
  {
    id: 'apple',
    name: 'Apple Store',
    logo: (
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
        alt="Apple" 
        className="w-full h-full object-contain" 
        referrerPolicy="no-referrer" 
      />
    ),
    color: 'text-gray-800',
    bg: 'bg-gray-800',
    description: 'Apps, Music & iCloud'
  },
  {
    id: 'amazon',
    name: 'Amazon India',
    logo: (
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
        alt="Amazon" 
        className="w-full h-full object-contain" 
        referrerPolicy="no-referrer" 
      />
    ),
    color: 'text-orange-600',
    bg: 'bg-orange-500',
    description: 'Shopping & Pay'
  }
];

const DENOMINATIONS = [100, 500, 1000, 2000, 3000];

const LANGUAGES = [
  { code: 'EN', name: 'EN' },
  { code: 'HI', name: 'हिंदी' }
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  EN: {
    heroTitle: 'Instant India Gift Cards',
    heroSubtitle: 'Official digital codes delivered in seconds.',
    heroHighlight: 'No hidden fees.',
    selectBrand: 'Select Brand',
    selected: 'Selected',
    completePurchase: 'Complete Your Purchase',
    emailLabel: 'Email for Delivery',
    payButton: 'Submit Payment Verification',
    secure: '100% Secure',
    autoDelivery: 'Auto-Delivery',
    verified: 'Verified Merchant',
    paymentTitle: 'Payment Instructions',
    upiIdLabel: 'Pay to UPI ID',
    usdtAddressLabel: 'Pay to USDT (TRC20) Address',
    selectPaymentMethod: 'Select Payment Method',
    uploadLabel: 'Upload Payment Screenshot',
    submitVerification: 'Submit for Verification',
    successTitle: 'Verification Submitted!',
    successSubtitle: 'Your payment is being verified. The gift card code(s) will be sent to your email within 5-10 minutes.',
    quantityLabel: 'Quantity',
    totalLabel: 'Total Amount',
    faqTitle: 'Frequently Asked Questions',
    q1: 'Are the gift cards you sell from reliable sources?',
    a1: 'Yes. All BharatCards gift cards are purchased through officially authorized channels. We guarantee that every card code is 100% new and unactivated, ensuring the safety of your funds.',
    q2: 'Why are your prices lower than the face value (5% off)?',
    a2: 'We pass the savings directly to our customers through bulk purchasing and optimized digital distribution processes. This allows you to enjoy the same face value at a more favorable price.',
    q3: 'Can these gift cards be used on accounts in other countries?',
    a3: 'No. The Google, Apple, and Amazon gift cards we currently sell are only for use with Indian region accounts. Please make sure your account region is set to India before redeeming.',
    q4: 'Can I apply for a refund if my account is not in the Indian region?',
    a4: 'Refunds are not accepted. Since gift cards are virtual digital products with uniqueness and immediacy, once the code is sent, we cannot sell it again. We are not responsible for the inability to redeem due to incorrect personal account region settings.',
    q5: 'How long after successful payment will I receive the code?',
    a5: 'Delivery is instantaneous! Our system is fully automated and operates 24/7. Your code will be issued immediately once the payment is confirmed by the network.',
    q6: 'What payment methods can I use?',
    a6: 'We support major Indian UPI (Google Pay, PhonePe, Paytm) as well as mainstream cryptocurrencies (such as USDT).',
    login: 'Login',
    signUp: 'Sign up for free',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    signIn: 'Sign In',
    createAccount: 'Create Account',
    contactUs: 'Contact Us',
    testimonialsTitle: 'What Our Customers Say',
    testimonialsSubtitle: 'Real feedback from our verified users across the world.',
    indiaRegion: '✅ INDIA',
    instantDelivery: 'Instant Delivery',
    ecode: 'Ecode',
    proceedToPay: 'Buy Now',
    home: 'Home',
    product: 'Product',
    support: 'Support',
    faq: 'FAQ',
    productDetailsTitle: 'Product Details',
    googlePlayUseCases: 'Google Play Use Cases',
    appleStoreUseCases: 'Apple Store Use Cases',
    amazonPayUseCases: 'Amazon Pay Use Cases',
    purpose: 'PURPOSE',
    scenarios: 'SCENARIOS',
    coreAdvantage: 'CORE ADVANTAGE',
    googlePlayPurpose: 'Specifically for the Indian Google Play Store.',
    googlePlayScenario1: 'Buy diamonds/gold in popular games (BGMI, Free Fire)',
    googlePlayScenario2: 'Subscribe to YouTube Premium membership',
    googlePlayScenario3: 'Purchase paid apps, ebooks, and movies',
    googlePlayAdvantage: '24/7 auto-delivery, instant recharge to your balance.',
    appleStorePurpose: 'Applicable to all Apple India digital service platforms.',
    appleStoreScenario1: 'Pay for App Store in-app purchases',
    appleStoreScenario2: 'Subscribe to Apple Music or iCloud+ storage',
    appleStoreScenario3: 'Rent or buy latest movies on Apple TV',
    appleStoreAdvantage: 'Official original code, no risk of account banning.',
    amazonPayPurpose: 'Recharge directly into your Amazon Pay balance.',
    amazonPayScenario1: 'Buy millions of physical goods on Amazon.in',
    amazonPayScenario2: 'Pay for electricity, water, or mobile bills',
    amazonPayScenario3: 'Checkout on third-party partner websites',
    amazonPayAdvantage: 'Enjoy 5% off site-wide, the best way to save money.',
    reminderText: 'Reminder: Valid for India accounts only.',
    backToBrands: 'Back to Brands',
    selectDenomination: 'Select Denomination',
    giftCardSuffix: 'India Gift Card',
    followUs: 'Follow Us',
    legal: 'Legal',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    refundPolicy: 'Refund Policy',
    allRightsReserved: 'All rights reserved.',
    chatWithUs: 'Chat with us',
    emailAddress: 'Email Address',
    password: 'Password',
    helpAndSupport: 'Help & Support',
    needHelp: 'Need Help?',
    supportDescription: 'Please contact our support team for any questions or assistance with your purchase.',
    helpCenter: 'Help Center',
    support247: 'Our support team is online 24/7 to assist you.',
    close: 'Close',
    done: 'Done',
    verificationPending: 'Verification Pending',
    orderId: 'Order ID',
    status: 'Status',
    verifyingPayment: 'Verifying Payment',
    total: 'Total'
  },
  HI: {
    heroTitle: 'इंस्टेंट इंडिया गिफ्ट कार्ड्स',
    heroSubtitle: 'सेकंडों में डिलीवर होने वाले आधिकारिक डिजिटल कोड।',
    heroHighlight: 'कोई छिपी हुई फीस नहीं।',
    selectBrand: 'ब्रांड चुनें',
    selected: 'चुना गया',
    completePurchase: 'अपनी खरीदारी पूरी करें',
    emailLabel: 'डिलीवरी के लिए ईमेल',
    payButton: 'भुगतान सत्यापन सबमिट करें',
    secure: '100% सुरक्षित',
    autoDelivery: 'ऑटो-डिलीवरी',
    verified: 'सत्यापित मर्चेंट',
    paymentTitle: 'भुगतान निर्देश',
    upiIdLabel: 'UPI ID पर भुगतान करें',
    usdtAddressLabel: 'USDT (TRC20) पते पर भुगतान करें',
    selectPaymentMethod: 'भुगतान विधि चुनें',
    uploadLabel: 'भुगतान स्क्रीनशॉट अपलोड करें',
    submitVerification: 'सत्यापन के लिए सबमिट करें',
    successTitle: 'सत्यापन सबमिट किया गया!',
    successSubtitle: 'आपके भुगतान का सत्यापन किया जा रहा है। गिफ्ट कार्ड कोड 5-10 मिनट के भीतर आपके ईमेल पर भेज दिए जाएंगे।',
    quantityLabel: 'मात्रा',
    totalLabel: 'कुल राशि',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    q1: 'क्या आपके द्वारा बेचे जाने वाले गिफ्ट कार्ड विश्वसनीय स्रोतों से हैं?',
    a1: 'हाँ। सभी BharatCards गिफ्ट कार्ड आधिकारिक तौर पर अधिकृत चैनलों के माध्यम से खरीदे जाते हैं। हम गारंटी देते हैं कि हर कार्ड कोड 100% नया और अनएक्टिवेटेड है, जो आपके फंड की सुरक्षा सुनिश्चित करता है।',
    q2: 'आपकी कीमतें अंकित मूल्य से कम क्यों हैं (5% की छूट)?',
    a2: 'हम थोक खरीद और अनुकूलित डिजिटल वितरण प्रक्रियाओं के माध्यम से बचत को सीधे अपने ग्राहकों तक पहुँचाते हैं। यह आपको अधिक अनुकूल मूल्य पर समान अंकित मूल्य का आनंद लेने की अनुमति देता है।',
    q3: 'क्या इन गिफ्ट कार्ड का उपयोग अन्य देशों के खातों पर किया जा सकता है?',
    a3: 'नहीं। वर्तमान में हमारे द्वारा बेचे जाने वाले Google, Apple और Amazon गिफ्ट कार्ड केवल भारतीय क्षेत्र के खातों के साथ उपयोग के लिए हैं। कृपया रिडीम करने से पहले सुनिश्चित करें कि आपका खाता क्षेत्र भारत पर सेट है।',
    q4: 'क्या मैं धनवापसी के लिए आवेदन कर सकता हूँ यदि मेरा खाता भारतीय क्षेत्र में नहीं है?',
    a4: 'धनवापसी स्वीकार नहीं की जाती है। चूंकि गिफ्ट कार्ड विशिष्टता और तात्कालिकता वाले आभासी डिजिटल उत्पाद हैं, इसलिए एक बार कोड भेजे जाने के बाद, हम इसे फिर से नहीं बेच सकते। गलत व्यक्तिगत खाता क्षेत्र सेटिंग्स के कारण रिडीम करने में असमर्थता के लिए हम ज़िम्मेदार नहीं हैं।',
    q5: 'सफल भुगतान के कितने समय बाद मुझे कोड मिलेगा?',
    a5: 'डिलीवरी तत्काल है! हमारा सिस्टम पूरी तरह से स्वचालित है और 24/7 संचालित होता है। नेटवर्क द्वारा भुगतान की पुष्टि होते ही आपका कोड तुरंत जारी कर दिया जाएगा।',
    q6: 'मैं किन भुगतान विधियों का उपयोग कर सकता हूँ?',
    a6: 'हम प्रमुख भारतीय UPI (Google Pay, PhonePe, Paytm) के साथ-साथ मुख्यधारा की क्रिप्टोकरेंसी (जैसे USDT) का समर्थन करते हैं।',
    login: 'लॉगिन',
    signUp: 'मुफ्त में साइन अप करें',
    noAccount: 'खाता नहीं है?',
    hasAccount: 'पहले से ही एक खाता है?',
    signIn: 'साइन इन करें',
    createAccount: 'खाता बनाएँ',
    contactUs: 'हमसे संपर्क करें',
    testimonialsTitle: 'हमारे ग्राहक क्या कहते हैं',
    testimonialsSubtitle: 'दुनिया भर में हमारे सत्यापित उपयोगकर्ताओं से वास्तविक प्रतिक्रिया।',
    indiaRegion: '✅ भारत',
    instantDelivery: 'त्वरित वितरण',
    ecode: 'ई-कोड',
    proceedToPay: 'अभी खरीदें',
    home: 'होम',
    product: 'उत्पाद',
    support: 'सपोर्ट',
    faq: 'सामान्य प्रश्न',
    productDetailsTitle: 'उत्पाद विवरण',
    googlePlayUseCases: 'Google Play उपयोग के मामले',
    appleStoreUseCases: 'Apple Store उपयोग के मामले',
    amazonPayUseCases: 'Amazon Pay उपयोग के मामले',
    purpose: 'उद्देश्य',
    scenarios: 'परिदृश्य',
    coreAdvantage: 'मुख्य लाभ',
    googlePlayPurpose: 'विशेष रूप से भारतीय Google Play Store के लिए।',
    googlePlayScenario1: 'लोकप्रिय खेलों (BGMI, Free Fire) में हीरे/सोना खरीदें',
    googlePlayScenario2: 'YouTube Premium सदस्यता की सदस्यता लें',
    googlePlayScenario3: 'सशुल्क ऐप्स, ई-बुक्स और फिल्में खरीदें',
    googlePlayAdvantage: '24/7 ऑटो-डिलीवरी, आपके बैलेंस में तुरंत रिचार्ज।',
    appleStorePurpose: 'सभी Apple India डिजिटल सेवा प्लेटफार्मों के लिए लागू।',
    appleStoreScenario1: 'App Store इन-ऐप खरीदारी के लिए भुगतान करें',
    appleStoreScenario2: 'Apple Music या iCloud+ स्टोरेज की सदस्यता लें',
    appleStoreScenario3: 'Apple TV पर नवीनतम फिल्में किराए पर लें या खरीदें',
    appleStoreAdvantage: 'आधिकारिक मूल कोड, खाता प्रतिबंधित होने का कोई जोखिम नहीं।',
    amazonPayPurpose: 'सीधे अपने Amazon Pay बैलेंस में रिचार्ज करें।',
    amazonPayScenario1: 'Amazon.in पर लाखों भौतिक सामान खरीदें',
    amazonPayScenario2: 'बिजली, पानी या मोबाइल बिल का भुगतान करें',
    amazonPayScenario3: 'तृतीय-पक्ष भागीदार वेबसाइटों पर चेकआउट करें',
    amazonPayAdvantage: 'पूरे साइट पर 5% की छूट का आनंद लें, पैसे बचाने का सबसे अच्छा तरीका।',
    reminderText: 'अनुस्मारक: केवल भारत के खातों के लिए मान्य।',
    backToBrands: 'ब्रांड्स पर वापस जाएं',
    selectDenomination: 'मूल्यवर्ग चुनें',
    giftCardSuffix: 'इंडिया गिफ्ट कार्ड',
    followUs: 'हमारा अनुसरण करें',
    legal: 'कानूनी',
    termsOfService: 'सेवा की शर्तें',
    privacyPolicy: 'गोपनीयता नीति',
    refundPolicy: 'धनवापसी नीति',
    allRightsReserved: 'सर्वाधिकार सुरक्षित।',
    chatWithUs: 'हमसे चैट करें',
    emailAddress: 'ईमेल पता',
    password: 'पासवर्ड',
    helpAndSupport: 'सहायता और सपोर्ट',
    needHelp: 'क्या आपको मदद चाहिए?',
    supportDescription: 'कृपया अपनी खरीदारी के संबंध में किसी भी प्रश्न या सहायता के लिए हमारी सपोर्ट टीम से संपर्क करें।',
    helpCenter: 'सहायता केंद्र',
    support247: 'हमारी सहायता टीम आपकी सहायता के लिए 24/7 ऑनलाइन है।',
    close: 'बंद करें',
    done: 'हो गया',
    verificationPending: 'सत्यापन लंबित',
    orderId: 'ऑर्डर आईडी',
    status: 'स्थिति',
    verifyingPayment: 'भुगतान का सत्यापन',
    total: 'कुल'
  }
};
export default function App() {
  const [view, setView] = useState<'home' | 'detail'>('home');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('EN');
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'usdt'>('upi');
  
  // Modal States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const upiId = "bharatcodes.pay@upi";
  const usdtAddress = "T9yD6S2raM1EiR9v7S4U3S2raM1EiR9v7S";

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setSelectedAmount(null);
    setQuantity(1);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUsdt = () => {
    navigator.clipboard.writeText(usdtAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitVerification = async () => {
    if (!screenshot || !email) return;
    setIsPaying(true);
    // Simulate verification submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPaying(false);
    setIsSuccessModalOpen(true);
    // Reset
    setSelectedBrand(null);
    setSelectedAmount(null);
    setEmail('');
    setScreenshot(null);
  };

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-20 h-20 overflow-hidden rounded-xl">
              <img
                src="/logo.jpg"
                alt="BharatCards Logo"
                className="w-full h-full object-contain p-1"
                />
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-black tracking-tight text-[#0F172A] leading-none">BharatCards</span>
              <span className="text-[10px] font-bold text-slate-400 mt-1.5 flex items-center gap-1">
                Official Indian Digital Giftcards <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mobile Language Switcher */}
            <div className="flex md:hidden items-center p-1 bg-slate-100 rounded-xl border border-slate-200 scale-90">
              {LANGUAGES.slice(0, 2).map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${
                    language === lang.code
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-6 mr-4 border-r border-slate-200 pr-6">
                <button 
                  onClick={() => {
                    setView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {t.home}
                </button>
                <button 
                  onClick={() => {
                    if (view !== 'home') setView('home');
                    setTimeout(() => {
                      document.getElementById('product-details')?.scrollIntoView({ behavior: 'smooth' });
                    }, 0);
                  }} 
                  className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {t.product}
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  {t.support}
                </button>
                <button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">{t.faq}</button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-black transition-all ${
                        language === lang.code
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsSupportModalOpen(true)}
                    className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.contactUs}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900"
        >
          {t.heroTitle}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
        >
          {t.heroSubtitle} <span className="text-slate-900 font-semibold">{t.heroHighlight}</span>
        </motion.p>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        {view === 'home' ? (
          <>
            {/* Main Grid */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 max-w-6xl mx-auto">
              {PRODUCTS.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)' }}
                  onClick={() => {
                    setSelectedBrand(product.id);
                    setView('detail');
                  }}
                  className="relative bg-white rounded-3xl border border-slate-100 transition-all cursor-pointer group overflow-hidden flex flex-col items-center pt-16 pb-10 px-6 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[320px]"
                >
                  {/* Discount Badge */}
                  <div className="absolute top-0 right-0 overflow-hidden w-28 h-28">
                    <div className="absolute top-6 -right-10 bg-red-500 text-white text-sm font-black py-1.5 w-40 text-center transform rotate-45 shadow-lg">
                      -5%
                    </div>
                  </div>

                  {/* Logo with Glow */}
                  <div className="relative mb-8">
                    <div className={`absolute inset-0 blur-3xl opacity-30 rounded-full scale-150 ${product.bg}`}></div>
                    <div className="relative w-32 h-32 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                      {product.logo}
                    </div>
                  </div>

                  {/* Brand Name */}
                  <h3 className="text-xl font-black text-slate-900 mb-3 text-center tracking-tight">{product.name}</h3>
                  
                  {/* Region Label */}
                  <div className="mt-auto">
                    <p className="text-[11px] font-black text-green-600 tracking-tight flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                      {t.indiaRegion}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Product Details Section */}
            <section id="product-details" className="mt-24 mb-16">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{t.productDetailsTitle}</h2>
                <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Google Play */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-8 bg-[#4285F4] rounded-full"></div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{t.googlePlayUseCases}</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{t.purpose}</p>
                      <p className="text-slate-600 font-medium leading-relaxed">{t.googlePlayPurpose}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{t.scenarios}</p>
                      <ul className="space-y-3">
                        {[
                          t.googlePlayScenario1,
                          t.googlePlayScenario2,
                          t.googlePlayScenario3
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-6 border-t border-slate-50">
                      <p className="text-xs font-black text-[#4285F4] uppercase tracking-widest mb-2">{t.coreAdvantage}</p>
                      <p className="text-slate-900 font-bold text-sm">{t.googlePlayAdvantage}</p>
                    </div>
                  </div>
                </div>

                {/* Apple */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-8 bg-slate-900 rounded-full"></div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{t.appleStoreUseCases}</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{t.purpose}</p>
                      <p className="text-slate-600 font-medium leading-relaxed">{t.appleStorePurpose}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{t.scenarios}</p>
                      <ul className="space-y-3">
                        {[
                          t.appleStoreScenario1,
                          t.appleStoreScenario2,
                          t.appleStoreScenario3
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-6 border-t border-slate-50">
                      <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">{t.coreAdvantage}</p>
                      <p className="text-slate-900 font-bold text-sm">{t.appleStoreAdvantage}</p>
                    </div>
                  </div>
                </div>

                {/* Amazon */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-8 bg-[#FF9900] rounded-full"></div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{t.amazonPayUseCases}</h3>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{t.purpose}</p>
                      <p className="text-slate-600 font-medium leading-relaxed">{t.amazonPayPurpose}</p>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{t.scenarios}</p>
                      <ul className="space-y-3">
                        {[
                          t.amazonPayScenario1,
                          t.amazonPayScenario2,
                          t.amazonPayScenario3
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-6 border-t border-slate-50">
                      <p className="text-xs font-black text-[#FF9900] uppercase tracking-widest mb-2">{t.coreAdvantage}</p>
                      <p className="text-slate-900 font-bold text-sm">{t.amazonPayAdvantage}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reminder */}
              <div className="mt-12 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 text-center">
                <p className="text-blue-600 font-bold flex items-center justify-center gap-2">
                  <Info className="w-5 h-5" />
                  {t.reminderText}
                </p>
              </div>
            </section>
          </>
        ) : (
          <div className="py-12">
            <button 
              onClick={() => {
                setView('home');
                setSelectedAmount(null);
              }}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors group"
            >
              <ArrowRight className="w-5 h-5 rotate-180 transition-transform group-hover:-translate-x-1" />
              {t.backToBrands}
            </button>
            
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50">
              <div className="flex flex-col lg:flex-row">
                {/* Left Column: Product Image Area */}
                <div className="lg:w-[45%] bg-slate-50/50 p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-full max-w-sm aspect-square bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-center p-12"
                  >
                    <div className={`absolute inset-0 blur-3xl opacity-20 rounded-full scale-125 ${PRODUCTS.find(p => p.id === selectedBrand)?.bg}`}></div>
                    <div className="relative w-48 h-48 flex items-center justify-center transform hover:scale-110 transition-transform duration-500">
                      {PRODUCTS.find(p => p.id === selectedBrand)?.logo}
                    </div>
                  </motion.div>
                </div>

                {/* Right Column: Purchase Selection Area */}
                <div className="flex-1 p-8 md:p-12">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">
                      {PRODUCTS.find(p => p.id === selectedBrand)?.name} {t.giftCardSuffix}
                    </h2>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-black tracking-tight border border-green-100">
                        {t.instantDelivery}
                      </span>
                      <span className="px-4 py-1.5 rounded-full bg-green-100/50 text-green-700 text-xs font-black tracking-tight border border-green-200">
                        {t.indiaRegion}
                      </span>
                      <span className="px-4 py-1.5 rounded-full border-2 border-blue-100 text-blue-600 text-xs font-black tracking-tight">
                        {t.ecode}
                      </span>
                    </div>
                  </div>

                  {/* Denomination Selection */}
                  <div className="mb-10">
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4">{t.selectDenomination}</p>
                    <div className="flex flex-wrap gap-3">
                      {DENOMINATIONS.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setSelectedAmount(amount)}
                          className={`px-6 py-3 rounded-full font-black text-sm transition-all border-2 ${
                            selectedAmount === amount
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                            : 'bg-slate-50 border-slate-50 text-slate-500 hover:border-slate-200'
                          }`}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Display */}
                  <AnimatePresence mode="wait">
                    {selectedAmount && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-10 p-6 rounded-3xl bg-slate-50 border border-slate-100"
                      >
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="text-4xl font-black text-slate-900">₹{selectedAmount * 0.95}</span>
                          <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[10px] font-black">-5%</span>
                        </div>
                        <div className="text-slate-400 text-sm font-bold line-through">
                          ₹{selectedAmount}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Button */}
                  <button 
                    disabled={!selectedAmount}
                    onClick={() => window.open('https://wa.me/85294582125', '_blank')}
                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                      selectedAmount 
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-200' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <CreditCard className="w-6 h-6" />
                    {t.proceedToPay}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-8 border-y border-slate-200 mb-16">
          <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            {t.secure}
          </div>
          <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            {t.autoDelivery}
          </div>
          <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            {t.verified}
          </div>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">{t.faqTitle}</h2>
            <div className="space-y-6">
              {[
                { q: t.q1, a: t.a1 },
                { q: t.q2, a: t.a2 },
                { q: t.q3, a: t.a3 },
                { q: t.q4, a: t.a4 },
                { q: t.q5, a: t.a5 },
                { q: t.q6, a: t.a6 }
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    {item.q}
                  </h4>
                  <p className="text-slate-600 font-medium leading-relaxed ml-8">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-slate-50/50 -mx-6 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto mb-16 px-6">
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-900 mb-4">{t.testimonialsTitle}</h2>
              <p className="text-slate-500 font-medium">{t.testimonialsSubtitle}</p>
            </div>
          </div>
          
          <div className="relative flex overflow-x-hidden">
            <motion.div 
              className="flex whitespace-nowrap gap-8 py-4 px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, i) => (
                <div
                  key={i}
                  className="w-[400px] flex-shrink-0 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow whitespace-normal"
                >
                  <p className="text-slate-600 font-medium leading-relaxed mb-8 min-h-[80px]">
                    "{testimonial.comment}"
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="font-black text-slate-900 text-sm">
                          - {testimonial.name} — {testimonial.location}
                        </h5>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star 
                          key={starIndex} 
                          className={`w-3 h-3 ${starIndex < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact-section" className="bg-white border-t border-slate-200 pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Column 1: Contact */}
          <div>
            <h5 className="text-lg font-black mb-6">{t.contactUs}</h5>
            <div className="space-y-4">
              <a href={CONTACTS.tg1.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 font-medium hover:text-blue-600 transition-colors">
                <Send className="w-5 h-5 text-[#0088cc]" />
                <span>Telegram: {CONTACTS.tg1.handle}</span>
              </a>
              <a href={CONTACTS.tg2.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 font-medium hover:text-blue-600 transition-colors">
                <Send className="w-5 h-5 text-[#0088cc]" />
                <span>Telegram: {CONTACTS.tg2.handle}</span>
              </a>
              <a href={CONTACTS.ws1.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 font-medium hover:text-green-600 transition-colors">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>WhatsApp: {CONTACTS.ws1.handle}</span>
              </a>
              <a href={CONTACTS.ws2.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 font-medium hover:text-green-600 transition-colors">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>WhatsApp: {CONTACTS.ws2.handle}</span>
              </a>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-blue-600 font-bold text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  {t.support247}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Social Media */}
          <div>
            <h5 className="text-lg font-black mb-6">{t.followUs}</h5>
            <div className="space-y-4">
              <a href={CONTACTS.tg1.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 font-medium hover:text-blue-600 transition-colors">
                <Send className="w-5 h-5 text-[#0088cc]" />
                <span>Telegram: {CONTACTS.tg1.handle}</span>
              </a>
              <a href={CONTACTS.tg2.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 font-medium hover:text-blue-600 transition-colors">
                <Send className="w-5 h-5 text-[#0088cc]" />
                <span>Telegram: {CONTACTS.tg2.handle}</span>
              </a>
              <a href={CONTACTS.ws1.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 font-medium hover:text-green-600 transition-colors">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>WhatsApp: {CONTACTS.ws1.handle}</span>
              </a>
              <a href={CONTACTS.ws2.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 font-medium hover:text-green-600 transition-colors">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>WhatsApp: {CONTACTS.ws2.handle}</span>
              </a>
              <a href={CONTACTS.tgChannel.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 font-medium hover:text-blue-600 transition-colors">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>Channel: {CONTACTS.tgChannel.handle}</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm font-medium">© 2026 BharatCards. {t.allRightsReserved}</p>
        </div>
      </footer>

      {/* Floating Support */}
      <motion.div 
        drag
        dragConstraints={{ left: -window.innerWidth + 100, right: 0, top: -window.innerHeight + 100, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        className="fixed bottom-8 right-8 z-[100] group touch-none"
      >
        <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {t.chatWithUs}
          <div className="absolute top-full right-4 border-8 border-transparent border-t-slate-900"></div>
        </div>
        <button 
          onClick={() => setIsSupportModalOpen(true)}
          className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-200 hover:scale-110 transition-transform active:scale-95 cursor-grab active:cursor-grabbing"
        >
          <Headphones className="w-8 h-8" />
        </button>
      </motion.div>

      {/* Auth Modal */}
      <Modal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        title={authMode === 'login' ? t.signIn : t.createAccount}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">{t.emailAddress}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" placeholder="name@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-600 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-600 transition-all" />
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            {authMode === 'login' ? t.signIn : t.createAccount}
          </button>
          <div className="text-center">
            <button 
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              {authMode === 'login' ? `${t.noAccount} ${t.signUp}` : `${t.hasAccount} ${t.login}`}
            </button>
          </div>
        </div>
      </Modal>

      {/* Support Modal */}
      <Modal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
        title={t.helpAndSupport}
      >
        <div className="space-y-6 py-4">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Headphones className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900">{t.needHelp}</h4>
              <p className="text-slate-500 font-medium text-sm px-4">
                {t.supportDescription}
              </p>
              <p className="text-blue-600 font-bold text-xs mt-2">
                {t.support247}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <a 
              href={CONTACTS.tg1.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">{CONTACTS.tg1.name}</div>
                  <div className="text-xs font-bold text-slate-500">{CONTACTS.tg1.handle}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </a>

            <a 
              href={CONTACTS.tg2.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">{CONTACTS.tg2.name}</div>
                  <div className="text-xs font-bold text-slate-500">{CONTACTS.tg2.handle}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </a>

            <a 
              href={CONTACTS.ws1.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-slate-50 hover:bg-green-50 rounded-2xl border border-slate-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">{CONTACTS.ws1.name}</div>
                  <div className="text-xs font-bold text-slate-500">{CONTACTS.ws1.handle}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
            </a>

            <a 
              href={CONTACTS.ws2.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-slate-50 hover:bg-green-50 rounded-2xl border border-slate-100 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center text-white">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">{CONTACTS.ws2.name}</div>
                  <div className="text-xs font-bold text-slate-500">{CONTACTS.ws2.handle}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          <button 
            onClick={() => setIsSupportModalOpen(false)}
            className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal 
        isOpen={isSuccessModalOpen} 
        onClose={() => setIsSuccessModalOpen(false)} 
        title={t.successTitle}
      >
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900">{t.verificationPending}</h4>
            <p className="text-slate-500 mt-2">{t.successSubtitle}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left">
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>{t.orderId}</span>
              <span>#IND-8293-XP</span>
            </div>
            <div className="text-sm font-black text-slate-900 mb-1">
              {t.status}: <span className="text-blue-600">{t.verifyingPayment}</span>
            </div>
            <div className="text-sm font-black text-slate-900">
              {t.total}: <span className="text-slate-900">₹{(selectedAmount || 0) * quantity}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSuccessModalOpen(false)}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all"
          >
            {t.done}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </Modal>
    </div>
  );
}
