const firebaseConfig = {
    apiKey: "AIzaSyCTA7LheJCcEA709bCEN4JHcuX21C72LGQ",
    authDomain: "kwittersc.firebaseapp.com",
    databaseURL: "https://kwittersc-default-rtdb.firebaseio.com",
    projectId: "kwittersc",
    storageBucket: "kwittersc.appspot.com",
    messagingSenderId: "768669006296",
    appId: "1:768669006296:web:82ecf87c376deb618f5aad"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  function send(){
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0,
        dislike:0

    });
    document.getElementById("msg").value = "";

}



function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
  firebase_message_id = childKey;
  message_data = childData;
//Inica código
      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data['name'];
      message = message_data['message'];
      like = message_data['like']
      name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'</h4>";
      message_with_tag = "<h4>"+ message + "</h4>";
      like_button = "<button class='btn btn-warning' id=" + firebase_message_id+ "value ="+like+"onclick='updateLike(this.id)'>";
      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>"

      row = name_with_tag +  + message_with_tag + like_button + span_with_tag;
      document.getElementById("output").innerHTML += row;
//Termina código
} });  }); }
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
        window.location = "index.html";
    }
    
function updateLike(message_id){
    console.log("Boton me gusta pulsado - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    update_likes = Number(likes) + 1;
    console.log(update_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like : update_likes
    });

}