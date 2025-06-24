import React, { useEffect, useRef, useState } from 'react';
import '../../../Styles/ProfilePage.css'
import { localDate } from '../../../utils/dateformat';
import { IoMdAddCircleOutline} from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdWorkOutline } from 'react-icons/md';
import { ImOffice } from 'react-icons/im';
import { MdOutlineDateRange } from 'react-icons/md';
import { LiaIndustrySolid } from 'react-icons/lia';
import { IoLocationSharp } from 'react-icons/io5';
import { GiSkills } from 'react-icons/gi';
import { RiCloseFill, RiShareForwardLine } from 'react-icons/ri';
import { Autocomplete, Chip, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMasterId } from '../../../utils/Storage';
import { getSingleMaster, updateExperience, updateMaster, deleteExperience } from '../../../api/master';


const Header = () => {
    let initialStateExperience = {
        title: '',
        workMode: '',
        companyName: '',
        location: '',
        currentlyWorking: '',
        startDate: '',
        endDate: '',
        skills: '',
    }
    let initialStateExperienceErrors = {
        title: {
            required: false
        },
        workMode: {
            required: false
        },
        companyName: {
            required: false
        },
        location: {
            required: false
        },

        startDate: {
            required: false
        },
        endDate: {

            required: false
        },
        skills: {
            required: false
        }
    };

    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState()
    const [experience, setExperience] = useState(initialStateExperience);
    const [experienceErrors, setExperienceErrors] = useState(initialStateExperienceErrors);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState(null);
    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        const data = getMasterId()
        getSingleMaster(data)
            .then((res) => {
                const result = res?.data?.result
                const experience = result?.experience
                setInputs({ ...inputs, ...result })
                setExperience({ ...experience, ...experience })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleExperienceInputs = (event) => {
        setExperience({ ...experience, [event?.target?.name]: event?.target?.value })
        if (submitted) {
            const newError = handleExperienceValidation({ ...experience, [event.target.name]: event.target.value })
            setExperienceErrors(newError)
        }
    }

    const handleExperienceValidation = (data) => {
        let error = initialStateExperienceErrors;
        if (data.title === "") {
            error.title.required = true;
        }
        if (data.workMode === "") {
            error.workMode.required = true;
        }
        if (data.companyName === "") {
            error.companyName.required = true;
        }
        if (data.location === "") {
            error.location.required = true;
        }

        if (data.startDate === "") {
            error.startDate.required = true;
        }
        if (data.endDate === "") {

            error.endDate.required = true;
        }
        if (data.skills === "") {
            error.skills.required = true;
        }
        return error
    }

    const handleExperienceErrors = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const prop = obj[key];
                if (prop.required === true || prop.valid === true) {
                    return false;
                }
            }
        }
        return true;
    }
    const handleSave = (event) => {
        event.preventDefault();
        const newErrorExperience = handleExperienceValidation(experience)
        setExperienceErrors(newErrorExperience)
        setSubmitted(true)
        if (handleExperienceErrors(newErrorExperience)) {
            inputs.experience = experience
            updateMaster(inputs)
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate("/ProfilePage")
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    }

    const handleUpdateExperience = (event) => {

        event.preventDefault();
        const newErrorExperience = handleExperienceValidation(experience)
        setExperienceErrors(newErrorExperience)
        setSubmitted(true)
        if (handleExperienceErrors(newErrorExperience)) {
            updateExperience(experience)
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate("/ProfilePage")
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    }
    const deleteProfileData = () => {
     
        deleteExperience(deleteId).then(res => {
       
          toast.success(res?.data?.message);
          closePopup()
       
        }).catch((err) => {
          console.log(err);
        });
      }
      const openPopup = (data) => {
        setOpen(true);
        setDeleteId(data)
      };
      const closePopup = () => {
        setOpen(false);
      };
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
  
      // Generate an array of the past 10 years
      const years = Array.from({ length: 25 }, (_, index) => currentYear - index);
  
      // Generate an array of months
      const months = Array.from({ length: 12 }, (_, index) => index + 1); // Months are one-indexed
  
      // Generate an array of days for the current month
      const days = Array.from({ length: new Date(currentYear, currentMonth, 0).getDate() }, (_, index) => index + 1);
  
 

  
   
    return (
        <>
            <div className='container p-0' >
                <div className='card  shadow border-0 rounded mt-5 p-4'>
                    <div className=''>
                        <div className='d-flex justify-content-between align-items-start'>
                            <p className='fw-bold'>Experience</p>
                            {/* Add Experience Modal */}
                            <div className='modal-btn'>
                                <button data-bs-toggle="modal" href="#exampleModalToggleThree" role="button"><IoMdAddCircleOutline /></button>
                            </div>
                            <div className="modal fade " id="exampleModalToggleThree" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1" >
                                <div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable" >
                                    <div className="modal-content border-0 shadow-lg rounded m-3">
                                        <div className="card w-100  border-0  shadow" style={{ height: '600px' }} >
                                            <div className="modal-header d-flex justify-content-between align-items-center">
                                                <p className="modal-title fs-4 fw-bolder mb-3" id="exampleModalToggleLabel">Add Experience</p>
                                                <button type="button" className="btn-close bg-white border rounded-5 m-0 mb-3" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body  ">
                                                <div className='container-fluid'>
                                                    <form className='fw-bolder' onSubmit={handleSave}>
                                                        <div className="mb-3">
                                                            <label htmlFor="title" className="form-label text-secondary" >Title<span className="text-danger">*</span></label>
                                                            <input type="text" name="title" onChange={handleExperienceInputs} placeholder='Ex: React Developer' className="form-control" id="title" />
                                                            {experienceErrors.title.required ? <span className="form-text text-danger">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="selectOne" className="form-label text-secondary">Employement Type<span className="text-danger">*</span></label>
                                                            <select onChange={handleExperienceInputs} name="workMode" className="form-select" aria-label="Default select example" id="selectOne">
                                                                <option selected>Please Select</option>
                                                                <option value={'fulltime'}>Full-time</option>
                                                                <option value={'parttime'}>Part-time</option>
                                                                <option value={'selfemployed'}>Self-employed</option>
                                                                <option value={'freelance'}>Freelance</option>
                                                                <option value={'internship'}>Internship</option>
                                                                <option value={'trainee'}>Trainee</option>
                                                            </select>
                                                            {experienceErrors.workMode.required ? <span className="form-text text-danger">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="companyName" className="form-label text-secondary">Company Name<span className="text-danger">*</span></label>
                                                            <input type="text" placeholder='Ex: Microsoft' name="companyName" onChange={handleExperienceInputs} className="form-control" id="companyName" />
                                                            {experienceErrors.companyName.required ? <span className="form-text text-danger">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="location" className="form-label text-secondary">Location<span className="text-danger">*</span></label>
                                                            <input type="text" placeholder='Ex: Banglore' name="location" onChange={handleExperienceInputs} className="form-control" id="location" />
                                                            {experienceErrors.location.required ? <span className="form-text text-danger">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>

                                                        <div className='mb-3'>
                                                            <div className="form-check">
                                                                <input className="form-check-input border" name="currentlyWorking" type="checkbox" value="" id="flexCheckDefault" />
                                                                <label className="form-check-label" name="currentlyWorking" onChange={handleExperienceInputs} for="flexCheckDefault">
                                                                    I am currently working in this role
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className='mb-3'>
                                                            <label className="form-label text-secondary">Start date<span className="text-danger">*</span></label>
                                                            <div className="row gap-2 d-flex justify-content-around">
                                                                <div className="col-md-5">
                                                                    <select id="yearSelect" onChange={handleExperienceInputs} name="startDate" className="form-select  form-select-sm" >
                                                                        {years.map((year) => (
                                                                            <option key={year} value={year}>
                                                                                {year}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                </div>
                                                                <div className="col-md-5">
                                                                    <select id="monthSelect" name="startDate" onChange={handleExperienceInputs} className="form-select form-select-sm" >
                                                                        {months.map((month) => (
                                                                            <option key={month} value={month} selected={month === currentMonth}>
                                                                                {new Date(0, month - 1).toLocaleString('en-US', { month: 'long' })}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>


                                                            </div>
                                                            {experienceErrors.startDate.required ? <span className="form-text text-danger">
                                                                This field is required.
                                                            </span> : null}
                                                            <br />
                                                            <label className="form-label text-secondary">End date<span className="text-danger">*</span></label>
                                                            <div className="row gap-2 d-flex justify-content-around">
                                                                <div className="col-md-5">
                                                                    <select id="yearSelect" onChange={handleExperienceInputs} name="endDate" className="form-select  form-select-sm" >
                                                                        {years.map((year) => (
                                                                            <option key={year} value={year}>
                                                                                {year}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-5">
                                                                    <select id="monthSelect" onChange={handleExperienceInputs} name="endDate" className="form-select form-select-sm" >
                                                                        {months.map((month) => (
                                                                            <option key={month} value={month} selected={month === currentMonth}>
                                                                                {new Date(0, month - 1).toLocaleString('en-US', { month: 'long' })}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                            </div>
                                                            {experienceErrors.endDate.required ? <span className="form-text text-danger">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>



                                                        <div className="mb-3">
                                                            <label htmlFor="skills" className="form-label text-secondary">Skills<span className="text-danger">*</span></label>
                                                            <input type="text" name="skills" onChange={handleExperienceInputs} placeholder='Ex: ReactJs, NodeJs, etc...' className="form-control w-100" id="skills" />
                                                            {experienceErrors.skills.required ? <span className="form-text text-danger">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        <div className="modal-footer d-flex justify-content-between align-items-center mt-5">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                            <button type="submit" className="btn btn-primary" >Save</button>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* { edit experiences. */}
                        {inputs?.experience?.map((experience, index) =>
                            <div key={index} className='card rounded mt-2 p-3 '>
                                <div className=''>
                                    {/* {result?.experience.map((experience,index)=> */}
                                    <div className='d-flex justify-content-between align-items-start'>
                                        <div className='my-1'>
                                            <h6 className='fw-bold'><MdWorkOutline /> - <span className='fw-lighter'> {experience?.title}</span></h6>
                                        </div>
                                        {/* Edit and delete */}
                                        {/* <div className='modal-btn'>
                                                <button type="button" className='btn btn-light' onClick={() => openPopup(initialStateExperience)}><FiEdit /></button>
                                            </div> */}
                                            <div className='modal-btn'>
                                            <Link className="dropdown-item" onClick={() => { openPopup(experience?._id) }} ><RiDeleteBin5Line /></Link>
                                        <Link to={{ pathname: '/profilePage', search: `?id=${experience?._id}` }} className='text-decoration-none text-dark'><FiEdit /></Link> 
                                    </div>
                                    </div>

                                    <div className='d-flex flex-wrap justify-content-between mt-2 align-items-center'>
                                        <div>
                                            <p className='fw-bold'><LiaIndustrySolid /> - <span className='fw-lighter'> {experience?.companyName}</span></p>
                                            <p className='fw-bold'><IoLocationSharp /> - <span className='fw-lighter'> {experience?.location}</span></p>
                                            <p className='fw-bold'><GiSkills /> - <span className='fw-lighter'> {experience?.skills}</span></p>
                                        </div>
                                        <div>
                                            <p className='fw-bold'><ImOffice /> - <span className='fw-lighter'> {experience?.workMode}</span></p>
                                            <p className='fw-bold'><MdOutlineDateRange /> - <span className='fw-lighter'> {localDate(experience?.startDate)}</span></p>
                                            <p className='fw-bold'><MdOutlineDateRange /> - <span className='fw-lighter'> {localDate(experience?.endDate)}</span></p>
                                        </div>
                                        <div>
                                           
                                         
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                   
                </div>
            </div>
            
<Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4">Are you sure you want to Delete <br /> the selected Experience ?</h5>
            <button type="button" className="btn btn-save mx-3" onClick={deleteProfileData}>Yes</button>
            <button type="button" className="btn btn-cancel " onClick={closePopup}>No</button>
          </div>
        </DialogContent>
</Dialog>

        </>
    )
}

export default Header