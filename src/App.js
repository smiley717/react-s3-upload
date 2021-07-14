import './App.css';
import UploadImageFile from './UploadImageToS3WithNativeSdk';
import { fetchData, putData } from "./AWSFunctions";

function App() {

    const fetchDataFormDynamoDb = () => {
        fetchData('synkbooks_logos')
    }

    const addDataToDynamoDb = async () => {
      const logoData = {
        logoId: "2",
        name: "BismarkTax",
        description: "Tax company"
      }

      await putData('synkbooks_logos', logoData)
    }

    return (
        <div className="App">
            <header className="App-header">
                React Upload Image File to S3 with Native SDK.
            </header>
            <UploadImageFile />
            <p>
              <button onClick={() => fetchDataFormDynamoDb()}>Fetch From DynamoDb</button>
              <button onClick={() => addDataToDynamoDb()}>Put Data To DynamoDb</button>
            </p>
        </div>
    );
}

export default App;
