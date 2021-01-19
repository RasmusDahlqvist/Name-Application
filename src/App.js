import React, { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

const RenderList = (props) => {
  return (
    <div>
    {props.list.map((n, i) => 
      <li key={i}> {n.name},   {n.amount}</li>)}
    </div>
  )
}

const List = (props) => {
  if(props.whatToRender == 1) {
    return <RenderList list={props.popularList} />
  } else if(props.whatToRender == 2) {
    return <RenderList list={props.azList} />
   } else if(props.whatToRender == 3) {
     return <RenderList list={props.filterList} />
   } else {
     return <RenderList list={props.names} />
   }
}

const App = () => {
  const [names, setNames] = useState([])
  const [filterList, setFilterList] = useState([])
  const [popularList, setPopularList] = useState([])
  const [azList, setAzList] = useState([])
  const [whatToRender, setWhatToRender] = useState(0)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/names')
      .then(response => {
        console.log('promise fulfilled')
        setNames(response.data)
      })
  }, [])
  console.log('render', names.length, 'names')


  let filtered = '' 
  const handleFilterChange = (event) => {
    filtered = names.filter(n => n.name.toUpperCase().includes(event.target.value.toUpperCase()));
    setFilterList(filtered);
    setWhatToRender(3)
    }
    let popular = ''
    const handleSortPopularity = () => {
      popular = names.sort((a, b) => a.amount < b.amount ? 1 : -1)
      setPopularList(popular)
      setWhatToRender(1)
    }
    let az = ''
    const handleSortAZ = () => {
      az = names.sort((a, b) => a.name > b.name ? 1 : -1)
      setAzList(az)
      setWhatToRender(2)
    }

    return(
    <div>
      <h1>Name Application</h1> 
      <p>The top-10 of both male and female names in Solita.</p>
      <button onClick={handleSortPopularity} >Sort by popularity</button>
      <button onClick={handleSortAZ} >Sort alphabetically</button>
    

      <form>
        <label>Search: </label>
      <input type="text"
      
      onChange={handleFilterChange}
      />
      </form>
      

      <List whatToRender={whatToRender} popularList={popularList}
      azList={azList} names={names} filterList={filterList} />

     </div>
    )
}

export default App