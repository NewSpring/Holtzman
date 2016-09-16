
import { Component, createElement } from "react";
import { avatar } from "../../methods/files/browser";

export default (WrappedComponent) => {

  class ProfileUpload extends Component {

    state = { photo: null }

    nativePost = (fileEntry, s, f) => {
      // Do something with the FileEntry object, like write to it, upload it, etc.
      // writeFile(fileEntry, imgUri);
      const fileURL = fileEntry;

      const options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";

      const { baseURL, token, tokenName } = Meteor.settings.public.rock;
      const url = `${baseURL}api/BinaryFiles/Upload?binaryFileTypeId=5`;
      options.headers = { [tokenName]: token };

      var ft = new FileTransfer();
      ft.upload(fileURL, encodeURI(url), s, f, options);
    }

    nativeUpload = (e, opts = {}) => {
      e.preventDefault();
      e.stopPropagation();
      if (!Meteor.settings.public.rock) return Promise.reject();
      console.log(opts);
      return new Promise((s, f) => {
        navigator.camera.getPicture(
          (photo) => {
            this.setState({
              photo: WebAppLocalServer.localFileSystemUrl(photo)
            });
            this.nativePost(photo, s, f);
          },
          f,
          {...{
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            correctOrientation: true,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            cameraDirection: Camera.Direction.FRONT,
          }, ...opts}
        )
      })
        .then(({ response }) => {
          return new Promise((s, f) => {
            avatar(response, (err, response) => {
              if (err) f(err);
              if (!err) s(response);
            });
          });
        })
        .catch((e) => console.log(e))

    }

    webUpload = (e) => {
      let files = e.target.files;
      if (!Meteor.settings.public.rock) return Promise.reject();

      // go ahead and show the photo if we can
      this.preRender(files);

      var data = new FormData();
      data.append("file", files[0]);

      const { baseURL, token, tokenName } = Meteor.settings.public.rock;

      return fetch(`${baseURL}api/BinaryFiles/Upload?binaryFileTypeId=5`, {
        method: "POST",
        headers: { [tokenName]: token },
        body: data
      })
        .then(x => x.json())
        .then(id => {
          return new Promise((s, f) => {
            avatar(id, (err, response) => {
              if (err) f(err);
              if (!err) s(response);
            });
          });
        });
    }

    preRender = (files) => {
      const save = (photo) => this.setState({ photo });

      for (let file in files) {
        let reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = ((theFile) => (e) => save(e.target.result))(files[file]);
        // Read in the image file as a data URL.
        reader.readAsDataURL(files[file]);
        break;
      }
    }

    render() {
      const props = {...{
        upload: Meteor.isCordova ? this.nativeUpload : this.webUpload,
        photo: this.state.photo || this.props.photo,
      }, ...this.props};
      // props.client = this.client;
      return createElement(WrappedComponent, props);
    }

  }

  return ProfileUpload;
};
