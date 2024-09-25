import { useState, useEffect } from "react";
import "./index.css";
import Arrow from "./icons/Arrow";
import { bear, coin, highVoltage, notcoin, rocket, trophy } from "./images";

type clickProp = { id: number; x: number; y: number };

function App() {
  const [points, setPoints] = useState(2000000);
  const [energy, setEnergy] = useState(160);
  const [clicks, setClicks] = useState<clickProp[]>([]);
  const pointsToAdd = 10;
  const energyToReduce = 10;
  const maxEnergy = 200;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, maxEnergy));
    }, 800); // Restore energy point every 0.8 sec

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white md:justify-center md:w-1/2 xl:w-1/3">
        <div className="fixed top-0 left-50 w-full px-4 pt-8 z-10 flex flex-col items-center text-white md:w-1/2 xl:w-1/3">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <p className="textlg">
                Join Squad{" "}
                <Arrow size={18} className="ml-0 mb-1 inline-block" />
              </p>
            </div>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src={coin} width={44} height={44} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <img src={trophy} width={24} height={24} />
            <span className="ml-1">
              Gold <Arrow size={18} className="ml-0 mb-1 inline-block" />
            </span>
          </div>
        </div>

        <div className="fixed bottom-0 left-50 w-full px-4 pb-4 z-10  md:w-1/2 xl:w-1/3">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img
                  src={highVoltage}
                  width={44}
                  height={44}
                  alt="High Voltage"
                />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">
                    {energy}
                  </span>
                  <span className="text-white text-large opacity-75">
                    / {maxEnergy}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#fad258] py-4 px-3 rounded-2xl flex justify-around">
                <button className="flex flex-col items-center gap-1">
                  <img src={bear} width={24} height={24} alt="High Voltage" />
                  <span className="font-semibold">Frens</span>
                </button>
                <div className="h-[48px] w-[1px] bg-white"></div>
                <button className="flex flex-col items-center gap-1">
                  <img src={coin} width={24} height={24} alt="High Voltage" />
                  <span className="font-semibold">Earn</span>
                </button>
                <div className="h-[48px] w-[1px] bg-white"></div>
                <button className="flex flex-col items-center gap-1">
                  <img src={rocket} width={24} height={24} alt="High Voltage" />
                  <span className="font-semibold">Boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f9c035] rounded-full mt-4">
            <div
              className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full"
              style={{ width: `${(energy / maxEnergy) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <div
            className="relative mt-4 cursor-pointer select-none"
            onClick={handleClick}
          >
            <img src={notcoin} width={256} height={256} alt="notcoin" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 45}px`,
                  left: `${click.x - 25}px`,
                  animation: `float 1s`,
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                {pointsToAdd}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
