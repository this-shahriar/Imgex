import React, {Component} from 'react';
import logo from './1.svg';
import './App.css';
import axios from 'axios';


class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         items: [],
         pages: [],
         all: [],
         iall: []
      };
   }

   search = () => {

      const code = `
            (function () {
               var okok = document.getElementsByTagName("img")
               return Array.prototype.slice.call(okok)
                     .map(x => x.currentSrc);
            })()

         `;

         const facebookCode = `
               (function () {
                  var okok = document.getElementsByTagName("i")
                  return Array.prototype.slice.call(okok)
                        .map(x => x.currentSrc);
               })()

            `;

         console.log("sjdfgdsjfbdskjfhs");

      window.chrome.tabs.getSelected(null, tab => {
            window.chrome.tabs.executeScript(tab.id, {code: code}, res => {
               this.setState({
                  all: res
               })
               console.log('res', res);

               // ----------------------------------------------------------------------------------
               // ----------------------Google Cloud Vision Api Call -------------------------------
               // ----------------------------------------------------------------------------------

               // axios.post("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBuII8jdPDicJFBY_Xx_Cgj2HVQGmXabb4", {
               //      "requests":[
               //        {
               //          "image":{
               //            "source":{
               //              "imageUri": res['0'][0]
               //            }
               //          },
               //          "features":[
               //            {
               //              "type":"WEB_DETECTION",
               //              "maxResults":1
               //
               //            }
               //          ]
               //        }
               //      ]
               //    })
               // .then(res =>  {
               //    var matchUrls = res.data.responses["0"].webDetection.pagesWithMatchingImages;
               //    matchUrls.forEach(xc => {
               //       console.log(xc);
               //    })
               //    this.setState({
               //       pages: matchUrls
               //    })
               //    // console.log(res, res.data.responses["0"].webDetection.pagesWithMatchingImages);
               //
               // })
               // .catch(function (error) {
               //    console.log(error);
               // });
            });
      });

      window.chrome.tabs.getSelected(null, tab => {
            window.chrome.tabs.executeScript(tab.id, {facebookCode: facebookCode}, res => {
               this.setState({
                  iall: res
               })
               console.log('res', res);
            });
      });
   }

   render() {
      console.log(this.state);
      var imageMatch = this.state.pages.map(function (el) {
         return(
            <a href={el.url} target="_blank"><img src={el.fullMatchingImages["0"].url}/></a>
         )
      })
      var all = this.state.all.map(function (el) {
         var indents = [];
         for (var i = 0; i < el.length; i++) {
           indents.push(<img src={el[i]} />);
         }

         return(
            <div>
               {indents}
            </div>
         )
      })
      var toughImages = this.state.iall.map(function (el) {
         var indents = [];
         for (var i = 0; i < el.length; i++) {
           indents.push(<img src={el[i]} />);
         }

         return(
            <div>
               {indents}
            </div>
         )
      })
      var styleInput = {
             width: "100%",
             padding: "12px 20px",
             margin: "8px 0",
             boxSizing: "border-box"
      }

      return (
         <div>
           <div>
             <input onClick={_=>this.search()} className="btn" type="button" value="search" />
           </div>
           <div>
               {all}
           </div>
           <hr/>

           <div>
               {imageMatch}
           </div>
        </div>
      );
   }
}

export default App;
