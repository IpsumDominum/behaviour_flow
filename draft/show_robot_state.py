from robot_state import RobotState

state = RobotState()
while True:
    state.read()
    print("====")
    print(state)