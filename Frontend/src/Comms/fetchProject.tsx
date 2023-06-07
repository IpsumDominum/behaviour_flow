import { useEffect, useState } from 'react';

// Custom hook to fetch projects
export function useFetchProject() {
  const [projectJson, setProjectJson] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/project')
      .then(response => response.json())
      .then(data => setProjectJson(data))
      .catch(err => console.error(err));
  }, []);

  return [projectJson];
}
