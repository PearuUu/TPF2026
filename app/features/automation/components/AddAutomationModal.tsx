import { useState, useEffect } from "react";
import { Modal } from "../../../components/base/Modal";
import { Button } from "../../../components/base/Button";
import { Toggle } from "../../../components/base/Toggle";
import { DayPicker } from "react-day-picker";
import { pl } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import { 
    Calendar as CalendarIcon, 
    RotateCw, 
    Lightbulb, 
    Snowflake, 
    Tv, 
    Coffee, 
    Bot, 
    Speaker,
    Volume2,
    Check
} from "lucide-react";

interface AddAutomationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newRule: any) => void;
    onEdit?: (updatedRule: any) => void;
    editingRule?: any;
}

// Mock devices matching our system
const DEVICES = [
    { id: "light", name: "Salon - Oświetlenie", type: "light", icon: <Lightbulb size={18} /> },
    { id: "ac", name: "Klimatyzacja - Sypialnia", type: "ac", icon: <Snowflake size={18} /> },
    { id: "tv", name: "Smart TV - Salon", type: "tv", icon: <Tv size={18} /> },
    { id: "audio", name: "Audio - Cały Dom", type: "audio", icon: <Speaker size={18} /> },
    { id: "coffee", name: "Kuchnia - Ekspres do kawy", type: "coffee", icon: <Coffee size={18} /> },
    { id: "bot", name: "Robot sprzątający", type: "bot", icon: <Bot size={18} /> },
];

const WEEKDAYS = [
    { key: 1, label: "Pn" },
    { key: 2, label: "Wt" },
    { key: 3, label: "Śr" },
    { key: 4, label: "Cz" },
    { key: 5, label: "Pt" },
    { key: 6, label: "Sb" },
    { key: 7, label: "Nd" },
];

export function AddAutomationModal({ isOpen, onClose, onAdd, onEdit, editingRule }: AddAutomationModalProps) {
    const [title, setTitle] = useState("");
    const [scheduleType, setScheduleType] = useState<"once" | "recurring">("once");
    
    // Calendar state (react-day-picker)
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
    
    // Recurring state
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    
    // Time state
    const [hour, setHour] = useState("12");
    const [minute, setMinute] = useState("00");

    // Device actions state
    const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
    const [deviceActive, setDeviceActive] = useState(true);
    const [lightBrightness, setLightBrightness] = useState(80);
    const [acTemperature, setAcTemperature] = useState(21);
    const [acMode, setAcMode] = useState("Cooling");
    const [mediaVolume, setMediaVolume] = useState(35);
    const [mediaSource, setMediaSource] = useState("Netflix");

    // Parse editing rule when modal opens
    useEffect(() => {
        if (isOpen) {
            if (editingRule) {
                setTitle(editingRule.title);
                
                // Parse condition for schedule
                const condText = editingRule.conditions?.[0]?.text || "";
                
                // 1. Time parsing (looks like "o HH:MM")
                const timeMatch = condText.match(/o (\d{2}):(\d{2})/);
                if (timeMatch) {
                    setHour(timeMatch[1]);
                    setMinute(timeMatch[2]);
                } else {
                    // Fallback for mocks like "If Time = 7:00 AM"
                    const timeFallbackMatch = condText.match(/(\d{1,2}):(\d{2})/);
                    if (timeFallbackMatch) {
                        const h = parseInt(timeFallbackMatch[1]);
                        const formattedH = h < 10 ? `0${h}` : `${h}`;
                        setHour(formattedH);
                        setMinute(timeFallbackMatch[2]);
                    }
                }

                // 2. Schedule type and date/days parsing
                if (condText.includes("Harmonogram:")) {
                    setScheduleType("once");
                    // Format is: "Harmonogram: DD mmm" (e.g. "Harmonogram: 12 cze")
                    const dateMatch = condText.match(/Harmonogram:\s+(\d+)\s+(\w+)/);
                    if (dateMatch) {
                        const dayNum = parseInt(dateMatch[1]);
                        const monthStr = dateMatch[2].toLowerCase();
                        
                        const monthsShort = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];
                        const foundMonth = monthsShort.findIndex(m => monthStr.startsWith(m));
                        
                        if (foundMonth !== -1) {
                            const parsedDate = new Date();
                            parsedDate.setDate(dayNum);
                            parsedDate.setMonth(foundMonth);
                            setSelectedDate(parsedDate);
                        }
                    }
                } else if (condText.includes("Codziennie")) {
                    setScheduleType("recurring");
                    setSelectedDays([1, 2, 3, 4, 5, 6, 7]);
                } else if (condText.includes("Dni robocze") || condText.includes("Weekday")) {
                    setScheduleType("recurring");
                    setSelectedDays([1, 2, 3, 4, 5]);
                } else if (condText.includes("W dni [") || condText.includes("Day =")) {
                    setScheduleType("recurring");
                    const daysMatch = condText.match(/W dni \[(.*?)\]/);
                    if (daysMatch) {
                        const dayLabels = daysMatch[1].split(", ");
                        const parsedDays = dayLabels
                            .map((label: string) => WEEKDAYS.find(w => w.label === label)?.key)
                            .filter((k: any): k is number => k !== undefined);
                        setSelectedDays(parsedDays);
                    } else {
                        // Fallback for mocks
                        setSelectedDays([1, 2, 3, 4, 5]);
                    }
                } else {
                    // Default fallback
                    setScheduleType("once");
                    setSelectedDate(today);
                }

                // Parse action
                const actText = typeof editingRule.actions?.[0] === "string" 
                    ? editingRule.actions[0] 
                    : editingRule.actions?.[0]?.text || "";
                
                // Find matching device
                const device = DEVICES.find(d => actText.includes(d.name) || actText.includes("Klimatyzac") || actText.includes("AC") || actText.includes("Living Room")) || DEVICES[0];
                setSelectedDevice(device);
                
                // Determine if active
                const isActive = actText.startsWith("Włącz") || actText.startsWith("Uruchom") || actText.includes("On") || actText.includes("Open") || actText.includes("Set");
                setDeviceActive(isActive);

                if (isActive) {
                    if (device.type === "light") {
                        const brightnessMatch = actText.match(/(\d+)%/);
                        if (brightnessMatch) {
                            setLightBrightness(parseInt(brightnessMatch[1]));
                        }
                    } else if (device.type === "ac") {
                        const tempMatch = actText.match(/(\d+)°F/) || actText.match(/(\d+)°C/) || actText.match(/to (\d+)/);
                        if (tempMatch) {
                            setAcTemperature(parseInt(tempMatch[1]));
                        }
                        
                        if (actText.includes("Ogrzewanie") || actText.includes("Heat")) setAcMode("Heating");
                        else if (actText.includes("Automatyczny") || actText.includes("Auto")) setAcMode("Auto");
                        else setAcMode("Cooling");
                    } else if (device.type === "tv" || device.type === "audio") {
                        const volMatch = actText.match(/Głośność:\s*(\d+)%/) || actText.match(/(\d+)%/);
                        if (volMatch) {
                            setMediaVolume(parseInt(volMatch[1]));
                        }
                        
                        if (actText.includes("YouTube")) setMediaSource("YouTube");
                        else if (actText.includes("HDMI 1")) setMediaSource("HDMI 1");
                        else setMediaSource("Netflix");
                    }
                }
            } else {
                // Reset to default empty state for creating
                setTitle("");
                setScheduleType("once");
                setSelectedDate(today);
                setSelectedDays([]);
                setHour("12");
                setMinute("00");
                setSelectedDevice(DEVICES[0]);
                setDeviceActive(true);
                setLightBrightness(80);
                setAcTemperature(21);
                setAcMode("Cooling");
                setMediaVolume(35);
                setMediaSource("Netflix");
            }
        }
    }, [isOpen, editingRule]);

    const toggleDay = (dayKey: number) => {
        if (selectedDays.includes(dayKey)) {
            setSelectedDays(selectedDays.filter(d => d !== dayKey));
        } else {
            setSelectedDays([...selectedDays, dayKey]);
        }
    };

    const handleSave = () => {
        if (!title.trim()) {
            alert("Wprowadź nazwę automatyzacji");
            return;
        }

        // Format conditions & actions
        let scheduleText = "";
        
        if (scheduleType === "once") {
            if (!selectedDate) {
                alert("Wybierz datę z kalendarza");
                return;
            }
            const formattedDate = selectedDate.toLocaleDateString("pl-PL", { day: "numeric", month: "short" });
            scheduleText = `Harmonogram: ${formattedDate} o ${hour}:${minute}`;
        } else {
            if (selectedDays.length === 0) {
                alert("Wybierz przynajmniej jeden dzień dla harmonogramu powtarzalnego");
                return;
            }
            if (selectedDays.length === 7) {
                scheduleText = `Codziennie o ${hour}:${minute}`;
            } else if (selectedDays.length === 5 && !selectedDays.includes(6) && !selectedDays.includes(7)) {
                scheduleText = `Dni robocze o ${hour}:${minute}`;
            } else {
                const dayLabels = selectedDays
                    .sort()
                    .map(d => WEEKDAYS.find(w => w.key === d)?.label)
                    .join(", ");
                scheduleText = `W dni [${dayLabels}] o ${hour}:${minute}`;
            }
        }

        let actionText = "";
        if (selectedDevice.type === "light") {
            actionText = deviceActive 
                ? `Włącz ${selectedDevice.name} (${lightBrightness}%)`
                : `Wyłącz ${selectedDevice.name}`;
        } else if (selectedDevice.type === "ac") {
            actionText = deviceActive
                ? `Włącz Klimatyzację (${acTemperature}°C, ${acMode === "Cooling" ? "Chłodzenie" : acMode === "Heating" ? "Ogrzewanie" : "Auto"})`
                : "Wyłącz Klimatyzację";
        } else if (selectedDevice.type === "tv" || selectedDevice.type === "audio") {
            actionText = deviceActive
                ? `Włącz ${selectedDevice.name} (${mediaSource}, Głośność: ${mediaVolume}%)`
                : `Wyłącz ${selectedDevice.name}`;
        } else {
            actionText = deviceActive
                ? `Uruchom ${selectedDevice.name}`
                : `Zatrzymaj ${selectedDevice.name}`;
        }

        const newRule = {
            title,
            status: editingRule ? editingRule.status : ("RUNNING" as const),
            conditions: [
                { text: scheduleText }
            ],
            actions: [actionText]
        };

        if (editingRule) {
            onEdit?.({
                ...editingRule,
                ...newRule
            });
        } else {
            onAdd(newRule);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={editingRule ? "Edytuj automatyzację" : "Nowa automatyzacja"}>
            <div className="flex flex-col gap-6 font-sans">
                {/* 1. Automation Name */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Nazwa automatyzacji
                    </label>
                    <input
                        type="text"
                        placeholder="np. Poranne oświetlenie, Oszczędzanie energii..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>

                {/* 2. Schedule Toggle */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Typ harmonogramu
                    </label>
                    <div className="flex gap-2 p-1 bg-slate-900/80 rounded-xl border border-white/5">
                        <button
                            type="button"
                            onClick={() => setScheduleType("once")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                scheduleType === "once" 
                                    ? "bg-slate-800 text-white shadow-md border border-white/5" 
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <CalendarIcon size={16} />
                            Jednorazowo
                        </button>
                        <button
                            type="button"
                            onClick={() => setScheduleType("recurring")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                scheduleType === "recurring" 
                                    ? "bg-slate-800 text-white shadow-md border border-white/5" 
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <RotateCw size={16} />
                            Cyklicznie
                        </button>
                    </div>
                </div>

                {/* 3. Calendar or Weekdays Selection */}
                <div>
                    {scheduleType === "once" ? (
                        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 flex justify-center">
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                locale={pl}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-medium text-slate-400 mb-1">Wybierz dni tygodnia</span>
                            <div className="flex justify-between gap-1.5">
                                {WEEKDAYS.map(day => {
                                    const isSelected = selectedDays.includes(day.key);
                                    return (
                                        <button
                                            key={day.key}
                                            type="button"
                                            onClick={() => toggleDay(day.key)}
                                            className={`
                                                flex-1 py-3 text-sm font-semibold rounded-xl transition-all border
                                                ${isSelected 
                                                    ? "bg-emerald-500 text-slate-950 border-transparent shadow-lg shadow-emerald-500/10" 
                                                    : "bg-slate-900/40 border-white/5 text-slate-400 hover:border-slate-700 hover:text-white"
                                                }
                                            `}
                                        >
                                            {day.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. Time Picker */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Godzina rozpoczęcia
                    </label>
                    <div className="flex items-center gap-3">
                        <select
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}
                            className="flex-1 py-2.5 px-3 bg-slate-900 border border-white/10 rounded-xl text-white text-center font-bold focus:outline-none focus:border-emerald-500"
                        >
                            {Array.from({ length: 24 }).map((_, i) => {
                                const h = i < 10 ? `0${i}` : `${i}`;
                                return <option key={h} value={h}>{h}</option>;
                            })}
                        </select>
                        <span className="text-xl font-bold text-slate-400">:</span>
                        <select
                            value={minute}
                            onChange={(e) => setMinute(e.target.value)}
                            className="flex-1 py-2.5 px-3 bg-slate-900 border border-white/10 rounded-xl text-white text-center font-bold focus:outline-none focus:border-emerald-500"
                        >
                            {Array.from({ length: 12 }).map((_, i) => {
                                const m = i * 5 < 10 ? `0${i * 5}` : `${i * 5}`;
                                return <option key={m} value={m}>{m}</option>;
                            })}
                        </select>
                    </div>
                </div>

                <hr className="border-white/5 my-1" />

                {/* 5. Device Selector */}
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Wybierz urządzenie
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                        {DEVICES.map(device => {
                            const isSelected = selectedDevice.id === device.id;
                            return (
                                <button
                                    key={device.id}
                                    type="button"
                                    onClick={() => setSelectedDevice(device)}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-xl border text-left transition-all
                                        ${isSelected 
                                            ? "bg-emerald-500/10 border-emerald-500 text-white" 
                                            : "bg-slate-900/40 border-white/5 text-slate-400 hover:border-slate-800 hover:text-white"
                                        }
                                    `}
                                >
                                    <div className={`p-2 rounded-lg ${isSelected ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                                        {device.icon}
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs font-semibold truncate">{device.name}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 6. Device Action Options */}
                <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-semibold text-white">Akcja urządzenia</span>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDeviceActive(!deviceActive)}>
                            <span className="text-xs text-slate-400">{deviceActive ? "Włącz" : "Wyłącz"}</span>
                            <Toggle checked={deviceActive} />
                        </div>
                    </div>

                    {deviceActive && (
                        <div className="mt-4 pt-4 border-t border-white/5 animate-in fade-in duration-200">
                            {/* Actions conditional on device type */}
                            {selectedDevice.type === "light" && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-xs font-medium text-slate-400">
                                        <span>Poziom jasności</span>
                                        <span className="text-emerald-400 font-bold">{lightBrightness}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        step="10"
                                        value={lightBrightness}
                                        onChange={(e) => setLightBrightness(Number(e.target.value))}
                                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>
                            )}

                            {selectedDevice.type === "ac" && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between text-xs font-medium text-slate-400">
                                            <span>Temperatura</span>
                                            <span className="text-emerald-400 font-bold">{acTemperature}°C</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="16"
                                            max="30"
                                            step="1"
                                            value={acTemperature}
                                            onChange={(e) => setAcTemperature(Number(e.target.value))}
                                            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-medium text-slate-400 mb-2">Tryb pracy</span>
                                        <div className="flex gap-2">
                                            {["Cooling", "Heating", "Auto"].map(mode => (
                                                <button
                                                    key={mode}
                                                    type="button"
                                                    onClick={() => setAcMode(mode)}
                                                    className={`
                                                        flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors border
                                                        ${acMode === mode 
                                                            ? "bg-slate-800 text-white border-white/20" 
                                                            : "bg-slate-900 border-transparent text-slate-500 hover:text-white"
                                                        }
                                                    `}
                                                >
                                                    {mode === "Cooling" ? "Chłodzenie" : mode === "Heating" ? "Ogrzewanie" : "Automatyczny"}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(selectedDevice.type === "tv" || selectedDevice.type === "audio") && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex justify-between text-xs font-medium text-slate-400">
                                            <span>Głośność</span>
                                            <span className="text-emerald-400 font-bold">{mediaVolume}%</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Volume2 size={16} className="text-slate-500" />
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                value={mediaVolume}
                                                onChange={(e) => setMediaVolume(Number(e.target.value))}
                                                className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                            />
                                        </div>
                                    </div>
                                    {selectedDevice.type === "tv" && (
                                        <div>
                                            <span className="block text-xs font-medium text-slate-400 mb-2">Źródło obrazu</span>
                                            <div className="flex gap-2">
                                                {["Netflix", "YouTube", "HDMI 1"].map(src => (
                                                    <button
                                                        key={src}
                                                        type="button"
                                                        onClick={() => setMediaSource(src)}
                                                        className={`
                                                            flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors border
                                                            ${mediaSource === src 
                                                                ? "bg-slate-800 text-white border-white/20" 
                                                                : "bg-slate-900 border-transparent text-slate-500 hover:text-white"
                                                            }
                                                        `}
                                                    >
                                                        {src}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {(selectedDevice.type === "coffee" || selectedDevice.type === "bot") && (
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Check size={14} className="text-emerald-500" />
                                    <span>Urządzenie zostanie uruchomione o wybranej porze.</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* 7. Action Buttons */}
                <div className="flex gap-3 mt-4">
                    <Button variant="secondary" className="flex-1 py-3.5" onClick={onClose}>
                        Anuluj
                    </Button>
                    <Button variant="primary" className="flex-1 py-3.5 font-bold" onClick={handleSave}>
                        {editingRule ? "Zapisz zmiany" : "Utwórz automatyzację"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
