import Sidebar from "../components/Sidebar.jsx";
import {Star, BookOpen, Award, Zap, Gift} from "lucide-react";
import Button from "../components/Button.jsx";
import {motion} from "framer-motion";

export default function RewardsPage() {
    const rewards = [
        {
            key: "course",
            cost: 500,
            icon: BookOpen,
            title: "Курс по македонска ОЈП",
            description: "Онлајн курс за обработка на природен јазик за македонски."
        },
        {
            key: "badge",
            cost: 200,
            icon: Award,
            title: "Значка за придонесувач",
            description: "Ексклузивна дигитална значка за твојот профил."
        },
        {
            key: "premium",
            cost: 1000,
            icon: Zap,
            title: "Премиум функции",
            description: "Пристап до напредна аналитика и алатки за 30 дена."
        },
        {
            key: "merch",
            cost: 1500,
            icon: Gift,
            title: "Везилка артикли",
            description: "Маица и стикери од заедницата на Везилка."
        },
    ]

    // TODO: use user to get the points
    // const {user} = useAuth()
    const user = {points: 1000}

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar activeButtonIndex={3}/>
            <main className="flex-1 overflow-auto pb-20 lg:pb-0 pt-14 lg:pt-0">
                <div className="p-6 md:p-8 max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold">Награди</h1>
                        <p className="text-muted-foreground mt-1">Размени ги твоите поени за ексклузивни погодности</p>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 card-elevated">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-warning/10 text-warning"><Star className="h-8 w-8"/></div>
                            <div>
                                <p className="text-sm text-muted-foreground">Твој баланс</p>
                                <p className="text-3xl font-bold">{user.points} поени</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {rewards.map((reward, i) => {
                            const canAfford = user.points >= reward.cost;
                            return (
                                <motion.div
                                    key={reward.key}
                                    className="bg-card border border-border rounded-2xl p-6 card-elevated"
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: i * 0.05}}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                            <reward.icon className="h-5 w-5"/>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{reward.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                                            <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-warning"/> {reward.cost} поени
                    </span>
                                                <Button size="sm" disabled={!canAfford}>
                                                    {canAfford ? "Размени" : "Нема доволно средства"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </main>
        </div>
    )
}