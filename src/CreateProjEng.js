import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage'
import { useSelector } from 'react-redux';
const CreateProjEng = () => {
    // const token = localStorage.getItem("response-token");
    const  token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState({
        contractor:'',
        endClient:'',
        primaryResource:'',
        secondaryResource:'',
        startDate:'',
        endDate:'',
        status:''
    });
    function submit(e){
        e.preventDefault();
        setLoading(true); 
        axios.post(`/apigateway/hrms/engagement/saveProjectEngagement`,{
            contractor:data.contractor,
            endClient:data.endClient,
            primaryResource:data.primaryResource,
            secondaryResource:data.secondaryResource,
            startDate:data.startDate,
            endDate:data.endDate,
            status:data.status
        },{
            headers:{
            'Authorization':`Bearer ${token}`
        }}).then((response)=>{
            console.log(response.data);
            toast.success(response.data, { position: 'top-center', theme: "colored" });
            setLoading(false); 
        }).catch((error)=>{
            console.log(error);
            toast.error(
                error.response.data.message || "Error saving project details."
              );
            setLoading(false); 
        })

    }
    var str2bool = (value) => {
        if (value && typeof value === "string") {
            if (value.toLowerCase() === "true") return true;
            if (value.toLowerCase() === "false") return false;

        }
        return value;
    }
    function radiobut(e) {
        console.log(str2bool(e.target.value));
        // Here we can send the data to further processing (Action/Store/Rest)
        data.status = str2bool(e.target.value);
    }
    function handle(e){
           const newData = {...data};
           newData[e.target.id]= e.target.value;
           setData(newData);
           console.log(newData);
    }
    return (
        <div className=" mt-3">
             {loading ? <LoadingPage/> : ''}
        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
        <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
        
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><Link to="">Partner</Link></li>
            <li className="breadcrumb-item active" aria-current="page"> Create Project Engagement</li>
        </ol>
    </nav>
        <div className='container pt-3'>
           
           
        <div className='row'>
        <div>
      <h1  className='Heading1' style={{ textAlign: 'center' }}>Create Project Details</h1>
    </div>
            <div className='col-md-8 mx-auto'>
                <div className='card border-0 shadow' style={{  marginRight:'100px',width:'700px',height:'550px'}}>
                    <div className='card-body'>
                        <form className='container py-3  mb-3' onSubmit={(e) => { submit(e) }}>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='contractor'>contractor</label>
                                <div className="col-sm-10">
                                    <input onChange={(e) => { handle(e) }} value={data.contractor || ''}
                                        type="text"
                                        id="contractor"
                                       placeholder='Enter project name'
                                        className="form-control" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='endClient'>End Client</label>
                                <div className="col-sm-10">
                                    <input onChange={(e) => { handle(e) }} value={data.endClient || ''}
                                        type="text" className="form-control"
                                        id="endClient" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='primaryResource'>Primary Resource</label>
                                <div className="col-sm-10">
                                    <input onChange={(e) => { handle(e) }} value={data.primaryResource || ''}
                                        type="text" className="form-control"
                                        id="primaryResource" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='secondaryResource'>Secondary Resource</label>
                                <div className="col-sm-10">
                                    <input onChange={(e) => { handle(e) }} value={data.secondaryResource || ''}
                                        type="text" className="form-control"
                                        id="secondaryResource" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='startDate'>Start Date</label>
                                <div className="col-sm-10">
                                    <input onChange={(e) => { handle(e) }} value={data.startDate || ''}
                                        type="date" className="form-control"
                                        id="startDate" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='endDate'>End Date</label>
                                <div className="col-sm-10">
                                    <input onChange={(e) => { handle(e) }} value={data.endDate || ''}
                                        type="date" className="form-control"
                                        id="endDate" />
                                </div>
                            </div>
                            <fieldset className="row mb-3">
                                <legend className="col-form-label col-sm-2 pt-0">Status</legend>
                                <div className="col-sm-10">

                                    <div className="form-check form-check-inline">
                                        <input onChange={radiobut} value="true" className="form-check-input" type="radio" name="inlineRadioOptions" id="status" />
                                        <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input onChange={radiobut} value="false" className="form-check-input" type="radio" name="inlineRadioOptions" id="status" />
                                        <label className="form-check-label" htmlFor="inlineRadio2">InActive</label>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-outline-danger" type="submit">Submit</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}

export default CreateProjEng
