from abc import abstractmethod
import os

class Block:
    id=None
    def __init__(self):
        pass

    @abstractmethod
    def execute(self):
        finished = False
        transiton_to = []
        return finished,transition_to

class EntryBlock(Block):
    def __init__(self,id=None,next_blocks=[]):
        self.id = id
        self._next_blocks = next_blocks

    def execute(self):
        finished = True
        transition_to = []
        for block in self._next_blocks:
            transition_to.append(block.id)

        return finished,transition_to

class StateBlock(Block):
    def __init__(self,id=None):
        self.id = None

    def execute(self):
        pass

class ScriptBlock(Block):
    def __init__(self,id=None):
        self.id = id

    def execute(self):
        pass

class Simulator:
    def __init__(self,project_name):
        self.blocks = self.load_blocks_from_project(project_name)
        self._current_running_blocks = self.find_entry_block(self.blocks)

    def load_blocks_from_project(self,project_name):
        project_root_path = os.path.abspath(os.path.dirname(__file__))
        with open(os.path.join(
            project_root_path,
            "saved_projects",f"{project_name}.hb"),"r") as file:
                print(file.read())
        return []
        
    def find_entry_block(self,blocks):
        """
        Find the first entry block of the blocks involved in the simulation.
        Add that block to the exeuction order. (Not as in kill it but you know)
        """
        return blocks[-1]

    def get_debug_data(self):
        return self._current_running_blocks,self.blocks

    def simulate(self):
        for block in self._current_running_blocks:
            finished,transition_to = block.execute()            
            if finished:
                self._current_running_blocks.remove(block)
            #TODO make a dict instead,also running or not should be an id array
            if transition_to:
                for block in self.blocks:                    
                    if block.id in transition_to:                        
                        self._current_running_blocks.append(block)
        return True

s = Simulator("test")
while True:
    debug_data = s.get_debug_data()
    s.simulate()



