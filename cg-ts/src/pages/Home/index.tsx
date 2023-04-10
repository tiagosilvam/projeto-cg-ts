import { useOutletContext } from "react-router-dom";

// Components
import { Button } from "../../components/Button";

// Icons
import { PlayIcon } from "@heroicons/react/24/solid";

export function Home() {

    const ctx = useOutletContext<CanvasRenderingContext2D>()

    const draw = () => {
        var letters =
            "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ".split("");

        var fontSize = 10,
            columns = 800 / fontSize;

        var drops: any = [];
        for (var i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function draw() {
            ctx.fillStyle = "rgba(0, 0, 0, .1)";
            ctx.fillRect(0, 0, 800, 600);
            for (var i = 0; i < drops.length; i++) {
                var text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillStyle = "#0f0";
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                drops[i]++;
                if (drops[i] * fontSize > 600 && Math.random() > 0.95) {
                    drops[i] = 0;
                }
            }
        }

        setInterval(draw, 33);
    };

    return (
        <Button
            name="Animar!"
            onClick={draw}
            icon={<PlayIcon className="w-6 h-6 mr-3" />}
            color="bg-green-500"
            hover="hover:bg-green-600"
        />
    )
}