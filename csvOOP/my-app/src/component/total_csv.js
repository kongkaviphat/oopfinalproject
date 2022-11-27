import { useState,useEffect } from "react";
import './Sample_Submission.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function All_csv() {
   
   //fetch data from port 5000
    const [data3, setData] = useState([]);
    const [table,setTable] = useState();
    const [negative, setNegative] = useState();
    const [none, setNone] = useState();
    const [study, setStudy] = useState();
    const [image, setImage] = useState();
    
    const [one, setone] = useState();
    const [two, settwo] = useState();
    const [three, setthree] = useState();
    const [four, setfour] = useState();
    const [five, setfive] = useState();

    const [select,setSelect] = useState();

    let bar = null;
    const labels = ["negative", "none","study","image","1","0","0","1","1"];



    function get_data(){
        fetch('http://localhost:5000/')
        .then(response => response.json())
        .then(data => setData(data))
    
      
  
    const table = data3.map((item) => (
        <tr>
            <td>{item.id}</td>
            <td>{item.PredictionString}</td>

        </tr>
    ));
    setTable(table);
    
    const csv_predict = data3.map((item) => (
        item.PredictionString
    ));
    
    const csv_id = data3.map((item) => (
        item.id
    ));
    
    //split in id string "_"
    const csv_id_split = csv_id.map((item) => (
        item.split("_")
    ));

    
    let Cstudy = 0;
    let Cimage = 0;
    let Cnegative = 0;
    let Cnone = 0;
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;

    //count negative, none
    for (let i = 0; i < csv_predict.length; i++) {
        if (csv_predict[i].includes("negative")) {
            Cnegative++;
            
        }
        setNegative(Cnegative);

        if (csv_predict[i].includes("none")) {
            Cnone++;
        }
        setNone(Cnone);
    }

    //count study, image
    for (let i = 0; i < csv_id_split.length; i++) {
        if (csv_id_split[i][1] == "study") {
            Cstudy++;
        }
        setStudy(Cstudy);
        if (csv_id_split[i][1] == "image") {
            Cimage++;
        }
        setImage(Cimage);
    }
    
    //split " "
    const csv_real_split = csv_predict.map((item) => (
        item.split(" ")
    ));

    //slice 0
    
    for (let i = 0; i < csv_real_split.length; i++) {
      if (csv_real_split[i][1] === "1") {
        one++;
      }
     
      if (csv_real_split[i][2] === "0") {
        two++;
      }
  
      if (csv_real_split[i][3] === "0") {
        three++;
      }
      if (csv_real_split[i][4] === "1") {
        four++;
      }
      if (csv_real_split[i][5] === "1") {
        five++;
      }
    }
    setone(String(one));
    settwo(String(two));
    setthree(String(three));
    setfour(String(four));
    setfive(String(five));

    setSelect("sample");

  }

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [negative, none, study, image,one,two,three,four,five],
        backgroundColor: ["rgb(255, 153, 153)", "rgb(255, 255, 204)", "rgb(153, 255, 153)", "rgb(153, 204, 255)", "rgb(255, 51, 51)", "rgb(255, 153, 51)", "rgb(255, 255, 51)", "rgb(51, 255, 51)", "rgb(51, 255, 255)"],
      },
    ],
  };


  const graph = null
  if(select === 'sample'){
    bar = <Bar data={data} />
  }
 
  return <div className="container-sm">
    <button onClick={get_data} className="btn btn-outline-success ">Sample_Submission</button>
      <div className="Bar">
      {bar}
    </div>
    <div className="container csv">
        <table className="table">
          {table}</table> 
    </div>
    
        </div>;
}