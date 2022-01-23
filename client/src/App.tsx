import React, { useEffect, useState }from 'react';
import { useEmissions } from './hooks/useEmissions';

type Props = {};

const App = (props: Props) => {
  const [emissionsCategories, setEmissionCategories] = useState();
  const { getEmissionCategories } = useEmissions();


  useEffect(() => {
    async function handleGetEmissionCategories(){
      const emissions = await getEmissionCategories();
      setEmissionCategories(emissions)

    }

    handleGetEmissionCategories()
  }, [])

  console.log({emissionsCategories})

  return <div>hello</div>;
};


export default App;
