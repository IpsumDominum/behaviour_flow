import os
class RobotState:
    def __init__(self):
        self.values = {}
    def update(self,k,v):
        self.values[k] = v
        self.write()
    def write(self):
        with open("state.lock","w") as file:
            file.write("")
        with open("state.state","w") as file:
            for k,v in self.values.items():
                file.write(f"{k} : {v}")
        os.remove("state.lock")
    def read(self):
        while os.path.isfile("state.lock"):
            pass
        if not os.path.isfile("state.state"):
            return
        with open("state.state","r") as file:
            for l in file.readlines():
                k,v = l.split(" : ")
                self.values[k] = v
    def __str__(self):
        to_print = ""
        for k,v in self.values.items():
            to_print += f"{k}:{v}"
        return to_print
