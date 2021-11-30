import { useEffect, useState } from "react";


const useText = () => {
    const [text, setText] = useState("Initial text");

    useEffect(() => {
        setTimeout(() => {
        setText("Updated text");
        }, 3000);
    }, []);
    return text;
};

export default useText;