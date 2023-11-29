import React, { useState } from 'react'
import './Login.css'
const LoginPage = () => {
    const [file,setFile]=useState([])
    const type=['image/png','image/jpeg']
    const handleChange=(e)=>{
        let selected=e.target.files[0]
        if(selected && type.includes(selected.type)){
            setFile([...file,{selected}])
            console.log('correct file',file)
            console.log(file)
        }
        else{
            console.log('error file')
        }
    }
  return (
    <center>
      <h3>This Is LoginPage</h3>
      <div className='form'>
        <label htmlFor='file'>Upload ^</label>
        <input type='file' id='file' onChange={(e)=>handleChange(e)}/>
        <p>{file && file.name}</p>
        {file.length>0 && <p>{file.length}</p>}
        <div>
        </div>
      </div>
    </center>
  )
}

export default LoginPage
