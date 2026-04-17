import { FileText, Upload, Video, Mic, ChevronDown } from "lucide-react";
import Sidebar from "../components/Sidebar";
import DialectDropdown from "../components/DialectDropdown";

export default function UploadPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeButtonIndex={1}></Sidebar>
      <main className="flex-1 pb-20 overflow-auto lg:pb-0 pt-14 lg:pt-0">
        <div className="max-w-6xl p-6 mx-auto md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold md:text-3xl">Прикачи содржина</h1>
            <p className="mt-1 text-muted-foreground">
              Сподели податоци на македонски јазик
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <div className="p-10 text-center transition-colors border-2 border-dashed cursor-pointer rounded-2xl border-border hover:border-primary/50">
                <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground"></Upload>
                <p className="mb-1 text-base font-medium">
                  Влечи и пушти датотеки овде
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  или кликни за да избереш
                </p>
                <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4"></FileText>Текст
                  </span>
                  <span className="flex items-center gap-1">
                    <Mic className="w-4 h-4"></Mic>Аудио
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="w-4 h-4"></Video>Видео
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <DialectDropdown></DialectDropdown>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Тема
                </label>
                <input
                  className="flex w-full h-10 px-3 py-2 text-base border rounded-md border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="пр. Вести, Литература, Секојдневен говор"
                ></input>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Опис
                </label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Накратко опиши ја содржината..."
                  rows={4}
                ></textarea>
              </div>
              <button className="inline-flex mt-8 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-xl px-8 w-full gap-2">
                <Upload className="w-4 h-4" />
                Прикачи содржина
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
