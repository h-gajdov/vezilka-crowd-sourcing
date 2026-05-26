import Navbar from "../components/Navbar.jsx";
import {
  ArrowRight,
  Sparkles,
  Upload,
  CheckCircle,
  Star,
  Gift,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/Button.jsx";
import { NavLink, useLocation } from "react-router-dom";
import { FileText, Mic, Video, Shield, Users, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { getHomePageStats } from "../api/userApi.js";
import { formatCompactNumber } from "../utils/formatCompactNumber.js";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <Footer />
    </>
  );
}

function StatSkeleton() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">
        <svg
          className="w-8 h-8 animate-spin text-primary/40"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
      <div className="w-16 h-3 mx-auto mt-1 rounded-full bg-muted-foreground/20 animate-pulse" />
    </div>
  );
}

function HeroSection() {
  const [stats, setStats] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getHomePageStats();
        const formattedResult = result.map((item) => ({
          ...item,
          value: formatCompactNumber(item.value),
        }));
        setStats(formattedResult);
        setLoadingStats(false);
      } catch {
        setLoadingStats(true); // show the spinners if it can't load
      }
    };

    fetchStats();
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 overflow-hidden md:pt-44 md:pb-32"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full hero-gradient opacity-[0.07] blur-3xl" />
      </div>

      <div className="container px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Поддршка за вештачка интелигенција на македонски јазик
          </div>
        </motion.div>

        <motion.h1
          className="max-w-4xl mx-auto text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {"Помогни во градењето на иднината на\n"}
          <span className="text-gradient">македонската ВИ</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed md:text-xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Придонеси со текст, аудио и видео податоци за тренирање на јазични
          модели што го разбираат и зборуваат македонскиот јазик. Заработи
          награди додека го зачувуваш својот јазик.
        </motion.p>

        <motion.div
          className="flex flex-col justify-center gap-4 mt-10 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <NavLink to="/register">
            <Button size="lg" className="gap-2 px-8 text-base">
              Започни да придонесуваш <ArrowRight className="w-4 h-4" />
            </Button>
          </NavLink>
          <NavLink to="#how-it-works">
            <Button variant="outline" size="lg" className="px-8 text-base">
              Дознај повеќе
            </Button>
          </NavLink>
        </motion.div>

        <motion.div
          className="grid max-w-md grid-cols-2 gap-8 mx-auto mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {loadingStats
            ? Array.from({ length: 2 }).map((_, i) => <StatSkeleton key={i} />)
            : stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold md:text-3xl text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      key: "upload",
      color: "bg-primary/10 text-primary",
      title: "Прикачи",
      description:
        "Сподели текст, аудио или видео на македонски. Секој придонес е важен.",
    },
    {
      icon: Star,
      key: "earn",
      color: "bg-warning/10 text-warning",
      title: "Освои поени",
      description: "Биди награден за секој придонес и преглед што го правиш.",
    },
    {
      icon: Gift,
      key: "redeem",
      color: "bg-destructive/10 text-destructive",
      title: "Искористи награди",
      description:
        "Размени поени за курсеви, погодности и ексклузивни награди.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Kako функционира</h2>
          <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground">
            Четири едноставни чекори за придонес кон македонската јазична ВИ
          </p>
        </div>

        <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              className="relative p-6 text-center border rounded-2xl bg-card card-elevated border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="mb-4 text-xs font-bold text-muted-foreground">
                Чекор {i + 1}
              </div>
              <div className={`inline-flex p-3 rounded-xl ${step.color} mb-4`}>
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      key: "text",
      title: "Текстуални податоци",
      description: "Поднеси статии, реченици и преводи на македонски.",
    },
    {
      icon: Mic,
      key: "audio",
      title: "Аудио податоци",
      description:
        "Сними говорни примероци за тренирање на гласовно препознавање.",
    },
    {
      icon: Video,
      key: "video",
      title: "Видео податоци",
      description: "Прикачи видеа со македонски говор за мултимодална ВИ.",
    },
    {
      icon: Shield,
      key: "quality",
      title: "Загарантиран квалитет",
      description:
        "Прегледот од заедницата обезбедува висококвалитетни податоци.",
    },
    {
      icon: Users,
      key: "community",
      title: "Заедница",
      description:
        "Придружи се на илјадници придонесувачи што го зачувуваат македонскиот.",
    },
    {
      icon: Trophy,
      key: "gamified",
      title: "Со награди",
      description:
        "Освојувај значки, искачувај се на ранг-листи и отклучувај достигнувања.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-secondary/50">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Што можеш да правиш
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-lg text-muted-foreground">
            Повеќе начини да придонесеш и да оставиш печат
          </p>
        </div>

        <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.key}
              className="p-6 border rounded-2xl bg-card border-border card-elevated"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="inline-flex p-2.5 rounded-lg bg-primary/10 text-primary mb-4">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="mb-2 text-base font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-lg font-bold text-gradient">Везилка</div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#hero" className="transition-colors hover:text-foreground">
              Почетна
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              Kako функционира
            </a>
            <a
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Можности
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Везилка. Сите права се задржани.
          </p>
        </div>
      </div>
    </footer>
  );
}
