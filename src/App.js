import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [img, setImage] = useState(null)
  const [dogBreeds, updateDogBreeds] = useState([])
  const [selectBreed, setSelectedBreed] = useState('Random')

  useEffect(() => {
    console.log("inside use Effect")
    fetch('https://dog.ceo/api/breeds/list').then(res => res.json()).then(data => {
      updateDogBreeds(data.message)
    })
  }, [])

  let generateDog = () => {
    if (selectBreed === 'Random') {
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(data => {
          setImage(data.message)
        })
    } else {
      fetch(`https://dog.ceo/api/breed/${selectBreed}/images/random`)
        .then(res => res.json())
        .then(data => {
          setImage(data.message)
        })
    }
  }

  let updateSelectedBreed = (e) => {
    console.log(e.target.value)
    setSelectedBreed(e.target.value)
  }

  return (
    <div>
      <div>
        <select onChange={updateSelectedBreed}>
          <option value="Random">Random</option>
          {dogBreeds.map((breed) => {
            return <option value={breed}>{breed}</option>
          })}
        </select>
        <button onClick={generateDog}>Generate Doggo</button>
      </div>
      <div>

        <img src={img} />
      </div>
    </div>
  )
}

export default App;
