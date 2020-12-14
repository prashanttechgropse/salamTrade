import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditBrand(props) {
    const [brandId, setBrandId] = useState(props.brand_data._id);
    const [brandName, setBrand] = useState(props.brand_data.brandName);
    const [brandImage, setBrandImage] = useState(props.brand_data.file);
    const [brandImageTitle, setBrandImageTitle] = useState('Choose file');

    const handleChangeImage = (event) => {
        let reader = new FileReader();
        let data = event.target.files[0];
        reader.readAsDataURL(data);
        reader.onloadend = () => {
            setBrandImage(reader.result);
            setBrandImageTitle(data.name);
        }
    }
    return (
        <Modal isOpen={props.modal} toggle={props.toggle} >
            <ModalHeader toggle={props.toggle}></ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <label>Update Brand </label>
                    <input type="text" className="form-control" name="brandName" value={brandName} onChange={(event) => setBrand(event.target.value)} />
                </div>
                {
                    brandImage !== null && brandImage !== '' ?
                        <div className="Brand-Image--container">
                            <img src={brandImage} onClick={handleChangeImage} alt="thumb3" className="Brand-Image" />
                            <Button className="btn btn-primary" onClick={() => {
                                setBrandImage(null);
                                setBrandImageTitle('Choose file');
                            }}>Remove Image</Button>
                        </div>
                        : <div className="form-group label-floating">
                            <label className="control-label uploadprofile">Upload Brand Image </label>
                            <div className="custom-file">
                                <input type="file" name="myImage" id="file" onChange={handleChangeImage} className="custom-file-input" />
                                <label className="custom-file-label">{brandImageTitle}</label>
                            </div>
                        </div>}
                <div className="form-group">

                    <button onClick={() => props.updateBrands({ brandId, brandImage, brandName })}>Update</button>
                </div>
                <div style={{ marginTop: 10 }}>

                </div>
            </ModalBody>
            <ModalFooter>

            </ModalFooter>
        </Modal>)
}