import { useState, useRef } from "react";
import axios from "axios";
import './App.css';
import { useNavigate } from 'react-router';

function Dashboard() {
    const [shown, setshown] = useState("");
    const [val, setval] = useState("");
    const navigate = useNavigate();
    const [addrs, seradrs] = useState([]);


    function pincode(id) {
        console.log(id)
        axios.get('http://localhost:13723/api/Countries/' + id)
            .then((response) => {
                const arr = [];
                arr[0] = response.data.pincode;
                arr[1] = response.data.stateName;
                arr[2] = response.data.district;
                seradrs(arr)
            }).catch((abc) => {
                console.log("UnSuccess");
            })
    }
    //const navigate = useNavigate()
    const f1 = useRef();
    const f2 = useRef();
    const f3 = useRef('2022-01-01');
    const f4 = useRef('NA');
    const f5 = useRef();
    const f8 = useRef();
    const f9 = useRef();
    const f10 = useRef();
    const f11 = useRef();
    const f12 = useRef();
    const f13 = useRef();
    const f14 = useRef();
    const f15 = useRef();
    const f16 = useRef();
    const f17 = useRef();


    const onCreateData = (e) => {
        e.preventDefault();

        const payload = {};

        payload.inspectionDate = f1.current.value;
        payload.firstId = f2.current.value;
        payload.additionalId = f3.current.value;
        payload.describe = f4.current.value;
        payload.phoneNum = f5.current.value;
        payload.inspectionComments = f8.current.value;
        payload.country = f9.current.value;
        payload.states = f10.current.value;
        payload.city = f11.current.value;
        payload.postal = f12.current.value;
        payload.crctAdd = f13.current.value;
        payload.addrsExplaination = f14.current.value;
        payload.geoCode = f15.current.value;
        payload.propertyPhoto = f16.current.value;
        payload.mapcode = f17.current.value;


        const cardleft = document.querySelectorAll('input[name="cardleft"]')  //Yes or No type
        for (const f of cardleft) {
            if (f.checked) {
                payload.doorCard = f.value
            }
        }
        //console.log("card left " + payload.cardleft);

        const Loc_Con = document.querySelectorAll('input[name="Loc_Con"]')   //Yes or No Type
        for (const f of Loc_Con) {
            if (f.checked) {
                payload.locationCon = f.value
            }
        }
        //console.log("Loc_Con " + payload.locationCon);

        const Equip = document.querySelectorAll('input[name="Equip"]')  // Equipment type  like truck, wheel chair
        for (const f of Equip) {
            if (f.checked) {
                payload.equipment = f.value;
            }
            else{
                payload.equipment = '';
            }
        }
        //console.log("Equip " + payload.equipment);

        const phone = document.querySelectorAll('input[name="phone"]')  //home/business/others
        for (const f of phone) {
            if (f.checked) {
                payload.primaryPhoneIs = f.value
            }
        }
        //console.log("Phone " + payload.primaryPhoneIs);


        if (payload.inspectionDate && payload.firstId) {
            if (payload.doorCard && payload.phoneNum && payload.primaryPhoneIs && payload.locationCon) {
                if (payload.postal && payload.states && payload.city) {
                    if (payload.mapcode) {
                        if (payload.country) {
                            axios.post('http://localhost:13723/api/Mains', payload).then((res) => {
                                navigate('/')
                                alert("-> Data Saved Succesfully:")
                            });
                        }
                        else {
                            alert("-> There is Some Error\ntry agaian")
                        }
                    }
                    else {
                        alert("-> Please Enter Mapcode!!!")
                    }
                }
                else {
                    alert("-> Please enter valid pin/postal code!!!")
                }
            }
            else {
                alert("-> Please provide (*) all mandatory feilds in Door Visit Section!!!")
            }
        }
        else {
            alert("-> Please provide (*) all mandatory feilds in General info!!!")
        }


    }
    function ResetData() {
        window.location.reload(false);
        alert("-> Your data has been resetted\n-> Please refill the form!!!")
    }


    return (
        <form className="layout">
            <div>
                <div className="Main-header"><h1>Please Fill The Form</h1></div>
                <div>
                    {/* Header section */}
                    <hr /><h2 className="App-header">Inspection Info</h2><hr />
                    <div className="items">
                        <label id="label">Inspection Date<sup id="sup">*</sup>:</label> &ensp;{" "}
                        <input type="date" ref={f1} /> &emsp;
                        <label id="label">First Inspection Date<sup id="sup">*</sup>:</label> &ensp;{" "}
                        <input type="date" ref={f2} /> &emsp;
                        <label id="label">Additional Inspection Date:</label> &ensp;{" "}
                        <input type="date" ref={f3} />
                    </div>
                </div>
                <br />
                <div>
                    <hr /><h3 className="App-header">Door Visit</h3><hr />
                    <label id="label">Door_card_left<sup id="sup">*</sup>:</label>
                    <input
                        type="radio"
                        id="r1"
                        name="cardleft"
                        value="Yes"
                        onChange={() => setshown("Yes")}

                    ></input>
                    <label htmlFor="r1">Yes</label>
                    <input
                        type="radio"
                        id="r2"
                        name="cardleft"
                        value="No"
                        onChange={() => setshown("No")}

                    ></input>
                    <label htmlFor="r2">No</label>
                </div>
                {shown === "No" && (
                    <div>
                        {/* <label><input type='text' placeholder='No' value='No' ref={f19} disabled />Door Card Left at Property : No</label><br /> */}
                        <hr />
                        <div>
                            <label id="label">
                                Explain<sup id="sup">*</sup>:
                            </label>
                            <br></br>
                            <textarea className="cmnt" placeholder="Explain" ref={f4} />
                        </div>
                    </div>
                )}
                <br /><br />
                <div>
                    <label id="label">Corrected Primary Phone Number<sup id="sup">*</sup>:</label> &ensp;
                    <input type="text" pattern="[0-9]*" maxLength="10" placeholder="8675678653" ref={f5} /> &emsp;
                    <label id="label">Primary Phone is<sup id="sup">*</sup>:</label>
                    <input type="radio" id="l1" name="phone" value="Home"></input>
                    <label htmlFor="l1">Home</label> &ensp;
                    <input
                        type="radio"
                        id="l2"
                        name="phone"
                        value="Business"
                    ></input>
                    <label htmlFor="l2">Business</label>&ensp;
                    <input
                        type="radio"
                        id="l3"
                        name="phone"
                        value="Others"
                    ></input>
                    <label htmlFor="l3">Others</label> &emsp;
                    <label id="label">
                        Location Constraint<sup id="sup">*</sup>:
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="Loc_Con"
                            value="Yes"
                            onClick={() => setval("Yes")}

                        ></input>
                        Yes
                    </label>{" "}
                    &ensp;
                    <label>
                        <input
                            type="radio"
                            name="Loc_Con"
                            value="No"
                            onClick={() => setval("No")}

                        ></input>
                        No
                    </label>
                </div>
                {val === "Yes" && (
                    <div>
                        <h2>Location Constraint</h2>
                        <hr></hr>
                        <div>
                            <label>
                                Equipment Needed<sup id="sup">*</sup>:
                            </label>
                            <input
                                type="radio"
                                id="m1"
                                name="Equip"
                                value="Ferry"

                            ></input>
                            <label htmlFor="m1">Ferry</label> &ensp;
                            <input
                                type="radio"
                                id="m2"
                                name="Equip"
                                value="Truck chain"

                            ></input>
                            <label htmlFor="m2">Truck chain</label>&ensp;
                            <input
                                type="radio"
                                id="m3"
                                name="Equip"
                                value="4-wheel drive vehicle"

                            ></input>
                            <label htmlFor="m3">4-wheel drive vehicle</label> &emsp;
                        </div>
                    </div>
                )}
                <br />
                <div>
                    <hr></hr>
                    <label id="label">Inspection Comment:</label><br />
                    <textarea className="cmnt" placeholder="describe" ref={f8} />

                </div>
                {/*Address Feild
        
        Enter any text here it won't reflect anything
        */}
                <hr />
                <h2 className="App-header">Corrected Address</h2>
                <div>
                    <label id="label">
                        Pin Code of Property<sup id="sup">*</sup>:
                    </label>
                    &nbsp;
                    <input type="text" pattern="[0-9]*" maxLength="6" placeholder="ex: 504311" ref={f12} onChange={() => pincode(f12.current.value)}></input>
                    &emsp;
                    <label id="label">
                        State of Property<sup id="sup">*</sup>:
                    </label>
                    &nbsp;
                    <input type="text" value={addrs[1]} ref={f10} disabled></input>&emsp;
                    <label id="label">
                        City of Property<sup id="sup">*</sup>:
                    </label>
                    &nbsp;
                    <input type="text" value={addrs[2]} ref={f11} disabled></input>
                    <label id="label">
                        Country<sup id="sup">*</sup>:
                    </label>
                    &nbsp;
                    <input type="text" value='India' ref={f9} disabled></input>&emsp;


                </div>
                <br /><br />
                <div>
                    <label id="label">Corrected Property door Number<sup id="sup">*</sup>:</label> &ensp;
                    <input type="text" placeholder="door no, street" ref={f13} /> &emsp;
                    <label id="label">Explain how new addreass was found<sup id="sup">*</sup>:</label> &ensp;
                    <input type="text" placeholder="tell us" ref={f14} /> &emsp;
                    <label id="label">Geo Code:</label> &ensp;
                    <input type="num" placeholder="longitude/latitude" ref={f15} /> &emsp;
                </div>
                <br /><br />
                <label id="label">Map Code<sup id="sup">*</sup>:</label> &ensp;
                <input type="Text" placeholder="any number between [0-9]" ref={f17} /> &emsp;
                <label id="label">Upload Image</label>&emsp;
                <input type="file" ref={f16}></input>
                <hr />
                <br />
            </div>
            <input type='button' id="button1" value='Create' onClick={onCreateData} />
            <input type='reset' id="button2" value='Reset' onClick={ResetData} />
        </form>
    );
}

export default Dashboard;

