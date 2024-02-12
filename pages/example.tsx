import React, { useState, useEffect } from "react";

const Sim = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [temperature, setTemperature] = useState(0.8);
  const [userChat, setUserChat] = useState("");
  const [aiResponseHistory, setAiResponseHistory] = useState([]);
  const [userChatHistory, setUserChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const handleSendText = async () => {
     setIsLoading(true); // set isLoading to true
     console.log(aiResponse);
     console.log(aiResponseHistory);
     console.log(userChatHistory);
    try {
      const response = await fetch("/api/textExample", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temperature,
          userChat,
          aiResponseHistory,
          userChatHistory
        }),
      });
      const data = await response.json();
      
      setAiResponse(data.result.content);
      setAiResponseHistory((prevaiResponseHistory) => [...prevaiResponseHistory, data.result.content]);
      setUserChatHistory((prevuserChatHistory) => [...prevuserChatHistory, userChat]);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false); // set isLoading back to false
    }
  };
  

  return (
    <div >
 
      <div>
        <label htmlFor="temperature" >Temperature:</label>
        <input
          id="temperature"
          type="number"
          value={temperature}
          onChange={(event) => setTemperature(Number(event.target.value))}
        />
             </div>
              <p></p>
              <p></p>
      <div>
        <label htmlFor="userChat" >Chat:</label>
        <textarea
          id="userChat"
          type="text"
          value={userChat}
          onChange={(event) => setUserChat(event.target.value)}
        ></textarea>
        </div>
        <p></p>


        <div>
      <button onClick={handleSendText}>Chat</button>
    {isLoading && <div>Loading...</div>} {/* display loading screen when isLoading is true */}
    </div>
    <div>
  <strong>Response:</strong>
  <p>{aiResponse}</p>
</div>
<div>
 
          <p>User Prompt History:</p>
         {userChatHistory}
          <p>AI Response History:</p>
          {aiResponseHistory}
    </div>
  
</div>
 
  );

};

export default Sim;