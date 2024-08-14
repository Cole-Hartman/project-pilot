import React, { useState, useEffect } from 'react';
import OpenAI from "openai";


export default function Completion({ prompt }) {
  const [completion, setCompletion] = useState(null);

  useEffect(() => {
    async function fetchCompletion() {
      try {
        //const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
        const result = await openai.chat.completions.create({
          messages: [{ role: "system", content: prompt }],
          model: "gpt-4o-mini",
        });
        setCompletion(result.choices[0]);
      } catch (error) {
        console.error("Error fetching completion:", error);
      }
    }

    fetchCompletion();
  }, [prompt]);


  return (
    <>
      {completion && <div className='mx-5 my-5'>{completion.message.content}</div>}
    </>
  );
}
