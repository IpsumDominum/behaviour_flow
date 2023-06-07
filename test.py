import openai

openai.api_key = "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"

class Chatbot:
    def __init__(self):
        self.chat_history = []
        self.max_history_len = 10

    def build_prompt(self,message):
        prompt = "\n".join([
            "Detect the intention of the following sentence:",
            "Sentence: Hi how are you?",
            "Intention: greetings",
            "Sentence: I don't like you.",
            "Intention: opinion",
        ]
        )
        #for item in self.chat_history:
        #    prompt += ""
        prompt += "\nSentence: "+message+"\nIntention:"
        return prompt
        
    def get_response(self,message,cb):
        stream = openai.Completion.create(
            engine="text-davinci-003",  # Replace this with the desired engine
            prompt=self.build_prompt(message),
            max_tokens=200,
            n=1,
            stop=None,
            temperature=1,
            stream=True
        )
        EOS = [".",",","!","?"]
        buffer = ""
        full_response = []
        for s in stream:
            t = s.choices[0].text
            buffer += t
            if t in EOS:
                cb(buffer)
                full_response.append(buffer)
                buffer = ""
            else:
                pass
        if buffer:
            cb(buffer)
            full_response.append(buffer)
        self.chat_history.append(
                {"role":"user","content":message}
        )
        self.chat_history.append(
                {"role":"assistant","content":full_response}
        )
        if len(self.chat_history) > self.max_history_len:
            self.chat_history.pop(0)

chatbot = Chatbot()        
while True:
    message = input()
    chatbot.get_response(message,lambda x:print(x))
    
