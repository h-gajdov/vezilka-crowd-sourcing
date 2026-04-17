import { ArrowRight, Lock, Mail } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <a className="text-2xl font-bold text-gradient" href="/">
            Везилка
          </a>
          <h1 className="mt-6 text-2xl font-bold">Создај сметка</h1>
          <p className="mt-2 text-muted-foreground">
            Придружи се на заедницата за развивање на македонската вештачка
            интелигенција
          </p>
        </div>
        <div className="p-8 border bg-card border-border rounded-2xl card-elevated">
          <form className="space-y-5">
            <div className="space-y-2">
              <label
                for="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Име
              </label>
              <div className="relative mt-2">
                <Mail className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground"></Mail>
                <input
                  className="flex w-full h-10 px-3 py-2 pl-10 text-base border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="name"
                  placeholder="Петко"
                  type="text"
                ></input>
              </div>
            </div>
            <div className="space-y-2">
              <label
                for="surname"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Презиме
              </label>
              <div className="relative mt-2">
                <Mail className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground"></Mail>
                <input
                  className="flex w-full h-10 px-3 py-2 pl-10 text-base border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="surname"
                  placeholder="Петковски"
                  type="text"
                ></input>
              </div>
            </div>
            <div className="space-y-2">
              <label
                for="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Е-пошта
              </label>
              <div className="relative mt-2">
                <Mail className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground"></Mail>
                <input
                  className="flex w-full h-10 px-3 py-2 pl-10 text-base border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                ></input>
              </div>
            </div>
            <div className="space-y-2">
              <label
                for="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Лозинка
              </label>
              <div className="relative mt-2">
                <Lock className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground"></Lock>
                <input
                  className="flex w-full h-10 px-3 py-2 pl-10 text-base border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                ></input>
              </div>
            </div>
            <button
              class="inline-flex mt-5 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl px-8 w-full gap-2"
              type="submit"
            >
              Создај сметка <ArrowRight className="w-4 h-4"></ArrowRight>
            </button>
          </form>
          <p className="mt-6 text-sm text-center text-muted-foreground">
            Веќе имаш сметка?{" "}
            <a
              className="font-medium text-primary hover:underline"
              href="/login"
            >
              Најави се
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
