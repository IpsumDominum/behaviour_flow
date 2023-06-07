import React, { SetStateAction, useCallback ,useEffect,useState} from 'react';
import StateNode from './CustomNodes/StateNode';
import CustomScriptNode from './CustomNodes/CustomScriptNode';
import ReactFlow, {
  MiniMap,
  Panel,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
import { useFetchProject } from './Comms/fetchProject';
import 'reactflow/dist/style.css';


const initBgColor = '#1A192B';
const snapGrid :[number,number]= [20, 20];
const nodeTypes = {
  stateNode: StateNode,
  customScriptNode: CustomScriptNode
};



export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [leftPaneVisible, setLeftPaneVisible] = useState(true);
  const [rightPaneVisible, setRightPaneVisible] = useState(true);
  const [projectJson] = useFetchProject()

  const processProject = (projectJson:any)=>{
    if(!projectJson){
      return [undefined,undefined];
    }
    // @ts-ignore
    const fetchedNodes : SetStateAction<Node<any, string| undefined>[]> = projectJson.nodes;
    // @ts-ignore
    const fetchedEdges : Edge<any> = projectJson.edges;
    console.log(projectJson);

    return [fetchedNodes,fetchedEdges];
  };

  const onChange = (event:any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== '2') {
          return node;
        }
        const color = event.target.value;
        setBgColor(color);
        return {
          ...node,
          data: {
            ...node.data,
            color,
          },
        };
      })
    );
  };
  /*
  [
    { id: '1', position: { x: 200, y: 0 }, data: { label: 'Entry' } },
    //{ id: '2', position: { x: 200, y: 300 }, data: { label: 'Respond (Script)' } },
    //{ id: '3', position: { x: 400, y: 300 }, data: { label: 'Responding' } },
    {
      id: '4',
      type: 'stateNode',
      data: { onChange: onChange, color: initBgColor,name:fetchedString},
      position: { "x": 300, "y": 50 },
    },
    {
      id: '5',
      type: 'customScriptNode',
      data: { onChange: onChange, color: initBgColor,name:fetchedString},
      position: { x: 350, y: 50 },
    },
    ]*/
  //{ id: 'e1-2', source: '1', target: '4' },
  useEffect(() => {
    const [fetchedNodes,fetchedEdges] = processProject(projectJson);
    if(fetchedNodes){
      setNodes(fetchedNodes);
    }
    if(fetchedEdges){
      setEdges(
        fetchedEdges
     );
    }
  }, [projectJson]);

  
  const toggleLeftPane = () => {
    setLeftPaneVisible(!leftPaneVisible);
  };

  const toggleRightPane = () => {
    setRightPaneVisible(!rightPaneVisible);
  };


  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  return (
    <>
    <div style={{display:"flex",flexDirection:"column"}}>
    <div style={{display:'flex'}}>
      {leftPaneVisible && 
        <div style={{ width: '20vw', height: '100vh', position: 'relative' }}>
          <button
            onClick={toggleLeftPane}
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              background: 'red',
              color: 'white',
              border: 'none',
            }}
          >
            x
          </button>
        </div>
      }
      <div style={{ width: leftPaneVisible ? rightPaneVisible ? '60vw' : '80vw' : rightPaneVisible ? '80vw' : '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ background: bgColor }}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitView
      >
        <Panel position="top-left">
        <div style={{padding:'10px',background:'white',boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
          Behaviour Flow
          <button style={{margin:'5px',border:'gray solid 1px',background:'rgba(50,60,90,0.9)',color:'white'}}>Begin Simulate</button>
          <button style={{margin:'5px',border:'gray solid 1px'}}>Load Project</button>
          <button style={{margin:'5px',border:'gray solid 1px'}}>Save Project</button>
          <button style={{margin:'5px',border:'gray solid 1px'}}>Compile</button>
          </div>
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots}
        
        gap={12} size={1} />
      </ReactFlow>
    </div>
    {rightPaneVisible ? (
        <div style={{ width: '20vw', height: '100vh', position: 'relative' }}>
          <button
            onClick={toggleRightPane}
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              background: 'red',
              color: 'white',
              border: 'none',
            }}
          >
            x
          </button>
        </div>
      ) : (
        <button
          onClick={toggleRightPane}
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: 'blue',
            color: 'white',
            border: 'none',
          }}
        >
          Show Right Pane
        </button>
      )}
    </div>

    {/*<div style={{display:'flex',position:"fixed",bottom:"0px",height:'200px',width:"100%",background:"white",border:"black solid 5px",padding:"20px"}}>
          Console:
        </div>*/}
    
    </div>
    </>
  );
}