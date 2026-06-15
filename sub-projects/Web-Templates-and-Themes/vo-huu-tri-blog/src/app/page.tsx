"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Scene from "../components/Scene";
import TiltCard from "../components/TiltCard";
import Modal from "../components/Modal";
import { ArrowRight, Sparkles, Download, ArrowUpRight, Maximize2, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [modalData, setModalData] = useState<{isOpen: boolean, title: string, content: string}>({
    isOpen: false,
    title: "",
    content: ""
  });

  const openModal = (title: string, content: string) => {
    setModalData({ isOpen: true, title, content });
  };

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation Variants (Remotion & Framer Motion Vibe)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Scene />

      <Modal 
        isOpen={modalData.isOpen} 
        onClose={() => setModalData({...modalData, isOpen: false})} 
        title={modalData.title}
        content={modalData.content}
      />

      <nav className={styles.islandNav}>
        <div className={styles.logo}>VÕ HỮU TRÍ</div>
        <div className={styles.navLinks}>
          <a href="#about" onClick={(e) => smoothScroll(e, '#about')}>Architecture</a>
          <a href="#resources" onClick={(e) => smoothScroll(e, '#resources')}>Assets</a>
          <a href="#tools" onClick={(e) => smoothScroll(e, '#tools')}>Tools</a>
        </div>
        <button className={styles.navBtn} onClick={() => openModal("Connect", "<strong>Võ Hữu Trí</strong><br/><br/>Email: vohuutri@gmail.com<br/>Social: <a href='https://fb.com/vohuublogs' target='_blank' style='color:#000;text-decoration:underline'>Facebook Profile</a>")}>
          Get in touch
        </button>
      </nav>

      <section className={styles.heroSection} id="about">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.1 }}
          className={styles.heroContent}
        >
          <div className="flex justify-center mb-8">
            <span className={styles.heroBadge}>
              <Sparkles size={14} className="text-[#29d1c0]" /> Ultimate Masterpiece Edition
            </span>
          </div>

          <h1 className={styles.heroTitle}>
            Võ Hữu Trí
            <br />
            <span className={styles.textAccent}>Digital Architect</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Bridging the gap between code and art. High-end UI/UX resources, cinematic PSD assets, and elite development tools crafted for the top 1%.
          </p>
          
          <div className={styles.ctaWrapper}>
            <button 
              className={styles.btnPrimary}
              onClick={(e) => smoothScroll(e, '#resources')}
            >
              Explore Assets
              <div className={styles.btnIconWrapper}>
                <ArrowRight size={18} strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </motion.div>
      </section>

      <section className={styles.bentoSection} id="resources">
        <motion.div 
          className={styles.bentoGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          <motion.div variants={itemVariants} className={styles.cardLarge}>
            <TiltCard onClick={() => openModal("Cinematic PSD Archive", "<h3 style='font-size:24px;font-weight:600;margin-bottom:12px;'>Cinematic PSD Archive</h3><p style='color:#666;line-height:1.6'>Bộ sưu tập file thiết kế chất lượng cao nhất (8K Resolution) cho cover Facebook, mang đậm chất điện ảnh và Apple HIG.</p><p style='margin-top:16px;font-weight:500;'>Size: 2.5TB | Format: .PSD</p>")}>
              <div className={`${styles.cardInner} ${styles.bgAbstractGlass}`}>
                <div className={styles.cardContent}>
                  <span className={styles.tag} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", border: "0.5px solid rgba(255,255,255,0.3)" }}>
                    <Layers size={14} /> Design Assets
                  </span>
                  <h2 className={styles.cardTitle}>Cinematic PSD<br/>Archive Hub</h2>
                  <div className={styles.cardHoverData}>
                    <p className="flex items-center gap-2 mt-4 text-white font-medium tracking-wide"><Download size={16}/> DOWNLOAD BUNDLE</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.cardTall}>
            <TiltCard onClick={() => openModal("Social Algorithm Hacking", "<h3 style='font-size:24px;font-weight:600;margin-bottom:12px;'>Algorithm Hacking</h3><p style='color:#666;line-height:1.6'>Kiến thức ngầm về thuật toán Facebook: cách đặt tên tích ẩn, full ký tự, bảo mật profile cấp độ Doanh nghiệp.</p>")}>
              <div className={`${styles.cardInner} ${styles.bgDarkHologram}`}>
                <div className={styles.cardContent}>
                  <span className={styles.tag} style={{ background: "rgba(0,0,0,0.6)", color: "#fff", border: "0.5px solid rgba(255,255,255,0.1)" }}>
                    <Maximize2 size={14} /> Social Hacks
                  </span>
                  <h2 className={styles.cardTitle}>Algorithm<br/>Mastery</h2>
                  <div className={styles.cardHoverData}>
                    <p className="mt-4">Khám phá các bí mật chưa từng được công bố về thuật toán Mạng xã hội.</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.cardStandard}>
            <TiltCard onClick={() => openModal("Typography Collection", "<h3 style='font-size:24px;font-weight:600;margin-bottom:12px;'>Typography Collection</h3><p style='color:#666;line-height:1.6'>1500+ Font chữ bản quyền (San Francisco, Inter, Helvetica Now) đã được tinh chỉnh kerning hoàn hảo cho Tiếng Việt.</p>")}>
              <div className={`${styles.cardInner} ${styles.bgTypography}`}>
                <div className={styles.cardContent}>
                  <span className={styles.tag} style={{ background: "rgba(255,255,255,0.9)", color: "#000" }}>Typography</span>
                  <h2 className={styles.cardTitle}>Elite Font<br/>Collection</h2>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.cardDark} id="tools">
            <TiltCard onClick={() => openModal("Pro Tools", "<h3 style='font-size:24px;font-weight:600;margin-bottom:12px;'>Pro Tools</h3><p style='color:#666;line-height:1.6'>Các phần mềm thiết kế Portable siêu nhẹ nhưng đầy đủ tính năng: Adobe Photoshop, Illustrator phiên bản tối ưu hóa cho tốc độ.</p>")}>
              <div className={`${styles.cardInner} ${styles.bgSoftware}`}>
                <div className={styles.cardContent}>
                  <span className={styles.tag} style={{ background: "rgba(41, 209, 192, 0.2)", color: "#29d1c0", border: "1px solid rgba(41, 209, 192, 0.4)" }}>
                    <ArrowUpRight size={14} /> Productivity
                  </span>
                  <h2 className={styles.cardTitle}>Software &<br/>Optimization Tools</h2>
                  <div className={styles.cardHoverData}>
                    <p className="mt-4">Tối đa hóa hiệu suất làm việc với bộ công cụ siêu cấp.</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

        </motion.div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© 2026 Võ Hữu Trí. Designed with Apple HIG & WebGL Shaders.</p>
        </div>
      </footer>
    </div>
  );
}
