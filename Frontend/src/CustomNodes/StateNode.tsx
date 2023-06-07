import React, { memo } from 'react';
import { Handle, Position,Node } from 'reactflow';

export default memo((node : Node, isConnectable:boolean) => {
  return (
    <div style={{border: '1px solid #777', padding: 10,background:'white',borderRadius:'10px' }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: 'white' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        State <strong>Idle</strong>
      </div>

      <div style={{background:'rgba(80,100,200,0.8)',color:'white',padding:5,position:'relative',borderRadius:'16px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',margin:'10px 0px 10px 0px'}}>
        On Enter State
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{background: '#555' ,position:'absolute',width:'10px',height:'10px',right:'-10px',
        
      }}
        isConnectable={isConnectable}
      />
      </div>      
      

      <div style={{background:'rgba(80,100,200,0.8)',color:'white',padding:5,position:'relative',borderRadius:'16px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',margin:'10px 0px 10px 0px'}}>
        On Speech Heard
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{background: '#555' ,position:'absolute',width:'10px',height:'10px',right:'-10px',
        
      }}
        isConnectable={isConnectable}
      />
      </div>      

    
      <div style={{background:'rgba(80,100,200,0.8)',color:'white',padding:5,position:'relative',borderRadius:'16px',boxShadow:'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',margin:'10px 0px 10px 0px'}}>
        On Exit State
      <Handle
        type="source"
        position={Position.Right}
        id="c"
        style={{background: '#555' ,position:'absolute',width:'10px',height:'10px',right:'-10px',
        
      }}
        isConnectable={isConnectable}
      />
      </div>      
    </div>
  );
});
