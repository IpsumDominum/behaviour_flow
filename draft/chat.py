from robot_state import RobotState
def respond(reply):
    print("Bot:",reply)

state = RobotState()
state.update("state","idle")


while True:
    msg = input(">")
    if "hi" in msg.lower():
        reply = "Hi, how are you doing?"
        state.update("state","just_said_hi")
    else:
        reply = "Um sorry but I don't understand what you mean."

    respond(reply)

