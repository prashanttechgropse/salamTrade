import React, { Component } from "react"; // Import React
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Card from "../component/Card";
import "react-toastify/dist/ReactToastify.css";
import "./banner.css";

const URL = process.env.REACT_APP_SERVER_URL;

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      bannerList: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${URL}/api/admin/banner`)
      .then((res) => {
        // then print response status
        this.setState({
          bannerList: res.data,
        });
      })
      .catch((err) => {
        // then print response status
        toast.error("Internal Server Error");
      });
  }

  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = [];
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/gif"];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  maxSelectFile = (event) => {
    let files = event.target.files;
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      event.target.value = null;
      toast.warn(msg);
      return false;
    }
    return true;
  };
  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 20000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };
  onChangeHandler = (event) => {
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded: 0,
      });
    }
  };
  onClickHandler = () => {
    const data = new FormData();
    if (this.state.selectedFile !== null) {
      if (this.state.selectedFile.length !== 0) {
        for (var x = 0; x < this.state.selectedFile.length; x++) {
          data.append("file", this.state.selectedFile[x]);
        }
        axios
          .post(`${URL}/api/admin/addBanner`, data, {
            onUploadProgress: (ProgressEvent) => {
              this.setState({
                loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
              });
            },
          })
          .then((res) => {
            // then print response status
            this.setState({
              bannerList: [res.data, ...this.state.bannerList],
            });
            toast.success("upload success");
          })
          .catch((err) => {
            // then print response status
            toast.error("upload fail");
          });
      }
    } else;
  };
  deleteBanner = (imageSrc) => {
    console.log(imageSrc);
    axios
      .delete(URL + "/api/admin/deleteBanner/" + imageSrc)
      .then((res) => {
        // then print response status
        this.setState({
          bannerList: res.data,
        });
        toast.success("Banner Removed Successfully");
      })
      .catch((err) => {
        // then print response status
        toast.error("something went wrong");
      });
  };
  renderBanner() {
    if (this.state.bannerList.length === 0) return <h1>No Banners Uploaded</h1>;
    else {
      return this.state.bannerList.map((item) => {
        return (
          <div className="m-2">
            <Card
              imageSrc={`${URL}/${item.imageName}`}
              onDeleteBanner={() => this.deleteBanner(item.imageName)}
            />
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="Banner-conatainer">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="Banner-Upload">
            <div className="Banner-File">
              <label>Upload Your File </label>
              <input
                type="file"
                className="Banner-Input"
                multiple
                onChange={this.onChangeHandler}
              />
            </div>

            <div class="form-group">
              <ToastContainer />
              <Progress max="100" color="success" value={this.state.loaded}>
                {Math.round(this.state.loaded, 2)}%
              </Progress>
            </div>

            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={this.onClickHandler}
            >
              Upload
            </button>
          </div>
        </div>
        <div style={{ display: "inline-flex" }}>{this.renderBanner()};</div>
      </div>
    );
  }
}

export default Banner;
