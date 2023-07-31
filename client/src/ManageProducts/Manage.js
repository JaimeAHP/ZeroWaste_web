import React from 'react'
import '../CSS/Manage.css';
import Form from './Form';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Manage() {
    const [buttonPopup, setButtonPopup] = useState(false);
    const [edit, setEdit] = useState(false);
    const [inputData, setInputData] = useState({ id: '', name: '', cost: '', link: '', desc: '' });
    const [intId, setIntId] = useState(null);
    const [outputData, setOutputData] = useState([]);
    const [postList, setPostList] = useState([]);
    
    const handleRefresh = (event) => {
        axios.get('http://localhost:8080/posts')
        .then((response) => response.data)
        .then(response => setPostList(response));
        console.log(postList);
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputData({ ...inputData, [name]: value });
      };

    const handleSubmit = (event) => {
        console.log(inputData);
        const { id, name, cost, link, desc } = inputData;
        const newOutputData = [...outputData, { name, cost, link, desc}]; 

        if (name.length === 0){
            window.alert("Enter a Product Name");
        }
        else if (cost.length === 0){
            window.alert("Enter a Product Cost");
        }
        else if (link.length === 0){
            window.alert("Enter a Product Link");
        }
        else if (desc.length === 0){
            window.alert("Enter a Product Description");
        }
        else{
            if (edit){
                console.log("edit");
                console.log(inputData);
                console.log(intId);
                console.log(id, name, cost, link, desc)

                axios.put(`http://localhost:8080/editposts/${intId}`,{
                    name: name,
                    cost: cost,
                    link: link,
                    desc: desc
                });                
                window.alert("edit successful")
                
                setInputData({ name: '', cost: '', link: '', desc: '' });
                console.log(inputData);
                setEdit(false);
                console.log(edit);
                setIntId(null);
                console.log(intId);
            }
            else {
                console.log("no edit");
                setOutputData(newOutputData);
                axios.post('http://localhost:8080/addposts',{name, cost, link, desc})
                window.alert("post successful")
                console.log(inputData);
                setInputData({ name: '', cost: '', link: '', desc: '' });
            }
        }

        handleRefresh();
        handleRefresh();
    };

    const handleDelete = postid => {
        axios.delete(`http://localhost:8080/deleteposts/${postid}`);
        
        handleRefresh();
        handleRefresh();
    };

    const handleEdit = (postid, postname, postcost, postlink, postdesc) => {
        setInputData({ id: postid, name: postname, cost: postcost, link: postlink, desc: postdesc});
        setIntId(parseInt(postid));
        console.log(intId);
        console.log(inputData);
        setEdit(true);
        console.log(edit);
    };

    const noEdit = () =>{
        setInputData({ name: '', cost: '', link: '', desc: '' })
    }

    useEffect((postList) => {
        axios.get('http://localhost:8080/posts')
        .then((response) => response.data)
        .then(response => setPostList(response));
    }, []);

    return (
        <div className = "Manage">
            <div className = "grid">
                <div className = "main">
                    <div id = "history">
                        <h2>My Post</h2>
                        <div className = "posts">
                            {postList.map((data, index) => (
                                <div key={index}>
                                    <div className = "post">
                                        <p>{`Product Name: ${data.postname}`}</p>
                                        <p>{`Product Cost: ${data.postcost}`}</p>
                                        <p>{`Product Link: ${data.postlink}`}</p>
                                        <p>{`Product Description: ${data.postdesc}`}</p>
                                        <button onClick={() => handleDelete(data.postid)}>Delete</button>
                                        <button onClick={() => {handleEdit(data.postid, data.postname, data.postcost, data.postlink, data.postdesc); setButtonPopup(true)}}>Edit</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className = "sideR">
                    <div className = "btn">
                        <button onClick={() => {setButtonPopup(true); noEdit()}}>Post Product</button>
                    </div>
                </div>
                <Form trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h2>PRODUCT INFORMATION</h2>
                    <input id="in1" className="input" value={inputData.name} placeholder="Name of Product" name="name" onChange={handleChange}/>
                    <input id="in2" className="input" value={inputData.cost} placeholder="Cost of Product" name="cost" onChange={handleChange}/>
                    <input id="in3" className="input" value={inputData.link} placeholder="Product Link" name="link" onChange={handleChange}/>
                    <textarea id="in4" className="textarea" value={inputData.desc} placeholder="Product Description..." name="desc" onChange={handleChange}></textarea>
                    <button onClick={handleSubmit}>submit</button>
                </Form>
            </div>
        </div>
    )
}

export default Manage