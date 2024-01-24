import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addNewSegment } from "./popUpSegment";
import { selectAllSegments } from "./popUpSegment";
import '../style.css';

const SegmentFrom = ({ isOpen, onClose }) => {

    const [openSchema, setOpenSchema] = useState(false);
    const [segmentname, setSegmentName] = useState('')
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [gender, setGender] = useState();
    const [age, setAge] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [addRequestStatus, setAddRequestStatus] = useState('idle');
    const canSave = [firstname, lastname, gender, age, city, state].every(Boolean);
    const segments = useSelector(selectAllSegments);
    const dispatch = useDispatch();

    const [aniOpen, setAniOpen] = useState(false);

    const animationEndHandler = ({ animationName }) => {
        if (animationName === 'open-menu') {
            setAniOpen(true);
        }

        if (animationName === 'close-menu') {
            setAniOpen(false);
        }
    };

    const handleSegmentData = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewSegment({ segmentname, firstname, lastname, gender, age, city, state })).unwrap()
                setSegmentName('')
                setFirstname('')
                setLastname('')
                setAge('')
                setGender('')
                setCity('')
                setState('');
            }
            catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }

    const openChangeSchema = () => {
        setOpenSchema(!openSchema)
    }


    const AddSchema = ({ openSchema }) => {


        if (!openSchema) return null
        return (
            <div onAnimationEnd={(event) => animationEndHandler(event)}
                className={aniOpen ? 'mainStyles open' : 'mainStyles close'}>
                <form>
                    <div className="Form-div">

                        <label>First Name</label><br />
                        <select value={firstname} onChange={(e) => setFirstname(e.target.value)}>
                            <option>Select first name</option>
                            <option>first_name</option>
                        </select>
                    </div>
                    <div className="Form-div">
                        <label>Lasr Name</label><br />
                        <select value={lastname} onChange={(e) => setLastname(e.target.value)}>
                            <option>Select last name</option>
                            <option>last_lame</option>
                        </select>
                    </div>
                    <div className="Form-div">
                        <label>Gender</label><br />
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option>Select gender</option>
                            <option>gender</option>
                        </select>
                    </div>
                    <div className="Form-div">
                        <label>Age</label><br />
                        <select value={age} onChange={(e) => setAge(e.target.value)}>
                            <option>Select age</option>
                            <option>age</option>
                        </select>
                    </div>
                    <div className="Form-div">
                        <label>City</label><br />
                        <select value={city} onChange={(e) => setCity(e.target.value)}>
                            <option>Select city</option>
                            <option>city</option>
                        </select>
                    </div>
                    <div className="Form-div">
                        <label>State</label><br />
                        <select value={state} onChange={(e) => setState(e.target.value)}>
                            <option>Select state</option>
                            <option>state</option>
                        </select>
                    </div>
                    <button onClick={handleSegmentData} disabled={!canSave} className="save-btn">Save Segment</button>
                    <button onClick={onClose} className="cancel-btn">Cancel</button>
                </form>
            </div>
        )
    }

    if (!isOpen) return null;
    return (
        <div className='Modal'>
            <div>
                <label>Enter the Name of the Segment</label><br />
                <input type='text' placeholder='Name of the segment' value={segmentname} onChange={(e) => { setSegmentName(e.target.value) }} />
                <p>To Save your segment, you need to add the schemas to build the query</p>
            </div>

            <div>
                <button type='button' onClick={openChangeSchema} className="add-button">+ Add new schema</button>
                <AddSchema openSchema={openSchema} onClose={onClose} />
            </div>
        </div>
    )
}

export default SegmentFrom;