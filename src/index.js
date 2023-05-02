// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx4pQLKwmGQz4v1tbHCY5RRuKRGTDrgjk",
  authDomain: "case-study-d6a32.firebaseapp.com",
  projectId: "case-study-d6a32",
  storageBucket: "case-study-d6a32.appspot.com",
  messagingSenderId: "910364984531",
  appId: "1:910364984531:web:c4055963432ddcf45d4026",
  measurementId: "G-PDW0GB00WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

const saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", async () => {
  const gamingCollectionRef = collection(db, "gamingConsoles");
  try {
    const newGamingConsoleRef = await addDoc(gamingCollectionRef, {
      consoleName: document.getElementById("name").value,
      consoleType: document.getElementById("type").value,
      company: document.getElementById("company").value,
      yearReleased: document.getElementById("year").value,
      unitsSold: document.getElementById("sold").value
    });
    alert("Entry Added");
    console.log("Data Added!");
    getDataBtn.click();
  } catch (error) {
    console.log(error);
  }
});

// Viewing data stored in the database
const getDataBtn = document.querySelector(".get-data");
getDataBtn.addEventListener("click", async () => {
  const q = collection(db, "gamingConsoles");
  const gamingConsoles = await getDocs(q);

  // Get a reference to the table body
  const tableBody = document.getElementById("tbody1");

  // Clear any existing data from the table
  tableBody.innerHTML = "";

  // Loop through the gamingConsoles and add each one to the table
  gamingConsoles.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("tr");
    row.setAttribute("data-id", doc.id);
    row.innerHTML = `
      <td>${data.consoleName}</td>
      <td>${data.consoleType}</td>
      <td>${data.company}</td>
      <td>${data.yearReleased}</td>
      <td>${data.unitsSold}</td>
      <td>
      <button class="edit" data-id="${doc.id}">Edit</button>
      <button class="delete" data-id="${doc.id}">Delete</button>
      </td>
      `;
      tableBody.appendChild(row);
      });
      });

      // Deleting data from the database
      const tableBody = document.getElementById("tbody1");
      tableBody.addEventListener("click", async (event) => {
      if (event.target.classList.contains("delete")) {
      const id = event.target.getAttribute("data-id");
      try {
      await deleteDoc(doc(db, "gamingConsoles", id));
      console.log("Document successfully deleted!");
      alert("Entry Deleted!");
      } catch (error) {
      console.error("Error removing document: ", error);
      }
      }
      });

      tableBody.addEventListener("click", async (event) => {
        if (event.target.classList.contains("delete")) {
          const id = event.target.getAttribute("data-id");
          try {
            await deleteDoc(doc(db, "gamingConsoles", id));
            console.log("Document successfully deleted!");
            alert("Entry Deleted!");
            getDataBtn.click(); // refresh the table after deleting a document
          } catch (error) {
            console.error("Error removing document: ", error);
          }
        } else if (event.target.classList.contains("edit")) {
          const id = event.target.getAttribute("data-id");
          const updateBtn = document.querySelector(".update");
          const docRef = doc(db, "gamingConsoles", id);
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById("edit_name").value = data.consoleName;
            document.getElementById("edit_type").value = data.consoleType;
            document.getElementById("edit_company").value = data.company;
            document.getElementById("edit_year").value = data.yearReleased;
            document.getElementById("edit_sold").value = data.unitsSold;
            saveBtn.style.display = "none";
            updateBtn.style.display = "block";
            updateBtn.setAttribute("data-id", id);
          } else {
            console.log("No such document!");
          }

          updateBtn.addEventListener("click", async () => {
            const id = updateBtn.getAttribute("data-id");
            const gamingConsoleRef = doc(db, "gamingConsoles", id);
            try {
              await updateDoc(gamingConsoleRef, {
                consoleName: document.getElementById("edit_name").value,
                consoleType: document.getElementById("edit_type").value,
                company: document.getElementById("edit_company").value,
                yearReleased: document.getElementById("edit_year").value,
                unitsSold: document.getElementById("edit_sold").value
              });
              console.log("Document successfully updated!");
              alert("Entry Updated!");
              saveBtn.style.display = "block";
              updateBtn.style.display = "none";
              document.getElementById("edit_name").value = "";
              document.getElementById("edit_type").value = "";
              document.getElementById("edit_company").value = "";
              document.getElementById("edit_year").value = "";
              document.getElementById("edit_sold").value = "";
              getDataBtn.click(); // refresh the table after updating a document
            } catch (error) {
              console.error("Error updating document: ", error);
            }
          });
          
        }
      });

      getDocs(collection(db, "gamingConsoles")).then(docSnap => {
        let gamingConsolesData = [];
      
        docSnap.forEach((doc)=> {
      
          const data = doc.data();
          const sold = data.sold;
          const year = data.year;
      
          gamingConsolesData.push({ x: sold, y: year });
          console.log("New Document data:", 'blog');
      
        });
      
        // Create the chart using the retrieved data
        var chart = new JSC.Chart("chartDiv", {
          debug: true, // Set debug option to true to view full error messages
      
          type: "column",
          series: [{
            name: "Companies",
            points: gamingConsole
          }
        ]
        });
      
      })  .catch(function(error) {
        console.error("Error retrieving data from Firestore: ", error);
        });