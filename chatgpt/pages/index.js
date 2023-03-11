import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
    const [userInput, setUserInput] = useState("");
    const [result, setResult] = useState();
    const [history, setHistory] = useState([]);
    const [responseHistory, setResponseHistory] = useState([]);

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userInput: userInput , history: history, responseHistory: responseHistory}),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }

            setResult(data.result);
            setUserInput("");
            setHistory([...history, userInput]);
            setResponseHistory([...responseHistory, data.result]);
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div>
            <Head>
                <title>chatgpt jailbreak</title>
                <link rel="icon" href="/dog.png" />
            </Head>

            <main className={styles.main}>
                <img src="/dog.png" className={styles.icon} />
                <h3>get the flag :)</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="userInput"
                        placeholder="enter your message here"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <input type="submit" value="Send to ChatGPT" />
                </form>
                <div className={styles.result}>{result}</div>
                <div className={styles.history}>
                    <h4>History</h4>
                    <ul>
                        {history.map((item, index) => (
                            <li key={index}>
                            <span className={styles.user}>User: </span>
                            {item}
                            <br/>
                            <span className={styles.user}>Response: </span>
                            {responseHistory[index]}
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
