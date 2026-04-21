import Navbar from "../components/Navbar.jsx";
import {ArrowRight, Sparkles, Upload, CheckCircle, Star, Gift} from "lucide-react";
import {motion} from "framer-motion";
import Button from "../components/Button.jsx";
import {NavLink} from "react-router-dom";
import { FileText, Mic, Video, Shield, Users, Trophy } from "lucide-react";

export default function HomePage() {
    return (
        <>
            <Navbar/>
            <HeroSection/>
            <HowItWorksSection/>
            <FeaturesSection />
            <Footer />
        </>
    )
}


function HeroSection() {
    const stats = [
        {value: "10K+", label: "Придонесувачи"},
        {value: "500K+", label: "Податочни точки"},
        {value: "98%", label: "Точност"},
    ];

    return (
        <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full hero-gradient opacity-[0.07] blur-3xl"/>
            </div>

            <div className="container mx-auto px-4 text-center">
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Sparkles className="h-4 w-4"/>
                        Поддршка за вештачка интелигенција на македонски јазик
                    </div>
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.1}}
                >
                    {"Помогни во градењето на иднината на\n"}
                    <span className="text-gradient">македонската ВИ</span>
                </motion.h1>

                <motion.p
                    className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.2}}
                >
                    Придонеси со текст, аудио и видео податоци за тренирање на јазични модели што го разбираат и зборуваат македонскиот јазик. Заработи награди додека го зачувуваш својот јазик.
                </motion.p>

                <motion.div
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 0.3}}
                >
                    <NavLink to="/register">
                        <Button size="lg" className="text-base px-8 gap-2">
                            Започни да придонесуваш <ArrowRight className="h-4 w-4"/>
                        </Button>
                    </NavLink>
                    <NavLink to="#how-it-works">
                        <Button variant="outline" size="lg" className="text-base px-8">
                            Дознај повеќе
                        </Button>
                    </NavLink>
                </motion.div>

                <motion.div
                    className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.5}}
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}



const HowItWorksSection = () => {
    const steps = [
        { icon: Upload, key: "upload", color: "bg-primary/10 text-primary", title: "Прикачи", description: "Сподели текст, аудио или видео на македонски. Секој придонес е важен." },
        { icon: CheckCircle, key: "review", color: "bg-accent/10 text-accent", title:"Прегледај", description: "Помогни да се проверат туѓите придонеси за квалитетни податоци." },
        { icon: Star, key: "earn", color: "bg-warning/10 text-warning", title: "Освои поени", description: "Биди награден за секој придонес и преглед што го правиш." },
        { icon: Gift, key: "redeem", color: "bg-destructive/10 text-destructive", title: "Искористи награди", description: "Размени поени за курсеви, погодности и ексклузивни награди." },
    ];

    return (
        <section id="how-it-works" className="py-20 md:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Како функционира</h2>
                    <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">Четири едноставни чекори за придонес кон македонската јазична ВИ</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.key}
                            className="relative text-center p-6 rounded-2xl bg-card card-elevated border border-border"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className="text-xs font-bold text-muted-foreground mb-4">
                                Чекор {i + 1}
                            </div>
                            <div className={`inline-flex p-3 rounded-xl ${step.color} mb-4`}>
                                <step.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};



function FeaturesSection() {
    const features = [
        { icon: FileText, key: "text", title: "Текстуални податоци", description: "Поднеси статии, реченици и преводи на македонски."},
        { icon: Mic, key: "audio", title:"Аудио податоци", description: "Сними говорни примероци за тренирање на гласовно препознавање." },
        { icon: Video, key: "video", title:"Видео податоци", description: "Прикачи видеа со македонски говор за мултимодална ВИ." },
        { icon: Shield, key: "quality", title:"Загарантиран квалитет", description: "Прегледот од заедницата обезбедува висококвалитетни податоци." },
        { icon: Users, key: "community", title:"Заедница", description: "Придружи се на илјадници придонесувачи што го зачувуваат македонскиот." },
        { icon: Trophy, key: "gamified", title:"Со награди", description: "Освојувај значки, искачувај се на ранг-листи и отклучувај достигнувања." },
    ];

    return (
        <section id="features" className="py-20 md:py-32 bg-secondary/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Што можеш да правиш</h2>
                    <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">Повеќе начини да придонесеш и да оставиш печат</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.key}
                            className="p-6 rounded-2xl bg-card border border-border card-elevated"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <div className="inline-flex p-2.5 rounded-lg bg-primary/10 text-primary mb-4">
                                <f.icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="border-t border-border py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-lg font-bold text-gradient">Везилка</div>
                    <div className="flex gap-8 text-sm text-muted-foreground">
                        <a href="#hero" className="hover:text-foreground transition-colors">Почетна</a>
                        <a href="#how-it-works" className="hover:text-foreground transition-colors">Како функционира</a>
                        <a href="#features" className="hover:text-foreground transition-colors">Можности</a>
                    </div>
                    <p className="text-sm text-muted-foreground">© 2026 Везилка. Сите права се задржани.</p>
                </div>
            </div>
        </footer>
    );
};


