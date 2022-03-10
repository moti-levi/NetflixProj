// import axios  from "axios";

class DBHelper {
  
    // https://[PROJECT_ID].firebaseio.com/users/jack/name.json

    
    
    static getHistory = (userid) => {


      //https://reactdb-f0ba3-default-rtdb.firebaseio.com/userContent.json?orderBy="userid"&equalTo="oz0U2LB19zO5kxReiE6CXCbRfE62"
      console.log(userid);
        let url='https://reactdb-f0ba3-default-rtdb.firebaseio.com/userContent.json?orderBy="userid"&equalTo="'+userid +'"';
        console.log(url);
        fetch(url, {
            method: 'GET',            
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {              
              if (res.ok) {
                return res.json();
              } else {
                return res.json().then((data) => {
                let errorMessage = 'Getting data error!';
                throw new Error(errorMessage);
                });
              }
            })
            .then((data) => {
                console.log(data); 
                return data;             
            })
            .catch((err) => {
              alert(err.message);
            });                               
    }

    


    
}
export default DBHelper;



