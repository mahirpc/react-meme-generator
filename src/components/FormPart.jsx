import React from 'react'
import "../components/formPart.css"
import { useState,useEffect } from 'react'


function FormPart() {

const [memesData,setMemesData] = useState({})

useEffect(()=>{
  fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(datas => setMemesData(datas["data"]["memes"]))
},[])

  const [memeObject,setMemeObject] = useState({
                                                top:"",
                                                bottom:"",
                                                image:"",
                                                            })                                             
  
  function getMemeUrl(){
    let url = memesData[Math.floor(Math.random() * memesData.length)].url
    setMemeObject(prevMeme => ({...prevMeme,image:url}))
    
  }
  function handleChange(event){
    const {name,value} = event.target
    setMemeObject(prevMeme => {
      return {...prevMeme,[name]:value}
    })
  }

  return (
      <div className='form'>
        <div className='inputs'>
            <input 
              onChange={handleChange} 
              className='input input_1'
              type={'text'} 
              placeholder={'FIRST PART'}
              name="top"
              value={memeObject.top}>
            </input>
            <input 
              onChange={handleChange}
              className='input input_2' 
              type={'text'} 
              placeholder={'SECOND PART'}
              name="bottom"
              value={memeObject.bottom}>
            </input>
        </div>
        <button onClick={getMemeUrl} className="form-button">Get a new meme image</button>
        <div className="meme-container">
          { memeObject.image!=="" && <img src={memeObject.image} className="meme-image" alt="meme"/>}
          { memeObject.image!=="" && <h1 className='top-part'>{memeObject.top}</h1>}
          { memeObject.image!=="" && <h1 className='bottom-part'>{memeObject.bottom}</h1>}
        </div>
      </div>    
  )
}

export default FormPart
