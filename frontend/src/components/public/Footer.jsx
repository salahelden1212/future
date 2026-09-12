import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaYoutube,
  FaTiktok,
  FaArrowRight,
  FaHeart
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { settingsAPI } from '../../services/apiService';

const logoIcon = '/images/logo-icon.png';
const logoDark = '/images/logo-dark.png';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsAPI.get();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const currentYear = new Date().getFullYear();
  const isArabic = i18n.language === 'ar';

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/packages', label: t('nav.packages') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const socialLinks = [
    { icon: FaFacebook, url: settings?.socialMedia?.facebook, label: 'Facebook', color: 'hover:bg-blue-500/20 hover:text-blue-400' },
    { icon: FaInstagram, url: settings?.socialMedia?.instagram, label: 'Instagram', color: 'hover:bg-pink-500/20 hover:text-pink-400' },
    { icon: FaTwitter, url: settings?.socialMedia?.twitter, label: 'Twitter', color: 'hover:bg-sky-500/20 hover:text-sky-400' },
    { icon: FaLinkedin, url: settings?.socialMedia?.linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600/20 hover:text-blue-400' },
    { icon: FaYoutube, url: settings?.socialMedia?.youtube, label: 'YouTube', color: 'hover:bg-red-500/20 hover:text-red-400' },
    { icon: FaTiktok, url: settings?.socialMedia?.tiktok, label: 'TikTok', color: 'hover:bg-white/10 hover:text-white' },
  ];

  return (
    <footer className="relative bg-surface-100 border-t border-white/5 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <img
                src={logoDark}
                alt="Future Finish"
                className="h-14 w-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = logoIcon;
                }}
              />
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  <span className="text-gradient-brand">FUTURE</span>
                  <span className="text-white/90 ml-1.5">FINISH</span>
                </h2>
                <p className="text-[9px] text-muted-light tracking-[0.2em] uppercase">Premium Finishing</p>
              </div>
            </Link>
            <p className="text-muted-light text-sm leading-relaxed mb-6">
              {isArabic
                ? 'شركة تشطيبات راقية متخصصة في التشطيبات السكنية والتجارية والإدارية بأعلى معايير الجودة'
                : 'Premium finishing company specialized in residential, commercial and administrative projects with the highest quality standards'}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, index) => (
                social.url && (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-light ${social.color} transition-all duration-300`}
                    title={social.label}
                  >
                    <social.icon className="text-sm" />
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-muted-light hover:text-brand-400 transition-colors duration-300 text-sm"
                  >
                    <FaArrowRight className={`text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 ${isArabic ? 'rotate-180' : ''}`} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">
              {t('footer.contactInfo')}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${settings?.phone}`} className="flex items-center gap-3 text-muted-light hover:text-brand-400 transition-colors group text-sm">
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <FaPhone className="text-brand-400 text-xs" />
                  </div>
                  <span>{settings?.phone || '+20 100 000 0000'}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${settings?.email}`} className="flex items-center gap-3 text-muted-light hover:text-brand-400 transition-colors group text-sm">
                  <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-colors">
                    <FaEnvelope className="text-accent-cyan text-xs" />
                  </div>
                  <span>{settings?.email || 'info@futurefinish.com'}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted-light text-sm">
                <div className="w-9 h-9 rounded-lg bg-accent-emerald/10 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-accent-emerald text-xs" />
                </div>
                <span className="mt-1.5">
                  {isArabic
                    ? settings?.address?.ar || 'القاهرة، جمهورية مصر العربية'
                    : settings?.address?.en || 'Cairo, Egypt'}
                </span>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">
              {isArabic ? 'تواصل سريع' : 'Quick Contact'}
            </h4>
            <p className="text-muted-light text-sm mb-6 leading-relaxed">
              {isArabic
                ? 'تواصل معنا عبر واتساب للرد السريع على استفساراتك'
                : 'Contact us via WhatsApp for quick response to your inquiries'}
            </p>
            {settings?.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald px-5 py-3 rounded-xl text-sm font-medium hover:bg-accent-emerald/20 transition-all duration-300"
              >
                <FaWhatsapp className="text-lg" />
                <span>{isArabic ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted text-sm flex items-center gap-2">
              {isArabic
                ? `© ${currentYear} فيوتشر فينش. جميع الحقوق محفوظة`
                : `© ${currentYear} Future Finish. All Rights Reserved`}
              <FaHeart className="text-accent-rose text-xs animate-pulse" />
            </p>

            <div className="flex items-center gap-4 text-muted text-sm">
              <span>{isArabic ? 'صنع بحب في مصر' : 'Made with love in Egypt'}</span>
              <span>🇪🇬</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
