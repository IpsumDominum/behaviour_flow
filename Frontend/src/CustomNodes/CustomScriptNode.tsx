import React, { memo } from 'react';
import { Handle, Position,Node } from 'reactflow';

export default memo((node : Node, isConnectable:boolean) => {
  return (
    <div style={{border: '1px solid #777', padding: 10,background:'white',borderRadius:'10px' }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#777' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        {node.data.name}
        <button>Edit</button>
      </div>      
    </div>
  );
});
