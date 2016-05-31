import { Component } from "react";

export default class Search extends Component {

  render() {
    return (
       <section>
         <div id="search" className="input hard-bottom">
           <i className="icon-search"></i>
           <input type="text" placeholder="Search coming soon..." className="h5 text-dark-primary" disabled={true} />
         </div>
       </section>
    );
  }
}
